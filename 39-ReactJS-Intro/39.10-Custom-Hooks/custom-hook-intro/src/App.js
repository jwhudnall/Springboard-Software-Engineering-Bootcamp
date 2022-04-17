import logo from "./logo.svg";
import "./App.css";
import MoodClicker from "./MoodClicker";
import Counter from "./Counter";
import SignupForm from "./SignupForm";
import DogDetail from "./DogDetail";

function App() {
  return (
    <div className='App'>
      <DogDetail />
      <SignupForm />
      <Counter />
      <MoodClicker />
    </div>
  );
}

export default App;
