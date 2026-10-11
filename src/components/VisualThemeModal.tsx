import React, { useState } from 'react';
import { X, Palette, Check, Sparkles, Copy } from 'lucide-react';
import { ThemeId } from '../types';
import { THEMES } from '../data/themes';

interface VisualThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeThemeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  isDark?: boolean;
}

export const VisualThemeModal: React.FC<VisualThemeModalProps> = ({
  isOpen,
  onClose,
  activeThemeId,
  onSelectTheme,
  isDark = false,
}) => {
  const [stylePrompt, setStylePrompt] = useState(
    'Change the color scheme of the app to use shades of blue.'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleApplyPrompt = () => {
    const lower = stylePrompt.toLowerCase();
    if (lower.includes('blue') || lower.includes('ocean')) {
      onSelectTheme('ocean-blue');
    } else if (lower.includes('green') || lower.includes('emerald') || lower.includes('workspace')) {
      onSelectTheme('workspace-emerald');
    } else if (lower.includes('slate') || lower.includes('indigo') || lower.includes('purple')) {
      onSelectTheme('slate-modern');
    } else if (lower.includes('amber') || lower.includes('warm') || lower.includes('gold') || lower.includes('orange')) {
      onSelectTheme('warm-amber');
    } else if (lower.includes('dark') || lower.includes('midnight') || lower.includes('black')) {
      onSelectTheme('midnight');
    } else {
      onSelectTheme('ocean-blue');
    }
    onClose();
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(stylePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Step 3: Change Your App's Visual Style</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Apply color schemes or customize visual aesthetics using AI Studio prompts.
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
        <div className="p-6 space-y-5">
          {/* Lab prompt copy box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Lab Step 3 Instruction:
              </label>
              <button
                onClick={copyPrompt}
                className="text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1 font-medium hover:underline"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy prompt template'}</span>
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                placeholder="Change the color scheme of the app to use shades of blue."
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <button
                onClick={handleApplyPrompt}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0 shadow-sm transition-all"
              >
                Apply Style
              </button>
            </div>
          </div>

          {/* Theme palette options */}
          <div>
            <label className={`block text-xs font-semibold mb-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Available Visual Palettes:
            </label>
            <div className="space-y-2.5">
              {Object.values(THEMES).map((th) => {
                const isSelected = activeThemeId === th.id;
                return (
                  <div
                    key={th.id}
                    onClick={() => {
                      onSelectTheme(th.id);
                      if (th.id === 'ocean-blue') {
                        setStylePrompt('Change the color scheme of the app to use shades of blue.');
                      } else {
                        setStylePrompt(`Change the color scheme of the app to use ${th.name.toLowerCase()}.`);
                      }
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? isDark
                          ? 'border-sky-500 bg-sky-950/40 ring-1 ring-sky-500'
                          : 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20'
                        : isDark
                        ? 'border-slate-800 bg-slate-800/40 hover:bg-slate-800'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full shadow-inner shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: th.accent }}
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {th.name}
                          </span>
                          {th.id === 'ocean-blue' && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Lab Default
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {th.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex justify-end ${isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
