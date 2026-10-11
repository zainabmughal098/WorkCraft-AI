import React from 'react';

interface MarkdownViewProps {
  content: string;
  className?: string;
  isDark?: boolean;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content, className = '', isDark = false }) => {
  // Clean markdown parsing into structured HTML safely
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className={`my-2 space-y-1.5 pl-6 list-disc ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-blue-700 dark:bg-slate-800 dark:text-sky-300 font-mono text-xs">$1</code>');
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('# ')) {
      flushList(index);
      inList = false;
      elements.push(
        <h1 key={index} className={`text-2xl font-bold mt-4 mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {trimmed.replace(/^#\s+/, '')}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList(index);
      inList = false;
      elements.push(
        <h2 key={index} className={`text-xl font-semibold mt-3 mb-1.5 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList(index);
      inList = false;
      elements.push(
        <h3 key={index} className={`text-lg font-medium mt-2.5 mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true;
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
    } else if (/^\d+\.\s+/.test(trimmed)) {
      flushList(index);
      inList = false;
      elements.push(
        <div key={index} className={`my-1 pl-4 flex gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <span className="font-semibold text-blue-600 dark:text-sky-400">{trimmed.match(/^\d+\./)?.[0]}</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^\d+\.\s+/, '')) }} />
        </div>
      );
    } else if (trimmed === '') {
      flushList(index);
      inList = false;
    } else {
      flushList(index);
      inList = false;
      elements.push(
        <p key={index} className={`my-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
      );
    }
  });

  flushList(lines.length);

  return <div className={`prose-sm max-w-none ${className}`}>{elements}</div>;
};
