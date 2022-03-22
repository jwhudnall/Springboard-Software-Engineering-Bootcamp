const Clicker = () => {
  const fireLasers = () => {
    console.log("🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫");
    console.log("The lasers have been fired!");
    console.log("🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫");
  };
  return <button onClick={fireLasers}>CLICK ME!</button>;
};

export default Clicker;
