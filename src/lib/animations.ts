import { Variants } from 'framer-motion'

/**
 * Framer Motion animation variants library
 * Optimized for performance with GPU-accelerated transforms
 */

/**
 * Fade in with upward motion
 * Used for: Cards, sections entering viewport
 */
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

/**
 * Scale in from center
 * Used for: Modals, popups
 */
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2,
        },
    },
}

/**
 * Slide in from direction
 * Used for: Drawers, side panels
 */
export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'right'): Variants => {
    const directions = {
        left: { x: -100 },
        right: { x: 100 },
        up: { y: -100 },
        down: { y: 100 },
    }

    return {
        hidden: {
            opacity: 0,
            ...directions[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    }
}

/**
 * Stagger children animations
 * Used for: Lists, grids
 */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

/**
 * Number ticking animation
 * Used for: Metrics, counters
 */
export const tickerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
}

/**
 * Pulsing glow effect
 * Used for: Active states, notifications
 */
export const glowPulse: Variants = {
    initial: {
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
    },
    animate: {
        boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.3)',
            '0 0 40px rgba(212, 175, 55, 0.6)',
            '0 0 20px rgba(212, 175, 55, 0.3)',
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
}

/**
 * Card hover interaction
 * Used for: Interactive cards
 */
export const cardHover: Variants = {
    rest: {
        scale: 1,
        y: 0,
    },
    hover: {
        scale: 1.02,
        y: -4,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
}

/**
 * Navbar scroll animation
 * Used for: Sticky navbar
 */
export const navbarScroll: Variants = {
    top: {
        backgroundColor: 'rgba(10, 14, 39, 0)',
        backdropFilter: 'blur(0px)',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    },
    scrolled: {
        backgroundColor: 'rgba(10, 14, 39, 0.8)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        transition: {
            duration: 0.3,
        },
    },
}

/**
 * Transaction feed item animation
 * Used for: Live transaction feed
 */
export const transactionItem: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
        height: 0,
    },
    visible: {
        opacity: 1,
        x: 0,
        height: 'auto',
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        height: 0,
        transition: {
            duration: 0.3,
        },
    },
}

/**
 * Wallet connect success flash
 * Used for: Connection success feedback
 */
export const successFlash: Variants = {
    initial: {
        backgroundColor: 'rgba(212, 175, 55, 0)',
    },
    flash: {
        backgroundColor: [
            'rgba(212, 175, 55, 0)',
            'rgba(212, 175, 55, 0.3)',
            'rgba(212, 175, 55, 0)',
        ],
        transition: {
            duration: 0.6,
            times: [0, 0.5, 1],
        },
    },
}

/**
 * Floating animation
 * Used for: Background elements, decorative items
 */
export const floating: Variants = {
    animate: {
        y: [0, -20, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
}

/**
 * Reduced motion variants for accessibility
 * Respects prefers-reduced-motion setting
 */
export const getReducedMotionVariants = (variants: Variants): Variants => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Return simplified variants without animations
        return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        }
    }
    return variants
}
