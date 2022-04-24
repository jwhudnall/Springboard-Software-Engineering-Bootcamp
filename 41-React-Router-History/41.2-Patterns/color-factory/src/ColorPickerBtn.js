import { Link } from "react-router-dom";

const ColorPickerBtn = () => {
  return (
    <button>
      <Link to='/colors/new'>Add a color</Link>
    </button>
  );
};

export default ColorPickerBtn;
