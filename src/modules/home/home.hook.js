import { useContext } from 'react';
import { HomeContext } from './home.provider';

export const useHome = () => {
  return useContext(HomeContext);
};

export const useHomeProvider = () => {
  // TODO: SEARCH COMPONENT LOGIC
  return {};
};
