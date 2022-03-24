import "./App.css";
import Counter from "./Counter";
import BrokenComponent from "./BrokenComponent";
import FixedComponent from "./FixedComponent";
import Toggler from "./Toggler";

function App() {
  return (
    <div>
      Hello, I'm an App!
      {/* <Counter /> */}
      <Toggler />
    </div>
  );
}

export default App;
