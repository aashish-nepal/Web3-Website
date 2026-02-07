'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Send, Repeat, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

interface TokenCardProps {
    token: {
        symbol?: string
        name?: string
        balance?: number
        value?: number
        price?: number
        change24h?: number
        logo?: string
    }
    index: number
}

/**
 * TokenCard - Individual token display card
 * 
 * Features:
 * - Token info with logo
 * - Balance and USD value
 * - Mini sparkline chart
 * - 24h change indicator
 * - Quick action buttons
 * - Hover 3D transform
 */
export function TokenCard({ token, index }: TokenCardProps) {
    // Generate mock sparkline data
    const [sparklineData] = useState(() => {
        return Array.from({ length: 12 }, (_, i) => {
            const base = 50
            const variation = Math.sin(i * 0.8) * 15 + Math.random() * 8
            return base + variation
        })
    })

    const isPositive = (token.change24h || 0) >= 0

    // Generate SVG path for mini sparkline
    const generateSparklinePath = () => {
        const width = 100
        const height = 30
        const points = sparklineData.map((value, i) => {
            const x = (i / (sparklineData.length - 1)) * width
            const y = height - (value / 100) * height
            return `${x},${y}`
        })
        return `M ${points.join(' L ')}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            className="group relative"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Hover glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

            <div className="relative glass-ultra rounded-2xl p-5 border border-white/10 group-hover:border-[var(--accent-gold)]/30 transition-all duration-500">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Token logo */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-[var(--accent-gold)]/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
                            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-gold)]/20 to-[var(--purple-accent)]/20 border border-[var(--accent-gold)]/30 flex items-center justify-center">
                                <span className="text-lg font-bold">{(token.symbol || 'UK').slice(0, 2)}</span>
                            </div>
                        </div>

                        {/* Token info */}
                        <div>
                            <h3 className="font-bold text-white">{token.symbol || 'UNKNOWN'}</h3>
                            <p className="text-xs text-white/60">{token.name || 'Unknown Token'}</p>
                        </div>
                    </div>

                    {/* 24h change badge */}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                        }`}>
                        {isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                        ) : (
                            <ArrowDownRight className="w-3 h-3" />
                        )}
                        <span className="text-xs font-bold">
                            {isPositive ? '+' : ''}{(token.change24h || 0).toFixed(2)}%
                        </span>
                    </div>
                </div>

                {/* Balance and value */}
                <div className="mb-4">
                    <div className="text-2xl font-bold text-white mb-1">
                        {(token.balance || 0).toFixed(4)}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-white/60">${(token.value || 0).toFixed(2)}</span>
                        <span className="text-xs text-white/40">${(token.price || 0).toFixed(2)}/token</span>
                    </div>
                </div>

                {/* Mini sparkline */}
                <div className="mb-4 h-8">
                    <svg
                        viewBox="0 0 100 30"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            d={generateSparklinePath()}
                            fill="none"
                            stroke={isPositive ? '#10b981' : '#ef4444'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.6 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: index * 0.05 }}
                        />
                    </svg>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
                        <Repeat className="w-3.5 h-3.5" />
                        <span>Swap</span>
                    </button>
                    <button className="px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
