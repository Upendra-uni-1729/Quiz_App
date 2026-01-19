function Progress({index, numQuestions,totalPoints,points, answer}){
    return <header className="progress">
        <progress max={numQuestions} value={index + Number(answer !== null)} />
        <p>Question <strong>{index + 1}</strong>/<strong>{numQuestions}</strong></p>

        <p><strong>{points}</strong>/<strong>{totalPoints}</strong> points </p>
    </header>
}

export default Progress;