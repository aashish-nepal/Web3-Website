'use client'

import { useEffect, useState } from 'react'

/**
 * TypingEffect - Typewriter animation for text
 * 
 * Features:
 * - Character-by-character typing
 * - Configurable speed
 * - Cursor blink effect
 * - Loop support
 */

interface TypingEffectProps {
    texts: string[]
    typingSpeed?: number // ms per character
    deletingSpeed?: number // ms per character
    pauseDuration?: number // ms to pause before deleting
    className?: string
    showCursor?: boolean
}

export function TypingEffect({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className = '',
    showCursor = true,
}: TypingEffectProps) {
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentText = texts[currentIndex]

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1))
                } else {
                    // Finished typing, pause then start deleting
                    setTimeout(() => setIsDeleting(true), pauseDuration)
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1))
                } else {
                    // Finished deleting, move to next text
                    setIsDeleting(false)
                    setCurrentIndex((currentIndex + 1) % texts.length)
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed)

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

    return (
        <span className={className}>
            {displayText}
            {showCursor && (
                <span className="animate-pulse text-[var(--accent-gold)]">|</span>
            )}
        </span>
    )
}
