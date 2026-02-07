'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useScrollAnimation - Hook for scroll-triggered animations
 * 
 * Features:
 * - Detects when element enters viewport
 * - Configurable threshold and root margin
 * - Returns animated state for conditional rendering
 */

interface UseScrollAnimationOptions {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
    } = options

    const elementRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (triggerOnce) {
                        observer.unobserve(element)
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [threshold, rootMargin, triggerOnce])

    return { elementRef, isVisible }
}
