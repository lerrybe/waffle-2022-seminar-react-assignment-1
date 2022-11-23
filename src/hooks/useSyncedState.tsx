import { useEffect, useState } from 'react';

// DESC: useEffect를 통한 setState 비동기 해결
function useSyncedState<T>(initialState: T) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState] as const;
}

export default useSyncedState;
