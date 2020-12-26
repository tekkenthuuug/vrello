import { useState, useCallback } from 'react';

const defaultHeaders = {
  'Content-type': 'application/json',
};

const useFetch = (fetchUrl, requestInit) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const headers = defaultHeaders;

  if (requestInit?.headers) {
    Object.assign(headers, {}, requestInit.headers);
  }

  const fetchData = useCallback(
    async (additionalBody = {}) => {
      setIsLoading(true);

      const body = additionalBody;

      if (requestInit?.body) {
        Object.assign(body, {}, requestInit.body);
      }

      const response = await fetch(fetchUrl, {
        headers,
        credentials: 'include',
        ...requestInit,
        body: ['POST', 'PUT'].includes(requestInit?.method)
          ? JSON.stringify(body)
          : undefined,
      });

      const data = response.json();

      setData(data);
      setIsLoading(false);

      return data;
    },
    [fetchUrl, requestInit, headers]
  );

  return [fetchData, { isLoading, data }];
};

export default useFetch;
