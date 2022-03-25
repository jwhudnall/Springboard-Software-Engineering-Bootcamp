import "./App.css";
import Dice from "./Dice";

function App() {
  return (
    <div className='App'>
      <Dice />
      <Dice numDice={4} title='Craps' maxVal={6} />
    </div>
  );
}

export default App;
