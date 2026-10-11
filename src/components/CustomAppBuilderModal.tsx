import React, { useState } from 'react';
import { X, Wand2, Loader2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { WorkplaceApp } from '../types';

interface CustomAppBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateApp: (app: WorkplaceApp) => void;
  isDark?: boolean;
  themeButtonClass?: string;
}

export const CustomAppBuilderModal: React.FC<CustomAppBuilderModalProps> = ({
  isOpen,
  onClose,
  onCreateApp,
  isDark = false,
  themeButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white',
}) => {
  const [templateInput, setTemplateInput] = useState(
    'I want to build an app that takes [customer support tickets and escalation notes] and does [triage, priority classification, and empathy response generation] to create [a categorized queue table, suggested replies, and risk ratings] that helps me [cut customer response times in half and prevent churn].'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleParseAndCreate = async () => {
    if (!templateInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/parse-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: templateInput }),
      });
      if (!res.ok) {
        throw new Error(`Parse failed: ${res.status}`);
      }
      const data = await res.json();

      const newApp: WorkplaceApp = {
        id: `app-${Date.now()}`,
        title: data.title || 'My Custom Workplace Tool',
        tagline: data.tagline || 'Custom automated workflow built with Google AI Studio',
        category: data.category || 'Productivity',
        role: 'Custom Specialist',
        template: templateInput,
        inputsSummary: data.extractedInputs,
        processSummary: data.extractedProcess,
        outputSummary: data.extractedOutput,
        goalSummary: data.extractedGoal,
        systemInstructions: data.systemInstructions || 'Analyze the inputs and generate pristine workplace deliverables.',
        inputFields: data.inputFields && data.inputFields.length > 0 ? data.inputFields : [
          {
            id: 'primary_input',
            label: 'Primary Work Inputs',
            type: 'textarea',
            placeholder: 'Enter inputs...',
            sampleValue: 'Sample project requirements and deliverables for review',
          },
        ],
        suggestedIterations: data.suggestedIterations || [
          'Add a button that copies all content so I can paste it into a spreadsheet',
          'Add executive 3-bullet summary',
        ],
        iconName: 'Wand2',
      };

      onCreateApp(newApp);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not parse template.');
    } finally {
      setLoading(false);
    }
  };

  const sampleTemplates = [
    'I want to build an app that takes [client feedback survey comments] and does [sentiment grouping and root-cause analysis] to create [a spreadsheet action table and executive briefing] that helps me [prioritize product bug fixes].',
    'I want to build an app that takes [interview candidate notes and job description requirements] and does [competency rubric scoring and synthesis] to create [a hiring recommendation memo and score matrix] that helps me [make faster, unbiased hiring decisions].',
    'I want to build an app that takes [sales pitch call notes and prospect objections] and does [objection reframing and value proposition matching] to create [a personalized deal closing email and battlecard] that helps me [win competitive enterprise deals].',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Step 1: Describe the App You Want to Build</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Replace the bracketed text with your own inputs, process, output, and goal.
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

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              The AI Studio Workplace App Prompt:
            </label>
            <textarea
              rows={4}
              value={templateInput}
              onChange={(e) => setTemplateInput(e.target.value)}
              placeholder="I want to build an app that takes [inputs] and does [process] to create [output] that helps me [goal]."
              className={`w-full p-3.5 rounded-xl border text-sm font-mono leading-relaxed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className={`text-xs font-medium block mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Or select an example from different departments:
            </span>
            <div className="space-y-2">
              {sampleTemplates.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setTemplateInput(t)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                    isDark
                      ? 'border-slate-800 bg-slate-800/40 hover:bg-slate-800 text-slate-300'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-blue-50/50 text-slate-700 hover:border-blue-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-xs font-medium border ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
          >
            Cancel
          </button>

          <button
            onClick={handleParseAndCreate}
            disabled={loading || !templateInput.trim()}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md disabled:opacity-50 ${themeButtonClass}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Building App in AI Studio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate App Form & Logic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
