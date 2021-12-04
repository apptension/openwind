import { createContext } from 'react';
import { useHomeProvider } from './home.hook';

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const values = useHomeProvider();
  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
};
