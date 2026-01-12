"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLogin() {
    const [key, setKey] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // MVP Auth: Simple client-side check. In prod, use real auth.
        if (key === 'spray_and_pray_admin') {
            document.cookie = "admin_auth=true; path=/";
            router.push('/admin');
        } else {
            alert('ACCESS DENIED');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.form}>
                <h1 className={styles.title}>COMMAND ACCESS</h1>
                <input
                    type="password"
                    placeholder="ENTER KEY"
                    className={styles.input}
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <button type="submit" className={styles.button}>AUTHENTICATE</button>
            </form>
        </div>
    );
}
