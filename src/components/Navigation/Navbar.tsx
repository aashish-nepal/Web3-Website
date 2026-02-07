'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { WalletButton } from '../Web3/WalletButton'
import { cn } from '@/lib/utils'

/**
 * Navbar - Floating navigation with glassmorphism
 * 
 * Features:
 * - Scroll-based background blur
 * - Section navigation with smooth scroll
 * - Wallet connection button/dropdown
 * - Mobile hamburger menu
 * - Sticky positioning
 * 
 * Server/Client: Client component for scroll effects and wallet state
 */
export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    /**
     * Handle scroll for navbar background
     */
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /**
     * Navigation sections
     */
    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'Dashboard', href: '#dashboard' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Features', href: '#features' },
        { label: 'Roadmap', href: '#roadmap' },
    ]

    /**
     * Handle navigation - supports both hash links (#section) and routes (/page)
     */
    const handleNavigation = (href: string) => {
        // If it's a hash link, scroll to section
        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                setIsMobileMenuOpen(false)
            }
        } else {
            // If it's a route, use Next.js navigation
            window.location.href = href
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                isScrolled
                    ? "glass-strong shadow-lg"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleNavigation('#home')}
                    >
                        <div className="w-8 h-8 rounded-lg gradient-gold-purple flex items-center justify-center">
                            <span className="text-white font-bold">W3</span>
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:inline">
                            Web3 OS
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavigation(link.href)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Wallet Button & Mobile Menu */}
                    <div className="flex items-center gap-3">
                        {/* Desktop Wallet Button */}
                        <div className="hidden md:block">
                            <WalletButton />
                        </div>

                        {/* Mobile Wallet Button */}
                        <div className="md:hidden">
                            <WalletButton />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 glass rounded-lg"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Advanced Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4"
                    >
                        <div className="glass-strong rounded-2xl p-4 border border-white/20 shadow-2xl backdrop-blur-xl">
                            {/* Menu Header */}
                            <div className="flex items-center gap-2 px-3 py-2 mb-3 border-b border-white/10">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Navigation</span>
                            </div>

                            {/* Menu Items with Stagger Animation */}
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.2 }}
                                        onClick={() => handleNavigation(link.href)}
                                        className="group relative px-4 py-3.5 rounded-xl text-left font-medium text-white/80 hover:text-white transition-all overflow-hidden"
                                    >
                                        {/* Hover gradient background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-gold)]/10 to-[var(--purple-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                                        {/* Left accent line */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-[var(--accent-gold)] to-[var(--purple-accent)] group-hover:h-8 transition-all duration-300 rounded-full"></div>

                                        {/* Content */}
                                        <div className="relative flex items-center justify-between">
                                            <span className="group-hover:translate-x-2 transition-transform duration-300">
                                                {link.label}
                                            </span>
                                            <svg
                                                className="w-4 h-4 text-[var(--accent-gold)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Menu Footer with Decorative Elements */}
                            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-2">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/50 to-transparent"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]/50"></div>
                                <div className="h-px w-12 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/50 to-transparent"></div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
