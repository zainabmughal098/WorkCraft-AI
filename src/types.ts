export interface InputField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
  sampleValue?: string;
  description?: string;
}

export interface WorkplaceApp {
  id: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  template: string;
  inputsSummary?: string;
  processSummary?: string;
  outputSummary?: string;
  goalSummary?: string;
  systemInstructions: string;
  inputFields: InputField[];
  suggestedIterations: string[];
  iconName: string;
}

export interface AppOutputData {
  summary: string;
  markdown: string;
  spreadsheetData?: {
    hasTable: boolean;
    headers: string[];
    rows: string[][];
    tsvString: string;
  };
  suggestedNextSteps?: string[];
}

export interface IdeaItem {
  id: string;
  title: string;
  template: string;
  inputsSummary: string;
  processSummary: string;
  outputSummary: string;
  goalSummary: string;
  inputFields: InputField[];
  suggestedIterations: string[];
}

export type ThemeId = 'ocean-blue' | 'workspace-emerald' | 'slate-modern' | 'warm-amber' | 'midnight';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  accent: string;
  primaryBg: string;
  primaryText: string;
  cardBg: string;
  badgeBg: string;
  badgeText: string;
  buttonClass: string;
  subtleClass: string;
  borderClass: string;
}
