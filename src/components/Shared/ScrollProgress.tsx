'use client'

import { useEffect, useState } from 'react'

/**
 * ScrollProgress - Animated scroll progress indicator
 * 
 * Features:
 * - Shows page scroll progress
 * - Smooth gradient animation
 * - Fixed at top of viewport
 * - Premium gold gradient
 */

export function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const scrollTop = window.scrollY

            const totalScroll = documentHeight - windowHeight
            const progress = (scrollTop / totalScroll) * 100

            setScrollProgress(Math.min(progress, 100))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial call

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5">
            <div
                className="h-full gradient-gold-purple transition-all duration-150 ease-out"
                style={{
                    width: `${scrollProgress}%`,
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
                }}
            />
        </div>
    )
}
