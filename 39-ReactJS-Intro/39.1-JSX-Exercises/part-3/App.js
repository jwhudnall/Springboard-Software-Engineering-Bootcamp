const App = () => {
  return (
    <div>
      <Person name='James' age={35} hobbies={["Coding", "Working Out", "Learning"]} />
      <Person name='Sam' age={30} hobbies={["Reading", "Walking", "Singing"]} />
      <Person
        name='My name is longer than eight'
        age={15}
        hobbies={["Skating", "Running", "Dancing"]}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
