'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, Clock, Rocket, Link2, BarChart3, Coins, Palette, Vote } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface Milestone {
    title: string
    description: string
    status: 'completed' | 'in-progress' | 'upcoming'
    quarter: string
    icon: any
    number: string
}

const milestones: Milestone[] = [
    {
        title: 'Platform Launch',
        description: 'Initial release with core wallet connectivity and dashboard features for seamless Web3 interactions',
        status: 'completed',
        quarter: 'Q4 2024',
        icon: Rocket,
        number: '01',
    },
    {
        title: 'Multi-Chain Support',
        description: 'Integration with Ethereum, Polygon, and Arbitrum networks for cross-chain compatibility',
        status: 'completed',
        quarter: 'Q1 2025',
        icon: Link2,
        number: '02',
    },
    {
        title: 'Advanced Analytics',
        description: 'Real-time metrics, interactive charts, and comprehensive transaction monitoring dashboard',
        status: 'in-progress',
        quarter: 'Q1 2026',
        icon: BarChart3,
        number: '03',
    },
    {
        title: 'DeFi Integration',
        description: 'Seamless token swaps, staking pools, and yield farming directly from your dashboard',
        status: 'upcoming',
        quarter: 'Q2 2026',
        icon: Coins,
        number: '04',
    },
    {
        title: 'NFT Gallery',
        description: 'Curated NFT display, collection management, and marketplace integration for digital assets',
        status: 'upcoming',
        quarter: 'Q3 2026',
        icon: Palette,
        number: '05',
    },
    {
        title: 'DAO Governance',
        description: 'Participate in protocol governance with proposal creation, voting, and delegation features',
        status: 'upcoming',
        quarter: 'Q4 2026',
        icon: Vote,
        number: '06',
    },
]

/**
 * Timeline - Ultra Premium Roadmap matching website theme
 * 
 * Features:
 * - Glass-ultra cards with gold/purple accents
 * - Holographic shimmer effects
 * - Animated border glows
 * - Number badges
 * - Status indicators
 * - Smooth scroll animations
 */
export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll progress through the timeline
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    })

    return (
        <div ref={containerRef} className="relative">
            {/* Milestones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {milestones.map((milestone, index) => {
                    const Icon = milestone.icon

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                                delay: index * 0.08,
                                duration: 0.4,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="group relative h-full"
                        >
                            {/* Animated Border Glow */}
                            <div className={cn(
                                "absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700",
                                milestone.status === 'completed' && "bg-gradient-to-r from-green-400 to-emerald-500",
                                milestone.status === 'in-progress' && "bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light-gold)]",
                                milestone.status === 'upcoming' && "bg-gradient-to-r from-[var(--purple-accent)] to-blue-500"
                            )}></div>

                            {/* Card Container */}
                            <div className={cn(
                                "relative h-full glass-ultra rounded-3xl overflow-hidden border transition-all duration-700",
                                milestone.status === 'completed' && "border-green-400/20 group-hover:border-green-400/40 group-hover:shadow-[0_0_60px_rgba(74,222,128,0.2)]",
                                milestone.status === 'in-progress' && "border-[var(--accent-gold)]/20 group-hover:border-[var(--accent-gold)]/40 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)]",
                                milestone.status === 'upcoming' && "border-[var(--purple-accent)]/20 group-hover:border-[var(--purple-accent)]/40 group-hover:shadow-[0_0_60px_rgba(107,78,154,0.2)]"
                            )}>
                                {/* Number Badge */}
                                <div className={cn(
                                    "absolute top-6 right-6 z-10 w-12 h-12 rounded-xl border flex items-center justify-center backdrop-blur-sm",
                                    milestone.status === 'completed' && "bg-gradient-to-br from-green-400/20 to-green-400/5 border-green-400/30",
                                    milestone.status === 'in-progress' && "bg-gradient-to-br from-[var(--accent-gold)]/20 to-[var(--accent-gold)]/5 border-[var(--accent-gold)]/30",
                                    milestone.status === 'upcoming' && "bg-gradient-to-br from-[var(--purple-accent)]/20 to-[var(--purple-accent)]/5 border-[var(--purple-accent)]/30"
                                )}>
                                    <span className={cn(
                                        "text-lg font-black",
                                        milestone.status === 'completed' && "text-green-400",
                                        milestone.status === 'in-progress' && "text-[var(--accent-gold)]",
                                        milestone.status === 'upcoming' && "text-[var(--purple-accent)]"
                                    )}>{milestone.number}</span>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    {/* Status Badge */}
                                    <div className="mb-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                                            milestone.status === 'completed' && "bg-green-500/20 text-green-400",
                                            milestone.status === 'in-progress' && "bg-[var(--accent-gold)]/20 text-[var(--accent-gold)]",
                                            milestone.status === 'upcoming' && "bg-[var(--purple-accent)]/20 text-[var(--purple-accent)]"
                                        )}>
                                            {milestone.status === 'completed' && (
                                                <>
                                                    <Check className="w-3.5 h-3.5" />
                                                    <span>Completed</span>
                                                </>
                                            )}
                                            {milestone.status === 'in-progress' && (
                                                <>
                                                    <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                                                    <span>In Progress</span>
                                                </>
                                            )}
                                            {milestone.status === 'upcoming' && (
                                                <>
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>Upcoming</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className={cn(
                                        "w-14 h-14 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500",
                                        milestone.status === 'completed' && "bg-gradient-to-br from-green-400/20 to-transparent border-green-400/30",
                                        milestone.status === 'in-progress' && "bg-gradient-to-br from-[var(--accent-gold)]/20 to-transparent border-[var(--accent-gold)]/30",
                                        milestone.status === 'upcoming' && "bg-gradient-to-br from-[var(--purple-accent)]/20 to-transparent border-[var(--purple-accent)]/30"
                                    )}>
                                        <Icon className={cn(
                                            "w-7 h-7",
                                            milestone.status === 'completed' && "text-green-400",
                                            milestone.status === 'in-progress' && "text-[var(--accent-gold)]",
                                            milestone.status === 'upcoming' && "text-[var(--purple-accent)]"
                                        )} />
                                    </div>

                                    {/* Title */}
                                    <h3 className={cn(
                                        "text-2xl font-bold mb-4 transition-colors duration-300",
                                        milestone.status === 'completed' && "text-white group-hover:text-green-400",
                                        milestone.status === 'in-progress' && "text-white group-hover:text-[var(--accent-gold)]",
                                        milestone.status === 'upcoming' && "text-white group-hover:text-[var(--purple-accent)]"
                                    )}>
                                        {milestone.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white/60 leading-relaxed mb-6">
                                        {milestone.description}
                                    </p>

                                    {/* Quarter Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className={cn(
                                            "h-1 w-16 rounded-full",
                                            milestone.status === 'completed' && "bg-gradient-to-r from-green-400 to-transparent",
                                            milestone.status === 'in-progress' && "bg-gradient-to-r from-[var(--accent-gold)] to-transparent",
                                            milestone.status === 'upcoming' && "bg-gradient-to-r from-[var(--purple-accent)] to-transparent"
                                        )}></div>
                                        <div className="text-xs font-medium text-white/40 uppercase tracking-wider">
                                            {milestone.quarter}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
