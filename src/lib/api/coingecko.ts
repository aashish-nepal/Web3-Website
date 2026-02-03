import axios from 'axios'

/**
 * CoinGecko API Client
 * 
 * Provides market data:
 * - Token prices (real-time)
 * - Price history
 * - Market cap, volume
 * - Token search
 */

const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'

// Create axios instance with optional API key
const coinGeckoClient = axios.create({
    baseURL: COINGECKO_BASE_URL,
    headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {},
})

/**
 * Fetch current price for tokens
 */
export async function getTokenPrices(
    tokenIds: string[],
    vsCurrency: string = 'usd'
) {
    try {
        const response = await coinGeckoClient.get('/simple/price', {
            params: {
                ids: tokenIds.join(','),
                vs_currencies: vsCurrency,
                include_24hr_change: true,
                include_market_cap: true,
                include_24hr_vol: true,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching token prices:', error)
        return null
    }
}

/**
 * Fetch price by contract address
 */
export async function getTokenPriceByContract(
    contractAddress: string,
    platform: string = 'ethereum',
    vsCurrency: string = 'usd'
) {
    try {
        const response = await coinGeckoClient.get(
            `/simple/token_price/${platform}`,
            {
                params: {
                    contract_addresses: contractAddress,
                    vs_currencies: vsCurrency,
                    include_24hr_change: true,
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error fetching token price by contract:', error)
        return null
    }
}

/**
 * Fetch historical price data for charts
 */
export async function getTokenPriceHistory(
    tokenId: string,
    days: number = 7,
    vsCurrency: string = 'usd'
) {
    try {
        const response = await coinGeckoClient.get(
            `/coins/${tokenId}/market_chart`,
            {
                params: {
                    vs_currency: vsCurrency,
                    days,
                    interval: days <= 1 ? 'hourly' : 'daily',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error fetching price history:', error)
        return null
    }
}

/**
 * Search for tokens
 */
export async function searchTokens(query: string) {
    try {
        const response = await coinGeckoClient.get('/search', {
            params: { query },
        })
        return response.data
    } catch (error) {
        console.error('Error searching tokens:', error)
        return null
    }
}

/**
 * Get trending tokens
 */
export async function getTrendingTokens() {
    try {
        const response = await coinGeckoClient.get('/search/trending')
        return response.data
    } catch (error) {
        console.error('Error fetching trending tokens:', error)
        return null
    }
}

/**
 * Get top tokens by market cap
 */
export async function getTopTokens(
    vsCurrency: string = 'usd',
    perPage: number = 100,
    page: number = 1
) {
    try {
        const response = await coinGeckoClient.get('/coins/markets', {
            params: {
                vs_currency: vsCurrency,
                order: 'market_cap_desc',
                per_page: perPage,
                page,
                sparkline: false,
                price_change_percentage: '24h,7d',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching top tokens:', error)
        return null
    }
}

/**
 * Get token details
 */
export async function getTokenDetails(tokenId: string) {
    try {
        const response = await coinGeckoClient.get(`/coins/${tokenId}`, {
            params: {
                localization: false,
                tickers: false,
                community_data: false,
                developer_data: false,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching token details:', error)
        return null
    }
}

/**
 * Map common token symbols to CoinGecko IDs
 */
export const TOKEN_ID_MAP: Record<string, string> = {
    ETH: 'ethereum',
    BTC: 'bitcoin',
    USDC: 'usd-coin',
    USDT: 'tether',
    DAI: 'dai',
    WETH: 'weth',
    MATIC: 'matic-network',
    ARB: 'arbitrum',
    OP: 'optimism',
    LINK: 'chainlink',
    UNI: 'uniswap',
    AAVE: 'aave',
    CRV: 'curve-dao-token',
    SNX: 'synthetix-network-token',
}

/**
 * Get CoinGecko ID from token symbol
 */
export function getTokenId(symbol: string): string {
    return TOKEN_ID_MAP[symbol.toUpperCase()] || symbol.toLowerCase()
}
