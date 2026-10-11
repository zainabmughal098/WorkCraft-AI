import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, ShieldCheck, Globe, Users, Code } from 'lucide-react';
import { WorkplaceApp } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: WorkplaceApp;
  isDark?: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  app,
  isDark = false,
}) => {
  const [isPublished, setIsPublished] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!isOpen) return null;

  // Generate shareable URL with parameters
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://aistudio.google.com';
  const shareUrl = `${currentOrigin}/?appId=${encodeURIComponent(app.id)}&standalone=true`;
  const embedCode = `<iframe src="${shareUrl}" width="100%" height="700" frameborder="0"></iframe>`;

  const copyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
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
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Step 4: Share Your App</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Publish your custom workplace app so coworkers can automate their workflows.
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
          {/* Exact Lab Step 4 Toggle */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-blue-50/50 border-blue-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isPublished ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <span>Publish your app</span>
                  {isPublished ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                      DRAFT
                    </span>
                  )}
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Make it available at the URL shown below for teammates
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => setIsPublished(!isPublished)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isPublished ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isPublished ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {isPublished ? (
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Shareable Workplace App URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono select-all ${
                      isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  <button
                    onClick={copyUrl}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy URL'}</span>
                  </button>
                </div>
              </div>

              {/* Quick test link */}
              <div className="flex items-center gap-2">
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-medium flex items-center gap-1.5 hover:underline ${isDark ? 'text-sky-400' : 'text-blue-600'}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Standalone Teammate View in New Tab</span>
                </a>
              </div>

              {/* Embed snippet */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Code className="w-3.5 h-3.5" />
                    <span>Embed into Internal Company Wiki / Notion / Portal</span>
                  </label>
                  <button
                    onClick={copyEmbed}
                    className="text-[11px] text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    {copiedEmbed ? 'Copied!' : 'Copy Embed Code'}
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={2}
                  value={embedCode}
                  className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                />
              </div>

              {/* Important Lab Notice */}
              <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-800 text-slate-400' : 'bg-amber-50/70 border-amber-200 text-amber-900'
              }`}>
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Lab reminder:</strong> Once published, your app is accessible to anyone with the link. You are responsible for the outputs it produces and should be prepared to maintain its functionality for your users.
                </p>
              </div>
            </div>
          ) : (
            <div className={`p-6 text-center rounded-xl border ${isDark ? 'bg-slate-800/30 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold mb-1">Your App is Currently Private</p>
              <p className="text-xs">Flip the switch above to make it accessible to your teammates.</p>
            </div>
          )}
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
