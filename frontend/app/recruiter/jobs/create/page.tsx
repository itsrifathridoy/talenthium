'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaPlus, FaTrash, FaEye, FaSave, FaArrowLeft, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaClock, FaBuilding, FaUsers, FaFileAlt, FaQuestionCircle, FaCheck } from 'react-icons/fa';
import { RecruiterLayout } from '@/components/layouts/RecruiterLayout';
import Link from 'next/link';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no';
  required: boolean;
  options?: string[];
}

interface InterviewRound {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

const CreateJobPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('basic');
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    remote: 'Remote',
    experience: '1-3 Years',
    salary: '',
    period: 'Monthly',
    description: '',
    skills: [] as string[],
    qualification: [] as string[],
    responsibility: [] as string[],
    benefits: [] as string[],
    department: '',
    employmentType: 'Full-time',
    workHours: '40 hours/week',
    applicationDeadline: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [interviewRounds, setInterviewRounds] = useState<InterviewRound[]>([
    {
      id: '1',
      name: 'Initial Screening',
      description: 'Basic questions to assess candidate fit',
      questions: [
        {
          id: '1',
          text: 'Why are you interested in this position?',
          type: 'text',
          required: true
        },
        {
          id: '2',
          text: 'What is your expected salary range?',
          type: 'text',
          required: true
        }
      ]
    }
  ]);

  const [newSkill, setNewSkill] = useState('');
  const [newQualification, setNewQualification] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Read initial tab from query params
  // Supports URLs like: /recruiter/jobs/create?tab=description
  useEffect(() => {
    const tabParam = searchParams?.get('tab');
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Handle tab changes and update URL
  // This allows bookmarking specific tabs and sharing direct links
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Update URL with new tab
    const newSearchParams = new URLSearchParams(searchParams?.toString() || '');
    newSearchParams.set('tab', tabId);
    router.replace(`/recruiter/jobs/create?${newSearchParams.toString()}`, { scroll: false });
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FaBriefcase },
    { id: 'description', label: 'Description', icon: FaFileAlt },
    { id: 'requirements', label: 'Requirements', icon: FaUsers },
    { id: 'questions', label: 'Interview Questions', icon: FaQuestionCircle },
    { id: 'preview', label: 'Preview', icon: FaEye }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !jobData.skills.includes(newSkill.trim())) {
      setJobData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      setJobData(prev => ({
        ...prev,
        qualification: [...prev.qualification, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const removeQualification = (index: number) => {
    setJobData(prev => ({
      ...prev,
      qualification: prev.qualification.filter((_, i) => i !== index)
    }));
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setJobData(prev => ({
        ...prev,
        responsibility: [...prev.responsibility, newResponsibility.trim()]
      }));
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    setJobData(prev => ({
      ...prev,
      responsibility: prev.responsibility.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setJobData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setJobData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addInterviewRound = () => {
    const newRound: InterviewRound = {
      id: Date.now().toString(),
      name: `Round ${interviewRounds.length + 1}`,
      description: '',
      questions: []
    };
    setInterviewRounds(prev => [...prev, newRound]);
  };

  const removeInterviewRound = (roundId: string) => {
    setInterviewRounds(prev => prev.filter(round => round.id !== roundId));
  };

  const addQuestion = (roundId: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'text',
      required: false
    };
    setInterviewRounds(prev => prev.map(round =>
      round.id === roundId
        ? { ...round, questions: [...round.questions, newQuestion] }
        : round
    ));
  };

  const removeQuestion = (roundId: string, questionId: string) => {
    setInterviewRounds(prev => prev.map(round =>
      round.id === roundId
        ? { ...round, questions: round.questions.filter(q => q.id !== questionId) }
        : round
    ));
  };

  const updateQuestion = (roundId: string, questionId: string, updates: Partial<Question>) => {
    setInterviewRounds(prev => prev.map(round =>
      round.id === roundId
        ? {
            ...round,
            questions: round.questions.map(q =>
              q.id === questionId ? { ...q, ...updates } : q
            )
          }
        : round
    ));
  };

  const updateRound = (roundId: string, updates: Partial<InterviewRound>) => {
    setInterviewRounds(prev => prev.map(round =>
      round.id === roundId ? { ...round, ...updates } : round
    ));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving job:', { jobData, interviewRounds });
    alert('Job posting saved successfully!');
  };

  const TabButton = ({ tab, active, onClick }: { tab: typeof tabs[0]; active: boolean; onClick: (id: string) => void }) => (
    <button
      onClick={() => onClick(tab.id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        active
          ? 'bg-indigo-500 text-white shadow-lg'
          : theme === 'dark'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
      }`}
    >
      <tab.icon className="text-sm" />
      {tab.label}
    </button>
  );

  return (
    <RecruiterLayout
      sidebarActive="Jobs"
      topbarTitle="Create New Job Posting"
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-8 relative z-10">
        {/* Header */}
        <div className={`rounded-xl p-8 text-white ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Create New Job Posting</h1>
              <p className="text-indigo-100">Fill in the details to create an attractive job posting</p>
            </div>
            <div className="flex gap-3">
              <Link href="/recruiter/jobs">
                <button className="px-4 py-2 rounded-lg font-medium bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                  <FaArrowLeft />
                  Back to Jobs
                </button>
              </Link>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg font-medium bg-white text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-2"
              >
                <FaSave />
                Save Job
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`rounded-xl p-6 shadow-lg ${
          theme === 'dark'
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
            : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
        }`}>
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                active={activeTab === tab.id}
                onClick={handleTabChange}
              />
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`rounded-xl shadow-lg ${
          theme === 'dark'
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
            : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
        }`}>
          <div className="p-8">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Job Title *</label>
                    <input
                      type="text"
                      value={jobData.title}
                      onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Company *</label>
                    <input
                      type="text"
                      value={jobData.company}
                      onChange={(e) => setJobData(prev => ({ ...prev, company: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g. TechCorp Inc."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Location *</label>
                    <input
                      type="text"
                      value={jobData.location}
                      onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g. San Francisco, CA or Remote"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Department</label>
                    <input
                      type="text"
                      value={jobData.department}
                      onChange={(e) => setJobData(prev => ({ ...prev, department: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g. Engineering, Product, etc."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Employment Type *</label>
                    <select
                      value={jobData.type}
                      onChange={(e) => setJobData(prev => ({ ...prev, type: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Remote Work *</label>
                    <select
                      value={jobData.remote}
                      onChange={(e) => setJobData(prev => ({ ...prev, remote: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Experience Level *</label>
                    <select
                      value={jobData.experience}
                      onChange={(e) => setJobData(prev => ({ ...prev, experience: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5-8 Years">5-8 Years</option>
                      <option value="8+ Years">8+ Years</option>
                      <option value="Fresh Graduate">Fresh Graduate</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Work Hours</label>
                    <input
                      type="text"
                      value={jobData.workHours}
                      onChange={(e) => setJobData(prev => ({ ...prev, workHours: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g. 40 hours/week"
                    />
                  </div>

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>Salary</label>
                      <input
                        type="text"
                        value={jobData.salary}
                        onChange={(e) => setJobData(prev => ({ ...prev, salary: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="e.g. $50,000"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>Period</label>
                      <select
                        value={jobData.period}
                        onChange={(e) => setJobData(prev => ({ ...prev, period: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="Hourly">Hourly</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>Application Deadline</label>
                      <input
                        type="date"
                        value={jobData.applicationDeadline}
                        onChange={(e) => setJobData(prev => ({ ...prev, applicationDeadline: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Job Description</h2>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Description (Markdown supported) *</label>
                  <textarea
                    value={jobData.description}
                    onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                    rows={12}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder={`# Job Description

We are looking for a talented **Senior Frontend Developer** to join our growing team.

## What You'll Do:
- Build responsive web applications using React
- Collaborate with designers and backend developers
- Write clean, maintainable code

## Requirements:
- 3+ years of React experience
- Strong JavaScript/TypeScript skills
- Experience with modern frontend tools

## What We Offer:
- Competitive salary and benefits
- Remote work flexibility
- Professional development opportunities`}
                  />
                </div>

                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-indigo-50'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Markdown Preview</h3>
                  <div className={`prose prose-sm max-w-none ${
                    theme === 'dark' ? 'prose-invert' : ''
                  }`}>
                    <div dangerouslySetInnerHTML={{
                      __html: jobData.description
                        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                        .replace(/\*(.*)\*/gim, '<em>$1</em>')
                        .replace(/`(.*)`/gim, '<code>$1</code>')
                        .replace(/\n\n/gim, '</p><p>')
                        .replace(/\n/gim, '<br>')
                    }} />
                  </div>
                </div>
              </div>
            )}

            {/* Requirements Tab */}
            {activeTab === 'requirements' && (
              <div className="space-y-8">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Requirements & Benefits</h2>

                {/* Skills */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {jobData.skills.map((skill, index) => (
                      <span key={index} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                        theme === 'dark' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-500"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Add a skill (e.g. React, Python)"
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Qualifications</h3>
                  <div className="space-y-2 mb-4">
                    {jobData.qualification.map((qual, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                      }`}>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'
                        }`}></div>
                        <span className={`flex-1 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>{qual}</span>
                        <button
                          onClick={() => removeQualification(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addQualification()}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Add a qualification requirement"
                    />
                    <button
                      onClick={addQualification}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Responsibilities</h3>
                  <div className="space-y-2 mb-4">
                    {jobData.responsibility.map((resp, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                      }`}>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'
                        }`}></div>
                        <span className={`flex-1 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>{resp}</span>
                        <button
                          onClick={() => removeResponsibility(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addResponsibility()}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Add a job responsibility"
                    />
                    <button
                      onClick={addResponsibility}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Benefits</h3>
                  <div className="space-y-2 mb-4">
                    {jobData.benefits.map((benefit, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                      }`}>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                        }`}></div>
                        <span className={`flex-1 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>{benefit}</span>
                        <button
                          onClick={() => removeBenefit(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Add a benefit (e.g. Health insurance, Remote work)"
                    />
                    <button
                      onClick={addBenefit}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Interview Questions</h2>
                  <button
                    onClick={addInterviewRound}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
                  >
                    <FaPlus />
                    Add Round
                  </button>
                </div>

                <div className="space-y-6">
                  {interviewRounds.map((round, roundIndex) => (
                    <div key={round.id} className={`p-6 rounded-xl border ${
                      theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 mr-4">
                          <input
                            type="text"
                            value={round.name}
                            onChange={(e) => updateRound(round.id, { name: e.target.value })}
                            className={`w-full text-lg font-semibold bg-transparent border-none outline-none ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}
                            placeholder="Round name"
                          />
                          <textarea
                            value={round.description}
                            onChange={(e) => updateRound(round.id, { description: e.target.value })}
                            className={`w-full mt-2 bg-transparent border-none outline-none resize-none ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}
                            placeholder="Round description"
                            rows={2}
                          />
                        </div>
                        <button
                          onClick={() => removeInterviewRound(round.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {round.questions.map((question, questionIndex) => (
                          <div key={question.id} className={`p-4 rounded-lg border ${
                            theme === 'dark' ? 'bg-gray-900/50 border-gray-600' : 'bg-white border-gray-300'
                          }`}>
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1 mr-4">
                                <textarea
                                  value={question.text}
                                  onChange={(e) => updateQuestion(round.id, question.id, { text: e.target.value })}
                                  className={`w-full bg-transparent border-none outline-none resize-none ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                  }`}
                                  placeholder="Enter your question here..."
                                  rows={2}
                                />
                              </div>
                              <button
                                onClick={() => removeQuestion(round.id, question.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <select
                                value={question.type}
                                onChange={(e) => updateQuestion(round.id, question.id, { type: e.target.value as Question['type'] })}
                                className={`px-3 py-1 rounded border text-sm ${
                                  theme === 'dark'
                                    ? 'bg-gray-800 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                              >
                                <option value="text">Text Answer</option>
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="rating">Rating (1-5)</option>
                                <option value="yes-no">Yes/No</option>
                              </select>

                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={question.required}
                                  onChange={(e) => updateQuestion(round.id, question.id, { required: e.target.checked })}
                                  className="rounded"
                                />
                                <span className={`text-sm ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>Required</span>
                              </label>
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => addQuestion(round.id)}
                          className={`w-full py-2 px-4 rounded-lg border-2 border-dashed transition-colors flex items-center justify-center gap-2 ${
                            theme === 'dark'
                              ? 'border-gray-600 text-gray-400 hover:border-indigo-500 hover:text-indigo-400'
                              : 'border-gray-300 text-gray-500 hover:border-indigo-500 hover:text-indigo-600'
                          }`}
                        >
                          <FaPlus />
                          Add Question
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Job Posting Preview</h2>

                <div className={`p-8 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  {/* Job Header Preview */}
                  <div className="mb-6">
                    <h1 className={`text-3xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{jobData.title || 'Job Title'}</h1>
                    <p className={`text-xl mb-4 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>{jobData.company || 'Company Name'}</p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                      }`}>{jobData.type}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}>{jobData.remote}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'
                      }`}>{jobData.experience}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className={`flex items-center gap-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <FaMapMarkerAlt />
                        {jobData.location || 'Location'}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <FaDollarSign />
                        {jobData.salary || 'Salary'} {jobData.period.toLowerCase()}
                      </span>
                    </div>
                  </div>

                  {/* Description Preview */}
                  {jobData.description && (
                    <div className="mb-6">
                      <h2 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Job Description</h2>
                      <div className={`prose max-w-none ${
                        theme === 'dark' ? 'prose-invert' : ''
                      }`}>
                        <div dangerouslySetInnerHTML={{
                          __html: jobData.description
                            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                            .replace(/\*(.*)\*/gim, '<em>$1</em>')
                            .replace(/`(.*)`/gim, '<code>$1</code>')
                            .replace(/\n\n/gim, '</p><p>')
                            .replace(/\n/gim, '<br>')
                        }} />
                      </div>
                    </div>
                  )}

                  {/* Skills Preview */}
                  {jobData.skills.length > 0 && (
                    <div className="mb-6">
                      <h2 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Required Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {jobData.skills.map((skill, index) => (
                          <span key={index} className={`px-3 py-1 rounded-full text-sm ${
                            theme === 'dark' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Qualifications Preview */}
                  {jobData.qualification.length > 0 && (
                    <div className="mb-6">
                      <h2 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Qualifications</h2>
                      <ul className="space-y-2">
                        {jobData.qualification.map((qual, index) => (
                          <li key={index} className={`flex items-start gap-3 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'
                            }`}></div>
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Responsibilities Preview */}
                  {jobData.responsibility.length > 0 && (
                    <div className="mb-6">
                      <h2 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Responsibilities</h2>
                      <ul className="space-y-2">
                        {jobData.responsibility.map((resp, index) => (
                          <li key={index} className={`flex items-start gap-3 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'
                            }`}></div>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits Preview */}
                  {jobData.benefits.length > 0 && (
                    <div className="mb-6">
                      <h2 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Benefits</h2>
                      <ul className="space-y-2">
                        {jobData.benefits.map((benefit, index) => (
                          <li key={index} className={`flex items-start gap-3 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                            }`}></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interview Rounds Preview */}
                  {interviewRounds.length > 0 && (
                    <div className="mb-6">
                      <h2 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Interview Process</h2>
                      <div className="space-y-4">
                        {interviewRounds.map((round, index) => (
                          <div key={round.id} className={`p-4 rounded-lg border ${
                            theme === 'dark' ? 'bg-gray-800/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                          }`}>
                            <h3 className={`font-semibold mb-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{round.name}</h3>
                            {round.description && (
                              <p className={`text-sm mb-3 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}>{round.description}</p>
                            )}
                            <div className="space-y-2">
                              {round.questions.map((question, qIndex) => (
                                <div key={question.id} className={`p-3 rounded border ${
                                  theme === 'dark' ? 'bg-gray-900/50 border-gray-700' : 'bg-white border-gray-300'
                                }`}>
                                  <p className={`text-sm ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                  }`}>
                                    {qIndex + 1}. {question.text}
                                    {question.required && <span className="text-red-500 ml-1">*</span>}
                                  </p>
                                  <p className={`text-xs mt-1 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                  }`}>
                                    Type: {question.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default CreateJobPage;
