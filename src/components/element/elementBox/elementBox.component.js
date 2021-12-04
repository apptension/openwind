import { useState } from 'react';
import clsx from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { ELEMENT_BOX_MODE } from './elementBox.const';

export function ElementBoxComponent({ author, description, Component, source }) {
  const [mode, setMode] = useState(ELEMENT_BOX_MODE.PREVIEW);
  const handlePreview = () => setMode(ELEMENT_BOX_MODE.PREVIEW);
  const handleSource = () => setMode(ELEMENT_BOX_MODE.SOURCE);
  return (
    <div className="bg-blue-100 p-4 rounded">
      <div className="flex justify-between">
        <p>{description}</p>
        <p>by {author}</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handlePreview}
          className={clsx(
            {
              'border-blue-500 text-gray-900': mode === ELEMENT_BOX_MODE.PREVIEW,
              'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                mode !== ELEMENT_BOX_MODE.PREVIEW,
            },
            'inline-flex items-center px-1 pt-1 border-b-2 text-m font-medium'
          )}
        >
          Preview
        </button>
        <button
          onClick={handleSource}
          className={clsx(
            {
              'border-blue-500 text-gray-900': mode === ELEMENT_BOX_MODE.SOURCE,
              'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                mode !== ELEMENT_BOX_MODE.SOURCE,
            },
            'inline-flex items-center px-1 pt-1 border-b-2 text-m font-medium'
          )}
        >
          Source
        </button>
      </div>
      <div className="bg-white">
        {mode === ELEMENT_BOX_MODE.PREVIEW && (
          <div className="h-32 flex justify-center items-center">{Component.default()}</div>
        )}
        {mode === ELEMENT_BOX_MODE.SOURCE && (
          <SyntaxHighlighter showLineNumbers language="javascript" style={dracula}>
            {source}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
