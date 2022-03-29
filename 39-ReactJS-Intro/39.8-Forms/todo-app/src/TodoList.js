import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const INITAL_STATE = [
    { task: "Walk the dog.", id: uuidv4() },
    { task: "Take out the Trash.", id: uuidv4() },
    { task: "Study.", id: uuidv4() }
  ];
  const [todos, setTodos] = useState(INITAL_STATE);
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((t) => {
        return t.id !== id;
      })
    );
  };
  const addTodo = (newItem) => {
    setTodos((todos) => [...todos, { ...newItem }]);
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <ul>
        {todos.map((t) => (
          <Todo key={t.id} task={t.task} deleteTodo={() => deleteTodo(t.id)} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
