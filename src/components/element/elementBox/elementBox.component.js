import { Fragment, useEffect, useState } from 'react';

import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { Tab } from '@headlessui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
const TABS = ['Preview', 'Source'];

import { ELEMENT_BOX_MODE } from './elementBox.const';
import { supabase } from '../../../utils/supabaseClient';
import { useElement } from '../../../modules/element/element.hook';
import { useElementDetails } from '../../../hooks/useElementDetails';
import { equals, isEmpty } from 'ramda';
import { ReactionButton } from './reactionButton';

const HEIGHT = 60;

export function ElementBoxComponent({ author, description, Component, source, id }) {
  const [mode, setMode] = useState(ELEMENT_BOX_MODE.PREVIEW);
  const [copied, setCopied] = useState(false);
  const { likes, isFetching, insertLikesById, updateLikesById, initialValue } = useElementDetails(id);

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

  const handleLike = async (type) => {
    if (!equals(likes, initialValue)) {
      updateLikesById.mutate({ id, likes: likes[type], type });
    } else {
      insertLikesById.mutate({ id, likes: likes[type], type });
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
      <div className="mt-2 flex justify-between items-end">
        <div className="flex">
          <ReactionButton value={likes?.likes} disabled={isFetching} icon={'👍'} onClick={() => handleLike('likes')} />
          <ReactionButton
            value={likes?.hearts}
            disabled={isFetching}
            icon={'❤️'}
            onClick={() => handleLike('hearts')}
          />
          <ReactionButton
            value={likes?.unicorns}
            disabled={isFetching}
            icon={'🦄'}
            onClick={() => handleLike('unicorns')}
          />
          <ReactionButton value={likes?.fires} disabled={isFetching} icon={'🔥'} onClick={() => handleLike('fires')} />
          <ReactionButton
            value={likes?.rockets}
            disabled={isFetching}
            icon={'🚀'}
            onClick={() => handleLike('rockets')}
          />
        </div>
        <p>
          Author:{' '}
          <a className="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://github.com/${author}`}>
            {author}
          </a>
        </p>
      </div>
    </div>
  );
}
