/**
 * Token Utilities
 * Helper functions for token prices, metadata, and formatting
 */

import { COMMON_TOKENS, API_ENDPOINTS, type TokenMetadata } from './constants/web3'

export interface TokenPrice {
    usd: number
    usd_24h_change: number
    last_updated: number
}

export interface TokenBalance {
    address: string
    symbol: string
    name: string
    decimals: number
    balance: string
    balanceFormatted: string
    price?: TokenPrice
    valueUSD?: number
}

/**
 * Format token amount with proper decimals
 */
export function formatTokenAmount(
    amount: bigint | string,
    decimals: number,
    displayDecimals = 4
): string {
    const amountBigInt = typeof amount === 'string' ? BigInt(amount) : amount
    const divisor = BigInt(10 ** decimals)
    const quotient = amountBigInt / divisor
    const remainder = amountBigInt % divisor

    const integerPart = quotient.toString()
    const decimalPart = remainder.toString().padStart(decimals, '0')

    const formatted = `${integerPart}.${decimalPart}`
    const number = parseFloat(formatted)

    return number.toFixed(displayDecimals)
}

/**
 * Parse token amount to bigint
 */
export function parseTokenAmount(amount: string, decimals: number): bigint {
    const [integerPart, decimalPart = ''] = amount.split('.')
    const paddedDecimal = decimalPart.padEnd(decimals, '0').slice(0, decimals)
    const combined = integerPart + paddedDecimal
    return BigInt(combined)
}

/**
 * Format token symbol for display
 */
export function formatTokenSymbol(symbol: string): string {
    return symbol.toUpperCase()
}

/**
 * Get token metadata from common tokens
 */
export function getCommonTokenMetadata(symbolOrAddress: string): TokenMetadata | undefined {
    const search = symbolOrAddress.toLowerCase()

    return Object.values(COMMON_TOKENS).find(
        token =>
            token.symbol.toLowerCase() === search ||
            token.address.toLowerCase() === search
    )
}

/**
 * Fetch token price from CoinGecko
 */
export async function fetchTokenPrice(
    tokenAddress: string,
    vsCurrency = 'usd'
): Promise<TokenPrice | null> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        const baseUrl = API_ENDPOINTS.COINGECKO

        const url = apiKey
            ? `${baseUrl}/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=${vsCurrency}&include_24hr_change=true&x_cg_demo_api_key=${apiKey}`
            : `${baseUrl}/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=${vsCurrency}&include_24hr_change=true`

        const response = await fetch(url)
        if (!response.ok) return null

        const data = await response.json()
        const tokenData = data[tokenAddress.toLowerCase()]

        if (!tokenData) return null

        return {
            usd: tokenData[vsCurrency] || 0,
            usd_24h_change: tokenData[`${vsCurrency}_24h_change`] || 0,
            last_updated: Date.now(),
        }
    } catch (error) {
        console.error('Error fetching token price:', error)
        return null
    }
}

/**
 * Fetch multiple token prices
 */
export async function fetchMultipleTokenPrices(
    tokenAddresses: string[],
    vsCurrency = 'usd'
): Promise<Record<string, TokenPrice>> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        const baseUrl = API_ENDPOINTS.COINGECKO
        const addresses = tokenAddresses.join(',')

        const url = apiKey
            ? `${baseUrl}/simple/token_price/ethereum?contract_addresses=${addresses}&vs_currencies=${vsCurrency}&include_24hr_change=true&x_cg_demo_api_key=${apiKey}`
            : `${baseUrl}/simple/token_price/ethereum?contract_addresses=${addresses}&vs_currencies=${vsCurrency}&include_24hr_change=true`

        const response = await fetch(url)
        if (!response.ok) return {}

        const data = await response.json()
        const prices: Record<string, TokenPrice> = {}

        for (const [address, priceData] of Object.entries(data)) {
            const tokenData = priceData as any
            prices[address] = {
                usd: tokenData[vsCurrency] || 0,
                usd_24h_change: tokenData[`${vsCurrency}_24h_change`] || 0,
                last_updated: Date.now(),
            }
        }

        return prices
    } catch (error) {
        console.error('Error fetching token prices:', error)
        return {}
    }
}

/**
 * Calculate token value in USD
 */
export function calculateTokenValueUSD(
    balance: string,
    decimals: number,
    priceUSD: number
): number {
    const balanceFormatted = parseFloat(formatTokenAmount(balance, decimals, 18))
    return balanceFormatted * priceUSD
}

/**
 * Format USD value
 */
export function formatUSDValue(value: number, decimals = 2): string {
    if (value === 0) return '$0.00'
    if (value < 0.01) return '<$0.01'
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`
    return `$${value.toFixed(decimals)}`
}

/**
 * Format price change percentage
 */
export function formatPriceChange(change: number): string {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
}

/**
 * Get price change color
 */
export function getPriceChangeColor(change: number): string {
    if (change > 0) return '#10B981' // Green
    if (change < 0) return '#EF4444' // Red
    return '#6B7280' // Gray
}

/**
 * Validate token address
 */
export function isValidTokenAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Validate token amount
 */
export function isValidTokenAmount(amount: string): boolean {
    if (!amount || amount === '') return false
    const regex = /^\d+\.?\d*$/
    return regex.test(amount) && parseFloat(amount) > 0
}

/**
 * Get token logo URL
 */
export function getTokenLogoUrl(address: string, chainId = 1): string {
    // Use Trust Wallet assets as fallback
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
}

/**
 * Sort tokens by value (USD)
 */
export function sortTokensByValue(tokens: TokenBalance[]): TokenBalance[] {
    return [...tokens].sort((a, b) => {
        const aValue = a.valueUSD || 0
        const bValue = b.valueUSD || 0
        return bValue - aValue
    })
}

/**
 * Sort tokens by balance
 */
export function sortTokensByBalance(tokens: TokenBalance[]): TokenBalance[] {
    return [...tokens].sort((a, b) => {
        const aBalance = parseFloat(a.balanceFormatted)
        const bBalance = parseFloat(b.balanceFormatted)
        return bBalance - aBalance
    })
}

/**
 * Filter tokens with non-zero balance
 */
export function filterNonZeroTokens(tokens: TokenBalance[]): TokenBalance[] {
    return tokens.filter(token => parseFloat(token.balanceFormatted) > 0)
}

/**
 * Calculate total portfolio value
 */
export function calculateTotalPortfolioValue(tokens: TokenBalance[]): number {
    return tokens.reduce((total, token) => total + (token.valueUSD || 0), 0)
}

/**
 * Get token allocation percentage
 */
export function getTokenAllocation(token: TokenBalance, totalValue: number): number {
    if (totalValue === 0) return 0
    const tokenValue = token.valueUSD || 0
    return (tokenValue / totalValue) * 100
}

/**
 * Format token allocation
 */
export function formatTokenAllocation(percentage: number): string {
    return `${percentage.toFixed(2)}%`
}

/**
 * Search tokens by name or symbol
 */
export function searchTokens(tokens: TokenBalance[], query: string): TokenBalance[] {
    const lowerQuery = query.toLowerCase()
    return tokens.filter(
        token =>
            token.name.toLowerCase().includes(lowerQuery) ||
            token.symbol.toLowerCase().includes(lowerQuery) ||
            token.address.toLowerCase().includes(lowerQuery)
    )
}

/**
 * Get top tokens by value
 */
export function getTopTokens(tokens: TokenBalance[], count = 5): TokenBalance[] {
    return sortTokensByValue(tokens).slice(0, count)
}

/**
 * Cache token prices in localStorage
 */
export function cacheTokenPrice(address: string, price: TokenPrice): void {
    if (typeof window === 'undefined') return

    try {
        const cacheKey = `token_price_${address.toLowerCase()}`
        localStorage.setItem(cacheKey, JSON.stringify(price))
    } catch (error) {
        console.error('Error caching token price:', error)
    }
}

/**
 * Get cached token price
 */
export function getCachedTokenPrice(address: string, maxAge = 60000): TokenPrice | null {
    if (typeof window === 'undefined') return null

    try {
        const cacheKey = `token_price_${address.toLowerCase()}`
        const cached = localStorage.getItem(cacheKey)

        if (!cached) return null

        const price: TokenPrice = JSON.parse(cached)
        const age = Date.now() - price.last_updated

        if (age > maxAge) return null

        return price
    } catch (error) {
        console.error('Error getting cached token price:', error)
        return null
    }
}

/**
 * Format large numbers with suffixes
 */
export function formatLargeNumber(num: number): string {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toFixed(2)
}
