'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { formatNumber } from '@/lib/utils'
import { TrendingUp, TrendingDown, Loader2, Clock, BarChart3 } from 'lucide-react'
import { useMemo, useEffect, useState } from 'react'

interface PortfolioValueProps {
    chainId?: number
}

/**
 * PortfolioValue - Advanced portfolio value display with sparkline
 * 
 * Features:
 * - Animated counting for total value
 * - Sparkline chart showing 7-day trend
 * - Time period selector
 * - Premium glassmorphism design
 * - Quick stats badges
 */
export function PortfolioValue({ chainId = 1 }: PortfolioValueProps) {
    const { balances, isLoading } = useTokenBalances(chainId)
    const [timePeriod, setTimePeriod] = useState<'24h' | '7d' | '30d'>('24h')
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))

    // Generate mock sparkline data (in production, fetch from API)
    const [sparklineData] = useState(() => {
        return Array.from({ length: 20 }, (_, i) => {
            const base = 50
            const variation = Math.sin(i * 0.5) * 20 + Math.random() * 10
            return base + variation
        })
    })

    // Calculate total portfolio value
    const portfolioData = useMemo(() => {
        if (!balances || balances.length === 0) {
            return { totalValue: 0, change24h: 0, changeValue: 0 }
        }

        const totalValue = balances.reduce((sum, token) => sum + (token.value || 0), 0)

        // Mock change calculation (in production, use historical data)
        const change24h = 5.2 // Placeholder - would come from API
        const changeValue = totalValue * (change24h / 100)

        return {
            totalValue,
            change24h,
            changeValue,
        }
    }, [balances])

    const isPositive = portfolioData.change24h >= 0

    // Animate value counting
    useEffect(() => {
        const animation = animate(count, portfolioData.totalValue, {
            duration: 1.5,
            ease: 'easeOut',
        })
        return animation.stop
    }, [portfolioData.totalValue, count])

    // Generate SVG path for sparkline
    const generateSparklinePath = () => {
        const width = 200
        const height = 60
        const points = sparklineData.map((value, index) => {
            const x = (index / (sparklineData.length - 1)) * width
            const y = height - (value / 100) * height
            return `${x},${y}`
        })
        return `M ${points.join(' L ')}`
    }

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
            >
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>

                <div className="relative glass-ultra rounded-3xl p-8 border-2 border-[var(--accent-gold)]/20">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-10 h-10 animate-spin text-[var(--accent-gold)]" />
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
        >
            {/* Animated border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700 animate-gradient-xy"></div>

            {/* Background gradient orbs */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--accent-gold)]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--purple-accent)]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative glass-ultra rounded-3xl p-8 md:p-10 border-2 border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/50 transition-all duration-500 overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[var(--accent-gold)]/40 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[var(--purple-accent)]/40 rounded-br-3xl"></div>

                <div className="relative z-10">
                    {/* Header with time period selector */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-[var(--accent-gold)]" />
                            <p className="text-sm text-white/60 uppercase tracking-wider font-bold">
                                Total Portfolio Value
                            </p>
                        </div>

                        {/* Time period selector */}
                        <div className="flex items-center gap-1 glass rounded-xl p-1">
                            {(['24h', '7d', '30d'] as const).map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setTimePeriod(period)}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${timePeriod === period
                                        ? 'bg-[var(--accent-gold)]/20 text-[var(--accent-gold)]'
                                        : 'text-white/60 hover:text-white'
                                        }`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Value and change */}
                        <div>
                            <motion.div className="text-5xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">
                                    ${formatNumber(rounded.get())}
                                </span>
                            </motion.div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isPositive
                                    ? 'bg-green-500/20 border border-green-500/30'
                                    : 'bg-red-500/20 border border-red-500/30'
                                    }`}>
                                    {isPositive ? (
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <TrendingDown className="w-5 h-5 text-red-400" />
                                    )}
                                    <span className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                        {isPositive ? '+' : ''}{portfolioData.change24h.toFixed(2)}%
                                    </span>
                                </div>

                                <div className="text-white/60">
                                    <span className="text-sm">
                                        {isPositive ? '+' : ''}${Math.abs(portfolioData.changeValue).toFixed(2)}
                                    </span>
                                    <span className="text-xs ml-2">({timePeriod})</span>
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="glass rounded-xl p-3 border border-white/10">
                                    <div className="text-xs text-white/60 mb-1">Assets</div>
                                    <div className="text-xl font-bold text-white">{balances?.length || 0}</div>
                                </div>
                                <div className="glass rounded-xl p-3 border border-white/10">
                                    <div className="text-xs text-white/60 mb-1">Best Performer</div>
                                    <div className="text-xl font-bold text-green-400">+12.5%</div>
                                </div>
                            </div>
                        </div>

                        {/* Sparkline chart */}
                        <div className="relative h-40 lg:h-full flex items-center justify-center">
                            <svg
                                viewBox="0 0 200 60"
                                className="w-full h-full"
                                preserveAspectRatio="none"
                            >
                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
                                        <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Area under the line */}
                                <motion.path
                                    d={`${generateSparklinePath()} L 200,60 L 0,60 Z`}
                                    fill="url(#sparklineGradient)"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                />

                                {/* Line */}
                                <motion.path
                                    d={generateSparklinePath()}
                                    fill="none"
                                    stroke={isPositive ? '#10b981' : '#ef4444'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: 'easeInOut' }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
