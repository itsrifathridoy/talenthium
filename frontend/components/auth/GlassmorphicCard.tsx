import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import SocialButton from '../SocialButton';

interface GlassmorphicCardProps {
  theme: 'light' | 'dark';
  children?: React.ReactNode;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ theme, children }) => {
  return (
    <div
      className={`relative overflow-hidden z-10 w-full max-w-md rounded-2xl p-8 border backdrop-blur-2xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-glass border-white/10 shadow-xl'
          : [
              'bg-[rgba(32,92,61,0.85)]',
              'border-emerald-900/30',
              'shadow-[0_6px_24px_-4px_rgba(16,185,129,0.35),0_1px_3px_rgba(0,0,0,0.08)]',
              'ring-1 ring-emerald-700/30',
            ].join(' ')
      }`}
    >
      <div className="flex flex-col gap-3 mb-6">
        <SocialButton
          icon={<FcGoogle className="text-2xl" />}
          className="text-green-900 hover:text-green-700"
        >
          Continue with Google
        </SocialButton>
        <SocialButton
          icon={<FaGithub className="text-2xl" />}
          className="text-green-900 hover:text-green-700"
        >
          Continue with GitHub
        </SocialButton>
      </div>
      <div className="flex items-center my-4">
        <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-emerald-300'} transition-colors`} />
        <span
          className={`mx-3 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-teal-200 font-semibold'}`}
        >
          or
        </span>
        <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-emerald-300'} transition-colors`} />
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default GlassmorphicCard;
