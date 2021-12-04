import { HomeProvider } from '../modules/home';
import { HomeSearch } from '../components/home/homeSearch';
import { HomeHero } from '../components/home/homeHero';
import { Layout } from '../components/layout';
import { HomeTop } from '../components/home/homeTop';
import { HomeAll } from '../components/home/homeAll';
import { HomeResults } from '../components/home/homeResults';

export default function Home() {
  return (
    <Layout>
      <HomeProvider>
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
