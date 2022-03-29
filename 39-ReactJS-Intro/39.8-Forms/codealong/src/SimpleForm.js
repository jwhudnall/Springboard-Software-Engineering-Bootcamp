import React, { useState } from "react";

const SimpleForm = () => {
  const initialState = {
    email: ""
  };
  const [formData, setFormData] = useState(initialState);
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const handleChange = (e) => {
    setIsTouched(true);
    const { name, value } = e.target; // Can destructure
    if (value === "") {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }

    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = formData;
    if (!isInvalid) {
      alert(`Added you to the mailing list, ${email}.`);
      setFormData(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        name='email' // needs to match state variable
        placeholder='email'
        value={formData.email}
        onChange={handleChange}
      />
      {isInvalid && isTouched && <span style={{ color: "red" }}>Email cannot be blank.</span>}
      <button>Add me to the list!</button>
    </form>
  );
};

export default SimpleForm;
