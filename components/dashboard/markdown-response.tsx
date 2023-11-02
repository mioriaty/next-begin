'use client';

import { FC } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownResponseProps {
  content: string;
}

const MarkdownResponse: FC<MarkdownResponseProps> = ({ content }) => {
  return (
    <Markdown
      className={'text-sm overflow-hidden leading-7'}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            // @ts-ignore
            <SyntaxHighlighter {...rest} style={atomDark} wrapLongLines language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownResponse;
