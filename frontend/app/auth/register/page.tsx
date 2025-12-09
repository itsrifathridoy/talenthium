"use client";
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Button from '@/components/Button';
import Input from '@/components/Input';
import React from 'react';
import AuthHeader from '@/components/AuthHeader';
import Link from 'next/link';
import GlassmorphicCard from '@/components/auth/GlassmorphicCard';
import { useAuthTheme } from '../layout';

export default function RegisterPage() {
    const { theme } = useAuthTheme();

    return (
        <>
            <AuthHeader
                title="CREATE ACCOUNT"
                subtitle='JOIN TALENTHIUM ECOSYSTEM'
                theme={theme}
            />
            <GlassmorphicCard theme={theme}>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Name</label>
                        <Input
                            icon={<FaUser className='text-teal-200' />}
                            type="text"
                            placeholder="Enter your name"
                            className="text-teal-200 placeholder-teal-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Email</label>
                        <Input
                            icon={<FaEnvelope className='text-teal-200' />}
                            type="email"
                            placeholder="Enter your email here"
                            className="text-teal-200 placeholder-teal-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Password</label>
                        <Input
                            icon={<FaLock className='text-teal-200' />}
                            type="password"
                            placeholder="********"
                            className="text-teal-200 placeholder-teal-200 pr-8"
                        />
                    </div>
                    <Button>
                        <Link href='/auth/otp-verification'>Register</Link>
                    </Button>
                </form>
                <div className={`text-center mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-teal-100 font-medium'}`}>
                    Already have an account?{' '}
                    <Link href="/auth/login" className={`hover:underline transition-colors ${theme === 'dark' ? 'text-neon' : 'text-white hover:text-white font-semibold'}`}>Sign In</Link>
                </div>
            </GlassmorphicCard>
        </>
    );
}