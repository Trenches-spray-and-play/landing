"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './RiskBanner.module.css';

export default function RiskBanner() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || pathname?.startsWith('/welcome')) return null;

    return (
        <div className={styles.banner}>
            <span className={styles.icon}>⚠</span>
            <p className={styles.text}>
                <span className={styles.bold}>HIGH RISK:</span> This is a p2p coordination game.
                Funds are non-custodial but value is not guaranteed.
                <span className={styles.bold}> YOU CAN LOSE EVERYTHING.</span>
            </p>
            <button className={styles.closeBtn} onClick={() => setIsVisible(false)}>×</button>
        </div>
    );
}
