import { createContext } from 'react';
import { useBoardProvider } from './board.hook';

export const BoardContext = createContext({});

export const BoardProvider = ({ children }) => {
  const values = useBoardProvider();
  return <BoardContext.Provider value={values}>{children}</BoardContext.Provider>;
};
