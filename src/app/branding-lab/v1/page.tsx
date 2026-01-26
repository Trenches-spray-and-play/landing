"use client";

import React from "react";
import styles from "../lab.module.css";
import Logo from "@/components/Logo";
import { CheckCircle2, TrendingUp, Shield, Zap, Wallet, ExternalLink, Clock, Info, ChevronRight, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function StartupVariation() {
    const slides = [
        {
            title: "The Community Marketing Fund",
            tagline: "Helping projects grow together",
            content: "Every project on Trenches sets aside a reward fund for you. It's like a 'thank you' reward for helping them grow. By participating and sharing the project, you get a piece of this reward fund that is otherwise locked away.",
            icon: <TrendingUp size={20} />,
            color: "#00FF66"
        },
        {
            title: "USD Value Protection",
            tagline: "Your capital, secured",
            content: "We protect your money. If you start with $100, we make sure you get $150 back. We use dollar values, so even if the coin price goes up or down while you wait, you still get your full profit based on the dollars you started with.",
            icon: <Shield size={20} />,
            color: "#3B82F6"
        },
        {
            title: "Step 1: Connect & Setup",
            tagline: "Your tactical identity",
            content: "Welcome! First, log in with your Google account and choose a username. Next, connect your digital wallets (EVM and SOL). This is your private account where your money and rewards are safely stored.",
            icon: <Wallet size={20} />,
            color: "#8B5CF6"
        }
    ];

    return (
        <div className={styles.v1Container}>
            <nav className={styles.v1Nav}>
                <Logo />
                <div className={styles.navLinks}>
                    <span>Solutions</span>
                    <span>Developers</span>
                    <span>Resources</span>
                </div>
                <button className={styles.v1BtnPrimary}>Get Started</button>
            </nav>

            <header className={styles.v1Hero}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.heroContent}
                >
                    <span className={styles.badge}>NEWBIE FRIENDLY v1.0</span>
                    <h1>Where Tokens <br /><span>Earn Belief</span></h1>
                    <p>The first high-frequency settlement layer for community growth. Simple, secure, and rewarding for everyone.</p>
                    <div className={styles.heroActions}>
                        <button className={styles.v1BtnPrimaryLarge}>Start Earning</button>
                        <button className={styles.v1BtnSecondaryLarge}>View Documentation</button>
                    </div>
                </motion.div>
                <div className={styles.heroVisual}>
                    <div className={styles.mockDashboard}>
                        <div className={styles.mockHead}>
                            <div className={styles.mockDots}><span /><span /><span /></div>
                            <div className={styles.mockUrl}>playtrenches.xyz/dashboard</div>
                        </div>
                        <div className={styles.mockBody}>
                            <div className={styles.mockSidebar} />
                            <div className={styles.mockMain}>
                                <div className={styles.mockCard} />
                                <div className={styles.mockGrid}>
                                    <div className={styles.mockCardSmall} />
                                    <div className={styles.mockCardSmall} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className={styles.v1Features}>
                <div className={styles.sectionHeader}>
                    <h2>How It Works</h2>
                    <p>Three simple pillars that power the Trenches ecosystem.</p>
                </div>
                <div className={styles.v1Grid}>
                    {slides.map((s, i) => (
                        <div key={i} className={styles.v1Card}>
                            <div className={styles.v1CardIcon} style={{ background: `${s.color}15`, color: s.color }}>
                                {s.icon}
                            </div>
                            <h3>{s.title}</h3>
                            <p>{s.content}</p>
                            <Link href="#" className={styles.v1Link}>Learn more <ChevronRight size={14} /></Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Internal Link component since we are in a lab
function Link({ children, className, href }: any) {
    return <a href={href} className={className}>{children}</a>;
}
