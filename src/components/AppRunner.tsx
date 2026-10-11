import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  Copy,
  Check,
  Table as TableIcon,
  FileText,
  Loader2,
  Wand2,
  ArrowRight,
  PlusCircle,
  Clock,
  Send,
  SlidersHorizontal,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { WorkplaceApp, AppOutputData } from '../types';
import { MarkdownView } from './MarkdownView';
import { SpreadsheetTableView } from './SpreadsheetTableView';

interface AppRunnerProps {
  app: WorkplaceApp;
  isDark?: boolean;
  themeButtonClass?: string;
  themeSubtleClass?: string;
  onOpenThemeModal?: () => void;
  onOpenShareModal?: () => void;
  isStandalone?: boolean;
}

export const AppRunner: React.FC<AppRunnerProps> = ({
  app,
  isDark = false,
  themeButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white',
  themeSubtleClass = 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200',
  onOpenThemeModal,
  onOpenShareModal,
  isStandalone = false,
}) => {
  // Input form state
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<AppOutputData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'doc' | 'spreadsheet' | 'raw'>('doc');
  const [copiedDoc, setCopiedDoc] = useState(false);

  // Iteration state (Step 2)
  const [iterationInput, setIterationInput] = useState('');
  const [iterationHistory, setIterationHistory] = useState<string[]>([]);
  const [isIterating, setIsIterating] = useState(false);

  // Load sample values when app changes
  useEffect(() => {
    const initialVals: Record<string, string> = {};
    app.inputFields.forEach((field) => {
      initialVals[field.id] = field.sampleValue || '';
    });
    setInputValues(initialVals);
    setOutput(null);
    setIterationHistory([]);
    setError(null);
  }, [app.id]);

  const handleInputChange = (id: string, val: string) => {
    setInputValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleFillSample = () => {
    const samples: Record<string, string> = {};
    app.inputFields.forEach((f) => {
      samples[f.id] = f.sampleValue || '';
    });
    setInputValues(samples);
  };

  const handleClear = () => {
    const cleared: Record<string, string> = {};
    app.inputFields.forEach((f) => {
      cleared[f.id] = '';
    });
    setInputValues(cleared);
  };

  const handleExecute = async () => {
    setIsRunning(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/execute-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appTitle: app.title,
          template: app.template,
          systemInstructions: app.systemInstructions,
          inputs: inputValues,
        }),
      });

      if (!res.ok) {
        throw new Error(`Execution error: ${res.status}`);
      }

      const data: AppOutputData = await res.json();
      setOutput(data);
      if (data.spreadsheetData?.hasTable) {
        setActiveTab('spreadsheet');
      } else {
        setActiveTab('doc');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to execute applet');
    } finally {
      setIsRunning(false);
    }
  };

  const handleApplyIteration = async (instructionToRun?: string) => {
    const instruction = instructionToRun || iterationInput;
    if (!instruction.trim() || !output) return;

    setIsIterating(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/execute-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appTitle: app.title,
          template: app.template,
          systemInstructions: app.systemInstructions,
          inputs: inputValues,
          iterationInstruction: instruction,
          previousOutput: output.markdown,
        }),
      });

      if (!res.ok) {
        throw new Error(`Iteration error: ${res.status}`);
      }

      const updatedData: AppOutputData = await res.json();
      setOutput(updatedData);
      setIterationHistory((prev) => [...prev, instruction]);
      setIterationInput('');

      if (instruction.toLowerCase().includes('spreadsheet') || instruction.toLowerCase().includes('table')) {
        setActiveTab('spreadsheet');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to iterate on output');
    } finally {
      setIsIterating(false);
    }
  };

  const copyFullMarkdown = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output.markdown);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* App Header Card */}
      <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'}`}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                {app.role}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {app.category}
              </span>
              <span className="text-xs text-slate-400">
                Built with AI Studio
              </span>
            </div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {app.title}
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {app.tagline}
            </p>
          </div>

          {!isStandalone && (
            <div className="flex items-center gap-2">
              {onOpenThemeModal && (
                <button
                  onClick={onOpenThemeModal}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                    isDark ? 'border-slate-700 text-slate-200 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Step 3: Change Visual Style"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Style (Blue)</span>
                </button>
              )}
              {onOpenShareModal && (
                <button
                  onClick={onOpenShareModal}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${themeButtonClass}`}
                  title="Step 4: Share & Publish"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Publish / Share</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Template formula banner (Direct from lab instructions!) */}
        <div className={`p-3.5 rounded-xl border text-xs font-mono leading-relaxed ${
          isDark ? 'bg-slate-800/60 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
            App Formula Specification:
          </div>
          {app.template}
        </div>
      </div>

      {/* Friendly Quick-Start Guidance Bar */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isDark ? 'bg-blue-950/40 border-blue-800 text-blue-200' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-950'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
            ⚡
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-2">
              <span>Ready to Test: Sample data is loaded!</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-900 dark:bg-blue-900 dark:text-blue-200">
                Easy Mode
              </span>
            </div>
            <div className={`text-[11px] ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
              Click <strong>"Execute Workplace App"</strong> or <strong>"Run Now"</strong> to see Gemini create the deliverables.
            </div>
          </div>
        </div>

        <button
          onClick={handleExecute}
          disabled={isRunning}
          className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-md transition-all ${themeButtonClass}`}
        >
          {isRunning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Now (1-Click)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Runner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input configuration form */}
        <div className={`lg:col-span-5 p-6 rounded-2xl border space-y-5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              <Wand2 className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              <span>Step 1: Input Parameters</span>
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={handleFillSample}
                className="text-blue-600 dark:text-sky-400 hover:underline font-medium"
              >
                Fill Sample Data
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <button
                onClick={handleClear}
                className="text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {app.inputFields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label className={`block text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {field.label}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    rows={field.id === 'raw_notes' || field.id === 'complaint_text' || field.id === 'team_updates' ? 6 : 3}
                    value={inputValues[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full p-3 rounded-xl border text-xs leading-relaxed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={inputValues[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {field.options?.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={inputValues[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                )}

                {field.description && (
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {field.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={handleExecute}
              disabled={isRunning}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 ${themeButtonClass}`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing with Gemini 3.8 Flash...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute Workplace App</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}
        </div>

        {/* Right: Output Deliverables & Step 2 Iterations */}
        <div className="lg:col-span-7 space-y-5">
          {output ? (
            <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'}`}>
              {/* Executive Summary banner */}
              <div className={`p-4 rounded-xl border mb-5 relative overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/40 border-blue-800/80'
                  : 'bg-gradient-to-r from-blue-50/90 via-white to-indigo-50/60 border-blue-200/90 shadow-xs'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-blue-600 text-white">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-blue-900'}`}>
                      Executive Briefing & Key Decisions
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                    Gemini 3.8 Flash
                  </span>
                </div>
                <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {output.summary}
                </p>
              </div>

              {/* View switcher tabs */}
              <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('doc')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      activeTab === 'doc'
                        ? isDark
                          ? 'bg-slate-800 text-white'
                          : 'bg-blue-100 text-blue-900'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Formatted Deliverable</span>
                  </button>

                  {output.spreadsheetData?.hasTable && (
                    <button
                      onClick={() => setActiveTab('spreadsheet')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        activeTab === 'spreadsheet'
                          ? isDark
                            ? 'bg-slate-800 text-white'
                            : 'bg-blue-100 text-blue-900'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                      <span>Spreadsheet Table ({output.spreadsheetData.rows.length} rows)</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab('raw')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'raw'
                        ? isDark
                          ? 'bg-slate-800 text-white'
                          : 'bg-blue-100 text-blue-900'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Raw Markdown
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyFullMarkdown}
                    className="p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Copy full deliverable to clipboard"
                  >
                    {copiedDoc ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDoc ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* View body */}
              <div className="mb-6">
                {activeTab === 'doc' && (
                  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/60 max-h-[480px] overflow-y-auto">
                    <MarkdownView content={output.markdown} isDark={isDark} />
                  </div>
                )}

                {activeTab === 'spreadsheet' && output.spreadsheetData && (
                  <SpreadsheetTableView
                    headers={output.spreadsheetData.headers}
                    rows={output.spreadsheetData.rows}
                    tsvString={output.spreadsheetData.tsvString}
                    themeButtonClass={themeButtonClass}
                    isDark={isDark}
                  />
                )}

                {activeTab === 'raw' && (
                  <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[480px] ${
                    isDark ? 'bg-slate-950 text-slate-300' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {output.markdown}
                  </pre>
                )}
              </div>

              {/* Step 2: Iterate On Your App Engine */}
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                      Step 2: Iterate
                    </span>
                    <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      Iterate on your app
                    </span>
                  </div>
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Add features, tables, or changes
                  </span>
                </div>

                {/* Quick iteration suggestions from lab */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {app.suggestedIterations.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleApplyIteration(sug)}
                      disabled={isIterating}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border text-left transition-colors flex items-center gap-1.5 ${
                        isDark
                          ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'border-slate-200 bg-white hover:bg-blue-50 text-slate-700 hover:border-blue-200'
                      }`}
                    >
                      <PlusCircle className="w-3 h-3 text-blue-600 dark:text-sky-400 shrink-0" />
                      <span>{sug}</span>
                    </button>
                  ))}
                </div>

                {/* Custom iteration prompt input (exact template from lab!) */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={iterationInput}
                    onChange={(e) => setIterationInput(e.target.value)}
                    placeholder="Add [element, e.g. a button] that [purpose, e.g. copies all the content so I can paste it into a spreadsheet]"
                    className={`flex-1 px-3 py-2 rounded-xl border text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleApplyIteration();
                    }}
                  />
                  <button
                    onClick={() => handleApplyIteration()}
                    disabled={isIterating || !iterationInput.trim()}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50 shrink-0 ${themeButtonClass}`}
                  >
                    {isIterating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Apply Iteration</span>
                  </button>
                </div>

                {/* History of applied iterations */}
                {iterationHistory.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Applied Iterations ({iterationHistory.length}):
                    </span>
                    <div className="space-y-1">
                      {iterationHistory.map((it, idx) => (
                        <div key={idx} className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <Check className="w-3 h-3" />
                          <span>{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`p-12 text-center rounded-2xl border flex flex-col items-center justify-center ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50/80 border-slate-200 text-slate-500'
            }`}>
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-sky-400 mb-3">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Ready to Execute Your Workplace App
              </h3>
              <p className="text-xs max-w-md leading-relaxed mb-4">
                Fill in the input parameters on the left (or click "Fill Sample Data") and click "Execute Workplace App" to generate formatted deliverables, spreadsheet tables, and action items.
              </p>
              <button
                onClick={handleExecute}
                disabled={isRunning}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${themeButtonClass}`}
              >
                {isRunning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span>Run with Sample Data Now</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
