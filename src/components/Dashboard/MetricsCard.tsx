'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { tickerVariants, fadeInUp } from '@/lib/animations'
import { formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface MetricsCardProps {
    icon: React.ReactNode
    label: string
    value: number
    change24h?: number
    trend?: 'up' | 'down'
    suffix?: string
    className?: string
    delay?: number
}

/**
 * MetricsCard - Animated metric display card
 * 
 * Features:
 * - Ticking number animation
 * - Trend indicator with percentage
 * - Glassmorphism styling
 * - Neon glow on hover
 * - Responsive sizing
 */
export function MetricsCard({
    icon,
    label,
    value,
    change24h,
    trend = 'up',
    suffix = '',
    className,
    delay = 0,
}: MetricsCardProps) {
    const [displayValue, setDisplayValue] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)

    /**
     * Animate number counting up
     * Only runs once on mount
     */
    useEffect(() => {
        if (hasAnimated) return

        const duration = 1500 // ms
        const steps = 60
        const increment = value / steps
        let current = 0
        let step = 0

        const timer = setInterval(() => {
            step++
            current += increment

            if (step >= steps) {
                setDisplayValue(value)
                setHasAnimated(true)
                clearInterval(timer)
            } else {
                setDisplayValue(current)
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [value, hasAnimated])

    const formattedValue = formatNumber(displayValue)
    const showTrend = change24h !== undefined

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={cn(
                "glass rounded-2xl p-6 border border-white/10",
                "hover:glass-strong hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]",
                "transition-all duration-300",
                className
            )}
        >
            {/* Icon */}
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20" style={{ color: 'var(--accent-gold)' }}>
                    {icon}
                </div>
                {showTrend && (
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                        trend === 'up'
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                    )}>
                        {trend === 'up' ? (
                            <TrendingUp className="w-3 h-3" />
                        ) : (
                            <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(change24h!).toFixed(2)}%</span>
                    </div>
                )}
            </div>

            {/* Label */}
            <div className="text-sm text-white/60 uppercase tracking-wider mb-2">
                {label}
            </div>

            {/* Value */}
            <motion.div
                variants={tickerVariants}
                className="text-3xl md:text-4xl font-bold neon-text-gold"
            >
                {suffix && <span className="text-2xl mr-1">{suffix}</span>}
                {formattedValue}
            </motion.div>
        </motion.div>
    )
}
