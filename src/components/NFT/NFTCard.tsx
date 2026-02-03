'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { NFT } from '@/hooks/useNFTs'
import { fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

interface NFTCardProps {
    nft: NFT
    onClick?: () => void
}

/**
 * NFTCard - Individual NFT display card
 * 
 * Features:
 * - Image with lazy loading
 * - Name and collection
 * - Hover effects with gold glow
 * - Click to view details
 */
export function NFTCard({ nft, onClick }: NFTCardProps) {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    // Fallback image if NFT image fails to load
    const fallbackImage = '/nft-placeholder.png'

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={onClick}
            className={cn(
                "glass rounded-2xl overflow-hidden cursor-pointer",
                "border border-white/10 hover:border-[#D4AF37]/50",
                "hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]",
                "transition-all duration-300 group"
            )}
        >
            {/* NFT Image */}
            <div className="relative aspect-square bg-gradient-to-br from-[#0A0E27] to-[#1A2247] overflow-hidden">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                    </div>
                )}

                {!imageError && nft.image ? (
                    <img
                        src={nft.image}
                        alt={nft.name || 'NFT'}
                        className={cn(
                            "w-full h-full object-cover transition-opacity duration-300",
                            imageLoading ? "opacity-0" : "opacity-100",
                            "group-hover:scale-110 transition-transform duration-500"
                        )}
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                            setImageError(true)
                            setImageLoading(false)
                        }}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        🖼️
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* NFT Info */}
            <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate group-hover:text-[#D4AF37] transition-colors">
                    {nft.name || `#${nft.tokenId}`}
                </h3>
                <p className="text-sm text-white/60 truncate">
                    {nft.collection || 'Unknown Collection'}
                </p>
            </div>
        </motion.div>
    )
}
