import { ClipboardList, AlertCircle, CheckCircle2, Frown, Meh, Smile, FrownIcon, SmileIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function SurveyPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    // Demographics
    name: '',
    email: '',
    age: '',
    ethnicity: '',
    
    // PCOS Diagnosis
    diagnosisAge: '',
    diagnosedBy: '',
    diagnosedByOther: '',
    diagnosisExperience: '',
    diagnosisMethod: '',
    symptoms: [] as string[],
    
    // Digital App Usage
    usesNHSApp: '',
    nhsAppFeatures: [] as string[],
    nhsAppOther: '',
    nhsAppLikes: '',
    nhsAppDislikes: '',
    usesPeriodTracker: '',
    periodTrackerApps: [] as string[],
    periodTrackerOther: '',
    periodTrackerLikes: '',
    periodTrackerDislikes: '',
    usesNutritionApp: '',
    nutritionApps: [] as string[],
    nutritionAppOther: '',
    nutritionAppLikes: '',
    nutritionAppDislikes: '',
    usesPCOSApp: '',
    pcosAppName: '',
    pcosAppLikes: '',
    pcosAppDislikes: '',
    
    // Medical History
    previousTreatments: [] as string[],
    currentMedications: '',
    otherConditions: '',
    familyHistory: '',
    
    // Lifestyle
    exerciseFrequency: '',
    dietType: '',
    sleepHours: '',
    stressLevel: '',
    
    // Quality of Life
    physicalWellbeing: '',
    emotionalWellbeing: '',
    socialImpact: '',
    
    // Additional Information
    additionalComments: ''
  });

  const sections = [
    { title: 'Demographics', icon: '👤' },
    { title: 'PCOS Diagnosis', icon: '🏥' },
    { title: 'Digital App Usage', icon: '📱' },
    { title: 'Medical History', icon: '📋' },
    { title: 'Lifestyle Factors', icon: '🏃' },
    { title: 'Quality of Life', icon: '❤️' },
    { title: 'Additional Information', icon: '📝' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (field: 'symptoms' | 'previousTreatments' | 'nhsAppFeatures' | 'periodTrackerApps' | 'nutritionApps', value: string) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setFormData({
      ...formData,
      [field]: newValues
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for completing the survey! Your responses have been recorded.');
    // Reset form or redirect
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-48 md:h-64">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJ2ZXklMjBmb3JtfGVufDF8fHx8MTc2MjM0MTAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Survey"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-600/70 flex items-center">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <ClipboardList size={40} />
                  <h1 className="text-white">PCOS Research Survey</h1>
                </div>
                <p className="text-teal-50">
                  Help us better understand PCOS by sharing your experiences. This survey takes approximately 15-20 minutes to complete.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-blue-900 mb-2">Before You Begin</h3>
              <ul className="space-y-1 text-blue-800">
                <li>• All responses are confidential and will be used for research purposes only</li>
                <li>• You can save your progress and return later</li>
                <li>• There are no right or wrong answers - we want to hear about your experiences</li>
                <li>• You may skip any questions you're not comfortable answering</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Section {currentSection + 1} of {sections.length}</span>
            <span className="text-teal-600">{Math.round(((currentSection + 1) / sections.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`p-2 rounded-lg text-center transition-all ${
                  index === currentSection
                    ? 'bg-teal-600 text-white'
                    : index < currentSection
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="text-xl mb-1">{section.icon}</div>
                <div className="text-xs hidden md:block">{section.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Survey Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="mb-6">{sections[currentSection].title}</h2>

            {/* Demographics Section */}
            {currentSection === 0 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block mb-2 text-gray-700">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label htmlFor="ethnicity" className="block mb-2 text-gray-700">
                    Ethnicity
                  </label>
                  <select
                    id="ethnicity"
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="white">White</option>
                    <option value="black">Black or African American</option>
                    <option value="asian">Asian</option>
                    <option value="hispanic">Hispanic or Latino</option>
                    <option value="native">Native American or Alaska Native</option>
                    <option value="pacific">Native Hawaiian or Pacific Islander</option>
                    <option value="mixed">Two or more races</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to answer</option>
                  </select>
                </div>
              </div>
            )}

            {/* PCOS Diagnosis Section */}
            {currentSection === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="diagnosisAge" className="block mb-2 text-gray-700">
                    At what age were you diagnosed with PCOS? *
                  </label>
                  <input
                    type="number"
                    id="diagnosisAge"
                    name="diagnosisAge"
                    value={formData.diagnosisAge}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Age at diagnosis"
                  />
                </div>

                <div>
                  <label htmlFor="diagnosedBy" className="block mb-2 text-gray-700">
                    Who diagnosed your PCOS?
                  </label>
                  <select
                    id="diagnosedBy"
                    name="diagnosedBy"
                    value={formData.diagnosedBy}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="gp">GP (General Practitioner)</option>
                    <option value="endocrinologist">Endocrinologist</option>
                    <option value="gynecologist">Gynecologist</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {formData.diagnosedBy === 'other' && (
                  <div>
                    <label htmlFor="diagnosedByOther" className="block mb-2 text-gray-700">
                      Please specify
                    </label>
                    <input
                      type="text"
                      id="diagnosedByOther"
                      name="diagnosedByOther"
                      value={formData.diagnosedByOther}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                      placeholder="Please specify who diagnosed your PCOS"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="diagnosisExperience" className="block mb-2 text-gray-700">
                    Tell us about your diagnosis experience
                  </label>
                  <textarea
                    id="diagnosisExperience"
                    name="diagnosisExperience"
                    value={formData.diagnosisExperience}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                    placeholder="Please share your diagnosis experience..."
                  />
                </div>

                <div>
                  <label htmlFor="diagnosisMethod" className="block mb-2 text-gray-700">
                    How was PCOS diagnosed?
                  </label>
                  <select
                    id="diagnosisMethod"
                    name="diagnosisMethod"
                    value={formData.diagnosisMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="ultrasound">Ultrasound</option>
                    <option value="blood-test">Blood Test (Hormone Levels)</option>
                    <option value="both">Both Ultrasound and Blood Test</option>
                    <option value="clinical">Clinical Symptoms Only</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-3 text-gray-700">
                    Which symptoms led to your diagnosis? (Select all that apply)
                  </label>
                  <div className="space-y-2">
                    {[
                      'Irregular or absent periods',
                      'Excess facial or body hair',
                      'Acne',
                      'Weight gain or difficulty losing weight',
                      'Thinning hair on scalp',
                      'Darkening of skin',
                      'Difficulty getting pregnant',
                      'Multiple ovarian cysts on ultrasound'
                    ].map((symptom) => (
                      <label key={symptom} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.symptoms.includes(symptom)}
                          onChange={() => handleCheckboxChange('symptoms', symptom)}
                          className="w-4 h-4 text-teal-600 rounded focus:ring-teal-600"
                        />
                        <span className="text-gray-700">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Digital App Usage Section */}
            {currentSection === 2 && (
              <div className="space-y-6">
                {/* NHS App */}
                <div>
                  <label htmlFor="usesNHSApp" className="block mb-2 text-gray-700">
                    Do you use the NHS app?
                  </label>
                  <select
                    id="usesNHSApp"
                    name="usesNHSApp"
                    value={formData.usesNHSApp}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.usesNHSApp === 'yes' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-3 text-gray-700">
                        What do you use the NHS app for? (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          'View medical records',
                          'Order prescriptions',
                          'Book appointments',
                          'Access test results',
                          'Manage repeat prescriptions',
                          'Send messages to GP',
                          'Other'
                        ].map((feature) => (
                          <label key={feature} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.nhsAppFeatures.includes(feature)}
                              onChange={() => handleCheckboxChange('nhsAppFeatures', feature)}
                              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-600"
                            />
                            <span className="text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                      {formData.nhsAppFeatures.includes('Other') && (
                        <div className="ml-4">
                          <input
                            type="text"
                            name="nhsAppOther"
                            value={formData.nhsAppOther}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            placeholder="Please specify other NHS app usage"
                          />
                        </div>
                      )}
                    </div>

                    {formData.nhsAppFeatures.length > 0 && (
                      <>
                        <div>
                          <label htmlFor="nhsAppLikes" className="block mb-2 text-gray-700">
                            What do you like about the NHS app?
                          </label>
                          <textarea
                            id="nhsAppLikes"
                            name="nhsAppLikes"
                            value={formData.nhsAppLikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you like about the NHS app..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.nhsAppLikes.length}/500 characters
                          </p>
                        </div>

                        <div>
                          <label htmlFor="nhsAppDislikes" className="block mb-2 text-gray-700">
                            What do you dislike about the NHS app?
                          </label>
                          <textarea
                            id="nhsAppDislikes"
                            name="nhsAppDislikes"
                            value={formData.nhsAppDislikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you dislike about the NHS app..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.nhsAppDislikes.length}/500 characters
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Period Tracker App */}
                <div>
                  <label htmlFor="usesPeriodTracker" className="block mb-2 text-gray-700">
                    Do you use a period tracker app?
                  </label>
                  <select
                    id="usesPeriodTracker"
                    name="usesPeriodTracker"
                    value={formData.usesPeriodTracker}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.usesPeriodTracker === 'yes' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-3 text-gray-700">
                        What one? (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          'Flo',
                          'Clue',
                          'Period Tracker by GP Apps',
                          'Eve by Glow',
                          'My Calendar',
                          'Ovia',
                          'Natural Cycles',
                          'Other'
                        ].map((app) => (
                          <label key={app} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.periodTrackerApps.includes(app)}
                              onChange={() => handleCheckboxChange('periodTrackerApps', app)}
                              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-600"
                            />
                            <span className="text-gray-700">{app}</span>
                          </label>
                        ))}
                      </div>
                      {formData.periodTrackerApps.includes('Other') && (
                        <div className="ml-4">
                          <input
                            type="text"
                            name="periodTrackerOther"
                            value={formData.periodTrackerOther}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            placeholder="Please specify other period tracker app"
                          />
                        </div>
                      )}
                    </div>

                    {formData.periodTrackerApps.length > 0 && (
                      <>
                        <div>
                          <label htmlFor="periodTrackerLikes" className="block mb-2 text-gray-700">
                            What do you like about the apps you use?
                          </label>
                          <textarea
                            id="periodTrackerLikes"
                            name="periodTrackerLikes"
                            value={formData.periodTrackerLikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you like about the period tracker apps..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.periodTrackerLikes.length}/500 characters
                          </p>
                        </div>

                        <div>
                          <label htmlFor="periodTrackerDislikes" className="block mb-2 text-gray-700">
                            What do you dislike about the apps you use?
                          </label>
                          <textarea
                            id="periodTrackerDislikes"
                            name="periodTrackerDislikes"
                            value={formData.periodTrackerDislikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you dislike about the period tracker apps..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.periodTrackerDislikes.length}/500 characters
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Nutrition/Weight Management App */}
                <div>
                  <label htmlFor="usesNutritionApp" className="block mb-2 text-gray-700">
                    Do you use a nutrition/weight management app?
                  </label>
                  <select
                    id="usesNutritionApp"
                    name="usesNutritionApp"
                    value={formData.usesNutritionApp}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.usesNutritionApp === 'yes' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-3 text-gray-700">
                        Which one(s)? (Select all that apply)
                      </label>
                      <div className="space-y-2">
                        {[
                          'MyFitnessPal',
                          'Lose It!',
                          'Noom',
                          'WW (Weight Watchers)',
                          'Cronometer',
                          'Lifesum',
                          'Yazio',
                          'Other'
                        ].map((app) => (
                          <label key={app} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.nutritionApps.includes(app)}
                              onChange={() => handleCheckboxChange('nutritionApps', app)}
                              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-600"
                            />
                            <span className="text-gray-700">{app}</span>
                          </label>
                        ))}
                      </div>
                      {formData.nutritionApps.includes('Other') && (
                        <div className="ml-4">
                          <input
                            type="text"
                            name="nutritionAppOther"
                            value={formData.nutritionAppOther}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            placeholder="Please specify other nutrition/weight management app"
                          />
                        </div>
                      )}
                    </div>

                    {formData.nutritionApps.length > 0 && (
                      <>
                        <div>
                          <label htmlFor="nutritionAppLikes" className="block mb-2 text-gray-700">
                            What do you like about the apps you use?
                          </label>
                          <textarea
                            id="nutritionAppLikes"
                            name="nutritionAppLikes"
                            value={formData.nutritionAppLikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you like about the nutrition/weight management apps..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.nutritionAppLikes.length}/500 characters
                          </p>
                        </div>

                        <div>
                          <label htmlFor="nutritionAppDislikes" className="block mb-2 text-gray-700">
                            What do you dislike about the apps you use?
                          </label>
                          <textarea
                            id="nutritionAppDislikes"
                            name="nutritionAppDislikes"
                            value={formData.nutritionAppDislikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you dislike about the nutrition/weight management apps..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.nutritionAppDislikes.length}/500 characters
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* PCOS Specific App */}
                <div>
                  <label htmlFor="usesPCOSApp" className="block mb-2 text-gray-700">
                    Do you use a PCOS specific app?
                  </label>
                  <select
                    id="usesPCOSApp"
                    name="usesPCOSApp"
                    value={formData.usesPCOSApp}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.usesPCOSApp === 'yes' && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="pcosAppName" className="block mb-2 text-gray-700">
                        What one?
                      </label>
                      <input
                        type="text"
                        id="pcosAppName"
                        name="pcosAppName"
                        value={formData.pcosAppName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        placeholder="Please specify the PCOS app name"
                      />
                    </div>

                    {formData.pcosAppName && (
                      <>
                        <div>
                          <label htmlFor="pcosAppLikes" className="block mb-2 text-gray-700">
                            What do you like about the apps you use?
                          </label>
                          <textarea
                            id="pcosAppLikes"
                            name="pcosAppLikes"
                            value={formData.pcosAppLikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you like about the PCOS apps..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.pcosAppLikes.length}/500 characters
                          </p>
                        </div>

                        <div>
                          <label htmlFor="pcosAppDislikes" className="block mb-2 text-gray-700">
                            What do you dislike about the apps you use?
                          </label>
                          <textarea
                            id="pcosAppDislikes"
                            name="pcosAppDislikes"
                            value={formData.pcosAppDislikes}
                            onChange={handleChange}
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                            placeholder="Please share what you dislike about the PCOS apps..."
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.pcosAppDislikes.length}/500 characters
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Medical History Section */}
            {currentSection === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 text-gray-700">
                    What treatments have you tried for PCOS? (Select all that apply)
                  </label>
                  <div className="space-y-2">
                    {[
                      'Birth control pills',
                      'Metformin',
                      'Spironolactone',
                      'Clomid/Clomiphene',
                      'Letrozole',
                      'Lifestyle changes (diet/exercise)',
                      'Supplements (e.g., Inositol)',
                      'Other hormonal medications',
                      'No treatment yet'
                    ].map((treatment) => (
                      <label key={treatment} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.previousTreatments.includes(treatment)}
                          onChange={() => handleCheckboxChange('previousTreatments', treatment)}
                          className="w-4 h-4 text-teal-600 rounded focus:ring-teal-600"
                        />
                        <span className="text-gray-700">{treatment}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="currentMedications" className="block mb-2 text-gray-700">
                    Current Medications (Please list)
                  </label>
                  <textarea
                    id="currentMedications"
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                    placeholder="List any medications you are currently taking..."
                  />
                </div>

                <div>
                  <label htmlFor="otherConditions" className="block mb-2 text-gray-700">
                    Other Health Conditions
                  </label>
                  <textarea
                    id="otherConditions"
                    name="otherConditions"
                    value={formData.otherConditions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                    placeholder="e.g., diabetes, thyroid issues, etc..."
                  />
                </div>

                <div>
                  <label htmlFor="familyHistory" className="block mb-2 text-gray-700">
                    Family History of PCOS or Related Conditions
                  </label>
                  <textarea
                    id="familyHistory"
                    name="familyHistory"
                    value={formData.familyHistory}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                    placeholder="Describe any family history..."
                  />
                </div>
              </div>
            )}

            {/* Lifestyle Factors Section */}
            {currentSection === 4 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="exerciseFrequency" className="block mb-2 text-gray-700">
                    How often do you exercise?
                  </label>
                  <select
                    id="exerciseFrequency"
                    name="exerciseFrequency"
                    value={formData.exerciseFrequency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="daily">Daily</option>
                    <option value="4-6-times">4-6 times per week</option>
                    <option value="2-3-times">2-3 times per week</option>
                    <option value="once">Once per week</option>
                    <option value="rarely">Rarely</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dietType" className="block mb-2 text-gray-700">
                    How would you describe your diet?
                  </label>
                  <select
                    id="dietType"
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="balanced">Balanced/Regular</option>
                    <option value="low-carb">Low-carb</option>
                    <option value="keto">Ketogenic</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-free</option>
                    <option value="no-specific">No specific diet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sleepHours" className="block mb-2 text-gray-700">
                    Average hours of sleep per night
                  </label>
                  <select
                    id="sleepHours"
                    name="sleepHours"
                    value={formData.sleepHours}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="less-than-5">Less than 5 hours</option>
                    <option value="5-6">5-6 hours</option>
                    <option value="7-8">7-8 hours</option>
                    <option value="more-than-8">More than 8 hours</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="stressLevel" className="block mb-2 text-gray-700">
                    How would you rate your overall stress level?
                  </label>
                  <select
                    id="stressLevel"
                    name="stressLevel"
                    value={formData.stressLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select...</option>
                    <option value="very-low">Very Low</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>
              </div>
            )}

            {/* Quality of Life Section */}
            {currentSection === 5 && (
              <div className="space-y-8">
                {/* Physical Well-being */}
                <div>
                  <label className="block mb-4 text-gray-700">
                    How would you rate your physical well-being?
                  </label>
                  <div className="flex justify-between items-center gap-3 max-w-2xl">
                    {[
                      { value: 'poor', emoji: '😢', label: 'Poor', color: 'red' },
                      { value: 'fair', emoji: '😕', label: 'Fair', color: 'orange' },
                      { value: 'good', emoji: '😐', label: 'Good', color: 'yellow' },
                      { value: 'very-good', emoji: '🙂', label: 'Very Good', color: 'lime' },
                      { value: 'excellent', emoji: '😄', label: 'Excellent', color: 'green' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, physicalWellbeing: option.value })}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          formData.physicalWellbeing === option.value
                            ? 'border-teal-600 bg-teal-50 shadow-lg scale-105'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <div className="text-sm text-gray-700">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emotional Well-being */}
                <div>
                  <label className="block mb-4 text-gray-700">
                    How would you rate your emotional well-being?
                  </label>
                  <div className="flex justify-between items-center gap-3 max-w-2xl">
                    {[
                      { value: 'poor', emoji: '😢', label: 'Poor', color: 'red' },
                      { value: 'fair', emoji: '😕', label: 'Fair', color: 'orange' },
                      { value: 'good', emoji: '😐', label: 'Good', color: 'yellow' },
                      { value: 'very-good', emoji: '🙂', label: 'Very Good', color: 'lime' },
                      { value: 'excellent', emoji: '😄', label: 'Excellent', color: 'green' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, emotionalWellbeing: option.value })}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          formData.emotionalWellbeing === option.value
                            ? 'border-teal-600 bg-teal-50 shadow-lg scale-105'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <div className="text-sm text-gray-700">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Impact */}
                <div>
                  <label className="block mb-4 text-gray-700">
                    How much does PCOS impact your social life?
                  </label>
                  <div className="flex justify-between items-center gap-3 max-w-2xl">
                    {[
                      { value: 'not-at-all', emoji: '😊', label: 'Not at all', color: 'green' },
                      { value: 'slightly', emoji: '🙂', label: 'Slightly', color: 'lime' },
                      { value: 'moderately', emoji: '😐', label: 'Moderately', color: 'yellow' },
                      { value: 'significantly', emoji: '😟', label: 'Significantly', color: 'orange' },
                      { value: 'severely', emoji: '😢', label: 'Severely', color: 'red' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, socialImpact: option.value })}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          formData.socialImpact === option.value
                            ? 'border-teal-600 bg-teal-50 shadow-lg scale-105'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <div className="text-sm text-gray-700">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information Section */}
            {currentSection === 6 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="additionalComments" className="block mb-2 text-gray-700">
                    Is there anything else you'd like to share about your PCOS experience?
                  </label>
                  <textarea
                    id="additionalComments"
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                    placeholder="Share any additional thoughts, experiences, or information that you feel is relevant to your PCOS journey..."
                  />
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-teal-900 mb-2">Thank You!</h3>
                      <p className="text-teal-800">
                        Your responses will contribute to important research on PCOS. By clicking "Submit Survey" below,
                        you confirm that all information provided is accurate to the best of your knowledge and you
                        consent to its use in research studies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={prevSection}
                disabled={currentSection === 0}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  currentSection === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Previous
              </button>

              <div className="text-gray-600">
                Step {currentSection + 1} of {sections.length}
              </div>

              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={nextSection}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Submit Survey
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Privacy Notice */}
        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <h3 className="mb-3">Privacy & Confidentiality</h3>
          <p className="text-gray-600 mb-3">
            All information collected in this survey is strictly confidential and will be used solely for research purposes.
            Your data will be anonymized and stored securely in compliance with data protection regulations.
          </p>
          <p className="text-gray-600">
            For questions about this survey or the research study, please contact our research team through the contact
            form on our website.
          </p>
        </div>
      </div>
    </div>
  );
}
