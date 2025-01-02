'use client';

import { useState, useEffect } from 'react';
import { FaHeadset, FaQuestion, FaBook, FaPhone, FaEnvelope, FaSearch, FaChevronRight, FaTicketAlt, FaLifeRing, FaComments } from 'react-icons/fa';
import { RecruiterLayout } from '@/components/layouts/RecruiterLayout';

const RecruiterSupportPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const supportCategories = [
    { id: 'all', label: 'All Topics', icon: FaLifeRing },
    { id: 'getting-started', label: 'Getting Started', icon: FaBook },
    { id: 'job-posting', label: 'Job Posting', icon: FaTicketAlt },
    { id: 'candidate-management', label: 'Candidates', icon: FaComments },
    { id: 'billing', label: 'Billing', icon: FaEnvelope }
  ];

  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first job posting?',
      answer: 'To create your first job posting, navigate to the Jobs section and click the "Post New Job" button. Fill in the required details such as job title, description, requirements, and salary range.',
      helpful: 23,
      tags: ['jobs', 'posting', 'beginner']
    },
    {
      id: 2,
      category: 'job-posting',
      question: 'Can I edit a job posting after it\'s published?',
      answer: 'Yes, you can edit job postings at any time. Go to the Jobs section, find your job posting, and click the edit button. Changes will be reflected immediately.',
      helpful: 18,
      tags: ['jobs', 'editing', 'management']
    },
    {
      id: 3,
      category: 'candidate-management',
      question: 'How do I filter and search through candidate applications?',
      answer: 'In the candidate dashboard, use the filter options to sort by skills, experience, rating, or application date. You can also use the search bar to find specific candidates by name or skill.',
      helpful: 31,
      tags: ['candidates', 'search', 'filtering']
    },
    {
      id: 4,
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts.',
      helpful: 12,
      tags: ['payment', 'billing', 'methods']
    },
    {
      id: 5,
      category: 'candidate-management',
      question: 'How do I schedule interviews with candidates?',
      answer: 'Click on a candidate\'s profile and select "Schedule Interview". Choose your preferred time slot and the system will send calendar invitations to both parties.',
      helpful: 27,
      tags: ['interviews', 'scheduling', 'candidates']
    },
    {
      id: 6,
      category: 'job-posting',
      question: 'How long do job postings stay active?',
      answer: 'Job postings remain active for 30 days by default. You can extend this period or set custom expiration dates when creating the posting.',
      helpful: 15,
      tags: ['jobs', 'duration', 'expiration']
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: FaComments,
      action: 'Start Chat',
      available: true,
      responseTime: 'Usually responds in 2-3 minutes'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: FaEnvelope,
      action: 'Send Email',
      available: true,
      responseTime: 'Usually responds within 24 hours'
    },
    {
      title: 'Phone Support',
      description: 'Call our support line',
      icon: FaPhone,
      action: 'Call Now',
      available: false,
      responseTime: 'Available Mon-Fri, 9AM-6PM EST'
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <RecruiterLayout
      sidebarActive="Support"
      topbarTitle="Support Center"
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-8 relative z-10">
        {/* Header */}
        <div className={`rounded-xl p-8 text-white ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          <div className="text-center">
            <FaHeadset className="text-6xl mx-auto mb-4 opacity-90" />
            <h1 className="text-3xl font-bold mb-2">Support Center</h1>
            <p className="text-purple-100">Get help with your recruiting needs. We're here to assist you!</p>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <div key={index} className={`rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
                : 'bg-white/80 backdrop-blur-sm border border-purple-100'
            }`}>
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  option.available 
                    ? 'bg-purple-500 text-white' 
                    : theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                }`}>
                  <option.icon className="text-2xl" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{option.title}</h3>
                <p className={`text-sm mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{option.description}</p>
                <p className={`text-xs mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>{option.responseTime}</p>
                <button 
                  disabled={!option.available}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                    option.available
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : theme === 'dark' 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {option.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className={`rounded-xl shadow-lg ${
          theme === 'dark' 
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
            : 'bg-white/80 backdrop-blur-sm border border-purple-100'
        }`}>
          <div className={`border-b p-6 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Frequently Asked Questions</h3>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  <category.icon className="text-sm" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className={`rounded-lg border p-4 ${
                    theme === 'dark' 
                      ? 'border-gray-700 bg-gray-800/50' 
                      : 'border-purple-100 bg-purple-50/50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{faq.question}</h4>
                        <p className={`text-sm mb-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag, index) => (
                              <span key={index} className={`text-xs px-2 py-1 rounded ${
                                theme === 'dark' 
                                  ? 'bg-purple-900/50 text-purple-300' 
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className={`text-xs ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {faq.helpful} people found this helpful
                          </span>
                        </div>
                      </div>
                      <FaChevronRight className={`text-sm ml-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaQuestion className={`text-6xl mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>No FAQs found</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Try adjusting your search terms or category filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Resources */}
        <div className={`rounded-xl p-6 shadow-lg ${
          theme === 'dark' 
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
            : 'bg-white/80 backdrop-blur-sm border border-purple-100'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-purple-100 bg-purple-50/50'
            }`}>
              <FaBook className="text-2xl text-purple-500 mb-2" />
              <h4 className={`font-semibold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>User Guide</h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Comprehensive documentation and tutorials</p>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-purple-100 bg-purple-50/50'
            }`}>
              <FaTicketAlt className="text-2xl text-purple-500 mb-2" />
              <h4 className={`font-semibold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Submit Ticket</h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Get personalized help for complex issues</p>
            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterSupportPage;
