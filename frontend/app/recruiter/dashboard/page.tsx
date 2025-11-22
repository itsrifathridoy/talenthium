'use client';

import { useState, useEffect } from 'react';
import { FaBriefcase, FaUsers, FaEye, FaCheckCircle, FaClock, FaStar, FaCalendarAlt, FaUserTie, FaBuilding, FaArrowUp } from 'react-icons/fa';
import { RecruiterLayout } from '@/components/layouts/RecruiterLayout';

const RecruiterDashboard = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Mock recruiter data
  const recruiterData = {
    stats: [
      { label: "Active Jobs", value: "12", icon: FaBriefcase, color: "text-blue-500", trend: "+3 this week" },
      { label: "Total Applications", value: "234", icon: FaUsers, color: "text-green-500", trend: "+45 this week" },
      { label: "Interview Scheduled", value: "18", icon: FaCalendarAlt, color: "text-purple-500", trend: "+8 this week" },
      { label: "Hired Candidates", value: "7", icon: FaCheckCircle, color: "text-emerald-500", trend: "+2 this month" }
    ],
    recentJobs: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote",
        applications: 23,
        status: "Active",
        postedDate: "2 days ago",
        urgent: true
      },
      {
        id: 2,
        title: "Backend Engineer",
        company: "StartupXYZ",
        location: "San Francisco, CA",
        applications: 15,
        status: "Active",
        postedDate: "5 days ago",
        urgent: false
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "Digital Solutions",
        location: "New York, NY",
        applications: 31,
        status: "Closed",
        postedDate: "1 week ago",
        urgent: false
      }
    ],
    topCandidates: [
      {
        id: 1,
        name: "Alice Johnson",
        position: "Frontend Developer",
        rating: 4.8,
        experience: "5 years",
        skills: ["React", "TypeScript", "Node.js"],
        status: "Available",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop"
      },
      {
        id: 2,
        name: "Bob Smith",
        position: "Backend Engineer",
        rating: 4.9,
        experience: "7 years",
        skills: ["Python", "Django", "PostgreSQL"],
        status: "Interviewing",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
      },
      {
        id: 3,
        name: "Carol Davis",
        position: "Full Stack Developer",
        rating: 4.7,
        experience: "4 years",
        skills: ["JavaScript", "React", "Express"],
        status: "Available",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
      }
    ],
    recentActivity: [
      { type: "application", message: "New application for Senior Frontend Developer", time: "5 minutes ago" },
      { type: "interview", message: "Interview scheduled with Alice Johnson", time: "1 hour ago" },
      { type: "hire", message: "Successfully hired Bob Smith for Backend Engineer role", time: "3 hours ago" },
      { type: "job", message: "Posted new job: UI/UX Designer", time: "1 day ago" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800';
      case 'closed':
        return theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-800';
      case 'available':
        return theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'interviewing':
        return theme === 'dark' ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800';
      default:
        return theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <RecruiterLayout
      sidebarActive="Home"
      topbarTitle="Recruiter Dashboard"
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-8 relative z-10">
        {/* Welcome Header */}
        <div className={`rounded-xl p-8 text-white ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-500'
        }`}>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Recruiter!</h1>
          <p className="text-emerald-100">Manage your job postings, review candidates, and build amazing teams</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recruiterData.stats.map((stat, index) => (
            <div key={index} className={`rounded-xl p-6 shadow-lg ${
              theme === 'dark' 
                ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
                : 'bg-white/80 backdrop-blur-sm border border-emerald-100'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{stat.label}</p>
                  <p className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{stat.value}</p>
                  <p className={`text-xs flex items-center mt-1 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    <FaArrowUp className="mr-1" />
                    {stat.trend}
                  </p>
                </div>
                <stat.icon className={`text-3xl ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Jobs */}
          <div className={`rounded-xl shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-emerald-100'
          }`}>
            <div className={`border-b p-6 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Recent Job Postings</h3>
            </div>
            <div className="p-6 space-y-4">
              {recruiterData.recentJobs.map((job) => (
                <div key={job.id} className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-emerald-100 bg-emerald-50/50'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{job.title}</h4>
                        {job.urgent && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Urgent</span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>{job.company} • {job.location}</p>
                      <p className={`text-xs mt-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Posted {job.postedDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>{job.applications} applications</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className={`w-full mt-4 py-2 px-4 rounded-lg border-2 border-dashed transition-colors ${
                theme === 'dark' 
                  ? 'border-gray-600 text-gray-400 hover:border-emerald-500 hover:text-emerald-400' 
                  : 'border-gray-300 text-gray-500 hover:border-emerald-500 hover:text-emerald-600'
              }`}>
                View All Jobs
              </button>
            </div>
          </div>

          {/* Top Candidates */}
          <div className={`rounded-xl shadow-lg ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-emerald-100'
          }`}>
            <div className={`border-b p-6 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Top Candidates</h3>
            </div>
            <div className="p-6 space-y-4">
              {recruiterData.topCandidates.map((candidate) => (
                <div key={candidate.id} className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-emerald-100 bg-emerald-50/50'
                }`}>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={candidate.avatar} 
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full border-2 border-emerald-300"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{candidate.name}</h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>{candidate.position} • {candidate.experience}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(Math.floor(candidate.rating))}
                        <span className={`text-sm ml-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{candidate.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className={`text-xs px-2 py-1 rounded ${
                          theme === 'dark' 
                            ? 'bg-emerald-900/50 text-emerald-300' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-xl shadow-lg ${
          theme === 'dark' 
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
            : 'bg-white/80 backdrop-blur-sm border border-emerald-100'
        }`}>
          <div className={`border-b p-6 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recruiterData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'application' ? 'bg-blue-500' :
                    activity.type === 'interview' ? 'bg-purple-500' :
                    activity.type === 'hire' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className={`${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{activity.message}</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterDashboard;
