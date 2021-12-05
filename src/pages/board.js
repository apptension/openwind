import Head from 'next/head';
import { Navbar } from '../components/navbar';
import { dehydrate, QueryClient } from 'react-query';
import { BoardProvider } from '../modules/board/board.provider';
import { getIssues } from '../modules/board/board.api';
import { Kanban } from '../components/kanban';
import { Layout } from '../components/layout';

export default function Board() {
  return (
    <Layout>
      <BoardProvider>
        <Kanban />
      </BoardProvider>
    </Layout>
  );
}

/* export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('issues', getIssues);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
 */
