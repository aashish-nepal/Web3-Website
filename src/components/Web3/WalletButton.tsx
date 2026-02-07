'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ChevronDown, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    MetaMaskIcon,
    WalletConnectIcon,
    PhantomWalletIcon,
    RainbowWalletIcon,
    BraveWalletIcon,
    CoinbaseWalletIcon,
    RabbyWalletIcon,
    GenericWalletIcon
} from '@/components/icons/WalletIcons'
import { WalletInstallModal } from './WalletInstallModal'

// Priority wallets that always show on desktop
const PRIORITY_WALLETS = [
    {
        id: 'metamask',
        name: 'MetaMask',
        icon: <MetaMaskIcon size={24} />,
        installUrl: 'https://metamask.io/download/',
        detectKey: 'isMetaMask'
    },
    {
        id: 'phantom',
        name: 'Phantom',
        icon: <PhantomWalletIcon size={24} />,
        installUrl: 'https://phantom.app/download',
        detectKey: 'isPhantom'
    },
    {
        id: 'rainbow',
        name: 'Rainbow',
        icon: <RainbowWalletIcon size={24} />,
        installUrl: 'https://rainbow.me/extension',
        detectKey: 'isRainbow'
    },
    {
        id: 'brave',
        name: 'Brave Wallet',
        icon: <BraveWalletIcon size={24} />,
        installUrl: 'https://brave.com/wallet/',
        detectKey: 'isBraveWallet'
    },
    {
        id: 'coinbase',
        name: 'Coinbase Wallet',
        icon: <CoinbaseWalletIcon size={24} />,
        installUrl: 'https://www.coinbase.com/wallet/downloads',
        detectKey: 'isCoinbaseWallet'
    },
    {
        id: 'rabby',
        name: 'Rabby Wallet',
        icon: <RabbyWalletIcon size={24} />,
        installUrl: 'https://rabby.io/',
        detectKey: 'isRabby'
    }
] as const

/**
 * Enhanced wallet connection button
 * - Always shows 5 priority wallets on desktop
 * - Shows install prompts for uninstalled wallets
 * - Auto-detects other EIP-6963 compatible wallets
 */
export function WalletButton() {
    const { address, isConnected } = useAccount()
    const { connect, connectors, isPending } = useConnect()
    const { disconnect } = useDisconnect()

    const [isOpen, setIsOpen] = useState(false)
    const [connectingId, setConnectingId] = useState<string | null>(null)
    const [installModal, setInstallModal] = useState<{
        isOpen: boolean
        wallet: typeof PRIORITY_WALLETS[number] | null
    }>({ isOpen: false, wallet: null })
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    /**
     * Check if a wallet is installed
     */
    const isWalletInstalled = (walletId: string, detectKey: string): boolean => {
        if (typeof window === 'undefined') return false

        // Only return true if we have a valid connector
        // This prevents trying to connect to wallets that are detected
        // but don't have a wagmi connector configured
        const hasConnector = connectors.some(c => {
            const id = c.id.toLowerCase()
            const name = c.name.toLowerCase()
            return id.includes(walletId) || name.includes(walletId)
        })

        return hasConnector
    }

    /**
     * Get connector for a wallet
     */
    const getConnectorForWallet = (walletId: string) => {
        return connectors.find(c => {
            const id = c.id.toLowerCase()
            const name = c.name.toLowerCase()
            return id.includes(walletId) || name.includes(walletId)
        })
    }

    /**
     * Handle wallet click - connect if installed, show modal if not
     */
    const handleWalletClick = async (wallet: typeof PRIORITY_WALLETS[number]) => {
        const connector = getConnectorForWallet(wallet.id)

        // If no connector exists, show install modal
        if (!connector) {
            setInstallModal({ isOpen: true, wallet })
            return
        }

        setConnectingId(wallet.id)
        try {
            await connect({ connector })
            setIsOpen(false)
        } catch (error) {
            console.error(`Failed to connect to ${wallet.name}:`, error)
            // Reset connecting state on error
        } finally {
            setConnectingId(null)
        }
    }

    /**
     * Get other detected wallets (not in priority list)
     */
    const getOtherWallets = () => {
        return connectors.filter(connector => {
            const id = connector.id.toLowerCase()
            const name = connector.name.toLowerCase()

            // Exclude priority wallets
            const isPriority = PRIORITY_WALLETS.some(pw =>
                id.includes(pw.id) || name.includes(pw.id)
            )

            return !isPriority
        })
    }

    const getWalletIcon = (connector: any) => {
        const connectorId = connector.id?.toLowerCase() || ''
        const connectorName = connector.name?.toLowerCase() || ''

        // First, try to use the connector's own icon (EIP-6963 wallets provide this)
        if (connector.icon) {
            return (
                <img
                    src={connector.icon}
                    alt={connector.name || 'Wallet'}
                    className="w-6 h-6 rounded"
                    onError={(e) => {
                        // Fallback to generic icon if image fails to load
                        e.currentTarget.style.display = 'none'
                    }}
                />
            )
        }

        // Fallback to predefined icons for known wallets
        if (connectorId.includes('metamask') || connectorName.includes('metamask')) return <MetaMaskIcon size={24} />
        if (connectorId.includes('phantom') || connectorName.includes('phantom')) return <PhantomWalletIcon size={24} />
        if (connectorId.includes('rainbow') || connectorName.includes('rainbow')) return <RainbowWalletIcon size={24} />
        if (connectorId.includes('brave') || connectorName.includes('brave')) return <BraveWalletIcon size={24} />
        if (connectorId.includes('coinbase') || connectorName.includes('coinbase')) return <CoinbaseWalletIcon size={24} />
        if (connectorId.includes('rabby') || connectorName.includes('rabby')) return <RabbyWalletIcon size={24} />
        if (connectorId.includes('walletconnect') || connectorName.includes('walletconnect')) return <WalletConnectIcon size={24} />

        return <GenericWalletIcon size={24} />
    }

    const getWalletName = (connector: any) => {
        const connectorName = connector.name
        const connectorId = connector.id?.toLowerCase() || ''

        if (connectorName && connectorName !== 'Injected' && connectorName !== 'Unknown') {
            return connectorName
        }

        if (connectorId.includes('metamask')) return 'MetaMask'
        if (connectorId.includes('phantom')) return 'Phantom'
        if (connectorId.includes('rainbow')) return 'Rainbow'
        if (connectorId.includes('brave')) return 'Brave Wallet'
        if (connectorId.includes('coinbase')) return 'Coinbase Wallet'
        if (connectorId.includes('rabby')) return 'Rabby Wallet'
        if (connectorId.includes('walletconnect')) return 'WalletConnect'

        return 'Browser Wallet'
    }

    const handleOtherWalletConnect = async (connectorId: string) => {
        const connector = connectors.find(c => c.id === connectorId)
        if (!connector) return

        setConnectingId(connectorId)
        try {
            await connect({ connector })
            setIsOpen(false)
        } catch (error) {
            console.error('Connection failed:', error)
        } finally {
            setConnectingId(null)
        }
    }

    const otherWallets = getOtherWallets()

    if (isConnected && address) {
        return (
            <button
                onClick={() => disconnect()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all"
            >
                <span className="text-sm font-medium">
                    {address.slice(0, 6)}...{address.slice(-4)}
                </span>
            </button>
        )
    }

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-medium hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
                >
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet</span>
                    <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        isOpen && "rotate-180"
                    )} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-[450px] max-h-[600px] overflow-y-auto glass-strong rounded-2xl p-4 shadow-2xl border border-white/10 z-50 wallet-dropdown-scroll"
                            style={{
                                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.03) 0%, rgba(138, 43, 226, 0.03) 100%), radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.08) 0%, transparent 50%), rgba(0, 0, 0, 0.6)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-base font-bold text-white">Connect Wallet</h3>
                                    <p className="text-xs text-white/60 mt-0.5">Choose your wallet</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Priority Wallets Grid */}
                            <div className="mb-4">
                                <p className="text-xs text-white/50 uppercase tracking-wider mb-3 px-1">
                                    Popular Wallets
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {PRIORITY_WALLETS.map((wallet) => {
                                        const isInstalled = isWalletInstalled(wallet.id, wallet.detectKey)
                                        const isLoading = isPending && connectingId === wallet.id

                                        return (
                                            <button
                                                key={wallet.id}
                                                onClick={() => handleWalletClick(wallet)}
                                                disabled={isPending}
                                                className={cn(
                                                    "group relative p-2.5 rounded-lg transition-all border disabled:opacity-50",
                                                    "flex flex-col items-center gap-1.5",
                                                    isInstalled
                                                        ? "glass hover:glass-strong border-white/5 hover:border-[#D4AF37]/40 hover:scale-105"
                                                        : "glass border-white/5 hover:border-orange-500/40 hover:scale-105"
                                                )}
                                            >
                                                {/* Wallet Icon */}
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                                    isInstalled
                                                        ? "bg-gradient-to-br from-white/5 to-white/10 group-hover:from-[#D4AF37]/10 group-hover:to-[#FFD700]/10"
                                                        : "bg-gradient-to-br from-white/5 to-white/10 group-hover:from-orange-500/10 group-hover:to-orange-600/10"
                                                )}>
                                                    <div className="scale-110">
                                                        {wallet.icon}
                                                    </div>
                                                </div>

                                                {/* Wallet Name */}
                                                <div className="flex flex-col items-center gap-0.5 w-full">
                                                    <span className="text-xs font-semibold text-white text-center">
                                                        {wallet.name}
                                                    </span>
                                                    {!isInstalled ? (
                                                        <span className="text-[10px] text-orange-400 font-medium">
                                                            Not installed
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] text-[#D4AF37]/80">
                                                            Ready
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Loading Spinner */}
                                                {isLoading && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg">
                                                        <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                                                    </div>
                                                )}

                                                {/* Hover Glow Effect */}
                                                <div className={cn(
                                                    "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                                                    isInstalled
                                                        ? "bg-gradient-to-br from-[#D4AF37]/5 to-[#FFD700]/5"
                                                        : "bg-gradient-to-br from-orange-500/5 to-orange-600/5"
                                                )} />
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Other Wallets */}
                            {otherWallets.length > 0 && (
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-xs text-white/50 uppercase tracking-wider mb-3 px-1">
                                        Other Wallets
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {otherWallets.map((connector) => {
                                            const isLoading = isPending && connectingId === connector.id
                                            const icon = getWalletIcon(connector)
                                            const name = getWalletName(connector)

                                            return (
                                                <button
                                                    key={connector.id}
                                                    onClick={() => handleOtherWalletConnect(connector.id)}
                                                    disabled={isPending}
                                                    className="group relative p-2.5 rounded-lg glass hover:glass-strong transition-all border border-white/5 hover:border-[#D4AF37]/40 hover:scale-105 disabled:opacity-50 flex flex-col items-center gap-1.5"
                                                >
                                                    {/* Wallet Icon */}
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-white/10 group-hover:from-[#D4AF37]/10 group-hover:to-[#FFD700]/10 flex items-center justify-center transition-all">
                                                        <div className="scale-100">
                                                            {icon}
                                                        </div>
                                                    </div>

                                                    {/* Wallet Name */}
                                                    <div className="flex flex-col items-center gap-0.5 w-full">
                                                        <span className="text-xs font-semibold text-white text-center">
                                                            {name}
                                                        </span>
                                                        <span className="text-[10px] text-[#D4AF37]/80">
                                                            Available
                                                        </span>
                                                    </div>

                                                    {/* Loading Spinner */}
                                                    {isLoading && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg">
                                                            <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                                                        </div>
                                                    )}

                                                    {/* Hover Glow Effect */}
                                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#D4AF37]/5 to-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Footer Info */}
                            <div className="mt-4 pt-3 border-t border-white/10">
                                <p className="text-[10px] text-white/40 text-center">
                                    By connecting, you agree to our Terms of Service
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Install Modal */}
            {installModal.wallet && (
                <WalletInstallModal
                    isOpen={installModal.isOpen}
                    onClose={() => setInstallModal({ isOpen: false, wallet: null })}
                    walletName={installModal.wallet.name}
                    walletIcon={installModal.wallet.icon}
                    installUrl={installModal.wallet.installUrl}
                />
            )}
        </>
    )
}
