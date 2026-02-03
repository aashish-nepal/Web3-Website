'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { generateMockChartData } from '@/lib/mockData'
import { formatNumber } from '@/lib/utils'

interface ChartCardProps {
    title: string
    data?: Array<{ time: string; value: number }>
    color?: string
    delay?: number
}

/**
 * ChartCard - Area chart visualization
 * 
 * Features:
 * - Recharts integration
 * - Gradient fill with neon colors
 * - Glassmorphism card
 * - Responsive sizing
 * - Custom tooltip
 */
export function ChartCard({
    title,
    data = generateMockChartData(7),
    color = '#D4AF37',
    delay = 0
}: ChartCardProps) {
    /**
     * Custom tooltip with glassmorphism
     */
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-strong rounded-lg p-3 border border-white/20">
                    <p className="text-xs text-white/60 mb-1">{payload[0].payload.time}</p>
                    <p className="text-sm font-bold neon-text-gold">
                        ${formatNumber(payload[0].value)}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay }}
            className="glass rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all"
        >
            {/* Header */}
            <h3 className="text-lg font-bold mb-4">{title}</h3>

            {/* Chart */}
            <div className="h-[200px] md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            stroke="rgba(255,255,255,0.3)"
                            style={{ fontSize: '12px' }}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.3)"
                            style={{ fontSize: '12px' }}
                            tickLine={false}
                            tickFormatter={(value) => `$${formatNumber(value)}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}
