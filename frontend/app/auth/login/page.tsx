"use client";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Button from '@/components/Button';
import Input from '@/components/Input';
import React from 'react';
import AuthHeader from '@/components/AuthHeader';
import Link from 'next/link';
import GlassmorphicCard from '@/components/auth/GlassmorphicCard';
import { useAuthTheme } from '../layout';

export default function LoginPage() {
  const { theme } = useAuthTheme();

  return (
    <>
      <AuthHeader 
        title="LET'S CONNECT" 
        subtitle='WITH TALENTHIUM ECOSYSTEM' 
        theme={theme}
      />
      <GlassmorphicCard theme={theme}>
        <form className="space-y-4">
          <div>
            <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-teal-200 font-medium'}`}>Email</label>
            <Input
              icon={<FaEnvelope className='text-teal-200' />}
              type="email"
              placeholder="Enter your email here"
              className="text-teal-200 placeholder-teal-200"
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-teal-200 font-medium'}`}>Password</label>
            <Input
              icon={<FaLock className='text-teal-200' />}
              type="password"
              placeholder="********"
              className="text-teal-200 placeholder-teal-200 pr-8"
            />
            <div className="flex justify-end mt-1">
              <Link href="/auth/forgot-password" className={`text-xs hover:underline transition-colors ${theme === 'dark' ? 'text-neon' : 'text-teal-100 hover:text-teal-100'}`}>Forgot Password?</Link>
            </div>
          </div>
          <Button>Sign In Now</Button>
        </form>
        <div className={`text-center mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-teal-100 font-medium'}`}>
          Don&apos;t have an account yet?{' '}
          <Link href="/auth/register" className={`hover:underline transition-colors ${theme === 'dark' ? 'text-neon' : 'text-white hover:text-white font-semibold'}`}>Sign Up</Link>
        </div>
      </GlassmorphicCard>
    </>
  );
}