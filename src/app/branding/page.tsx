"use client";

import React from "react";
import styles from "./branding.module.css";
import Logo from "@/components/Logo";
import { Download, Copy, ExternalLink } from "lucide-react";

export default function BrandingPage() {
    const downloadSVG = (type: "full" | "icon") => {
        const svgElement = document.querySelector(`#logo-${type} svg`);
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `trenches-logo-${type}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard");
    };

    const brandAssets = {
        tagline: "WHERE TOKENS EARN BELIEF",
        shortBio: "The first high-frequency P2P settlement layer for token incubation and community coordination. Built in the trenches.",
        longBio: "TRENCHES is the first non-custodial coordination layer engineered for hyper-visibility and pre-market growth. Earn 50% more on your tokens through verified social engagement and institutional-grade P2P settlement mechanics. Powered by belief.",
        twitterBio: "Where Tokens Earn Belief. 🔫\nThe first high-frequency P2P settlement layer for token incubation & distribution.\n\nEnlist: trenches.play",
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>BRAND_ASSETS</h1>
                <p className={styles.subtitle}>[ TACTICAL_IDENTITY_KIT_V1.0 ]</p>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Visual Identity</h2>
                <div className={styles.assetGrid}>
                    <div className={styles.assetCard}>
                        <span className={styles.assetLabel}>LOGO_HORIZONTAL</span>
                        <div id="logo-full">
                            <Logo />
                        </div>
                        <button className={styles.downloadBtn} onClick={() => downloadSVG("full")}>
                            <Download size={14} style={{ marginRight: '8px' }} /> DOWNLOAD_SVG
                        </button>
                    </div>

                    <div className={styles.assetCard}>
                        <span className={styles.assetLabel}>LOGO_ICON_ONLY</span>
                        <div id="logo-icon">
                            <Logo variant="icon" width={60} />
                        </div>
                        <button className={styles.downloadBtn} onClick={() => downloadSVG("icon")}>
                            <Download size={14} style={{ marginRight: '8px' }} /> DOWNLOAD_SVG
                        </button>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Social Media Previews</h2>
                <div className={styles.assetGrid}>
                    <div className={styles.assetCard}>
                        <span className={styles.assetLabel}>DISPLAY_PICTURE</span>
                        <div className={styles.dpPreview}>
                            <Logo variant="icon" width={50} color="#39FF14" />
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '1rem' }}>SQUARE_AVA_CONCEPT</p>
                    </div>

                    <div className={styles.assetCard}>
                        <span className={styles.assetLabel}>X_HEADER_PREVIEW</span>
                        <div className={styles.headerPreview}>
                            <Logo variant="horizontal" />
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '1rem' }}>CINEMATIC_BANNER_CONCEPT</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Written Intelligence</h2>
                <div className={styles.bioBox}>
                    <div className={styles.bioItem}>
                        <span className={styles.bioTag}>PRIMARY_TAGLINE</span>
                        <div className={styles.copyText} onClick={() => copyToClipboard(brandAssets.tagline)}>
                            {brandAssets.tagline}
                        </div>
                    </div>

                    <div className={styles.bioItem}>
                        <span className={styles.bioTag}>X_TWITTER_BIO (MAX 160)</span>
                        <div className={styles.copyText} onClick={() => copyToClipboard(brandAssets.twitterBio)}>
                            {brandAssets.twitterBio}
                        </div>
                    </div>

                    <div className={styles.bioItem}>
                        <span className={styles.bioTag}>PROJECT_MISSION_STATEMENT</span>
                        <div className={styles.copyText} onClick={() => copyToClipboard(brandAssets.longBio)}>
                            {brandAssets.longBio}
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{ marginTop: '5rem', opacity: 0.3, fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                END_OF_INTEL_PACKAGE // TRB_SYS_01
            </footer>
        </main>
    );
}
