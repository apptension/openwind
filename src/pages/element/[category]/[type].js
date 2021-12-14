import { useRouter } from 'next/router';
import data from '../../../../elements.json';
import path from 'path';
import { readFileSync } from 'fs-extra';
import { ElementList } from '../../../components/element/elementList';
import { Layout } from '../../../components/layout';
import { ElementProvider } from '../../../modules/element';

export default function ElementType({ sources }) {
  const router = useRouter();
  const { category, type } = router.query;
  return (
    <Layout>
      <ElementProvider category={category} type={type} sources={sources}>
        <ElementList />
      </ElementProvider>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { category, type } = params;
  const arr = data[category][type];
  const sources = arr.map((e) => ({
    id: e.id,
    source: readFileSync(
      path.resolve(__dirname, `../../../lib/${e.category}/${e.type}/${e.id}/index.jsx`),
      'utf-8'
    ),
  }));

  return {
    props: { sources },
  };
}
