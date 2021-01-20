const objectToSearchParams = object => {
  const searchParams = new URLSearchParams();

  Object.entries(object).forEach(([key, val]) => searchParams.set(key, val));

  return searchParams;
};

export default objectToSearchParams;
