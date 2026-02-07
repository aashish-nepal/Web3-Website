import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

/**
 * Clean wagmi configuration
 * - Injected connector auto-detects MetaMask, Phantom, Rainbow, Brave
 * - WalletConnect for mobile wallets with QR modal
 */

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

if (!walletConnectProjectId) {
    console.warn('⚠️ WalletConnect Project ID not set')
}

export const config = createConfig({
    chains: [mainnet, polygon, arbitrum, optimism, base],
    connectors: [
        // Auto-detects all injected wallets (MetaMask, Phantom, Rainbow, Brave, etc.)
        injected(),

        // WalletConnect for mobile wallets
        walletConnect({
            projectId: walletConnectProjectId,
            showQrModal: true,
            metadata: {
                name: 'Web3 OS',
                description: 'Production-Grade Web3 Operating System',
                url: 'https://web3os.app',
                icons: ['https://web3os.app/icon.png']
            },
        }),
    ],
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [arbitrum.id]: http(),
        [optimism.id]: http(),
        [base.id]: http(),
    },
    ssr: true,
})

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}
