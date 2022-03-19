const RandomChoice = (props) => {
  const idx = Math.floor(Math.random() * props.choices.length);
  const choice = props.choices[idx];
  return <h3>Random Choice: {choice}</h3>;
};
