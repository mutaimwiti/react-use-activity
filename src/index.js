// eslint-disable-next-line import/no-extraneous-dependencies
import { useEffect, useState } from 'react';

/* eslint no-undef: 0 */
const useActivity = ({
  onActivity = () => {},
  onInactivity = () => {},
  timeout = 2000,
  invokeOnActivityOnce = true,
  activityEvents = 'mousemove',
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer = null;

    const startTimeout = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onInactivity();
        setActive(false);
      }, timeout);
    };

    const eventListener = () => {
      startTimeout();
      if (invokeOnActivityOnce && active) return;
      setActive(true);
      onActivity();
    };

    startTimeout();
    activityEvents
      .split(' ')
      .forEach((event) => document.addEventListener(event, eventListener));

    return () => {
      clearTimeout(timer);
      activityEvents
        .split(' ')
        .forEach((event) => document.removeEventListener(event, eventListener));
    };
  }, [active, setActive]);
};

export { useActivity };
