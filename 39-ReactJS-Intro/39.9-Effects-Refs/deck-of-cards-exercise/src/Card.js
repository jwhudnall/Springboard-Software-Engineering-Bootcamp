import "./Card.css";

const Card = ({ img, rotation }) => {
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
