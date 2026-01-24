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

    // Social task states
    const [telegramConfirmed, setTelegramConfirmed] = useState(false);
    const [twitterConfirmed, setTwitterConfirmed] = useState(false);

    // Step 3: Wallets
    const [evmAddress, setEvmAddress] = useState('');
    const [solAddress, setSolAddress] = useState('');

    // Step 4: Verification
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
                if (data.evmAddress) setEvmAddress(data.evmAddress);
                if (data.solAddress) setSolAddress(data.solAddress);
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
                evmAddress,
                solAddress,
                verificationLink
            }));
        }
    }, [step, evmAddress, solAddress, verificationLink, isOpen]);

    if (!isOpen) return null;

    // Config values with fallbacks
    const telegramUrl = config?.telegramUrl || 'https://t.me/trenchesprotocol';
    const twitterUrl = config?.twitterUrl || 'https://x.com/traboraofficial';
    const tweetText = encodeURIComponent(config?.onboardingTweetText || 'Just enlisted in the @traboraofficial deployment queue. Spray and Pray! 🔫\n\nhttps://trenches.play');

    const handleSocialMissions = () => setStep(2);

    const handleTelegramClick = () => {
        setTimeout(() => setTelegramConfirmed(true), 10000);
    };

    const handleTwitterClick = () => {
        setTimeout(() => setTwitterConfirmed(true), 10000);
    };

    const handleWalletSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    const handleFinalize = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSyncing(true);
        try {
            const res = await fetch('/api/user/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletEvm: evmAddress,
                    walletSol: solAddress,
                    referredByCode: localStorage.getItem('referralCode') || undefined,
                    // Handle will be generated/updated in backend if not provided
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
                    <div className={styles.line}></div>
                    <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>03</div>
                </div>

                {step === 1 && (
                    <div className={styles.content}>
                        <h2 className={styles.title}>SOCIAL INTEL</h2>
                        <p className={styles.desc}>Join the command center and coordinate with other believers.</p>
                        <div className={styles.missionGrid}>
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
                        <h2 className={styles.title}>SECURE PAYOUT NODES</h2>
                        <p className={styles.desc}>Enter your addresses to receive automated P2P settlements.</p>
                        <form onSubmit={handleWalletSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>EVM ADDRESS (ETH no CEX address)</label>
                                <input
                                    type="text"
                                    placeholder="0x..."
                                    className={styles.input}
                                    value={evmAddress}
                                    onChange={(e) => setEvmAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>SOLANA ADDRESS</label>
                                <input
                                    type="text"
                                    placeholder="Address..."
                                    className={styles.input}
                                    value={solAddress}
                                    onChange={(e) => setSolAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.submitBtn}>BIND ADDRESSES</button>
                        </form>
                    </div>
                )}

                {step === 3 && (
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
