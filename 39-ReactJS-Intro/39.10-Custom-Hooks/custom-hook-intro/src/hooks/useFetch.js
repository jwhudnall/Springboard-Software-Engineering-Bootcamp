import { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // after first render, fetch data:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return { response, error, isLoading };
};

export default useFetch;
