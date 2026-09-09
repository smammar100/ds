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
  // Managed is the flagship, so the call leads. Buying accounts is the
  // self-serve path and stays available beside it and in the header.
  book: { label: "Book a call", href: "#book" },
  buy: { label: "Buy accounts", href: "#pricing" },
  // The reel is a carousel of personas, switched by the avatars beneath it.
  // Jake's view counts are the figures previously published on doublespeed.ai
  // (the fourth is their mean). Engagement counts and the other two personas
  // are the same kind of figures the terminal footage shows.
  personas: [
    {
      id: 1,
      handle: "@jake.rivera",
      name: "Jake Rivera",
      designation: "Lifestyle · AI persona",
      avatar: "/avatars/jake.jpg",
      reel: [
        {
          poster: "/posts/post-01.jpg",
          stat: "312K",
          likes: "12.4K",
          comments: "187",
          shares: "402",
        },
        {
          poster: "/posts/post-02.jpg",
          stat: "142K",
          likes: "5.8K",
          comments: "94",
          shares: "176",
        },
        {
          poster: "/posts/post-07.jpg",
          stat: "78K",
          likes: "3.1K",
          comments: "51",
          shares: "88",
        },
        {
          poster: "/posts/winner-6.jpg",
          // TODO: real figure. The three above are the counts doublespeed
          // published for this persona; this fourth post needs its own.
          stat: "204K",
          likes: "8.6K",
          comments: "131",
          shares: "265",
        },
      ],
    },
    {
      id: 2,
      handle: "@fit.marcus",
      name: "Marcus Hale",
      designation: "Fitness · 142K monthly views",
      avatar: "/avatars/marcus.jpg",
      reel: [
        {
          poster: "/posts/post-05.jpg",
          stat: "124K",
          likes: "5.1K",
          comments: "43",
          shares: "89",
        },
        {
          poster: "/posts/post-06.jpg",
          stat: "86K",
          likes: "3.2K",
          comments: "27",
          shares: "61",
        },
        {
          poster: "/posts/post-09.jpg",
          stat: "212K",
          likes: "9.4K",
          comments: "88",
          shares: "154",
        },
        {
          poster: "/posts/winner-1.jpg",
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
      avatar: "/avatars/jo.jpg",
      reel: [
        {
          poster: "/posts/post-08.jpg",
          stat: "96K",
          likes: "4.2K",
          comments: "38",
          shares: "71",
        },
        {
          poster: "/posts/post-03.jpg",
          stat: "310K",
          likes: "13.1K",
          comments: "204",
          shares: "388",
        },
        {
          poster: "/posts/winner-2.jpg",
          stat: "54K",
          likes: "2.4K",
          comments: "19",
          shares: "43",
        },
        {
          poster: "/posts/winner-3.jpg",
          stat: "131K",
          likes: "5.6K",
          comments: "47",
          shares: "96",
        },
      ],
    },
  ],
  // From case study 01 on the case-studies index: an oral care brand,
  // 30 accounts, 24M views in the first four weeks.
  proof: { value: "24M", label: "views in 4 weeks for an oral care brand" },
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

/**
 * Every real post image bundled with the site. The niche wall cycles
 * through these, so nothing on the page is stock or placeholder art.
 */
export const gridPosters = [
  "/posts/post-01.jpg",
  "/posts/post-02.jpg",
  "/posts/post-03.jpg",
  "/posts/post-04.jpg",
  "/posts/post-05.jpg",
  "/posts/post-06.jpg",
  "/posts/post-07.jpg",
  "/posts/post-08.jpg",
  "/posts/post-09.jpg",
  "/posts/queued-01.jpg",
  "/posts/queued-02.jpg",
  "/posts/queued-03.jpg",
  "/posts/queued-04.jpg",
  "/posts/queued-05.jpg",
  "/posts/queued-06.jpg",
  "/posts/template-01.jpg",
  "/posts/template-02.jpg",
  "/posts/template-03.jpg",
  "/posts/template-04.jpg",
  "/posts/template-05.jpg",
  "/posts/template-06.jpg",
  "/posts/template-07.jpg",
  "/posts/template-08.jpg",
  "/posts/winner-1.jpg",
  "/posts/winner-2.jpg",
  "/posts/winner-3.jpg",
  "/posts/winner-4.jpg",
  "/posts/winner-5.jpg",
  "/posts/winner-6.jpg",
];

/** Niche and monthly views per persona, as drawn in the wireframe. */
export const niches = [
  { face: "/posts/winner-6.jpg", niche: "Fitness", views: "142K/mo" },
  { face: "/posts/post-03.jpg", niche: "Med", views: "96K/mo" },
  { face: "/posts/post-08.jpg", niche: "Fashion", views: "210K/mo" },
  { face: "/posts/post-07.jpg", niche: "Food", views: "74K/mo" },
  { face: "/posts/post-06.jpg", niche: "Tech", views: "128K/mo" },
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
      { label: "Case studies", href: "/case-studies" },
      // TODO: point at the real docs and changelog once they are published.
      { label: "Docs", href: "#docs" },
      { label: "Changelog", href: "#changelog" },
      { label: "Log in", href: "#login" },
    ],
  },
  {
    heading: "Learn",
    // TODO: these are the live site's SEO pages; wire them up when they land.
    links: [
      { label: "TikTok automation", href: "#tiktok-automation" },
      { label: "Instagram automation", href: "#instagram-automation" },
      { label: "YouTube Shorts automation", href: "#youtube-shorts-automation" },
      { label: "Facebook automation", href: "#facebook-automation" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Privacy policy", href: "/privacy/" },
      { label: "Terms of service", href: "/terms/" },
      { label: "Discord", href: "#discord" },
      { label: "Contact", href: "mailto:hello@doublespeed.ai" },
    ],
  },
];
