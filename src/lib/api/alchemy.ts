import axios from 'axios'

/**
 * Alchemy API Client
 * 
 * Provides access to blockchain data:
 * - Token balances (ERC20, native)
 * - Transaction history
 * - NFT data
 * - Gas prices
 */

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

// Supported networks
export const ALCHEMY_NETWORKS = {
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    polygon: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    sepolia: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
}

/**
 * Get network URL by chain ID
 */
export function getAlchemyUrl(chainId: number): string {
    const networkMap: Record<number, string> = {
        1: ALCHEMY_NETWORKS.ethereum,
        137: ALCHEMY_NETWORKS.polygon,
        42161: ALCHEMY_NETWORKS.arbitrum,
        11155111: ALCHEMY_NETWORKS.sepolia,
    }
    return networkMap[chainId] || ALCHEMY_NETWORKS.ethereum
}

/**
 * Fetch token balances for an address
 */
export async function getTokenBalances(address: string, chainId: number = 1) {
    try {
        const url = getAlchemyUrl(chainId)
        const response = await axios.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: 'alchemy_getTokenBalances',
            params: [address],
        })
        return response.data.result
    } catch (error) {
        console.error('Error fetching token balances:', error)
        return null
    }
}

/**
 * Fetch NFTs for an address
 */
export async function getNFTs(address: string, chainId: number = 1) {
    try {
        const baseUrl = getAlchemyUrl(chainId).replace('/v2/', '/nft/v3/')
        const url = `${baseUrl}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100`

        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error('Error fetching NFTs:', error)
        return null
    }
}

/**
 * Fetch transaction history for an address
 */
export async function getTransactionHistory(
    address: string,
    chainId: number = 1,
    options: {
        fromBlock?: string
        toBlock?: string
        category?: string[]
        maxCount?: number
    } = {}
) {
    try {
        const url = getAlchemyUrl(chainId)
        const response = await axios.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: 'alchemy_getAssetTransfers',
            params: [
                {
                    fromAddress: address,
                    category: options.category || ['external', 'erc20', 'erc721', 'erc1155'],
                    maxCount: options.maxCount || 50,
                    fromBlock: options.fromBlock || '0x0',
                    toBlock: options.toBlock || 'latest',
                },
            ],
        })
        return response.data.result
    } catch (error) {
        console.error('Error fetching transaction history:', error)
        return null
    }
}

/**
 * Fetch current gas prices
 */
export async function getGasPrice(chainId: number = 1) {
    try {
        const url = getAlchemyUrl(chainId)
        const response = await axios.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_gasPrice',
            params: [],
        })
        return response.data.result
    } catch (error) {
        console.error('Error fetching gas price:', error)
        return null
    }
}

/**
 * Fetch token metadata
 */
export async function getTokenMetadata(contractAddress: string, chainId: number = 1) {
    try {
        const url = getAlchemyUrl(chainId)
        const response = await axios.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: 'alchemy_getTokenMetadata',
            params: [contractAddress],
        })
        return response.data.result
    } catch (error) {
        console.error('Error fetching token metadata:', error)
        return null
    }
}

/**
 * Fetch NFT metadata
 */
export async function getNFTMetadata(
    contractAddress: string,
    tokenId: string,
    chainId: number = 1
) {
    try {
        const url = getAlchemyUrl(chainId)
        const response = await axios.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: 'alchemy_getNFTMetadata',
            params: [
                {
                    contractAddress,
                    tokenId,
                },
            ],
        })
        return response.data.result
    } catch (error) {
        console.error('Error fetching NFT metadata:', error)
        return null
    }
}
