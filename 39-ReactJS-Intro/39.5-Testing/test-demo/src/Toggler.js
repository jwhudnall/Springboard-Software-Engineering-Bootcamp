import React, { useState } from "react";

const Toggler = () => {
  const [isShowing, setIsShowing] = useState(true);
  return (
    <div className='Toggler'>
      <button className='Toggler-btn' onClick={() => setIsShowing(!isShowing)}>
        Toggle
      </button>
      {isShowing && <h1 className='Toggler-text'>Hello World</h1>}
    </div>
  );
};

export default Toggler;
