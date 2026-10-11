import React from 'react';
import { X, Play, Copy, Table, Wand2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryExample: () => void;
  isDark?: boolean;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({
  isOpen,
  onClose,
  onTryExample,
  isDark = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-blue-50/70 border-blue-100'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">How to Use WorkCraft AI</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                A 30-second guide to automating your daily work tasks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* What does it do */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-blue-50/40 border-blue-100'}`}>
            <h4 className="text-sm font-bold text-blue-600 dark:text-sky-400 mb-1.5 flex items-center gap-1.5">
              <span>What does this app do?</span>
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              WorkCraft AI is your personal workplace assistant. Instead of spending hours doing repetitive work (like drafting social media campaigns, organizing messy meeting notes, or writing client emails), it uses Google's <strong>Gemini AI</strong> to turn your notes into <strong>ready-to-use documents and spreadsheet tables</strong> in seconds.
            </p>
          </div>

          {/* 3 Simple Steps */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              How to use it in 3 easy steps:
            </h4>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-0.5">Choose your work task</h5>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Click one of the tools at the top (e.g. <em>Holiday Campaign</em>, <em>Meeting Notes</em>, or <em>Customer Responder</em>). We've already filled in sample data so you can test it immediately without typing.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-0.5">Click "Execute Workplace App"</h5>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Press the big blue button. Gemini 3.8 Flash will analyze the inputs and instantly draft your posts, image prompts, executive summaries, and action schedules.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-0.5">Copy for Spreadsheet or Tweak</h5>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Click <strong>"Copy for Spreadsheet"</strong> to paste the table directly into Google Sheets or Excel, or click any iteration button to ask the AI to change the tone, add details, or format as an email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-medium border ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onTryExample();
            }}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Try Example Now in 1-Click</span>
          </button>
        </div>
      </div>
    </div>
  );
};
