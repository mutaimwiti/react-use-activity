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
    activityEvents
      .split(' ')
      .forEach((event) => document.addEventListener(event, handleMouseMove));

    return () => {
      clearTimeout(timer);
      activityEvents
        .split(' ')
        .forEach((event) =>
          document.removeEventListener(event, handleMouseMove),
        );
    };
  }, []);
};

export { useActivity };
