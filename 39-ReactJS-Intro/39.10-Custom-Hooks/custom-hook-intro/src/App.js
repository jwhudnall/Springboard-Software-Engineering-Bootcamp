import logo from "./logo.svg";
import "./App.css";
import MoodClicker from "./MoodClicker";
import Counter from "./Counter";
import SignupForm from "./SignupForm";

function App() {
  return (
    <div className='App'>
      <SignupForm />
      <Counter />
      <MoodClicker />
    </div>
  );
}

export default App;
