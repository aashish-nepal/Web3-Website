'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNFTs } from '@/hooks/useNFTs'
import { NFTCard } from './NFTCard'
import { NFTModal } from './NFTModal'
import { fadeInUp } from '@/lib/animations'
import { Loader2, Image as ImageIcon } from 'lucide-react'
import type { NFT } from '@/hooks/useNFTs'

interface NFTGalleryProps {
    chainId?: number
}

/**
 * NFTGallery - NFT collection grid display
 * 
 * Features:
 * - Responsive grid layout
 * - NFT cards with hover effects
 * - Click to view details
 * - Loading states
 * - Empty state
 */
export function NFTGallery({ chainId = 1 }: NFTGalleryProps) {
    const { nfts, isLoading, error } = useNFTs(chainId)
    const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: 'var(--accent-gold)' }} />
                <p className="text-white/60">Loading your NFT collection...</p>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="glass rounded-2xl p-12 border border-white/10 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold mb-2">Failed to Load NFTs</h3>
                <p className="text-white/60">
                    There was an error fetching your NFT collection. Please try again later.
                </p>
            </div>
        )
    }

    // Empty state
    if (!nfts || nfts.length === 0) {
        return (
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="glass rounded-2xl p-12 border border-white/10 text-center"
            >
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#6B4E9A]/20 flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-10 h-10" style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No NFTs Found</h3>
                    <p className="text-white/60">
                        This wallet doesn't have any NFTs yet. Start your collection today!
                    </p>
                </div>
            </motion.div>
        )
    }

    return (
        <>
            {/* NFT Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {nfts.map((nft, index) => (
                    <NFTCard
                        key={`${nft.contractAddress}-${nft.tokenId}`}
                        nft={nft}
                        onClick={() => setSelectedNFT(nft)}
                    />
                ))}
            </div>

            {/* NFT Detail Modal */}
            <NFTModal
                nft={selectedNFT}
                isOpen={!!selectedNFT}
                onClose={() => setSelectedNFT(null)}
            />
        </>
    )
}
