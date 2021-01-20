import { QueryClient } from 'react-query';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
      },
    },
  });

export default createQueryClient;
