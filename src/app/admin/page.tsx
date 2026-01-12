"use client";

import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { MOCK_TRENCHES } from '@/lib/mockData';
import Link from 'next/link';

export default function AdminDashboard() {
    const [trenches, setTrenches] = useState(Object.values(MOCK_TRENCHES));

    // Auth Check (MVP)
    useEffect(() => {
        if (!document.cookie.includes('admin_auth=true')) {
            window.location.href = '/admin/login';
        }
    }, []);

    const toggleStatus = (id: string, currentStatus: string = 'ACTIVE') => {
        // In a real app, this would call an API
        alert(`Toggled status for ${id}. (API integration pending)`);
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>ADMIN COMMAND</h1>
                <Link href="/" className={styles.exitLink}>EXIT TO APP</Link>
            </header>

            <div className={styles.statsRow}>
                <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>TOTAL USERS</span>
                    <span className={styles.kpiValue}>1,203</span>
                </div>
                <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>TOTAL TVL</span>
                    <span className={styles.kpiValue}>$842,000</span>
                </div>
                <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>ACTIVE SPRAYS</span>
                    <span className={styles.kpiValue}>42</span>
                </div>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>TRENCH CONTROL</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>LEVEL</th>
                                <th>ENTRY</th>
                                <th>WAIT TIME</th>
                                <th>RESERVES</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trenches.map(trench => (
                                <tr key={trench.id}>
                                    <td style={{ color: `var(--accent-${trench.level.toLowerCase()})` }}>
                                        {trench.level}
                                    </td>
                                    <td>{trench.entrySize} $BLT</td>
                                    <td>{trench.cadence}</td>
                                    <td>{trench.reserves}</td>
                                    <td>
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => toggleStatus(trench.id)}
                                        >
                                            PAUSE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
