import { useCallback, useRef } from 'react';

const useThrottle = () => {
  const task = useRef<(() => void) | null>(null);

  return useCallback((f: () => void, time: number) => {
    if (!task.current) {
      setTimeout(() => {
        task.current?.();
        task.current = null;
      }, time);
    }

    task.current = f;
  }, []);
};

export default useThrottle;
