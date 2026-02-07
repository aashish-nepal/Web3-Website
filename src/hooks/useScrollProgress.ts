'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useScrollProgress - Advanced scroll progress tracking
 * 
 * Features:
 * - Element scroll progress (0-1)
 * - Viewport position tracking
 * - Direction detection
 * - Velocity calculation
 */

interface ScrollProgress {
    progress: number // 0-1 based on element position in viewport
    isInView: boolean
    direction: 'up' | 'down' | null
    velocity: number
}

export function useScrollProgress() {
    const elementRef = useRef<HTMLDivElement>(null)
    const [scrollData, setScrollData] = useState<ScrollProgress>({
        progress: 0,
        isInView: false,
        direction: null,
        velocity: 0,
    })
    const lastScrollY = useRef(0)
    const lastTime = useRef(0)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        // Initialize lastTime on mount
        lastTime.current = Date.now()

        let ticking = false
        let animationFrameId: number

        const updateScrollData = () => {
            const rect = element.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const currentScrollY = window.scrollY
            const currentTime = Date.now()

            // Calculate progress (0 when entering bottom, 1 when leaving top)
            const elementTop = rect.top
            const elementHeight = rect.height
            const scrollStart = windowHeight
            const scrollEnd = -elementHeight
            const scrollRange = scrollStart - scrollEnd

            let progress = (scrollStart - elementTop) / scrollRange
            progress = Math.max(0, Math.min(1, progress))

            // Check if in view
            const isInView = rect.top < windowHeight && rect.bottom > 0

            // Calculate direction
            const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'

            // Calculate velocity (pixels per millisecond)
            const timeDelta = currentTime - lastTime.current
            const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
            const velocity = timeDelta > 0 ? scrollDelta / timeDelta : 0

            setScrollData({
                progress,
                isInView,
                direction,
                velocity,
            })

            lastScrollY.current = currentScrollY
            lastTime.current = currentTime
            ticking = false
        }

        const handleScroll = () => {
            if (!ticking) {
                animationFrameId = requestAnimationFrame(updateScrollData)
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        updateScrollData() // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [])

    return { elementRef, ...scrollData }
}
