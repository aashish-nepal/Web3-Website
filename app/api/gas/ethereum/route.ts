import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

/**
 * Ethereum Gas Tracker API Proxy
 * 
 * Proxies requests to Etherscan Gas Tracker API
 * Endpoint: /api/gas/ethereum
 */

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY

export async function GET(request: NextRequest) {
    try {
        if (!ETHERSCAN_API_KEY) {
            // Return mock data if no API key
            return NextResponse.json({
                SafeGasPrice: '18',
                ProposeGasPrice: '23',
                FastGasPrice: '28',
            })
        }

        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'gastracker',
                action: 'gasoracle',
                apikey: ETHERSCAN_API_KEY,
            },
            timeout: 5000, // 5 second timeout
        })

        if (response.data.status === '1') {
            return NextResponse.json(response.data.result)
        }

        // Fallback to mock data
        return NextResponse.json({
            SafeGasPrice: '18',
            ProposeGasPrice: '23',
            FastGasPrice: '28',
        })
    } catch (error: any) {
        const errorType = error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT'
            ? 'Network Error'
            : 'API Error'

        console.warn(`Etherscan Gas ${errorType}: Using fallback mock data`, {
            code: error.code,
            message: error.message,
        })

        // Return mock data on error
        return NextResponse.json({
            SafeGasPrice: '18',
            ProposeGasPrice: '23',
            FastGasPrice: '28',
        })
    }
}
