import React,{useState} from 'react'
import {useContext} from 'react'
import {quizContext} from '../helpers/contexts'

export default function Quiz() {
  const [value,setValue] = useState(0)
  const {score,setScore,option,
        setOption,gameData,
        setGameState,decodeHTMLEntities} = useContext(quizContext)

  function optionsFunction(data){
    setOption(data)
  }

  const optionsData = gameData[value].options.map((valueData,index)=>{
    return (
      <div className="btn-div" key={index}>
        <button className='btn option-btn' onClick={()=>optionsFunction(valueData)}>{decodeHTMLEntities(valueData)}</button>
      </div>
    )
  })

  const nextFunction = () => {
    if (option === gameData[value].correctAnswer){
      setScore(score + 1)
      setValue(value + 1)
    }
    else{
      setValue(value + 1)
    }
    if (value === gameData.length - 1){
      setGameState('endscreen')
    }
  }

  return (
    <div className="question-container">
      <h2 className="question">{`${value + 1}.`} {gameData[value].question}</h2>
      <div className="span-div">
        <span className="question-category">Category: {gameData[value].category}</span>
        <span className="question-difficulty">Difficulty: {gameData[value].difficulty}</span>
      </div>
      {optionsData}
      <button className="btn next-btn" onClick={nextFunction}>
        NEXT
      </button>
    </div>
  )
}
