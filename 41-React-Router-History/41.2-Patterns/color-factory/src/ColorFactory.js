import ColorPickerBtn from "./ColorPickerBtn";
import ColorSelectList from "./ColorSelectList";

const ColorFactory = ({ colors }) => {
  return (
    <>
      <div>
        <h1>Welcome to the color factory.</h1>
        <ColorPickerBtn />
      </div>
      <div>
        <ColorSelectList colors={colors} />
      </div>
    </>
  );
};

export default ColorFactory;
