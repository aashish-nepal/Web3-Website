'use client'

import { useEffect, useRef } from 'react'

/**
 * HolographicText - 3D holographic text effect
 * 
 * Features:
 * - RGB split effect
 * - 3D depth layers
 * - Mouse tracking
 * - Glowing edges
 */

interface HolographicTextProps {
    text: string
    className?: string
}

export function HolographicText({ text, className = '' }: HolographicTextProps) {
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = textRef.current
        if (!element) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            const rotateX = (y / rect.height) * 10
            const rotateY = (x / rect.width) * 10

            element.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
        }

        const handleMouseLeave = () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
        }

        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mousemove', handleMouseMove)
            element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <div
            ref={textRef}
            className={`relative inline-block transition-transform duration-200 ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Main text */}
            <span className="relative z-10 bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#6B4E9A] bg-clip-text text-transparent font-bold">
                {text}
            </span>

            {/* RGB split layers */}
            <span
                className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-bold opacity-50 blur-[1px]"
                style={{ transform: 'translate3d(-2px, 0, -10px)' }}
            >
                {text}
            </span>
            <span
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent font-bold opacity-50 blur-[1px]"
                style={{ transform: 'translate3d(2px, 0, -10px)' }}
            >
                {text}
            </span>

            {/* Glow layer */}
            <span
                className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#6B4E9A] bg-clip-text text-transparent font-bold blur-[20px] opacity-30"
                style={{ transform: 'translate3d(0, 0, -20px)' }}
            >
                {text}
            </span>
        </div>
    )
}
