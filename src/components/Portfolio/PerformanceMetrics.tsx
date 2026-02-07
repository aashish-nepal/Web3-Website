'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, PieChart, Target, Activity } from 'lucide-react'
import { useMemo } from 'react'

/**
 * PerformanceMetrics - Portfolio performance dashboard
 * 
 * Features:
 * - Asset allocation visualization
 * - Top performers grid
 * - Portfolio metrics
 * - Risk indicators
 */
export function PerformanceMetrics() {
    // Mock data for demonstration
    const topPerformers = useMemo(() => [
        { symbol: 'ETH', change: 12.5, value: 2487.32 },
        { symbol: 'BTC', change: 8.3, value: 43521.18 },
        { symbol: 'USDC', change: 0.02, value: 1.0 },
    ], [])

    const metrics = useMemo(() => ({
        totalGain: 2456.78,
        totalGainPercent: 15.3,
        bestDay: 456.23,
        worstDay: -123.45,
        avgDailyReturn: 2.3,
        sharpeRatio: 1.8,
    }), [])

    // Mock allocation data
    const allocation = useMemo(() => [
        { name: 'ETH', percentage: 45, color: '#627EEA' },
        { name: 'BTC', percentage: 30, color: '#F7931A' },
        { name: 'USDC', percentage: 15, color: '#2775CA' },
        { name: 'Others', percentage: 10, color: '#6B4E9A' },
    ], [])

    // Calculate donut chart segments
    const donutSegments = useMemo(() => {
        let currentAngle = -90
        return allocation.map((item) => {
            const angle = (item.percentage / 100) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle = endAngle

            const startRad = (startAngle * Math.PI) / 180
            const endRad = (endAngle * Math.PI) / 180
            const radius = 40
            const innerRadius = 25

            const x1 = 50 + radius * Math.cos(startRad)
            const y1 = 50 + radius * Math.sin(startRad)
            const x2 = 50 + radius * Math.cos(endRad)
            const y2 = 50 + radius * Math.sin(endRad)
            const x3 = 50 + innerRadius * Math.cos(endRad)
            const y3 = 50 + innerRadius * Math.sin(endRad)
            const x4 = 50 + innerRadius * Math.cos(startRad)
            const y4 = 50 + innerRadius * Math.sin(startRad)

            const largeArc = angle > 180 ? 1 : 0

            const pathData = [
                `M ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                `L ${x3} ${y3}`,
                `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
                'Z',
            ].join(' ')

            return { ...item, pathData }
        })
    }, [allocation])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Asset Allocation Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1 relative group"
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

                <div className="relative glass-ultra rounded-2xl p-6 border border-white/10 group-hover:border-[var(--accent-gold)]/30 transition-all">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="w-5 h-5 text-[var(--accent-gold)]" />
                        <h3 className="font-bold text-white">Asset Allocation</h3>
                    </div>

                    {/* Donut Chart */}
                    <div className="relative w-48 h-48 mx-auto mb-6">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                            {donutSegments.map((segment, index) => (
                                <motion.path
                                    key={segment.name}
                                    d={segment.pathData}
                                    fill={segment.color}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="cursor-pointer"
                                />
                            ))}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{allocation.length}</div>
                                <div className="text-xs text-white/60">Assets</div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2">
                        {allocation.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-sm text-white/80">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-white">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Top Performers & Metrics */}
            <div className="lg:col-span-2 space-y-6">
                {/* Top Performers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

                    <div className="relative glass-ultra rounded-2xl p-6 border border-white/10 group-hover:border-green-500/30 transition-all">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            <h3 className="font-bold text-white">Top Performers (24h)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {topPerformers.map((token, index) => (
                                <motion.div
                                    key={token.symbol}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-xl p-4 border border-green-500/20"
                                >
                                    <div className="text-sm text-white/60 mb-1">{token.symbol}</div>
                                    <div className="text-xl font-bold text-white mb-2">${token.value.toFixed(2)}</div>
                                    <div className="flex items-center gap-1 text-green-400">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="text-sm font-bold">+{token.change}%</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Performance Metrics Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                    <MetricCard
                        icon={<Target className="w-5 h-5" />}
                        label="Total Gain"
                        value={`$${metrics.totalGain.toFixed(2)}`}
                        change={`+${metrics.totalGainPercent}%`}
                        isPositive={true}
                    />
                    <MetricCard
                        icon={<Activity className="w-5 h-5" />}
                        label="Best Day"
                        value={`$${metrics.bestDay.toFixed(2)}`}
                        isPositive={true}
                    />
                    <MetricCard
                        icon={<Activity className="w-5 h-5" />}
                        label="Avg Daily"
                        value={`${metrics.avgDailyReturn}%`}
                        isPositive={true}
                    />
                </motion.div>
            </div>
        </div>
    )
}

function MetricCard({
    icon,
    label,
    value,
    change,
    isPositive,
}: {
    icon: React.ReactNode
    label: string
    value: string
    change?: string
    isPositive: boolean
}) {
    return (
        <div className="glass-ultra rounded-xl p-4 border border-white/10 hover:border-[var(--accent-gold)]/30 transition-all group">
            <div className="flex items-center gap-2 mb-2 text-[var(--accent-gold)]">
                {icon}
                <span className="text-xs text-white/60 uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            {change && (
                <div className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {change}
                </div>
            )}
        </div>
    )
}
