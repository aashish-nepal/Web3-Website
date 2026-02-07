'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useWeb3 } from '@/hooks/useWeb3'
import { supportedChains, type SupportedChainId } from '@/lib/wagmi'
import { getChainName, getChainIcon } from '@/lib/utils'
import { cn } from '@/lib/utils'

/**
 * ChainSwitcher - Network switching component
 * 
 * Features:
 * - Dropdown with all supported chains
 * - Current chain highlight
 * - Chain icons and names
 * - Loading state during switch
 * - Error handling
 */
export function ChainSwitcher() {
    const { chainId, switchToChain, isSwitchingChain } = useWeb3()
    const [isOpen, setIsOpen] = useState(false)
    const [switchingTo, setSwitchingTo] = useState<number | null>(null)

    /**
     * Handle chain switch with loading state
     */
    const handleSwitch = async (targetChainId: number) => {
        if (targetChainId === chainId) {
            setIsOpen(false)
            return
        }

        setSwitchingTo(targetChainId)
        const success = await switchToChain(targetChainId as SupportedChainId)

        if (success) {
            setTimeout(() => {
                setIsOpen(false)
                setSwitchingTo(null)
            }, 500)
        } else {
            setSwitchingTo(null)
        }
    }

    const currentChainName = getChainName(chainId)
    const currentChainIcon = getChainIcon(chainId)

    return (
        <div className="relative">
            {/* Current Chain Display / Dropdown Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isSwitchingChain}
                className={cn(
                    "w-full glass rounded-xl p-4 flex items-center justify-between",
                    "hover:glass-strong transition-all border border-white/10",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider block mb-1">
                        Network
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{currentChainIcon}</span>
                        <span className="font-medium">{currentChainName}</span>
                    </div>
                </div>
                <ChevronDown className={cn(
                    "w-5 h-5 transition-transform",
                    isOpen && "rotate-180"
                )} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl border border-white/10 overflow-hidden z-10 shadow-lg"
                >
                    {supportedChains.map((chain) => {
                        const isActive = chain.id === chainId
                        const isSwitching = switchingTo === chain.id
                        const chainName = getChainName(chain.id)
                        const chainIcon = getChainIcon(chain.id)

                        return (
                            <button
                                key={chain.id}
                                onClick={() => handleSwitch(chain.id)}
                                disabled={isSwitchingChain}
                                className={cn(
                                    "w-full p-3 flex items-center justify-between",
                                    "hover:bg-white/5 transition-colors",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                    isActive && "bg-[#D4AF37]/10"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{chainIcon}</span>
                                    <span className={cn(
                                        "font-medium",
                                        isActive && "text-[#D4AF37]"
                                    )}>
                                        {chainName}
                                    </span>
                                </div>
                                {isSwitching ? (
                                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--accent-gold)' }} />
                                ) : isActive ? (
                                    <Check className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                                ) : null}
                            </button>
                        )
                    })}
                </motion.div>
            )}
        </div>
    )
}
