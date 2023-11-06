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
        `http://localhost:3000/products/search?page=${page}&limit=${limit}`,
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
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
