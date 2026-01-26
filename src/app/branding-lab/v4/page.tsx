"use client";

import React from "react";
import styles from "../lab.module.css";
import Logo from "@/components/Logo";
import { Heart, Users, MessageSquare, HandHeart, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityVariation() {
    return (
        <div className={styles.v4Container}>
            <header className={styles.v4Header}>
                <Logo />
                <button className={styles.v4JoinBtn}>Join the Community</button>
            </header>

            <main className={styles.v4Main}>
                <section className={styles.v4Hero}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.v4HeroCard}
                    >
                        <div className={styles.v4AvatarStack}>
                            <div className={styles.v4Avatar} style={{ background: '#FF6B6B' }} />
                            <div className={styles.v4Avatar} style={{ background: '#4ECDC4' }} />
                            <div className={styles.v4Avatar} style={{ background: '#FFE66D' }} />
                            <div className={styles.v4AvatarCount}>+20k</div>
                        </div>
                        <h1>Built for People, <br />By People.</h1>
                        <p>Trenches is a collective reward system where everyone helps each other win. No complex trading, just simple community focus.</p>
                        <button className={styles.v4HeroBtn}>See How We Win Together <Sparkles size={16} /></button>
                    </motion.div>
                </section>

                <section className={styles.v4GridSection}>
                    <div className={styles.v4FeatureGrid}>
                        <div className={styles.v4FeatureCard}>
                            <Heart size={32} color="#FF6B6B" />
                            <h3>Pure Reward</h3>
                            <p>Get a 50% thank-you bonus for supporting your favorite projects.</p>
                        </div>
                        <div className={styles.v4FeatureCard}>
                            <Users size={32} color="#4ECDC4" />
                            <h3>Team Effort</h3>
                            <p>Share, post, and raid to move everyone up the line faster.</p>
                        </div>
                        <div className={styles.v4FeatureCard}>
                            <HandHeart size={32} color="#FFE66D" />
                            <h3>Fair Payouts</h3>
                            <p>Your original money is protected and your bonus is automatic.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
