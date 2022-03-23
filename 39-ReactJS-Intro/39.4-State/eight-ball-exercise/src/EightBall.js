import React, { useState } from "react";
import "./EightBall.css";
import answerBank from "./answers";

const EightBall = ({ answers = answerBank }) => {
  const shakeBall = () => {
    const randIdx = Math.floor(Math.random() * answers.length);
    const choice = answers[randIdx]; // has 'msg', 'color' props
    setBgColor(choice.color);
    setMsg(choice.msg);
  };

  const [bgColor, setBgColor] = useState("black");
  const [msg, setMsg] = useState("Think of a Question.");

  return (
    <>
      <div onClick={() => shakeBall()} className='EightBall' style={{ backgroundColor: bgColor }}>
        <h1 className='EightBall-header'>{msg}</h1>
      </div>
      <button>Reset</button>
    </>
  );
};

export default EightBall;
