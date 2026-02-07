'use client'

import { useState, useRef, ReactNode } from 'react'

/**
 * LiquidButton - Button with liquid fill animation
 * 
 * Features:
 * - Liquid fill on hover
 * - Smooth wave animation
 * - Customizable colors
 * - Premium interaction
 */

interface LiquidButtonProps {
    children: ReactNode
    onClick?: () => void
    href?: string
    className?: string
    fillColor?: string
}

export function LiquidButton({
    children,
    onClick,
    href,
    className = '',
    fillColor = 'rgba(212, 175, 55, 1)',
}: LiquidButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

    const commonProps = {
        ref: buttonRef as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        className: `relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${className}`,
    }

    const liquidStyle = {
        position: 'absolute' as const,
        bottom: 0,
        left: 0,
        right: 0,
        height: isHovered ? '100%' : '0%',
        background: fillColor,
        transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 0,
    }

    const content = (
        <>
            <div style={liquidStyle} />
            <span className="relative z-10">{children}</span>
        </>
    )

    if (href) {
        return (
            <a {...commonProps} href={href}>
                {content}
            </a>
        )
    }

    return (
        <button {...commonProps} onClick={onClick}>
            {content}
        </button>
    )
}
