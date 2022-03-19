const Bouncer = (props) => {
  let reply;
  if (props.age < 18) {
    reply = "Sorry kid, you can't come in.";
  } else if (props.age < 21) {
    reply = "Come in, but no drinking.";
  } else {
    reply = "Come in. You have full access to the bar.";
  }

  return (
    <div>
      <h2>Bar Scenario</h2>
      <p>
        <b>Bouncer:</b> How old are you?
      </p>
      <p>
        <b>You:</b> I am {props.age} years old.
      </p>
      <p>
        <b>Bouncer:</b> {reply}
      </p>
    </div>
  );
};
