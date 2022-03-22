const Clicker = () => {
  const fireLasers = (e) => {
    console.log(e);
    console.log("🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫");
    console.log("The lasers have been fired!");
    console.log("🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫🔫");
  };
  return (
    <>
      <button onClick={fireLasers}>CLICK ME!</button>;
      <textarea onScroll={fireLasers} rows='2'>
        lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk
        lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk
        lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk
        lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk
        lkajsdlkja;lskdj;laksjd;lkajs;dlkjasldk
      </textarea>
    </>
  );
};

export default Clicker;
