"use client";

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ReferralRedirect() {
    const params = useParams();
    const router = useRouter();
    const code = params.code as string;

    useEffect(() => {
        if (code) {
            // Save referral code for later onboarding/enlistment
            localStorage.setItem('referralCode', code);

            // Redirect to the home landing page
            router.push('/');
        } else {
            router.push('/');
        }
    }, [code, router]);

    return (
        <main style={{
            minHeight: '100vh',
            background: '#000',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
        }}>
            <p style={{ letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
                INITIALIZING WAITLIST PROTOCOL...
            </p>
        </main>
    );
}
