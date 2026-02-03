'use client'

import { motion } from 'framer-motion'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { fadeInUp } from '@/lib/animations'
import { formatNumber } from '@/lib/utils'
import { Loader2, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'

interface TokenListProps {
    chainId?: number
}

/**
 * TokenList - List of all tokens with balances
 * 
 * Features:
 * - Token icon, name, symbol
 * - Balance and USD value
 * - 24h price change
 * - Sortable
 */
export function TokenList({ chainId = 1 }: TokenListProps) {
    const { balances, isLoading } = useTokenBalances(chainId)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-gold)' }} />
            </div>
        )
    }

    if (!balances || balances.length === 0) {
        return (
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="glass rounded-2xl p-12 border border-white/10 text-center"
            >
                <p className="text-white/60">No tokens found in this wallet</p>
            </motion.div>
        )
    }

    // Sort by value (highest first)
    const sortedBalances = [...balances].sort((a, b) => (b.value || 0) - (a.value || 0))

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="glass rounded-2xl border border-white/10 overflow-hidden"
        >
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-sm text-white/60 uppercase tracking-wider">
                <div className="col-span-5">Asset</div>
                <div className="col-span-3 text-right">Balance</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Value</div>
            </div>

            {/* Token Rows */}
            <div className="divide-y divide-white/10">
                {sortedBalances.map((token, index) => {
                    const priceChange = (Math.random() * 20 - 10) // Placeholder - would come from API
                    const isPositive = priceChange >= 0

                    return (
                        <motion.div
                            key={token.contractAddress}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors"
                        >
                            {/* Asset */}
                            <div className="col-span-5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 flex items-center justify-center text-xl">
                                    {token.logo ? (
                                        <img
                                            src={token.logo}
                                            alt={token.symbol}
                                            className="w-full h-full rounded-full"
                                        />
                                    ) : (
                                        '💎'
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">{token.name || 'Unknown'}</div>
                                    <div className="text-sm text-white/60">{token.symbol || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Balance */}
                            <div className="col-span-3 flex items-center justify-end">
                                <div className="text-right">
                                    <div className="font-medium">
                                        {token.balance?.toFixed(4) || '0'}
                                    </div>
                                    <div className="text-sm text-white/60">{token.symbol}</div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="col-span-2 flex items-center justify-end">
                                <div className="text-right">
                                    <div className="font-medium">
                                        ${token.price?.toFixed(2) || '0.00'}
                                    </div>
                                    <div className={`text-sm flex items-center justify-end gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                                    </div>
                                </div>
                            </div>

                            {/* Value */}
                            <div className="col-span-2 flex items-center justify-end">
                                <div className="text-right font-medium neon-text-gold">
                                    ${formatNumber(token.value || 0)}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
