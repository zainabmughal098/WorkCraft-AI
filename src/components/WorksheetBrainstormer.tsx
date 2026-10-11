import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Lightbulb, CheckCircle2, BookmarkPlus } from 'lucide-react';
import { IdeaItem, WorkplaceApp } from '../types';

interface WorksheetBrainstormerProps {
  onLoadApp: (app: WorkplaceApp) => void;
  isDark?: boolean;
  themeButtonClass?: string;
}

export const WorksheetBrainstormer: React.FC<WorksheetBrainstormerProps> = ({
  onLoadApp,
  isDark = false,
  themeButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white',
}) => {
  const [role, setRole] = useState('social media manager');
  const [task, setTask] = useState('drafting posts and creative visuals around holidays');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const roleSuggestions = [
    { role: 'social media manager', task: 'drafting posts and creative visuals around holidays' },
    { role: 'project manager', task: 'summarizing chaotic meeting notes into action items and follow-ups' },
    { role: 'customer support lead', task: 'writing empathetic de-escalation responses to angry enterprise users' },
    { role: 'HR people partner', task: 'drafting standardized performance reviews and growth feedback' },
    { role: 'sales engineer', task: 'turning technical product documentation into simple client pitch briefs' },
  ];

  const handleBrainstorm = async () => {
    if (!role.trim() || !task.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/brainstorm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, task }),
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data = await res.json();
      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
      } else {
        throw new Error('Invalid format returned by AI');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not brainstorm ideas at this time.');
    } finally {
      setLoading(false);
    }
  };

  const convertIdeaToApp = (idea: IdeaItem): WorkplaceApp => {
    return {
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: idea.title,
      tagline: `Automate ${idea.goalSummary || 'workplace tasks'} with custom Gemini intelligence`,
      category: 'Custom Workplace Automation',
      role: role.charAt(0).toUpperCase() + role.slice(1),
      template: idea.template,
      inputsSummary: idea.inputsSummary,
      processSummary: idea.processSummary,
      outputSummary: idea.outputSummary,
      goalSummary: idea.goalSummary,
      systemInstructions: `You are a custom workplace automation app: "${idea.title}".
Template: "${idea.template}"
Analyze user inputs carefully. Produce complete, professional, highly actionable work deliverables including executive summary, structured details, and spreadsheet-ready tabular data.`,
      inputFields: idea.inputFields || [
        {
          id: 'primary_inputs',
          label: 'Workplace Input Details',
          type: 'textarea',
          placeholder: 'Provide your details or paste raw notes...',
          sampleValue: 'Q4 Product release updates and launch checklist items',
        },
      ],
      suggestedIterations: idea.suggestedIterations || [
        'Add a button that copies all content so I can paste it into a spreadsheet',
        'Add executive 3-bullet summary',
      ],
      iconName: 'Wand2',
    };
  };

  return (
    <div className="space-y-6">
      {/* Intro card */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'}`}>
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>Optional Step: Identify a Workplace Task</span>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Idea Workshop & Role Worksheet Generator
          </h2>
          <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Before building in AI Studio, identify repetitive, time-consuming tasks in your day. Fill in your role and typical workflow to let Gemini formulate app ideas directly using the required lab template:
          </p>

          <div className={`p-3 rounded-xl border text-xs font-mono font-medium mb-6 ${isDark ? 'bg-slate-800/80 border-slate-700 text-sky-300' : 'bg-blue-50/70 border-blue-200 text-blue-900'}`}>
            “My app takes <span className="underline decoration-blue-500 font-bold">[inputs]</span> and does <span className="underline decoration-blue-500 font-bold">[process]</span> to create <span className="underline decoration-blue-500 font-bold">[output]</span> that helps me <span className="underline decoration-blue-500 font-bold">[goal]</span>.”
          </div>

          {/* Quick preset chips */}
          <div className="mb-4">
            <span className={`text-xs font-medium block mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Try an example role from the lab:
            </span>
            <div className="flex flex-wrap gap-2">
              {roleSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRole(s.role);
                    setTask(s.task);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    role.toLowerCase() === s.role.toLowerCase()
                      ? isDark
                        ? 'bg-blue-900/60 border-blue-500 text-blue-200'
                        : 'bg-blue-100 border-blue-300 text-blue-900'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {s.role}
                </button>
              ))}
            </div>
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Your Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. social media manager, recruiter, product designer"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Repetitive Task from your Worksheet
              </label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. drafting posts and creative visuals around holidays"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <button
            onClick={handleBrainstorm}
            disabled={loading || !role.trim() || !task.trim()}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-md disabled:opacity-50 ${themeButtonClass}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Brainstorming with Gemini 3.8...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Brainstorm 4 App Ideas with Gemini</span>
              </>
            )}
          </button>

          {error && (
            <p className="mt-3 text-xs text-rose-500 font-medium">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Generated Ideas Grid */}
      {ideas.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Suggested Workplace Apps for: <span className="text-blue-600 dark:text-blue-400 font-extrabold">{role}</span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Click "Launch this App in Studio" to automatically configure input forms and execute the tool.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea, idx) => (
              <div
                key={idea.id || idx}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all hover:shadow-md ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-sky-300 border border-blue-100 dark:border-slate-700">
                      Idea #{idx + 1}
                    </span>
                    <span className="text-xs text-slate-400">
                      {idea.inputFields?.length || 2} inputs
                    </span>
                  </div>

                  <h4 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {idea.title}
                  </h4>

                  <div className={`p-3 rounded-lg border text-xs font-mono mb-4 leading-relaxed ${
                    isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    {idea.template}
                  </div>

                  <div className="space-y-1.5 text-xs mb-4">
                    <div className="flex items-start gap-1.5">
                      <span className="font-semibold text-slate-500 w-16 shrink-0">Inputs:</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{idea.inputsSummary}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="font-semibold text-slate-500 w-16 shrink-0">Process:</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{idea.processSummary}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="font-semibold text-slate-500 w-16 shrink-0">Output:</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{idea.outputSummary}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="font-semibold text-slate-500 w-16 shrink-0">Goal:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">{idea.goalSummary}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Step 1 Ready
                  </span>
                  <button
                    onClick={() => onLoadApp(convertIdeaToApp(idea))}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${themeButtonClass}`}
                  >
                    <span>Launch in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
