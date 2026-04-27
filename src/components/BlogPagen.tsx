import { useState } from 'react';
import { ExternalLink, Rss, BookOpen, Clock, ArrowRight, Mail, Tag, TrendingUp, Search } from 'lucide-react';

interface SubstackPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  substackUrl: string;
}

interface CuratedArticle {
  id: number;
  title: string;
  source: string;
  sourceUrl: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
}

const substackPosts: SubstackPost[] = [
  {
    id: 1,
    title: 'Why PCOS Diagnosis Takes So Long and What We Can Do About It',
    excerpt:
      'The average time from first symptoms to diagnosis is over two years. I explore the systemic, cultural, and clinical reasons behind this delay and what patient-centred design could offer as a solution.',
    date: 'March 28, 2026',
    readTime: '8 min read',
    tag: 'Research',
    substackUrl: 'https://substack.com',
  },
  {
    id: 2,
    title: 'Flo, Clue, and the Period Tracker Problem: What Apps Get Wrong',
    excerpt:
      'Period-tracking apps collect enormous amounts of intimate data, yet most still present PCOS as an afterthought. I look at where UX design is failing women with hormonal conditions.',
    date: 'March 10, 2026',
    readTime: '11 min read',
    tag: 'Digital Health',
    substackUrl: 'https://substack.com',
  },
  {
    id: 3,
    title: 'What Self-Management Actually Means When You Have PCOS',
    excerpt:
      'The phrase lifestyle management is used constantly in PCOS care but what does it mean in practice? Drawing from survey responses, I unpack the emotional labour behind the advice.',
    date: 'February 18, 2026',
    readTime: '9 min read',
    tag: 'Lived Experience',
    substackUrl: 'https://substack.com',
  },
  {
    id: 4,
    title: 'Co-Design in Healthcare: Involving Patients in Building Better Tools',
    excerpt:
      'Co-design is more than a buzzword. It is a methodology with real implications for how digital health tools are built and evaluated. Here I outline my approach and early findings.',
    date: 'January 30, 2026',
    readTime: '7 min read',
    tag: 'Methodology',
    substackUrl: 'https://substack.com',
  },
];

const curatedArticles: CuratedArticle[] = [
  {
    id: 1,
    title: 'Polycystic Ovary Syndrome: A Review of Treatment Options',
    source: 'The Lancet',
    sourceUrl: 'https://www.thelancet.com',
    excerpt:
      'A comprehensive review of current evidence for pharmacological and lifestyle interventions in the management of PCOS, covering hormonal therapies, insulin sensitisers, and emerging approaches.',
    date: 'April 2026',
    tag: 'Clinical Research',
    readTime: '15 min read',
  },
  {
    id: 2,
    title: 'Digital Phenotyping and Womens Health: Opportunities and Risks',
    source: 'npj Digital Medicine',
    sourceUrl: 'https://www.nature.com/npjdigitalmed',
    excerpt:
      'How passive data collection from smartphones and wearables is reshaping health monitoring and the ethical questions that remain largely unanswered.',
    date: 'March 2026',
    tag: 'FemTech',
    readTime: '10 min read',
  },
  {
    id: 3,
    title: 'PCOS and Mental Health: Prevalence of Anxiety and Depression',
    source: 'Human Reproduction',
    sourceUrl: 'https://academic.oup.com/humrep',
    excerpt:
      'A meta-analysis of 30 studies examining the prevalence of anxiety and depression in people with PCOS, reinforcing calls for integrated psychological support in care pathways.',
    date: 'February 2026',
    tag: 'Mental Health',
    readTime: '12 min read',
  },
  {
    id: 4,
    title: 'User Experience Barriers in NHS Digital Services',
    source: 'BMJ Digital Health',
    sourceUrl: 'https://bmjdigitalhealth.bmj.com',
    excerpt:
      'A qualitative study of patient experiences with NHS digital tools, identifying recurring friction points around accessibility, trust, and clinical relevance.',
    date: 'January 2026',
    tag: 'NHS & UX',
    readTime: '9 min read',
  },
  {
    id: 5,
    title: 'Inositol Supplementation in PCOS: A Systematic Review',
    source: 'European Journal of Obstetrics & Gynecology',
    sourceUrl: 'https://www.ejog.org',
    excerpt:
      'Emerging evidence suggests myo-inositol and D-chiro-inositol may improve hormonal and metabolic parameters in PCOS, but study quality varies considerably.',
    date: 'December 2025',
    tag: 'Nutrition & Supplements',
    readTime: '13 min read',
  },
  {
    id: 6,
    title: 'Gamification in Chronic Condition Management: A Scoping Review',
    source: 'Journal of Medical Internet Research',
    sourceUrl: 'https://www.jmir.org',
    excerpt:
      'This scoping review examines how game mechanics have been applied to improve engagement with self-management tools across a range of chronic conditions.',
    date: 'November 2025',
    tag: 'Gamification',
    readTime: '11 min read',
  },
];

function TagBadge({ tag }: { tag: string }) {
  const colorMap: Record<string, string> = {
    Research: 'bg-teal-100 text-teal-800',
    'Digital Health': 'bg-blue-100 text-blue-800',
    'Lived Experience': 'bg-purple-100 text-purple-800',
    Methodology: 'bg-gray-100 text-gray-700',
    FemTech: 'bg-pink-100 text-pink-800',
    'Mental Health': 'bg-indigo-100 text-indigo-800',
    'Clinical Research': 'bg-teal-100 text-teal-800',
    'NHS & UX': 'bg-blue-100 text-blue-800',
    'Nutrition & Supplements': 'bg-green-100 text-green-800',
    Gamification: 'bg-amber-100 text-amber-800',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${colorMap[tag] ?? 'bg-gray-100 text-gray-700'}`}>
      <Tag size={10} />
      {tag}
    </span>
  );
}

function SubstackBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="relative overflow-hidden bg-teal-700 rounded-2xl p-8 mb-10 text-white">
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-teal-600 opacity-40" />
      <div className="absolute -bottom-12 -left-8 w-64 h-64 rounded-full bg-teal-800 opacity-40" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Rss size={20} className="text-teal-200" />
            <span className="text-teal-200 text-sm font-semibold tracking-wide uppercase">Substack Newsletter</span>
          </div>
          <h2 className="text-white mb-2">
            PCOS PhD Research Dispatches
          </h2>
          <p className="text-teal-100 text-base leading-relaxed max-w-lg">
            Essays, reflections, and findings from ongoing research into PCOS care, digital health,
            and lived experience. Published monthly.
          </p>
        </div>

        <div className="flex-shrink-0 w-full md:w-auto">
          {subscribed ? (
            <div className="bg-teal-600 border border-teal-400 rounded-xl px-6 py-4 text-center">
              <p className="text-white font-semibold">You are subscribed!</p>
              <p className="text-teal-200 text-sm mt-1">Check your inbox to confirm.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 text-base"
              />
              <button
                onClick={handleSubscribe}
                type="button"
                className="w-full px-6 py-3 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                Subscribe on Substack
              </button>
              <p className="text-teal-200 text-xs text-center">
                Or read the{' '}
                <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  full archive
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SubstackCard({ post }: { post: SubstackPost }) {
  return (
    <a
      href={post.substackUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <TagBadge tag={post.tag} />
        <ExternalLink size={14} className="text-gray-400 group-hover:text-teal-600 transition-colors flex-shrink-0 mt-0.5" />
      </div>
      <h3 className="text-gray-900 font-bold leading-snug mb-2 group-hover:text-teal-700 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>{post.date}</span>
        <span>.</span>
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {post.readTime}
        </span>
        <span className="ml-auto text-teal-600 font-semibold group-hover:underline">Read on Substack</span>
      </div>
    </a>
  );
}

function CuratedCard({ article }: { article: CuratedArticle }) {
  return (
    <a
      href={article.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-300 hover:shadow-md transition-all"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
        <BookOpen size={16} className="text-teal-600" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-xs font-bold text-teal-700 truncate">{article.source}</span>
          <ExternalLink size={12} className="text-gray-400 group-hover:text-teal-600 transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <h4 className="text-gray-900 font-bold text-sm leading-snug mb-1 group-hover:text-teal-700 transition-colors">
          {article.title}
        </h4>
        <p className="text-gray-500 text-xs leading-relaxed mb-2">{article.excerpt}</p>
        <div className="flex flex-wrap items-center gap-2">
          <TagBadge tag={article.tag} />
          <span className="text-xs text-gray-400">{article.date}</span>
          <span className="text-xs text-gray-400">· {article.readTime}</span>
        </div>
      </div>
    </a>
  );
}

export function BlogPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = substackPosts.filter(p => {
    const matchTag = activeTag === 'All' || p.tag === activeTag;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchSearch;
  });

  const filteredArticles = curatedArticles.filter(a => {
    const matchTag = activeTag === 'All' || a.tag === activeTag;
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mb-10">
          <h1 className="text-gray-900 mb-3">Blog & Insights</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Research reflections, critical commentary, and a curated reading list on PCOS, digital health,
            and patient-centred design, updated regularly.
          </p>
        </div>

        <SubstackBanner />

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts and articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Research', 'Digital Health', 'Lived Experience', 'FemTech', 'Clinical Research'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTag === tag
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Rss size={18} className="text-teal-600" />
              <h2 className="text-gray-900">From the Substack</h2>
            </div>
            <a
              href="https://substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
            >
              View all posts <ArrowRight size={14} />
            </a>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
              No posts match your filter.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filteredPosts.map(post => (
                <SubstackCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-5 flex justify-center">
            <a
              href="https://substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal-600 text-teal-600 font-bold rounded-xl hover:bg-teal-600 hover:text-white transition-colors text-sm"
            >
              <Rss size={16} />
              Read the full archive on Substack
            </a>
          </div>
        </section>

        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
            <TrendingUp size={16} className="text-teal-500" />
            Curated Reading
          </div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-teal-600" />
              <h2 className="text-gray-900">Related Articles & Research</h2>
            </div>
            <span className="text-xs text-gray-400 font-medium">Selected from peer-reviewed journals & health media</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
            <div className="flex-shrink-0 text-blue-600 mt-0.5 font-bold text-sm">i</div>
            <p className="text-sm text-blue-800 leading-relaxed">
              These articles are curated to complement ongoing research themes. They are not written by or affiliated
              with this project. Always access articles through your institution or open-access repositories.
            </p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
              No articles match your filter.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredArticles.map(article => (
                <CuratedCard key={article.id} article={article} />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 self-center mr-1">Filter by topic:</span>
            {['Clinical Research', 'FemTech', 'Mental Health', 'NHS & UX', 'Nutrition & Supplements', 'Gamification'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? 'All' : tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  activeTag === tag
                    ? 'bg-teal-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-teal-400 hover:text-teal-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-12 bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
          <h3 className="text-teal-900 mb-2">Suggest a Resource</h3>
          <p className="text-teal-800 text-sm max-w-xl mx-auto mb-5 leading-relaxed">
            Have a paper, article, or resource you think should be featured here?
            Reach out via the contact form and we will take a look.
          </p>
          <a
            href="mailto:wrayh@uni.coventry.ac.uk"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors text-sm"
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </div>

      </div>
    </div>
  );
}
