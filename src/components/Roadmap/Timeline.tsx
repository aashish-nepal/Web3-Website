'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface Milestone {
    title: string
    description: string
    status: 'completed' | 'in-progress' | 'upcoming'
    icon: string
}

const milestones: Milestone[] = [
    {
        title: 'Platform Launch',
        description: 'Initial release with core wallet connectivity and dashboard features',
        status: 'completed',
        icon: '🚀',
    },
    {
        title: 'Multi-Chain Support',
        description: 'Integration with Ethereum, Polygon, and Arbitrum networks',
        status: 'completed',
        icon: '⛓️',
    },
    {
        title: 'Advanced Analytics',
        description: 'Real-time metrics, charts, and transaction monitoring',
        status: 'in-progress',
        icon: '📊',
    },
    {
        title: 'DeFi Integration',
        description: 'Swap, stake, and yield farming directly from the dashboard',
        status: 'upcoming',
        icon: '💎',
    },
    {
        title: 'NFT Gallery',
        description: 'View, manage, and showcase your NFT collection',
        status: 'upcoming',
        icon: '🎨',
    },
    {
        title: 'DAO Governance',
        description: 'Participate in protocol governance and voting',
        status: 'upcoming',
        icon: '🗳️',
    },
]

/**
 * Timeline - Vertical scroll-progress roadmap
 * 
 * Features:
 * - Scroll-triggered animations
 * - Progress line with gradient
 * - Glowing icons for milestones
 * - Status indicators
 * - Glassmorphism cards
 */
export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll progress through the timeline
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    })

    // Transform scroll progress to line height
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

    return (
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
            {/* Progress Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10">
                <motion.div
                    style={{ height: lineHeight }}
                    className="w-full bg-gradient-to-b from-[#D4AF37] to-[#6B4E9A]"
                />
            </div>

            {/* Milestones */}
            <div className="space-y-12">
                {milestones.map((milestone, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "relative flex items-center gap-8",
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        )}
                    >
                        {/* Icon */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                            <div className={cn(
                                "w-16 h-16 rounded-full flex items-center justify-center",
                                "glass-strong border-2",
                                milestone.status === 'completed' && "border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]",
                                milestone.status === 'in-progress' && "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)] animate-pulse-glow",
                                milestone.status === 'upcoming' && "border-white/20"
                            )}>
                                <span className="text-2xl">{milestone.icon}</span>
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className={cn(
                            "flex-1 ml-24 md:ml-0",
                            index % 2 === 0 ? "md:mr-[calc(50%+4rem)]" : "md:ml-[calc(50%+4rem)]"
                        )}>
                            <div className={cn(
                                "glass rounded-xl p-6 border",
                                milestone.status === 'completed' && "border-green-400/30",
                                milestone.status === 'in-progress' && "border-[#D4AF37]/30",
                                milestone.status === 'upcoming' && "border-white/10"
                            )}>
                                {/* Status Badge */}
                                <div className="flex items-center gap-2 mb-3">
                                    {milestone.status === 'completed' && (
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium">
                                            <Check className="w-3 h-3" />
                                            <span>Completed</span>
                                        </div>
                                    )}
                                    {milestone.status === 'in-progress' && (
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium">
                                            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                                            <span>In Progress</span>
                                        </div>
                                    )}
                                    {milestone.status === 'upcoming' && (
                                        <div className="px-2 py-1 rounded-lg bg-white/10 text-white/60 text-xs font-medium">
                                            Upcoming
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>

                                {/* Description */}
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
