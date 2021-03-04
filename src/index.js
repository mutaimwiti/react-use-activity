import { useEffect } from 'react';

const useActivity = ({
  onActivity = () => {},
  onInactivity = () => {},
  timeout = 2000,
  activityEvents = 'mousemove',
}) => {
  useEffect(() => {
    let timer = null;

    const startTimeout = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onInactivity();
      }, timeout);
    };

    const handleMouseMove = () => {
      onActivity();
      startTimeout();
    };

    startTimeout();
    document.addEventListener(activityEvents, handleMouseMove);

    return () => {
      clearTimeout(timer);
      document.removeEventListener(activityEvents, handleMouseMove);
    };
  }, []);
};

export { useActivity };
