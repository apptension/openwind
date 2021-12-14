import path from 'path';
import { readFileSync } from 'fs-extra';
import { HomeProvider } from '../modules/home';
import { HomeSearch } from '../components/home/homeSearch';
import { HomeHero } from '../components/home/homeHero';
import { Layout } from '../components/layout';
import { HomeTop } from '../components/home/homeTop';
import { HomeAll } from '../components/home/homeAll';
import { HomeResults } from '../components/home/homeResults';
import data from '../../elements.json';
import { getTotalReactions } from '../modules/home/hook.api';
import { map, values, propEq, flatten, find } from 'ramda';

export default function Home({ topElement }) {
  return (
    <Layout>
      <HomeProvider topElement={topElement}>
        <HomeHero />
        <HomeTop />
        <HomeAll>
          <HomeSearch />
          <HomeResults />
        </HomeAll>
      </HomeProvider>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { element_id } = await getTotalReactions();
  if (!element_id) {
    return { props: {} };
  }
  const element = find(propEq('id', element_id), flatten(map(values, values(data))));
  if (!element) {
    return { props: {} };
  }
  return {
    props: {
      topElement: {
        ...element,
        source: readFileSync(
          path.resolve(__dirname, `../lib/${element.category}/${element.type}/${element.id}/index.jsx`),
          'utf-8'
        ),
      },
    },
  };
}
