"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from './WaitingCenter.module.css';
import CountdownTimer from './CountdownTimer';
import Logo from './Logo';

interface PlatformConfig {
    deploymentDate: string | null;
    referralDomain: string;
    docsUrl: string;
    twitterUrl: string;
    telegramUrl: string;
    waitlistStatusMessage: string;
    platformName: string;
}

interface WaitingCenterProps {
    userSession: any;
    onGoToDapp?: () => void;
    onLogout?: () => void;
}

export default function WaitingCenter({ userSession, onGoToDapp, onLogout }: WaitingCenterProps) {
    const [config, setConfig] = useState<PlatformConfig | null>(null);

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error('Failed to fetch config:', err));
    }, []);

    const getDeploymentTime = () => {
        if (config?.deploymentDate) {
            return new Date(config.deploymentDate);
        }
        const date = new Date();
        date.setDate(date.getDate() + 29);
        return date;
    };

    const referralDomain = config?.referralDomain || 'trenches.play';
    const statusMessage = config?.waitlistStatusMessage || 'WAITLIST PROTOCOL ACTIVE';

    return (
        <main className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.logo}>
                    <Logo platformName={config?.platformName} />
                </div>
                {onLogout && (
                    <button className={styles.logoutBtn} onClick={onLogout}>
                        [ LOGOUT ]
                    </button>
                )}
            </div>

            <header className={styles.header}>
                <div className={styles.userInfo}>
                    <h1 className={styles.title}>WAITING CENTER</h1>
                    <div className={styles.userHandle}>{userSession?.handle} // ID: 0x{userSession?.position}</div>
                </div>
                <div className={styles.statusBadge}>
                    <span className={styles.pulse}></span> ONLINE
                </div>
            </header>

            <section className={styles.dossierSection}>
                <div className={styles.dossierGrid}>
                    <div className={styles.dossierCard}>
                        <div className={styles.cardLabel}>QUEUE POSITION</div>
                        <div className={styles.cardValue}>#{userSession?.position || '1205'}</div>
                        <div className={styles.cardSub}>BELIEVERS AHEAD OF YOU</div>
                    </div>
                    <div className={styles.dossierCard}>
                        <div className={styles.cardLabel}>DEPLOYMENT WINDOW</div>
                        <div className={styles.timerWrapper}>
                            <CountdownTimer
                                targetDate={getDeploymentTime()}
                            />
                        </div>
                        <div className={styles.cardSub}>INDIVIDUAL LAUNCH TIMER</div>
                    </div>
                    <div className={styles.dossierCard}>
                        <div className={styles.cardLabel}>RECROOTMENT LINK</div>
                        <div className={styles.referralBox}>
                            <span className={styles.refLink}>{referralDomain}/ref/{userSession?.handle?.replace('@', '')}</span>
                            <button className={styles.copyBtn} onClick={() => {
                                navigator.clipboard.writeText(`${referralDomain}/ref/${userSession?.handle?.replace('@', '')}`);
                                alert('Link Copied');
                            }}>COPY</button>
                        </div>
                        <div className={styles.cardSub}>RECRUIT SOLDIERS TO MOVE UP</div>
                    </div>
                </div>
            </section>

            <section className={styles.intelSection}>
                <div className={styles.intelHeader}>TACTICAL INTEL</div>
                <p className={styles.intelContent}>
                    Reduce your waiting time by <span className={styles.intelHighlight}>creating content and posting</span> about Trenches. Proactive believers can <span className={styles.intelHighlight}>overtake non-active users</span>. It's not about who came first, but who wants it more.
                </p>
            </section>

            <div className={styles.emptyState}>
                <h3 className={styles.noActiveTitle}>NO ACTIVE DEPLOYMENTS</h3>
                <p className={styles.emptyDesc}>You are currently in the reserve. Spray into an active trench once deployment begins.</p>

                {onGoToDapp && (
                    <button className={styles.launchBtn} onClick={onGoToDapp}>
                        ENTER DAPP AREA
                    </button>
                )}
            </div>

            <footer className={styles.footer}>
                <p>{statusMessage} // ENLISTED: {userSession?.joinedAt}</p>
            </footer>
        </main>
    );
}
