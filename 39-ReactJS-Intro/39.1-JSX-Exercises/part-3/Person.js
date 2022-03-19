//** Person construct with age (str), name (str), hobbies (array) */
const Person = ({ age, name, hobbies }) => {
  const msg = age >= 18 ? "please go vote!" : "you must be 18";
  return (
    <div>
      <p>Learn some information about this person.</p>
      <ul>
        <li>Name: {name.length > 8 ? name.slice(0, 6) : name}</li>
        <li>Age: {age}</li>
      </ul>
      <h3>{msg}</h3>
      <h4>Hobbies:</h4>
      <ul>
        {hobbies.map((h) => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  );
};
