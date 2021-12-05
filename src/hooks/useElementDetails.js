import { getLikes, insertLikes, updateLikes } from '../modules/element/element.api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { isEmpty } from 'ramda';

export const useElementDetails = (id) => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery(['likes', id], () => getLikes(id), {
    enabled: !!id,
  });

  const insertLikesById = useMutation(
    ({ id, likes }) => {
      return insertLikes(id, likes);
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: async ({ id, likes }) => {
        await queryClient.cancelQueries('likes');

        const previousValue = queryClient.getQueryData('likes');

        queryClient.setQueryData('likes', () => ({ likes }));
        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => queryClient.setQueryData('likes', previousValue),
      // After success or failure, refetch the todos query
      onSettled: () => {
        queryClient.invalidateQueries('likes');
      },
    }
  );

  const updateLikesById = useMutation(
    ({ id, likes }) => {
      return updateLikes(id, likes);
    },
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: async ({ id, likes }) => {
        await queryClient.cancelQueries('likes');

        const previousValue = queryClient.getQueryData('likes');

        queryClient.setQueryData('likes', () => ({ likes }));

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => queryClient.setQueryData('likes', previousValue),
      // After success or failure, refetch the todos query
      onSettled: () => {
        queryClient.invalidateQueries('likes');
      },
    }
  );

  return { likes: isEmpty(data) ? 0 : data?.[0]?.likes, isFetching, insertLikesById, updateLikesById };
};
