'use client'

import { motion } from 'framer-motion'
import { cardHover, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
    icon: string
    title: string
    description: string
    delay?: number
    className?: string
}

/**
 * FeatureCard - Redesigned with cyber-minimalist aesthetic
 * 
 * Features:
 * - Glassmorphism background
 * - Neon border glow on hover
 * - Icon with gradient background
 * - Framer Motion hover scale
 * - Smooth transitions
 * 
 * Server Component compatible (no hooks)
 */
export function FeatureCard({
    icon,
    title,
    description,
    delay = 0,
    className
}: FeatureCardProps) {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover="hover"
            className={cn(
                "glass rounded-2xl p-8 border border-white/10",
                "hover:glass-strong hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]",
                "transition-all duration-300 group",
                className
            )}
        >
            {/* Icon */}
            <motion.div
                variants={cardHover}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow"
            >
                <span className="text-4xl">{icon}</span>
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-white/70 leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
}
