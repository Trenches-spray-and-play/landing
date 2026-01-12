"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { MOCK_TRENCHES, TrenchData, Participant, BLT_CONTRACT_ADDRESS } from '@/lib/mockData';
import QueueList from '@/components/QueueList';
import SprayModal from '@/components/SprayModal';
import ValidationModal from '@/components/ValidationModal';
import Link from 'next/link';

import PositionDashboard from '@/components/PositionDashboard';
import AuthModal from '@/components/AuthModal';
import OnboardingModal from '@/components/OnboardingModal';
import { useRouter } from 'next/navigation';

export default function TrenchPage() {
    const params = useParams();
    const router = useRouter();
    const [trench, setTrench] = useState<TrenchData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidationOpen, setIsValidationOpen] = useState(false);

    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);

    // Unwrap params to get ID safely
    const trenchId = params?.id as string;

    useEffect(() => {
        if (trenchId && MOCK_TRENCHES[trenchId]) {
            setTrench(MOCK_TRENCHES[trenchId]);
        }
        // Check mock session
        const session = localStorage.getItem('user_session');
        if (session) setIsLoggedIn(true);
    }, [trenchId]);

    const handleSprayClick = () => {
        if (!isLoggedIn) {
            setShowAuth(true);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        setShowAuth(false);
        setShowOnboarding(true);
    };

    const handleOnboardingComplete = (data: any) => {
        console.log('Onboarding Data:', data);
        localStorage.setItem('user_session', 'true');
        // Dispatch event for BottomNav
        window.dispatchEvent(new Event('session-update'));

        setIsLoggedIn(true);
        setShowOnboarding(false);
        setIsModalOpen(true); // Proceed to spray
    };

    const handleSprayConfirm = () => {
        if (!trench) return;

        // Add mock participant
        const newParticipant: Participant = {
            id: `new-${Date.now()}`,
            handle: '@you',
            beliefScore: 0,
            boostPoints: 0,
            entryAmount: parseInt(trench.entrySize),
            timeAgo: 'Just now',
            status: 'pending' // Pending first
        };

        setTrench({
            ...trench,
            participants: [newParticipant, ...trench.participants]
        });

        // Persist user position to localStorage
        const userPosition = {
            trenchId: trench.id,
            handle: '@you',
            beliefScore: 0,
            boostPoints: 0,
            entryAmount: parseInt(trench.entrySize),
            timestamp: new Date().toISOString()
        };

        // Load existing positions
        const existingPositions = localStorage.getItem('user_positions');
        const positions = existingPositions ? JSON.parse(existingPositions) : [];

        // Add new position if not already exists
        if (!positions.some((p: any) => p.trenchId === trench.id)) {
            positions.push(userPosition);
            localStorage.setItem('user_positions', JSON.stringify(positions));
        }

        // Redirect to dashboard after completing spray and social tasks
        router.push('/dashboard');
    };

    const handleBoost = (id: string) => {
        if (!trench) return;

        setTrench({
            ...trench,
            participants: trench.participants.map(p =>
                p.id === id ? { ...p, beliefScore: p.beliefScore + 100 } : p
            ).sort((a, b) => b.beliefScore - a.beliefScore) // Re-sort
        });
    };

    // Check if user is already in queue
    const userParticipant = trench?.participants?.find(p => p.handle === '@you');
    const userRank = userParticipant && trench?.participants ? trench.participants.indexOf(userParticipant) + 1 : 0;

    if (!trench) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>LOADING TRENCH DATA...</div>
                <Link href="/" className={styles.backLink}>&lt; RETURN TO BASE</Link>
            </div>
        );
    }

    const getLevelColor = () => {
        switch (trench.level) {
            case 'RAPID': return 'var(--accent-rapid)';
            case 'MID': return 'var(--accent-mid)';
            case 'DEEP': return 'var(--accent-deep)';
            default: return 'var(--text-primary)';
        }
    };

    return (
        <main className={styles.container}>
            {/* Auth Flows */}
            <AuthModal
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                onSuccess={handleAuthSuccess}
            />
            <OnboardingModal
                isOpen={showOnboarding}
                onClose={() => setShowOnboarding(false)}
                onComplete={handleOnboardingComplete}
            />


            {/* Spray Modal for New Entry */}
            <SprayModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleSprayConfirm}
                trench={trench}
            />

            {/* Boost Validation Modal */}
            <ValidationModal
                isOpen={isValidationOpen}
                onComplete={() => {
                    setIsValidationOpen(false);
                    if (userParticipant) handleBoost(userParticipant.id);
                }}
            />

            {/* Header */}
            <header className={styles.header}>
                <Link href="/" className={styles.backLink}>&lt; BACK</Link>
                <div>
                    <h1 className={styles.title} style={{ color: getLevelColor() }}>
                         //{trench.level} TRENCH
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            marginTop: '8px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-mono)'
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(BLT_CONTRACT_ADDRESS);
                            alert('Contract Copied: ' + BLT_CONTRACT_ADDRESS);
                        }}
                    >
                        <span style={{ color: 'var(--accent-blt)', fontWeight: 'bold' }}>$BLT:</span>
                        <span style={{ textDecoration: 'underline dotted' }}>
                            {BLT_CONTRACT_ADDRESS.slice(0, 8)}...{BLT_CONTRACT_ADDRESS.slice(-6)}
                        </span>
                        <span>📋</span>
                    </div>
                </div>
                <div className={styles.liveIndicator}>
                    <span className={styles.dot}></span> LIVE
                </div>
            </header>

            {/* Stats Grid */}
            <section className={styles.statsGrid}>
                <div className={styles.statBox}>
                    <span className={styles.label}>ENTRY</span>
                    <span className={styles.value}>{trench.entrySize} $BLT</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.label}>ROI CAP</span>
                    <span className={styles.value}>{trench.roiCap}</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.label}>WAIT TIME</span>
                    <span className={styles.value}>{trench.cadence}</span>
                </div>
            </section>

            {/* Reserve Bar */}
            <div className={styles.reserveSection} style={{ marginBottom: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
                    <span>RESERVES</span>
                    <span>{trench.reserves} $BLT LEFT</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '65%', background: getLevelColor() }}></div>
                </div>
            </div>

            {/* Queue Visualization */}
            <QueueList participants={trench.participants} onBoost={handleBoost} />

            {/* Sticky Action Container - Conditional */}
            <div className={styles.actionContainer}>
                {userParticipant ? (
                    <PositionDashboard
                        trench={trench}
                        onBoost={() => setIsValidationOpen(true)}
                    />
                ) : (
                    <button
                        className={styles.sprayButton}
                        onClick={handleSprayClick}
                        style={{
                            borderColor: getLevelColor(),
                            color: getLevelColor(),
                            boxShadow: `0 0 10px ${getLevelColor()}40`
                        }}
                    >
                        SPRAY {trench.entrySize} $BLT
                    </button>
                )}
            </div>
        </main>
    );
}
