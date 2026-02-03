import useSWR from 'swr'
import { getGasPrice } from '../lib/api/alchemy'

/**
 * Hook to fetch live gas prices
 * 
 * Features:
 * - Current gas price
 * - Auto-refresh every 15 seconds
 * - Format in Gwei
 */

export function useGasPrice(chainId: number = 1) {
    const { data, error, isLoading, mutate } = useSWR(
        ['gas-price', chainId],
        async () => {
            const gasPrice = await getGasPrice(chainId)
            if (!gasPrice) return null

            // Convert from Wei to Gwei
            const gasPriceGwei = parseInt(gasPrice, 16) / 1e9

            return {
                wei: gasPrice,
                gwei: gasPriceGwei,
                formatted: `${gasPriceGwei.toFixed(2)} Gwei`,
            }
        },
        {
            refreshInterval: 15000, // Refresh every 15 seconds
            revalidateOnFocus: true,
        }
    )

    return {
        gasPrice: data,
        isLoading,
        error,
        refresh: mutate,
    }
}
