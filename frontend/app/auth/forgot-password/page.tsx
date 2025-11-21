"use client";
import { FaEnvelope } from 'react-icons/fa';
import Button from '@/components/Button';
import Input from '@/components/Input';
import AuthHeader from '@/components/AuthHeader';
import GlassmorphicCard from '@/components/auth/GlassmorphicCard';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthTheme } from '../layout';

export default function ForgotPasswordPage() {
    const { theme } = useAuthTheme();
    const router = useRouter();

    return (
        <>
            <AuthHeader title="FORGOT PASSWORD" subtitle="Reset your Talenthium account password" theme={theme} />
            <GlassmorphicCard theme={theme}>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Email</label>
                        <Input
                            icon={<FaEnvelope />}
                            type="email"
                            placeholder="Enter your email here"
                        />
                    </div>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        router.push('/auth/otp-verification');
                    }}>Send Reset Link</Button>
                </form>
                <div className={`text-center mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-teal-100 font-medium'}`}>
                    Remembered your password?{' '}
                    <a href="/auth/login" className={`hover:underline transition-colors ${theme === 'dark' ? 'text-neon' : 'text-white hover:text-white font-semibold'}`}>Sign In</a>
                </div>
            </GlassmorphicCard>
        </>
    );
}