"use client";

import React from "react";
import styles from "../lab.module.css";
import Logo from "@/components/Logo";
import { CheckCircle2, TrendingUp, Shield, Zap, Wallet, ExternalLink, Clock, Info, ChevronRight, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function EducationalVariation() {
    const steps = [
        {
            num: "01",
            title: "Connect Your Wallet",
            content: "Link your personal SOL or EVM wallet. This is where your rewards will be sent automatically.",
            sub: "Don't use exchange accounts.",
            color: "#3B82F6"
        },
        {
            num: "02",
            title: "Join a Trench",
            content: "Deposit tokens to secure your spot in the payout queue. Your value is protected in USD.",
            sub: "Safety first.",
            color: "#10B981"
        },
        {
            num: "03",
            title: "Boost & Earn",
            content: "Engage socially to speed up your countdown. Receive your original money + 50% bonus.",
            sub: "Repeat to grow.",
            color: "#6366F1"
        }
    ];

    return (
        <div className={styles.v2Container}>
            <header className={styles.v2Header}>
                <div className={styles.v2TopBar}>
                    <Logo />
                    <div className={styles.v2AcademyLabel}><GraduationCap size={16} /> TRENCHES ACADEMY</div>
                </div>
                <div className={styles.v2Hero}>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        Learning the <br /><span>Way of the Trench</span>
                    </motion.h1>
                    <p>A simple step-by-step guide to understanding our reward protocol. No crypto complexiy, just clear results.</p>
                </div>
            </header>

            <section className={styles.v2StepsSection}>
                <div className={styles.v2StepsGrid}>
                    {steps.map((s, i) => (
                        <div key={i} className={styles.v2StepCard}>
                            <div className={styles.v2StepNum} style={{ color: s.color }}>{s.num}</div>
                            <div className={styles.v2StepContent}>
                                <h2>{s.title}</h2>
                                <p>{s.content}</p>
                                <span className={styles.v2StepSub}>{s.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.v2DeepDive}>
                <div className={styles.v2DeepDiveBox}>
                    <div className={styles.v2DeepHeader}>
                        <BookOpen size={24} color="#3B82F6" />
                        <h3>The Core Logic</h3>
                    </div>
                    <div className={styles.v2DeepBody}>
                        <p>We use a mathematical reserve model. When you join, your dollars are protected. As more people enter, the project's value grows, ensuring there's always enough to pay you your 50% bonus.</p>
                        <button className={styles.v2BtnAction}>Watch the video guide</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
