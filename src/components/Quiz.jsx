import React, { useState } from "react";
import { useContext } from "react";
import { quizContext } from "../helpers/contexts";

export default function Quiz() {
  const [value, setValue] = useState(0);
  const {
    score,
    setScore,
    option,
    setOption,
    gameData,
    setGameState,
    decodeHTMLEntities,
  } = useContext(quizContext);
  const optionColor = {
    color: { backgroundColor: "rgb(2, 6, 112)", color: "#fff" },
    default: {
      backgroundColor: "#fff",
      border: "1px solid rgb(176, 123, 227);",
      color: "#000",
    },
  };

  function optionsFunction(e, data) {
    setOption(data);
  }

  const optionsData = gameData[value].options.map((valueData, index) => {
    return (
      <div className="btn-div" key={index}>
        <button
          className="btn option-btn"
          id={index}
          value={valueData}
          onClick={(e) => optionsFunction(e, valueData)}
        >
          {decodeHTMLEntities(valueData)}
        </button>
      </div>
    );
  });

  const nextFunction = () => {
    if (option === gameData[value].correctAnswer) {
      setScore(score + 1);
      setValue(value + 1);
    } else {
      setValue(value + 1);
    }
    if (value === gameData.length - 1) {
      setGameState("endscreen");
    }
  };

  return (
    <div className="question-container">
      <h2 className="question">
        {`${value + 1}.`} {gameData[value].question}
      </h2>
      <div className="span-div">
        <span className="question-category">
          Category: {gameData[value].category}
        </span>
        <span className="question-difficulty">
          Difficulty: {gameData[value].difficulty}
        </span>
      </div>
      <div className="options-div">{optionsData}</div>
      <button className="btn next-btn" onClick={nextFunction}>
        NEXT
      </button>
    </div>
  );
}