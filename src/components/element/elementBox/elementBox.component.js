import { Fragment, useEffect, useState } from 'react';

import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { Tab } from '@headlessui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useElementDetails } from '../../../hooks/useElementDetails';
import { equals } from 'ramda';
import { ReactionButton } from './reactionButton';

const TABS = ['Preview', 'Source'];

const HEIGHT = 72;

export function ElementBoxComponent({ showReactions = true, className, author, description, Component, source, id }) {
  const [copied, setCopied] = useState(false);
  const { reactions, isFetching, insertLikesById, updateLikesById, initialValue } = useElementDetails(id);

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
    if (!equals(reactions, initialValue)) {
      updateLikesById.mutate({ id, reactions, value: reactions[type], type });
    } else {
      insertLikesById.mutate({ id, value: reactions[type], type });
    }
  };
  return (
    <div className={className}>
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
        {showReactions ? (
          <div className="flex">
            <ReactionButton
              value={reactions?.likes}
              disabled={isFetching}
              icon={'👍'}
              onClick={() => handleLike('likes')}
            />
            <ReactionButton
              value={reactions?.hearts}
              disabled={isFetching}
              icon={'❤️'}
              onClick={() => handleLike('hearts')}
            />
            <ReactionButton
              value={reactions?.unicorns}
              disabled={isFetching}
              icon={'🦄'}
              onClick={() => handleLike('unicorns')}
            />
            <ReactionButton
              value={reactions?.fires}
              disabled={isFetching}
              icon={'🔥'}
              onClick={() => handleLike('fires')}
            />
            <ReactionButton
              value={reactions?.rockets}
              disabled={isFetching}
              icon={'🚀'}
              onClick={() => handleLike('rockets')}
            />
          </div>
        ) : (
          <span />
        )}

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
