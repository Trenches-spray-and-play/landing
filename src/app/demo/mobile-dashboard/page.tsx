"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import { Shield, Edit3, Check, X, Phone, Monitor } from "lucide-react";

export default function MobileDashboardDemo() {
    const [view, setView] = useState<'mobile' | 'desktop'>('mobile');
    const [isEditing, setIsEditing] = useState(false);

    return (
        <main style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            color: "#fff",
            padding: "2rem 1rem",
            fontFamily: "var(--font-sans)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {/* View Toggle */}
            <div className="view-toggle">
                <button
                    className={view === 'mobile' ? 'active' : ''}
                    onClick={() => setView('mobile')}
                >
                    <Phone size={14} /> MOBILE_VIEW
                </button>
                <button
                    className={view === 'desktop' ? 'active' : ''}
                    onClick={() => setView('desktop')}
                >
                    <Monitor size={14} /> DESKTOP_VIEW
                </button>
            </div>

            <h1 className="demo-title">ZENITH_MOBILE_PROTO.v1</h1>

            {/* Simulated Device Frame */}
            <div className={`device-frame ${view}`}>
                <div className="status-bar">
                    <span>9:41</span>
                    <div className="status-icons">📶 🔋</div>
                </div>

                <div className="dashboard-content">
                    <header className="header">
                        <Logo />
                    </header>

                    {/* Compact Bento Hub */}
                    <div className="bento-hub glass">
                        <div className="profile-side">
                            <span className="handle">@izecubes</span>
                            <span className="referral-stat">REFERRALS: <span>42</span></span>
                        </div>
                        <div className="hub-actions">
                            <button className="copy-btn">COPY LINK</button>
                        </div>
                    </div>

                    {/* Payout Strip (Mobile Optimized) */}
                    <div className={`payout-strip glass ${isEditing ? 'editing' : ''}`}>
                        <div className="strip-header">
                            <div className="strip-label">
                                <Shield size={10} className="icon-green" />
                                <span>PAYOUT_NODES</span>
                            </div>
                            <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? <Check size={12} /> : <Edit3 size={12} />}
                            </button>
                        </div>

                        <div className="nodes-stack">
                            <div className="node-item">
                                <span className="node-prefix">EVM</span>
                                <span className="node-text">0x71...765F</span>
                            </div>
                            <div className="node-item">
                                <span className="node-prefix">SOL</span>
                                <span className="node-text">HN7c...pS3z</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Card (Mobile Scale) */}
                    <div className="hero-card glass">
                        <div className="custom-copy">OVERTAKE THE COMPETITION</div>
                        <div className="queue-box">
                            <p className="queue-label">QUEUE POSITION</p>
                            <p className="queue-value">#128</p>
                        </div>
                        <div className="timer-footer">
                            00 : 24 : 12 : 56
                        </div>
                    </div>

                    <footer className="footer">
                        <div className="footer-links">
                            <span>𝕏</span> <span>TELEGRAM</span> <span>DOCS</span>
                        </div>
                        <p className="footer-v">CORE_STABLE_V1.1_ELITE</p>
                    </footer>
                </div>
            </div>

            <style jsx>{`
                .view-toggle {
                    display: flex;
                    gap: 1rem;
                    background: rgba(255,255,255,0.05);
                    padding: 4px;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                }
                .view-toggle button {
                    background: transparent;
                    border: none;
                    color: #444;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 0.65rem;
                    font-weight: 900;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                }
                .view-toggle button.active {
                    background: #fff;
                    color: #000;
                }

                .demo-title {
                    font-size: 0.8rem;
                    letter-spacing: 4px;
                    color: #333;
                    margin-bottom: 3rem;
                }

                .device-frame {
                    background: #050505;
                    border: 8px solid #1a1a1a;
                    border-radius: 40px;
                    overflow: hidden;
                    position: relative;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 50px 100px rgba(0,0,0,0.8);
                }

                .device-frame.mobile {
                    width: 375px;
                    height: 667px; /* Single viewport target */
                }

                .device-frame.desktop {
                    width: 900px;
                    height: 600px;
                    border-radius: 20px;
                }

                .status-bar {
                    height: 40px;
                    padding: 0 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                    opacity: 0.5;
                }

                .dashboard-content {
                    padding: 1rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    height: calc(100% - 40px);
                }

                .header { margin-bottom: 1.5rem; }

                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .bento-hub {
                    padding: 1rem 1.5rem;
                    border-radius: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .handle { font-size: 1rem; font-weight: 900; display: block; line-height: 1; }
                .referral-stat { font-size: 0.55rem; font-weight: 800; color: #555; letter-spacing: 1px; }
                .referral-stat span { color: var(--accent-zenith); }

                .copy-btn {
                    background: #fff;
                    color: #000;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 100px;
                    font-size: 0.55rem;
                    font-weight: 900;
                }

                .payout-strip {
                    padding: 0.75rem 1rem;
                    border-radius: 16px;
                    margin-bottom: 1rem;
                }

                .strip-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }

                .strip-label {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.5rem;
                    font-weight: 900;
                    color: #444;
                    letter-spacing: 1px;
                }

                .icon-green { color: var(--accent-zenith); }

                .edit-btn { background: transparent; border: none; color: #444; cursor: pointer; }

                .nodes-stack {
                    display: flex;
                    gap: 1rem;
                }

                .node-item { display: flex; align-items: center; gap: 6px; }
                .node-prefix { font-size: 0.5rem; font-weight: 900; color: #444; background: rgba(255,255,255,0.05); padding: 2px 4px; border-radius: 3px; }
                .node-text { font-family: var(--font-mono); font-size: 0.65rem; color: #888; }

                .hero-card {
                    flex: 1;
                    max-height: 280px;
                    border-radius: 24px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: #000;
                    box-shadow: 0 0 40px rgba(57, 255, 20, 0.05);
                }

                .custom-copy { font-size: 0.55rem; font-weight: 800; color: var(--accent-zenith); text-align: center; letter-spacing: 1px; }
                
                .queue-box { text-align: center; }
                .queue-label { font-size: 0.5rem; font-weight: 900; color: #333; margin-bottom: 0.5rem; }
                .queue-value { font-size: 3.5rem; font-weight: 950; letter-spacing: -2px; }

                .timer-footer { font-size: 1.2rem; font-weight: 900; text-align: center; }

                .footer {
                    margin-top: auto;
                    padding: 1rem 0;
                    text-align: center;
                }
                .footer-links { font-size: 0.55rem; color: #333; display: flex; justify-content: center; gap: 1rem; margin-bottom: 4px; }
                .footer-v { font-size: 0.45rem; color: #222; font-weight: 700; letter-spacing: 1px; }

                @media (max-width: 500px) {
                    .device-frame { width: 100% !important; height: auto !important; border: none; border-radius: 0; }
                }
            `}</style>
        </main>
    );
}
