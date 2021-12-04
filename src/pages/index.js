import { HomeProvider } from '../modules/home';
import { HomeSearch } from '../components/home/homeSearch';
import { HomeHero } from '../components/home/homeHero';
import { Layout } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <HomeProvider>
        <HomeHero />
        <HomeSearch />
      </HomeProvider>
    </Layout>
  );
}
