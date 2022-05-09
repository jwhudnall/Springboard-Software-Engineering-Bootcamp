import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";

function App() {
  return (
    <div className='App'>
      <Counter color='purple' initialVal={10} />
      <Counter initialVal={10} />
    </div>
  );
}

export default App;
