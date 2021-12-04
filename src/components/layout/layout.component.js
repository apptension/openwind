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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="mt-16 flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
