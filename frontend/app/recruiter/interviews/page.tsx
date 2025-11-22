'use client';

import { useState, useEffect } from 'react';
import { FaHandshake, FaCalendarAlt, FaClock, FaUser, FaVideo, FaPhone, FaMapMarkerAlt, FaFilter, FaSearch, FaEye, FaEdit, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { RecruiterLayout } from '@/components/layouts/RecruiterLayout';
import Link from 'next/link';

const RecruiterInterviewsPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Mock interviews data
  const interviewsData = [
    {
      id: 1,
      candidateName: "Alice Johnson",
      candidateAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      date: "2024-09-05",
      time: "10:00 AM",
      duration: "45 min",
      type: "video",
      status: "scheduled",
      interviewer: "John Smith",
      location: "Zoom Meeting",
      stage: "Technical Round",
      notes: "Focus on React and TypeScript experience"
    },
    {
      id: 2,
      candidateName: "Bob Chen",
      candidateAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      jobTitle: "Backend Engineer",
      company: "StartupXYZ",
      date: "2024-09-03",
      time: "2:30 PM",
      duration: "60 min",
      type: "phone",
      status: "completed",
      interviewer: "Sarah Davis",
      location: "Phone Call",
      stage: "HR Round",
      notes: "Initial screening completed successfully"
    },
    {
      id: 3,
      candidateName: "Carol Williams",
      candidateAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      jobTitle: "Full Stack Developer",
      company: "Digital Solutions",
      date: "2024-09-06",
      time: "11:30 AM",
      duration: "90 min",
      type: "in-person",
      status: "scheduled",
      interviewer: "Mike Johnson",
      location: "Office - Conference Room A",
      stage: "Final Round",
      notes: "System design and cultural fit assessment"
    },
    {
      id: 4,
      candidateName: "David Brown",
      candidateAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      jobTitle: "DevOps Engineer",
      company: "CloudTech",
      date: "2024-09-02",
      time: "3:00 PM",
      duration: "45 min",
      type: "video",
      status: "cancelled",
      interviewer: "Lisa Garcia",
      location: "Google Meet",
      stage: "Technical Round",
      notes: "Candidate rescheduled due to emergency"
    },
    {
      id: 5,
      candidateName: "Emma Wilson",
      candidateAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      jobTitle: "UI/UX Designer",
      company: "DesignStudio",
      date: "2024-09-04",
      time: "1:00 PM",
      duration: "60 min",
      type: "video",
      status: "completed",
      interviewer: "Alex Turner",
      location: "Teams Meeting",
      stage: "Portfolio Review",
      notes: "Excellent portfolio presentation"
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Interviews', count: interviewsData.length },
    { id: 'scheduled', label: 'Scheduled', count: interviewsData.filter(interview => interview.status === 'scheduled').length },
    { id: 'completed', label: 'Completed', count: interviewsData.filter(interview => interview.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: interviewsData.filter(interview => interview.status === 'cancelled').length }
  ];

  const filteredInterviews = interviewsData.filter(interview => {
    const matchesFilter = activeFilter === 'all' || interview.status === activeFilter;
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'completed':
        return theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800';
      case 'cancelled':
        return theme === 'dark' ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <FaVideo />;
      case 'phone':
        return <FaPhone />;
      case 'in-person':
        return <FaMapMarkerAlt />;
      default:
        return <FaHandshake />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return today.toDateString() === date.toDateString();
  };

  const isTomorrow = (dateString: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(dateString);
    return tomorrow.toDateString() === date.toDateString();
  };

  return (
    <RecruiterLayout
      sidebarActive="Interviews"
      topbarTitle="Interview Management"
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
              <h1 className="text-3xl font-bold mb-2">Interview Management</h1>
              <p className="text-indigo-100">Schedule, manage, and track all your candidate interviews</p>
            </div>
            <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}>
              <FaCalendarAlt />
              Schedule Interview
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`rounded-xl p-6 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Today's Interviews</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{interviewsData.filter(i => isToday(i.date)).length}</p>
              </div>
              <FaCalendarAlt className="text-3xl text-indigo-500" />
            </div>
          </div>
          <div className={`rounded-xl p-6 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>This Week</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{interviewsData.filter(i => i.status === 'scheduled').length}</p>
              </div>
              <FaClock className="text-3xl text-blue-500" />
            </div>
          </div>
          <div className={`rounded-xl p-6 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Completed</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{interviewsData.filter(i => i.status === 'completed').length}</p>
              </div>
              <FaCheckCircle className="text-3xl text-green-500" />
            </div>
          </div>
          <div className={`rounded-xl p-6 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Cancelled</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{interviewsData.filter(i => i.status === 'cancelled').length}</p>
              </div>
              <FaTimes className="text-3xl text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`rounded-xl p-6 shadow-lg ${
          theme === 'dark' 
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
            : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeFilter === option.id
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  {option.label}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === option.id 
                      ? 'bg-white/20' 
                      : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search interviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Interviews List */}
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className={`rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700' 
                : 'bg-white/80 backdrop-blur-sm border border-indigo-100 hover:border-indigo-200'
            } ${(isToday(interview.date) || isTomorrow(interview.date)) && interview.status === 'scheduled' ? 
              theme === 'dark' ? 'ring-2 ring-indigo-500/50' : 'ring-2 ring-indigo-300/50' : ''}`}>
              
              <div className="flex items-center space-x-6">
                {/* Candidate Avatar */}
                <img 
                  src={interview.candidateAvatar} 
                  alt={interview.candidateName}
                  className="w-16 h-16 rounded-full border-2 border-indigo-300"
                />

                {/* Interview Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{interview.candidateName}</h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>{interview.jobTitle} at {interview.company}</p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Interviewer: {interview.interviewer}</p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {formatDate(interview.date)}
                        {isToday(interview.date) && (
                          <span className="ml-1 text-indigo-500 font-medium">(Today)</span>
                        )}
                        {isTomorrow(interview.date) && (
                          <span className="ml-1 text-blue-500 font-medium">(Tomorrow)</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>{interview.time} ({interview.duration})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(interview.type)}
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>{interview.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm px-2 py-1 rounded ${
                        theme === 'dark' 
                          ? 'bg-purple-900/50 text-purple-300' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {interview.stage}
                      </span>
                    </div>
                  </div>

                  {interview.notes && (
                    <div className="mt-3">
                      <p className={`text-sm italic ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Notes: {interview.notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}>
                    <Link href={`/recruiter/interviews/${interview.id}`}>
                      <FaEye />
                    </Link>
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}>
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInterviews.length === 0 && (
          <div className={`rounded-xl p-12 text-center ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-indigo-100'
          }`}>
            <FaHandshake className={`text-6xl mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>No interviews found</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterInterviewsPage;
