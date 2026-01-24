"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import { Shield, Zap, Edit3, Check, X } from "lucide-react";

export default function WalletDisplayDemo() {
    const [isEditing, setIsEditing] = useState(false);
    const [evm, setEvm] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
    const [sol, setSol] = useState("HN7cABqL368E6pA9gjW85721vS36zW7eG2n5E2N9pS3z");

    // Temporary state for editing
    const [tempEvm, setTempEvm] = useState(evm);
    const [tempSol, setTempSol] = useState(sol);

    const handleStartEdit = () => {
        setTempEvm(evm);
        setTempSol(sol);
        setIsEditing(true);
    };

    const handleSave = () => {
        setEvm(tempEvm);
        setSol(tempSol);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

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

            <h1 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "3rem", letterSpacing: "2px", opacity: 0.6 }}>
                DASHBOARD_WALLET_SPEC.v1
            </h1>

            {/* Compact Bento Hub (Identity) */}
            <div className="bento-hub glass">
                <div className="profile-side">
                    <span className="handle">@izecubes</span>
                    <span className="referral-stat">REFERRALS: <span>42</span></span>
                </div>
                <span className="referral-link">trenches.play/ref/GJK29X</span>
                <div className="hub-actions">
                    <button className="copy-btn">COPY LINK</button>
                    <button className="logout-btn">LOGOUT</button>
                </div>
            </div>

            {/* NEW: Compact Payout Strip (The Fix for Single Page) */}
            <div className={`payout-strip glass ${isEditing ? 'editing' : ''}`}>
                <div className="strip-label">
                    <Shield size={12} className="icon-green" />
                    <span>PAYOUT_NODES</span>
                </div>

                <div className="divider"></div>

                <div className="node-group">
                    <span className="node-prefix">EVM</span>
                    {!isEditing ? (
                        <span className="node-text">{evm.slice(0, 6)}...{evm.slice(-4)}</span>
                    ) : (
                        <input className="strip-input" value={tempEvm} onChange={e => setTempEvm(e.target.value)} />
                    )}
                </div>

                <div className="divider"></div>

                <div className="node-group">
                    <span className="node-prefix">SOL</span>
                    {!isEditing ? (
                        <span className="node-text">{sol.slice(0, 6)}...{sol.slice(-4)}</span>
                    ) : (
                        <input className="strip-input" value={tempSol} onChange={e => setTempSol(e.target.value)} />
                    )}
                </div>

                <div className="divider"></div>

                <div className="strip-actions">
                    {!isEditing ? (
                        <button className="edit-icon-btn" onClick={handleStartEdit}><Edit3 size={14} /></button>
                    ) : (
                        <>
                            <button className="save-icon-btn" onClick={handleSave}><Check size={14} /></button>
                            <button className="cancel-icon-btn" onClick={handleCancel}><X size={14} /></button>
                        </>
                    )}
                </div>
            </div>

            {/* Mock Hero Card */}
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

            <style jsx>{`
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .bento-hub {
                    width: calc(100% - 4rem);
                    max-width: 940px;
                    height: 80px;
                    border-radius: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 3rem;
                    margin-bottom: 1.5rem;
                }

                .profile-side { display: flex; flex-direction: column; gap: 4px; }
                .handle { font-size: 1.1rem; font-weight: 950; letter-spacing: -0.5px; line-height: 1; }
                .referral-stat { font-size: 0.65rem; font-weight: 800; color: #666; letter-spacing: 1.5px; text-transform: uppercase; }
                .referral-stat span { color: var(--accent-zenith); margin-left: 4px; }
                .referral-link { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-zenith); letter-spacing: -0.5px; }
                .hub-actions { display: flex; align-items: center; gap: 1rem; }
                .copy-btn { background: #fff; color: #000; border: none; padding: 8px 24px; font-size: 0.7rem; font-weight: 950; border-radius: 100px; cursor: pointer; }
                .logout-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #666; padding: 8px 16px; font-size: 0.65rem; font-weight: 800; border-radius: 100px; cursor: pointer; }

                /* PAYOUT STRIP - COMPACT VERSION */
                .payout-strip {
                    width: calc(100% - 4rem);
                    max-width: 940px;
                    height: 48px;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    padding: 0 1.5rem;
                    margin-bottom: 2rem;
                    transition: all 0.3s ease;
                }

                .payout-strip.editing {
                    border-color: var(--accent-zenith);
                    background: rgba(0, 255, 102, 0.05);
                }

                .strip-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.6rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #555;
                    white-space: nowrap;
                }

                .icon-green { color: var(--accent-zenith); }

                .divider {
                    width: 1px;
                    height: 20px;
                    background: rgba(255,255,255,0.1);
                    margin: 0 1.5rem;
                }

                .node-group {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                }

                .node-prefix {
                    font-size: 0.55rem;
                    font-weight: 900;
                    color: #444;
                    background: rgba(255,255,255,0.05);
                    padding: 2px 6px;
                    border-radius: 4px;
                }

                .node-text {
                    font-family: var(--font-mono);
                    font-size: 0.8rem;
                    color: #fff;
                    opacity: 0.8;
                }

                .strip-input {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    width: 100%;
                    outline: none;
                }

                .strip-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .edit-icon-btn, .save-icon-btn, .cancel-icon-btn {
                    background: transparent;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    transition: color 0.2s;
                }

                .edit-icon-btn:hover { color: #fff; }
                .save-icon-btn { color: var(--accent-zenith); }
                .cancel-icon-btn:hover { color: #ff4d4d; }

                .hero-card {
                    width: 460px;
                    height: 290px;
                    padding: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: #050505;
                    border-radius: 24px;
                    box-shadow: 0 0 60px rgba(57, 255, 20, 0.1);
                }
            `}</style>

        </main>
    );
}
