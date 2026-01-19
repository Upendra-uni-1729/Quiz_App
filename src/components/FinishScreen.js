function FinishScreen({points, totalPoints,dispatch}){
    const Percentage = (points/totalPoints) * 100;
    return( <>
    <p className="result">
        You Scored <strong>{points} </strong> out of {totalPoints} ({Math.ceil(Percentage)}%)</p>
    
    <button className="btn btn-ui" onClick={() => dispatch({type:'restart'})}>ReTake</button> 
    </>)
}

export default FinishScreen;