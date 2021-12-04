import Head from 'next/head';
import { Footer } from '../footer';
import { Navbar } from '../navbar';

export function LayoutComponent({ children }) {
  return (
    <>
      <Head>
        <title>openwind</title>
        <meta name="description" content="Community driven Tailwind UI Kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="mt-16">{children}</main>
      <Footer />
    </>
  );
}
