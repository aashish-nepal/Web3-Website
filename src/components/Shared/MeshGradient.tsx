'use client'

import { useEffect, useRef } from 'react'

/**
 * MeshGradient - Interactive mesh gradient background
 * 
 * Features:
 * - Mouse-tracking gradient
 * - Smooth color transitions
 * - Canvas-based rendering
 * - Performance optimized
 */

export function MeshGradient() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })
    const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
    const animationFrameRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            targetMouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            }
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Animation loop
        const animate = () => {
            // Smooth mouse interpolation
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05

            // Create gradient
            const gradient = ctx.createRadialGradient(
                canvas.width * mouseRef.current.x,
                canvas.height * mouseRef.current.y,
                0,
                canvas.width * mouseRef.current.x,
                canvas.height * mouseRef.current.y,
                canvas.width * 0.8
            )

            // Gold to Purple gradient
            gradient.addColorStop(0, 'rgba(212, 175, 55, 0.15)')
            gradient.addColorStop(0.5, 'rgba(107, 78, 154, 0.1)')
            gradient.addColorStop(1, 'rgba(10, 14, 39, 0)')

            // Clear and draw
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    )
}
