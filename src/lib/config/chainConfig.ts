/**
 * Chain Configuration
 * Extended network list with metadata
 */

import { Chain } from 'wagmi/chains'
import { mainnet, polygon, arbitrum, optimism, base, sepolia, polygonMumbai, arbitrumSepolia } from 'wagmi/chains'

export interface ChainMetadata {
    id: number
    name: string
    shortName: string
    icon: string
    nativeCurrency: {
        name: string
        symbol: string
        decimals: number
    }
    rpcUrls: {
        default: string[]
        public: string[]
        infura?: string
        alchemy?: string
    }
    blockExplorers: {
        default: {
            name: string
            url: string
        }
    }
    category: 'mainnet' | 'l2' | 'testnet'
    gasPrice?: {
        api?: string
        unit: 'gwei' | 'wei'
    }
    features: {
        eip1559: boolean
        multicall: boolean
    }
}

/**
 * Extended chain configurations
 */
export const CHAIN_METADATA: Record<number, ChainMetadata> = {
    // Ethereum Mainnet
    [mainnet.id]: {
        id: mainnet.id,
        name: 'Ethereum',
        shortName: 'ETH',
        icon: 'ethereum',
        nativeCurrency: mainnet.nativeCurrency,
        rpcUrls: {
            default: ['https://eth.public-rpc.com'],
            public: ['https://eth.public-rpc.com', 'https://rpc.ankr.com/eth'],
            infura: 'https://mainnet.infura.io/v3/',
            alchemy: 'https://eth-mainnet.g.alchemy.com/v2/',
        },
        blockExplorers: {
            default: {
                name: 'Etherscan',
                url: 'https://etherscan.io',
            },
        },
        category: 'mainnet',
        gasPrice: {
            api: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
            unit: 'gwei',
        },
        features: {
            eip1559: true,
            multicall: true,
        },
    },

    // Polygon
    [polygon.id]: {
        id: polygon.id,
        name: 'Polygon',
        shortName: 'MATIC',
        icon: 'polygon',
        nativeCurrency: polygon.nativeCurrency,
        rpcUrls: {
            default: ['https://polygon-rpc.com'],
            public: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
            infura: 'https://polygon-mainnet.infura.io/v3/',
            alchemy: 'https://polygon-mainnet.g.alchemy.com/v2/',
        },
        blockExplorers: {
            default: {
                name: 'PolygonScan',
                url: 'https://polygonscan.com',
            },
        },
        category: 'l2',
        gasPrice: {
            api: 'https://api.polygonscan.com/api?module=gastracker&action=gasoracle',
            unit: 'gwei',
        },
        features: {
            eip1559: true,
            multicall: true,
        },
    },

    // Arbitrum
    [arbitrum.id]: {
        id: arbitrum.id,
        name: 'Arbitrum One',
        shortName: 'ARB',
        icon: 'arbitrum',
        nativeCurrency: arbitrum.nativeCurrency,
        rpcUrls: {
            default: ['https://arb1.arbitrum.io/rpc'],
            public: ['https://arb1.arbitrum.io/rpc', 'https://rpc.ankr.com/arbitrum'],
            infura: 'https://arbitrum-mainnet.infura.io/v3/',
            alchemy: 'https://arb-mainnet.g.alchemy.com/v2/',
        },
        blockExplorers: {
            default: {
                name: 'Arbiscan',
                url: 'https://arbiscan.io',
            },
        },
        category: 'l2',
        gasPrice: {
            unit: 'gwei',
        },
        features: {
            eip1559: true,
            multicall: true,
        },
    },

    // Optimism
    [optimism.id]: {
        id: optimism.id,
        name: 'Optimism',
        shortName: 'OP',
        icon: 'optimism',
        nativeCurrency: optimism.nativeCurrency,
        rpcUrls: {
            default: ['https://mainnet.optimism.io'],
            public: ['https://mainnet.optimism.io', 'https://rpc.ankr.com/optimism'],
            infura: 'https://optimism-mainnet.infura.io/v3/',
            alchemy: 'https://opt-mainnet.g.alchemy.com/v2/',
        },
        blockExplorers: {
            default: {
                name: 'Optimistic Etherscan',
                url: 'https://optimistic.etherscan.io',
            },
        },
        category: 'l2',
        features: {
            eip1559: true,
            multicall: true,
        },
    },

    // Base
    [base.id]: {
        id: base.id,
        name: 'Base',
        shortName: 'BASE',
        icon: 'base',
        nativeCurrency: base.nativeCurrency,
        rpcUrls: {
            default: ['https://mainnet.base.org'],
            public: ['https://mainnet.base.org', 'https://base.publicnode.com'],
            alchemy: 'https://base-mainnet.g.alchemy.com/v2/',
        },
        blockExplorers: {
            default: {
                name: 'BaseScan',
                url: 'https://basescan.org',
            },
        },
        category: 'l2',
        features: {
            eip1559: true,
            multicall: true,
        },
    },

    // Sepolia Testnet
    [sepolia.id]: {
        id: sepolia.id,
        name: 'Sepolia',
        shortName: 'SEP',
        icon: 'ethereum',
        nativeCurrency: sepolia.nativeCurrency,
        rpcUrls: {
            default: ['https://rpc.sepolia.org'],
            public: ['https://rpc.sepolia.org', 'https://rpc2.sepolia.org'],
            infura: 'https://sepolia.infura.io/v3/',
            alchemy: 'https://eth-sepolia.g.alchemy.com/v2/',
        },
        blockExplorers: {
            default: {
                name: 'Sepolia Etherscan',
                url: 'https://sepolia.etherscan.io',
            },
        },
        category: 'testnet',
        features: {
            eip1559: true,
            multicall: true,
        },
    },
}

/**
 * Get all chains
 */
export const ALL_CHAINS: Chain[] = [
    mainnet,
    polygon,
    arbitrum,
    optimism,
    base,
    sepolia,
]

/**
 * Get mainnet chains
 */
export const MAINNET_CHAINS: Chain[] = [
    mainnet,
]

/**
 * Get L2 chains
 */
export const L2_CHAINS: Chain[] = [
    polygon,
    arbitrum,
    optimism,
    base,
]

/**
 * Get testnet chains
 */
export const TESTNET_CHAINS: Chain[] = [
    sepolia,
]

/**
 * Get chain metadata by ID
 */
export function getChainMetadata(chainId: number): ChainMetadata | undefined {
    return CHAIN_METADATA[chainId]
}

/**
 * Get chain icon
 */
export function getChainIcon(chainId: number): string {
    return CHAIN_METADATA[chainId]?.icon || 'ethereum'
}

/**
 * Get chain short name
 */
export function getChainShortName(chainId: number): string {
    return CHAIN_METADATA[chainId]?.shortName || 'ETH'
}

/**
 * Get chains by category
 */
export function getChainsByCategory(category: 'mainnet' | 'l2' | 'testnet'): ChainMetadata[] {
    return Object.values(CHAIN_METADATA).filter(chain => chain.category === category)
}

/**
 * Get RPC URL with API key
 */
export function getRpcUrl(chainId: number, provider: 'infura' | 'alchemy', apiKey: string): string | undefined {
    const chain = CHAIN_METADATA[chainId]
    if (!chain) return undefined

    const baseUrl = chain.rpcUrls[provider]
    if (!baseUrl) return undefined

    return `${baseUrl}${apiKey}`
}

/**
 * Get block explorer URL for address
 */
export function getExplorerUrl(chainId: number, address: string, type: 'address' | 'tx' | 'token' = 'address'): string {
    const chain = CHAIN_METADATA[chainId]
    if (!chain) return ''

    const baseUrl = chain.blockExplorers.default.url
    return `${baseUrl}/${type}/${address}`
}

/**
 * Format chain name for display
 */
export function formatChainName(chainId: number): string {
    return CHAIN_METADATA[chainId]?.name || `Chain ${chainId}`
}

/**
 * Check if chain supports EIP-1559
 */
export function supportsEIP1559(chainId: number): boolean {
    return CHAIN_METADATA[chainId]?.features.eip1559 ?? false
}
