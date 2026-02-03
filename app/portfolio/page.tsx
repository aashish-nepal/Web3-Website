'use client'

import { motion } from 'framer-motion'
import { PortfolioValue } from '@/components/Portfolio/PortfolioValue'
import { TokenList } from '@/components/Portfolio/TokenList'
import { NFTGallery } from '@/components/NFT/NFTGallery'
import { fadeInUp } from '@/lib/animations'
import { useAccount } from 'wagmi'
import { Wallet } from 'lucide-react'

/**
 * Portfolio Page - Dedicated portfolio view
 * 
 * Features:
 * - Portfolio value overview
 * - Token list with balances
 * - NFT gallery
 * - Multi-chain support
 */
export default function PortfolioPage() {
    const { address, isConnected } = useAccount()

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="glass rounded-2xl p-12 border border-white/10 text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 flex items-center justify-center mx-auto mb-4">
                            <Wallet className="w-10 h-10" style={{ color: 'var(--accent-gold)' }} />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Connect Your Wallet</h2>
                        <p className="text-white/60 mb-6">
                            Connect your wallet to view your portfolio, tokens, and NFTs
                        </p>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-5xl font-bold mb-2 gradient-text">
                        Your Portfolio
                    </h1>
                    <p className="text-white/60">
                        Track your assets, tokens, and NFTs in one place
                    </p>
                </motion.div>

                {/* Portfolio Value */}
                <PortfolioValue />

                {/* Token List */}
                <div>
                    <motion.h2
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-4"
                    >
                        Your Tokens
                    </motion.h2>
                    <TokenList />
                </div>

                {/* NFT Gallery */}
                <div>
                    <motion.h2
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-4"
                    >
                        Your NFTs
                    </motion.h2>
                    <NFTGallery />
                </div>
            </div>
        </div>
    )
}
