'use client'

import { useRef, MouseEvent, ReactNode } from 'react'

/**
 * AnimatedCard - Card with 3D tilt effect on hover
 * 
 * Features:
 * - Smooth 3D perspective tilt
 * - Glowing border on hover
 * - Configurable tilt strength
 * - Premium glassmorphism
 */

interface AnimatedCardProps {
    children: ReactNode
    className?: string
    tiltStrength?: number
}

export function AnimatedCard({
    children,
    className = '',
    tiltStrength = 10,
}: AnimatedCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) / rect.width
        const deltaY = (e.clientY - centerY) / rect.height

        const rotateX = -deltaY * tiltStrength
        const rotateY = deltaX * tiltStrength

        cardRef.current.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `
    }

    const handleMouseLeave = () => {
        if (!cardRef.current) return
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`transition-all duration-300 ease-out ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    )
}
