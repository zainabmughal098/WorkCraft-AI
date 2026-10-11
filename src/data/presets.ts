import { WorkplaceApp } from '../types';

export const PRESET_APPS: WorkplaceApp[] = [
  {
    id: 'social-holiday-posts',
    title: 'Holiday Campaign & Creative Visuals Hub',
    tagline: 'Draft festive social media posts, visual prompts, and multi-channel calendars in seconds',
    category: 'Marketing & Social Media',
    role: 'Social Media Manager',
    template: 'My app takes [holiday name, target audience, brand tone, and promo offer] and does [creative content drafting & visual ideation] to create [multi-channel posts, image generation prompts, hashtags, and a spreadsheet-ready posting schedule] that helps me [launch holiday campaigns 10x faster without creative burnout].',
    inputsSummary: 'holiday name, target audience, brand tone, promo offer',
    processSummary: 'creative content drafting & visual ideation',
    outputSummary: 'multi-channel posts, image generation prompts, hashtags, and a spreadsheet-ready posting schedule',
    goalSummary: 'launch holiday campaigns 10x faster without creative burnout',
    systemInstructions: `You are an elite Social Media Director and Creative Strategist.
Given the holiday, audience, tone, and promotion offer:
1. Provide a 1-week posting schedule with copy tailored for LinkedIn, Instagram (caption + carousel slide concepts), and X (threads/single posts).
2. Generate 3 detailed AI image prompts (photorealistic, vector graphic, and minimal lifestyle) that the user can use to generate campaign visuals.
3. Include high-engagement hashtags and call-to-action variants.
4. Structure data cleanly so the spreadsheet table contains Date/Day, Channel, Post Topic, Caption Draft, and Visual Asset Description.`,
    inputFields: [
      {
        id: 'holiday_name',
        label: 'Holiday / Special Occasion',
        type: 'text',
        placeholder: 'e.g. Earth Day, Black Friday, New Year 2027, International Coffee Day',
        sampleValue: 'Earth Day 2027 (Sustainable Living Focus)',
      },
      {
        id: 'brand_niche',
        label: 'Brand & Industry / Product',
        type: 'text',
        placeholder: 'e.g. EcoKits - Plastic-free household starter kits',
        sampleValue: 'VerdeLiving — Zero-waste refillable home cleaning products',
      },
      {
        id: 'brand_tone',
        label: 'Brand Voice / Tone',
        type: 'select',
        options: ['Inspiring & Eco-Conscious', 'Playful & Witty', 'Professional & Authoritative', 'Warm & Community-Driven'],
        sampleValue: 'Inspiring & Eco-Conscious',
      },
      {
        id: 'promo_details',
        label: 'Key Promotion or Call-to-Action',
        type: 'textarea',
        placeholder: 'e.g. 20% off bundles with code EARTH20 + 1 tree planted per order',
        sampleValue: 'Buy one refill kit, gift one to a community school garden + 25% off storewide with code EARTHRESTORE',
      },
    ],
    suggestedIterations: [
      'Add a button that copies all content so I can paste it into a spreadsheet',
      'Add 3 short TikTok/Reels video hook scripts',
      'Add budget allocation recommendations for paid boosting',
    ],
    iconName: 'Sparkles',
  },
  {
    id: 'meeting-action-matrix',
    title: 'Executive Meeting Notes to Action Matrix',
    tagline: 'Transform messy raw discussion notes into crisp executive summaries and spreadsheet action trackers',
    category: 'Operations & Management',
    role: 'Project Manager / Chief of Staff',
    template: 'My app takes [messy meeting bullets or transcript] and does [intelligent key decision extraction & task prioritization] to create [an executive summary, an owner/deadline spreadsheet matrix, and a follow-up email draft] that helps me [keep leadership aligned and ensure zero action items slip].',
    inputsSummary: 'messy meeting bullets or transcript',
    processSummary: 'intelligent key decision extraction & task prioritization',
    outputSummary: 'an executive summary, an owner/deadline spreadsheet matrix, and a follow-up email draft',
    goalSummary: 'keep leadership aligned and ensure zero action items slip',
    systemInstructions: `You are an executive Chief of Staff.
Analyze raw meeting notes or bullets.
1. Synthesize an Executive TL;DR (3 core decisions made).
2. Create an Action Item Matrix with Columns: Task ID, Action Item, Primary Owner, Priority (High/Med/Low), Estimated Due Date, and Status.
3. Formulate key risks or unresolved open questions.
4. Draft a concise, professional follow-up email ready to copy-paste to meeting attendees.`,
    inputFields: [
      {
        id: 'meeting_title',
        label: 'Meeting Subject & Date',
        type: 'text',
        placeholder: 'e.g. Q3 Product Roadmap & Resource Sync',
        sampleValue: 'Q3 Product Launch Readiness & Go-To-Market Sync (Oct 11)',
      },
      {
        id: 'raw_notes',
        label: 'Raw Meeting Notes / Transcript Bullets',
        type: 'textarea',
        placeholder: 'Paste your raw notes, bullets, or stream of thoughts here...',
        sampleValue: `- Sarah: Frontend checkout redesign is 85% done, but Stripe webhook edge case needs backend fix.
- Dave: Backend team can fix webhook by Tuesday 3pm, needs staging credentials from Marcus.
- Marcus: Will grant staging access today by 5pm. Also budget approved for load testing server ($1,200).
- Elena: Marketing campaign launch date delayed to Oct 24 to align with customer webinar. Need revised email sequence copy.
- Decision: We will soft-launch to beta tier on Oct 19, full public launch Oct 24.
- Open question: Who is doing the on-call pager rotation during launch weekend? Need volunteer by Thursday.`,
      },
      {
        id: 'urgency_level',
        label: 'Follow-up Urgency',
        type: 'select',
        options: ['High Urgency (Launch Critical)', 'Standard Follow-up', 'Informational Sync'],
        sampleValue: 'High Urgency (Launch Critical)',
      },
    ],
    suggestedIterations: [
      'Add a button that copies all content so I can paste it into a spreadsheet',
      'Format as a Slack announcement message with emoji tags',
      'Add a risk assessment section with mitigation steps',
    ],
    iconName: 'ClipboardList',
  },
  {
    id: 'customer-response-crafter',
    title: 'Customer Inquiry & De-escalation Responder',
    tagline: 'Craft empathetic, policy-compliant customer resolutions with multiple tone options',
    category: 'Customer Success & Support',
    role: 'Customer Support Lead',
    template: 'My app takes [customer complaint details and company policy context] and does [sentiment analysis and tailored resolution crafting] to create [3 tone-adjusted responses, internal ticket notes, and customer health risk rating] that helps me [de-escalate upset clients and protect customer retention].',
    inputsSummary: 'customer complaint details and company policy context',
    processSummary: 'sentiment analysis and tailored resolution crafting',
    outputSummary: '3 tone-adjusted responses, internal ticket notes, and customer health risk rating',
    goalSummary: 'de-escalate upset clients and protect customer retention',
    systemInstructions: `You are a Customer Experience Director.
Given a customer inquiry or frustrated complaint:
1. Provide an empathy-first diagnosis of the customer's emotional state and underlying need.
2. Provide 3 distinct email responses:
   - Option A: Warm & Reassuring (high empathy + immediate solution)
   - Option B: Direct & Professional (clear timeline + concise policy explanation)
   - Option C: Executive Concierge (VIP tone + courtesy credit/bonus)
3. Provide Internal Zendesk/Salesforce ticket notes formatted with Root Cause, Solution Provided, and Escalation Flag.
4. Provide a tabular summary of Ticket ID, Issue Type, Sentiment, Resolution Action, and Follow-up Date.`,
    inputFields: [
      {
        id: 'customer_name_tier',
        label: 'Customer Name & Tier',
        type: 'text',
        placeholder: 'e.g. Jordan Miller (Enterprise Plan, 3 yrs)',
        sampleValue: 'Rachel Vance (Annual Pro Plan, $2,400/yr)',
      },
      {
        id: 'complaint_text',
        label: 'Customer Message / Complaint',
        type: 'textarea',
        placeholder: 'Paste customer email or message...',
        sampleValue: `I've been trying to export our annual audit reports for 4 days now and the export tool crashes every single time at 80%. My board meeting is tomorrow morning and I look totally unprepared. This is unacceptable for the amount we pay your platform! I need this fixed immediately or I want a full refund and account cancellation.`,
      },
      {
        id: 'policy_context',
        label: 'Company Resolution Guidelines & Remedies',
        type: 'textarea',
        placeholder: 'e.g. Refund policy, workaround availability, courtesy credits allowed',
        sampleValue: `Data engineering can generate manual CSV within 1 hour. We can offer 1 month free service credit ($200) for severe disruptions. Apologize sincerely without admitting legal liability.`,
      },
    ],
    suggestedIterations: [
      'Add a button that copies all content so I can paste it into a spreadsheet',
      'Add 1-minute phone call script to handle via voice',
      'Add root-cause postmortem draft for engineering team',
    ],
    iconName: 'MessageSquareHeart',
  },
  {
    id: 'weekly-status-synthesizer',
    title: 'Weekly Team Snippets & VP Status Synthesizer',
    tagline: 'Combine fragmented individual updates into a cohesive executive digest and spreadsheet roadmap update',
    category: 'Team Operations',
    role: 'Engineering & Operations Manager',
    template: 'My app takes [individual team member bullet points and blocker notes] and does [cross-functional impact synthesis and priority ranking] to create [an executive VP summary, team celebration callouts, and spreadsheet progress log] that helps me [save 2 hours every Friday while elevating team visibility].',
    inputsSummary: 'individual team member bullet points and blocker notes',
    processSummary: 'cross-functional impact synthesis and priority ranking',
    outputSummary: 'an executive VP summary, team celebration callouts, and spreadsheet progress log',
    goalSummary: 'save 2 hours every Friday while elevating team visibility',
    systemInstructions: `You are an Engineering & Operations Director.
Synthesize team weekly bullets into:
1. Executive 3-Bullet "Wins of the Week" (business impact focused).
2. Key Blockers & Required Escalations (clearly identifying who is needed to unblock).
3. "Kudos & Shoutouts" highlighting team members' contributions.
4. Next Week Commitments formatted in a clear table: Team Member / Pod, Deliverable, Impact, Target Date.`,
    inputFields: [
      {
        id: 'team_name_week',
        label: 'Team Name & Week Number',
        type: 'text',
        placeholder: 'e.g. Core Platform Team - Week 42',
        sampleValue: 'Growth & Monetization Pod — Week ending Oct 11',
      },
      {
        id: 'team_updates',
        label: 'Raw Team Snippets (copied from Slack, Standup, or email)',
        type: 'textarea',
        placeholder: 'Paste notes from team members...',
        sampleValue: `- Alex: Shipped A/B test for onboarding step 3. Conversion up +4.2% in variant B! Tested 10k users.
- Priya: Fixed billing webhook race condition. Blocked on legal team signoff for new EU tax compliance terms.
- Kevin: Migrated database indexes, reduced median query latency from 320ms to 84ms. Big win for search performance.
- Maya: Finalized design specs for self-serve team invites. Need copy review from marketing.
- Blocker: Legal review queue is 10 days behind; Priya cannot deploy EU checkout without approval.`,
      },
    ],
    suggestedIterations: [
      'Add a button that copies all content so I can paste it into a spreadsheet',
      'Convert to high-impact Slack announcement format',
      'Add OKR progress percentage estimates',
    ],
    iconName: 'TrendingUp',
  },
];
