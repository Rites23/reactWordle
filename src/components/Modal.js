import React from 'react'

export default function Modal({ isCorrect, solution, turn }) {

    const refresh = ()=>{
        window.location.reload()
    }
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the word in {turn} guesses :)</p>
          <button onClick={refresh}>Restart</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Sorry!</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time :)</p>
          <button onClick={refresh}>Restart</button>
        </div>
      )}
    </div>
  )
}
