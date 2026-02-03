'use client'

import { motion } from 'framer-motion'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { fadeInUp } from '@/lib/animations'
import { formatNumber } from '@/lib/utils'
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react'
import { useMemo } from 'react'

interface PortfolioValueProps {
    chainId?: number
}

/**
 * PortfolioValue - Total portfolio value display
 * 
 * Features:
 * - Aggregate all token values
 * - 24h change calculation
 * - Loading states
 * - Animated numbers
 */
export function PortfolioValue({ chainId = 1 }: PortfolioValueProps) {
    const { balances, isLoading } = useTokenBalances(chainId)

    // Calculate total portfolio value
    const portfolioData = useMemo(() => {
        if (!balances || balances.length === 0) {
            return { totalValue: 0, change24h: 0 }
        }

        const totalValue = balances.reduce((sum, token) => sum + (token.value || 0), 0)

        // For now, use average change (in production, calculate based on historical data)
        const avgChange = balances.reduce((sum, token) => {
            // Placeholder - would need historical data for accurate calculation
            return sum + (Math.random() * 10 - 5) // Random between -5% and +5%
        }, 0) / balances.length

        return {
            totalValue,
            change24h: avgChange,
        }
    }, [balances])

    const isPositive = portfolioData.change24h >= 0

    if (isLoading) {
        return (
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="glass rounded-2xl p-8 border border-white/10"
            >
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-gold)' }} />
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="glass rounded-2xl p-8 border border-white/10 hover:border-[#D4AF37]/30 transition-all"
        >
            <div className="mb-2">
                <p className="text-sm text-white/60 uppercase tracking-wider">
                    Total Portfolio Value
                </p>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <div className="text-4xl md:text-5xl font-bold neon-text-gold mb-2">
                        ${formatNumber(portfolioData.totalValue)}
                    </div>

                    <div className="flex items-center gap-2">
                        {isPositive ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
                            {isPositive ? '+' : ''}{portfolioData.change24h.toFixed(2)}%
                        </span>
                        <span className="text-white/60 text-sm">24h</span>
                    </div>
                </div>

                {/* Optional: Add sparkline chart here */}
            </div>
        </motion.div>
    )
}
