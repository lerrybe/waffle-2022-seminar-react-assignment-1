import { useEffect, useState } from 'react';

// DESC: useEffect를 통한 setState 비동기 해결을 위한 훅
// 🔴 TODO: 근데 왜 맘처럼 안돼...why..
function useSyncedState<T>(initialState: T) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState] as const;
}

export default useSyncedState;
