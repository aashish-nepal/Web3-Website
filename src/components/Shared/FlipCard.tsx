'use client'

import { useState, ReactNode } from 'react'

/**
 * FlipCard - Card with flip animation
 * 
 * Features:
 * - 3D flip on click/hover
 * - Front and back content
 * - Smooth transitions
 * - Glassmorphic design
 */

interface FlipCardProps {
    front: ReactNode
    back: ReactNode
    className?: string
    triggerOnHover?: boolean
}

export function FlipCard({
    front,
    back,
    className = '',
    triggerOnHover = false,
}: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleInteraction = () => {
        if (!triggerOnHover) {
            setIsFlipped(!isFlipped)
        }
    }

    const handleMouseEnter = () => {
        if (triggerOnHover) {
            setIsFlipped(true)
        }
    }

    const handleMouseLeave = () => {
        if (triggerOnHover) {
            setIsFlipped(false)
        }
    }

    return (
        <div
            className={`relative transform-3d cursor-pointer ${className}`}
            style={{ perspective: '1000px' }}
            onClick={handleInteraction}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 backface-hidden glass rounded-2xl p-8 border border-white/10"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {front}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden glass-strong rounded-2xl p-8 border border-[var(--accent-gold)]/30"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {back}
                </div>
            </div>
        </div>
    )
}
