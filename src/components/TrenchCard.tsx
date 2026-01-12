"use client";

import styles from './TrenchCard.module.css';
import { BLT_CONTRACT_ADDRESS } from '@/lib/mockData';
import { useState } from 'react';

interface TrenchProps {
    level: 'RAPID' | 'MID' | 'DEEP';
    entrySize: string;
    roiCap: string;
    cadence: string;
    reserves: string;
    onClick: () => void;
}

export default function TrenchCard({
    level,
    entrySize,
    roiCap,
    cadence,
    reserves,
    onClick
}: TrenchProps) {

    const getLevelColor = () => {
        switch (level) {
            case 'RAPID': return 'var(--accent-rapid)';
            case 'MID': return 'var(--accent-mid)';
            case 'DEEP': return 'var(--accent-deep)';
            default: return 'var(--text-primary)';
        }
    };

    return (
        <div
            className={styles.card}
            onClick={onClick}
            style={{ borderColor: getLevelColor() } as React.CSSProperties}
        >
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title} style={{ color: getLevelColor() }}>
                        {"//"}{level} TRENCH
                    </h3>
                    <div
                        className={styles.tokenInfo}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(BLT_CONTRACT_ADDRESS);
                            // Visual feedback could be added here, but keeping it simple/compact as requested
                            alert('Contract Copied: ' + BLT_CONTRACT_ADDRESS);
                        }}
                    >
                        <span className={styles.tokenLabel}>$BLT:</span>
                        <span className={styles.contractAddr}>
                            {BLT_CONTRACT_ADDRESS.slice(0, 6)}...{BLT_CONTRACT_ADDRESS.slice(-4)}
                        </span>
                        <span className={styles.copyIcon}>📋</span>
                    </div>
                </div>
                <span className={styles.status}>ACTIVE</span>
            </div>

            <div className={styles.stats}>
                <div className={styles.statRow}>
                    <span className={styles.label}>ENTRY</span>
                    <span className={styles.value}>{entrySize} $BLT</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.label}>ROI CAP</span>
                    <span className={styles.value}>{roiCap}</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.label}>WAIT TIME</span>
                    <span className={styles.value}>{cadence}</span>
                </div>
            </div>

            <div className={styles.reserveBarContainer}>
                <div className={styles.reserveLabel}>
                    <span>RESERVES: {reserves} $BLT</span>
                </div>
                <div className={styles.reserveTrack}>
                    <div className={styles.reserveFill} style={{ width: '65%', background: getLevelColor() }}></div>
                </div>
            </div>

            <div className={styles.action}>
                <span className={styles.cta}>SPRAY TO ENTER &gt;</span>
            </div>
        </div>
    );
}
