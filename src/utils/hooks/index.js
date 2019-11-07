import { useState, useEffect, useRef } from 'react'

export function useFetch(fetchFunc, ...params) {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const func = async () => {
    setFetching(true)
    try {
      setError(null)
      const r = await fetchFunc(...params)
      setFetching(false)
      return r
    }
    catch (error) {
      setFetching(false)
      setError(error.message)
    }
  }

  return [func, {fetching, setFetching, error, setError}]
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useRetry(func, intervalInMs = 200) {
  const [didSuccess, setDidSuccess] = useState(false)
  useInterval(() => {
    if(!didSuccess && func()) 
      setDidSuccess(true)
  }, intervalInMs)
  return didSuccess
}