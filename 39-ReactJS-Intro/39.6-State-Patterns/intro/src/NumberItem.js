const NumberItem = ({ number, remove }) => {
  const handleRemove = () => {
    remove(number);
  };
  return (
    <li>
      {/* <button onClick={() => remove(number)}>{number}</button> */}
      <button onClick={handleRemove}>{number}</button>
    </li>
  );
};

export default NumberItem;
