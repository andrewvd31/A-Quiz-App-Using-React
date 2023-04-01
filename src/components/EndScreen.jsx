import React from 'react'
import { useContext } from 'react'
import { quizContext } from '../helpers/contexts'

export default function EndScreen() {
  const {score,setScore,gameData,setGameState,setGameData,fetchDataUrl,setLoading} = useContext(quizContext)

  function restartGame(){
    setGameState('menu')
    setScore(0)
    setLoading(true)
    setGameData(fetchDataUrl)
  }

  return (
    <div className='menu'>
      <h2 className="score-board">You scored: {`${score}/${gameData.length}`}</h2>
      <button className="btn restart-btn"onClick={restartGame}>RESTART GAME</button>
    </div>
  )
}
