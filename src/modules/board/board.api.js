import { fetcher } from '../../utils/fetcher';

export const getIssues = async () => {
  return await fetcher('/api/issues');
};
