'use client'

import { useState, ReactNode } from 'react'

/**
 * Tooltip - Enhanced tooltip component
 * 
 * Features:
 * - Multiple positions
 * - Smooth animations
 * - Rich content support
 * - Glassmorphic design
 */

interface TooltipProps {
    content: ReactNode
    children: ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
    delay?: number
}

export function Tooltip({
    content,
    children,
    position = 'top',
    delay = 200,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        const id = setTimeout(() => setIsVisible(true), delay)
        setTimeoutId(id)
    }

    const handleMouseLeave = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        setIsVisible(false)
    }

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <div
                    className={`absolute z-50 ${positionClasses[position]} animate-fade-in-up`}
                >
                    <div className="glass-strong rounded-lg px-3 py-2 text-sm border border-white/20 shadow-lg whitespace-nowrap">
                        {content}
                    </div>
                </div>
            )}
        </div>
    )
}
