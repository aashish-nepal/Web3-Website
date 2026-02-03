import useSWR from 'swr'
import { useAccount } from 'wagmi'
import { getNFTs, getNFTMetadata } from '../lib/api/alchemy'

/**
 * Hook to fetch user's NFT collection
 * 
 * Features:
 * - Fetch all NFTs for address
 * - Metadata parsing
 * - Image optimization
 * - Pagination support
 */

export interface NFT {
    contractAddress: string
    tokenId: string
    name?: string
    description?: string
    image?: string
    collection?: string
    attributes?: Array<{ trait_type: string; value: string }>
}

export function useNFTs(chainId: number = 1) {
    const { address } = useAccount()

    const { data, error, isLoading, mutate } = useSWR(
        address ? [`nfts`, address, chainId] : null,
        async () => {
            if (!address) return null

            const nftData = await getNFTs(address, chainId)
            if (!nftData || !nftData.ownedNfts) return []

            // Parse NFT data from Alchemy REST API response
            const nfts: NFT[] = nftData.ownedNfts.map((nft: any) => {
                const metadata = nft.raw?.metadata || nft.metadata || {}
                const tokenId = nft.tokenId || nft.id?.tokenId

                return {
                    contractAddress: nft.contract?.address || '',
                    tokenId: tokenId || '',
                    name: metadata.name || nft.name || `#${tokenId}`,
                    description: metadata.description || nft.description,
                    image: metadata.image || nft.image?.cachedUrl || nft.image?.originalUrl,
                    collection: nft.contract?.name || nft.contract?.symbol || nft.collection?.name,
                    attributes: metadata.attributes || [],
                }
            })

            return nfts
        },
        {
            revalidateOnFocus: false, // Don't refresh on focus (NFTs don't change often)
            dedupingInterval: 300000, // Cache for 5 minutes
        }
    )

    return {
        nfts: data || [],
        isLoading,
        error,
        refresh: mutate,
    }
}
