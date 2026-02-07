'use client'

import { useEffect, useState } from 'react'

/**
 * FloatingElements - 3D floating decorative elements
 * 
 * Features:
 * - Orbital animation
 * - Parallax on mouse move
 * - Glassmorphic design
 * - Random positioning
 */

interface FloatingElement {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

export function FloatingElements() {
    const [elements] = useState<FloatingElement[]>(() =>
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 100 + 50,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        }))
    )
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {elements.map((element) => (
                <div
                    key={element.id}
                    className="absolute rounded-full glass border border-white/10"
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        width: `${element.size}px`,
                        height: `${element.size}px`,
                        animation: `float-rotate ${element.duration}s ease-in-out infinite`,
                        animationDelay: `${element.delay}s`,
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                        transition: 'transform 0.3s ease-out',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05), rgba(107, 78, 154, 0.05))',
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)',
                    }}
                />
            ))}
        </div>
    )
}
