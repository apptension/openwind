import { createContext } from 'react';
import { useElementProvider } from './element.hook';

export const ElementContext = createContext({});

export const ElementProvider = ({ children, category, type, sources }) => {
  const values = useElementProvider({ category, type, sources });
  return <ElementContext.Provider value={values}>{children}</ElementContext.Provider>;
};
