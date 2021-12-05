import { createContext } from 'react';
import { useHomeProvider } from './home.hook';

export const HomeContext = createContext({});

export const HomeProvider = ({ children, topElement }) => {
  const values = useHomeProvider(topElement);
  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
};
