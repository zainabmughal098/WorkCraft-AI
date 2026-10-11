import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LabGuideBanner } from './components/LabGuideBanner';
import { AppRunner } from './components/AppRunner';
import { WorksheetBrainstormer } from './components/WorksheetBrainstormer';
import { CustomAppBuilderModal } from './components/CustomAppBuilderModal';
import { VisualThemeModal } from './components/VisualThemeModal';
import { ShareModal } from './components/ShareModal';
import { HowToUseModal } from './components/HowToUseModal';
import { PRESET_APPS } from './data/presets';
import { THEMES } from './data/themes';
import { WorkplaceApp, ThemeId } from './types';
import { Sparkles, Wand2, BookOpen, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [appsList, setAppsList] = useState<WorkplaceApp[]>(() => {
    const saved = localStorage.getItem('workcraft_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return PRESET_APPS;
  });

  const [currentAppId, setCurrentAppId] = useState<string>(() => {
    return PRESET_APPS[0].id;
  });

  const [activeThemeId, setActiveThemeId] = useState<ThemeId>('ocean-blue');
  const [activeView, setActiveView] = useState<'runner' | 'worksheet'>('runner');
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Modals
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHowToUseModalOpen, setIsHowToUseModalOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Parse URL parameters for shared links (?appId=...&standalone=true)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const appIdParam = params.get('appId');
      const standaloneParam = params.get('standalone');

      if (standaloneParam === 'true') {
        setIsStandalone(true);
      }
      if (appIdParam) {
        const found = appsList.find((a) => a.id === appIdParam);
        if (found) {
          setCurrentAppId(found.id);
        }
      }
    }
  }, [appsList]);

  // Persist custom apps
  useEffect(() => {
    localStorage.setItem('workcraft_apps', JSON.stringify(appsList));
  }, [appsList]);

  const currentApp = appsList.find((a) => a.id === currentAppId) || appsList[0];
  const currentTheme = THEMES[activeThemeId] || THEMES['ocean-blue'];
  const isDark = activeThemeId === 'midnight';

  const handleSelectStep = (stepNum: number) => {
    setCurrentStep(stepNum);
    if (stepNum === 0) {
      setActiveView('worksheet');
    } else if (stepNum === 1 || stepNum === 2) {
      setActiveView('runner');
    } else if (stepNum === 3) {
      setIsThemeModalOpen(true);
    } else if (stepNum === 4) {
      setIsShareModalOpen(true);
    }
  };

  const handleLoadAppFromWorksheet = (newApp: WorkplaceApp) => {
    setAppsList((prev) => [newApp, ...prev]);
    setCurrentAppId(newApp.id);
    setActiveView('runner');
    setCurrentStep(1);
  };

  const handleCreateCustomApp = (newApp: WorkplaceApp) => {
    setAppsList((prev) => [newApp, ...prev]);
    setCurrentAppId(newApp.id);
    setActiveView('runner');
    setCurrentStep(1);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${currentTheme.primaryBg} ${currentTheme.primaryText}`}>
      {/* Standalone colleague notification banner */}
      {isStandalone && (
        <div className="bg-blue-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
          <span>You are viewing a shared workplace tool published with AI Studio.</span>
          <button
            onClick={() => setIsStandalone(false)}
            className="underline text-blue-100 hover:text-white text-[11px]"
          >
            Open Full Studio & Lab Guide
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentApp={currentApp}
        appsList={appsList}
        onSelectApp={(app) => {
          setCurrentAppId(app.id);
          setActiveView('runner');
        }}
        onOpenNewAppModal={() => setIsNewAppModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenHowToUseModal={() => setIsHowToUseModalOpen(true)}
        activeView={activeView}
        onSelectView={setActiveView}
        currentTheme={currentTheme}
        isDark={isDark}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Lab Step-by-Step Interactive Guide */}
        {!isStandalone && (
          <LabGuideBanner
            currentStep={currentStep}
            onSelectStep={handleSelectStep}
            isDark={isDark}
          />
        )}

        {/* Quick App Preset Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className={`text-xs font-semibold shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Explore Workplace Apps:
          </span>
          {appsList.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                setCurrentAppId(app.id);
                setActiveView('runner');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border shrink-0 ${
                currentApp.id === app.id
                  ? isDark
                    ? 'bg-sky-950 border-sky-500 text-sky-200 ring-1 ring-sky-500'
                    : 'bg-white border-blue-500 text-blue-700 ring-2 ring-blue-500/20 shadow-xs'
                  : isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-blue-200'
              }`}
            >
              {app.title}
            </button>
          ))}
          <button
            onClick={() => setIsNewAppModalOpen(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border border-dashed transition-colors shrink-0 ${
              isDark ? 'border-slate-700 text-slate-400 hover:text-slate-200' : 'border-blue-300 text-blue-700 hover:bg-blue-50'
            }`}
          >
            + New Applet Prompt
          </button>
        </div>

        {/* Main Content Area */}
        {activeView === 'worksheet' ? (
          <WorksheetBrainstormer
            onLoadApp={handleLoadAppFromWorksheet}
            isDark={isDark}
            themeButtonClass={currentTheme.buttonClass}
          />
        ) : (
          <AppRunner
            app={currentApp}
            isDark={isDark}
            themeButtonClass={currentTheme.buttonClass}
            themeSubtleClass={currentTheme.subtleClass}
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            isStandalone={isStandalone}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 mt-12 transition-colors ${isDark ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-slate-200/80 bg-white/50 text-slate-500'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">WorkCraft AI Studio</span>
            <span>•</span>
            <span>Google AI Studio "Build with AI: A custom app to help you at work"</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">Powered by Gemini 3.8 Flash</span>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="text-blue-600 dark:text-sky-400 hover:underline font-medium"
            >
              Publish & Share
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CustomAppBuilderModal
        isOpen={isNewAppModalOpen}
        onClose={() => setIsNewAppModalOpen(false)}
        onCreateApp={handleCreateCustomApp}
        isDark={isDark}
        themeButtonClass={currentTheme.buttonClass}
      />

      <VisualThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        activeThemeId={activeThemeId}
        onSelectTheme={setActiveThemeId}
        isDark={isDark}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        app={currentApp}
        isDark={isDark}
      />

      <HowToUseModal
        isOpen={isHowToUseModalOpen}
        onClose={() => setIsHowToUseModalOpen(false)}
        onTryExample={() => {
          setActiveView('runner');
        }}
        isDark={isDark}
      />
    </div>
  );
}
