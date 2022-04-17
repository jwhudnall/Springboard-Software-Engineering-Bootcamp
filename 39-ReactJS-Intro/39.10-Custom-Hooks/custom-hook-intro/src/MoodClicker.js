import React, { useState } from "react";
import useToggleState from "./hooks/useToggleState";
import "./MoodClicker.css";

const MoodClicker = () => {
  // ** Before:
  // const [isHappy, setIsHappy] = useState(true);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const toggleMood = () => {
  //   setIsHappy((mood) => !mood);
  // };
  // const toggleIsDarkMode = () => {
  //   setIsDarkMode((mode) => !mode);
  // };
  const [isHappy, toggleMood] = useToggleState();
  const [isDarkMode, toggleMode] = useToggleState(false);
  return (
    <div className={isDarkMode ? "Clicker-dark" : "Clicker-light"}>
      <h1>{isHappy ? "😀" : "😢"}</h1>
      <button onClick={toggleMood}>Change Mood</button>
      <button onClick={toggleMode}>Toggle Dark/Light Mode</button>
    </div>
  );
};

export default MoodClicker;
