import React, { useEffect, useState } from 'react';

const DateUpdater = ({ value, interval, formatFn }) => {
  const [date, setDate] = useState(formatFn(value));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(formatFn(value));
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, formatFn, value]);

  return <span>{date}</span>;
};

export default DateUpdater;
