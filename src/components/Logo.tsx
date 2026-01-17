"use client";

import React from "react";

interface LogoProps {
    variant?: "icon" | "horizontal";
    width?: number | string;
    color?: string;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({
    variant = "horizontal",
    width,
    color = "currentColor",
    className = ""
}) => {
    const iconWidth = variant === "icon" ? (width || "60") : "40";

    const Icon = () => (
        <svg
            width={iconWidth}
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <rect x="25" y="10" width="50" height="4" fill={color} />
            <rect x="35" y="20" width="30" height="4" fill={color} opacity="0.6" />
            <rect x="42" y="30" width="16" height="20" fill={color} opacity="0.3" />
        </svg>
    );

    if (variant === "icon") {
        return <Icon />;
    }

    return (
        <div
            className={`flex items-center gap-4 ${className}`}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
            <Icon />
            <span
                style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    letterSpacing: '-1px',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    fontFamily: 'var(--font-sans)',
                    color: color === "currentColor" ? "var(--text-primary)" : color
                }}
            >
                TRENCHES
            </span>
        </div>
    );
};

export default Logo;
