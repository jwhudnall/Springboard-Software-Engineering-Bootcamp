import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import DogList from "./DogList";
import FilterDogDetails from "./FilterDogDetails";

import Whiskey from "./images/whiskey.jpg";
import Duke from "./images/duke.jpg";
import Perry from "./images/perry.jpg";
import Tubby from "./images/tubby.jpg";

function App({ dogs }) {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav dogs={dogs} />
        <Routes>
          <Route path='/dogs' element={<DogList dogs={dogs} />} />
          <Route path='/dogs/:name' element={<FilterDogDetails dogs={dogs} />} />
          <Route path='/*' element={<Navigate to='/dogs' replace />} />
          {/* <Route path='/dogs/*' element={<Navigate to='/dogs' replace />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: Whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: Duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: Perry,
      facts: ["Perry loves all humans.", "Perry demolishes all snacks.", "Perry hates the rain."]
    },
    {
      name: "Tubby",
      age: 4,
      src: Tubby,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
};

export default App;
