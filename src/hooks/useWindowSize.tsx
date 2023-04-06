import { useEffect, useState } from 'react';

export interface IUseWindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): IUseWindowSize {
  const [windowSize, setWindowSize] = useState<IUseWindowSize>({
    width: 1440,
    height: 900,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
