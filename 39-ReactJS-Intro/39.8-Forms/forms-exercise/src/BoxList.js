import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import "./BoxList.css";

const BoxList = () => {
  // Place your state that contains all of the boxes here. This component should render all of the Box components along with the NewBoxForm component
  const INITIAL_STATE = [
    { backgroundColor: "red", width: 50, height: 50, id: uuidv4() },
    { backgroundColor: "green", width: 50, height: 50, id: uuidv4() },
    { backgroundColor: "blue", width: 50, height: 50, id: uuidv4() }
  ];
  const [boxes, setBoxes] = useState(INITIAL_STATE);

  const addItem = (newItem) => {
    setBoxes((boxes) => [...boxes, { ...newItem }]);
  };

  const deleteBox = (boxId) => {
    setBoxes(boxes.filter((box) => box.id !== boxId));
  };

  return (
    <>
      <div className='BoxList'>
        {boxes.map((b) => (
          <Box
            key={b.id}
            id={b.id}
            backgroundColor={b.backgroundColor}
            width={b.width}
            height={b.height}
            deleteBox={() => deleteBox(b.id)}
          />
        ))}
      </div>
      <NewBoxForm addItem={addItem} />
    </>
  );
};

export default BoxList;
