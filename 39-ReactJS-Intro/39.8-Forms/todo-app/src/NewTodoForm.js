import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NewTodoForm = ({ addTodo }) => {
  const INITAL_STATE = {
    task: ""
  };
  const [formData, setFormData] = useState(INITAL_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ ...formData, id: uuidv4() });
    setFormData(INITAL_STATE);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='task'>Task</label>
      <input
        id='task'
        name='task'
        type='text'
        value={formData.task}
        onChange={handleChange}
        required
      />
      <button>Add</button>
    </form>
  );
};

export default NewTodoForm;
