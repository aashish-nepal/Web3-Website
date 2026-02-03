'use client'

import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react'
import { useWeb3 } from '@/hooks/useWeb3'
import { MetricsCard } from './MetricsCard'
import { TransactionFeed } from './TransactionFeed'
import { ChartCard } from './ChartCard'
import { getMockTVL, getMockTokenPrice, getMockUserCount } from '@/lib/mockData'
import { truncateAddress } from '@/lib/utils'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

/**
 * BentoGrid - Main dashboard layout
 * 
 * Features:
 * - Complex CSS Grid with varied col-spans
 * - Wallet overview card
 * - Metrics cards (TVL, price, users)
 * - Transaction feed
 * - Historical chart
 * - Responsive: stacks on mobile, 2-col tablet, complex grid desktop
 * 
 * Hydration-safe: Uses client-side wallet state
 */
export function BentoGrid() {
    const {
        address,
        ensName,
        formattedBalance,
        balanceSymbol,
        currentChain,
        isConnected
    } = useWeb3()

    // Get mock data
    const tvlData = getMockTVL()
    const priceData = getMockTokenPrice()
    const userCountData = getMockUserCount()

    if (!isConnected) {
        return (
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="glass rounded-2xl p-12 border border-white/10 text-center"
            >
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8" style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Connect Your Wallet</h3>
                    <p className="text-white/60">
                        Connect your wallet to access the dashboard and view your Web3 metrics
                    </p>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Wallet Overview - Spans 2 columns on desktop */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all"
            >
                <h3 className="text-lg font-bold mb-4">Wallet Overview</h3>
                <div className="space-y-4">
                    {/* Address */}
                    <div>
                        <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                            Address
                        </div>
                        <div className="text-lg font-bold mono neon-text-gold">
                            {ensName || truncateAddress(address || '', 12, 8)}
                        </div>
                    </div>

                    {/* Balance & Chain */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                Balance
                            </div>
                            <div className="text-xl font-bold">
                                {formattedBalance} {balanceSymbol}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                Network
                            </div>
                            <div className="flex items-center gap-2 text-lg font-bold">
                                <span>{currentChain.icon}</span>
                                <span>{currentChain.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* TVL Card */}
            <MetricsCard
                icon={<DollarSign className="w-6 h-6" />}
                label={tvlData.label}
                value={tvlData.value}
                change24h={tvlData.change24h}
                trend={tvlData.trend}
                suffix="$"
                delay={0.1}
            />

            {/* Token Price Card */}
            <MetricsCard
                icon={<TrendingUp className="w-6 h-6" />}
                label={priceData.label}
                value={priceData.value}
                change24h={priceData.change24h}
                trend={priceData.trend}
                suffix="$"
                delay={0.2}
            />

            {/* User Count Card */}
            <MetricsCard
                icon={<Users className="w-6 h-6" />}
                label={userCountData.label}
                value={userCountData.value}
                change24h={userCountData.change24h}
                trend={userCountData.trend}
                delay={0.3}
                className="lg:col-span-2"
            />

            {/* Chart - Spans 2 columns */}
            <div className="lg:col-span-2">
                <ChartCard
                    title="TVL History (7 Days)"
                    delay={0.4}
                />
            </div>

            {/* Transaction Feed - Spans 2 columns on desktop */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-2"
            >
                <TransactionFeed />
            </motion.div>
        </div>
    )
}
