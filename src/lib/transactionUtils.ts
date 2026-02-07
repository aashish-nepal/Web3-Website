/**
 * Transaction Utilities
 * Helper functions for transaction formatting, status, and management
 */

import { TransactionType, TransactionStatus } from './constants/web3'
import { getExplorerUrl } from './config/chainConfig'

export interface FormattedTransaction {
    hash: string
    from: string
    to: string
    value: string
    type: TransactionType
    status: TransactionStatus
    timestamp: number
    gasUsed?: string
    gasPrice?: string
    blockNumber?: number
}

/**
 * Format transaction hash for display
 */
export function formatTxHash(hash: string, startChars = 6, endChars = 4): string {
    if (!hash || hash.length < startChars + endChars) return hash
    return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`
}

/**
 * Format gas price from wei to gwei
 */
export function formatGasPrice(wei: bigint | string): string {
    const weiValue = typeof wei === 'string' ? BigInt(wei) : wei
    const gwei = Number(weiValue) / 1e9
    return gwei.toFixed(2)
}

/**
 * Format gas used
 */
export function formatGasUsed(gas: bigint | string | number): string {
    const gasValue = typeof gas === 'bigint' ? Number(gas) : typeof gas === 'string' ? parseInt(gas) : gas
    return gasValue.toLocaleString()
}

/**
 * Calculate transaction fee in ETH
 */
export function calculateTxFee(gasUsed: bigint | string, gasPrice: bigint | string): string {
    const gasUsedBigInt = typeof gasUsed === 'string' ? BigInt(gasUsed) : gasUsed
    const gasPriceBigInt = typeof gasPrice === 'string' ? BigInt(gasPrice) : gasPrice

    const feeWei = gasUsedBigInt * gasPriceBigInt
    const feeEth = Number(feeWei) / 1e18

    return feeEth.toFixed(6)
}

/**
 * Detect transaction type from transaction data
 */
export function detectTransactionType(tx: any, userAddress: string): TransactionType {
    const from = tx.from?.toLowerCase()
    const to = tx.to?.toLowerCase()
    const user = userAddress.toLowerCase()
    const data = tx.data || tx.input || '0x'

    // Check if it's a receive
    if (to === user && from !== user) {
        return TransactionType.RECEIVE
    }

    // Check if it's a send
    if (from === user && to !== user && data === '0x') {
        return TransactionType.SEND
    }

    // Check for common contract interactions
    if (data && data.length > 10) {
        const methodId = data.slice(0, 10).toLowerCase()

        // ERC20 approve
        if (methodId === '0x095ea7b3') {
            return TransactionType.APPROVE
        }

        // ERC20 transfer
        if (methodId === '0xa9059cbb') {
            return TransactionType.SEND
        }

        // Swap methods (Uniswap, etc.)
        if (
            methodId === '0x38ed1739' || // swapExactTokensForTokens
            methodId === '0x7ff36ab5' || // swapExactETHForTokens
            methodId === '0x18cbafe5'    // swapExactTokensForETH
        ) {
            return TransactionType.SWAP
        }

        // Mint (NFT or token)
        if (methodId === '0x40c10f19' || methodId === '0xa0712d68') {
            return TransactionType.MINT
        }

        // Burn
        if (methodId === '0x42966c68' || methodId === '0x9dc29fac') {
            return TransactionType.BURN
        }

        // Stake
        if (methodId === '0xa694fc3a' || methodId === '0x3ccfd60b') {
            return TransactionType.STAKE
        }

        // Unstake/Withdraw
        if (methodId === '0x2e1a7d4d' || methodId === '0x3ccfd60b') {
            return TransactionType.UNSTAKE
        }

        return TransactionType.CONTRACT_INTERACTION
    }

    return TransactionType.UNKNOWN
}

/**
 * Get transaction status from receipt
 */
export function getTransactionStatus(receipt: any): TransactionStatus {
    if (!receipt) return TransactionStatus.PENDING

    if (receipt.status === 1 || receipt.status === '0x1' || receipt.status === true) {
        return TransactionStatus.CONFIRMED
    }

    if (receipt.status === 0 || receipt.status === '0x0' || receipt.status === false) {
        return TransactionStatus.FAILED
    }

    return TransactionStatus.PENDING
}

/**
 * Get transaction status color
 */
export function getTransactionStatusColor(status: TransactionStatus): string {
    const colors: Record<TransactionStatus, string> = {
        [TransactionStatus.PENDING]: '#FFA500',
        [TransactionStatus.CONFIRMED]: '#10B981',
        [TransactionStatus.FAILED]: '#EF4444',
        [TransactionStatus.CANCELLED]: '#6B7280',
    }
    return colors[status]
}

/**
 * Get transaction type icon
 */
export function getTransactionTypeIcon(type: TransactionType): string {
    const icons: Record<TransactionType, string> = {
        [TransactionType.SEND]: '↑',
        [TransactionType.RECEIVE]: '↓',
        [TransactionType.SWAP]: '⇄',
        [TransactionType.APPROVE]: '✓',
        [TransactionType.MINT]: '+',
        [TransactionType.BURN]: '−',
        [TransactionType.STAKE]: '🔒',
        [TransactionType.UNSTAKE]: '🔓',
        [TransactionType.CONTRACT_INTERACTION]: '⚙',
        [TransactionType.UNKNOWN]: '?',
    }
    return icons[type]
}

/**
 * Get transaction type label
 */
export function getTransactionTypeLabel(type: TransactionType): string {
    const labels: Record<TransactionType, string> = {
        [TransactionType.SEND]: 'Send',
        [TransactionType.RECEIVE]: 'Receive',
        [TransactionType.SWAP]: 'Swap',
        [TransactionType.APPROVE]: 'Approve',
        [TransactionType.MINT]: 'Mint',
        [TransactionType.BURN]: 'Burn',
        [TransactionType.STAKE]: 'Stake',
        [TransactionType.UNSTAKE]: 'Unstake',
        [TransactionType.CONTRACT_INTERACTION]: 'Contract',
        [TransactionType.UNKNOWN]: 'Unknown',
    }
    return labels[type]
}

/**
 * Format transaction time ago
 */
export function formatTimeAgo(timestamp: number): string {
    const now = Date.now()
    const diff = now - timestamp

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    if (seconds > 0) return `${seconds}s ago`
    return 'Just now'
}

/**
 * Get explorer transaction URL
 */
export function getExplorerTxUrl(chainId: number, txHash: string): string {
    return getExplorerUrl(chainId, txHash, 'tx')
}

/**
 * Estimate transaction time
 */
export function estimateTransactionTime(gasPrice: bigint, chainId: number): string {
    // Simplified estimation - in production, use actual gas price data
    const gasPriceGwei = Number(gasPrice) / 1e9

    // Ethereum mainnet
    if (chainId === 1) {
        if (gasPriceGwei < 20) return '~5 min'
        if (gasPriceGwei < 50) return '~2 min'
        if (gasPriceGwei < 100) return '~30 sec'
        return '~15 sec'
    }

    // L2s are generally faster
    if ([137, 42161, 10, 8453].includes(chainId)) {
        return '~5 sec'
    }

    return '~1 min'
}

/**
 * Sort transactions by timestamp (newest first)
 */
export function sortTransactionsByTime(transactions: FormattedTransaction[]): FormattedTransaction[] {
    return [...transactions].sort((a, b) => b.timestamp - a.timestamp)
}

/**
 * Filter transactions by type
 */
export function filterTransactionsByType(
    transactions: FormattedTransaction[],
    type: TransactionType
): FormattedTransaction[] {
    return transactions.filter(tx => tx.type === type)
}

/**
 * Filter transactions by status
 */
export function filterTransactionsByStatus(
    transactions: FormattedTransaction[],
    status: TransactionStatus
): FormattedTransaction[] {
    return transactions.filter(tx => tx.status === status)
}

/**
 * Get pending transactions
 */
export function getPendingTransactions(transactions: FormattedTransaction[]): FormattedTransaction[] {
    return filterTransactionsByStatus(transactions, TransactionStatus.PENDING)
}

/**
 * Calculate total gas spent
 */
export function calculateTotalGasSpent(transactions: FormattedTransaction[]): string {
    const total = transactions.reduce((sum, tx) => {
        if (tx.gasUsed && tx.gasPrice) {
            const fee = BigInt(tx.gasUsed) * BigInt(tx.gasPrice)
            return sum + fee
        }
        return sum
    }, BigInt(0))

    const totalEth = Number(total) / 1e18
    return totalEth.toFixed(6)
}

/**
 * Export transactions to CSV
 */
export function exportTransactionsToCSV(transactions: FormattedTransaction[]): string {
    const headers = ['Hash', 'Type', 'From', 'To', 'Value', 'Status', 'Timestamp', 'Gas Used', 'Gas Price']
    const rows = transactions.map(tx => [
        tx.hash,
        getTransactionTypeLabel(tx.type),
        tx.from,
        tx.to,
        tx.value,
        tx.status,
        new Date(tx.timestamp).toISOString(),
        tx.gasUsed || '',
        tx.gasPrice || '',
    ])

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n')

    return csvContent
}

/**
 * Download CSV file
 */
export function downloadTransactionsCSV(transactions: FormattedTransaction[], filename = 'transactions.csv'): void {
    const csv = exportTransactionsToCSV(transactions)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
}
