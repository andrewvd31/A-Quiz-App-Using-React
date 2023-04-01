import React, {useEffect, useState} from 'react'
import MainMenu from './components/MainMenu'
import Quiz from './components/Quiz'
import EndScreen from './components/EndScreen'
import {quizContext} from './helpers/contexts'
import Loadscreen from './components/Loadscreen'
const url = 'https://opentdb.com/api.php?amount=5'

function App() {
  const [gameState,setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [option, setOption] = useState('')
  const [gameData, setGameData] = useState([])
  const [loading,setLoading] = useState(true)
  const sorting = (array) => array.sort(() => Math.random() - 0.5);
  const decodeHTMLEntities = (text) => {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value
  }
  const fetchDataUrl = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setLoading(false)
      const newGameData = data.results.map((value)=>{
         const {category,correct_answer,difficulty,incorrect_answers,question} = value
         const allAnswers = sorting([correct_answer,...incorrect_answers])
         const dataObject = {
          category: category,
          correctAnswer: correct_answer,
          options: allAnswers,
          difficulty: difficulty,
          question: decodeHTMLEntities(question),
         } 
         return dataObject
      })
      setGameData(newGameData)
    } 
    catch (error) {
      setLoading(true)
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchDataUrl()
  },[])

  if (loading){
    return (
      <Loadscreen/>
    )
  }

  return (
    <div className='main-container'>
      <quizContext.Provider value={
        {gameState,setGameState,
        score,setScore,
        gameData,setGameData,
        option,setOption,
        decodeHTMLEntities,fetchDataUrl,
        setLoading
      }}
      >
        {gameState === 'menu' && <MainMenu/>}
        {gameState === 'quiz' && <Quiz/>}
        {gameState === 'endscreen' && <EndScreen/>}
      </quizContext.Provider>
    </div>
  )
}

export default App