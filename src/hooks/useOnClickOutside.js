import { useEffect } from 'react';

const useOnClickOutside = (elementRef, callback) => {
  const handleClick = e => {
    if (elementRef?.current && !elementRef.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  });
};

export default useOnClickOutside;
