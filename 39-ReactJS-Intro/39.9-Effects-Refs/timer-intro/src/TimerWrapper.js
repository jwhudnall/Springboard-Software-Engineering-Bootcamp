import React, { useState, useEffect } from "react";
import Timer from "./Timer";

const TimerWrapper = () => {
  const [timerVisible, setTimerVisible] = useState(true);
  const toggleTimer = () => {
    setTimerVisible(!timerVisible);
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     setSeconds((seconds) => seconds + 1);
  //   }, 1000);
  // }, []);

  return (
    <div>
      <button onClick={toggleTimer}>Toggle Timer</button>
      {timerVisible && <Timer />}
    </div>
  );
};

export default TimerWrapper;
