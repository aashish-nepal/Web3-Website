import useSWR from 'swr'
import { useAccount } from 'wagmi'
import { getTokenBalances, getTokenMetadata } from '../lib/api/alchemy'
import { getTokenPriceByContract } from '../lib/api/coingecko'

/**
 * Hook to fetch real token balances for connected wallet
 * 
 * Features:
 * - Auto-refresh every 30 seconds
 * - Loading and error states
 * - Caching with SWR
 * - Multi-token support
 */

export interface TokenBalance {
    contractAddress: string
    tokenBalance: string
    name?: string
    symbol?: string
    decimals?: number
    logo?: string
    price?: number
    value?: number
    balance?: number
}

interface AlchemyTokenBalance {
    contractAddress: string
    tokenBalance: string
}

export function useTokenBalances(chainId: number = 1) {
    const { address } = useAccount()

    const { data, error, isLoading, mutate } = useSWR(
        address ? [`token-balances`, address, chainId] : null,
        async () => {
            if (!address) return null

            const balances = await getTokenBalances(address, chainId)
            if (!balances || !balances.tokenBalances) return []

            // Fetch metadata and prices for each token
            const enrichedBalances = await Promise.all(
                balances.tokenBalances
                    .filter((token: AlchemyTokenBalance) => token.tokenBalance !== '0x0')
                    .map(async (token: AlchemyTokenBalance) => {
                        try {
                            // Get token metadata
                            const metadata = await getTokenMetadata(
                                token.contractAddress,
                                chainId
                            )

                            // Get token price
                            const priceData = await getTokenPriceByContract(
                                token.contractAddress,
                                chainId === 1 ? 'ethereum' : 'polygon',
                                'usd'
                            )

                            const price = priceData?.[token.contractAddress.toLowerCase()]?.usd || 0
                            const decimals = metadata?.decimals || 18
                            const balance = parseInt(token.tokenBalance, 16) / Math.pow(10, decimals)
                            const value = balance * price

                            return {
                                contractAddress: token.contractAddress,
                                tokenBalance: token.tokenBalance,
                                name: metadata?.name,
                                symbol: metadata?.symbol,
                                decimals,
                                logo: metadata?.logo,
                                price,
                                value,
                                balance,
                            }
                        } catch (err) {
                            console.error('Error enriching token:', err)
                            return null
                        }
                    })
            )

            return enrichedBalances.filter(Boolean) as TokenBalance[]
        },
        {
            refreshInterval: 30000, // Refresh every 30 seconds
            revalidateOnFocus: true,
        }
    )

    return {
        balances: data || [],
        isLoading,
        error,
        refresh: mutate,
    }
}
