import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { AboutResearcher } from './components/AboutResearcher';
import { AboutResearch } from './components/AboutResearch';
import { JoinResearch } from './components/JoinResearch';
import { SurveyPage } from './components/SurveyPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'blog':
        return <BlogPage />;
      case 'researcher':
        return <AboutResearcher />;
      case 'research':
        return <AboutResearch />;
      case 'join':
        return <JoinResearch onNavigate={setCurrentPage} />;
      case 'survey':
        return <SurveyPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <footer className="bg-teal-950 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white mb-4">PCOS PhD</h3>
              <p className="text-teal-200">
                Advancing PCOS research through innovative scientific inquiry and evidence-based insights.
              </p>
            </div>
            <div>
              <h3 className="text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentPage('blog')}
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  Blog
                </button>
                <button
                  onClick={() => setCurrentPage('researcher')}
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  About Researcher
                </button>
                <button
                  onClick={() => setCurrentPage('research')}
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  About Research
                </button>
                <button
                  onClick={() => setCurrentPage('join')}
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  Join the Research
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-white mb-4">Contact</h3>
              <p className="text-teal-200">
                For research inquiries or collaboration opportunities, please reach out via the contact form.
              </p>
            </div>
          </div>
          <div className="border-t border-teal-900 mt-8 pt-8 text-center text-teal-200">
            <p>&copy; 2025 PCOS PhD Research. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
