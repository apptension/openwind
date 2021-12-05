import { readFileSync } from 'fs-extra';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { Layout } from '../components/layout';

const components = {
  h1: ({ children }) => <h1 className="text-xxl font-bold">{children}</h1>,
  h2: ({ children }) => <h1 className="text-xl font-bold">{children}</h1>,
};

export default function Help({ source }) {
  return (
    <Layout>
      <div className="max-w-lg w-full m-auto mt-4">
        <MDXRemote {...source} components={components} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const source = readFileSync(path.resolve(__dirname, `../../../README.md`), 'utf-8');
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}
