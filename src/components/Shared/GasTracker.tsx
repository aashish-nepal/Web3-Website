'use client'

import { motion } from 'framer-motion'
import { useGasPrice } from '@/hooks/useGasPrice'
import { Fuel, Loader2 } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

interface GasTrackerProps {
    chainId?: number
}

/**
 * GasTracker - Live gas price display
 * 
 * Features:
 * - Real-time gas prices
 * - Auto-refresh every 15s
 * - Formatted in Gwei
 */
export function GasTracker({ chainId = 1 }: GasTrackerProps) {
    const { gasPrice, isLoading } = useGasPrice(chainId)

    if (isLoading) {
        return (
            <div className="glass rounded-xl p-4 border border-white/10 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--accent-gold)' }} />
                <span className="text-sm text-white/60">Loading gas...</span>
            </div>
        )
    }

    if (!gasPrice) {
        return null
    }

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="glass rounded-xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 flex items-center justify-center">
                    <Fuel className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Gas Price</div>
                    <div className="font-bold neon-text-gold">{gasPrice.formatted}</div>
                </div>
            </div>
        </motion.div>
    )
}
