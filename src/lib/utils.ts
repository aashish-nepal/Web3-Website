import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind classes with proper precedence
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format large numbers with K, M, B suffixes
 * @example formatNumber(1234567) => "1.23M"
 */
export function formatNumber(num: number): string {
    if (num >= 1_000_000_000) {
        return `${(num / 1_000_000_000).toFixed(2)}B`
    }
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(2)}M`
    }
    if (num >= 1_000) {
        return `${(num / 1_000).toFixed(2)}K`
    }
    return num.toFixed(2)
}

/**
 * Truncate Ethereum address for display
 * @example truncateAddress("0x1234...5678", 6, 4) => "0x1234...5678"
 */
export function truncateAddress(
    address: string,
    startLength: number = 6,
    endLength: number = 4
): string {
    if (!address) return ''
    if (address.length <= startLength + endLength) return address
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`
}

/**
 * Format time ago from timestamp
 * @example timeAgo(Date.now() - 60000) => "1m ago"
 */
export function timeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
}

/**
 * Format balance with proper decimals
 * @example formatBalance(1234567890000000000n, 18) => "1.2346"
 */
export function formatBalance(value: bigint, decimals: number = 18, maxDecimals: number = 4): string {
    const divisor = BigInt(10 ** decimals)
    const quotient = value / divisor
    const remainder = value % divisor

    const integerPart = quotient.toString()
    const decimalPart = remainder.toString().padStart(decimals, '0').slice(0, maxDecimals)

    return `${integerPart}.${decimalPart}`
}

/**
 * Get chain name from chain ID
 */
export function getChainName(chainId: number): string {
    const chains: Record<number, string> = {
        1: 'Ethereum',
        137: 'Polygon',
        42161: 'Arbitrum',
        11155111: 'Sepolia',
    }
    return chains[chainId] || `Chain ${chainId}`
}

/**
 * Get chain icon emoji from chain ID
 */
export function getChainIcon(chainId: number): string {
    const icons: Record<number, string> = {
        1: '⟠',
        137: '🟣',
        42161: '🔵',
        11155111: '🧪',
    }
    return icons[chainId] || '⛓️'
}

/**
 * Get explorer URL for address on specific chain
 */
export function getExplorerUrl(chainId: number, address: string): string {
    const explorers: Record<number, string> = {
        1: 'https://etherscan.io',
        137: 'https://polygonscan.com',
        42161: 'https://arbiscan.io',
        11155111: 'https://sepolia.etherscan.io',
    }
    const baseUrl = explorers[chainId] || 'https://etherscan.io'
    return `${baseUrl}/address/${address}`
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (_err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            document.body.removeChild(textArea)
            return true
        } catch (_e) {
            document.body.removeChild(textArea)
            return false
        }
    }
}
