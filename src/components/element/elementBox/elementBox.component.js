import { Fragment, useEffect, useState } from 'react';

import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { Tab } from '@headlessui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
const TABS = ['Preview', 'Source'];

import { ELEMENT_BOX_MODE } from './elementBox.const';
import { supabase } from '../../../utils/supabaseClient';

const HEIGHT = 60;

export function ElementBoxComponent({ author, description, Component, source }) {
  const [copied, setCopied] = useState(false);
  const handleCopySuccess = () => {
    setCopied(true);
  };
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);
  const handleCopy = () => copy(source, { onCopy: handleCopySuccess });
  const handlePreview = () => setMode(ELEMENT_BOX_MODE.PREVIEW);
  const handleSource = () => setMode(ELEMENT_BOX_MODE.SOURCE);
  const handleLike = async () => {
    console.log('likes', likes);
    setLikes(likes + 1);
    if (likes) {
      await supabase
        .from('elements')
        .update({ likes: likes + 1 })
        .match({ element_id: id });
    } else {
      try {
        await supabase.from('elements').insert([{ element_id: id, likes: likes + 1 }]);
      } catch (e) {
        console.log(e);
      }
    }
  };
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
            {copied && 'Copied!'}
            {!copied && 'Copy'}
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
          <a className="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://github.com/${author}`}>
            {author}
          </a>
        </p>
      </div>

      <button onClick={handleLike}>
        <span className="flex items-end font-bold">🔥 {likes}</span>
      </button>
    </div>
  );
}
