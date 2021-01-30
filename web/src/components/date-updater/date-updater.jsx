import React, { useEffect, useState } from 'react';

const DateUpdater = ({ value, interval = 10000, formatFn }) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(formatFn(value));

    const intervalId = setInterval(() => {
      setDate(formatFn(value));
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, formatFn, value]);

  return <span>{date}</span>;
};

export default DateUpdater;
