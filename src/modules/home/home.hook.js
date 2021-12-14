import { useCallback, useContext, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { startCase } from 'lodash';
import { HomeContext } from './home.provider';
import categories from '../../../categories.json';
import data from '../../../elements.json';
import { groupBy, isEmpty, map, prop } from 'ramda';

export const useHome = () => {
  return useContext(HomeContext);
};

const fuse = new Fuse(categories, { keys: ['category', 'type'] });

export const useHomeProvider = (element) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const elements = useMemo(
    () => (!isEmpty(searchPhrase) ? map((e) => e.item, fuse.search(searchPhrase)) : categories),
    [searchPhrase]
  );
  const topElement = useMemo(
    () => ({
      ...element,
      Component: require(`../../lib/${element.category}/${element.type}/${element.id}/index.jsx`),
    }),
    [element]
  );

  const getCount = useCallback(
    ({ category, type }) => ({
      category,
      type,
      url: `${category}/${type}`,
      label: startCase(type),
      count: data?.[category]?.[type]?.length || 0,
    }),
    []
  );
  const groupedElements = useMemo(() => groupBy(prop('category'), map(getCount, elements)), [elements, getCount]);

  const submitSearchPhrase = (phrase) => {
    setSearchPhrase(phrase);
  };
  return { elements, topElement, groupedElements, submitSearchPhrase };
};
