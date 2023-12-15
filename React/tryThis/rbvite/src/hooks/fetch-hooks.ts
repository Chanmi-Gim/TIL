import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(url, { signal })
      .then((res) => res.json())
      .then((data) => setData(data));
    return () => controller.abort();
  }, []);
  return data;
};
