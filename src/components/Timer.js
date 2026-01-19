import { useEffect } from "react"



function Timer({secondsRemaining,dispatch}){

    const min = Math.floor(secondsRemaining/60);
    const sec = secondsRemaining % 60;
    useEffect(function(){
        const interval = 1000
        const id = setInterval(() => {
            dispatch({type:'tick'})
        }, interval);

        //need to clear interval otherwise the time will not reset
        return (() => clearInterval(id))
    },[dispatch])
    return <div className="timer">{min < 10 && '0'}{min}:{sec < 10 && '0'}{sec}</div>
}

export default Timer;