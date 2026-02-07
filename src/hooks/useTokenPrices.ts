import useSWR from 'swr'
import { getTokenPrices, getTokenId } from '../lib/api/coingecko'

/**
 * Hook to fetch real-time token prices
 * 
 * Features:
 * - Multiple tokens
 * - 24h price change
 * - Market cap
 * - Auto-refresh every 60 seconds
 */

export interface TokenPrice {
    id: string
    symbol: string
    price: number
    change24h: number
    marketCap?: number
    volume24h?: number
    isMockData?: boolean
}

export function useTokenPrices(symbols: string[] = ['ETH', 'BTC', 'USDC']) {
    const tokenIds = symbols.map(getTokenId)

    const { data, error, isLoading, mutate } = useSWR(
        ['token-prices', ...tokenIds],
        async () => {
            const prices = await getTokenPrices(tokenIds, 'usd')
            if (!prices) return { tokens: [], isMockData: false }

            const isMockData = prices._metadata?.isMockData || false

            const tokens = tokenIds.map((id, index) => {
                const priceData = prices[id]
                if (!priceData) return null

                return {
                    id,
                    symbol: symbols[index],
                    price: priceData.usd || 0,
                    change24h: priceData.usd_24h_change || 0,
                    marketCap: priceData.usd_market_cap,
                    volume24h: priceData.usd_24h_vol,
                    isMockData,
                }
            }).filter(Boolean) as TokenPrice[]

            return { tokens, isMockData }
        },
        {
            refreshInterval: 60000, // Refresh every 60 seconds
            revalidateOnFocus: true,
        }
    )

    return {
        prices: data?.tokens || [],
        isMockData: data?.isMockData || false,
        isLoading,
        error,
        refresh: mutate,
    }
}
