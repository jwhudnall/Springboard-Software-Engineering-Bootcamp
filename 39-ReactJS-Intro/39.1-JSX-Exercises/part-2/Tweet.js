const Tweet = (props) => {
  return (
    <div>
      <h2>⭐️ Tweet Card⭐️</h2>
      <ul>
        <li>Username: {props.username}</li>
        <li>Name: {props.name}</li>
        <li>Date: {props.date}</li>
        <li>Message: {props.message}</li>
      </ul>
    </div>
  );
};
