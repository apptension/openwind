import { useContext, useMemo } from 'react';
// import { readFileSync } from 'fs-extra';
import { ElementContext } from './element.provider';
import data from '../../../elements.json';
import { getLikes, insertLikes } from './element.api';
import { useMutation, useQuery } from 'react-query';

export const useElement = () => {
  return useContext(ElementContext);
};

export const useElementProvider = ({ category, type, sources }) => {
  const elements = useMemo(
    () =>
      (data?.[category]?.[type] || []).map((item) => ({
        ...item,
        Component: require(`../../lib/${item.category}/${item.type}/${item.id}/index.js`),
        source: sources.find((s) => s.id === item.id)?.source,
      })),
    [category, type, sources]
  );

  return { elements };
};
