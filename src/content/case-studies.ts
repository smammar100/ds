/**
 * The eight studies from /case-studies, as published there. Clients are
 * named by category only and no client imagery is used anywhere; the
 * landing-page section renders proof from these numbers instead.
 */
export type CaseStudy = {
  slug: string;
  category: string;
  period: string;
  title: string;
  metric: string;
  metricLabel: string;
  receipt: string;
  /** Top posts by views, as shown on the study. */
  posts: string[];
  /** TODO: placeholder art from Unsplash until the real, blurred assets exist. */
  image: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "oral-care",
    category: "Oral care brand",
    period: "Apr 7 – Sep 2, 2026",
    title: "A toothpaste brand TikTok actually watches",
    metric: "24M",
    metricLabel: "views in 4 weeks",
    receipt: "30 accounts · 8,394 posts over 148 days · 8 posts over 1M views",
    posts: ["5.2M", "3.4M", "2.6M"],
    image: "/case-studies/cs-01.jpg",
    featured: true,
  },
  {
    slug: "texting",
    category: "Dating advice app",
    period: "Apr 27 – Aug 31, 2026",
    title: "44.6M views from ten accounts that never scaled",
    metric: "44.6M",
    metricLabel: "views from 10 accounts in 4 months",
    receipt: "$0.10 best-cycle CPM · 15.3M views in one month · 5 posts over 1M",
    posts: ["2.7M", "1M+", "1M+"],
    image: "/case-studies/cs-02.jpg",
  },
  {
    slug: "running",
    category: "Running app",
    period: "Oct 2025 – Jul 2026",
    title: "15.1M views on a $1,350 invoice: the $0.09 CPM",
    metric: "$0.09",
    metricLabel: "CPM in the first billing cycle",
    receipt: "15.1M views in 31 days on $1,350 · 4 posts over 1M · 6.2% engagement",
    posts: ["2.1M", "1.9M", "1.4M"],
    image: "/case-studies/cs-03.jpg",
  },
  {
    slug: "local-discovery",
    category: "Local discovery app",
    period: "Oct 2025 – Aug 2026",
    title: "Native in 18 cities: the theme-by-city matrix",
    metric: "+19.7M",
    metricLabel: "views in 9 weeks",
    receipt: "114 accounts · 12.3K posts · 990 posts over 10K",
    posts: ["427K", "420K", "100K+"],
    image: "/case-studies/cs-04.jpg",
  },
  {
    slug: "astrology",
    category: "Astrology app",
    period: "Feb 16 – Aug 12, 2026",
    title: "One authority account out-pulled the network",
    metric: "+10.2M",
    metricLabel: "views in 4 weeks",
    receipt: "One account drove 14.6M of 21.3M · 5 posts over 1M",
    posts: ["3.0M", "1.8M+", "1.8M+"],
    image: "/case-studies/cs-05.jpg",
  },
  {
    slug: "edtech",
    category: "AI edtech platform",
    period: "Feb – Sep 2026",
    title: "Reaching teachers as teachers, on both platforms",
    metric: "3.5M",
    metricLabel: "views in 5 weeks from a 57K start",
    receipt: "46 accounts · 7.1K posts across TikTok and Instagram",
    posts: ["651K", "577K", "522K"],
    image: "/case-studies/cs-06.jpg",
  },
  {
    slug: "wellness",
    category: "Mental wellness app",
    period: "May 25 – Jul 27, 2026",
    title: "Zero to 6.4M in nine weeks, in a sensitive category",
    metric: "6.4M",
    metricLabel: "views in 9 weeks from zero",
    receipt: "11 accounts · 3 posts over 1M · 10.6% engagement",
    posts: ["2.1M", "1.2M", "1.1M"],
    image: "/case-studies/cs-07.jpg",
  },
  {
    slug: "fandom",
    category: "Fan content network",
    period: "Dec 2025 – Sep 2026",
    title: "The engagement ceiling: 14.9% network-wide",
    metric: "14.9%",
    metricLabel: "engagement rate",
    receipt: "13 accounts · 1.39M likes · 12.1M total views",
    posts: ["1.3M"],
    image: "/case-studies/cs-08.jpg",
  },
];

export const caseStudyHref = (slug: string) => `/case-studies/${slug}`;

/** Parse "5.2M", "427K", "1M+" into a number for relative bar heights. */
export function parseViews(v: string) {
  const n = parseFloat(v);
  if (/m/i.test(v)) return n * 1_000_000;
  if (/k/i.test(v)) return n * 1_000;
  return n;
}
