import { Target, Lightbulb, Users, TrendingUp, FileText, Beaker, Map, User, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function AboutResearch() {
  const [objectivesExpanded, setObjectivesExpanded] = useState(false);
  const [methodologyExpanded, setMethodologyExpanded] = useState(false);
  const [outcomesExpanded, setOutcomesExpanded] = useState(false);
  const [impactExpanded, setImpactExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-48 md:h-64">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1627757757997-369fb38812e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB3aXJlZnJhbWUlMjBza2V0Y2glMjBwcm90b3R5cGV8ZW58MXx8fHwxNzcxNDE1ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Mobile Wireframe Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-600/60 flex items-center">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-white mb-4">PCOS Creative Interventions Research</h1>
                <p className="text-teal-50">Investigating the multifaceted nature of Polycystic Ovary Syndrome to advance digital self-management solutions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="mb-6">Research Overview</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4"></p>
            <p className="text-gray-600 mb-4">
              Our research employs a multidisciplinary approach, combining molecular biology, clinical studies,
              and bioinformatics to identify novel biomarkers and therapeutic targets. The ultimate goal is to
              develop personalized treatment strategies that address the heterogeneous nature of PCOS and improve
              long-term health outcomes for affected individuals.
            </p>
          </div>
        </div>

        {/* Research Objectives */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Target className="text-teal-600" size={20} />
            </div>
            <h2 className="flex-1">Research Objectives</h2>
            <button
              className="md:hidden ml-auto text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition-colors"
              onClick={() => setObjectivesExpanded(!objectivesExpanded)}
              aria-label={objectivesExpanded ? "Collapse objectives" : "Expand objectives"}
            >
              {objectivesExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
          
          <div className={`grid md:grid-cols-2 gap-6 ${objectivesExpanded ? 'block' : 'hidden'} md:grid`}>
            <div className="border-l-4 border-teal-600 pl-4">
              <h3 className="mb-2">Objective 1</h3>
              <p className="text-gray-600">
                Identify and validate novel metabolic biomarkers for early detection and phenotypic
                classification of PCOS using metabolomics approaches.
              </p>
            </div>
            
            <div className="border-l-4 border-teal-600 pl-4">
              <h3 className="mb-2">Objective 2</h3>
              <p className="text-gray-600">
                Investigate the role of insulin resistance and metabolic dysfunction in the pathogenesis
                of PCOS across different phenotypic presentations.
              </p>
            </div>
            
            <div className="border-l-4 border-teal-600 pl-4">
              <h3 className="mb-2">Objective 3</h3>
              <p className="text-gray-600">
                Examine the genetic and epigenetic factors contributing to PCOS susceptibility and
                progression using genomic and transcriptomic analyses.
              </p>
            </div>
            
            <div className="border-l-4 border-teal-600 pl-4">
              <h3 className="mb-2">Objective 4</h3>
              <p className="text-gray-600">
                Evaluate the efficacy of targeted interventions on metabolic and reproductive outcomes
                in PCOS patients through clinical trials.
              </p>
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Beaker className="text-teal-600" size={20} />
            </div>
            <h2>Methodology</h2>
            <button
              className="md:hidden ml-auto text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition-colors"
              onClick={() => setMethodologyExpanded(!methodologyExpanded)}
              aria-label={methodologyExpanded ? "Collapse methodology" : "Expand methodology"}
            >
              {methodologyExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
          
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${methodologyExpanded ? 'block' : 'hidden'} md:grid`}>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-teal-600" size={24} />
              </div>
              <h3 className="mb-2">Digital Survey</h3>
              <p className="text-gray-600">
                Prospective cohort studies with comprehensive phenotyping of PCOS patients and controls.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="text-teal-600" size={24} />
              </div>
              <h3 className="mb-2">Lived Experience Mapping</h3>
              <p className="text-gray-600">
                Metabolomics, genomics, and hormonal profiling using advanced analytical techniques.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-teal-600" size={24} />
              </div>
              <h3 className="mb-2">Clinician Interviews</h3>
              <p className="text-gray-600">
                Bioinformatics and statistical modeling to identify patterns and predictive markers.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-teal-600" size={24} />
              </div>
              <h3 className="mb-2">Co-design</h3>
              <p className="text-gray-600">
                Collaborative design process involving patients, clinicians, and researchers to develop solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Expected Outcomes */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="text-teal-600" size={20} />
              </div>
              <h2>Expected Outcomes</h2>
              <button
                className="md:hidden ml-auto text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition-colors"
                onClick={() => setOutcomesExpanded(!outcomesExpanded)}
                aria-label={outcomesExpanded ? "Collapse outcomes" : "Expand outcomes"}
              >
                {outcomesExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
            </div>
            
            <ul className={`space-y-3 text-gray-600 ${outcomesExpanded ? 'block' : 'hidden'} md:block`}>
              <li className="flex gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <span>Development of a novel biomarker panel for PCOS diagnosis and phenotyping</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <span>Enhanced understanding of metabolic dysfunction mechanisms in PCOS</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <span>Identification of potential therapeutic targets for personalized treatment</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <span>Evidence-based recommendations for clinical management strategies</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Users className="text-teal-600" size={20} />
              </div>
              <h2>Impact & Significance</h2>
              <button
                className="md:hidden ml-auto text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition-colors"
                onClick={() => setImpactExpanded(!impactExpanded)}
                aria-label={impactExpanded ? "Collapse impact" : "Expand impact"}
              >
                {impactExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
            </div>
            
            <p className={`text-gray-600 mb-4 ${impactExpanded ? 'block' : 'hidden'} md:block`}>
              This research has the potential to significantly impact the lives of millions of women affected
              by PCOS worldwide. By advancing our understanding of the condition and developing more precise
              diagnostic and therapeutic approaches, we aim to:
            </p>
            
            <ul className={`space-y-3 text-gray-600 ${impactExpanded ? 'block' : 'hidden'} md:block`}>
              <li className="flex gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <span>Reduce diagnostic delays and improve early intervention</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <span>Enable personalized treatment strategies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <span>Improve long-term metabolic and reproductive health outcomes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}