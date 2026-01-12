"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { MOCK_TRENCHES, TrenchData } from '@/lib/mockData';
import ValidationModal from '@/components/ValidationModal';
import PositionDashboard from '@/components/PositionDashboard';

interface UserPosition {
    trenchId: string;
    handle: string;
    beliefScore: number;
    boostPoints: number;
    entryAmount: number;
    timestamp: string;
}

interface PostFeedItem {
    id: string;
    author: string;
    platform: 'X' | 'Farcaster' | 'Telegram';
    content: string;
    postUrl: string;
    timestamp: string;
}

// Mock post feed data (in real app, fetch from submitted links)
const MOCK_POST_FEED: PostFeedItem[] = [
    { id: '1', author: '@cryptoknight', platform: 'X', content: 'Just sprayed into RAPID! LFG 🚀 #Trenches', postUrl: 'https://x.com/user/status/123', timestamp: '2m ago' },
    { id: '2', author: '@wagmi_girl', platform: 'Farcaster', content: 'Belief coordination is the future. Sprayed $BLT into the trenches!', postUrl: 'https://warpcast.com/user/cast/456', timestamp: '5m ago' },
    { id: '3', author: '@solanarunner', platform: 'Telegram', content: 'Who else is in the MID trench? 💪', postUrl: 'https://t.me/trenches/789', timestamp: '12m ago' },
    { id: '4', author: '@diamond_hands', platform: 'X', content: 'DEEP trench activated. No paper hands here! 💎', postUrl: 'https://x.com/user/status/321', timestamp: '18m ago' },
];

export default function DashboardPage() {
    const router = useRouter();
    const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
    const [myTrenches, setMyTrenches] = useState<TrenchData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isValidationOpen, setIsValidationOpen] = useState(false);

    // Load user positions from localStorage
    useEffect(() => {
        const session = localStorage.getItem('user_session');
        if (!session) {
            router.push('/');
            return;
        }

        // Load persisted positions
        const savedPositions = localStorage.getItem('user_positions');
        if (savedPositions) {
            const positions = JSON.parse(savedPositions);
            setUserPositions(positions);

            // Also load full trench data for PositionDashboard
            const trenches = positions.map((pos: UserPosition) => {
                const trench = Object.values(MOCK_TRENCHES).find(t => t.id === pos.trenchId);
                if (trench) {
                    // Inject @you participant into mock data if not present
                    const hasUser = trench.participants.some(p => p.handle === '@you');
                    if (!hasUser) {
                        return {
                            ...trench,
                            participants: [
                                {
                                    id: 'user-id',
                                    handle: '@you',
                                    beliefScore: pos.beliefScore,
                                    boostPoints: pos.boostPoints,
                                    entryAmount: pos.entryAmount,
                                    timeAgo: 'Just now',
                                    status: 'active'
                                } as any,
                                ...trench.participants
                            ]
                        };
                    }
                }
                return trench;
            }).filter(Boolean) as TrenchData[];
            setMyTrenches(trenches);
        }
        setLoading(false);
    }, [router]);

    const handleBoost = () => {
        setIsValidationOpen(false);
    };

    if (loading) return <div className={styles.loading}>LOADING COMMAND...</div>;

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>COMMAND CENTER</h1>
                <div className={styles.status}>ONLINE</div>
            </header>

            {userPositions.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>NO ACTIVE POSITIONS</p>
                    <Link href="/" className={styles.sprayBtn}>INITIATE SPRAY</Link>
                </div>
            ) : (
                <>
                    {/* Detailed Position Dashboard (original component) */}
                    {myTrenches.map(trench => (
                        <PositionDashboard
                            key={trench.id}
                            trench={trench}
                            onBoost={() => setIsValidationOpen(true)}
                        />
                    ))}

                    {/* Live Post Feed */}
                    <section className={styles.feedSection}>
                        <h2 className={styles.sectionTitle}>LIVE COMMUNITY FEED</h2>
                        <p className={styles.feedDesc}>Recent posts from trench participants</p>

                        <div className={styles.postFeed}>
                            {MOCK_POST_FEED.map(post => (
                                <div key={post.id} className={styles.postCard}>
                                    <div className={styles.postHeader}>
                                        <span className={styles.postAuthor}>{post.author}</span>
                                        <span className={styles.postPlatform}>{post.platform}</span>
                                        <span className={styles.postTime}>{post.timestamp}</span>
                                    </div>
                                    <p className={styles.postContent}>{post.content}</p>
                                    <a
                                        href={post.postUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.postLink}
                                    >
                                        VIEW POST →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            <ValidationModal
                isOpen={isValidationOpen}
                onComplete={handleBoost}
            />
        </main>
    );
}
