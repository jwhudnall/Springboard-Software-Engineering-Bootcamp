const ToDoList = (props) => {
  return (
    <div>
      <h4>Todo List:</h4>
      <ul>
        {props.todos.map((i) => (
          <li>
            <input type='checkbox' />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};
