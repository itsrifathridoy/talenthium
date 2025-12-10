'use client';

import { useState, useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaEye, FaEdit, FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import { RecruiterLayout } from '@/components/layouts/RecruiterLayout';
import Link from 'next/link';

const RecruiterJobsPage = () => {
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

  // Mock jobs data
  const jobsData = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $120k",
      applications: 23,
      status: "Active",
      postedDate: "2024-01-15",
      description: "We're looking for an experienced Frontend Developer to join our growing team...",
      requirements: ["React", "TypeScript", "5+ years experience"],
      urgent: true
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100k - $140k",
      applications: 15,
      status: "Active",
      postedDate: "2024-01-12",
      description: "Join our backend team to build scalable microservices...",
      requirements: ["Node.js", "Python", "AWS", "3+ years experience"],
      urgent: false
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Digital Solutions",
      location: "New York, NY",
      type: "Contract",
      salary: "$80k - $110k",
      applications: 31,
      status: "Closed",
      postedDate: "2024-01-08",
      description: "We need a versatile developer for various web projects...",
      requirements: ["JavaScript", "React", "Node.js", "MongoDB"],
      urgent: false
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$95k - $130k",
      applications: 8,
      status: "Active",
      postedDate: "2024-01-18",
      description: "Help us scale our infrastructure and deployment processes...",
      requirements: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      urgent: false
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Los Angeles, CA",
      type: "Part-time",
      salary: "$60k - $80k",
      applications: 12,
      status: "Draft",
      postedDate: "2024-01-20",
      description: "Create beautiful and intuitive user experiences...",
      requirements: ["Figma", "Adobe XD", "User Research", "3+ years experience"],
      urgent: false
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Jobs', count: jobsData.length },
    { id: 'active', label: 'Active', count: jobsData.filter(job => job.status === 'Active').length },
    { id: 'draft', label: 'Draft', count: jobsData.filter(job => job.status === 'Draft').length },
    { id: 'closed', label: 'Closed', count: jobsData.filter(job => job.status === 'Closed').length }
  ];

  const filteredJobs = jobsData.filter(job => {
    const matchesFilter = activeFilter === 'all' || job.status.toLowerCase() === activeFilter;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800';
      case 'closed':
        return theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-800';
      case 'draft':
        return theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      default:
        return theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  return (
    <RecruiterLayout
      sidebarActive="Jobs"
      topbarTitle="Job Management"
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-8 relative z-10">
        {/* Header */}
        <div className={`rounded-xl p-8 text-white ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Job Management</h1>
              <p className="text-blue-100">Create, manage, and track your job postings</p>
            </div>
            <Link href="/recruiter/jobs/create">
              <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                'bg-white text-blue-600 hover:bg-blue-50'
              }`}>
                <FaPlus />
                Create Job
              </button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`rounded-xl p-6 shadow-lg ${
          theme === 'dark' 
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
            : 'bg-white/80 backdrop-blur-sm border border-blue-100'
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
                      ? 'bg-blue-500 text-white shadow-lg'
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
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className={`rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700' 
                : 'bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-200'
            }`}>
              {/* Job Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/recruiter/jobs/${job.id}`}
                      className={`text-lg font-semibold hover:underline ${
                        theme === 'dark' ? 'text-white hover:text-[#13ff8c]' : 'text-gray-900 hover:text-emerald-600'
                      }`}
                    >
                      {job.title}
                    </Link>
                    {job.urgent && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Urgent</span>
                    )}
                  </div>
                  <p className={`text-sm flex items-center gap-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FaBriefcase className="text-xs" />
                    {job.company}
                  </p>
                  <p className={`text-sm flex items-center gap-1 mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <FaMapMarkerAlt className="text-xs" />
                    {job.location} • {job.type}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>{job.salary}</span>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Posted {formatDate(job.postedDate)}</span>
                </div>

                <p className={`text-sm line-clamp-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{job.description}</p>

                {/* Requirements */}
                <div className="flex flex-wrap gap-1">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className={`text-xs px-2 py-1 rounded ${
                      theme === 'dark' 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className={`text-sm flex items-center gap-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <FaUsers className="text-xs" />
                      {job.applications} applications
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/recruiter/jobs/${job.id}`}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#13ff8c]/20 hover:bg-[#13ff8c]/30 text-[#13ff8c] border border-[#13ff8c]/30'
                          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-300'
                      }`}
                    >
                      View Details
                    </Link>
                    <button className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`} title="Edit Job">
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className={`rounded-xl p-12 text-center ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
              : 'bg-white/80 backdrop-blur-sm border border-blue-100'
          }`}>
            <FaBriefcase className={`text-6xl mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>No jobs found</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterJobsPage;
