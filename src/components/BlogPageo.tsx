import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding PCOS: A Comprehensive Overview',
    excerpt: 'Polycystic Ovary Syndrome affects millions of women worldwide. This post explores the current understanding of PCOS, its symptoms, and diagnostic criteria.',
    date: 'October 15, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBzY2llbmNlfGVufDF8fHx8MTc2MjM0MTAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Research'
  },
  {
    id: 2,
    title: 'Metabolic Dysfunction in PCOS: New Findings',
    excerpt: 'Recent research has shed light on the metabolic aspects of PCOS. This article discusses insulin resistance, metabolic syndrome, and their implications.',
    date: 'October 1, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1761106082516-61d4c6883f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2MjMwNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Research'
  },
  {
    id: 3,
    title: 'Hormonal Patterns and PCOS: A Deep Dive',
    excerpt: 'Exploring the complex hormonal imbalances associated with PCOS, including androgens, LH/FSH ratios, and their clinical significance.',
    date: 'September 20, 2025',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1707944745880-5c8a64617458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzYyMjYwNjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Analysis'
  },
  {
    id: 4,
    title: 'Treatment Approaches: Evidence-Based Review',
    excerpt: 'A comprehensive review of current treatment modalities for PCOS, from lifestyle interventions to pharmacological approaches.',
    date: 'September 5, 2025',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1631203883080-9e5338ebcf2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjByZXNlYXJjaGVyJTIwc2NpZW50aXN0fGVufDF8fHx8MTc2MjM0MTAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Treatment'
  },
  {
    id: 5,
    title: 'PCOS and Mental Health: An Overlooked Connection',
    excerpt: 'Examining the psychological impact of PCOS and the importance of addressing mental health in comprehensive patient care.',
    date: 'August 22, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBzY2llbmNlfGVufDF8fHx8MTc2MjM0MTAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness'
  },
  {
    id: 6,
    title: 'Future Directions in PCOS Research',
    excerpt: 'Looking ahead at emerging research areas, innovative methodologies, and promising therapeutic targets in PCOS studies.',
    date: 'August 10, 2025',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1761106082516-61d4c6883f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2MjMwNTA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Research'
  }
];

export function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">Research Blog</h1>
          <p className="text-gray-600 max-w-3xl">
            Insights, findings, and discussions about PCOS research. Stay updated with the latest developments
            in our understanding of Polycystic Ovary Syndrome.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="mb-2 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <button className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-2">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
