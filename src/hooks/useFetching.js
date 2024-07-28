import { useState } from 'react';

export const useFetcing = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...agrs) => {
    try {
      setIsLoading(true);
      await callback(...agrs);
      console.log(...agrs)
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};
