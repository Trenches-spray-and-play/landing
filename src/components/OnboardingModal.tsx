"use client";

import { useState, useEffect } from 'react';
import styles from './OnboardingModal.module.css';
import { Check } from 'lucide-react';

interface PlatformConfig {
    telegramUrl: string;
    twitterUrl: string;
    onboardingTweetText: string;
}

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (userData: any) => void;
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
    const [step, setStep] = useState(1);
    const [isSyncing, setIsSyncing] = useState(false);
    const [config, setConfig] = useState<PlatformConfig | null>(null);

    // Social task states - now tracks both "clicked" and "confirmed"
    const [telegramClicked, setTelegramClicked] = useState(false);
    const [twitterClicked, setTwitterClicked] = useState(false);
    const [telegramConfirmed, setTelegramConfirmed] = useState(false);
    const [twitterConfirmed, setTwitterConfirmed] = useState(false);

    // Step 2: Verification
    const [verificationLink, setVerificationLink] = useState('');

    // Persistence helper
    const STORAGE_KEY = 'trenches_onboarding_state';

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error('Failed to fetch config:', err));

        // Restore state from localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.step) setStep(data.step);
                if (data.verificationLink) setVerificationLink(data.verificationLink);
            } catch (e) {
                console.error("Failed to restore onboarding state");
            }
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (isOpen) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                step,
                verificationLink
            }));
        }
    }, [step, verificationLink, isOpen]);

    if (!isOpen) return null;

    // Config values with fallbacks
    const telegramUrl = config?.telegramUrl || 'https://t.me/trenchesprotocol';
    const twitterUrl = config?.twitterUrl || 'https://x.com/traboraofficial';
    const tweetText = encodeURIComponent(config?.onboardingTweetText || 'Just enlisted in the @traboraofficial deployment queue. Spray and Pray! 🔫\n\nhttps://trenches.play');

    const handleSocialMissions = () => setStep(2);

    const handleTelegramClick = () => {
        setTelegramClicked(true);
    };

    const handleTwitterClick = () => {
        setTwitterClicked(true);
    };

    const handleFinalize = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSyncing(true);
        try {
            const res = await fetch('/api/user/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referredByCode: localStorage.getItem('referralCode') || undefined,
                    verificationLink,
                }),
            });
            const data = await res.json();
            if (data.success && data.user) {
                localStorage.removeItem(STORAGE_KEY); // Clear stickiness on completion
                onComplete(data.user);
            } else {
                alert(data.error || 'Failed to finalize enlistment');
            }
        } catch (err) {
            console.error('Sync error:', err);
            alert('Internal server error');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>

                <div className={styles.stepper}>
                    <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>01</div>
                    <div className={styles.line}></div>
                    <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>02</div>
                </div>

                {step === 1 && (
                    <div className={styles.content}>
                        <h2 className={styles.title}>SOCIAL INTEL</h2>
                        <p className={styles.desc}>Join the command center and coordinate with other believers.</p>
                        <div className={styles.missionGrid}>
                            {/* Telegram Task */}
                            <div className={styles.missionItem}>
                                <a
                                    href={telegramUrl}
                                    className={`${styles.missionButton} ${telegramConfirmed ? styles.completed : ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleTelegramClick}
                                >
                                    <span className={styles.missionIcon}>
                                        {telegramConfirmed ? <Check size={18} color="#00ff00" /> : '📱'}
                                    </span>
                                    <span className={styles.missionText}>JOIN TELEGRAM</span>
                                </a>
                                {telegramClicked && !telegramConfirmed && (
                                    <label className={styles.confirmLabel}>
                                        <input
                                            type="checkbox"
                                            checked={telegramConfirmed}
                                            onChange={(e) => setTelegramConfirmed(e.target.checked)}
                                            className={styles.confirmCheckbox}
                                        />
                                        <span>I joined the Telegram</span>
                                    </label>
                                )}
                            </div>

                            {/* Twitter Task */}
                            <div className={styles.missionItem}>
                                <a
                                    href={twitterUrl}
                                    className={`${styles.missionButton} ${twitterConfirmed ? styles.completed : ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleTwitterClick}
                                >
                                    <span className={styles.missionIcon}>
                                        {twitterConfirmed ? <Check size={18} color="#00ff00" /> : '𝕏'}
                                    </span>
                                    <span className={styles.missionText}>FOLLOW ON X</span>
                                </a>
                                {twitterClicked && !twitterConfirmed && (
                                    <label className={styles.confirmLabel}>
                                        <input
                                            type="checkbox"
                                            checked={twitterConfirmed}
                                            onChange={(e) => setTwitterConfirmed(e.target.checked)}
                                            className={styles.confirmCheckbox}
                                        />
                                        <span>I followed on X</span>
                                    </label>
                                )}
                            </div>
                        </div>
                        <button
                            className={styles.nextBtn}
                            onClick={handleSocialMissions}
                            disabled={!telegramConfirmed || !twitterConfirmed}
                        >
                            CONTINUE ENLISTMENT
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.content}>
                        <h2 className={styles.title}>CONGRATULATIONS</h2>
                        <p className={styles.descText}>You have been drafted. To finalize your spot, announce your deployment and submit the link.</p>

                        <div className={styles.verificationBox}>
                            <a
                                href={`https://x.com/intent/tweet?text=${tweetText}`}
                                className={styles.tweetBtn}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                𝕏 POST DEPLOYMENT STATUS
                            </a>
                        </div>

                        <form onSubmit={handleFinalize} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>SUBMIT X POST LINK</label>
                                <input
                                    type="url"
                                    placeholder="https://x.com/status/..."
                                    className={styles.input}
                                    value={verificationLink}
                                    onChange={(e) => setVerificationLink(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.finalizeBtn} disabled={isSyncing}>
                                {isSyncing ? 'FINALIZING...' : 'FINALIZE ENLISTMENT'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
