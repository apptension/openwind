import { getLikes, insertLikes, updateLikes } from '../modules/element/element.api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { isEmpty } from 'ramda';

export const useElementDetails = (id) => {
  const initialValue = { likes: 0, hearts: 0, fires: 0, rockets: 0, unicorns: 0 };
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery(['reactions', id], () => getLikes(id), {
    enabled: !!id,
  });

  const insertLikesById = useMutation(
    ({ id, value, type }) => {
      return insertLikes(id, value, type);
    },
    {
      onMutate: async ({ id, value, type }) => {
        await queryClient.cancelQueries('reactions');

        const previousValue = queryClient.getQueryData('reactions');

        queryClient.setQueryData('reactions', () => ({ value }));
        return previousValue;
      },

      onError: (err, variables, previousValue) => queryClient.setQueryData('reactions', previousValue),

      onSettled: () => {
        queryClient.invalidateQueries('reactions');
      },
    }
  );

  const updateLikesById = useMutation(
    ({ id, value, type }) => {
      return updateLikes(id, value, type);
    },
    {
      onMutate: async ({ id, value, type }) => {
        await queryClient.cancelQueries('reactions');

        const previousValue = queryClient.getQueryData('reactions');

        queryClient.setQueryData('reactions', () => ({ value }));

        return previousValue;
      },

      onError: (err, variables, previousValue) => queryClient.setQueryData('reactions', previousValue),

      onSettled: () => {
        queryClient.invalidateQueries('reactions');
      },
    }
  );

  return {
    reactions: isEmpty(data) ? initialValue : data?.[0],
    isFetching,
    insertLikesById,
    updateLikesById,
    initialValue,
  };
};
