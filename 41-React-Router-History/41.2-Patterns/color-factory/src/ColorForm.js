import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ColorForm = ({ colors, setColors }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    name: "",
    value: ""
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
    const newColor = { ...formData };
    setColors({ ...colors, newColor });
    setFormData(INITIAL_STATE);
    navigate("/colors");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='colorName'>Color Name</label>
        <input
          type='text'
          name='colorName'
          id='colorName'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor='colorValue'>Color Name</label>
        <input
          type='color'
          name='colorValue'
          id='colorValue'
          value={formData.value}
          onChange={handleChange}
          required
        />
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorForm;
