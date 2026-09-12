export const BRAND = "QuantEdgeDataSolutions";

/* -- Navigation & shell -- */
export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Services",
    to: "/services",
    children: [
      {
        label: "Business Advisory",
        description: "Strategic guidance for growth and expansion decisions",
        to: "/services/business-advisory",
        icon: "advisory" as const,
      },
      {
        label: "Process Optimization",
        description: "Streamline workflows and remove operational friction",
        to: "/services/process-optimization",
        icon: "process" as const,
      },
      {
        label: "Market & Customer Intelligence",
        description: "Research markets, competitors, and customer behavior",
        to: "/services/market-customer-intelligence",
        icon: "market" as const,
      },
      {
        label: "BI & Decision Support",
        description: "Metrics and reporting built for leadership clarity",
        to: "/services/bi-decision-support",
        icon: "bi" as const,
      },
      {
        label: "Regulation & Compliance",
        description:
          "Practical guidance to meet requirements without the noise",
        to: "/services/regulation-compliance",
        icon: "compliance" as const,
      },
    ],
  },
];

/* -- About -- */
export const ABOUT_STATEMENTS = [
  {
    lead: "Our",
    accent: "Mission",
    copy: "We help businesses turn hard decisions into clear direction. We look at what's actually happening in your operations, your market, and your numbers, then build a straightforward path forward, not a generic framework.",
  },
  {
    lead: "Our",
    accent: "Values",
    copy: "Keep it honest. Back every recommendation with real analysis. Say what we actually think, even when it's not what you expected to hear. We care more about getting the decision right than sounding impressive.",
  },
  {
    lead: "Our",
    accent: "Goal",
    copy: "To become the advisor businesses turn to when a decision actually matters, helping them see clearly, decide with confidence, and move forward without second-guessing it.",
  },
];

/* -- Contact -- */
export const CONTACT_DETAILS = [
  {
    icon: "email" as const,
    title: "Email us",
    value: "info@quantedgedatasolutions.com",
    href: "mailto:info@quantedgedatasolutions.com",
    note: "Send us an email anytime",
  },
  {
    icon: "phone" as const,
    title: "Call us",
    value: "+(357)94001411",
    href: "tel:+35794001411",
    note: "Cyprus office",
  },
  {
    icon: "location" as const,
    title: "Visit us",
    value: "2 KOSTA VARNALI STREET, NICOSIA 1057 CYPRUS",
    href: null as string | null,
    note: "Our headquarters",
  },
  {
    icon: "hours" as const,
    title: "Working Hours",
    value: "6:00–18:00 UTC+2",
    href: null as string | null,
    note: "Monday–Friday",
  },
];

/* -- Footer -- */
export const FOOTER_COLS = {
  Services: [
    { label: "All Services", to: "/services" },
    { label: "Business Advisory", to: "/services/business-advisory" },
    { label: "Process Optimization", to: "/services/process-optimization" },
    {
      label: "Market & Customer Intelligence",
      to: "/services/market-customer-intelligence",
    },
    { label: "BI & Decision Support", to: "/services/bi-decision-support" },
    { label: "Regulation & Compliance", to: "/services/regulation-compliance" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  Legals: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Cookie Policy", to: "/cookie-policy" },
  ],
};

/* -- Home -- */
export const HOME_SERVICES = [
  {
    title: "Business Advisory",
    copy: "We help you make the big calls (growth, expansion, and strategy), backed by a clear read of your numbers, not guesswork.",
    image: "/assets/business advisory.webp",
    href: "/services/business-advisory",
  },
  {
    title: "Process Optimization",
    copy: "We map your workflows, find what's slowing you down, and streamline it, so your team moves faster with less friction.",
    image: "/assets/process optimization.webp",
    href: "/services/process-optimization",
  },
  {
    title: "Market & Customer Intelligence",
    copy: "We research your market, competitors, and customers, so every decision is grounded in what's actually happening out there.",
    image: "/assets/Market & customer intelligence.webp",
    href: "/services/market-customer-intelligence",
  },
  {
    title: "BI & Decision Support",
    copy: "We help leadership identify the right metrics to track and how to read them: clarity over noise, when it matters most.",
    image: "/assets/BI & descision support.webp",
    href: "/services/bi-decision-support",
  },
  {
    title: "Regulation & Compliance",
    copy: "We help you understand what applies, what doesn't, and how to stay aligned, without turning compliance into a full-time distraction.",
    image: "/assets/regulation & compliance 7.webp",
    href: "/services/regulation-compliance",
  },
];

export const HOME_DIFFERENTIATORS = [
  {
    number: "01",
    title: "Direct Access",
    copy: "You work directly with the person doing the analysis, not an account manager relaying your questions to someone else.",
  },
  {
    number: "02",
    title: "Built Around Your Business",
    copy: "No generic frameworks. Every recommendation is based on your actual numbers, workflows, and market, not a one-size-fits-all playbook.",
  },
  {
    number: "03",
    title: "Clear, Practical Reporting",
    copy: "You get findings and next steps you can actually act on, not a 40-page report that sits unread.",
  },
  {
    number: "04",
    title: "Transparent Scope and Pricing",
    copy: "You'll know exactly what's included and what it costs before we start, no surprise invoices or scope creep along the way.",
  },
];

export const HOME_FAQS = [
  {
    q: "How is this different from hiring a full-time consultant or advisor?",
    a: "You get senior-level thinking without the overhead of a full-time hire. We work with you on a project basis, you bring us in for the specific decision or problem at hand, and you're not committing to a long-term salary or retainer unless that's genuinely what you need.",
  },
  {
    q: "What's the actual process once I reach out?",
    a: "We start with a conversation about what you're facing and what you're trying to decide. From there, we scope the specific work involved, what we'll look at, what you'll get back, and roughly how long it'll take, before anything formally begins. Nothing starts without you knowing exactly what to expect.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "It depends on the scope: a focused piece of work (like a process review) might take a few weeks, while a broader strategic engagement can run longer. We'll give you a realistic timeline upfront based on what you actually need, not a generic estimate.",
  },
  {
    q: "Do you work with businesses of my size, or only large companies?",
    a: "We work with businesses at different stages, you don't need to be a large company to benefit from clear advice. What matters more is having a real decision or problem worth solving, not your company's size.",
  },
  {
    q: "What do I actually receive at the end of an engagement?",
    a: "Clear, practical recommendations you can act on, not just a lengthy report that sits unread. Depending on the service, that might be a strategic recommendation, a redesigned process, market research findings, or a reporting framework, always something concrete, tied to the decision you came to us with.",
  },
  {
    q: "Is my business information kept confidential?",
    a: "Yes. Anything you share with us during an engagement, your financials, internal processes, or strategic plans, stays confidential and is only used for the work you've hired us to do.",
  },
  {
    q: "How much does this typically cost?",
    a: "It varies based on the scope of the engagement, since a quick process review and a full market research project involve very different amounts of work. We'll give you clear, upfront pricing before anything starts, no vague hourly billing with an open-ended total.",
  },
];

/* -- Services index (/services) -- */
export const SERVICES_PAGE_FAQS = [
  {
    q: "How do I know which service is right for my business?",
    a: "You don't need to figure that out on your own. Tell us what you're facing (a growth decision, a process that's not working, a compliance question, or something else) and we'll point you toward the right service, or a combination of them.",
  },
  {
    q: "Can I use more than one service at the same time?",
    a: "Yes. Many clients combine services. For example, using Market & Customer Intelligence to inform a decision made through Business Advisory, or BI & Decision Support alongside Process Optimization. We'll scope a combined engagement if that's what fits.",
  },
  {
    q: "Do you work with businesses of my size?",
    a: "We work with businesses at different stages. You don't need to be a large company to benefit from clear, focused advice. What matters more is having a real decision or problem worth solving.",
  },
  {
    q: "How is pricing structured across your services?",
    a: "Pricing depends on the specific scope of each engagement, since a single workshop and a multi-week strategic review involve very different amounts of work. We'll give you clear, upfront pricing before anything starts, regardless of which service you need.",
  },
  {
    q: "Is my business information kept confidential across all your services?",
    a: "Yes. Anything you share with us (financials, internal processes, strategic plans) stays confidential and is only used for the work you've hired us to do, across every service we offer.",
  },
  {
    q: "Do your services include the actual technical build (websites, dashboards, automation)?",
    a: "No. Our consultancy work is advisory: strategy, research, analysis, and recommendations. If you need something actually built (a website, a dashboard, an automated workflow), that's handled by our main company, QuantEdgeDataSolutions, and we're happy to make that connection if it's the right next step.",
  },
];

/* -- Business Advisory -- */
export const BUSINESS_ADVISORY_FAQS = [
  {
    q: "How is this different from just hiring a financial advisor or accountant?",
    a: "An accountant or financial advisor typically focuses on your numbers after the fact: reporting, compliance, tax planning. Business Advisory is forward-looking: we help you decide what to actually do next, whether to expand, how to price, where to cut costs, using your financials as the evidence behind that decision, not just the record of it.",
  },
  {
    q: "Do I need to already have a clear problem in mind, or can you help me figure out what to focus on?",
    a: "Either works. Some clients come to us with a specific decision already in front of them (like whether to open a second location); others just know something isn't working and aren't sure what. We'll help identify the actual priority in the first conversation if it isn't already clear.",
  },
  {
    q: "What do you actually look at during a roadmapping or advisory engagement?",
    a: "It depends on the specific question, but typically your financials, current operations, market position, and competitive landscape, enough to understand the real constraints and opportunities before recommending a direction.",
  },
  {
    q: "Will you tell me what to do, or just give me options?",
    a: "We'll give you a clear recommendation, not just a list of options with no opinion. That said, we'll always explain the reasoning behind it, so the final call is still yours to make with full context.",
  },
  {
    q: "How often should we revisit the roadmap once it's set?",
    a: "Most businesses benefit from a review every quarter, or sooner if something significant changes (a new competitor, a market shift, a major internal change). We'll build a review checkpoint into the engagement from the start, rather than leaving you with a plan and no follow-up.",
  },
];

/* -- Process Optimization -- */
export const PROCESS_OPTIMIZATION_COVERS = [
  {
    number: "01",
    title: "Workflow Mapping & Waste Reduction",
    copy: "We map out how work actually moves through your business today, then identify the steps, delays, and handoffs that are slowing things down or adding no real value.",
  },
  {
    number: "02",
    title: "Automation Opportunity Assessment",
    copy: "We identify which manual, repetitive tasks are good candidates for automation, and point you toward the right solution, whether that's a simple tool or a custom-built system. (If you need it actually built, that's where our tech partner side comes in.)",
  },
  {
    number: "03",
    title: "SOPs & Documentation",
    copy: "We write clear, specific standard operating procedures so your team works the same way every time, not dependent on tribal knowledge or one person's memory.",
  },
  {
    number: "04",
    title: "Change Management & Rollout Support",
    copy: "We help your team actually adopt the new process, training, communication, and support during the transition, since a plan nobody follows isn't a fix.",
  },
];

export const PROCESS_OPTIMIZATION_HOW_WE_WORK = [
  {
    number: "01",
    title: "Diagnose",
    copy: "We review your current workflow and talk to the people actually doing the work, not just what's documented, but what really happens day to day.",
  },
  {
    number: "02",
    title: "Redesign",
    copy: "We build a specific, practical plan to fix the slow or broken steps, tailored to your team's size and tools, not a generic framework.",
  },
  {
    number: "03",
    title: "Support the Rollout",
    copy: "We help guide your team through adopting the new process, so the plan doesn't just sit in a document nobody reads.",
  },
  {
    number: "04",
    title: "Measure Results",
    copy: "We check back in against real metrics, time saved, errors reduced, output increased, to confirm the change actually worked, and adjust if it didn't.",
  },
];

export const PROCESS_OPTIMIZATION_FAQS = [
  {
    q: "How is this different from just asking my team to work faster?",
    a: "Most inefficiency isn't a motivation problem: it's a structural one (unnecessary steps, unclear handoffs, missing documentation). We fix the structure, so the same team naturally works faster without needing to push harder.",
  },
  {
    q: "Will this disrupt my business while it's happening?",
    a: "We design the rollout to minimize disruption, usually phased, with your team's daily operations continuing throughout. We'll always tell you upfront if a specific change requires a temporary slowdown.",
  },
  {
    q: "Do you actually build the automation tools, or just recommend them?",
    a: "We identify and recommend where automation makes sense. For actually building and deploying the solution, that's handled by our tech development partner, we'll make sure the handoff is smooth if that's the right next step.",
  },
  {
    q: "How long does a typical process optimization engagement take?",
    a: "It depends on scope: a single workflow review might take a couple of weeks, while a full operational overhaul across multiple departments takes longer. We'll give you a realistic timeline after the initial diagnosis.",
  },
  {
    q: "What if my team resists the new process?",
    a: "That's exactly what the Change Management phase is for: we don't just hand you a new SOP and leave. We help with training and communication specifically because adoption, not just design, is where most process changes actually fail.",
  },
];

/* -- Market & Customer Intelligence -- */
export const MARKET_INTELLIGENCE_COVERS = [
  {
    number: "01",
    title: "Market & Competitive Intelligence",
    points: [
      "Spotting shifting industry trends, emerging tech, and changing customer habits",
      "Benchmarking competitors' positioning, pricing, and offerings",
      "Identifying underserved gaps and real opportunities for growth",
      "Sizing the market to validate whether an expansion actually makes sense",
    ],
  },
  {
    number: "02",
    title: "Customer & Buyer Insights",
    points: [
      "Building data-driven profiles of who your buyers actually are and what drives them",
      "Mapping the real journey a buyer takes from first contact to purchase",
      "Gathering structured customer feedback, reviews, surveys, direct input",
      "Researching what keeps customers loyal, through structured studies rather than live tracking tools",
    ],
  },
  {
    number: "03",
    title: "Strategic Activation",
    points: [
      "Providing the research and validation behind entering a new market or launching something new (the actual go/no-go decision stays with Business Advisory, this supplies the evidence)",
      "Studying past wins and losses to understand exactly why prospects chose you or didn't",
      "Running periodic studies on how your brand is perceived in the market",
    ],
  },
];

export const MARKET_INTELLIGENCE_HOW_WE_WORK = [
  {
    number: "01",
    title: "Define the Question",
    copy: "We start by pinning down the specific decision you're trying to make, a launch, a pricing change, a new segment, so the research stays targeted, not generic.",
    image: "/assets/define the question.webp",
  },
  {
    number: "02",
    title: "Gather the Data",
    copy: "We run whichever research actually fits the question: competitor analysis, customer surveys, market sizing, or a mix, not a standard checklist applied regardless of relevance.",
    image: "/assets/gather the data.webp",
  },
  {
    number: "03",
    title: "Analyze & Synthesize",
    copy: "We turn the raw findings into clear, defensible patterns and takeaways, not a data dump, but a real answer you can act on.",
    image: "/assets/analyze & synthesis.webp",
  },
  {
    number: "04",
    title: "Deliver Recommendations",
    copy: "You get a specific recommendation tied directly to your original question, plus the reasoning behind it, ready to hand to whoever makes the final call.",
    image: "/assets/delivery recommendation.webp",
  },
];

export const MARKET_INTELLIGENCE_DIFFERENT = [
  {
    number: "01",
    title: "Original Research, Not Recycled Reports",
    copy: "We don't hand you a generic industry report. Every finding is built around your specific question, your market, your competitors, your customers.",
  },
  {
    number: "02",
    title: "Tied to Your Actual Decision",
    copy: "We don't research for the sake of research. Everything we gather is scoped to the specific call you're trying to make.",
  },
  {
    number: "03",
    title: "Objective, No Agenda",
    copy: "We're not selling you a pre-decided answer. If the data says your idea won't work, we'll tell you that too.",
  },
  {
    number: "04",
    title: "Clear Synthesis, Not Raw Data",
    copy: "You get a specific recommendation and the reasoning behind it, not a spreadsheet you have to interpret yourself.",
  },
];

export const MARKET_INTELLIGENCE_FAQS = [
  {
    q: "How is this different from just reading industry reports?",
    a: "Generic industry reports describe the market broadly. We research specifically in the context of your business, your customers, your competitors, your actual decision, so the findings are directly useful, not just interesting.",
  },
  {
    q: "Do you conduct real surveys and interviews, or just analyze existing data?",
    a: "Both, depending on what the question needs. Sometimes existing data answers it; sometimes we need to go directly to your customers or run competitor research ourselves.",
  },
  {
    q: "Can you help me decide if I should expand into a new market?",
    a: "We provide the research and validation behind that decision, market sizing, competitor landscape, customer demand. The final strategic call is handled through our Business Advisory service, working from the findings we provide here.",
  },
  {
    q: "How long does a typical research engagement take?",
    a: "It depends on scope: a focused competitor analysis might take a couple of weeks, while a full market-entry study takes longer. We'll scope the timeline based on your specific question.",
  },
  {
    q: "Will I get raw data, or a clear recommendation?",
    a: "You'll get a clear synthesis and recommendation, not just raw numbers, the goal is to make the findings usable, not to hand you a spreadsheet and leave you to interpret it.",
  },
];

/* -- BI & Decision Support -- */
export const BI_COVERS = [
  {
    title: "KPI Definition",
    copy: "Identifying the specific metrics that actually matter for your business, not a generic list borrowed from somewhere else.",
  },
  {
    title: "Reporting Structure Design",
    copy: "Deciding what gets reported, to whom, and how often, so the right information reaches the right people at the right time.",
  },
  {
    title: "Dashboard Advisory",
    copy: "Guiding what a dashboard should show and how it should be organized, before anyone builds it.",
  },
  {
    title: "Review Cadence",
    copy: "Setting up a regular rhythm for revisiting whether you're still tracking the right things as your business changes.",
  },
];

export const BI_HOW_WE_WORK = [
  {
    number: "01",
    title: "Understand the Decisions",
    copy: "We start by identifying the actual decisions your leadership needs to make regularly, growth calls, budget calls, operational calls, since the right metrics depend on the decisions they support.",
  },
  {
    number: "02",
    title: "Define the Right Metrics",
    copy: "We narrow down to the specific KPIs that genuinely reflect performance for your business, cutting out vanity metrics that look good but don't inform anything.",
  },
  {
    number: "03",
    title: "Design the Reporting Structure",
    copy: "We map out what gets reported, in what format, and on what cadence, so information reaches the right people without becoming noise.",
  },
  {
    number: "04",
    title: "Review and Adjust",
    copy: "As your business changes, we revisit whether you're still tracking the right things, metrics that mattered a year ago may not matter now.",
  },
];

export const BI_DIFFERENT = [
  {
    number: "01",
    title: "Advisory, Not Just Building",
    copy: "We help you decide what to track and why, the thinking behind the dashboard, not just the dashboard itself.",
  },
  {
    number: "02",
    title: "Signal Over Noise",
    copy: "We're deliberate about cutting metrics that look impressive but don't actually inform a decision.",
  },
  {
    number: "03",
    title: "Built Around Your Actual Decisions",
    copy: "Every metric we recommend ties back to a real decision your business needs to make, not a generic KPI template.",
  },
  {
    number: "04",
    title: "A Living System, Not a One-Time Setup",
    copy: "We build in a regular review, so your reporting stays relevant as your business evolves.",
  },
];

export const BI_FAQS = [
  {
    q: "Do you actually build the dashboards, or just advise on them?",
    a: "We advise on what to track, how to structure it, and how to read it. If you need the dashboard itself built, that's handled through our Data Solutions service, we'll make sure the handoff is clear.",
  },
  {
    q: 'How is this different from just asking my team to "track more data"?',
    a: "Tracking more data usually creates noise, not clarity. We help identify the small number of metrics that genuinely reflect what's working and what isn't, not a longer list, a better one.",
  },
  {
    q: "What if I don't know what metrics I should be tracking?",
    a: "That's the starting point of this service. We work backward from the actual decisions your business needs to make, and identify the metrics that inform those decisions specifically.",
  },
  {
    q: "Do you work with our existing reporting tools, or do we need new software?",
    a: "We work with whatever you already have where possible, this is about the thinking and structure behind your reporting, not necessarily new tools.",
  },
  {
    q: "How often should we revisit our KPIs?",
    a: "Most businesses benefit from a review every quarter, or sooner after a major change (a new product line, a shift in strategy, rapid growth). We build that review into the engagement rather than leaving you with a fixed list.",
  },
];

/* -- Regulation & Compliance -- */
export const REGULATION_COMPLIANCE_COVERS = [
  {
    number: "01",
    title: "External DPO & Third-Party Vendor Services",
    copy: "We act as your external Data Protection Officer and third-party service provider, managing your full data lifecycle, data collection, database maintenance, and website data erasure protocols under GDPR. This includes managing consent workflows, auditing third-party data flows, and executing formal Right-to-be-Forgotten requests to safely delete customer records.",
  },
  {
    number: "02",
    title: "GDPR Interactive Online Workshops & Staff Training",
    copy: "We design and deliver tailored, live online training sessions covering GDPR compliance requirements, legal bases for processing, data subject rights, and internal handling procedures. This includes role-specific training modules for teams like customer support and IT, ensuring full operational awareness when handling personal data and reporting potential security incidents.",
  },
  {
    number: "03",
    title: "DORA Infrastructure & Protection Wall Audits",
    copy: "We evaluate digital infrastructure, network resilience, and security protection walls for regulated entities, including online gaming, fintech, and trading platforms, to confirm compliance with DORA standards. This includes assessing server architecture, access controls, and firewall protocols to identify vulnerability gaps against DORA's ICT risk management mandates.",
  },
  {
    number: "04",
    title: "DORA Concise Legal Opinions & Executive Advisory",
    copy: "We draft concise, high-level regulatory opinions and executive briefings detailing DORA compliance obligations, critical third-party vendor oversight rules, and operational risk mitigation, including board-ready compliance opinions evaluating vendor contracts against DORA's resilience frameworks.",
  },
];

export const REGULATION_COMPLIANCE_HANDLES = [
  {
    title: "Licensed & Qualified",
    copy: "Regulatory guidance backed by real legal credentials, not general business advice applied to a legal question.",
    icon: "shield" as const,
  },
  {
    title: "GDPR & DORA Specialists",
    copy: "Focused specifically on data protection and operational resilience regulation, not a generalist firm treating compliance as a side offering.",
    icon: "document" as const,
  },
  {
    title: "Direct Access to Real Expertise",
    copy: "You work directly with qualified professionals on your case, not routed through layers of junior staff.",
    icon: "handshake" as const,
  },
  {
    title: "Built for Regulated Industries",
    copy: "Experience across fintech, gaming, and other regulated sectors where GDPR and DORA compliance genuinely matter.",
    icon: "building" as const,
  },
];

export const REGULATION_COMPLIANCE_HOW_WE_WORK = [
  {
    number: "01",
    title: "Assess Your Exposure",
    copy: "We start by understanding what data you collect, how it flows through your business and any third-party vendors, and which regulations actually apply to you.",
    image: "/assets/service-1.webp",
  },
  {
    number: "02",
    title: "Identify the Gaps",
    copy: "We review your current practices against GDPR and/or DORA requirements and pinpoint exactly where you're exposed, before a regulator or an incident does it for you.",
    image: "/assets/service-2.webp",
  },
  {
    number: "03",
    title: "Implement or Advise",
    copy: "Depending on the service, we either directly manage the fix (consent workflows, training delivery, infrastructure audits) or provide a clear legal opinion your leadership can act on.",
    image: "/assets/service-3.webp",
  },
  {
    number: "04",
    title: "Monitor and Update",
    copy: "Regulations and your business both change. We build in a review process so your compliance stays current, not a one-time checkbox.",
    image: "/assets/service-4.webp",
  },
];

export const REGULATION_COMPLIANCE_FAQS = [
  {
    q: "Are you a law firm, or is this general business advice?",
    a: "This specific service is provided in partnership with QuantEdgeDataSolutions, a qualified regulatory professional, not general business advisory applied to a legal question. Our other consultancy services (Business Advisory, Process Optimization, etc.) are separate, general business advisory work.",
  },
  {
    q: "Does working with you replace needing our own legal counsel?",
    a: "It depends on your situation. For many businesses, this service directly covers your GDPR/DORA compliance needs. For complex or high-risk situations, we'll be upfront if independent legal counsel is also advisable, we won't tell you that you don't need a lawyer just to win the engagement.",
  },
  {
    q: "Does DORA actually apply to my business?",
    a: "DORA applies specifically to financial-sector entities and their critical ICT third-party providers, for example, banks, trading platforms, fintech, and payment providers. If you're unsure whether it applies to you, that's exactly the kind of question we can quickly clarify in an initial conversation.",
  },
  {
    q: "What happens if we're found non-compliant after working with you?",
    a: "We'll be transparent about the limits of any compliance work upfront, no engagement can guarantee zero regulatory risk, but our job is to substantially reduce that risk and document the reasonable steps taken, which itself matters if a regulator ever asks.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "It varies: a training workshop might be delivered in a single session, while a full DORA infrastructure audit or ongoing DPO arrangement is a longer engagement. We'll scope the timeline clearly before starting.",
  },
];


