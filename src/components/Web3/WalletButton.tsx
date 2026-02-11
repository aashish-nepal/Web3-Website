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
import { DisconnectModal } from './DisconnectModal'
import { DisconnectToast } from './DisconnectToast'

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
    const [showDisconnectModal, setShowDisconnectModal] = useState(false)
    const [showDisconnectToast, setShowDisconnectToast] = useState(false)
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Detect mobile/tablet screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024) // Below 1024px is mobile/tablet
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

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
            <>
                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowDisconnectModal(true)}
                    className="group relative px-4 py-2.5 rounded-xl transition-all overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%), rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-[#8A2BE2]/20 to-[#D4AF37]/20 animate-pulse" />
                    </div>

                    <div className="relative flex items-center gap-3">
                        {/* Connection Status Indicator */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                {/* Pulsing ring */}
                                <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
                                {/* Solid dot */}
                                <div className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
                            </div>
                            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                                Connected
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                        {/* Wallet Address */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10 border border-[#D4AF37]/20">
                                <span className="text-xs font-mono font-bold text-white">
                                    {address.slice(0, 6)}
                                </span>
                                <span className="text-xs font-mono text-white/40">•••</span>
                                <span className="text-xs font-mono font-bold text-white">
                                    {address.slice(-4)}
                                </span>
                            </div>

                            {/* Chevron indicator */}
                            <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/10 to-[#8A2BE2]/10 blur-xl" />
                    </div>
                </motion.button>

                {/* Disconnect Confirmation Modal */}
                <DisconnectModal
                    isOpen={showDisconnectModal}
                    onClose={() => setShowDisconnectModal(false)}
                    onConfirm={() => {
                        disconnect()
                        setShowDisconnectToast(true)
                    }}
                    walletAddress={address}
                />
            </>
        )
    }

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-medium hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
                >
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Connect Wallet</span>
                    <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        isOpen && "rotate-180"
                    )} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-3 w-[min(360px,calc(100vw-1.5rem))] sm:w-[420px] md:w-[480px] lg:w-[500px] max-h-[80vh] sm:max-h-[85vh] md:max-h-[600px] overflow-hidden rounded-2xl shadow-2xl border z-50"
                            style={{
                                background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)',
                                backdropFilter: 'blur(24px) saturate(180%)',
                                borderColor: 'rgba(212, 175, 55, 0.2)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                            }}
                        >
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 opacity-30 pointer-events-none">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-3xl animate-pulse" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#8A2BE2]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                            </div>

                            {/* Content wrapper with scroll */}
                            <div className="relative overflow-y-auto max-h-[80vh] sm:max-h-[85vh] md:max-h-[600px] wallet-dropdown-scroll p-4 sm:p-5">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                                            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight">Connect Wallet</h3>
                                            <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Secure connection</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110 active:scale-95"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 hover:text-white transition-colors" />
                                    </button>
                                </div>

                                {/* Priority Wallets Grid */}
                                {!isMobileOrTablet && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                                                Popular Wallets
                                            </p>
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-2.5">
                                            {!isMobileOrTablet && PRIORITY_WALLETS.map((wallet) => {
                                                const isInstalled = isWalletInstalled(wallet.id, wallet.detectKey)
                                                const isLoading = isPending && connectingId === wallet.id

                                                return (
                                                    <button
                                                        key={wallet.id}
                                                        onClick={() => handleWalletClick(wallet)}
                                                        disabled={isPending}
                                                        className={cn(
                                                            "group relative p-1.5 sm:p-2.5 rounded-lg transition-all border disabled:opacity-50",
                                                            "flex flex-col items-center gap-0.5 sm:gap-1.5",
                                                            isInstalled
                                                                ? "glass hover:glass-strong border-white/5 hover:border-[#D4AF37]/40 hover:scale-105"
                                                                : "glass border-white/5 hover:border-orange-500/40 hover:scale-105"
                                                        )}
                                                    >
                                                        {/* Wallet Icon */}
                                                        <div className={cn(
                                                            "w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all",
                                                            isInstalled
                                                                ? "bg-gradient-to-br from-white/5 to-white/10 group-hover:from-[#D4AF37]/10 group-hover:to-[#FFD700]/10"
                                                                : "bg-gradient-to-br from-white/5 to-white/10 group-hover:from-orange-500/10 group-hover:to-orange-600/10"
                                                        )}>
                                                            <div className="scale-75 sm:scale-110">
                                                                {wallet.icon}
                                                            </div>
                                                        </div>

                                                        {/* Wallet Name */}
                                                        <div className="flex flex-col items-center gap-0 sm:gap-0.5 w-full">
                                                            <span className="text-[10px] sm:text-xs font-semibold text-white text-center line-clamp-1">
                                                                {wallet.name}
                                                            </span>
                                                            {!isInstalled ? (
                                                                <span className="text-[8px] sm:text-[10px] text-orange-400 font-medium">
                                                                    Not installed
                                                                </span>
                                                            ) : (
                                                                <span className="text-[8px] sm:text-[10px] text-[#D4AF37]/80">
                                                                    Ready
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Loading Spinner */}
                                                        {isLoading && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg">
                                                                <Loader2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 animate-spin text-[#D4AF37]" />
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
                                )}

                                {/* Other Wallets */}
                                {otherWallets.length > 0 && (
                                    <div className="border-t border-white/10 pt-2 sm:pt-4">
                                        {!isMobileOrTablet && (
                                            <p className="text-[9px] sm:text-xs text-white/50 uppercase tracking-wider mb-1.5 sm:mb-3 px-0.5 sm:px-1">
                                                Other Wallets
                                            </p>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-1.5 sm:gap-2.5">
                                            {otherWallets
                                                .filter(connector => {
                                                    const id = connector.id?.toLowerCase() || ''
                                                    const name = connector.name?.toLowerCase() || ''
                                                    // On mobile/tablet, show only WalletConnect
                                                    if (isMobileOrTablet) {
                                                        return id.includes('walletconnect') || name.includes('walletconnect')
                                                    }
                                                    // On desktop, show all
                                                    return true
                                                })
                                                .map((connector) => {
                                                    const isLoading = isPending && connectingId === connector.id
                                                    const icon = getWalletIcon(connector)
                                                    const name = getWalletName(connector)

                                                    return (
                                                        <button
                                                            key={connector.id}
                                                            onClick={() => handleOtherWalletConnect(connector.id)}
                                                            disabled={isPending}
                                                            className={cn(
                                                                "group relative overflow-hidden rounded-2xl transition-all duration-300 disabled:opacity-50 border",
                                                                isMobileOrTablet
                                                                    ? "p-5 sm:p-6 hover:scale-[1.02] active:scale-[0.98] border-[#D4AF37]/30"
                                                                    : "p-3 hover:scale-105 border-white/10 hover:border-[#D4AF37]/40"
                                                            )}
                                                            style={{
                                                                background: isMobileOrTablet
                                                                    ? 'linear-gradient(135deg, rgba(25, 25, 40, 0.9) 0%, rgba(30, 30, 45, 0.9) 100%)'
                                                                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                                                boxShadow: isMobileOrTablet
                                                                    ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                                                    : '0 4px 12px rgba(0, 0, 0, 0.2)',
                                                            }}
                                                        >
                                                            {/* Animated border gradient */}
                                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-[#FFD700]/10 to-[#D4AF37]/10" />
                                                            </div>

                                                            <div className={cn(
                                                                "relative flex items-center",
                                                                isMobileOrTablet ? "flex-row gap-4" : "flex-col gap-2"
                                                            )}>
                                                                {/* Wallet Icon */}
                                                                <div className={cn(
                                                                    "rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 border",
                                                                    isMobileOrTablet
                                                                        ? "w-14 h-14 sm:w-16 sm:h-16 border-[#D4AF37]/40"
                                                                        : "w-10 h-10 border-white/10"
                                                                )}
                                                                    style={{
                                                                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.15) 100%)',
                                                                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.15)',
                                                                    }}>
                                                                    <div className={isMobileOrTablet ? "scale-125" : "scale-100"}>
                                                                        {icon}
                                                                    </div>
                                                                </div>

                                                                {/* Wallet Name */}
                                                                <div className={cn(
                                                                    "flex flex-col",
                                                                    isMobileOrTablet ? "items-start flex-1" : "items-center gap-0.5"
                                                                )}>
                                                                    <span className={cn(
                                                                        "font-bold text-white",
                                                                        isMobileOrTablet ? "text-base sm:text-lg" : "text-xs"
                                                                    )}>
                                                                        {name}
                                                                    </span>
                                                                    <div className="flex items-center gap-1.5">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                                        <span className={cn(
                                                                            "text-emerald-400 font-medium",
                                                                            isMobileOrTablet ? "text-xs sm:text-sm" : "text-[10px]"
                                                                        )}>
                                                                            Ready
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Arrow icon for mobile */}
                                                                {isMobileOrTablet && (
                                                                    <ChevronDown className="w-5 h-5 text-[#D4AF37] -rotate-90 group-hover:translate-x-1 transition-transform" />
                                                                )}
                                                            </div>

                                                            {/* Loading Spinner */}
                                                            {isLoading && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl">
                                                                    <Loader2 className={cn(
                                                                        "animate-spin text-[#D4AF37]",
                                                                        isMobileOrTablet ? "w-7 h-7 sm:w-8 sm:h-8" : "w-5 h-5"
                                                                    )} />
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
                                <div className="mt-2 sm:mt-4 pt-1.5 sm:pt-3 border-t border-white/10">
                                    <p className="text-[8px] sm:text-[10px] text-white/40 text-center leading-tight">
                                        By connecting, you agree to our Terms of Service
                                    </p>
                                </div>
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

            {/* Disconnect Success Toast */}
            <DisconnectToast
                isVisible={showDisconnectToast}
                onClose={() => setShowDisconnectToast(false)}
            />
        </>
    )
}
