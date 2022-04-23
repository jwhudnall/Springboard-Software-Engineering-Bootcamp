import { Navigate } from "react-router-dom";

const DogDetails = ({ dog }) => {
  if (!dog) {
    return <Navigate to='/dogs' />;
  }

  return (
    <div>
      <h1>{dog.name}</h1>
      <img src={dog.src} width='300px' />
    </div>
  );
};

export default DogDetails;
