'use client'

import { useAccount, useBalance, useChainId, useDisconnect, useSwitchChain, useEnsName } from 'wagmi'
import { useState, useEffect } from 'react'
import { formatBalance, getChainName, getChainIcon, getExplorerUrl } from '@/lib/utils'
import type { SupportedChainId } from '@/lib/wagmi'

/**
 * Advanced Web3 hook that abstracts wallet state and provides utility functions
 * 
 * Features:
 * - Wallet connection state
 * - ENS name resolution
 * - Chain switching
 * - Balance formatting
 * - Explorer URLs
 * 
 * @example
 * const { address, ensName, formattedBalance, switchToChain } = useWeb3()
 */
export function useWeb3() {
    const { address, isConnected, isConnecting, isDisconnected, connector } = useAccount()
    const chainId = useChainId()
    const { disconnect } = useDisconnect()
    const { switchChain, isPending: isSwitchingChain } = useSwitchChain()
    const { data: balance } = useBalance({ address })
    const { data: ensName, isLoading: isLoadingEns } = useEnsName({
        address,
        chainId: 1, // ENS is only on Ethereum mainnet
    })

    // Local state for connection status
    const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')

    /**
     * Update connection status based on wagmi state
     * Prevents hydration mismatch by using useEffect
     */
    useEffect(() => {
        if (isConnected) {
            setConnectionStatus('connected')
        } else if (isConnecting) {
            setConnectionStatus('connecting')
        } else {
            setConnectionStatus('disconnected')
        }
    }, [isConnected, isConnecting])

    /**
     * Format balance with proper decimals
     */
    const formattedBalance = balance
        ? formatBalance(balance.value, balance.decimals)
        : '0.0000'

    /**
     * Get current chain information
     */
    const currentChain = {
        id: chainId,
        name: getChainName(chainId),
        icon: getChainIcon(chainId),
    }

    /**
     * Get explorer URL for current address
     */
    const explorerUrl = address ? getExplorerUrl(chainId, address) : ''

    /**
     * Switch to a specific chain
     * Handles errors gracefully
     */
    const switchToChain = async (targetChainId: SupportedChainId) => {
        if (!switchChain) {
            console.error('Chain switching not supported')
            return false
        }

        try {
            await switchChain({ chainId: targetChainId })
            return true
        } catch (error) {
            console.error('Failed to switch chain:', error)
            return false
        }
    }

    /**
     * Disconnect wallet with cleanup
     */
    const disconnectWallet = () => {
        disconnect()
        setConnectionStatus('disconnected')
    }

    /**
     * Get display name (ENS or truncated address)
     */
    const displayName = ensName || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '')

    /**
     * Get connector name for UI display
     */
    const connectorName = connector?.name || 'Unknown'

    return {
        // Wallet state
        address,
        ensName,
        displayName,
        isConnected: connectionStatus === 'connected',
        isConnecting: connectionStatus === 'connecting',
        isDisconnected: connectionStatus === 'disconnected',
        connectorName,

        // Balance
        balance: balance?.value,
        formattedBalance,
        balanceSymbol: balance?.symbol || 'ETH',

        // Chain
        chainId,
        currentChain,
        isSwitchingChain,

        // ENS
        isLoadingEns,

        // Explorer
        explorerUrl,

        // Actions
        switchToChain,
        disconnect: disconnectWallet,
    }
}

/**
 * Hook to check if user is on a specific chain
 * Useful for conditional rendering based on network
 */
export function useIsChain(targetChainId: number): boolean {
    const chainId = useChainId()
    return chainId === targetChainId
}

/**
 * Hook to get formatted address with ENS fallback
 * Handles loading states
 */
export function useFormattedAddress(address?: string): string {
    const { data: ensName, isLoading } = useEnsName({
        address: address as `0x${string}`,
        chainId: 1,
    })

    if (isLoading) return 'Loading...'
    if (ensName) return ensName
    if (address) return `${address.slice(0, 6)}...${address.slice(-4)}`
    return ''
}
