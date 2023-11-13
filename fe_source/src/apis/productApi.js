import axios from 'axios';
import {useEffect, useState} from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const page = 1;
    const limit = 20;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://93d7-2402-800-6388-1bde-b92d-d466-1228-440d.ngrok-free.app/products/search?page=1&limit=20`,
      );
      setData(response.data.data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetcData();
  };
  return {data, isLoading, error, refetch};
};
export default useFetch
