import React, { useState } from 'react';
import { Copy, Check, Table, Download, ArrowUpDown, Search } from 'lucide-react';

interface SpreadsheetTableViewProps {
  headers: string[];
  rows: string[][];
  tsvString?: string;
  themeButtonClass?: string;
  isDark?: boolean;
}

export const SpreadsheetTableView: React.FC<SpreadsheetTableViewProps> = ({
  headers,
  rows,
  tsvString,
  themeButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white',
  isDark = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<'tsv' | 'csv' | null>(null);
  const [filterText, setFilterText] = useState('');
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Generate TSV if not provided
  const computedTsv = tsvString || [
    headers.join('\t'),
    ...rows.map(r => r.join('\t')),
  ].join('\n');

  // Generate CSV for download
  const computedCsv = [
    headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
    ...rows.map(r => r.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const copyForSpreadsheet = async (format: 'tsv' | 'csv' = 'tsv') => {
    try {
      const textToCopy = format === 'tsv' ? computedTsv : computedCsv;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopiedFormat(format);
      setTimeout(() => {
        setCopied(false);
        setCopiedFormat(null);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([computedCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'workplace_app_output.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered and sorted rows
  const filteredRows = rows.filter(row =>
    row.some(cell => cell.toLowerCase().includes(filterText.toLowerCase()))
  );

  const displayRows = [...filteredRows];
  if (sortCol !== null) {
    displayRows.sort((a, b) => {
      const valA = a[sortCol] || '';
      const valB = b[sortCol] || '';
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  const handleSort = (idx: number) => {
    if (sortCol === idx) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(idx);
      setSortAsc(true);
    }
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      {/* Top action header */}
      <div className={`p-4 flex flex-wrap items-center justify-between gap-3 border-b ${isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Spreadsheet View ({displayRows.length} rows)
            </div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Formatted for 1-click paste into Google Sheets & Excel
            </div>
          </div>
        </div>

        {/* The prominent Step 2 button! */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => copyForSpreadsheet('tsv')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-sm ${
              copied && copiedFormat === 'tsv'
                ? 'bg-emerald-600 text-white'
                : themeButtonClass
            }`}
            title="Copies tab-separated values ready to paste directly into Google Sheets or Excel"
          >
            {copied && copiedFormat === 'tsv' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard! Ready for Sheets</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy for Spreadsheet</span>
              </>
            )}
          </button>

          <button
            onClick={downloadCsv}
            className={`p-2 rounded-lg border text-sm flex items-center gap-1.5 transition-colors ${
              isDark
                ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
            title="Download as CSV file"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>

      {/* Search and quick filter */}
      <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <Search className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter spreadsheet records..."
          className={`w-full text-xs bg-transparent focus:outline-none ${isDark ? 'text-slate-200 placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'}`}
        />
        {filterText && (
          <button
            onClick={() => setFilterText('')}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className={isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(idx)}
                  className="px-3.5 py-2.5 font-semibold border-b cursor-pointer select-none hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{header}</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
            {displayRows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="text-center py-6 text-slate-400 text-xs">
                  No records match your filter.
                </td>
              </tr>
            ) : (
              displayRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={`transition-colors ${
                    isDark
                      ? 'hover:bg-slate-800/40 text-slate-300'
                      : 'hover:bg-blue-50/40 text-slate-700'
                  }`}
                >
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3.5 py-2.5 max-w-xs break-words">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Helpful hint footer */}
      <div className={`px-4 py-2 text-[11px] border-t flex items-center justify-between ${isDark ? 'bg-slate-800/30 text-slate-400 border-slate-800' : 'bg-slate-50/60 text-slate-500 border-slate-100'}`}>
        <span>Tip: Press "Copy for Spreadsheet" and paste directly (Ctrl+V / Cmd+V) into Google Sheets cell A1.</span>
        <span>{rows.length} rows × {headers.length} columns</span>
      </div>
    </div>
  );
};
