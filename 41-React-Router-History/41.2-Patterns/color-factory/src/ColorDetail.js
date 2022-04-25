import { Link } from "react-router-dom";

const ColorDetail = ({ color }) => {
  return (
    <div style={{ backgroundColor: `${color.colorValue}` }}>
      <h1>This is {color.colorName}</h1>
      <p>Isn't it beautiful?</p>
      <button>
        <Link to='/colors'>Go Back</Link>
      </button>
    </div>
  );
};

export default ColorDetail;
