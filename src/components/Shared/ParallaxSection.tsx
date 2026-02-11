'use client'

import { ReactNode } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * ParallaxSection - Optimized scroll-based parallax container
 * 
 * Features:
 * - Ultra-smooth vertical parallax effect
 * - RAF-driven updates (no CSS transitions)
 * - Configurable speed
 * - Enhanced GPU acceleration
 */

interface ParallaxSectionProps {
    children: ReactNode
    speed?: number // 0.1 to 1.0, lower = slower
    className?: string
}

export function ParallaxSection({
    children,
    speed = 0.5,
    className = '',
}: ParallaxSectionProps) {
    const { elementRef, progress } = useScrollProgress()

    // Calculate parallax offset
    const offset = (progress - 0.5) * 100 * speed

    return (
        <div
            ref={elementRef}
            className={`relative ${className}`}
            style={{
                transform: `translate3d(0, ${offset}px, 0)`,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                contain: 'layout style paint',
            }}
        >
            {children}
        </div>
    )
}
