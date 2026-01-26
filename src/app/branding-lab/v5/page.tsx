"use client";

import React from "react";
import styles from "../lab.module.css";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import { ArrowDown, Info, ArrowRight } from "lucide-react";

export default function MinimalVariation() {
    const [isDarkMode, setIsDarkMode] = React.useState(true);
    const [depositAmount, setDepositAmount] = React.useState(1000);

    const sections = [
        {
            title: "THE_ROI_CALCULATOR",
            heading: "See the Result.",
            custom: (
                <div className={styles.v5Calculator}>
                    <div className={styles.v5CalcInputs}>
                        <div className={styles.v5CalcGroup}>
                            <label>YOUR_DEPOSIT</label>
                            <input
                                type="range"
                                min="10"
                                max="10000"
                                step="10"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(Number(e.target.value))}
                                className={styles.v5Slider}
                            />
                            <div className={styles.v5CalcValue}>${depositAmount.toLocaleString()}</div>
                        </div>
                        <div className={styles.v5CalcArrow}><ArrowRight size={24} /></div>
                        <div className={styles.v5CalcGroup}>
                            <label>YOUR_PAYOUT</label>
                            <div className={`${styles.v5CalcValue} ${styles.accentZEN}`}>${(depositAmount * 1.5).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "THE_LOGIC_FLOW",
            heading: "The Journey of a Dollar.",
            custom: (
                <div className={styles.v5LogicFlow}>
                    <div className={styles.v5Node}>YOUR_WALLET</div>
                    <div className={styles.v5Line}>
                        <motion.div
                            animate={{ x: [0, 200, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className={styles.v5Dot}
                        />
                    </div>
                    <div className={styles.v5Node}>RESERVE_FUND</div>
                    <div className={styles.v5Line}>
                        <motion.div
                            animate={{ x: [0, -200, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className={`${styles.v5Dot} ${styles.v5DotLarge}`}
                        />
                    </div>
                    <div className={styles.v5Node}>AUTOMATIC_PROFIT</div>
                </div>
            )
        },
        {
            title: "THE_COMPARISON",
            heading: "Better by Design.",
            custom: (
                <div className={styles.v5ComparisonGrid}>
                    <div className={styles.v5CompHeader}>TRADITIONAL_TRADING</div>
                    <div className={styles.v5CompHeader}>TRENCHES_PROTOCOL</div>
                    <div className={styles.v5CompItem}>High Volatility Risk</div>
                    <div className={styles.v5CompItem}>USD_VALUE_PROTECTION</div>
                    <div className={styles.v5CompItem}>Uncertain Exit Point</div>
                    <div className={styles.v5CompItem}>FIXED_1.5X_SETTLEMENT</div>
                    <div className={styles.v5CompItem}>Solo Market Timing</div>
                    <div className={styles.v5CompItem}>COMMUNITY_POWERED_SPEED</div>
                </div>
            )
        },
        {
            title: "THE_FUND",
            heading: "A Reward for your Support.",
            text: "Every project on Trenches sets aside a reward fund for you. It's a 'thank you' for helping them grow. By participating and sharing, you unlock value that is otherwise locked away.",
            stats: ["PROJECT_RESERVE", "AWARENESS_BOOST"]
        },
        {
            title: "THE_SECURITY",
            heading: "$100 In. $150 Out.",
            text: "We protect your money. Your original deposit is pegged to the dollar. Even if the coin price changes while you wait, your 50% profit is guaranteed based on the dollars you started with.",
            stats: ["USD_NORMALIZED", "ANTI_VOLATILITY"]
        },
        {
            title: "THE_MATH",
            heading: "Sustainable by Design.",
            text: "Example: 20,000 players join a $50M project. This creates a supply shock. The project reserves 10% ($5M) to pay you. The massive growth in value easily covers everyone's rewards.",
            stats: ["20,000+ PLAYERS", "$5,000,000 RESERVE"]
        },
        {
            title: "STEP_01",
            heading: "Connect & Setup.",
            text: "Log in with Google to create your identity. Then connect your personal wallet (MetaMask or Rabby). This is your private account where rewards are sent.",
            info: "Need help? [Learn how to create a personal wallet](https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask)."
        },
        {
            title: "STEP_02",
            heading: "Deposit & Network Match.",
            text: "Use the 'Deposit' section. Match your network: SOL for Solana projects, EVM for Ethereum/Base. Balance reflects in 1-3 minutes.",
            info: "No crypto yet? [See how to buy crypto via P2P on Bybit](https://www.bybit.com/en-US/help-center/bybithc_article?language=en_US&id=000001889)."
        },
        {
            title: "STEP_03",
            heading: "Dominate with Tasks & Raids.",
            text: "Complete Tasks for Belief Points (rank) and join Raids for Boost Points (speed). Use the 'Spray' tool to move to the front of the line.",
            stats: ["BELIEF_POINTS", "BOOST_POINTS"]
        },
        {
            title: "STEP_04",
            heading: "Reach the Front & Collect.",
            text: "Once your timer reaches zero, the system automatically settles your spot. Your original deposit plus your 50% profit is sent instantly to your wallet.",
            stats: ["AUTOMATIC_PAYOUT", "FIXED_SETTLEMENT"]
        }
    ];

    return (
        <div className={styles.v5Container} data-theme={isDarkMode ? 'dark' : 'light'}>
            <div className={styles.v5Meta}>
                <Logo variant="horizontal" className={styles.v5Logo} />
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <span>VARIATION_05 // FULL_INTELLIGENCE</span>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={styles.themeToggle}
                    >
                        {isDarkMode ? 'SWITCH_TO_LIGHT' : 'SWITCH_TO_DARK'}
                    </button>
                </div>
                <div className={styles.v5ScrollHint}>SCROLL_TO_EXPLORE <ArrowDown size={12} /></div>
            </div>

            <main className={styles.v5MainFull}>
                {sections.map((s, i) => (
                    <motion.section
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className={styles.v5FullSection}
                    >
                        <span className={styles.v5SectionTag}>{s.title}</span>
                        <h2>{s.heading}</h2>
                        {s.text && <p>{s.text}</p>}

                        {s.custom && s.custom}

                        {s.stats && (
                            <div className={styles.v5SectionStats}>
                                {s.stats.map((stat, j) => (
                                    <div key={j} className={styles.v5StatBox}>
                                        {stat}
                                    </div>
                                ))}
                            </div>
                        )}

                        {s.info && (
                            <div className={styles.v5InfoBox}>
                                <Info size={14} />
                                <div dangerouslySetInnerHTML={{
                                    __html: s.info.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                                }} />
                            </div>
                        )}
                    </motion.section>
                ))}

                <section className={styles.v5Trust}>
                    <div className={styles.v5TrustLogos}>
                        <span>POWERED_BY //</span>
                        <span>SOLANA</span>
                        <span>BASE</span>
                        <span>GOOGLE_CLOUD</span>
                        <span>METAMASK</span>
                    </div>
                </section>

                <section className={styles.v5End}>
                    <button className={styles.v5CTA}>Get Started Now</button>
                    <p>Simple. Direct. Powerful.</p>
                </section>
            </main>
        </div>
    );
}
