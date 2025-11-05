import { Mail, Linkedin, GraduationCap, Award, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutResearcher() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-lg overflow-hidden mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1631203883080-9e5338ebcf2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjByZXNlYXJjaGVyJTIwc2NpZW50aXN0fGVufDF8fHx8MTc2MjM0MTAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Researcher"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                  <Mail size={18} />
                  Contact
                </button>
                <button className="w-full border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-teal-600 hover:text-teal-600 transition-colors flex items-center justify-center gap-2">
                  <Linkedin size={18} />
                  LinkedIn
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="mb-2">Dr. Sarah Johnson</h1>
              <p className="text-teal-600 mb-6">PhD Candidate in Reproductive Endocrinology</p>
              
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  I am a dedicated researcher specializing in Polycystic Ovary Syndrome (PCOS), with a focus on
                  understanding the metabolic and hormonal mechanisms underlying this complex condition. My research
                  aims to bridge the gap between basic science and clinical applications to improve diagnostic tools
                  and treatment outcomes for individuals affected by PCOS.
                </p>
                
                <p className="text-gray-600 mb-4">
                  With a background in molecular biology and endocrinology, I employ multidisciplinary approaches
                  including genomics, metabolomics, and clinical research to investigate the heterogeneous nature of
                  PCOS. My work is driven by the belief that personalized medicine approaches will be key to addressing
                  the diverse presentations and needs of PCOS patients.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-teal-600" size={20} />
              </div>
              <h2>Education</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-900">PhD in Reproductive Endocrinology</p>
                <p className="text-gray-600">University of Medical Sciences</p>
                <p className="text-gray-500">2021 - Present</p>
              </div>
              
              <div>
                <p className="text-gray-900">MSc in Molecular Biology</p>
                <p className="text-gray-600">Institute of Biological Sciences</p>
                <p className="text-gray-500">2018 - 2020</p>
              </div>
              
              <div>
                <p className="text-gray-900">BSc in Biochemistry</p>
                <p className="text-gray-600">State University</p>
                <p className="text-gray-500">2014 - 2018</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Award className="text-teal-600" size={20} />
              </div>
              <h2>Awards & Honors</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-900">Young Researcher Award</p>
                <p className="text-gray-600">International PCOS Society</p>
                <p className="text-gray-500">2024</p>
              </div>
              
              <div>
                <p className="text-gray-900">Best Poster Presentation</p>
                <p className="text-gray-600">Endocrine Conference 2023</p>
                <p className="text-gray-500">2023</p>
              </div>
              
              <div>
                <p className="text-gray-900">Graduate Research Fellowship</p>
                <p className="text-gray-600">National Science Foundation</p>
                <p className="text-gray-500">2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Publications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-teal-600" size={20} />
            </div>
            <h2>Selected Publications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-4 border-teal-600 pl-4">
              <p className="text-gray-900 mb-1">
                Johnson, S., et al. (2024). "Metabolic signatures in PCOS: A comprehensive analysis."
                <span className="italic"> Journal of Reproductive Endocrinology</span>, 45(3), 234-251.
              </p>
            </div>
            
            <div className="border-l-4 border-teal-600 pl-4">
              <p className="text-gray-900 mb-1">
                Smith, A., Johnson, S., & Brown, K. (2023). "Hormonal pathways in polycystic ovary syndrome."
                <span className="italic"> Endocrine Reviews</span>, 38(2), 112-128.
              </p>
            </div>
            
            <div className="border-l-4 border-teal-600 pl-4">
              <p className="text-gray-900 mb-1">
                Johnson, S., & Williams, R. (2023). "Novel biomarkers for PCOS diagnosis: A systematic review."
                <span className="italic"> Clinical Endocrinology</span>, 92(4), 445-462.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
