import "./Card.css";

const Card = ({ img, rotation }) => {
  console.log(`Rotation:`);
  console.log(rotation);
  // render card
  return (
    <div
      className='Card'
      style={{
        backgroundImage: `url(${img})`,
        transform: `translate(${rotation})`
      }}
    ></div>
  );
};

export default Card;
