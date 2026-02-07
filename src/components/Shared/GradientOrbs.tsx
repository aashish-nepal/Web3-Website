'use client'

import { useRef } from 'react'

/**
 * GradientOrbs - Animated gradient orbs background
 * 
 * Features:
 * - Multiple floating gradient orbs
 * - Smooth animations
 * - Blur effects
 * - Midnight Luxury colors
 */

export function GradientOrbs() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Large Gold Orb */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] animate-float-slow"
                style={{
                    background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
                    top: '10%',
                    left: '10%',
                    animationDelay: '0s',
                }}
            />

            {/* Purple Orb */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-25 blur-[100px] animate-float-slow"
                style={{
                    background: 'radial-gradient(circle, #6B4E9A 0%, transparent 70%)',
                    top: '60%',
                    right: '15%',
                    animationDelay: '2s',
                }}
            />

            {/* Blue Orb */}
            <div
                className="absolute w-[350px] h-[350px] rounded-full opacity-20 blur-[90px] animate-float-slow"
                style={{
                    background: 'radial-gradient(circle, #4A6FA5 0%, transparent 70%)',
                    bottom: '20%',
                    left: '50%',
                    animationDelay: '4s',
                }}
            />

            {/* Small Gold Accent */}
            <div
                className="absolute w-[250px] h-[250px] rounded-full opacity-15 blur-[80px] animate-float-slow"
                style={{
                    background: 'radial-gradient(circle, #E8C547 0%, transparent 70%)',
                    top: '40%',
                    right: '40%',
                    animationDelay: '1s',
                }}
            />

            {/* Bronze Accent */}
            <div
                className="absolute w-[300px] h-[300px] rounded-full opacity-15 blur-[90px] animate-float-slow"
                style={{
                    background: 'radial-gradient(circle, #8B7355 0%, transparent 70%)',
                    bottom: '10%',
                    right: '10%',
                    animationDelay: '3s',
                }}
            />
        </div>
    )
}
