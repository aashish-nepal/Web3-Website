/**
 * Mock data generators for dashboard metrics and visualizations
 * In production, replace with real API calls
 */

export interface Transaction {
    id: string
    type: 'swap' | 'transfer' | 'stake' | 'unstake'
    from: string
    to: string
    amount: string
    token: string
    timestamp: number
    hash: string
}

export interface ChartDataPoint {
    time: string
    value: number
}

export interface MetricData {
    label: string
    value: number
    change24h: number
    trend: 'up' | 'down'
}

/**
 * Generate mock transaction feed
 */
export function generateMockTransactions(count: number = 10): Transaction[] {
    const types: Transaction['type'][] = ['swap', 'transfer', 'stake', 'unstake']
    const tokens = ['ETH', 'USDC', 'DAI', 'WBTC']

    return Array.from({ length: count }, (_, i) => ({
        id: `tx-${i}`,
        type: types[Math.floor(Math.random() * types.length)],
        from: `0x${Math.random().toString(16).slice(2, 42)}`,
        to: `0x${Math.random().toString(16).slice(2, 42)}`,
        amount: (Math.random() * 10).toFixed(4),
        token: tokens[Math.floor(Math.random() * tokens.length)],
        timestamp: Date.now() - Math.random() * 3600000,
        hash: `0x${Math.random().toString(16).slice(2, 66)}`,
    }))
}

/**
 * Generate mock TVL data
 */
export function getMockTVL(): MetricData {
    return {
        label: 'Total Value Locked',
        value: 1_234_567_890,
        change24h: 5.67,
        trend: 'up',
    }
}

/**
 * Generate mock token price data
 */
export function getMockTokenPrice(): MetricData {
    return {
        label: 'Token Price',
        value: 2_345.67,
        change24h: -2.34,
        trend: 'down',
    }
}

/**
 * Generate mock user count data
 */
export function getMockUserCount(): MetricData {
    return {
        label: 'Active Users',
        value: 45_678,
        change24h: 12.5,
        trend: 'up',
    }
}

/**
 * Generate mock historical chart data
 */
export function generateMockChartData(days: number = 7): ChartDataPoint[] {
    const data: ChartDataPoint[] = []
    const now = Date.now()
    const dayMs = 24 * 60 * 60 * 1000

    let baseValue = 1000

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now - i * dayMs)
        const timeStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

        // Add some randomness to simulate price movement
        baseValue += (Math.random() - 0.5) * 100

        data.push({
            time: timeStr,
            value: Math.max(0, baseValue),
        })
    }

    return data
}

/**
 * Generate a new random transaction (for live feed simulation)
 */
export function generateNewTransaction(): Transaction {
    const types: Transaction['type'][] = ['swap', 'transfer', 'stake', 'unstake']
    const tokens = ['ETH', 'USDC', 'DAI', 'WBTC']

    return {
        id: `tx-${Date.now()}-${Math.random()}`,
        type: types[Math.floor(Math.random() * types.length)],
        from: `0x${Math.random().toString(16).slice(2, 42)}`,
        to: `0x${Math.random().toString(16).slice(2, 42)}`,
        amount: (Math.random() * 10).toFixed(4),
        token: tokens[Math.floor(Math.random() * tokens.length)],
        timestamp: Date.now(),
        hash: `0x${Math.random().toString(16).slice(2, 66)}`,
    }
}

/**
 * Get transaction type icon
 */
export function getTransactionIcon(type: Transaction['type']): string {
    const icons: Record<Transaction['type'], string> = {
        swap: '🔄',
        transfer: '📤',
        stake: '🔒',
        unstake: '🔓',
    }
    return icons[type]
}

/**
 * Get transaction type color
 */
export function getTransactionColor(type: Transaction['type']): string {
    const colors: Record<Transaction['type'], string> = {
        swap: 'text-cyan-400',
        transfer: 'text-violet-400',
        stake: 'text-green-400',
        unstake: 'text-yellow-400',
    }
    return colors[type]
}
