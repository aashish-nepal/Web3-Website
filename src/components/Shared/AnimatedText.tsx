'use client'

import { useEffect, useState } from 'react'

/**
 * AnimatedText - Text with flowing gradient animation
 * 
 * Features:
 * - Animated gradient text
 * - Typewriter effect (optional)
 * - Glitch effect on hover
 * - Customizable colors
 */

interface AnimatedTextProps {
    text: string
    className?: string
    gradient?: boolean
    typewriter?: boolean
    glitch?: boolean
}

export function AnimatedText({
    text,
    className = '',
    gradient = true,
    typewriter = false,
    glitch = false,
}: AnimatedTextProps) {
    const [displayText, setDisplayText] = useState(typewriter ? '' : text)
    const [isGlitching, setIsGlitching] = useState(false)

    useEffect(() => {
        if (!typewriter) return

        let currentIndex = 0
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(interval)
            }
        }, 100)

        return () => clearInterval(interval)
    }, [text, typewriter])

    const handleMouseEnter = () => {
        if (glitch) {
            setIsGlitching(true)
            setTimeout(() => setIsGlitching(false), 300)
        }
    }

    const gradientClass = gradient
        ? 'bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#6B4E9A] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]'
        : ''

    const glitchClass = isGlitching ? 'animate-glitch' : ''

    return (
        <span
            className={`${gradientClass} ${glitchClass} ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            {displayText}
        </span>
    )
}
