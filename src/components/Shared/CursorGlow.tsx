'use client'

import { useEffect, useState } from 'react'

/**
 * CursorGlow - Custom cursor with glow effect
 * 
 * Features:
 * - Follows mouse cursor
 * - Gold glow effect
 * - Smooth transitions
 * - Only on desktop
 */

export function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only show on desktop
        if (window.innerWidth < 768) return

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            {/* Outer glow */}
            <div
                className="fixed pointer-events-none z-50 transition-opacity duration-300"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)',
                    width: '40px',
                    height: '40px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                }}
            />

            {/* Inner dot */}
            <div
                className="fixed pointer-events-none z-50"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)',
                    width: '6px',
                    height: '6px',
                    background: '#D4AF37',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
                }}
            />
        </>
    )
}
