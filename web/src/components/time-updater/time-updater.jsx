import React, { useEffect, useState } from 'react';

const TimeUpdater = ({ value, interval, formatFn }) => {
  // TODO: refactor

  const [time, setTime] = useState({ value: value });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(value => ({ ...value }));
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return <span>{formatFn(new Date(time.value))}</span>;
};

export default TimeUpdater;
