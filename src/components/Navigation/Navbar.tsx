'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Wallet } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'
import { WalletHub } from '../Web3/WalletHub'
import { truncateAddress } from '@/lib/utils'
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
    const [isWalletHubOpen, setIsWalletHubOpen] = useState(false)
    const { isConnected, displayName, currentChain } = useWeb3()

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
        <>
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

                        {/* Wallet Button */}
                        <div className="flex items-center gap-3">
                            {isConnected ? (
                                <button
                                    onClick={() => setIsWalletHubOpen(true)}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 glass rounded-xl hover:glass-strong transition-all border border-white/10"
                                >
                                    <span className="text-sm">{currentChain.icon}</span>
                                    <span className="text-sm font-medium mono">{displayName}</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsWalletHubOpen(true)}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 gradient-gold-purple rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all font-medium"
                                >
                                    <Wallet className="w-4 h-4" />
                                    <span>Connect Wallet</span>
                                </button>
                            )}

                            {/* Mobile Wallet Button */}
                            <button
                                onClick={() => setIsWalletHubOpen(true)}
                                className="md:hidden p-2 glass rounded-lg"
                            >
                                <Wallet className="w-5 h-5" />
                            </button>

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

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-white/10 py-4"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavigation(link.href)}
                                        className="px-4 py-3 rounded-lg text-left text-white/70 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.nav>

            {/* WalletHub Modal */}
            <WalletHub
                isOpen={isWalletHubOpen}
                onClose={() => setIsWalletHubOpen(false)}
            />
        </>
    )
}
