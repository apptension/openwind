import { useContext } from 'react';
import { BoardContext } from './board.provider';

export const useBoard = () => {
  return useContext(BoardContext);
};

export const useBoardProvider = () => {
  // TODO: SEARCH COMPONENT LOGIC
  return {};
};
