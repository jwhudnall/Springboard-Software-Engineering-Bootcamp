const Animal = (props) => {
  // console.log(`Props: ${JSON.stringify(props)}`);
  // props.name = "Bojak"; // Can't do this
  return (
    <ul>
      <li>{props.emoji}</li>
      <li>Name: {props.name}</li>
      <li>Species: {props.species}</li>
      <li>Age: {props.age}</li>
      <li>IsCute: {props.isCute ? "✅" : "❌"}</li>
    </ul>
  );
};
