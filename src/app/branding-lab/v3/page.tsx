"use client";

import React from "react";
import styles from "../lab.module.css";
import Logo from "@/components/Logo";
import { ShieldCheck, Lock, Globe, Server, UserCheck, TrendingDown, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FinTechVariation() {
    const proofs = [
        {
            title: "Asset Protection",
            desc: "Every dollar deposited is tracked within our institutional-grade reserve layer.",
            icon: <Lock size={20} />
        },
        {
            title: "Verified Payouts",
            desc: "Non-custodial settlement ensures your profits are sent directly to your wallet.",
            icon: <UserCheck size={20} />
        },
        {
            title: "Global Liquidity",
            desc: "Integrated with top-tier liquidity providers for seamless token movement.",
            icon: <Globe size={20} />
        }
    ];

    return (
        <div className={styles.v3Container}>
            <header className={styles.v3Header}>
                <Logo />
                <div className={styles.v3Status}>
                    <div className={styles.v3StatusDot} />
                    SYSTEM_OPERATIONAL
                </div>
            </header>

            <main className={styles.v3Main}>
                <section className={styles.v3Hero}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={styles.v3HeroContent}
                    >
                        <span className={styles.v3Badge}>INSTITUTIONAL GRADE</span>
                        <h1>The New Standard for <br />Token Rewards</h1>
                        <p>Trenches provides a secure, USD-pegged framework for community-led project growth. Regulated by code, verified by belief.</p>
                        <div className={styles.v3HeroActions}>
                            <button className={styles.v3BtnPrimary}>Open Account</button>
                            <button className={styles.v3BtnSecondary}>View Safety Report</button>
                        </div>
                    </motion.div>
                </section>

                <section className={styles.v3Stats}>
                    <div className={styles.v3StatsGrid}>
                        <div className={styles.v3StatItem}>
                            <span className={styles.v3StatVal}>1.5X</span>
                            <span className={styles.v3StatLab}>FIXED_PROFIT_RATIO</span>
                        </div>
                        <div className={styles.v3StatItem}>
                            <span className={styles.v3StatVal}>$1.2M+</span>
                            <span className={styles.v3StatLab}>PROTOCOL_RESERVE</span>
                        </div>
                        <div className={styles.v3StatItem}>
                            <span className={styles.v3StatVal}>24H</span>
                            <span className={styles.v3StatLab}>SETTLEMENT_TARGET</span>
                        </div>
                    </div>
                </section>

                <section className={styles.v3Proof}>
                    <div className={styles.v3SectionHeader}>
                        <h2>Security Protocol</h2>
                        <p>How we ensure your capital is protected at every step.</p>
                    </div>
                    <div className={styles.v3ProofGrid}>
                        {proofs.map((p, i) => (
                            <div key={i} className={styles.v3ProofCard}>
                                <div className={styles.v3ProofIcon}>{p.icon}</div>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
