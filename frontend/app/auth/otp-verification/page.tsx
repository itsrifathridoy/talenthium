"use client";
import Button from '@/components/Button';
import AuthHeader from '@/components/AuthHeader';
import React, { useRef } from 'react';
import GlassmorphicCard from '@/components/auth/GlassmorphicCard';
import { useAuthTheme } from '../layout';

export default function OtpVerificationPage() {
    const { theme } = useAuthTheme();
    // Simple focus management for OTP inputs
    const inputs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        if (e.target.value.length === 1 && idx < 5) {
            inputs[idx + 1].current?.focus();
        }
    };

    return (
        <>
            <AuthHeader title="OTP VERIFICATION" subtitle="Enter the 6-digit code sent to your email" theme={theme} />
            <GlassmorphicCard theme={theme}>
                <form className="space-y-6">
                    <div className="flex justify-center gap-2 mb-4">
                        {inputs.map((ref, idx) => (
                            <input
                                key={idx}
                                ref={ref}
                                type="text"
                                maxLength={1}
                                className="w-12 h-14 text-3xl text-center rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-neon transition-all duration-150 text-white font-bold tracking-widest placeholder-gray-400"
                                onChange={e => handleChange(e, idx)}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                            />
                        ))}
                    </div>
                    <Button>Verify</Button>
                </form>
                <div className="text-center mt-4 text-sm">
                    <span className="text-gray-400">Didn&apos;t receive the code?{' '}</span>
                    <a href="#" className={`text-neon hover:underline font-medium transition-colors`}>Resend</a>
                </div>
                <div className="text-center mt-2 text-sm">
                    <a href="/auth/login" className={`text-neon hover:underline font-semibold transition-colors`}>Back to Login</a>
                </div>
            </GlassmorphicCard>
        </>
    );
}