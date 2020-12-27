import { useState, useCallback } from 'react';

const defaultHeaders = {
  'Content-type': 'application/json',
};

const useFetch = (fetchUrl, requestInit) => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);

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

      const responseJSON = await fetch(fetchUrl, {
        headers,
        credentials: 'include',
        ...requestInit,
        body: ['POST', 'PUT'].includes(requestInit?.method)
          ? JSON.stringify(body)
          : undefined,
      });

      const response = await responseJSON.json();

      setResponse(response);
      setIsLoading(false);

      return response;
    },
    [fetchUrl, requestInit, headers]
  );

  return [fetchData, { isLoading, response }];
};

export default useFetch;
