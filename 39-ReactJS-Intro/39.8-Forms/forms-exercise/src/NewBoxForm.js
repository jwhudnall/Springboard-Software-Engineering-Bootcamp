import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NewBoxForm = ({ addItem }) => {
  // this component should render a form that when submitted, creates a new Box. You should be able to specify the Box’s width, height, and background color. When the form is submitted, clear the input values.
  const INITIAL_STATE = {
    backgroundColor: "#fa0000",
    height: 50,
    width: 50
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleChange = (e) => {
    // Updates state each time an input changes
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    // handle submission of form
    e.preventDefault();
    // const {color, height, width} = e.target;
    addItem({ ...formData, id: uuidv4() });
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='backgroundColor'>Color</label>
      <input
        type='color'
        name='backgroundColor'
        id='backgroundColor'
        value={formData.backgroundColor}
        onChange={handleChange}
        required
      />
      <label htmlFor='height'>Height</label>
      <input
        type='number'
        name='height'
        id='height'
        min='10'
        max='100'
        value={formData.height}
        onChange={handleChange}
        required
      />
      <label htmlFor='width'>Width</label>
      <input
        type='number'
        name='width'
        id='width'
        min='10'
        max='100'
        value={formData.width}
        onChange={handleChange}
        required
      />
      <button>Add Box</button>
    </form>
  );
};

export default NewBoxForm;
