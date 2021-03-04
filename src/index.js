import { useEffect } from 'react';

const useActivity = ({
  onActivity,
  onInactivity,
  activityEvents = 'mousemove',
  inactivityTimeout = 2000,
}) => {
  useEffect(() => {
    let timeout = null;

    const startTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onInactivity();
      }, inactivityTimeout);
    };

    const handleMouseMove = () => {
      onActivity();
      startTimeout();
    };

    startTimeout();
    document.addEventListener(activityEvents, handleMouseMove);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener(activityEvents, handleMouseMove);
    };
  }, []);
};

export { useActivity };
