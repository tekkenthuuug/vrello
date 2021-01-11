import { useState, useEffect, useRef } from 'react';

const useSuspendedState = (initialState, timeout = 100) => {
  const [suspendedState, setSuspendedState] = useState(initialState);
  const [state, setState] = useState(initialState);

  const timeoutId = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      setSuspendedState(state);
    }, [timeout]);

    return () => clearTimeout(timeoutId.current);
  }, [state, timeoutId, timeout]);

  return [state, setState, suspendedState];
};

export default useSuspendedState;
