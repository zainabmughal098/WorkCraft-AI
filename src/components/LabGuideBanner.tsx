import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Copy, Check, Sparkles, Wand2, Palette, Share2, Layers } from 'lucide-react';

interface LabGuideBannerProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  isDark?: boolean;
}

export const LabGuideBanner: React.FC<LabGuideBannerProps> = ({ currentStep, onSelectStep, isDark = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps = [
    {
      num: 0,
      title: 'Worksheet / Idea',
      label: 'Identify a Task & Template',
      desc: 'Use Gemini to brainstorm 3-5 workplace app ideas using the template.',
      promptTemplate: `I’m a [your role, e.g. social media manager]. I often find myself [task from the worksheet, e.g. drafting posts and creative visuals around holidays]. I want to build an app that makes this easier. It must be simple, standalone, and not dependent on external databases or systems. Suggest 3-5 ideas. Format each using this template: "My app takes {{inputs}} and does {{process}} to create {{output}} that helps me {{goal}}."`,
      icon: Sparkles,
    },
    {
      num: 1,
      title: 'Step 1: Build & Run',
      label: 'Describe & Generate App',
      desc: 'Define inputs, process, output, and goal. AI Studio builds and executes it.',
      promptTemplate: `I want to build an app that takes [inputs] and does [process] to create [output] that helps me [goal].`,
      icon: Wand2,
    },
    {
      num: 2,
      title: 'Step 2: Iterate',
      label: 'Add New Features',
      desc: 'Add elements like "Copy for spreadsheet", tone adjusters, or summaries.',
      promptTemplate: `Add [element, e.g. a button] that [purpose, e.g. copies all the content so I can paste it into a spreadsheet].`,
      icon: Layers,
    },
    {
      num: 3,
      title: 'Step 3: Visual Style',
      label: 'Customize Appearance',
      desc: 'Change visual styling, e.g. "Change color scheme to use shades of blue".',
      promptTemplate: `Change the [visual property, e.g. the color scheme] of the app to use [style description, e.g. shades of blue].`,
      icon: Palette,
    },
    {
      num: 4,
      title: 'Step 4: Share',
      label: 'Publish & Distribute',
      desc: 'Flip the "Publish your app" switch and share the URL with teammates.',
      promptTemplate: `Publish your app to generate a public shareable URL for your coworkers.`,
      icon: Share2,
    },
  ];

  const copyPrompt = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className={`rounded-xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/70 border-blue-200/80 shadow-xs'}`}>
      <div className="p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-blue-950'}`}>
                Build with AI Lab: Custom Workplace App Guide
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                Interactive Companion
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Follow the 4 lab tasks to identify, build, iterate, style, and share your workplace automation tool.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
            isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-blue-200 text-blue-800 hover:bg-blue-100/60'
          }`}
        >
          <span>{isOpen ? 'Minimize' : 'Show Guide'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className={`px-3.5 pb-3.5 pt-1 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 ${isDark ? 'border-slate-800/80' : 'border-blue-100/80'}`}>
          {steps.map((st) => {
            const Icon = st.icon;
            const isActive = currentStep === st.num;
            return (
              <div
                key={st.num}
                onClick={() => onSelectStep(st.num)}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isActive
                    ? isDark
                      ? 'bg-blue-950/60 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                    : isDark
                    ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/70'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-blue-600 dark:text-blue-400' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {st.title}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'opacity-40'}`} />
                  </div>
                  <h4 className={`text-xs font-semibold leading-snug mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {st.label}
                  </h4>
                  <p className={`text-[11px] line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {st.desc}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className={`text-[10px] font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                    {isActive ? 'Current View' : 'Switch here →'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyPrompt(st.num, st.promptTemplate);
                    }}
                    title="Copy lab prompt template to clipboard"
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600"
                  >
                    {copiedIndex === st.num ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
