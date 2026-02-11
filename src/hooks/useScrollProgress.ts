'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useScrollProgress - Optimized scroll progress tracking
 * 
 * Features:
 * - High-performance element scroll progress (0-1)
 * - Intersection Observer for better performance
 * - Optimized RAF throttling
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
    const rafId = useRef<number>()
    const isInViewRef = useRef(false)

    const updateScrollData = useCallback(() => {
        const element = elementRef.current
        if (!element || !isInViewRef.current) return

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
        const direction = currentScrollY > lastScrollY.current ? 'down' : currentScrollY < lastScrollY.current ? 'up' : null

        // Calculate velocity (pixels per millisecond) - smoothed
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
    }, [])

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        // Initialize
        lastTime.current = Date.now()
        lastScrollY.current = window.scrollY

        // Use Intersection Observer for better performance
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isInViewRef.current = entry.isIntersecting
                    if (entry.isIntersecting) {
                        updateScrollData()
                    }
                })
            },
            {
                rootMargin: '50px 0px', // Start tracking slightly before element enters viewport
                threshold: 0,
            }
        )

        observer.observe(element)

        // Optimized scroll handler with RAF
        let ticking = false
        const handleScroll = () => {
            if (!ticking && isInViewRef.current) {
                rafId.current = requestAnimationFrame(() => {
                    updateScrollData()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        
        // Initial call
        updateScrollData()

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
            if (rafId.current) {
                cancelAnimationFrame(rafId.current)
            }
        }
    }, [updateScrollData])

    return { elementRef, ...scrollData }
}
