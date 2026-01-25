"use client";

import { useState, useEffect } from 'react';
import styles from './OnboardingModal.module.css';
import { Check, AlertCircle, Loader2 } from 'lucide-react';

interface PlatformConfig {
    telegramUrl: string;
    twitterUrl: string;
    onboardingTweetText: string;
    referralDomain: string;
}

interface UserData {
    id: string;
    handle: string;
    referralCode: string;
    position: number;
    beliefScore: number;
    boostPoints: number;
    joinedAt: string;
    referralCount: number;
}

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (userData: UserData) => void;
}

// Validate Twitter/X URL format
function isValidTwitterUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return (parsed.hostname === 'twitter.com' || parsed.hostname === 'x.com') &&
               (parsed.pathname.includes('/status/') || parsed.pathname.includes('/i/'));
    } catch {
        return false;
    }
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
    const [step, setStep] = useState(1);
    const [isSyncing, setIsSyncing] = useState(false);
    const [config, setConfig] = useState<PlatformConfig | null>(null);
    const [configLoading, setConfigLoading] = useState(true);

    // Error and success states
    const [error, setError] = useState<string | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);

    // Social task states - tracks both "clicked" and "confirmed"
    const [telegramClicked, setTelegramClicked] = useState(false);
    const [twitterClicked, setTwitterClicked] = useState(false);
    const [telegramConfirmed, setTelegramConfirmed] = useState(false);
    const [twitterConfirmed, setTwitterConfirmed] = useState(false);

    // Step 2: Verification
    const [verificationLink, setVerificationLink] = useState('');

    // Persistence helper
    const STORAGE_KEY = 'trenches_onboarding_state';

    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return;

        setConfigLoading(true);
        fetch('/api/config')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch config');
                return res.json();
            })
            .then(data => setConfig(data))
            .catch(err => console.error('Failed to fetch config:', err))
            .finally(() => setConfigLoading(false));

        // Restore state from localStorage
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                if (data.step) setStep(data.step);
                if (data.verificationLink) setVerificationLink(data.verificationLink);
                // Also restore social confirmation states
                if (data.telegramConfirmed) {
                    setTelegramClicked(true);
                    setTelegramConfirmed(true);
                }
                if (data.twitterConfirmed) {
                    setTwitterClicked(true);
                    setTwitterConfirmed(true);
                }
            }
        } catch (e) {
            console.error("Failed to restore onboarding state");
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (isOpen) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                step,
                verificationLink,
                telegramConfirmed,
                twitterConfirmed
            }));
        }
    }, [step, verificationLink, telegramConfirmed, twitterConfirmed, isOpen]);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (!isOpen) return null;

    // Config values with fallbacks
    const telegramUrl = config?.telegramUrl || 'https://t.me/trenchesprotocol';
    const twitterUrl = config?.twitterUrl || 'https://x.com/traboraofficial';
    const referralDomain = config?.referralDomain || 'playtrenches.xyz';
    const defaultTweetText = `Just enlisted in the @traboraofficial deployment queue. Spray and Pray!\n\nhttps://${referralDomain}`;
    const tweetText = encodeURIComponent(config?.onboardingTweetText || defaultTweetText);

    const handleSocialMissions = () => {
        setError(null);
        setStep(2);
    };

    const handleTelegramClick = () => {
        setTelegramClicked(true);
    };

    const handleTwitterClick = () => {
        setTwitterClicked(true);
    };

    const handleVerificationLinkChange = (value: string) => {
        setVerificationLink(value);
        setUrlError(null);

        // Validate as user types (only show error if they've typed something)
        if (value && !isValidTwitterUrl(value)) {
            setUrlError('Please enter a valid Twitter/X post URL (e.g., https://x.com/user/status/123...)');
        }
    };

    const handleFinalize = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setUrlError(null);

        // Final validation
        if (!verificationLink) {
            setUrlError('Please enter your verification post URL');
            return;
        }

        if (!isValidTwitterUrl(verificationLink)) {
            setUrlError('Please enter a valid Twitter/X post URL');
            return;
        }

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

            if (res.ok && data.success && data.user) {
                // Clear persistence on success
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem('referralCode');
                onComplete(data.user);
            } else {
                // Handle validation errors
                if (data.details && Array.isArray(data.details)) {
                    setError(data.details.join(' '));
                } else {
                    setError(data.error || 'Failed to finalize enlistment. Please try again.');
                }
            }
        } catch (err) {
            console.error('Sync error:', err);
            setError('Network error. Please check your connection and try again.');
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

                {/* Error Toast */}
                {error && (
                    <div className={styles.errorToast}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                {step === 1 && (
                    <div className={styles.content}>
                        <h2 className={styles.title}>SOCIAL INTEL</h2>
                        <p className={styles.desc}>Join the command center and coordinate with other believers.</p>

                        {configLoading ? (
                            <div className={styles.loadingState}>
                                <Loader2 size={24} className={styles.spinner} />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
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
                                    placeholder="https://x.com/yourname/status/123..."
                                    className={`${styles.input} ${urlError ? styles.inputError : ''}`}
                                    value={verificationLink}
                                    onChange={(e) => handleVerificationLinkChange(e.target.value)}
                                    required
                                    disabled={isSyncing}
                                />
                                {urlError && (
                                    <p className={styles.fieldError}>{urlError}</p>
                                )}
                            </div>
                            <button type="submit" className={styles.finalizeBtn} disabled={isSyncing || !!urlError}>
                                {isSyncing ? (
                                    <>
                                        <Loader2 size={16} className={styles.spinner} />
                                        FINALIZING...
                                    </>
                                ) : (
                                    'FINALIZE ENLISTMENT'
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
