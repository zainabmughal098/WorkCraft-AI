import React from 'react';
import {
  Sparkles,
  Plus,
  Palette,
  Share2,
  BookOpen,
  ChevronDown,
  Layers,
  Wand2,
  Check,
  HelpCircle
} from 'lucide-react';
import { WorkplaceApp, ThemeConfig } from '../types';

interface HeaderProps {
  currentApp: WorkplaceApp;
  appsList: WorkplaceApp[];
  onSelectApp: (app: WorkplaceApp) => void;
  onOpenNewAppModal: () => void;
  onOpenThemeModal: () => void;
  onOpenShareModal: () => void;
  onOpenHowToUseModal: () => void;
  activeView: 'runner' | 'worksheet';
  onSelectView: (view: 'runner' | 'worksheet') => void;
  currentTheme: ThemeConfig;
  isDark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentApp,
  appsList,
  onSelectApp,
  onOpenNewAppModal,
  onOpenThemeModal,
  onOpenShareModal,
  onOpenHowToUseModal,
  activeView,
  onSelectView,
  currentTheme,
  isDark = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & App Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight">WorkCraft AI</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  AI Studio Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Custom Workplace App Studio
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block" />

          {/* App Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all max-w-[200px] sm:max-w-[280px] truncate ${
                isDark
                  ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <span className="truncate">{currentApp.title}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-60" />
            </button>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <div className={`absolute top-full left-0 mt-1.5 w-72 rounded-xl border shadow-xl z-50 py-1.5 overflow-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Workplace App Catalog
                  </div>
                  {appsList.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        onSelectApp(app);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentApp.id === app.id
                          ? isDark
                            ? 'bg-blue-950/60 text-sky-400 font-bold'
                            : 'bg-blue-50 text-blue-700 font-bold'
                          : isDark
                          ? 'text-slate-300 hover:bg-slate-800'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="truncate">{app.title}</div>
                        <div className="text-[10px] opacity-70 font-normal">{app.role}</div>
                      </div>
                      {currentApp.id === app.id && <Check className="w-3.5 h-3.5 shrink-0 text-blue-600" />}
                    </button>
                  ))}
                  <div className="p-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenNewAppModal();
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create New App (Step 1)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Lab Task Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => onSelectView('worksheet')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeView === 'worksheet'
                ? isDark
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Idea Worksheet (Step 0)</span>
          </button>

          <button
            onClick={() => onSelectView('runner')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeView === 'runner'
                ? isDark
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>App Runner & Iterate (Step 1 & 2)</span>
          </button>
        </div>

        {/* Right: Lab Controls (New App, Theme, Share) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHowToUseModal}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-sky-300 dark:hover:bg-slate-700 transition-colors border border-blue-200 dark:border-slate-700"
            title="How to use this app"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            <span>How to Use</span>
          </button>

          <button
            onClick={onOpenNewAppModal}
            className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-semibold items-center gap-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Step 1: Describe the app you want to build"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Applet</span>
          </button>

          <button
            onClick={onOpenThemeModal}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Step 3: Change your app's visual style (shades of blue)"
          >
            <Palette className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">{currentTheme.name}</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${currentTheme.buttonClass}`}
            title="Step 4: Share your app"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};
