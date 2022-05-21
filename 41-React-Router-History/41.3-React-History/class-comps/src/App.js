import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
import CounterNew from "./CounterNew";

function App() {
  return (
    <div className='App'>
      {/* <Counter color='purple' initialVal={10} />
      <Counter initialVal={10} /> */}
      <CounterNew />
    </div>
  );
}

export default App;
