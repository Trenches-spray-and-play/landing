"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from './WaitlistDashboard.module.css';
import CountdownTimer from './CountdownTimer';
import Logo from './Logo';
import { Shield, Edit3, Check, X } from "lucide-react";

interface PlatformConfig {
    deploymentDate: string | null;
    referralDomain: string;
    docsUrl: string;
    twitterUrl: string;
    telegramUrl: string;
    waitlistStatusMessage: string;
    platformName: string;
}

interface WaitlistDashboardProps {
    userSession: any;
    onLogout?: () => void;
}

export default function WaitlistDashboard({ userSession, onLogout }: WaitlistDashboardProps) {
    const [config, setConfig] = useState<PlatformConfig | null>(null);
    const [copied, setCopied] = useState(false);

    // Wallet States
    const [isEditing, setIsEditing] = useState(false);
    const [evm, setEvm] = useState(userSession?.walletEvm || '');
    const [sol, setSol] = useState(userSession?.walletSol || '');
    const [tempEvm, setTempEvm] = useState(evm);
    const [tempSol, setTempSol] = useState(sol);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (userSession) {
            setEvm(userSession.walletEvm || '');
            setSol(userSession.walletSol || '');
        }
    }, [userSession]);

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
        return null;
    };

    const queuePosition = userSession?.position ?? '--';
    const referralCount = userSession?.referralCount ?? 0;
    const referralCode = userSession?.referralCode || 'LOADING';
    const handle = userSession?.handle || '@user';
    const referralDomain = config?.referralDomain || 'trenches.play';
    const statusMessage = config?.waitlistStatusMessage || 'WAITLIST PROTOCOL ACTIVE';

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://${referralDomain}/ref/${referralCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleStartEdit = () => {
        setTempEvm(evm);
        setTempSol(sol);
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/user/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletEvm: tempEvm,
                    walletSol: tempSol,
                    handle: userSession?.handle,
                    email: userSession?.email
                }),
            });
            const data = await res.json();
            if (data.success) {
                setEvm(tempEvm);
                setSol(tempSol);
                setIsEditing(false);
            } else {
                alert(data.error || 'Failed to update nodes');
            }
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className={styles.container}>
            <header className={styles.topHeader}>
                <Logo platformName={config?.platformName} />
            </header>
            {/* Compact Identity Hub - Refined Bento Style */}
            <div className={`${styles.bentoHub} ${styles.glass}`}>
                <div className={styles.profileSide}>
                    <span className={styles.handle}>{handle}</span>
                    <span className={styles.referralStat}>REFERRALS: <span>{referralCount}</span></span>
                </div>

                <span className={styles.referral}>{referralDomain}/ref/{referralCode}</span>

                <div className={styles.hubActions}>
                    <button className={styles.copyBtn} onClick={handleCopy}>
                        {copied ? 'COPIED' : 'COPY LINK'}
                    </button>
                    {onLogout && (
                        <button className={styles.logoutBtn} onClick={onLogout}>
                            LOGOUT
                        </button>
                    )}
                </div>
            </div>

            {/* Payout Strip - Compact Specification V1 */}
            <div className={`${styles.payoutStrip} ${styles.glass} ${isEditing ? styles.editing : ''}`}>
                <div className={styles.stripLabel}>
                    <Shield size={12} className={styles.iconGreen} />
                    <span>PAYOUT_NODES</span>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.nodeGroup}>
                    <span className={styles.nodePrefix}>EVM</span>
                    {!isEditing ? (
                        <span className={styles.nodeText}>{evm ? `${evm.slice(0, 6)}...${evm.slice(-4)}` : 'NOT_SET'}</span>
                    ) : (
                        <input
                            className={styles.stripInput}
                            value={tempEvm}
                            onChange={e => setTempEvm(e.target.value)}
                            placeholder="0x..."
                        />
                    )}
                </div>

                <div className={styles.divider}></div>

                <div className={styles.nodeGroup}>
                    <span className={styles.nodePrefix}>SOL</span>
                    {!isEditing ? (
                        <span className={styles.nodeText}>{sol ? `${sol.slice(0, 6)}...${sol.slice(-4)}` : 'NOT_SET'}</span>
                    ) : (
                        <input
                            className={styles.stripInput}
                            value={tempSol}
                            onChange={e => setTempSol(e.target.value)}
                            placeholder="Address..."
                        />
                    )}
                </div>

                <div className={styles.divider}></div>

                <div className={styles.stripActions}>
                    {!isEditing ? (
                        <button className={styles.editBtn} onClick={handleStartEdit}><Edit3 size={14} /></button>
                    ) : (
                        <>
                            <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
                                {isSaving ? '...' : <Check size={14} />}
                            </button>
                            <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}><X size={14} /></button>
                        </>
                    )}
                </div>
            </div>

            {/* Centered Hero Card - Zenith Elite Standard */}
            <div className={`${styles.heroCard} ${styles.glass}`}>
                <div className={styles.customCopy}>
                    Overtake the competition by <br /> creating high-value content.
                </div>

                <div className={styles.queueBox}>
                    <p className={styles.queueLabel}>QUEUE POSITION</p>
                    <p className={styles.queueValue}>#{queuePosition}</p>
                </div>

                <div className={styles.timerFooter}>
                    {getDeploymentTime() && (
                        <CountdownTimer targetDate={getDeploymentTime()!} simple={true} />
                    )}
                </div>
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerLinks} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.7rem', opacity: 0.6 }}>
                    <a href={config?.twitterUrl || "#"} target="_blank" rel="noopener noreferrer">𝕏 TWITTER</a>
                    <a href={config?.telegramUrl || "#"} target="_blank" rel="noopener noreferrer">TELEGRAM</a>
                    <a href={config?.docsUrl || "#"} target="_blank" rel="noopener noreferrer">DOCS</a>
                </div>
                <p className={styles.footerText}>{statusMessage} // CORE_STABLE_V1.1_ELITE</p>
            </footer>
        </main>
    );
}
