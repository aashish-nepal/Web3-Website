'use client'

import { useEffect, useState, useCallback } from 'react'

/**
 * ScrollCounter - Animated number counter on scroll
 * 
 * Features:
 * - Counts up when in view
 * - Smooth easing
 * - Configurable duration
 * - Supports decimals and formatting
 */

interface ScrollCounterProps {
    end: number
    start?: number
    duration?: number // milliseconds
    decimals?: number
    prefix?: string
    suffix?: string
    className?: string
}

export function ScrollCounter({
    end,
    start = 0,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
    className = '',
}: ScrollCounterProps) {
    const [count, setCount] = useState(start)
    const [hasAnimated, setHasAnimated] = useState(false)

    const animateCount = useCallback(() => {
        const startTime = Date.now()
        const range = end - start

        const updateCount = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = start + range * eased

            setCount(current)

            if (progress < 1) {
                requestAnimationFrame(updateCount)
            } else {
                setCount(end)
            }
        }

        requestAnimationFrame(updateCount)
    }, [end, start, duration])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true)
                    animateCount()
                }
            },
            { threshold: 0.5 }
        )

        const element = document.getElementById(`counter-${end}`)
        if (element) {
            observer.observe(element)
        }

        return () => observer.disconnect()
    }, [hasAnimated, end, animateCount])

    const formattedCount = count.toFixed(decimals)

    return (
        <span id={`counter-${end}`} className={className}>
            {prefix}{formattedCount}{suffix}
        </span>
    )
}
