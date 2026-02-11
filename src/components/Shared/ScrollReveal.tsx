'use client'

import { ReactNode } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * ScrollReveal - Optimized scroll-triggered reveal animations
 * 
 * Features:
 * - Multiple animation types
 * - Fast, snappy transitions (0.3s)
 * - Enhanced GPU acceleration
 * - Optimized rendering performance
 */

interface ScrollRevealProps {
    children: ReactNode
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'blur'
    delay?: number
    threshold?: number // 0-1, when to trigger
    className?: string
}

export function ScrollReveal({
    children,
    animation = 'fade',
    delay = 0,
    threshold = 0.2,
    className = '',
}: ScrollRevealProps) {
    const { elementRef, progress } = useScrollProgress()

    // Trigger when progress exceeds threshold
    const isRevealed = progress >= threshold

    // Animation styles based on type - Optimized for maximum speed and smoothness
    const getAnimationStyle = () => {
        const baseStyle = {
            transition: `transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
            willChange: isRevealed ? 'auto' : 'transform, opacity',
            backfaceVisibility: 'hidden' as const,
            WebkitBackfaceVisibility: 'hidden' as const,
            WebkitFontSmoothing: 'antialiased' as const,
            contain: 'layout style paint' as const,
        }

        if (!isRevealed) {
            switch (animation) {
                case 'fade':
                    return { ...baseStyle, opacity: 0, transform: 'translate3d(0, 0, 0)' }
                case 'slide-up':
                    return { ...baseStyle, opacity: 0, transform: 'translate3d(0, 20px, 0)' }
                case 'slide-left':
                    return { ...baseStyle, opacity: 0, transform: 'translate3d(20px, 0, 0)' }
                case 'slide-right':
                    return { ...baseStyle, opacity: 0, transform: 'translate3d(-20px, 0, 0)' }
                case 'scale':
                    return { ...baseStyle, opacity: 0, transform: 'scale3d(0.95, 0.95, 1)' }
                case 'rotate':
                    return { ...baseStyle, opacity: 0, transform: 'rotate3d(0, 0, 1, -3deg) scale3d(0.97, 0.97, 1)' }
                case 'blur':
                    return { ...baseStyle, opacity: 0, filter: 'blur(6px)', transform: 'translate3d(0, 0, 0)' }
                default:
                    return baseStyle
            }
        }

        return {
            ...baseStyle,
            opacity: 1,
            transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotate3d(0, 0, 1, 0deg)',
            filter: 'blur(0)',
        }
    }

    return (
        <div
            ref={elementRef}
            className={className}
            style={getAnimationStyle()}
        >
            {children}
        </div>
    )
}
