import { Fragment } from 'react';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { Tab } from '@headlessui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
const TABS = ['Preview', 'Source'];

const HEIGHT = 60;

export function ElementBoxComponent({ author, description, Component, source }) {
  const handleCopySuccess = () => {
    // TODO: HANDLE COPY SUCCESS
  };
  const handleCopy = () => copy(source, { onCopy: handleCopySuccess });
  return (
    <div>
      <div className="mb-2">
        <p>{description}</p>
      </div>
      <Tab.Group
        as="div"
        className={`w-full relative rounded-lg h-${HEIGHT} bg-gradient-to-tr from-blue-100 to-blue-500`}
      >
        <Tab.List as="div" className="absolute right-2 top-2">
          {TABS.map((tab) => (
            <Tab key={tab} as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx(
                    {
                      'bg-black bg-opacity-50 text-white': selected,
                      'bg-transparent text-white': !selected,
                    },
                    'text-white, px-2 py-1 rounded text-xs'
                  )}
                >
                  {tab}
                </button>
              )}
            </Tab>
          ))}
          <button onClick={handleCopy} className="bg-transparent text-white text-white, px-2 py-1 rounded text-xs">
            Copy
          </button>
        </Tab.List>
        <Tab.Panels as="div" className="h-full">
          <Tab.Panel as="div" className="h-full flex justify-center items-center">
            {Component.default()}
          </Tab.Panel>
          <Tab.Panel as="div" className="h-full">
            <SyntaxHighlighter
              showLineNumbers
              className={`max-h-${HEIGHT} h-full`}
              language="javascript"
              style={dracula}
            >
              {source}
            </SyntaxHighlighter>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className="mt-2 flex justify-end">
        <p>
          Author:{' '}
          <a className="text-blue-500" href={`https://github.com/${author}`}>
            {author}
          </a>
        </p>
      </div>
    </div>
  );
}
