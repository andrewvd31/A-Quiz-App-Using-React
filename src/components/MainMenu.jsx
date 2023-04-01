import React from 'react'
import {useContext} from 'react'
import {quizContext} from '../helpers/contexts'

export default function MainMenu() {
  const {setGameState} = useContext(quizContext)

  function startGameFunction(){
    setGameState('quiz')
  }

  return (
    <div className='menu'>
        <h2 className='quiz-title'>Quiz App</h2>
        <button className="btn start-quiz" onClick={startGameFunction}>Start Quiz</button>
    </div>
  )
}
