'use client'

import { useConnect, useDisconnect, type Connector } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, ExternalLink, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'
import { ChainSwitcher } from './ChainSwitcher'
import { scaleIn, successFlash } from '@/lib/animations'
import { copyToClipboard, truncateAddress } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface WalletHubProps {
    isOpen: boolean
    onClose: () => void
}

/**
 * WalletHub - Advanced wallet connection modal
 * 
 * Features:
 * - Connector selection with icons and loading states
 * - Connected view with address, ENS, balance, chain
 * - Copy-to-clipboard with success animation
 * - Chain switcher
 * - Disconnect with glow effect
 * - Micro-interactions and animations
 * 
 * Hydration-safe: Uses client-side state management
 */
export function WalletHub({ isOpen, onClose }: WalletHubProps) {
    const { connect, connectors, isPending: isConnecting } = useConnect()
    const { disconnect } = useDisconnect()
    const {
        address,
        ensName,
        isConnected,
        formattedBalance,
        balanceSymbol,
        explorerUrl,
        connectorName,
    } = useWeb3()

    const [connectingId, setConnectingId] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    /**
     * Handle wallet connection
     * Shows loading state and success animation
     */
    const handleConnect = async (connector: Connector) => {
        setConnectingId(connector.id)
        try {
            await connect({ connector })
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                onClose()
            }, 1000)
        } catch (error) {
            console.error('Connection failed:', error)
            setConnectingId(null)
        }
    }

    /**
     * Handle disconnect with cleanup
     */
    const handleDisconnect = () => {
        disconnect()
        onClose()
    }

    /**
     * Copy address to clipboard with success feedback
     */
    const handleCopy = async () => {
        if (!address) return
        const success = await copyToClipboard(address)
        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    /**
     * Get connector icon
     */
    const getConnectorIcon = (id: string) => {
        if (id.includes('metaMask') || id === 'injected') return '🦊'
        if (id.includes('walletConnect')) return '🔗'
        if (id.includes('coinbase')) return '🔵'
        return '🔌'
    }

    /**
     * Get connector display name
     */
    const getConnectorName = (id: string) => {
        if (id.includes('metaMask') || id === 'injected') return 'MetaMask'
        if (id.includes('walletConnect')) return 'WalletConnect'
        if (id.includes('coinbase')) return 'Coinbase Wallet'
        return id
    }

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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate={showSuccess ? "visible" : "visible"}
                            exit="exit"
                            className={cn(
                                "relative w-full max-w-md glass-strong rounded-2xl p-6 shadow-2xl",
                                showSuccess && "neon-glow-gold"
                            )}
                        >
                            {/* Success Flash Overlay */}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        variants={successFlash}
                                        initial="initial"
                                        animate="flash"
                                        className="absolute inset-0 rounded-2xl pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold gradient-text">
                                    {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
                                </h2>
                                <p className="text-sm text-white/60 mt-1">
                                    {isConnected
                                        ? `Connected with ${connectorName}`
                                        : 'Choose your preferred wallet provider'
                                    }
                                </p>
                            </div>

                            {/* Connected View */}
                            {isConnected && address ? (
                                <div className="space-y-4">
                                    {/* Address Section */}
                                    <div className="glass rounded-xl p-4">
                                        <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">
                                            Wallet Address
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 text-sm mono text-white/90">
                                                {ensName || truncateAddress(address, 10, 8)}
                                            </code>
                                            <button
                                                onClick={handleCopy}
                                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                                title="Copy address"
                                            >
                                                {copied ? (
                                                    <Check className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                            <a
                                                href={explorerUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                                title="View on explorer"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Balance Section */}
                                    <div className="glass rounded-xl p-4">
                                        <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">
                                            Balance
                                        </label>
                                        <div className="text-2xl font-bold neon-text-gold">
                                            {formattedBalance} {balanceSymbol}
                                        </div>
                                    </div>

                                    {/* Chain Switcher */}
                                    <ChainSwitcher />

                                    {/* Disconnect Button */}
                                    <button
                                        onClick={handleDisconnect}
                                        className="w-full py-3 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                    >
                                        Disconnect Wallet
                                    </button>
                                </div>
                            ) : (
                                /* Connector Selection */
                                <div className="space-y-3">
                                    {connectors.map((connector) => {
                                        const isLoading = isConnecting && connectingId === connector.id
                                        const icon = getConnectorIcon(connector.id)
                                        const name = getConnectorName(connector.id)

                                        return (
                                            <motion.button
                                                key={connector.id}
                                                onClick={() => handleConnect(connector)}
                                                disabled={isConnecting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-4 rounded-xl",
                                                    "glass hover:glass-strong transition-all",
                                                    "border border-white/10 hover:border-[#D4AF37]/50",
                                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                                    isLoading && "neon-glow-gold"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{icon}</span>
                                                    <span className="font-medium">{name}</span>
                                                </div>
                                                {isLoading && (
                                                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--accent-gold)' }} />
                                                )}
                                            </motion.button>
                                        )
                                    })}
                                </div>
                            )}

                            {/* Footer Note */}
                            {!isConnected && (
                                <p className="text-xs text-white/40 text-center mt-6">
                                    By connecting, you agree to our Terms of Service
                                </p>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
