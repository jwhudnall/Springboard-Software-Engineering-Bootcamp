const App = () => {
  return (
    <div>
      <h1>Animal House!</h1>
      <Animal emoji='🦒' name='giraffe' species='tall' age={3} isCute={true} />
      <Animal emoji='🦁' name='lion' species='feline' age={4} isCute={false} />
      <RandomChoice choices={["red", "green", "yellow"]} />
      <Bouncer age={21} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
