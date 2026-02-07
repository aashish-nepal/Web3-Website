'use client'

import { motion } from 'framer-motion'
import { PortfolioValue } from '@/components/Portfolio/PortfolioValue'
import { TokenCard } from '@/components/Portfolio/TokenCard'
import { PerformanceMetrics } from '@/components/Portfolio/PerformanceMetrics'
import { NFTGallery } from '@/components/NFT/NFTGallery'
import { useAccount } from 'wagmi'
import { Wallet, Sparkles, TrendingUp } from 'lucide-react'
import { useTokenBalances } from '@/hooks/useTokenBalances'

/**
 * Portfolio Page - Advanced portfolio view
 * 
 * Features:
 * - Animated hero with portfolio value
 * - Interactive token cards grid
 * - Performance metrics dashboard
 * - NFT gallery
 * - Premium glassmorphism design
 */
export default function PortfolioPage() {
    const { address, isConnected } = useAccount()
    const { balances, isLoading } = useTokenBalances(1)

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
                {/* Background effects */}
                <div className="fixed inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#6B4E9A]/10 animate-gradient" />
                </div>
                <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

                <div className="relative pt-32 pb-20 px-4">
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative group"
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)] rounded-3xl opacity-20 blur-xl"></div>

                            <div className="relative glass-ultra rounded-3xl p-12 md:p-16 border-2 border-[var(--accent-gold)]/30 text-center">
                                {/* Animated icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="relative w-24 h-24 mx-auto mb-6"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 rounded-full blur-xl animate-pulse"></div>
                                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 border-2 border-[var(--accent-gold)]/40 flex items-center justify-center">
                                        <Wallet className="w-12 h-12 text-[var(--accent-gold)]" />
                                    </div>
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-5xl font-bold mb-4"
                                >
                                    <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">
                                        Connect Your Wallet
                                    </span>
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white/60 text-lg mb-8 max-w-md mx-auto"
                                >
                                    Connect your wallet to view your portfolio, track assets, and manage your Web3 investments
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center justify-center gap-4 text-sm text-white/40"
                                >
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        <span>Real-time tracking</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-white/40"></div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>Performance metrics</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background effects */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#6B4E9A]/10 animate-gradient" />
            </div>
            <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

            <div className="relative pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header with Premium Full-Width Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center relative"
                    >
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {/* Scan line effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/5 to-transparent h-32 animate-scan-line"></div>
                            {/* Floating particles */}
                            <div className="absolute top-10 left-1/4 w-1 h-1 bg-[var(--accent-gold)] rounded-full animate-float"></div>
                            <div className="absolute top-20 right-1/3 w-1 h-1 bg-[var(--purple-accent)] rounded-full animate-float-slow"></div>
                            <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Premium Full-Width Badge with 3D Effect */}
                        <div className="max-w-7xl mx-auto mb-8 relative group/badge" style={{ perspective: '1000px' }}>
                            <div className="relative px-16 py-4 bg-gradient-to-r from-[var(--accent-gold)]/15 via-[var(--purple-accent)]/15 to-[var(--accent-gold)]/15 backdrop-blur-md border-2 border-[var(--accent-gold)]/40 rounded-3xl transform group-hover/badge:rotateX-2 transition-transform duration-700">
                                {/* Holographic shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1500 rounded-3xl"></div>

                                {/* Animated border glow */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover/badge:opacity-30 blur-lg transition-opacity duration-700 animate-gradient-xy"></div>

                                <div className="flex items-center justify-center gap-6 relative z-10">
                                    {/* Left accent */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[var(--accent-gold)]"></div>
                                        <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                                    </div>

                                    {/* Main text with split gradient */}
                                    <div className="relative">
                                        <span className="text-4xl md:text-4xl lg:text-6xl font-black uppercase whitespace-nowrap">
                                            <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">Your </span>
                                            <span className="bg-gradient-to-r from-[var(--purple-accent)] via-blue-400 to-[var(--purple-accent)] bg-clip-text text-transparent">Portfolio</span>
                                        </span>
                                        {/* Text shadow effect */}
                                        <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)]"></div>
                                    </div>

                                    {/* Right accent */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                        <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[var(--accent-gold)]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced corner accents with animation */}
                            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                        </div>

                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Track your assets, analyze performance, and manage your Web3 investments
                        </p>
                    </motion.div>

                    {/* Portfolio Value Hero */}
                    <PortfolioValue />

                    {/* Performance Metrics */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold mb-6 flex items-center gap-3"
                        >
                            <TrendingUp className="w-8 h-8 text-[var(--accent-gold)]" />
                            <span className="text-white">Performance Metrics</span>
                        </motion.h2>
                        <PerformanceMetrics />
                    </div>

                    {/* Token Grid */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-between mb-6"
                        >
                            <h2 className="text-3xl font-bold text-white">Your Tokens</h2>
                            <div className="glass rounded-xl px-4 py-2 border border-white/10">
                                <span className="text-sm text-white/60">
                                    {balances?.length || 0} assets
                                </span>
                            </div>
                        </motion.div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="glass-ultra rounded-2xl p-5 border border-white/10 h-64 animate-pulse"></div>
                                ))}
                            </div>
                        ) : balances && balances.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {balances.map((token, index) => (
                                    <TokenCard key={token.symbol} token={token} index={index} />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-ultra rounded-2xl p-12 border border-white/10 text-center"
                            >
                                <p className="text-white/60">No tokens found in your wallet</p>
                            </motion.div>
                        )}
                    </div>

                    {/* NFT Gallery */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold mb-6 text-white"
                        >
                            Your NFTs
                        </motion.h2>
                        <NFTGallery />
                    </div>
                </div>
            </div>
        </div>
    )
}
