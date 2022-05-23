import useCounter from "./useCounter";

const CounterNew = () => {
  const [count, add, subtract] = useCounter({ init: 3 });
  return (
    <div>
      <h3>Count is: {count}</h3>
      <button onClick={subtract}>-1</button>
      <button onClick={add}>+1</button>
    </div>
  );
};

export default CounterNew;
