'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaClock,
  FaStar,
  FaFileAlt,
  FaChartBar,
  FaUserCheck,
  FaEnvelope,
  FaPhone,
  FaDownload,
  FaFilter,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCertificate,
  FaCode,
  FaVideo,
  FaComments
} from 'react-icons/fa';
import { RecruiterLayout } from '@/components/layouts/RecruiterLayout';
import Link from 'next/link';

interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
  experience: string;
  resumeUrl: string;
  coverLetter?: string;
  skills: string[];
  rating?: number;
  role: string;
  expectedSalary: string;
  avatar?: string;
  profileUrl?: string;
  education?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  projects?: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
  }[];
  papers?: {
    title: string;
    journal: string;
    year: number;
    link?: string;
  }[];
  interviews?: {
    id: string;
    type: 'phone' | 'video' | 'technical' | 'final';
    date: string;
    interviewer: string;
    duration: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    feedback?: string;
    score?: number;
  }[];
  certifications?: string[];
  languages?: string[];
}

interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  remote: string;
  experience: string;
  salary: string;
  period: string;
  description: string;
  skills: string[];
  qualification: string[];
  responsibility: string[];
  benefits: string[];
  department: string;
  employmentType: string;
  workHours: string;
  applicationDeadline: string;
  contactEmail: string;
  contactPhone: string;
  status: 'active' | 'closed' | 'draft';
  postedDate: string;
  applications: Application[];
}

const JobDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = params?.id as string;
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('overview');
  const [applicationFilter, setApplicationFilter] = useState('all');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Handle URL query parameters for tabs
  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab && ['overview', 'applications', 'details', 'analytics'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const newSearchParams = new URLSearchParams(searchParams?.toString() || '');
    newSearchParams.set('tab', tabId);
    router.push(`/recruiter/jobs/${jobId}?${newSearchParams.toString()}`);
  };

  // Mock job data - in real app, this would come from API
  const jobData: JobData = {
    id: jobId,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Full-time",
    remote: "Remote",
    experience: "3-5 Years",
    salary: "$90k - $120k",
    period: "Monthly",
    description: `# Senior Frontend Developer

We're looking for an experienced Frontend Developer to join our growing team and help build the next generation of our web applications.

## What You'll Do:
- Develop and maintain responsive web applications using React and TypeScript
- Collaborate with design and backend teams to implement new features
- Optimize applications for maximum speed and scalability
- Write clean, maintainable, and well-documented code

## Requirements:
- 3+ years of experience with React and modern JavaScript
- Strong proficiency in TypeScript
- Experience with state management (Redux, Zustand, etc.)
- Familiarity with testing frameworks (Jest, React Testing Library)
- Knowledge of modern CSS frameworks (Tailwind, Styled Components)

## Nice to Have:
- Experience with Next.js or similar frameworks
- Knowledge of GraphQL
- Familiarity with CI/CD pipelines
- Experience with mobile development (React Native)

We offer competitive compensation, flexible work arrangements, and opportunities for professional growth.`,
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "Next.js", "Tailwind CSS"],
    qualification: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of frontend development experience",
      "Strong problem-solving skills",
      "Excellent communication skills"
    ],
    responsibility: [
      "Develop and maintain web applications",
      "Collaborate with cross-functional teams",
      "Write clean, efficient, and maintainable code",
      "Participate in code reviews and mentoring",
      "Optimize applications for performance"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Unlimited PTO policy"
    ],
    department: "Engineering",
    employmentType: "Full-time",
    workHours: "40 hours/week",
    applicationDeadline: "2024-02-15",
    contactEmail: "hr@techcorp.com",
    contactPhone: "+1 (555) 123-4567",
    status: "active",
    postedDate: "2024-01-15",
    applications: [
        {
        id: "1",
        applicantName: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 111-2222",
        appliedDate: "2024-01-16",
        status: "shortlisted",
        experience: "4 years",
        resumeUrl: "#",
        coverLetter: "I'm excited to apply for the Senior Frontend Developer position. With 4 years of experience in React and TypeScript, I've led multiple projects that align perfectly with your requirements...",
        skills: ["React", "TypeScript", "Node.js", "AWS"],
        rating: 4.5,
        role: "Frontend Developer",
        expectedSalary: "$95k",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
        education: "BS Computer Science, Stanford University",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/johnsmith",
        github: "https://github.com/johnsmith",
        portfolio: "https://johnsmith.dev",
        projects: [
          {
            title: "E-commerce Platform",
            description: "Built a full-stack e-commerce platform using React, Node.js, and PostgreSQL",
            technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
            link: "https://ecommerce-demo.com",
            github: "https://github.com/johnsmith/ecommerce"
          },
          {
            title: "Task Management App",
            description: "Developed a collaborative task management application with real-time updates",
            technologies: ["React", "TypeScript", "Socket.io", "MongoDB"],
            github: "https://github.com/johnsmith/taskapp"
          }
        ],
        papers: [
          {
            title: "Optimizing React Performance in Large-Scale Applications",
            journal: "Frontend Development Journal",
            year: 2023,
            link: "https://journal.com/react-optimization"
          }
        ],
        interviews: [
          {
            id: "int1",
            type: "phone",
            date: "2024-01-18",
            interviewer: "Sarah Johnson",
            duration: "30 minutes",
            status: "completed",
            feedback: "Strong technical background, good communication skills",
            score: 8.5
          },
          {
            id: "int2",
            type: "technical",
            date: "2024-01-22",
            interviewer: "Mike Chen",
            duration: "60 minutes",
            status: "scheduled",
            feedback: "",
            score: 0
          }
        ],
        certifications: ["AWS Certified Developer", "React Professional Certificate"],
        languages: ["English (Native)", "Spanish (Conversational)"]
      },
      {
        id: "2",
        applicantName: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1 (555) 333-4444",
        appliedDate: "2024-01-17",
        status: "interviewed",
        experience: "5 years",
        resumeUrl: "#",
        skills: ["React", "Vue.js", "Python", "Docker"],
        rating: 4.8,
        role: "Full Stack Developer",
        expectedSalary: "$110k",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b13c?w=150&h=150&fit=crop&crop=face&auto=format",
        education: "MS Software Engineering, MIT",
        location: "Boston, MA",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson",
        portfolio: "https://sarahjohnson.dev",
        projects: [
          {
            title: "AI-Powered Analytics Dashboard",
            description: "Built an AI-powered analytics dashboard using React and Python machine learning models",
            technologies: ["React", "Python", "TensorFlow", "Docker"],
            link: "https://analytics-dashboard.com",
            github: "https://github.com/sarahjohnson/ai-dashboard"
          }
        ],
        papers: [
          {
            title: "Machine Learning in Web Applications",
            journal: "ACM Digital Library",
            year: 2023,
            link: "https://dl.acm.org/ml-web-apps"
          }
        ],
        interviews: [
          {
            id: "int3",
            type: "video",
            date: "2024-01-20",
            interviewer: "David Lee",
            duration: "45 minutes",
            status: "completed",
            feedback: "Excellent problem-solving skills, strong full-stack knowledge",
            score: 9.2
          }
        ],
        certifications: ["Google Cloud Professional", "Certified Kubernetes Administrator"],
        languages: ["English (Native)", "French (Fluent)", "Mandarin (Basic)"]
      },
      {
        id: "3",
        applicantName: "Mike Davis",
        email: "mike.davis@email.com",
        phone: "+1 (555) 555-6666",
        appliedDate: "2024-01-18",
        status: "pending",
        experience: "3 years",
        resumeUrl: "#",
        skills: ["React", "JavaScript", "CSS", "Git"],
        rating: 4.0,
        role: "Frontend Developer",
        expectedSalary: "$85k",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format"
      },
      {
        id: "4",
        applicantName: "Emily Chen",
        email: "emily.chen@email.com",
        phone: "+1 (555) 777-8888",
        appliedDate: "2024-01-19",
        status: "reviewed",
        experience: "6 years",
        resumeUrl: "#",
        skills: ["Angular", "TypeScript", "Java", "Spring"],
        rating: 4.2,
        role: "Senior Frontend Developer",
        expectedSalary: "$125k",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format"
      },
      {
        id: "5",
        applicantName: "Robert Miller",
        email: "robert.miller@email.com",
        phone: "+1 (555) 999-0000",
        appliedDate: "2024-01-20",
        status: "pending",
        experience: "2 years",
        resumeUrl: "#",
        skills: ["React", "Next.js", "Tailwind", "Firebase"],
        rating: 3.8,
        role: "Web Developer",
        expectedSalary: "$75k",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format"
      },
      {
        id: "6",
        applicantName: "Lisa Anderson",
        email: "lisa.anderson@email.com",
        phone: "+1 (555) 222-3333",
        appliedDate: "2024-01-21",
        status: "shortlisted",
        experience: "7 years",
        resumeUrl: "#",
        skills: ["React", "GraphQL", "Node.js", "MongoDB"],
        rating: 4.9,
        role: "Lead Frontend Developer",
        expectedSalary: "$140k",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format"
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaEye },
    { id: 'applications', label: 'Applications', icon: FaUsers },
    { id: 'details', label: 'Details', icon: FaFileAlt },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar }
  ];

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

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800';
      case 'interviewed':
        return theme === 'dark' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800';
      case 'hired':
        return theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800';
      case 'rejected':
        return theme === 'dark' ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const calculateJobMatch = (application: Application) => {
    const requiredSkills = jobData.skills;
    const candidateSkills = application.skills;
    const matchingSkills = candidateSkills.filter(skill => 
      requiredSkills.some(reqSkill => reqSkill.toLowerCase() === skill.toLowerCase())
    );
    const matchPercentage = Math.round((matchingSkills.length / requiredSkills.length) * 100);
    return {
      percentage: matchPercentage,
      matchingSkills,
      missingSkills: requiredSkills.filter(skill => 
        !candidateSkills.some(candSkill => candSkill.toLowerCase() === skill.toLowerCase())
      )
    };
  };

  const filteredApplications = jobData.applications.filter(app => {
    if (applicationFilter === 'all') return true;
    return app.status === applicationFilter;
  });

  const applicationStats = {
    total: jobData.applications.length,
    pending: jobData.applications.filter(app => app.status === 'pending').length,
    reviewed: jobData.applications.filter(app => app.status === 'reviewed').length,
    shortlisted: jobData.applications.filter(app => app.status === 'shortlisted').length,
    interviewed: jobData.applications.filter(app => app.status === 'interviewed').length,
    hired: jobData.applications.filter(app => app.status === 'hired').length,
    rejected: jobData.applications.filter(app => app.status === 'rejected').length
  };

  return (
    <RecruiterLayout
      sidebarActive="Jobs"
      topbarTitle="Job Details"
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-6 relative z-10">
        {/* Modern Glassmorphic Header */}
        <div className={`relative rounded-2xl p-8 overflow-hidden backdrop-blur-xl border ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-emerald-500/10'
            : 'bg-white/90 border-blue-200/50 shadow-xl shadow-blue-500/10'
        }`}>
          {/* Animated background gradient */}
          <div className={`absolute inset-0 opacity-20 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-emerald-500/30 via-transparent to-blue-500/30'
              : 'bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20'
          }`} />
          
          {/* Floating decorative elements */}
          <div className={`absolute top-4 right-4 w-20 h-20 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-emerald-400' : 'bg-blue-400'
          }`} />
          <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-blue-400' : 'bg-emerald-400'
          }`} />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/recruiter/jobs"
                className={`group p-3 rounded-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'hover:bg-white/10 text-white hover:scale-105'
                    : 'hover:bg-black/10 text-gray-900 hover:scale-105'
                } backdrop-blur-sm border border-white/20`}
              >
                <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <div>
                <h1 className={`text-2xl lg:text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Job Details - {jobData.title}</h1>
                <div className="flex items-center gap-4 text-sm lg:text-base mt-1">
                  <span className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FaBriefcase className="text-xs" />
                    {jobData.company}
                  </span>
                  <span className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FaMapMarkerAlt className="text-xs" />
                    {jobData.location}
                  </span>
                  <span className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FaDollarSign className="text-xs" />
                    {jobData.salary}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${
                jobData.status === 'active'
                  ? theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                  : theme === 'dark'
                    ? 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}>
                <div className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  jobData.status === 'active'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-gray-400'
                }`} />
                {jobData.status.charAt(0).toUpperCase() + jobData.status.slice(1)}
              </div>
              <button className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50'
                  : 'bg-black/20 hover:bg-black/30 text-gray-900 border border-black/30 hover:border-black/50'
              } backdrop-blur-sm hover:scale-105`}>
                <FaEdit className="inline mr-2 transition-transform group-hover:rotate-12" />
                Edit Job
              </button>
            </div>
          </div>
        </div>

        {/* Modern Tabs with Sliding Indicator */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-gray-700/50'
            : 'bg-white/90 border-blue-200/50'
        }`}>
          <div className={`relative flex flex-wrap gap-2 p-6 border-b ${
            theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
          }`}>
            {/* Sliding background indicator */}
            <div 
              className={`absolute bottom-0 h-1 rounded-full transition-all duration-300 ease-out ${
                theme === 'dark' ? 'bg-[#13ff8c]' : 'bg-emerald-500'
              }`}
              style={{
                left: `${tabs.findIndex(tab => tab.id === activeTab) * 25}%`,
                width: '25%'
              }}
            />
            
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`group relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? 'bg-[#13ff8c]/20 text-[#13ff8c] shadow-lg shadow-[#13ff8c]/20 border border-[#13ff8c]/30 scale-105'
                        : 'bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-500/20 border border-emerald-300 scale-105'
                      : theme === 'dark'
                        ? 'hover:bg-white/5 text-gray-300 hover:text-white hover:scale-102'
                        : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900 hover:scale-102'
                  } backdrop-blur-sm`}
                >
                  <Icon className={`text-lg transition-transform duration-300 ${
                    activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span className="font-semibold">{tab.label}</span>
                  
                  {/* Tab notification badges */}
                  {tab.id === 'applications' && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      theme === 'dark'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {applicationStats.total}
                    </span>
                  )}
                  {tab.id === 'overview' && applicationStats.pending > 0 && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full animate-pulse ${
                      theme === 'dark'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {applicationStats.pending} pending
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Enhanced Tab Content with Smooth Transitions */}
          <div className="p-8">
            <div className="transition-all duration-500 ease-in-out">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8 transition-all duration-500 ease-in-out">
                  {/* Enhanced Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-gray-700/50' 
                        : 'bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 border border-gray-200/50'
                    } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
                      <div className="flex items-center justify-between mb-4">
                        <FaUsers className={`text-3xl transition-colors duration-300 ${
                          theme === 'dark' ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'
                        }`} />
                        <div className={`w-2 h-2 rounded-full ${
                          theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        } animate-pulse`} />
                      </div>
                      <div className={`text-3xl font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{applicationStats.total}</div>
                      <div className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Total Applications</div>
                    </div>

                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-gray-700/50' 
                        : 'bg-gradient-to-br from-white to-gray-50 hover:from-green-50 hover:to-emerald-50 border border-gray-200/50'
                    } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
                      <div className="flex items-center justify-between mb-4">
                        <FaUserCheck className={`text-3xl transition-colors duration-300 ${
                          theme === 'dark' ? 'text-green-400 group-hover:text-green-300' : 'text-green-600 group-hover:text-green-700'
                        }`} />
                        <div className={`w-2 h-2 rounded-full ${
                          theme === 'dark' ? 'bg-green-400' : 'bg-green-600'
                        } animate-pulse`} />
                      </div>
                      <div className={`text-3xl font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{applicationStats.shortlisted}</div>
                      <div className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Shortlisted</div>
                    </div>

                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-gray-700/50' 
                        : 'bg-gradient-to-br from-white to-gray-50 hover:from-yellow-50 hover:to-orange-50 border border-gray-200/50'
                    } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
                      <div className="flex items-center justify-between mb-4">
                        <FaClock className={`text-3xl transition-colors duration-300 ${
                          theme === 'dark' ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-yellow-600 group-hover:text-yellow-700'
                        }`} />
                        <div className={`w-2 h-2 rounded-full ${
                          theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-600'
                        } animate-pulse`} />
                      </div>
                      <div className={`text-3xl font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{applicationStats.pending}</div>
                      <div className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Pending Review</div>
                    </div>

                    <div className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-gray-700/50' 
                        : 'bg-gradient-to-br from-white to-gray-50 hover:from-purple-50 hover:to-indigo-50 border border-gray-200/50'
                    } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
                      <div className="flex items-center justify-between mb-4">
                        <FaCalendarAlt className={`text-3xl transition-colors duration-300 ${
                          theme === 'dark' ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-600 group-hover:text-purple-700'
                        }`} />
                        <div className={`w-2 h-2 rounded-full ${
                          theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'
                        } animate-pulse`} />
                      </div>
                      <div className={`text-3xl font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>12</div>
                      <div className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Days Active</div>
                    </div>
                  </div>

                {/* Job Summary */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Job Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Salary Range:</span>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{jobData.salary} {jobData.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Experience Required:</span>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{jobData.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Employment Type:</span>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{jobData.employmentType}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Location:</span>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{jobData.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Remote Work:</span>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{jobData.remote}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Department:</span>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{jobData.department}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Applications */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Recent Applications</h3>
                  <div className="space-y-3">
                    {jobData.applications.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-700/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                          }`}>
                            <span className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{app.applicantName.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <p className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{app.applicantName}</p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>{app.experience} experience • Applied {new Date(app.appliedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getApplicationStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-8">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-3">
                  {Object.entries(applicationStats).map(([status, count]) => (
                    <button
                      key={status}
                      onClick={() => setApplicationFilter(status)}
                      className={`group px-6 py-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                        applicationFilter === status
                          ? theme === 'dark'
                            ? 'bg-[#13ff8c]/20 border-2 border-[#13ff8c]/30 shadow-lg shadow-[#13ff8c]/20'
                            : 'bg-emerald-100 border-2 border-emerald-300 shadow-lg shadow-emerald-500/20'
                          : theme === 'dark'
                            ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50'
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                      } backdrop-blur-sm`}
                    >
                      <div className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                        applicationFilter === status
                          ? theme === 'dark' ? 'text-[#13ff8c]' : 'text-emerald-700'
                          : theme === 'dark' ? 'text-white group-hover:text-gray-100' : 'text-gray-900 group-hover:text-gray-800'
                      }`}>{count}</div>
                      <div className={`text-sm capitalize font-medium transition-colors duration-300 ${
                        applicationFilter === status
                          ? theme === 'dark' ? 'text-[#13ff8c]/80' : 'text-emerald-600'
                          : theme === 'dark' ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-700'
                      }`}>{status}</div>
                    </button>
                  ))}
                </div>

                {/* Candidates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredApplications.map((app) => (
                    <div key={app.id} className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50 hover:border-gray-600/50'
                        : 'bg-gradient-to-br from-white to-gray-50/80 border-gray-200/50 hover:border-gray-300/50'
                    } backdrop-blur-sm shadow-xl`}>
                      
                      {/* Profile Section */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          {app.avatar ? (
                            <img 
                              src={app.avatar} 
                              alt={app.applicantName}
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-200 dark:border-gray-600"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling!.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg border-2 ${
                            app.avatar ? 'hidden' : ''
                          } ${
                            theme === 'dark' 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-gray-200 border-gray-300 text-gray-900'
                          }`}>
                            {app.applicantName.split(' ').map(n => n[0]).join('')}
                          </div>
                          {/* Rating Badge */}
                          {app.rating && (
                            <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                              theme === 'dark'
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                            }`}>
                              <FaStar className="text-xs" />
                              {app.rating}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-bold mb-1 truncate ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{app.applicantName}</h3>
                          <p className={`text-sm font-medium mb-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{app.role}</p>
                          <p className={`text-xs ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>Expected Salary: <span className="font-semibold">{app.expectedSalary}</span></p>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(app.status)}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`} title="More options">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                            <button className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300'
                                : 'hover:bg-red-50 text-red-500 hover:text-red-600'
                            }`} title="Remove candidate">
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Experience and Skills */}
                        <div className="space-y-3">
                          <div>
                            <p className={`text-xs font-medium mb-1 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>Experience</p>
                            <p className={`text-sm font-semibold ${
                              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                            }`}>{app.experience}</p>
                          </div>
                          
                          <div>
                            <p className={`text-xs font-medium mb-2 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>Top Skills</p>
                            <div className="flex flex-wrap gap-1">
                              {app.skills.slice(0, 3).map((skill, index) => (
                                <span key={index} className={`text-xs px-2 py-1 rounded-lg font-medium ${
                                  theme === 'dark'
                                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                                }`}>
                                  {skill}
                                </span>
                              ))}
                              {app.skills.length > 3 && (
                                <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                                  theme === 'dark'
                                    ? 'bg-gray-500/20 text-gray-300'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  +{app.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <button className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                            app.status === 'shortlisted'
                              ? theme === 'dark'
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-green-100 text-green-700 border border-green-300'
                              : theme === 'dark'
                                ? 'bg-[#13ff8c]/20 hover:bg-[#13ff8c]/30 text-[#13ff8c] border border-[#13ff8c]/30 hover:border-[#13ff8c]/50'
                                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-300 hover:border-emerald-400'
                          }`}>
                            {app.status === 'shortlisted' ? (
                              <>
                                <FaCheck className="inline mr-1" />
                                Shortlisted
                              </>
                            ) : (
                              <>
                                <FaUserCheck className="inline mr-1" />
                                Shortlist
                              </>
                            )}
                          </button>
                          
                          <Link
                            href={`/recruiter/applications/${app.id}`}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                            theme === 'dark'
                              ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 hover:border-blue-500/50'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300 hover:border-blue-400'
                          }`}>
                            <FaEye className="inline mr-1" />
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results Message */}
                {filteredApplications.length === 0 && (
                  <div className={`text-center py-12 rounded-2xl ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                  }`}>
                    <FaUsers className={`mx-auto text-4xl mb-4 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                    <h3 className={`text-lg font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>No applications found</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>No candidates match the selected filter criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Job Description */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Job Description</h3>
                  <div className={`prose prose-sm max-w-none ${
                    theme === 'dark' ? 'prose-invert' : ''
                  }`}>
                    <div className={`whitespace-pre-line text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {jobData.description}
                    </div>
                  </div>
                </div>

                {/* Requirements & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50' 
                      : 'bg-gradient-to-br from-white to-blue-50/50 border border-gray-200/50'
                  } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
                    <h3 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <div className={`w-2 h-8 rounded-full ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                      }`} />
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {jobData.skills.map((skill, index) => (
                        <span key={index} className={`group px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-110 ${
                          theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:text-blue-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 hover:text-blue-900'
                        } backdrop-blur-sm shadow-lg hover:shadow-xl cursor-pointer`}>
                          <span className="transition-transform duration-300 group-hover:scale-110">{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50' 
                      : 'bg-gradient-to-br from-white to-green-50/50 border border-gray-200/50'
                  } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
                    <h3 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <div className={`w-2 h-8 rounded-full ${
                        theme === 'dark' ? 'bg-green-400' : 'bg-green-600'
                      }`} />
                      Qualifications
                    </h3>
                    <ul className="space-y-4">
                      {jobData.qualification.map((qual, index) => (
                        <li key={index} className={`group flex items-start gap-4 text-sm transition-all duration-300 hover:translate-x-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <FaCheck className={`text-lg mt-0.5 flex-shrink-0 transition-all duration-300 ${
                            theme === 'dark' ? 'text-green-400 group-hover:text-green-300' : 'text-green-600 group-hover:text-green-700'
                          } group-hover:scale-125`} />
                          <span className="group-hover:text-white dark:group-hover:text-gray-100">{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Responsibilities & Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Responsibilities</h3>
                    <ul className="space-y-2">
                      {jobData.responsibility.map((resp, index) => (
                        <li key={index} className={`text-sm flex items-start gap-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <FaCheck className={`text-xs mt-0.5 flex-shrink-0 ${
                            theme === 'dark' ? 'text-green-400' : 'text-green-600'
                          }`} />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-6 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Benefits</h3>
                    <ul className="space-y-2">
                      {jobData.benefits.map((benefit, index) => (
                        <li key={index} className={`text-sm flex items-start gap-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <FaCheck className={`text-xs mt-0.5 flex-shrink-0 ${
                            theme === 'dark' ? 'text-green-400' : 'text-green-600'
                          }`} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact Information */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <FaEnvelope className={`text-lg ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Email</p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{jobData.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhone className={`text-lg ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Phone</p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{jobData.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Application Timeline */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Application Timeline</h3>
                  <div className="space-y-3">
                    {jobData.applications.slice().reverse().map((app, index) => (
                      <div key={app.id} className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          theme === 'dark' ? 'bg-[#13ff8c]' : 'bg-emerald-500'
                        }`} />
                        <div className="flex-1">
                          <p className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{app.applicantName} applied</p>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>{new Date(app.appliedDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getApplicationStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Sources */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Application Sources</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>LinkedIn</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-20 h-2 rounded ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <div className="w-3/4 h-full bg-blue-500 rounded" />
                        </div>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Company Website</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-20 h-2 rounded ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <div className="w-1/4 h-full bg-green-500 rounded" />
                        </div>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>25%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Distribution */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Top Skills in Applications</h3>
                  <div className="space-y-3">
                    {['React', 'TypeScript', 'JavaScript', 'Node.js', 'CSS'].map((skill, index) => (
                      <div key={skill} className="flex justify-between items-center">
                        <span className={`${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>{skill}</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-32 h-2 rounded ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <div className={`h-full rounded ${
                              ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'][index]
                            }`} style={{ width: `${80 - index * 10}%` }} />
                          </div>
                          <span className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{80 - index * 10}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </RecruiterLayout>
  );
};

export default JobDetailPage;
