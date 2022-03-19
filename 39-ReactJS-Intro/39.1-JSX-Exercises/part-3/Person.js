//** Person construct with age (str), name (str), hobbies (array) */
const Person = (props) => {
  const msg = props.age >= 18 ? "please go vote!" : "you must be 18";
  return (
    <div>
      <p>Learn some information about this person.</p>
      <ul>
        <li>Name: {props.name.length > 8 ? props.name.slice(0, 6) : props.name}</li>
        <li>Age: {props.age}</li>
      </ul>
      <h3>{msg}</h3>
      <h4>Hobbies:</h4>
      <ul>
        {props.hobbies.map((h) => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  );
};
