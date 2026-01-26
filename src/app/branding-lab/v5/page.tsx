"use client";

import React from "react";
import styles from "../lab.module.css";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import { ArrowDown, Info } from "lucide-react";

export default function MinimalVariation() {
    const sections = [
        {
            title: "THE_FUND",
            heading: "A Reward for your Support.",
            text: "Every project on Trenches sets aside a reward fund for you. It's a 'thank you' for helping them grow. By participating and sharing, you unlock value that is otherwise locked away.",
            stats: ["PROJECT_RESERVE", "AWARENESS_BOOST"]
        },
        {
            title: "THE_SECURITY",
            heading: "$1,000 In. $1,500 Out.",
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
            heading: "Create & Connect.",
            text: "Log in with Google. Pick a name. Connect a personal wallet (MetaMask/Rabby). No bank or exchange accounts—this is your private secure vault.",
            info: "Need help? [Learn how to create a wallet](https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask)"
        },
        {
            title: "STEP_02",
            heading: "Enter the Trench.",
            text: "Add money to your account and enter the game. This secures your spot in the payout line and helping the project grow stronger.",
            info: "No crypto? [How to buy with P2P](https://www.bybit.com/en-US/help-center/bybithc_article?language=en_US&id=000001889)"
        },
        {
            title: "STEP_03",
            heading: "Share & Speed Up.",
            text: "Use the 'Spray' tool to share the project. Earn points that act as a fast-pass, moving you to the front of the line much quicker.",
            stats: ["BELIEF_POINTS", "BOOST_POINTS"]
        },
        {
            title: "THE_RESULT",
            heading: "Automatic Payouts.",
            text: "When your timer hits zero, the system sends your original money plus your 50% cash bonus directly to your wallet. Instantly. Automatically.",
            stats: ["1.5X ROI", "INSTANT_SETTLEMENT"]
        }
    ];

    return (
        <div className={styles.v5Container}>
            <div className={styles.v5Meta}>
                <Logo variant="icon" width={30} />
                <span>VARIATION_05 // FULL_PRESENTATION</span>
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
                        <p>{s.text}</p>

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

                <section className={styles.v5End}>
                    <button className={styles.v5CTA}>Get Started Now</button>
                    <p>Simple. Direct. Powerful.</p>
                </section>
            </main>
        </div>
    );
}
