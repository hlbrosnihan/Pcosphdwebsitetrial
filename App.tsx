import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { BlogPage } from './BlogPage';
import { AboutResearcher } from './AboutResearcher';
import { AboutResearch } from './AboutResearch';
import { JoinResearch } from './JoinResearch';
import { SurveyPage } from './SurveyPage';
import { ContactFormModal } from './ContactFormModal';

export default function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/researcher" element={<AboutResearcher />} />
          <Route path="/research" element={<AboutResearch />} />
          <Route path="/join" element={<JoinResearch />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <footer className="bg-teal-950 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white mb-4">PCOS PhD</h3>
              <p className="text-teal-200">Advancing PCOS research through lived experience, innovative and integration.</p>
            </div>
            <div>
              <h3 className="text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/researcher')}
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  About Researcher
                </button>
                <button
                  onClick={() => navigate('/join')}
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  Join the Research
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-white mb-4">Contact</h3>
              <p className="text-teal-200 mb-4">
                For research inquiries or collaboration opportunities, please reach out:
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:wrayh@uni.coventry.ac.uk"
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  wrayh@uni.coventry.ac.uk
                </a>
                <button
                  onClick={() => setIsContactFormOpen(true)}
                  className="block text-teal-200 hover:text-white transition-colors"
                >
                  Contact Form
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-teal-900 mt-8 pt-8 text-center text-teal-200">
            <p>© 2025&nbsp;&nbsp;Hilary B Wray All rights reserved.</p>
          </div>
        </div>
      </footer>
      <ContactFormModal isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </div>
  );
}