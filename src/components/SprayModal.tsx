"use client";

import { useState, useEffect } from "react";
import styles from "./SprayModal.module.css";
import ValidationModal from './ValidationModal';
import Countdown from './Countdown';
import { MOCK_WALLET_ADDRESS, TrenchData, getMaxAllowedEntry } from '@/lib/mockData';

interface SprayModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    trench: TrenchData;
}

export default function SprayModal({ isOpen, onClose, onConfirm, trench }: SprayModalProps) {
    const [step, setStep] = useState<'idle' | 'transferring' | 'verifying' | 'success'>('idle');
    const [showValidation, setShowValidation] = useState(false);

    // Mock user belief score (in real app, get from user profile)
    const [userBeliefScore] = useState(450); // Mock value

    // Input State - BLT amount
    const [bltInput, setBltInput] = useState<string>('1000');

    // Derived values
    const parsedBlt = parseFloat(bltInput) || 0;
    const maxAllowed = getMaxAllowedEntry(userBeliefScore, trench.maxEntry);
    const isValidAmount = parsedBlt >= trench.minEntry && parsedBlt <= maxAllowed;

    // ROI Calculation
    const roiAmount = Math.floor(parsedBlt * trench.roiMultiplier);
    const targetAddress = MOCK_WALLET_ADDRESS;

    useEffect(() => {
        if (isOpen) {
            setStep('idle');
            setBltInput(trench.minEntry.toString());
        }
    }, [isOpen, trench.minEntry]);

    const handleStartSpray = () => {
        if (!isValidAmount) return;
        setStep('transferring');
    };

    const handleSent = async () => {
        setStep('verifying');
        // Mock on-chain verification delay
        await new Promise(resolve => setTimeout(resolve, 3500));
        // Trigger validation flow
        setShowValidation(true);
    };

    const handleValidationComplete = () => {
        setShowValidation(false);
        setStep('success');
        setTimeout(() => {
            onConfirm();
            onClose();
        }, 1500);
    };

    if (!isOpen) return null;

    if (showValidation) {
        return <ValidationModal isOpen={true} onComplete={handleValidationComplete} />;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {step === 'idle' && (
                    <>
                        <h3 className={styles.title}>INITIATE SPRAY</h3>
                        <p className={styles.description}>
                            Enter Amount ({trench.minEntry.toLocaleString()} - {maxAllowed.toLocaleString()} $BLT)
                        </p>

                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                value={bltInput}
                                onChange={(e) => setBltInput(e.target.value)}
                                className={styles.amountInput}
                                min={trench.minEntry}
                                max={maxAllowed}
                                placeholder="1000"
                            />
                            <span className={styles.currencyPrefix}>$BLT</span>
                        </div>

                        <div className={styles.calcBox}>
                            <div className={styles.calcRow}>
                                <span>YOU SPRAY:</span>
                                <span className={styles.totalBlt}>{parsedBlt > 0 ? parsedBlt.toLocaleString() : '---'} $BLT</span>
                            </div>
                            <div className={styles.calcRow}>
                                <span>YOU GET BACK ({trench.roiCap}):</span>
                                <span className={styles.highlight}>{parsedBlt > 0 ? roiAmount.toLocaleString() : '---'} $BLT</span>
                            </div>
                        </div>

                        {userBeliefScore < 1000 && (
                            <div className={styles.capInfo}>
                                <span>Your Belief Score: {userBeliefScore}</span>
                                <span>Max Entry Cap: {maxAllowed.toLocaleString()} $BLT</span>
                                {userBeliefScore < 500 && <span className={styles.unlockHint}>Earn {500 - userBeliefScore} more Belief to unlock 2x cap</span>}
                                {userBeliefScore >= 500 && userBeliefScore < 1000 && <span className={styles.unlockHint}>Earn {1000 - userBeliefScore} more Belief to unlock 4x cap</span>}
                            </div>
                        )}

                        <div className={styles.warning}>⚠ NON-CUSTODIAL. P2P TRANSFER.</div>
                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={onClose}>CANCEL</button>
                            <button
                                className={styles.confirmBtn}
                                onClick={handleStartSpray}
                                disabled={!isValidAmount}
                                style={{ opacity: isValidAmount ? 1 : 0.5 }}
                            >
                                GET WALLET ADDRESS
                            </button>
                        </div>
                    </>
                )}

                {step === 'transferring' && (
                    <>
                        <h3 className={styles.title}>SEND FUNDS</h3>
                        <div className={styles.timerContainer}>
                            <span>TIME REMAINING:</span>
                            <Countdown initialMinutes={15} />
                        </div>

                        <div className={styles.walletBox}>
                            <label>TARGET ADDRESS:</label>
                            <div className={styles.addressDisplay}>{targetAddress}</div>
                            <p className={styles.instruction}>
                                Send exactly <span className={styles.imgHighlight}>{parsedBlt.toLocaleString()} $BLT</span>
                            </p>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={onClose}>CANCEL</button>
                            <button className={styles.confirmBtn} onClick={handleSent}>I HAVE SENT IT</button>
                        </div>
                    </>
                )}

                {step === 'verifying' && (
                    <div className={styles.statusView}>
                        <div className={styles.spinner}></div>
                        <p>VERIFYING ON-CHAIN...</p>
                        <span className={styles.subStatus}>Scanning block 19284...</span>
                    </div>
                )}

                {step === 'success' && (
                    <div className={styles.statusView}>
                        <div className={styles.successIcon}>✓</div>
                        <p>VERIFIED & QUEUED</p>
                    </div>
                )}
            </div>
        </div>
    );
}
