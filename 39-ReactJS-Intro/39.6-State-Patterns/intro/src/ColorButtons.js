const ColorButtons = (props) => {
  return (
    <>
      {props.options.map((c) => (
        <button
          onClick={() => props.addCircle(c)}
          className='ColorButton-btn'
          style={{ backgroundColor: c }}
        >
          {c}
        </button>
      ))}
    </>
  );
};

export default ColorButtons;
