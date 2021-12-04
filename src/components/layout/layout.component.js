import Head from 'next/head';
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
      <main>{children}</main>
    </>
  );
}
