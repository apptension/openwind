import { useContext } from 'react';
import { useQuery } from 'react-query';
import { fetcher } from '../../utils/fetcher';
import { BoardContext } from './board.provider';

export const useBoard = () => {
  return useContext(BoardContext);
};

export const useBoardProvider = () => {
  const { data, isFetching, error, isError } = useQuery('issues', () => fetcher('/api/issues'));
  const issues = data;
  return { issues, isFetching, error, isError };
};
