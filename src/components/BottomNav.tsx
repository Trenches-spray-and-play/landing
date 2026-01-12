"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./BottomNav.module.css";

export default function BottomNav() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = () => {
            const session = localStorage.getItem('user_session');
            setIsLoggedIn(!!session);
        };

        checkSession();

        // Listen for custom login event
        window.addEventListener('session-update', checkSession);
        return () => window.removeEventListener('session-update', checkSession);
    }, []);

    const isActive = (path: string) => pathname === path;

    if (pathname?.startsWith('/welcome')) return null;

    return (
        <nav className={styles.nav}>
            <Link href="/" className={`${styles.item} ${isActive('/') ? styles.active : ''}`}>
                <span className={styles.icon}>⚡</span>
                <span className={styles.label}>TRENCHES</span>
            </Link>

            {isLoggedIn && (
                <Link href="/dashboard" className={`${styles.item} ${pathname === "/dashboard" ? styles.active : ""}`}>
                    <span className={styles.icon}>⚔️</span>
                    <span className={styles.label}>DASHBOARD</span>
                </Link>
            )}

            <Link href="/profile" className={`${styles.item} ${isActive('/profile') ? styles.active : ''}`}>
                <span className={styles.icon}>👤</span>
                <span className={styles.label}>PROFILE</span>
            </Link>
        </nav>
    );
}
