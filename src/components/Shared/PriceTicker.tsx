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
    const { prices, isLoading } = useTokenPrices(['ETH', 'BTC', 'USDC', 'MATIC', 'ARB'])

    if (isLoading || !prices || prices.length === 0) {
        return null
    }

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="glass rounded-xl p-4 border border-white/10 overflow-hidden"
        >
            <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
                {prices.map((token) => {
                    const isPositive = token.change24h >= 0

                    return (
                        <div
                            key={token.id}
                            className="flex items-center gap-3 min-w-fit"
                        >
                            <div className="font-bold text-white/80">{token.symbol}</div>
                            <div className="font-medium neon-text-gold">
                                ${token.price.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}
