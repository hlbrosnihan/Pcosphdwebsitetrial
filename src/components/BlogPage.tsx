// =============================================================================
// BlogPage.tsx
// Version: 2.3.0
// Last updated: 2026-04-29
//
// CHANGELOG
// v2.3.0 (2026-04-29)
//   - FIXED: Banner image invisible even after uploading to StackBlitz.
//     Root cause: stacking opacity-40 image + opacity-80 teal div multiplies
//     to near-zero visibility (0.4 × 0.2 = 0.08). Both layers were fighting
//     each other. Fix: single CSS background combining the photo and teal
//     linear-gradient tint in one layer — no opacity stacking at all.
//     TO ACTIVATE: see BLOG_HEADER_IMG comment below — one line to uncomment.
//   - FIXED: RSS feed not loading in StackBlitz.
//     Root cause: rss2json and allorigins are both blocked by StackBlitz CSP.
//     Fix: primary proxy switched to corsproxy.io which passes StackBlitz CSP.
//     Four-tier strategy: corsproxy.io → rss2json → allorigins → static posts.
//
// v2.2.0 (2026-04-29)
//   - Three-tier RSS fetch; SVG fallback for missing image asset
//
// v2.1.1 (2026-04-29)
//   - Banner uses site hero overlay style: image opacity-40, teal bg overlay
//
// v2.1.0 (2026-04-29)
//   - Added blog-header.jpg as banner image
//
// v2.0.0 (2026-04-29)
//   - Full redesign: chronological timeline feed from Substack RSS
//   - Removed tabs, filters, side panel; full-width expandable accordion cards
//
// v1.0.0 (2026-04-10)
//   - Initial static blog page
// =============================================================================

import { useState, useEffect } from 'react';
import { Rss, ChevronDown, ExternalLink, Mail } from 'lucide-react';

// -----------------------------------------------------------------------------
// BANNER IMAGE — HOW TO ACTIVATE
// -----------------------------------------------------------------------------
// 1. In StackBlitz open the Assets panel and upload blog-header.jpg
// 2. StackBlitz will show an import line like:
//      import blogHeaderImg from 'figma:asset/abc123def456.jpg';
// 3. Add that import at the top of this file
// 4. Change the line below from:
//      const BLOG_HEADER_IMG: string | undefined = undefined;
//    to:
//      const BLOG_HEADER_IMG: string | undefined = blogHeaderImg;
//
// Until then the banner renders as a solid teal gradient — still looks clean.
// -----------------------------------------------------------------------------
const BLOG_HEADER_IMG: string | undefined = blogHeaderImg;

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
interface SubstackPost {
  title: string;
  excerpt: string;
  displayDate: string;
  link: string;
}

// -----------------------------------------------------------------------------
// STATIC FALLBACK POSTS
// Shown when all RSS fetch attempts fail (strict CSP, offline, etc.)
// -----------------------------------------------------------------------------
const FALLBACK_POSTS: SubstackPost[] = [
  {
    title: 'Why PCOS Diagnosis Takes So Long — and What We Can Do About It',
    excerpt:
      'The average time from first symptoms to diagnosis is over two years. I explore the systemic, cultural, and clinical reasons behind this delay and what patient-centred design could offer as part of the solution.',
    displayDate: '28 March 2026',
    link: 'https://substack.com/@hbwray',
  },
  {
    title: 'Flo, Clue, and the Period Tracker Problem: What Apps Get Wrong',
    excerpt:
      'Period-tracking apps collect enormous amounts of intimate data, yet most still present PCOS as an afterthought. I look at where UX design is failing women with hormonal conditions.',
    displayDate: '10 March 2026',
    link: 'https://substack.com/@hbwray',
  },
  {
    title: 'What Self-Management Actually Means When You Have PCOS',
    excerpt:
      'The phrase "lifestyle management" is used constantly in PCOS care — but what does it mean in practice? Drawing from survey responses, I unpack the emotional labour behind the advice.',
    displayDate: '18 February 2026',
    link: 'https://substack.com/@hbwray',
  },
  {
    title: 'Co-Design in Healthcare: Involving Patients in Building Better Tools',
    excerpt:
      'Co-design is more than a buzzword. It is a methodology with real implications for how digital health tools are built and evaluated. Here I outline my approach and early findings.',
    displayDate: '30 January 2026',
    link: 'https://substack.com/@hbwray',
  },
];

// -----------------------------------------------------------------------------
// RSS FETCH — FOUR-TIER STRATEGY
// Tier 1: corsproxy.io   — works in StackBlitz (passes CSP headers)
// Tier 2: rss2json.com   — works in production environments
// Tier 3: allorigins.win — additional fallback proxy
// Tier 4: FALLBACK_POSTS — always works, no network needed
// -----------------------------------------------------------------------------
const SUBSTACK_RSS = 'https://substack.com/@hbwray/feed';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function truncate(text: string, max = 280): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max)) + '…';
}

function parseRssXml(xml: string): SubstackPost[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = Array.from(doc.querySelectorAll('item'));
  if (!items.length) throw new Error('no items in XML');
  return items.map(item => ({
    title: item.querySelector('title')?.textContent?.trim() || 'Untitled',
    excerpt: truncate(stripHtml(item.querySelector('description')?.textContent || '')),
    displayDate: formatDate(item.querySelector('pubDate')?.textContent || ''),
    link: item.querySelector('link')?.textContent?.trim() || 'https://substack.com/@hbwray',
  }));
}

async function fetchViaCorsproxy(): Promise<SubstackPost[]> {
  const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(SUBSTACK_RSS)}`);
  if (!res.ok) throw new Error(`corsproxy ${res.status}`);
  return parseRssXml(await res.text());
}

async function fetchViaRss2Json(): Promise<SubstackPost[]> {
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_RSS)}`);
  const data = await res.json();
  if (data.status !== 'ok' || !data.items?.length) throw new Error('rss2json empty');
  return data.items.map((item: any) => ({
    title: item.title || 'Untitled',
    excerpt: truncate(stripHtml(item.description || item.content || '')),
    displayDate: formatDate(item.pubDate),
    link: item.link || 'https://substack.com/@hbwray',
  }));
}

async function fetchViaAllOrigins(): Promise<SubstackPost[]> {
  const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(SUBSTACK_RSS)}`);
  const json = await res.json();
  return parseRssXml(json.contents as string);
}

// -----------------------------------------------------------------------------
// SUBSTACK BANNER
// Single CSS background-image combining photo + teal tint — avoids the stacked
// opacity problem where two separate divs multiply each other to near-invisible.
// -----------------------------------------------------------------------------
function SubstackBanner() {
  const backgroundStyle: React.CSSProperties = BLOG_HEADER_IMG
    ? {
        // Photo + teal tint in ONE CSS background property — no opacity stacking
        background: `linear-gradient(rgba(15, 118, 110, 0.70), rgba(15, 118, 110, 0.70)), url(${BLOG_HEADER_IMG}) center / cover no-repeat`,
      }
    : {
        background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
      };

  return (
    <div
      className="relative rounded-2xl shadow-xl mb-10"
      style={{ minHeight: '160px', ...backgroundStyle }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-8">
        <div className="flex items-center gap-3">
          <Rss size={22} className="text-teal-200 flex-shrink-0" />
          <div>
            <h2 className="text-white text-lg font-bold leading-tight mb-1">
              PCOS PhD Dispatches &mdash; on Substack
            </h2>
            <p className="text-teal-100 text-sm leading-relaxed">
              Thoughts and findings through the PhD journey and PCOS lived experience.
            </p>
          </div>
        </div>
        <a
          href="https://substack.com/@hbwray"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 sm:ml-auto inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-5 py-2.5 rounded-full text-sm hover:bg-teal-50 transition-colors"
        >
          Subscribe free
        </a>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TIMELINE ITEM
// -----------------------------------------------------------------------------
interface TimelineItemProps {
  post: SubstackPost;
  isOpen: boolean;
  onToggle: () => void;
}

function TimelineItem({ post, isOpen, onToggle }: TimelineItemProps) {
  return (
    <div className="relative pl-7">
      <div className="absolute left-0 top-5 w-3 h-3 rounded-full bg-teal-600 border-2 border-gray-50 shadow-sm z-10" />

      {post.displayDate && (
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          {post.displayDate}
        </p>
      )}

      <div
        className={`bg-white rounded-lg shadow-sm cursor-pointer transition-shadow duration-200 overflow-hidden ${
          isOpen ? 'shadow-md ring-1 ring-teal-500' : 'hover:shadow-md'
        }`}
        onClick={onToggle}
      >
        <div className="flex items-start gap-4 p-5">
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold leading-snug mb-2 transition-colors text-base ${isOpen ? 'text-teal-600' : 'text-gray-900'}`}>
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
          </div>
          <ChevronDown
            size={20}
            className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-500' : ''}`}
          />
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-gray-100 px-5 py-5">
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{post.excerpt}</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">continues on Substack</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="flex items-center gap-3">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Read full post <ExternalLink size={13} />
              </a>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); onToggle(); }}
                className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// LOADING SKELETON
// -----------------------------------------------------------------------------
function LoadingSkeleton() {
  return (
    <div className="space-y-5">
      {[1, 2, 3].map(n => (
        <div key={n} className="relative pl-7">
          <div className="absolute left-0 top-5 w-3 h-3 rounded-full bg-teal-200 border-2 border-gray-50" />
          <div className="h-3 w-28 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="bg-white rounded-lg shadow-sm p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-full animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-5/6 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// -----------------------------------------------------------------------------
export function BlogPage() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      for (const fetcher of [fetchViaCorsproxy, fetchViaRss2Json, fetchViaAllOrigins]) {
        try {
          const result = await fetcher();
          if (!cancelled && result.length) {
            setPosts(result);
            setLoading(false);
            return;
          }
        } catch (_) { /* try next tier */ }
      }
      if (!cancelled) {
        setPosts(FALLBACK_POSTS);
        setUsingFallback(true);
        setLoading(false);
      }
    }

    loadPosts();
    return () => { cancelled = true; };
  }, []);

  function handleToggle(id: string) {
    setOpenId(prev => (prev === id ? null : id));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mb-10">
          <h1 className="text-gray-900 mb-3">Blog & Insights</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Research reflections, critical commentary, and a curated reading list on PCOS,
            digital health, and patient-centred design, updated regularly.
          </p>
        </div>

        <SubstackBanner />

        {loading && <LoadingSkeleton />}

        {!loading && (
          <>
            {usingFallback && (
              <div className="mb-6 flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-lg px-4 py-3">
                <Rss size={16} className="text-teal-500 flex-shrink-0 mt-0.5" />
                <p className="text-teal-800 text-sm leading-relaxed">
                  Showing recent posts — live feed unavailable in this environment.{' '}
                  <a
                    href="https://substack.com/@hbwray"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline hover:text-teal-900"
                  >
                    View all posts on Substack
                  </a>
                </p>
              </div>
            )}

            <div className="relative">
              <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-6">
                {posts.map(post => {
                  const id = post.link + post.title;
                  return (
                    <TimelineItem
                      key={id}
                      post={post}
                      isOpen={openId === id}
                      onToggle={() => handleToggle(id)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="https://substack.com/@hbwray"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal-600 text-teal-600 font-bold rounded-xl hover:bg-teal-600 hover:text-white transition-colors text-sm"
              >
                <Rss size={15} />
                View full archive on Substack
              </a>
            </div>
          </>
        )}

        <div className="mt-14 bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
          <h3 className="text-teal-900 mb-2">Get in Touch</h3>
          <p className="text-teal-800 text-sm max-w-xl mx-auto mb-5 leading-relaxed">
            Have a question about the research, or a paper you think should be on the reading list?
            Reach out directly.
          </p>
          <a
            href="mailto:wrayh@uni.coventry.ac.uk"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors text-sm"
          >
            <Mail size={15} />
            wrayh@uni.coventry.ac.uk
          </a>
        </div>

      </div>
    </div>
  );
}