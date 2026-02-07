'use client'

import { useEffect, useRef } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * ScrollPath - SVG path animation on scroll
 * 
 * Features:
 * - Draws SVG path as user scrolls
 * - Smooth stroke animation
 * - Customizable colors
 * - Perfect for timelines/connections
 */

interface ScrollPathProps {
    className?: string
    strokeColor?: string
    strokeWidth?: number
}

export function ScrollPath({
    className = '',
    strokeColor = '#D4AF37',
    strokeWidth = 3,
}: ScrollPathProps) {
    const { elementRef, progress } = useScrollProgress()
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
        const path = pathRef.current
        if (!path) return

        const length = path.getTotalLength()

        // Set up the starting positions
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`

        // Update on scroll
        const offset = length * (1 - progress)
        path.style.strokeDashoffset = `${offset}`
    }, [progress])

    return (
        <div ref={elementRef} className={`relative ${className}`}>
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={pathRef}
                    d="M 50 0 Q 50 50, 100 100 T 50 200 T 100 300 T 50 400"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 0.1s ease-out',
                    }}
                />
            </svg>
        </div>
    )
}
