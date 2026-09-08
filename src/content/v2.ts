/**
 * Copy and data for the /v2 landing page, which follows the revised wireframe
 * section for section. Anything marked TODO is a placeholder the wireframe
 * itself left blank; nothing here should ship with a made-up number.
 */

export const hero = {
  headline: "AI creator accounts that post and grow on real devices",
  audience:
    "For brands and agencies that need distribution without a creator team.",
  payoff: "30 accounts posting daily. Millions of views. No creator payroll.",
  primary: { label: "Book a call", href: "#book" },
  secondary: { label: "See pricing", href: "#pricing" },
  // The reel is a carousel of personas, switched by the avatars beneath it.
  // Jake's view counts are the figures previously published on doublespeed.ai
  // (the fourth is their mean). Engagement counts and the other two personas
  // are the same kind of figures the terminal footage shows.
  // TODO: replace every figure below the view counts with real numbers.
  personas: [
    {
      id: 1,
      handle: "@jake.rivera",
      name: "Jake Rivera",
      designation: "Lifestyle · AI persona",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2.5&w=200&h=200&q=80",
      reel: [
        {
          poster: "/grid/7.jpg",
          stat: "312K",
          likes: "12.4K",
          comments: "187",
          shares: "402",
        },
        {
          poster: "/grid/12.jpg",
          stat: "142K",
          likes: "5.8K",
          comments: "94",
          shares: "176",
        },
        {
          poster: "/grid/21.jpg",
          stat: "78K",
          likes: "3.1K",
          comments: "51",
          shares: "88",
        },
        {
          poster: "/grid/28.jpg",
          stat: "177K avg",
          likes: "7.1K",
          comments: "110",
          shares: "222",
        },
      ],
    },
    {
      id: 2,
      handle: "@fit.marcus",
      name: "Marcus Hale",
      designation: "Fitness · 142K monthly views",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.5&w=200&h=200&q=80",
      reel: [
        {
          poster: "/grid/3.jpg",
          stat: "124K",
          likes: "5.1K",
          comments: "43",
          shares: "89",
        },
        {
          poster: "/grid/9.jpg",
          stat: "86K",
          likes: "3.2K",
          comments: "27",
          shares: "61",
        },
        {
          poster: "/grid/15.jpg",
          stat: "212K",
          likes: "9.4K",
          comments: "88",
          shares: "154",
        },
        {
          poster: "/grid/24.jpg",
          stat: "158K",
          likes: "6.7K",
          comments: "62",
          shares: "118",
        },
      ],
    },
    {
      id: 3,
      handle: "@style.jo",
      name: "Jo Lindqvist",
      designation: "Fashion · 210K monthly views",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2.5&w=200&h=200&q=80",
      reel: [
        {
          poster: "/grid/31.jpg",
          stat: "96K",
          likes: "4.2K",
          comments: "38",
          shares: "71",
        },
        {
          poster: "/grid/33.jpg",
          stat: "310K",
          likes: "13.1K",
          comments: "204",
          shares: "388",
        },
        {
          poster: "/grid/36.jpg",
          stat: "54K",
          likes: "2.4K",
          comments: "19",
          shares: "43",
        },
        {
          poster: "/grid/40.jpg",
          stat: "131K",
          likes: "5.6K",
          comments: "47",
          shares: "96",
        },
      ],
    },
  ],
  caption:
    "@jake.rivera, AI persona. 312K, 142K and 78K views in the last 30 days.",
};

export type PressItem = {
  src: string;
  alt: string;
  h: number;
  /** TODO: link each logo to its article. Unlinked logos read as decoration. */
  href: string;
};

export const press: PressItem[] = [
  {
    src: "/assets/logo-nyt.svg",
    alt: "The New York Times",
    h: 24,
    href: "#",
  },
  {
    src: "/assets/logo-observer.svg",
    alt: "The Observer",
    h: 20,
    href: "#",
  },
  {
    src: "/assets/logo-nypost.svg",
    alt: "New York Post",
    h: 17,
    href: "#",
  },
  {
    src: "/assets/logo-wan.png",
    alt: "The WAN Show",
    h: 28,
    href: "#",
  },
];

/**
 * Every figure here is backed elsewhere on the page: the persona total is
 * the sum of the three published post counts, the rest come from the plans.
 * Swap in fleet-wide aggregates (accounts, views, posts) once they exist.
 */
export const stats = [
  { value: "532K", label: "views, one persona, 30 days" },
  { value: "2×", label: "posts per account, daily" },
  { value: "100%", label: "real US phones" },
];

export const realPhones = {
  headline: "Runs on real US phones, not emulators",
  bullets: [
    "Real device fingerprints and real IMEIs",
    "Real US carriers and residential traffic",
    "Human review on the final 5% of content",
  ],
  body: "An API call looks like an API call. A phone on a US carrier looks like every other phone on the network, which is the only way an account gets treated like a person.",
};

export const whatYouGet = [
  {
    title: "A week of content in 20 minutes",
    body: "Generate, review, and schedule a week of posts across the fleet from one screen.",
    image: "/assets/cap-bulk.jpg",
    alt: "Bulk upload media button above a grid of vertical videos",
  },
  {
    title: "Personas you cannot hire",
    body: "A 62-year-old mom in Phoenix, a Gen-Z skater in Atlanta. Demographics you would never find on a roster, built on demand.",
    image: "/assets/cap-personas.jpg",
    alt: "Persona profile with demographic and interest tags",
  },
  {
    title: "Accounts that act like real users",
    body: "They scroll, comment, warm up, and engage before they post, so the algorithm treats them as creators, not bots.",
    image: "/assets/cap-accounts.jpg",
    alt: "Account table with followers, posts and impressions per profile",
  },
];

/** Niche and monthly views per persona, as drawn in the wireframe. */
export const niches = [
  { face: "/grid/3.jpg", niche: "Fitness", views: "142K/mo" },
  { face: "/grid/9.jpg", niche: "Med", views: "96K/mo" },
  { face: "/grid/15.jpg", niche: "Fashion", views: "210K/mo" },
  { face: "/grid/24.jpg", niche: "Food", views: "74K/mo" },
  { face: "/grid/31.jpg", niche: "Tech", views: "128K/mo" },
];

export const closing = {
  headline: "A creator team at a tenth of the cost.",
  body: "Create and deploy content at scale, reviewed by humans, run on real devices.",
};

export const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Log in", href: "#login" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy/" },
      { label: "Terms of service", href: "/terms/" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discord", href: "#discord" },
      { label: "Contact", href: "mailto:hello@doublespeed.ai" },
    ],
  },
];
