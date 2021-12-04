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

const fuse = new Fuse(categories, { keys: ['category', 'subcategory', 'type'] });

export const useHomeProvider = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const elements = useMemo(
    () => (!isEmpty(searchPhrase) ? map((e) => e.item, fuse.search(searchPhrase)) : categories),
    [searchPhrase]
  );
  console.log(elements);
  const getCount = useCallback(
    ({ category, type }) => ({ category, type: startCase(type), count: data?.[category]?.[type]?.length || 0 }),
    []
  );
  const groupedElements = useMemo(() => groupBy(prop('category'), map(getCount, elements)), [elements, getCount]);
  console.log(groupedElements);
  const submitSearchPhrase = (phrase) => {
    setSearchPhrase(phrase);
  };
  return { elements, groupedElements, submitSearchPhrase };
};
