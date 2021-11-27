import { useState, useEffect } from 'react';

export function useGetJSON(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [i, setI] = useState(0);

  const refetch = () => {
    setI(i + 1);
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [url, i]);
  return { data, loading, refetch };
}
