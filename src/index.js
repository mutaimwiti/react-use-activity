import { useEffect } from 'react';

const useActivity = ({
  onActivity,
  onInactivity,
  inactivityTimeout = 2000,
}) => {
  let timeout;

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

  useEffect(() => {
    startTimeout();
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

module.exports = useActivity;
