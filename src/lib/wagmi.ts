import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

/**
 * Advanced wagmi configuration for production Web3 OS
 * Supports multiple chains with optimized RPC endpoints
 */

// Get environment variables with fallbacks
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID || ''

/**
 * Configure supported chains
 * Mainnet chains: Ethereum, Polygon, Arbitrum
 * Testnet: Sepolia (for development)
 */
const chains = [mainnet, polygon, arbitrum, sepolia] as const

/**
 * Configure wallet connectors with metadata
 */
export const config = createConfig({
    chains,
    connectors: [
        // MetaMask and other injected wallets (browser extensions)
        injected({
            target: 'metaMask',
            shimDisconnect: true, // Prevents auto-reconnect issues
        }),

        // WalletConnect v2 with QR modal
        walletConnect({
            projectId: walletConnectProjectId,
            metadata: {
                name: 'Web3 OS',
                description: 'Production-grade Web3 Operating System',
                url: typeof window !== 'undefined' ? window.location.origin : 'https://web3os.app',
                icons: ['https://avatars.githubusercontent.com/u/37784886'],
            },
            showQrModal: true,
            qrModalOptions: {
                themeMode: 'dark',
                themeVariables: {
                    '--wcm-z-index': '9999',
                },
            },
        }),

        // Coinbase Wallet with custom branding
        coinbaseWallet({
            appName: 'Web3 OS',
            appLogoUrl: 'https://avatars.githubusercontent.com/u/37784886',
            darkMode: true,
            // Prefer standalone app over extension for better UX
            preference: 'smartWalletOnly',
        }),
    ],

    /**
     * Configure RPC transports with Infura
     * Falls back to public RPC if Infura ID is not provided
     */
    transports: {
        [mainnet.id]: http(
            infuraId
                ? `https://mainnet.infura.io/v3/${infuraId}`
                : 'https://eth.public-rpc.com'
        ),
        [polygon.id]: http(
            infuraId
                ? `https://polygon-mainnet.infura.io/v3/${infuraId}`
                : 'https://polygon-rpc.com'
        ),
        [arbitrum.id]: http(
            infuraId
                ? `https://arbitrum-mainnet.infura.io/v3/${infuraId}`
                : 'https://arb1.arbitrum.io/rpc'
        ),
        [sepolia.id]: http(
            infuraId
                ? `https://sepolia.infura.io/v3/${infuraId}`
                : 'https://rpc.sepolia.org'
        ),
    },

    /**
     * Enable batch requests for better performance
     */
    batch: {
        multicall: true,
    },

    /**
     * Configure SSR support for Next.js
     */
    ssr: true,
})

/**
 * TypeScript module augmentation for type safety
 * Ensures wagmi hooks use our config type
 */
declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}

/**
 * Export chain information for UI components
 */
export const supportedChains = chains
export type SupportedChainId = typeof chains[number]['id']
