import "./Circle.css";

const Circle = (props) => {
  return (
    <div className='Circle' style={{ backgroundColor: props.color }}>
      {props.idx + 1}
    </div>
  );
};

export default Circle;
