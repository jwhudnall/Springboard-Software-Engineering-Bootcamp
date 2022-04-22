import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  console.log(navigate);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const storeEmail = () => {
    alert("jk, no email storage");
    navigate("/food/burrito");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeEmail(email);
  };

  return (
    <div>
      <h1>This is the Contact Page</h1>
      <p>To get in touch, enter your email.</p>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' value={email} onChange={handleChange} required />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default Contact;
