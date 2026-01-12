"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import TaskList from "@/components/TaskList";
import { MOCK_TASKS } from "@/lib/mockData";

export default function Profile() {
    const [beliefScore, setBeliefScore] = useState(850);
    const [boostPoints, setBoostPoints] = useState(250);

    const handleTaskComplete = (reward: number) => {
        // Tasks now award Boost Points instead of Belief Score
        setBoostPoints(prev => prev + reward);
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <div className={styles.avatar}>U</div>
                <div className={styles.identity}>
                    <h1 className={styles.username}>
                        @user_handle
                        {/* Verified badge placeholder */}
                        <span style={{ color: "var(--accent-blt)", fontSize: "0.8em" }}>✓</span>
                    </h1>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreBox}>
                            <span className={styles.scoreLabel}>BELIEF SCORE</span>
                            <span className={styles.scoreValue} style={{ color: "var(--accent-mid)" }}>{beliefScore}</span>
                            <span className={styles.scoreHint}>From peer validation</span>
                        </div>
                        <div className={styles.scoreBox}>
                            <span className={styles.scoreLabel}>BOOST POINTS</span>
                            <span className={styles.scoreValue} style={{ color: "var(--accent-blt)" }}>{boostPoints}</span>
                            <span className={styles.scoreHint}>From tasks & validation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wallet Config */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>CONFIG</h2>
                <div className={styles.walletBox}>
                    <label className={styles.inputLabel}>RECEIVING ADDRESS (SOL/EVM)</label>
                    <input
                        type="text"
                        className={styles.walletInput}
                        placeholder="0x... or Addr.."
                        defaultValue="0x71C...9A21"
                    />
                    <p className={styles.helperText}>Funds from payouts will be sent here automatically.</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>IDENTITY ANCHORS</h2>
                <div className={styles.socialGrid}>
                    <div className={styles.socialCard}>
                        <span className={styles.socialIcon}>𝕏</span>
                        <div style={{ color: "var(--accent-rapid)" }}>CONNECTED</div>
                    </div>
                    <div className={styles.socialCard}>
                        <span className={styles.socialIcon}>✈️</span>
                        <div style={{ color: "var(--text-muted)" }}>CONNECT</div>
                    </div>
                </div>
            </section>

            <TaskList initialTasks={MOCK_TASKS} onTaskComplete={handleTaskComplete} />

            <section className={styles.section} style={{ marginTop: 'var(--spacing-xl)' }}>
                <h2 className={styles.sectionTitle}>Stats</h2>
                <div className={styles.statGrid}>
                    <div className={styles.statBox}>
                        <div className={styles.statValue}>12</div>
                        <div className={styles.statLabel}>Sprays</div>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.statValue}>4</div>
                        <div className={styles.statLabel}>Exits</div>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.statValue}>2.4k</div>
                        <div className={styles.statLabel}>$BLT Earned</div>
                    </div>
                </div>
            </section>

            <div style={{ marginTop: "var(--spacing-xl)", textAlign: "center" }}>
                <Link href="/" style={{
                    color: "var(--text-secondary)",
                    textDecoration: "underline",
                    fontSize: "0.9rem"
                }}>
                    &lt; BACK TO TRENCHES
                </Link>
            </div>
        </main>
    );
}
