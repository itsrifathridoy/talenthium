'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  FaArrowLeft,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaSearch,
  FaUser,
  FaClock,
  FaCalendar,
  FaVideo,
  FaMicrophone,
  FaEye,
  FaThumbsUp,
  FaThumbsDown,
  FaExclamationTriangle,
  FaStar,
  FaDownload,
  FaShare,
  FaFileAlt,
  FaComment,
  FaBookmark,
  FaEdit
} from 'react-icons/fa';
import { RecruiterLayout } from '@/components/layouts/RecruiterLayout';
import Link from 'next/link';

interface InterviewData {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  date: string;
  time: string;
  duration: string;
  interviewer: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  recordingUrl?: string;
  transcriptData: TranscriptEntry[];
  feedback: {
    strengths: string[];
    concerns: string[];
    skillRatings: {
      skill: string;
      rating: number;
      color: string;
    }[];
    notes: string;
    isHireable: boolean;
    isFitForRole: boolean;
  };
  audioWaveform: number[];
}

interface TranscriptEntry {
  id: string;
  speaker: 'candidate' | 'interviewer';
  speakerName: string;
  timestamp: string;
  content: string;
  tags?: string[];
  highlighted?: boolean;
}

const InterviewDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const interviewId = params?.id as string;
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(3000); // 50 minutes in seconds
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Mock interview data - in real app, this would come from API
  const interviewData: InterviewData = {
    id: interviewId,
    candidateName: "Bradley Mort",
    candidateEmail: "bradley.mort@email.com",
    position: "Senior Frontend Developer",
    date: "Oct 28, 2021",
    time: "08:00 AM",
    duration: "50:00",
    interviewer: "Lee James",
    status: "completed",
    recordingUrl: "/interview-recording.mp3",
    transcriptData: [
      {
        id: "1",
        speaker: "interviewer",
        speakerName: "Lee James",
        timestamp: "00:07:00",
        content: "Give me an example of how you built and maintained a business relationship in one of your previous roles. What did you do in that situation?",
        tags: ["Motivation"]
      },
      {
        id: "2",
        speaker: "candidate",
        speakerName: "Bradley Mort",
        timestamp: "00:08:01",
        content: "The user experience (UX or UE) is how a user interacts with and experiences a product, system or service. It includes a person's perceptions of utility, ease of use, and efficiency. Improving user experience is important to most companies, designers, and Creators when creating and refining products because negative user experience can diminish the use of the product and, therefore any desired positive impacts; conversely. Designing toward profitability often conflicts with ethical user experience objectives and even causes harm. User experience is subjective. However, the attributes that make up the user experience are objective.",
        tags: ["Select skill"]
      },
      {
        id: "3",
        speaker: "interviewer",
        speakerName: "Lee James",
        timestamp: "00:08:01",
        content: "Oh, yeah, ah, that sounds like a great solution.",
        tags: ["Select skill"]
      },
      {
        id: "4",
        speaker: "interviewer",
        speakerName: "Lee James",
        timestamp: "00:08:02",
        content: "Of all of the ideas you've proposed to your employer, which was the one that benefited your employer the most and why?",
        tags: ["Select skill"]
      }
    ],
    feedback: {
      strengths: [
        "The user experience (UX or UE) is how a user interacts with and experiences a product, system or service. It includes a person's perceptions of utility, ease of use, and efficiency."
      ],
      concerns: [
        "But at the same time, I wasn't sure who's product or responsibility it was, so I decided to wait to see if it came up in our next meeting."
      ],
      skillRatings: [
        { skill: "Motivation", rating: 3.5, color: "#3B82F6" },
        { skill: "CSSx", rating: 3, color: "#10B981" },
        { skill: "Wireframing", rating: 0, color: "#6B7280" },
        { skill: "Critical Thinking", rating: 0, color: "#6B7280" },
        { skill: "Cultural Fit", rating: 0, color: "#6B7280" },
        { skill: "Visual Design", rating: 0, color: "#6B7280" },
        { skill: "User Experience", rating: 0, color: "#6B7280" },
        { skill: "Strategy", rating: 0, color: "#6B7280" }
      ],
      notes: "To add a note, select text on Transcript to add as \"Note.\"",
      isHireable: true,
      isFitForRole: true
    },
    audioWaveform: Array.from({ length: 100 }, () => Math.random() * 100)
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (percentage: number) => {
    const newTime = Math.floor((percentage / 100) * duration);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const filteredTranscript = interviewData.transcriptData.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.speakerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || 
      entry.tags?.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const availableTags = Array.from(
    new Set(interviewData.transcriptData.flatMap(entry => entry.tags || []))
  );

  return (
    <RecruiterLayout
      sidebarActive="Interviews"
      topbarTitle="Interview Details"
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className={`rounded-2xl p-6 ${
          theme === 'dark' 
            ? 'bg-gray-900/80 border border-gray-700/50' 
            : 'bg-white border border-gray-200'
        } shadow-xl`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/recruiter/jobs"
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaArrowLeft />
              </Link>
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {interviewData.candidateName} Interview
                </h1>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {interviewData.date} • {interviewData.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}>
                <FaEye className="inline mr-2" />
                View video
              </button>
            </div>
          </div>

          {/* Audio Player */}
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayPause}
                className={`p-3 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {formatTime(currentTime)}
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    / {formatTime(duration)}
                  </span>
                </div>
                
                {/* Waveform */}
                <div 
                  className="relative h-12 cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                    handleSeek(percentage);
                  }}
                >
                  <div className="flex items-end justify-between h-full gap-1">
                    {interviewData.audioWaveform.map((height, index) => {
                      const isPlayed = (index / interviewData.audioWaveform.length) * 100 <= (currentTime / duration) * 100;
                      return (
                        <div
                          key={index}
                          className={`w-1 rounded-full transition-colors ${
                            isPlayed 
                              ? 'bg-red-500' 
                              : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                          style={{ height: `${(height / 100) * 100}%` }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Markers */}
                  <div className="absolute top-0 left-1/4 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-1"></div>
                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-1"></div>
                  <div className="absolute top-0 left-3/4 w-3 h-3 bg-blue-400 rounded-full transform -translate-y-1"></div>
                </div>
              </div>
              
              <button className={`p-2 rounded-lg ${
                theme === 'dark' ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
              }`}>
                <FaVolumeUp />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transcript Section */}
          <div className={`lg:col-span-2 rounded-2xl p-6 ${
            theme === 'dark' 
              ? 'bg-gray-900/80 border border-gray-700/50' 
              : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Transcript
              </h2>
              
              {/* Search */}
              <div className="relative">
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search for a keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Transcript Entries */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredTranscript.map((entry) => (
                <div key={entry.id} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    entry.speaker === 'candidate' 
                      ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
                      : 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                  }`}>
                    {entry.speaker === 'candidate' ? 'BM' : 'LJ'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {entry.speakerName}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {entry.timestamp}
                      </span>
                      {entry.tags && entry.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={`px-2 py-1 rounded text-xs cursor-pointer ${
                            selectedTag === tag
                              ? 'bg-blue-500 text-white'
                              : theme === 'dark' 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {entry.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            {/* Feedback Card */}
            <div className={`rounded-2xl p-6 ${
              theme === 'dark' 
                ? 'bg-gray-900/80 border border-gray-700/50' 
                : 'bg-white border border-gray-200'
            } shadow-xl`}>
              <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Feedback
              </h3>

              {/* Strengths */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaThumbsUp className="text-yellow-500" />
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Strengths
                  </span>
                </div>
                {interviewData.feedback.strengths.map((strength, index) => (
                  <div key={index} className={`p-3 rounded-lg mb-2 ${
                    theme === 'dark' ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
                  }`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                      "{strength}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Concerns */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaExclamationTriangle className="text-yellow-500" />
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Concerns
                  </span>
                </div>
                {interviewData.feedback.concerns.map((concern, index) => (
                  <div key={index} className={`p-3 rounded-lg mb-2 ${
                    theme === 'dark' ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                      "{concern}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Rate Skills */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Rate Skills
                  </span>
                  <button className={`text-sm ${
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}>
                    + Add skill
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {interviewData.feedback.skillRatings.map((skill, index) => (
                    <div key={index} className={`p-2 rounded-lg text-center ${
                      skill.rating > 0 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'
                        : theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <div className="text-sm font-medium">{skill.skill}</div>
                      {skill.rating > 0 && (
                        <div className="text-xs">{skill.rating}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaComment className="text-yellow-500" />
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Notes
                  </span>
                </div>
                <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {interviewData.feedback.notes}
                </p>
              </div>

              {/* Decision Questions */}
              <div className="space-y-4">
                <div>
                  <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Is candidate hireable?
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="hireable" 
                        defaultChecked={interviewData.feedback.isHireable}
                        className="text-red-500" 
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="hireable" 
                        defaultChecked={!interviewData.feedback.isHireable}
                        className="text-gray-500" 
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Is candidate fit for role?
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="fitForRole" 
                        defaultChecked={interviewData.feedback.isFitForRole}
                        className="text-red-500" 
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="fitForRole" 
                        defaultChecked={!interviewData.feedback.isFitForRole}
                        className="text-gray-500" 
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          onTimeUpdate={() => setCurrentTime(Math.floor(audioRef.current?.currentTime || 0))}
          onDurationChange={() => setDuration(Math.floor(audioRef.current?.duration || 0))}
        />
      </div>
    </RecruiterLayout>
  );
};

export default InterviewDetailsPage;
