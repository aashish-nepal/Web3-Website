'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { transactionItem } from '@/lib/animations'
import {
    generateMockTransactions,
    generateNewTransaction,
    getTransactionIcon,
    getTransactionColor,
    type Transaction
} from '@/lib/mockData'
import { truncateAddress, timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

/**
 * TransactionFeed - Live transaction feed with animations
 * 
 * Features:
 * - AnimatePresence for slide-in/out
 * - Auto-updating with new transactions
 * - Transaction type icons and colors
 * - Truncated addresses
 * - Time ago display
 * - Max 10 visible transactions
 */
export function TransactionFeed() {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    /**
     * Initialize with mock transactions
     */
    useEffect(() => {
        setTransactions(generateMockTransactions(10))
    }, [])

    /**
     * Add new transaction every 5 seconds
     */
    useEffect(() => {
        const interval = setInterval(() => {
            const newTx = generateNewTransaction()
            setTransactions((prev) => {
                const updated = [newTx, ...prev]
                return updated.slice(0, 10) // Keep only last 10
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="glass rounded-2xl p-6 border border-white/10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Live Transactions</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-white/60">Live</span>
                </div>
            </div>

            {/* Transaction List */}
            <div className="flex-1 overflow-hidden">
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    <AnimatePresence mode="popLayout">
                        {transactions.map((tx) => (
                            <motion.div
                                key={tx.id}
                                variants={transactionItem}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                className="glass rounded-lg p-3 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    {/* Type Icon */}
                                    <div className="flex-shrink-0">
                                        <span className="text-xl">{getTransactionIcon(tx.type)}</span>
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn(
                                                "text-xs font-medium uppercase",
                                                getTransactionColor(tx.type)
                                            )}>
                                                {tx.type}
                                            </span>
                                            <span className="text-xs text-white/40">
                                                {timeAgo(tx.timestamp)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-white/60">
                                            <span className="mono">{truncateAddress(tx.from, 6, 4)}</span>
                                            <span>→</span>
                                            <span className="mono">{truncateAddress(tx.to, 6, 4)}</span>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="flex-shrink-0 text-right">
                                        <div className="text-sm font-bold text-white">
                                            {tx.amount}
                                        </div>
                                        <div className="text-xs text-white/60">
                                            {tx.token}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
