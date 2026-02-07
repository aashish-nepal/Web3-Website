'use client'

import { ReactNode } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * ScrollTransform - Dynamic transforms based on scroll position
 * 
 * Features:
 * - Scale, rotate, skew based on scroll
 * - Smooth interpolation
 * - Configurable ranges
 * - GPU accelerated
 */

interface ScrollTransformProps {
    children: ReactNode
    scale?: [number, number] // [start, end] scale values
    rotate?: [number, number] // [start, end] rotation in degrees
    skew?: [number, number] // [start, end] skew in degrees
    opacity?: [number, number] // [start, end] opacity values
    className?: string
}

export function ScrollTransform({
    children,
    scale,
    rotate,
    skew,
    opacity,
    className = '',
}: ScrollTransformProps) {
    const { elementRef, progress } = useScrollProgress()

    // Interpolate between start and end values
    const lerp = (start: number, end: number, t: number) => {
        return start + (end - start) * t
    }

    // Build transform string
    const buildTransform = () => {
        const transforms: string[] = []

        if (scale) {
            const scaleValue = lerp(scale[0], scale[1], progress)
            transforms.push(`scale(${scaleValue})`)
        }

        if (rotate) {
            const rotateValue = lerp(rotate[0], rotate[1], progress)
            transforms.push(`rotate(${rotateValue}deg)`)
        }

        if (skew) {
            const skewValue = lerp(skew[0], skew[1], progress)
            transforms.push(`skewY(${skewValue}deg)`)
        }

        return transforms.join(' ')
    }

    const style = {
        transform: buildTransform(),
        opacity: opacity ? lerp(opacity[0], opacity[1], progress) : 1,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        willChange: 'transform, opacity',
    }

    return (
        <div
            ref={elementRef}
            className={className}
            style={style}
        >
            {children}
        </div>
    )
}
