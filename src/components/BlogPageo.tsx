// =============================================================================
// BlogPagen.tsx
// Version: 2.1.1
// Last updated: 2026-04-29
//
// CHANGELOG
// v2.1.1 (2026-04-29)
//   - Banner now matches site hero style: image at opacity-40 with teal
//     bg-teal-700/80 colour overlay on top, text and subscribe button sit
//     over the overlay — same pattern as HomePage hero image
//
// v2.1.0 (2026-04-29)
//   - Added blog-header.jpg as banner image (teal keyboard/anatomy illustration)
//   - Image file renamed from long Firefly filename to blog-header.jpg
//   - Place blog-header.jpg in src/assets/ before building
//
// v2.0.0 (2026-04-29)
//   - Full redesign: replaced two-section grid layout with a chronological
//     timeline feed pulled live from the Substack RSS feed via rss2json API
//   - Removed tab navigation (My Writing / Reading List tabs removed)
//   - Removed filter chips (not appropriate for a Substack-driven feed)
//   - Posts now expand full-width in place (accordion) instead of opening
//     a side panel or navigating away
//   - Banner subheading updated to: "Thoughts and findings through the PhD
//     journey and PCOS lived experience"
//   - Header nav corrected: Survey link removed (matches real site Header.tsx)
//   - Curated articles removed from the timeline (feed is Substack-only)
//   - Added loading and error states for RSS fetch
//   - "View full archive on Substack" link at bottom of feed
//
// v1.0.0 (2026-04-10)
//   - Initial blog page with static Substack post cards and curated articles
//   - Two-column grid layout with SubstackBanner, filter chips, and tag badges
//   - Separate grid sections: "From the Substack" and "Related Articles"
// =============================================================================

import { useState, useEffect } from 'react';
import { Rss, ChevronDown, ExternalLink, Mail } from 'lucide-react';
// Blog header image — place blog-header.jpg in src/assets/ before building
import blogHeaderImage from '../assets/blog-header.jpg';

// -----------------------------------------------------------------------------
// TYPES
// Each post fetched from the RSS feed is mapped to this shape.
// -----------------------------------------------------------------------------
interface SubstackPost {
  title: string;
  excerpt: string;       // Stripped HTML description from RSS
  pubDate: string;       // Raw date string from feed e.g. "Tue, 28 Mar 2026 ..."
  displayDate: string;   // Formatted for display e.g. "28 March 2026"
  link: string;          // Full URL to the Substack post
  thumbnail: string;     // Featured image URL (may be empty)
}

// -----------------------------------------------------------------------------
// RSS FETCH
// Substack exposes a public RSS feed at /feed. We use the rss2json public API
// to convert it to JSON because browsers block direct RSS parsing cross-origin.
// No API key needed for public feeds under the free tier rate limit.
// -----------------------------------------------------------------------------
const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fsubstack.com%2F%40hbwray%2Ffeed';

// Strips HTML tags from the RSS description so we can show plain text excerpts.
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

// Converts a raw RSS date string to a readable date like "28 March 2026".
function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Truncates plain text to a maximum character count, ending at a word boundary.
function truncate(text: string, maxChars = 200): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, text.lastIndexOf(' ', maxChars)) + '...';
}

// -----------------------------------------------------------------------------
// SUBSTACK BANNER
// Matches the site's hero image pattern from HomePage:
//   - Image rendered at opacity-40 so it shows through subtly
//   - bg-teal-700 colour layer sits on top of the image as the visible surface
//   - Text and subscribe button sit above both layers via z-index
// This gives the image a tinted-glass feel consistent with the rest of the site.
// -----------------------------------------------------------------------------
function SubstackBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-10" style={{ minHeight: '160px' }}>

      {/* Background image — same opacity-40 treatment as HomePage hero */}
      <img
        src={blogHeaderImage}
        alt="Teal illustration combining a keyboard and reproductive anatomy"
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

        {/* Subscribe button */}
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
// A single post card in the timeline. Clicking expands an accordion section
// showing a longer excerpt and a "Read full post" button to Substack.
// Only one card is open at a time (controlled by parent via openId state).
// -----------------------------------------------------------------------------
interface TimelineItemProps {
  post: SubstackPost;
  isOpen: boolean;
  onToggle: () => void;
}

function TimelineItem({ post, isOpen, onToggle }: TimelineItemProps) {
  return (
    <div className="relative pl-7">

      {/* Timeline dot — the teal circle on the vertical line */}
      <div className="absolute left-0 top-5 w-3 h-3 rounded-full bg-teal-600 border-2 border-gray-50 shadow-sm z-10" />

      {/* Date stamp above the card */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
        {post.displayDate}
      </p>

      {/* Card — white, shadow-sm to match rest of site */}
      <div
        className={`bg-white rounded-lg shadow-sm cursor-pointer transition-shadow duration-200 overflow-hidden ${
          isOpen
            ? 'shadow-md ring-1 ring-teal-500'   // Open state: teal ring highlight
            : 'hover:shadow-md'
        }`}
        onClick={onToggle}
      >
        {/* ── Card header (always visible) ── */}
        <div className="flex items-start gap-4 p-5">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold leading-snug mb-2 transition-colors ${
                isOpen ? 'text-teal-600' : 'text-gray-900 group-hover:text-teal-600'
              }`}
            >
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>

          {/* Chevron rotates 180deg when card is open */}
          <ChevronDown
            size={20}
            className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-teal-500' : ''
            }`}
          />
        </div>

        {/* ── Expanded section (accordion) ── */}
        {/* max-h trick: animates between 0 and a large value for smooth open/close */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 px-5 py-5">
            {/* Longer excerpt preview */}
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {post.excerpt}
            </p>

            {/* Fade-off label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">continues on Substack</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Actions row */}
            <div className="flex items-center gap-3">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()} // Prevent card toggle when clicking link
                className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Read full post
                <ExternalLink size={13} />
              </a>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); onToggle(); }}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
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
// MAIN PAGE COMPONENT
// Fetches the Substack RSS feed on mount, renders the timeline.
// Loading and error states are shown in place of the timeline.
// -----------------------------------------------------------------------------
export function BlogPage() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tracks which post is currently expanded. Stores the post link as a unique ID.
  const [openId, setOpenId] = useState<string | null>(null);

  // Fetch RSS feed on component mount
  useEffect(() => {
    fetch(FEED_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status !== 'ok' || !data.items?.length) {
          setError(true);
          return;
        }

        // Map the raw RSS items to our cleaner SubstackPost shape
        const mapped: SubstackPost[] = data.items.map((item: any) => ({
          title: item.title || 'Untitled',
          excerpt: truncate(stripHtml(item.description || item.content || ''), 300),
          pubDate: item.pubDate,
          displayDate: formatDate(item.pubDate),
          link: item.link || 'https://substack.com/@hbwray',
          thumbnail: item.thumbnail || '',
        }));

        setPosts(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Toggle a card open/closed. If the clicked card is already open, close it.
  function handleToggle(link: string) {
    setOpenId(prev => (prev === link ? null : link));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Page heading ── */}
        <div className="mb-10">
          <h1 className="text-gray-900 mb-3">Blog & Insights</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Research reflections, critical commentary, and a curated reading list on PCOS,
            digital health, and patient-centred design, updated regularly.
          </p>
        </div>

        {/* ── Substack subscribe banner ── */}
        <SubstackBanner />

        {/* ── Timeline feed ── */}
        {loading && (
          // Loading skeleton — three placeholder cards while fetch is in flight
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
        )}

        {error && (
          // Error state — shown if RSS fetch fails or returns no items
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <Rss size={32} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2 font-semibold">Could not load posts</p>
            <p className="text-gray-400 text-sm mb-6">
              The Substack feed could not be reached right now.
            </p>
            <a
              href="https://substack.com/@hbwray"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-semibold"
            >
              Read directly on Substack <ExternalLink size={13} />
            </a>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Vertical timeline line behind the dots */}
            <div className="relative">
              <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-200" />

              <div className="space-y-6">
                {posts.map(post => (
                  <TimelineItem
                    key={post.link}
                    post={post}
                    isOpen={openId === post.link}
                    onToggle={() => handleToggle(post.link)}
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

        {/* ── Get in touch footer strip ── */}
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