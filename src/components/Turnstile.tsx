"use client";

import { useEffect, useRef } from 'react';

interface TurnstileProps {
    onVerify: (token: string) => void;
    siteKey?: string;
}

export default function Turnstile({ onVerify, siteKey }: TurnstileProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);

    const FINAL_SITE_KEY = siteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    useEffect(() => {
        // Load Turnstile script if not present
        if (!window.turnstile) {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = renderWidget;
        } else {
            renderWidget();
        }

        function renderWidget() {
            if (window.turnstile && containerRef.current && !widgetId.current) {
                widgetId.current = window.turnstile.render(containerRef.current, {
                    sitekey: FINAL_SITE_KEY || '1x00000000000000000000AA', // Testing key
                    callback: (token: string) => onVerify(token),
                    theme: 'dark',
                });
            }
        }

        return () => {
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
                widgetId.current = null;
            }
        };
    }, [onVerify, FINAL_SITE_KEY]);

    return (
        <div
            ref={containerRef}
            className="turnstile-container"
            style={{ minHeight: '65px', display: 'flex', justifyContent: 'center', margin: '1rem 0' }}
        />
    );
}

// Global type for Turnstile
declare global {
    interface Window {
        turnstile: {
            render: (container: string | HTMLElement, options: any) => string;
            remove: (widgetId: string) => void;
        };
    }
}
