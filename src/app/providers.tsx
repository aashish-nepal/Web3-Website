'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'
import { useState, type ReactNode } from 'react'

/**
 * Providers - Client-side context providers wrapper
 * 
 * Architecture:
 * - WagmiProvider for Web3 functionality
 * - QueryClientProvider for data fetching
 * - Optimized for Next.js App Router with SSR
 * 
 * Hydration Safety:
 * - Creates new QueryClient per request (SSR-safe)
 * - Disables automatic refetching to prevent hydration mismatches
 * - Uses "use client" directive for client-side rendering
 */
export function Providers({ children }: { children: ReactNode }) {
    /**
     * Create QueryClient with optimized settings
     * useState ensures new instance per request (SSR-safe)
     */
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Disable automatic refetching to prevent hydration issues
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        refetchOnReconnect: false,
                        // Reduce retry attempts for faster error handling
                        retry: 1,
                        // Cache data for 5 minutes
                        staleTime: 5 * 60 * 1000,
                    },
                },
            })
    )

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
