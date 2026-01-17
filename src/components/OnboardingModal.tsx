"use client";

import { useState } from 'react';
import styles from './OnboardingModal.module.css';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (userData: any) => void;
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
    const [step, setStep] = useState(1);
    const [isSyncing, setIsSyncing] = useState(false);

    // Step 3: Wallets
    const [evmAddress, setEvmAddress] = useState('');
    const [solAddress, setSolAddress] = useState('');

    // Step 4: Verification
    const [verificationLink, setVerificationLink] = useState('');

    if (!isOpen) return null;

    const handleSocialMissions = () => setStep(2);

    const handleWalletSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    const handleFinalize = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({
            handle: '@tester',
            evmAddress,
            solAddress,
            verificationLink,
            position: 1205,
            joinedAt: new Date().toISOString()
        });
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
                            <a href="https://t.me/trenches" className={styles.missionButton} target="_blank">
                                <span className={styles.missionIcon}>📱</span>
                                <span className={styles.missionText}>JOIN TELEGRAM</span>
                            </a>
                            <a href="https://x.com/trenches/post/1" className={styles.missionButton} target="_blank">
                                <span className={styles.missionIcon}>𝕏</span>
                                <span className={styles.missionText}>FOLLOW AND COMMENT ON POST</span>
                            </a>
                        </div>
                        <button className={styles.nextBtn} onClick={handleSocialMissions}>CONTINUE REGISTRATION</button>
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
                        <p className={styles.descText}>You have been approved. To finalize your spot, announce your entry and submit the link.</p>

                        <div className={styles.verificationBox}>
                            <a
                                href="https://x.com/intent/tweet?text=Just%20signed%20up%20for%20the%20@Trenches%20waiting%20queue.%20Position%20%231205.%20Spray%20and%20Pray!"
                                className={styles.tweetBtn}
                                target="_blank"
                            >
                                𝕏 POST ENTRY STATUS
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
                            <button type="submit" className={styles.finalizeBtn}>FINALIZE REGISTRATION</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
