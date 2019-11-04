import { useState, useEffect, useRef } from 'react'

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