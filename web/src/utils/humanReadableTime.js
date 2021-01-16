import {
  isSameDay,
  subDays,
  format,
  isSameYear,
  differenceInMinutes as findDifferenceInMinutes,
} from 'date-fns';

const humanReadableTime = comparisonTimestamp => {
  const comparisonDate = new Date(comparisonTimestamp);
  const today = new Date();

  const yesterday = subDays(today, 1);

  let result = '';

  const differenceInMinutes = findDifferenceInMinutes(today, comparisonDate);

  if (differenceInMinutes <= 1) {
    result = 'just now';
  } else if (differenceInMinutes < 60) {
    const word =
      differenceInMinutes % 10 === 1 && differenceInMinutes !== 11
        ? 'minute'
        : 'minutes';
    result = `${differenceInMinutes} ${word} ago`;
  } else if (isSameDay(comparisonDate, today)) {
    result = 'today at ' + format(comparisonDate, 'HH:mm');
  } else if (isSameDay(comparisonDate, yesterday)) {
    result = 'yesterday at ' + format(comparisonDate, 'HH:mm');
  } else if (isSameYear(comparisonDate, today)) {
    result = 'at ' + format(comparisonDate, 'LLL dd');
  } else {
    result = 'at ' + format(comparisonDate, 'PP');
  }

  return result;
};

export default humanReadableTime;
