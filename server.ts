import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Gemini client initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Brainstorm app ideas based on worksheet template
app.post('/api/gemini/brainstorm', async (req, res) => {
  try {
    const { role, task } = req.body;
    if (!role || !task) {
      return res.status(400).json({ error: 'Role and task are required' });
    }

    const prompt = `You are an expert AI productivity consultant helping a user in the Google AI Studio "Build with AI: A custom app to help you at work" lab.
The user is a: "${role}".
They often find themselves: "${task}".

Suggest 4 highly practical, distinct app ideas that are simple, standalone, and not dependent on external databases or systems.
For EACH idea, strictly follow this format template:
"My app takes [inputs] and does [process] to create [output] that helps me [goal]."

Return ONLY valid JSON matching this schema:
{
  "ideas": [
    {
      "id": "unique_string",
      "title": "Short catchy name (e.g. Holiday Post Draftsman, Meeting Action Extractor)",
      "template": "My app takes [inputs] and does [process] to create [output] that helps me [goal].",
      "inputsSummary": "[inputs text]",
      "processSummary": "[process text]",
      "outputSummary": "[output text]",
      "goalSummary": "[goal text]",
      "inputFields": [
        {
          "id": "field_key",
          "label": "Human readable label",
          "type": "text" | "textarea" | "select",
          "options": ["option1", "option2"], // only if type is select
          "placeholder": "Placeholder text",
          "sampleValue": "Realistic rich sample text so user can test instantly with 1-click"
        }
      ],
      "suggestedIterations": [
        "Add a button that copies all the content formatted for a spreadsheet",
        "Add executive bullet-point summary",
        "Include priority risk flags"
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Brainstorm error:', error);
    return res.status(500).json({ error: error.message || 'Failed to brainstorm ideas' });
  }
});

// Endpoint: Parse a custom template into an executable applet structure
app.post('/api/gemini/parse-app', async (req, res) => {
  try {
    const { template } = req.body;
    if (!template) {
      return res.status(400).json({ error: 'Template string is required' });
    }

    const prompt = `A user in the AI Studio "Build with AI: A custom app to help you at work" lab specified this app idea:
"${template}"

The template pattern is: "My app takes [inputs] and does [process] to create [output] that helps me [goal]."

Convert this into an interactive workplace tool definition.
Return ONLY valid JSON with this schema:
{
  "title": "Clear 2-4 word app title",
  "tagline": "A punchy 1-sentence value proposition",
  "category": "Operations | Marketing | Management | Sales | HR | Engineering | Personal Productivity",
  "extractedInputs": "Summary of inputs",
  "extractedProcess": "Summary of AI transformation process",
  "extractedOutput": "Summary of the output deliverables",
  "extractedGoal": "Summary of the user goal",
  "systemInstructions": "Clear, detailed system instructions for how the AI should process the user inputs to generate high-standard workplace deliverables.",
  "inputFields": [
    {
      "id": "snake_case_id",
      "label": "Input Label",
      "type": "text" | "textarea" | "select",
      "options": ["Optional option A", "Optional option B"],
      "placeholder": "Helpful placeholder",
      "sampleValue": "Realistic sample data so user can test right away",
      "description": "Short guidance"
    }
  ],
  "suggestedIterations": [
    "Add a button that formats all data so I can paste it into a spreadsheet",
    "Add a concise 3-bullet executive overview",
    "Add follow-up action items with deadlines"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Parse app error:', error);
    return res.status(500).json({ error: error.message || 'Failed to parse app specification' });
  }
});

// Endpoint: Execute the workplace app with inputs and optional iteration adjustments
app.post('/api/gemini/execute-app', async (req, res) => {
  try {
    const { appTitle, template, systemInstructions, inputs, iterationInstruction, previousOutput } = req.body;

    const inputContext = Object.entries(inputs || {})
      .map(([key, val]) => `[${key}]:\n${val}`)
      .join('\n\n');

    let prompt = `You are a high-performance custom workplace app built in Google AI Studio: "${appTitle}".
Specification: "${template}"

System Guidelines:
${systemInstructions || 'Analyze the inputs thoroughly and generate professional, actionable, pristine workplace output.'}

USER INPUTS:
${inputContext}
`;

    if (iterationInstruction) {
      prompt += `\nITERATION REQUEST FROM USER (Step 2 Lab modification):
"${iterationInstruction}"
Please refine or augment the output based on this exact instruction.
`;
      if (previousOutput) {
        prompt += `\nPREVIOUS OUTPUT STATE:
${previousOutput}
`;
      }
    }

    prompt += `\nProvide the response strictly as JSON with this schema:
{
  "summary": "Crisp 2-sentence executive summary of the result",
  "markdown": "Complete, beautifully formatted markdown with headings, bold text, bullet points, and clear sections",
  "spreadsheetData": {
    "hasTable": true,
    "headers": ["Column 1", "Column 2", "Column 3"],
    "rows": [
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
    ],
    "tsvString": "TSV formatted string with tabs and newlines ready to paste into Google Sheets or Excel"
  },
  "suggestedNextSteps": [
    "Add a button to export as email draft",
    "Add priority score column for spreadsheet",
    "Translate to multilingual summary"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Execute app error:', error);
    return res.status(500).json({ error: error.message || 'Failed to execute workplace app' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`WorkCraft AI Studio running on http://0.0.0.0:${port}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
