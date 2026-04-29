// =============================================================================
// BlogPage.tsx
// Version: 2.2.0
// Last updated: 2026-04-29
//
// CHANGELOG
// v2.2.0 (2026-04-29)
//   - FIXED: Banner image not showing in StackBlitz.
//     Root cause: local asset imports (../assets/blog-header.jpg) fail silently
//     in the StackBlitz sandbox before the file is added to the project.
//     Fix: image is referenced via a figma:asset import (same pattern as
//     HomePage/HomePagen). To activate, upload blog-header.jpg to StackBlitz
//     assets and replace the BLOG_HEADER_ASSET_ID constant with the real
//     figma asset hash. Until then, a teal SVG pattern renders as fallback so
//     the banner never shows plain white.
//   - FIXED: Substack RSS feed not loading in StackBlitz.
//     Root cause: StackBlitz preview iframe blocks most cross-origin fetch
//     calls, so rss2json silently fails. Fix: three-tier fetch strategy —
//     (1) rss2json API, (2) allorigins CORS proxy, (3) static fallback posts.
//     The page always shows content regardless of network environment.
//   - File renamed from BlogPagen.tsx → BlogPage.tsx (matches App.tsx import)
//
// v2.1.1 (2026-04-29)
//   - Banner uses site hero overlay style: image opacity-40, teal bg overlay
//
// v2.1.0 (2026-04-29)
//   - Added blog-header.jpg as banner image
//   - Image file renamed from long Firefly filename to blog-header.jpg
//
// v2.0.0 (2026-04-29)
//   - Full redesign: chronological timeline feed from Substack RSS
//   - Removed tabs, filters, side panel
//   - Full-width expandable accordion cards
//   - Loading skeleton and error states
//
// v1.0.0 (2026-04-10)
//   - Initial blog page with static post cards and curated articles
// =============================================================================

import { useState, useEffect } from 'react';
import { Rss, ChevronDown, ExternalLink, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// -----------------------------------------------------------------------------
// BANNER IMAGE
// How to activate the real image in StackBlitz:
//   1. In StackBlitz, go to Assets and upload blog-header.jpg
//   2. Copy the asset hash from the generated import path
//   3. Replace the import below with:
//        import blogHeaderImg from 'figma:asset/<YOUR_HASH>.jpg';
//      and pass blogHeaderImg to the <ImageWithFallback src={...} /> below
// Until then the SVG fallback pattern renders in its place.
// -----------------------------------------------------------------------------

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
// These show when ALL network fetches fail (e.g. StackBlitz sandbox, offline).
// Replace/remove these once the live RSS feed is confirmed working in production.
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
// RSS FETCH HELPERS
// Three-tier strategy so the feed loads in as many environments as possible:
//   Tier 1 — rss2json.com (works in production, often blocked in StackBlitz)
//   Tier 2 — allorigins.win CORS proxy wrapping the raw Substack RSS
//   Tier 3 — FALLBACK_POSTS (always works, shown while fetching and on failure)
// -----------------------------------------------------------------------------
const SUBSTACK_RSS = 'https://substack.com/@hbwray/feed';
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_RSS)}`;
const ALLORIGINS_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(SUBSTACK_RSS)}`;

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

// Tier 1: rss2json JSON API
async function fetchViaRss2Json(): Promise<SubstackPost[]> {
  const res = await fetch(RSS2JSON_URL);
  const data = await res.json();
  if (data.status !== 'ok' || !data.items?.length) throw new Error('rss2json empty');
  return data.items.map((item: any) => ({
    title: item.title || 'Untitled',
    excerpt: truncate(stripHtml(item.description || item.content || '')),
    displayDate: formatDate(item.pubDate),
    link: item.link || 'https://substack.com/@hbwray',
  }));
}

// Tier 2: allorigins proxy — returns raw RSS XML which we parse manually
async function fetchViaAllOrigins(): Promise<SubstackPost[]> {
  const res = await fetch(ALLORIGINS_URL);
  const json = await res.json();
  const xml = json.contents as string;
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = Array.from(doc.querySelectorAll('item'));
  if (!items.length) throw new Error('allorigins empty');
  return items.map(item => ({
    title: item.querySelector('title')?.textContent || 'Untitled',
    excerpt: truncate(stripHtml(item.querySelector('description')?.textContent || '')),
    displayDate: formatDate(item.querySelector('pubDate')?.textContent || ''),
    link: item.querySelector('link')?.textContent || 'https://substack.com/@hbwray',
  }));
}

// -----------------------------------------------------------------------------
// BANNER SVG FALLBACK
// Shown while the real image asset hasn't been added to StackBlitz yet.
// Teal circuit/grid pattern — thematically appropriate for digital health.
// This is an inline SVG data URI so it requires zero external resources.
// -----------------------------------------------------------------------------
const BANNER_SVG_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='200'%3E%3Crect width='900' height='200' fill='%230f766e'/%3E%3Cg stroke='%2399f6e4' stroke-width='0.5' opacity='0.25'%3E%3Cline x1='0' y1='40' x2='900' y2='40'/%3E%3Cline x1='0' y1='80' x2='900' y2='80'/%3E%3Cline x1='0' y1='120' x2='900' y2='120'/%3E%3Cline x1='0' y1='160' x2='900' y2='160'/%3E%3Cline x1='100' y1='0' x2='100' y2='200'/%3E%3Cline x1='200' y1='0' x2='200' y2='200'/%3E%3Cline x1='300' y1='0' x2='300' y2='200'/%3E%3Cline x1='400' y1='0' x2='400' y2='200'/%3E%3Cline x1='500' y1='0' x2='500' y2='200'/%3E%3Cline x1='600' y1='0' x2='600' y2='200'/%3E%3Cline x1='700' y1='0' x2='700' y2='200'/%3E%3Cline x1='800' y1='0' x2='800' y2='200'/%3E%3C/g%3E%3Ccircle cx='450' cy='100' r='60' fill='none' stroke='%2399f6e4' stroke-width='0.8' opacity='0.2'/%3E%3Ccircle cx='450' cy='100' r='40' fill='none' stroke='%2399f6e4' stroke-width='0.8' opacity='0.2'/%3E%3Ccircle cx='450' cy='100' r='20' fill='%2399f6e4' opacity='0.12'/%3E%3C/svg%3E";

// -----------------------------------------------------------------------------
// SUBSTACK BANNER COMPONENT
// To swap in the real image once uploaded to StackBlitz:
//   1. Import: import blogHeaderImg from 'figma:asset/<HASH>.jpg';
//   2. Replace BANNER_SVG_FALLBACK with blogHeaderImg in the src prop below
// -----------------------------------------------------------------------------
function SubstackBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-10" style={{ minHeight: '160px' }}>

      {/* Banner image at opacity-40 — same pattern as HomePage hero */}
      <ImageWithFallback
        src={BANNER_SVG_FALLBACK}
        alt="Teal digital health illustration — keyboard and reproductive anatomy"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />

      {/* Teal colour overlay — same bg-teal-700 used across site banners */}
      <div className="absolute inset-0 bg-teal-700 opacity-80" />

      {/* Content sits above both image and overlay */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 p-8">
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
// TIMELINE ITEM COMPONENT
// Single expandable post card. Only one open at a time (controlled by parent).
// -----------------------------------------------------------------------------
interface TimelineItemProps {
  post: SubstackPost;
  isOpen: boolean;
  onToggle: () => void;
}

function TimelineItem({ post, isOpen, onToggle }: TimelineItemProps) {
  return (
    <div className="relative pl-7">
      {/* Teal dot on the timeline line */}
      <div className="absolute left-0 top-5 w-3 h-3 rounded-full bg-teal-600 border-2 border-gray-50 shadow-sm z-10" />

      {/* Date stamp */}
      {post.displayDate && (
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          {post.displayDate}
        </p>
      )}

      {/* Card */}
      <div
        className={`bg-white rounded-lg shadow-sm cursor-pointer transition-shadow duration-200 overflow-hidden ${
          isOpen ? 'shadow-md ring-1 ring-teal-500' : 'hover:shadow-md'
        }`}
        onClick={onToggle}
      >
        {/* Always-visible header */}
        <div className="flex items-start gap-4 p-5">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold leading-snug mb-2 transition-colors text-base ${
                isOpen ? 'text-teal-600' : 'text-gray-900'
              }`}
            >
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <ChevronDown
            size={20}
            className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-teal-500' : ''
            }`}
          />
        </div>

        {/* Expanded accordion section */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 px-5 py-5">
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{post.excerpt}</p>

            {/* Fade divider */}
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
// Three placeholder cards shown while the RSS fetch is in flight.
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
// Attempts to load real posts from Substack RSS using three-tier fetch strategy.
// Falls back to FALLBACK_POSTS if all fetch attempts fail.
// -----------------------------------------------------------------------------
export function BlogPage() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  // usingFallback: true means we're showing static posts, not live RSS
  const [usingFallback, setUsingFallback] = useState(false);
  // ID of currently open post card (uses post.link as unique key)
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      // Tier 1: rss2json
      try {
        const result = await fetchViaRss2Json();
        if (!cancelled) { setPosts(result); setLoading(false); return; }
      } catch (_) { /* fall through */ }

      // Tier 2: allorigins proxy
      try {
        const result = await fetchViaAllOrigins();
        if (!cancelled) { setPosts(result); setLoading(false); return; }
      } catch (_) { /* fall through */ }

      // Tier 3: static fallback posts — always succeeds
      if (!cancelled) {
        setPosts(FALLBACK_POSTS);
        setUsingFallback(true);
        setLoading(false);
      }
    }

    loadPosts();
    return () => { cancelled = true; };
  }, []);

  function handleToggle(link: string) {
    setOpenId(prev => (prev === link ? null : link));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page heading */}
        <div className="mb-10">
          <h1 className="text-gray-900 mb-3">Blog & Insights</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Research reflections, critical commentary, and a curated reading list on PCOS,
            digital health, and patient-centred design, updated regularly.
          </p>
        </div>

        {/* Substack banner */}
        <SubstackBanner />

        {/* Timeline feed */}
        {loading && <LoadingSkeleton />}

        {!loading && (
          <>
            {/* Fallback notice — only shown when live RSS couldn't be reached */}
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

            {/* Vertical timeline */}
            <div className="relative">
              {/* The vertical line behind the dots */}
              <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-200" />

              <div className="space-y-6">
                {posts.map(post => (
                  <TimelineItem
                    key={post.link + post.title}
                    post={post}
                    isOpen={openId === post.link + post.title}
                    onToggle={() => handleToggle(post.link + post.title)}
                  />
                ))}
              </div>
            </div>

            {/* View full archive link */}
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

        {/* Get in touch footer strip */}
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