import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ColorForm.css";

const ColorForm = ({ colors, setColors }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    colorName: "",
    colorValue: ""
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
    debugger;
    e.preventDefault();
    const newColor = { ...formData };
    setColors([...colors, newColor]);
    setFormData(INITIAL_STATE);
    navigate("/colors");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='ColorForm'>
        <div className='ColorForm-group'>
          <label htmlFor='colorName'>Color Name</label>
          <input
            type='text'
            name='colorName'
            id='colorName'
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className='ColorForm-group'>
          <label htmlFor='colorValue'>Color Name</label>
          <input
            type='color'
            name='colorValue'
            id='colorValue'
            onChange={handleChange}
            value={formData.value}
            required
          />
        </div>
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorForm;
