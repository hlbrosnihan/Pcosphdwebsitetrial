import { Users, CheckCircle, FileText, Mail, Clock, Heart, ClipboardList } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface JoinResearchProps {
  onNavigate?: (page: string) => void;
}

export function JoinResearch({ onNavigate }: JoinResearchProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', age: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYyMzQxMDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Research Collaboration"
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 flex items-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(17, 94, 89, 0.9), rgba(13, 148, 136, 0.7)), url('https://images.unsplash.com/photo-1610985725707-bb0766bf123b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJpb2QlMjB0cmFja2luZyUyMGFwcCUyMG1vYmlsZSUyMHBob25lfGVufDF8fHx8MTc3MjQ3MTM3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
                <h1 className="text-white mb-4">Join Our Research Study</h1>
                <p className="text-teal-50">
                  Help advance PCOS research by participating in our study. Your contribution can make a
                  difference for millions of women worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Participate Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="mb-6">Why Participate in Our Study?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-teal-50 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-teal-600" size={28} />
              </div>
              <h3 className="mb-2">Make a Difference</h3>
              <p className="text-gray-600">
                Your participation directly contributes to advancing scientific understanding of PCOS and
                developing better treatments.
              </p>
            </div>

            <div className="text-center p-6 bg-teal-50 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-teal-600" size={28} />
              </div>
              <h3 className="mb-2">Access to Information</h3>
              <p className="text-gray-600">
                Receive detailed information about your health metrics and stay informed about the latest
                research findings.
              </p>
            </div>

            <div className="text-center p-6 bg-teal-50 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-teal-600" size={28} />
              </div>
              <h3 className="mb-2">Expert Care</h3>
              <p className="text-gray-600">
                Work with experienced researchers and healthcare professionals throughout the study period.
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-teal-600" size={20} />
            </div>
            <h2>Eligibility Criteria</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="mb-3 text-teal-600">Inclusion Criteria</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>Women aged 18-45 years</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>Diagnosed with PCOS according to Rotterdam criteria</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>Willing to attend regular follow-up appointments</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>Able to provide informed consent</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-teal-600">Study Commitment</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-3">
                  <Clock className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>Study duration: 12 months</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>4-6 clinic visits over the study period</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>Regular health assessments and questionnaires</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="text-teal-600 flex-shrink-0 mt-1" size={18} />
                  <span>Blood samples and basic health measurements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="mb-6">What to Expect</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-teal-600 pl-6">
              <h3 className="mb-2">Initial Survey</h3>
              <p className="text-gray-600">
                A preliminary assessment to confirm eligibility and explain the study procedures in detail.
                You'll have the opportunity to ask questions and review the consent form.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-6">
              <h3 className="mb-2">Focus Groups & Interviews</h3>
              <p className="text-gray-600">
                Comprehensive health evaluation including medical history, physical examination, blood tests,
                and metabolic assessments to establish your baseline health status.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-6">
              <h3 className="mb-2">Co-design Workshop</h3>
              <p className="text-gray-600">
                Final assessment and debriefing session. You'll receive a summary of your results and
                information about how the data will contribute to research.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Mail className="text-teal-600" size={20} />
            </div>
            <h2>Express Your Interest</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Fill out the form below to express your interest in participating. A member of our research team
            will contact you within 2-3 business days to discuss the study in more detail.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-gray-700">
                Additional Information (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none"
                placeholder="Tell us about your PCOS diagnosis, any questions you have, or other relevant information..."
              />
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Privacy Notice:</strong> Your information will be kept confidential and used solely for
                research screening purposes. By submitting this form, you consent to be contacted by our
                research team.
              </p>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Submit Interest Form
            </button>
          </form>
        </div>

        {/* Survey Button Section */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg shadow-sm p-8 border-2 border-teal-200">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="text-white" size={32} />
            </div>
            <h2 className="mb-4">Already Interested? Take Our Survey</h2>
            <p className="text-gray-700 mb-6">
              If you've already expressed interest or want to contribute to our research immediately, 
              you can complete our comprehensive PCOS survey. This survey helps us gather valuable 
              data about PCOS experiences and takes approximately 15-20 minutes to complete.
            </p>
            <button
              onClick={() => onNavigate?.('survey')}
              className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
            >
              <ClipboardList size={20} />
              Participate in Our Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}