/**
 * Web3 Constants
 * Common addresses, tokens, and configuration
 */

/**
 * Common ERC20 Token Addresses (Ethereum Mainnet)
 */
export const TOKEN_ADDRESSES = {
    // Stablecoins
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    BUSD: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',

    // Wrapped Tokens
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',

    // DeFi Tokens
    UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    AAVE: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
} as const

/**
 * Token Metadata
 */
export interface TokenMetadata {
    address: string
    symbol: string
    name: string
    decimals: number
    logoURI?: string
}

export const COMMON_TOKENS: Record<string, TokenMetadata> = {
    USDC: {
        address: TOKEN_ADDRESSES.USDC,
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
    },
    USDT: {
        address: TOKEN_ADDRESSES.USDT,
        symbol: 'USDT',
        name: 'Tether USD',
        decimals: 6,
    },
    DAI: {
        address: TOKEN_ADDRESSES.DAI,
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        decimals: 18,
    },
    WETH: {
        address: TOKEN_ADDRESSES.WETH,
        symbol: 'WETH',
        name: 'Wrapped Ether',
        decimals: 18,
    },
    WBTC: {
        address: TOKEN_ADDRESSES.WBTC,
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        decimals: 8,
    },
}

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
    // Price APIs
    COINGECKO: 'https://api.coingecko.com/api/v3',
    COINMARKETCAP: 'https://pro-api.coinmarketcap.com/v1',

    // Block Explorers
    ETHERSCAN: 'https://api.etherscan.io/api',
    POLYGONSCAN: 'https://api.polygonscan.com/api',
    ARBISCAN: 'https://api.arbiscan.io/api',
    OPTIMISTIC_ETHERSCAN: 'https://api-optimistic.etherscan.io/api',
    BASESCAN: 'https://api.basescan.org/api',

    // NFT APIs
    OPENSEA: 'https://api.opensea.io/api/v2',
    ALCHEMY_NFT: 'https://eth-mainnet.g.alchemy.com/nft/v3',

    // Gas APIs
    ETHERSCAN_GAS: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
    BLOCKNATIVE_GAS: 'https://api.blocknative.com/gasprices/blockprices',
} as const

/**
 * Transaction Types
 */
export enum TransactionType {
    SEND = 'send',
    RECEIVE = 'receive',
    SWAP = 'swap',
    APPROVE = 'approve',
    MINT = 'mint',
    BURN = 'burn',
    STAKE = 'stake',
    UNSTAKE = 'unstake',
    CONTRACT_INTERACTION = 'contract',
    UNKNOWN = 'unknown',
}

/**
 * Transaction Status
 */
export enum TransactionStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
}

/**
 * Wallet Connection Status
 */
export enum WalletConnectionStatus {
    DISCONNECTED = 'disconnected',
    CONNECTING = 'connecting',
    CONNECTED = 'connected',
    RECONNECTING = 'reconnecting',
    ERROR = 'error',
}

/**
 * Gas Price Levels
 */
export enum GasPriceLevel {
    SLOW = 'slow',
    STANDARD = 'standard',
    FAST = 'fast',
    INSTANT = 'instant',
}

/**
 * Feature Flags
 */
export const FEATURE_FLAGS = {
    ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    ENABLE_TESTNET: process.env.NODE_ENV === 'development',
    ENABLE_HARDWARE_WALLETS: true,
    ENABLE_SMART_WALLETS: false, // Future feature
    ENABLE_TRANSACTION_HISTORY: true,
    ENABLE_NFT_DISPLAY: true,
    ENABLE_TOKEN_PRICES: true,
} as const

/**
 * UI Constants
 */
export const UI_CONSTANTS = {
    // Pagination
    TRANSACTIONS_PER_PAGE: 10,
    TOKENS_PER_PAGE: 20,
    NFTS_PER_PAGE: 12,

    // Refresh Intervals (ms)
    BALANCE_REFRESH_INTERVAL: 30000, // 30 seconds
    PRICE_REFRESH_INTERVAL: 60000, // 1 minute
    GAS_REFRESH_INTERVAL: 15000, // 15 seconds
    TRANSACTION_POLL_INTERVAL: 5000, // 5 seconds

    // Timeouts
    CONNECTION_TIMEOUT: 30000, // 30 seconds
    TRANSACTION_TIMEOUT: 300000, // 5 minutes

    // Display
    DEFAULT_DECIMALS: 4,
    MAX_DECIMALS: 8,
    ADDRESS_TRUNCATE_LENGTH: 6,
} as const

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
    WALLET_NOT_INSTALLED: 'Wallet not installed. Please install the wallet extension.',
    CONNECTION_REJECTED: 'Connection request was rejected. Please try again.',
    NETWORK_NOT_SUPPORTED: 'This network is not supported. Please switch to a supported network.',
    INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
    TRANSACTION_FAILED: 'Transaction failed. Please try again.',
    UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
    RPC_ERROR: 'RPC connection error. Please check your network connection.',
} as const

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
    WALLET_CONNECTED: 'Wallet connected successfully!',
    NETWORK_SWITCHED: 'Network switched successfully!',
    TRANSACTION_SUBMITTED: 'Transaction submitted successfully!',
    TRANSACTION_CONFIRMED: 'Transaction confirmed!',
    COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
} as const

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
    WALLET_PREFERENCE: 'web3os_wallet_preference',
    RECENT_WALLETS: 'web3os_recent_wallets',
    FAVORITE_NETWORKS: 'web3os_favorite_networks',
    TRANSACTION_HISTORY: 'web3os_transaction_history',
    CUSTOM_TOKENS: 'web3os_custom_tokens',
    THEME_PREFERENCE: 'web3os_theme',
} as const

/**
 * Default Values
 */
export const DEFAULTS = {
    CHAIN_ID: 1, // Ethereum Mainnet
    GAS_LIMIT: 21000,
    GAS_PRICE_MULTIPLIER: 1.1,
    SLIPPAGE_TOLERANCE: 0.5, // 0.5%
} as const
