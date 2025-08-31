import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PreviewPane = ({ content, className = "" }) => {
  const components = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          className="rounded-md"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-6 border-b pb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3 mt-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-medium mb-2 mt-3">{children}</h4>,
    h5: ({ children }) => <h5 className="text-base font-medium mb-2 mt-3">{children}</h5>,
    h6: ({ children }) => <h6 className="text-sm font-medium mb-2 mt-3">{children}</h6>,
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-gray-100 italic">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
    th: ({ children }) => <th className="border px-4 py-2 text-left font-medium">{children}</th>,
    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
    hr: () => <hr className="border-t my-6" />,
  };

  return (
    <div className={`h-full bg-white border rounded-lg overflow-hidden ${className}`}>
      <div className="h-full overflow-y-auto">
        <div className="p-6">
          {content?.trim() ? (
            <ReactMarkdown components={components}>{content}</ReactMarkdown>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg mb-2">Start writing to see preview</p>
                <p className="text-sm">Your markdown will be rendered here in real-time</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between p-2 bg-gray-100 border-t text-xs text-gray-500">
        <div>Preview Mode</div>
        <div className="hidden sm:block">Rendered Markdown</div>
      </div>
    </div>
  );
};

export default PreviewPane;
