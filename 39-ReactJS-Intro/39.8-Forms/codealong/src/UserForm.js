import React, { useState } from "react";

const UserForm = () => {
  const initialState = {
    username: "",
    email: "",
    password: ""
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const field = e.target.name;
    // const {name, value} = e.target; // Can destructure
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    alert(`Created user: ${username} with email: ${email} and password: ${password}`);
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        type='text'
        name='username' // needs to match state variable (e.target.name)
        placeholder='username'
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        name='email' // needs to match state variable
        placeholder='email'
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        name='password' // needs to match state variable
        placeholder='password'
        value={formData.password}
        onChange={handleChange}
      />
      <button>Add me to the list!</button>
    </form>
  );
};

export default UserForm;
