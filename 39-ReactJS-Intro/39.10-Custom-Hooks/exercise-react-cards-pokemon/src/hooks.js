import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

const useFlip = () => {
  const [flipState, setFlipState] = useState(true);
  const toggleState = () => {
    setFlipState((state) => !state);
  };
  return [flipState, toggleState];
};

const useAxios = (baseURL) => {
  const [data, setData] = useState([]);
  const addData = async (endpoint = false) => {
    const url = endpoint ? `${baseURL}/${endpoint}` : baseURL;
    const response = await axios.get(url);
    setData((data) => [...data, { ...response.data, id: uuid() }]);
  };

  return [data, addData];
};

// export default useFlip;
export { useFlip, useAxios };
