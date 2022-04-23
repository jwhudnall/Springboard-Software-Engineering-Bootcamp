const DogList = ({ dogs }) => {
  return (
    <div>
      {dogs.map((dog) => (
        <img src={dog.src} width='300px' />
      ))}
    </div>
  );
};

export default DogList;
