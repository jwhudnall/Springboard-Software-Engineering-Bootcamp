const App = () => {
  return (
    <div>
      <Alert>
        <h1>Animal House!</h1>
        <Animal emoji='🦒' name='giraffe' species='tall' age={3} isCute={true} />
        <Animal emoji='🦁' name='lion' species='feline' age={4} isCute={false} />
      </Alert>
      <RandomNumRange min={20} max={30} />
      <RandomChoice choices={["red", "green", "yellow"]} />
      <Bouncer age={21} />
      <ToDoList todos={["Grocery Shopping", "Buy a Gift", "Workout"]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
