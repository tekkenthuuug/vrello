import { useState } from 'react';

const useFetch = (fetchUrl, requestInit) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const headers = {
    'Content-type': 'application/json',
  };

  if (requestInit?.headers) {
    Object.assign(headers, {}, requestInit.headers);
  }

  const fetchData = async (additionalBody = {}) => {
    setIsLoading(true);

    const body = additionalBody;

    if (requestInit?.body) {
      Object.assign(body, {}, requestInit.body);
    }

    const response = await fetch(fetchUrl, {
      headers,
      body: JSON.stringify(body),
      ...requestInit,
    });

    const data = response.json();

    setData(data);
    setIsLoading(false);

    return data;
  };

  return { isLoading, data, fetchData };
};

export default useFetch;
