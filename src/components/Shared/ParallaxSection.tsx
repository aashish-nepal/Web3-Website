'use client'

import { ReactNode } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * ParallaxSection - Scroll-based parallax container
 * 
 * Features:
 * - Vertical parallax effect
 * - Configurable speed
 * - Smooth transforms
 * - GPU accelerated
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
                transform: `translateY(${offset}px)`,
                transition: 'transform 0.1s ease-out',
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    )
}
