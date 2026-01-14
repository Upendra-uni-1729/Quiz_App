import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";


function App() {

  useEffect(function(){
    async function getQuestions(){
      const res = await fetch('https://literate-goldfish-gwq57j54j6qfwp4r-9000.app.github.dev/questions')
      const data = await res.json();
      console.log(data);
    }
    getQuestions();
  },[])
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>questions</p>
      </Main>
    </div>
  );
}

export default App;
