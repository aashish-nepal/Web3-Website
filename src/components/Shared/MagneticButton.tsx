'use client'

import { useRef, useState, MouseEvent, ReactNode } from 'react'

/**
 * MagneticButton - Button that follows cursor on hover
 * 
 * Features:
 * - Smooth magnetic effect
 * - Configurable strength
 * - Returns to center on mouse leave
 * - Premium interaction feel
 */

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    strength?: number
    onClick?: () => void
    href?: string
}

export function MagneticButton({
    children,
    className = '',
    strength = 0.3,
    onClick,
    href,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        if (!buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
    }

    const commonProps = {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style,
        className,
    }

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                {...commonProps}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            {...commonProps}
        >
            {children}
        </button>
    )
}
