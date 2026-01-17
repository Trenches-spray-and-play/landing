"use client";

import { useState } from "react";
import styles from "./page.module.css";
import CountdownTimer from "@/components/CountdownTimer";

import FlowChart from "@/components/FlowChart";
import OnboardingModal from "@/components/OnboardingModal";
import WaitingCenter from "@/components/WaitingCenter";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function WelcomePage() {
    const router = useRouter();
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [userSession, setUserSession] = useState<any>(null);

    // Set global launch goal to 30 days from now
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

    const handleSignUp = () => {
        setIsAuthenticating(true);
        // Simulate X Authentication
        setTimeout(() => {
            setIsAuthenticating(false);
            setIsOnboardingOpen(true);
        }, 1500);
    };

    const handleOnboardingComplete = (userData: any) => {
        setUserSession(userData);
        localStorage.setItem('user_session', JSON.stringify(userData));
        setIsOnboardingOpen(false);
    };

    const handleLogout = () => {
        setUserSession(null);
        localStorage.removeItem('user_session');
    };

    const goToDapp = () => {
        if (!userSession) return;
        // Determine the redirect base URL (local vs prod)
        const isLocal = window.location.hostname === 'localhost';
        const dappBase = isLocal ? 'http://localhost:3001' : 'https://trenches-web.vercel.app';

        // Pass session data via query parameter for cross-origin handoff
        const sessionData = encodeURIComponent(JSON.stringify(userSession));
        window.location.href = `${dappBase}/dashboard?session=${sessionData}`;
    };

    if (userSession) {
        return <WaitingCenter userSession={userSession} onGoToDapp={goToDapp} onLogout={handleLogout} />;
    }

    return (
        <main className={styles.container}>
            {/* Header / Logo */}
            <header className={styles.header}>
                <Logo variant="horizontal" width={240} />
            </header>

            {/* Section 1: Hero */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h2 className={styles.mainHeadline}>SPRAY & PLAY</h2>
                    <p className={styles.subHeadline}>
                        Where Tokens Earn Belief. The first non-custodial coordination layer
                        for token incubation and community distribution.
                    </p>
                    <div className={styles.ctaGroup}>
                        <div className={styles.heroStatusBox}>
                            <div className={styles.statusLine}>
                                <span className={styles.pulse}></span> ONLINE_SPRAY_PROTOCOL_ACTIVE
                            </div>
                            <div className={styles.believersCount}>
                                <span className={styles.count}>12,405</span> BELIEVERS CURRENTLY IN THE TRENCHES
                            </div>
                        </div>
                        <button
                            className={styles.enlistBtn}
                            onClick={handleSignUp}
                            disabled={isAuthenticating}
                        >
                            {isAuthenticating ? 'AUTHENTICATING...' : '[ SIGN UP WITH X ]'}
                        </button>
                    </div>
                </div>

                <div className={styles.globalTimer}>
                    <CountdownTimer targetDate={thirtyDaysLater} label="GLOBAL LAUNCH COUNTDOWN" />
                </div>
            </section>



            {/* Section 2: Core Use Cases */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>WHY THE TRENCHES?</h3>
                <div className={styles.useCaseGrid}>
                    <div className={styles.useCaseCard}>
                        <h4>PRE-MARKET INCUBATION</h4>
                        <p>Build a massive, verified holder base before the token even hits the open market.</p>
                    </div>
                    <div className={styles.useCaseCard}>
                        <h4>HYPER-VISIBILITY</h4>
                        <p>Force social engagement. No post = no payout. Direct belief coordination.</p>
                    </div>
                    <div className={styles.useCaseCard}>
                        <h4>COMMUNITY CTOs</h4>
                        <p>Revive "dead" tokens by restructuring distribution through verified belief.</p>
                    </div>
                </div>
            </section>

            {/* Section 3: Game Mechanic */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>THE GAME MECHANIC</h3>
                <div className={styles.mechanicGrid}>
                    <div className={styles.mechanicCard}>
                        <div className={styles.cardHeader}>SPRAY</div>
                        <p>Choose your entry (e.g $100) in project tokens.</p>
                    </div>
                    <div className={styles.mechanicCard}>
                        <div className={styles.cardHeader}>PLAY</div>
                        <p>Complete mandatory social tasks and verify peer activity.</p>
                    </div>
                    <div className={styles.mechanicCard}>
                        <div className={styles.cardHeader}>EARN</div>
                        <p>Receive a 50% ROI paid in tokens directly from other participants.</p>
                    </div>
                </div>
            </section>

            {/* Section 4: Tactical Flow Chart */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>QUEUE SETTLEMENT LOGIC</h3>
                <FlowChart />
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerLine}>TRENCHES PROTOCOL // v1.0.4-BETA</div>
                <div className={styles.footerLinks}>
                    <a href="#">X_INTEL</a>
                    <a href="#">TG_COMMAND</a>
                    <a href="#">DOCS_OPS</a>
                </div>
            </footer>

            <OnboardingModal
                isOpen={isOnboardingOpen}
                onClose={() => setIsOnboardingOpen(false)}
                onComplete={handleOnboardingComplete}
            />
        </main>
    );
}
