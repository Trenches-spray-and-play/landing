"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import TacticalButton from "@/components/TacticalButton";

const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const dx = useSpring(x, springConfig);
    const dy = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        if (distance < 150) {
            x.set(distanceX * 0.4);
            y.set(distanceY * 0.4);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: dx, y: dy }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

export default function AnimationDemoPage() {
    return (
        <main style={{
            minHeight: "100vh",
            background: "#050505",
            color: "#fff",
            padding: "4rem 2rem",
            fontFamily: "var(--font-sans)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{ marginBottom: "4rem" }}>
                <Logo />
            </div>

            <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-1px" }}>
                MISSION_TRIGGER_LABS.v2
            </h1>
            <p style={{ color: "#666", marginBottom: "4rem", fontSize: "0.8rem", letterSpacing: "2px" }}>
                DECIPHERING HIGH-CONVERSION CTA ARCHITECTURES
            </p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "3rem",
                width: "100%",
                maxWidth: "1200px"
            }}>
                {/* 1. PERIODIC SHIMMER (Recommended) */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>01_PERIODIC_SCAN (SHIMMER)</p>
                    <div style={btnContainerStyle}>
                        <button className="shimmer-btn">JOIN THE WAITLIST</button>
                    </div>
                </div>

                {/* 2. ZENITH BREATH */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>02_ZENITH_BREATH (PULSE)</p>
                    <div style={btnContainerStyle}>
                        <button className="pulse-btn">JOIN THE WAITLIST</button>
                    </div>
                </div>

                {/* 3. RADAR SWEEP */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>03_RADAR_SWEEP (CENTER)</p>
                    <div style={btnContainerStyle}>
                        <button className="radar-btn">JOIN THE WAITLIST</button>
                    </div>
                </div>

                {/* 4. TACTICAL TRACE */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>04_TACTICAL_TRACE (BORDER)</p>
                    <div style={btnContainerStyle}>
                        <div className="trace-container">
                            <button className="base-btn">JOIN THE WAITLIST</button>
                        </div>
                    </div>
                </div>

                {/* 5. CYBER GLITCH */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>05_CYBER_GLITCH (HOVER)</p>
                    <div style={btnContainerStyle}>
                        <button className="glitch-btn">JOIN THE WAITLIST</button>
                    </div>
                </div>

                {/* 6. MAGNETIC PULL */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>06_MAGNETIC_PULL (FORCE)</p>
                    <div style={btnContainerStyle}>
                        <MagneticButton className="magnetic-btn">JOIN THE WAITLIST</MagneticButton>
                    </div>
                </div>

                {/* 7. KINETIC SLIDE */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>07_KINETIC_SLIDE (ACTION)</p>
                    <div style={btnContainerStyle}>
                        <button className="slide-btn">
                            <span className="text">JOIN THE WAITLIST</span>
                            <span className="icon">→</span>
                        </button>
                    </div>
                </div>

                {/* 8. NEON FLICKER */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>08_NEON_FLICKER (POWER)</p>
                    <div style={btnContainerStyle}>
                        <button className="flicker-btn">JOIN THE WAITLIST</button>
                    </div>
                </div>

                {/* 9. DEPTH ELEVATION */}
                <div style={demoBoxStyle}>
                    <p style={labelStyle}>09_DEPTH_ELEVATION (FLOAT)</p>
                    <div style={btnContainerStyle}>
                        <button className="depth-btn">JOIN THE WAITLIST</button>
                    </div>
                </div>

                {/* 10. PROTOCOL HYBRID (Final Component) */}
                <div style={demoBoxStyle}>
                    <p style={recommendedLabelStyle}>10_FINAL_DEPLOYMENT_SPEC (AUDIO + FEEDBACK)</p>
                    <div style={btnContainerStyle}>
                        <TacticalButton variant="hybrid">JOIN THE WAITLIST</TacticalButton>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .base-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
                }

                /* 01 SHIMMER */
                .shimmer-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                .shimmer-btn::after {
                    content: "";
                    position: absolute;
                    top: -50%; left: -50%; width: 200%; height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(0, 255, 102, 0.4), transparent);
                    transform: rotate(45deg);
                    animation: sweep 4s infinite;
                }
                @keyframes sweep {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    15% { transform: translateX(100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }

                /* 02 PULSE */
                .pulse-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.4);
                    animation: breathe 2.5s infinite cubic-bezier(0.66, 0, 0, 1);
                }
                @keyframes breathe {
                    0% { box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(0, 255, 102, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 255, 102, 0); }
                }

                /* 03 RADAR */
                .radar-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                .radar-btn::before {
                    content: "";
                    position: absolute;
                    top: 50%; left: 50%;
                    width: 0; height: 0;
                    background: rgba(0, 255, 102, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: radar 3s infinite;
                }
                @keyframes radar {
                    0% { width: 0; height: 0; opacity: 1; }
                    50% { width: 300px; height: 300px; opacity: 0; }
                    100% { width: 300px; height: 300px; opacity: 0; }
                }

                /* 05 GLITCH */
                .glitch-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .glitch-btn:hover {
                    box-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
                    animation: glitch 0.3s infinite;
                }
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }

                /* 06 MAGNETIC */
                .magnetic-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                }

                /* 07 SLIDE */
                .slide-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .slide-btn .icon {
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all 0.3s ease;
                }
                .slide-btn:hover {
                    padding-right: 1.5rem;
                    padding-left: 3rem;
                }
                .slide-btn:hover .icon {
                    opacity: 1;
                    transform: translateX(0);
                }

                /* 08 FLICKER */
                .flicker-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    animation: flicker 4s infinite;
                }
                @keyframes flicker {
                    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
                        opacity: 1;
                        background: #fff;
                    }
                    20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
                        opacity: 0.8;
                        background: #00FF66;
                    }
                }

                /* 09 DEPTH */
                .depth-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .depth-btn:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0, 255, 102, 0.3);
                }

                /* 10 HYBRID */
                .hybrid-btn {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.4);
                    animation: breathe 3s infinite cubic-bezier(0.66, 0, 0, 1);
                }
                .hybrid-btn::after {
                    content: "";
                    position: absolute;
                    top: -50%; left: -50%; width: 200%; height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(0, 255, 102, 0.5), transparent);
                    transform: rotate(45deg);
                    animation: sweep 4.5s infinite;
                }

                /* TRACE (Container based) */
                .trace-container {
                    position: relative;
                    padding: 2px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                }
                .trace-container::before {
                    content: "";
                    position: absolute;
                    top: -50%; left: -50%; width: 200%; height: 200%;
                    background: conic-gradient(transparent, transparent, var(--accent-zenith), transparent);
                    animation: rotate 4s linear infinite;
                }
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .trace-container button {
                    background: #fff;
                    color: #000;
                    padding: 1rem 2.5rem;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
                }
            `}</style>
        </main>
    );
}

const demoBoxStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "2rem",
    borderRadius: "24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column"
};

const btnContainerStyle: React.CSSProperties = {
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const labelStyle: React.CSSProperties = {
    fontSize: "0.6rem",
    fontWeight: 900,
    letterSpacing: "2px",
    color: "#444",
    marginBottom: "1rem"
};

const recommendedLabelStyle: React.CSSProperties = {
    fontSize: "0.6rem",
    fontWeight: 900,
    letterSpacing: "2px",
    color: "var(--accent-zenith)",
    marginBottom: "1rem"
};

const descStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "#666",
    marginTop: "1.5rem",
    lineHeight: "1.4"
};
