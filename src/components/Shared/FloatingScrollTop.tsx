'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * FloatingScrollTop - Floating action button to scroll to top
 * 
 * Features:
 * - Appears after scrolling down
 * - Smooth scroll to top
 * - Premium magnetic effect
 * - Gold gradient styling
 */

export function FloatingScrollTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility, { passive: true })

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    if (!isVisible) return null

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 gradient-gold-purple rounded-full shadow-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-110 animate-bounce-in group"
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-6 h-6 text-white group-hover:animate-float" />
        </button>
    )
}
