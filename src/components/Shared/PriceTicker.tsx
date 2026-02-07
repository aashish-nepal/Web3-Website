'use client'

import { motion } from 'framer-motion'
import { useTokenPrices } from '@/hooks/useTokenPrices'
import { fadeInUp } from '@/lib/animations'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * PriceTicker - Live price ticker for top tokens
 * 
 * Features:
 * - Real-time prices
 * - 24h change indicators
 * - Horizontal scrolling
 * - Auto-refresh
 */
export function PriceTicker() {
    const { prices, isLoading, isMockData } = useTokenPrices(['ETH', 'BTC', 'USDC', 'MATIC', 'ARB'])

    if (isLoading || !prices || prices.length === 0) {
        return null
    }

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 overflow-hidden"
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide flex-1">
                    {prices.map((token) => {
                        const isPositive = token.change24h >= 0

                        return (
                            <div
                                key={token.id}
                                className="flex items-center gap-2 sm:gap-3 min-w-fit"
                            >
                                <div className="font-bold text-sm sm:text-base text-white/80">{token.symbol}</div>
                                <div className="font-medium text-sm sm:text-base neon-text-gold">
                                    ${token.price.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                <div className={`flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {isPositive ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                                    {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                                </div>
                            </div>
                        )
                    })}
                </div>
                {isMockData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium whitespace-nowrap"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Mock Data
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
