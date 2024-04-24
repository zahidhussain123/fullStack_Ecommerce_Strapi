import React, { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(url);
        setData(res?.data?.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
