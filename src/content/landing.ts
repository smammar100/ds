export type Capability = {
  title: string;
  image: string;
  alt: string;
  tag: string;
  body: string;
};

export const capabilities: Capability[] = [
  {
    title: "Content fine-tuning",
    image: "/assets/cap-finetune.jpg",
    alt: "A prompt bar applying 'make all text lowercase' to every post in a content table",
    tag: "Edit",
    body: "AI does the heavy lifting, humans add the final 5% that makes platforms trust it's real. We've automated the arbitrage between perfect and believable.",
  },
  {
    title: "Bulk posts",
    image: "/assets/cap-bulk.jpg",
    alt: "Bulk upload media button above a grid of vertical videos",
    tag: "Publish",
    body: "Deployment solves distribution. Content creation at scale solves inventory. Generate a week's worth in minutes, on-brand and performance-optimized.",
  },
  {
    title: "Account management",
    image: "/assets/cap-accounts.jpg",
    alt: "Account table with followers, posts and impressions per profile",
    tag: "Operate",
    body: "Full control over every account parameter. Change bios, profile pics and even the content they interact with. All orchestrated on real devices.",
  },
  {
    title: "Hyper-specific personas",
    image: "/assets/cap-personas.jpg",
    alt: "Persona profile with demographic and interest tags",
    tag: "Define",
    body: "Every synthetic influencer needs consistent patterns. Define who they are and where they come from, so every post persists that character.",
  },
  {
    title: "Workflow builder",
    image: "/assets/cap-workflow.jpg",
    alt: "A source photo and product shot combined into a finished post",
    tag: "Automate",
    body: "Chain AI models, set triggers, automate responses. Build pipelines that turn trending content into unique variations. Infrastructure as code for content ops.",
  },
  {
    title: "1 video, 100 ways",
    image: "/assets/cap-variations.jpg",
    alt: "Four variations of one video with different hooks and captions",
    tag: "Multiply",
    body: "Winners get cloned, not repeated. Take proven content and spawn variation. Different hooks, formats, lengths. Each unique enough to avoid suppression.",
  },
];

export type Plan = {
  name: string;
  badge?: string;
  glyph: "phone" | "agent" | "team";
  /** Who the plan is for, one line under the name. */
  who: string;
  /** Omitted on Managed, where the CTA stands in for the price. */
  price?: string;
  unit?: string;
  /** What the plan actually is, in a sentence or two. */
  blurb: string;
  cta: string;
  /** Where this plan's CTA goes. */
  href: string;
  featured: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Hosted Account Slot",
    glyph: "phone",
    who: "Best for teams running their own content",
    price: "$150",
    unit: "/account per month",
    blurb:
      "A dedicated slot on a real US device, so one social profile posts consistently without you managing hardware. You bring the content.",
    cta: "Get started",
    href: "#book",
    featured: false,
    features: [
      "US device traffic and posting",
      "Human-like instrumentation",
      "In-house warming algorithm",
      "Bulk creation suite, image, video, and audio models",
    ],
  },
  {
    name: "Content Agent",
    badge: "Research preview",
    glyph: "agent",
    who: "Scaling consumer apps, e-commerce brands",
    price: "$250",
    unit: "/account per month",
    blurb:
      "An autonomous agent plans, creates, and posts on your hosted accounts. In research preview: book a call to get approved for access.",
    cta: "Book a call",
    href: "#book",
    featured: true,
    features: [
      "Everything in Hosted Account Slot",
      "Content generated and scheduled for you",
      "Drafts land in a review link for approval",
      "Learns from what performs on your accounts",
    ],
  },
  {
    name: "Managed Service",
    glyph: "team",
    who: "For teams ready to scale the whole operation",
    blurb:
      "Done for you. A dedicated content strategist and team of human creators plan, iterate, and adapt based on what's working. You review and approve. Everything else is taken care of.",
    cta: "Book a call",
    href: "#book",
    featured: false,
    features: [
      "Dedicated strategist",
      "In-house editing team",
      "2x daily posting",
      "Performance and iteration loop",
    ],
  },
];

export type Faq = { q: string; a: string[]; list: string[] };

export const faqs: Faq[] = [
  {
    q: "What are businesses using doublespeed for?",
    a: [
      "doublespeed is the operating layer for autonomous social media. Brands, agencies, and creators use our terminal to generate content, run synthetic personas, and deploy across TikTok, Instagram, Reddit, LinkedIn, YouTube, and X from a single interface.",
      "We combine both the content creation layer with posting infrastructure. The result is content operations at scale, replacing 30 person creator teams.",
    ],
    list: [],
  },
  {
    q: "How does it work?",
    a: [
      "Generate content in bulk, build personas, schedule deployment across your account fleet. Or hand it off to a managed team and review what gets posted.",
    ],
    list: [
      "Hosted Account Slot: for posting capacity on real US devices, with your own content.",
      "Content Agent: for dedicated agentic accounts running on real US devices.",
      "Managed Service: for end-to-end execution by a strategist and creator team.",
    ],
  },
  {
    q: "Why real phones instead of emulators or APIs?",
    a: [
      "API calls to social platforms limit reach. A real phone on a real US carrier looks like every other phone on the network. Device fingerprint, IMEI, carrier signal: none of it can be faked from a server. If you want accounts to behave like real users, they have to live on real devices.",
    ],
    list: [],
  },
  {
    q: "What happens if an account gets banned?",
    a: [
      "Platforms suspend accounts, and anyone who tells you otherwise is selling you something. If a hosted account is banned while we are operating it inside our acceptable use rules, we replace it and warm the new one at no charge to you.",
      "Warming is the reason the replacement is not instant: a brand new account that posts like an established one is the fastest way to get suspended again. The replacement joins your fleet once it behaves like an ordinary phone in ordinary use.",
    ],
    list: [],
  },
  {
    q: "Who owns the accounts and the content?",
    a: [
      "You do. The accounts operated under your subscription are yours, and so is every asset produced for them. We take no license to your content beyond what running the service requires.",
      "If you cancel, we hand over the credentials for the accounts you own and delete our copies within 90 days. There is no exit fee and nothing is held hostage.",
    ],
    list: [],
  },
  {
    q: "What is your refund and cancellation policy?",
    a: [
      "Cancel from your account or by email at any time. Cancellation takes effect at the end of the period you have already paid for, and you are never billed again after that.",
      "We do not pro-rata refund a period that has already started, because the device slot is reserved and staffed for that month. Banned accounts are replaced free rather than refunded.",
    ],
    list: [],
  },
  {
    q: "How much does it cost?",
    a: [],
    list: [
      "Hosted Account Slot is $150 per account per month: a dedicated slot on a real US device, warmed before it posts. You bring the content. Ten-account minimum.",
      "Content Agent is $250 per account per month, in research preview. An autonomous agent plans, creates and posts on your hosted accounts, with drafts landing in a review link for approval.",
      "Managed Service is scoped on a call. A dedicated strategist and in-house creator team run the whole operation and you review what goes out.",
    ],
  },
];

export const pressLogos = [
  { src: "/assets/logo-nyt.svg", alt: "The New York Times", h: 26 },
  { src: "/assets/logo-observer.svg", alt: "The Observer", h: 22 },
  { src: "/assets/logo-nypost.svg", alt: "New York Post", h: 19 },
  { src: "/assets/logo-wan.png", alt: "The WAN Show", h: 30 },
];
