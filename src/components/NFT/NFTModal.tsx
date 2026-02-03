'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { NFT } from '@/hooks/useNFTs'
import { scaleIn } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface NFTModalProps {
    nft: NFT | null
    isOpen: boolean
    onClose: () => void
}

/**
 * NFTModal - NFT detail modal
 * 
 * Features:
 * - Large image view
 * - Full metadata display
 * - Traits/attributes
 * - Links to OpenSea
 */
export function NFTModal({ nft, isOpen, onClose }: NFTModalProps) {
    if (!nft) return null

    const openSeaUrl = `https://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.tokenId}`

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative w-full max-w-4xl glass-strong rounded-2xl p-6 shadow-2xl my-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: Image */}
                                <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#0A0E27] to-[#1A2247]">
                                    {nft.image ? (
                                        <img
                                            src={nft.image}
                                            alt={nft.name || 'NFT'}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-8xl">
                                            🖼️
                                        </div>
                                    )}
                                </div>

                                {/* Right: Details */}
                                <div className="flex flex-col">
                                    {/* Collection */}
                                    <div className="mb-2">
                                        <p className="text-sm text-white/60">{nft.collection}</p>
                                    </div>

                                    {/* Name */}
                                    <h2 className="text-3xl font-bold mb-4 gradient-text">
                                        {nft.name || `#${nft.tokenId}`}
                                    </h2>

                                    {/* Description */}
                                    {nft.description && (
                                        <div className="mb-6">
                                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-2">
                                                Description
                                            </h3>
                                            <p className="text-white/80 leading-relaxed">
                                                {nft.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Attributes */}
                                    {nft.attributes && nft.attributes.length > 0 && (
                                        <div className="mb-6 flex-1">
                                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">
                                                Traits
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                                                {nft.attributes.map((attr, index) => (
                                                    <div
                                                        key={index}
                                                        className="glass rounded-lg p-3 border border-white/10"
                                                    >
                                                        <p className="text-xs text-white/60 mb-1">
                                                            {attr.trait_type}
                                                        </p>
                                                        <p className="text-sm font-medium truncate">
                                                            {attr.value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-auto">
                                        <a
                                            href={openSeaUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 gradient-gold-purple rounded-xl font-medium hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                                        >
                                            <span>View on OpenSea</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
