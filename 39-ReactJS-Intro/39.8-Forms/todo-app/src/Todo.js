const Todo = ({ task, deleteTodo }) => {
  return (
    <>
      <li>
        {task}
        <button onClick={deleteTodo}>X</button>
      </li>
    </>
  );
};

export default Todo;
