import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from './Loader';
import Error  from "./Error";
import Question  from "./Question";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";


const SEC_PER_QUESTION = 30;
const initialState = {
  questions : [],

  // loading, error, ready, active, finished
  status:"loading",
  index:0,
  answer:null,
  points:0,
  secondsRemaining: 0,
}

function reducer(state,action){
  switch(action.type){
    case 'dataReceived':
      return {
        ...state,
        questions : action.payload,
        status : 'ready',
        secondsRemaining : state.questions.length * SEC_PER_QUESTION,
      }
    case 'dataFailed':
      return{
        ...state,
        status:'error',
      }
    case 'start':
      return{
        ...state,
        status:'active',
      }
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finished':
      return {
        ...state,
        status:'finished',
      }
    case 'restart':
      return {
        ...initialState,
        questions : state.questions,
        status: 'ready',
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status : state.secondsRemaining === 0 ? 'finished': state.status,
      }
    default:
      throw  new Error("Unknown action");
  }

}

//App component
function App() {
  //defining states
  const [{status,questions,index,answer,points,secondsRemaining}, dispatch] = useReducer(reducer,initialState);
  
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((pre,cur) => pre+cur.points,0);
  useEffect(function(){
    async function getQuestions(){
      try {
        const res = await fetch('https://literate-goldfish-gwq57j54j6qfwp4r-9000.app.github.dev/questions')
        const data = await res.json();
        //console.log(data);
        dispatch({type:'dataReceived',payload:data});
      } catch (error) {
        //console.log("failed");
        dispatch({type:'dataFailed'});
      }
    }
    getQuestions();
  },[])
  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && <>
        <Progress index={index} numQuestions={numQuestions} totalPoints={totalPoints} points={points} answer={answer} />
        <Question question={questions[index]} answer={answer} dispatch={dispatch}/> 
        <Footer>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} /> 
        <NextButton answer={answer} dispatch={dispatch} numQuestions={numQuestions} index={index} />
        </Footer></> }
        {status === 'finished' && <FinishScreen points={points} totalPoints={totalPoints} dispatch={dispatch}/>}
      </Main>
      
    </div>
  );
}

export default App;
