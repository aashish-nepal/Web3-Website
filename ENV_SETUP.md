# Environment Variables Setup Guide

## Required API Keys

To run this Web3 marketing demo, you need two API keys:

### 1. WalletConnect Project ID

**What it's for:** Enables WalletConnect functionality for mobile wallet connections via QR code.

**How to get it:**
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up for a free account
3. Create a new project
4. Copy your Project ID

**Add to `.env.local`:**
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

---

### 2. Infura Project ID

**What it's for:** Provides RPC endpoints for connecting to Ethereum networks (Mainnet and Sepolia).

**How to get it:**
1. Visit [Infura](https://infura.io/)
2. Sign up for a free account
3. Create a new project
4. Copy your Project ID (API Key)

**Add to `.env.local`:**
```env
NEXT_PUBLIC_INFURA_ID=your_infura_project_id_here
```

---

## Complete `.env.local` File

Your final `.env.local` file should look like this:

```env
# WalletConnect Project ID
# Get yours at: https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123def456ghi789

# Infura Project ID
# Get yours at: https://infura.io/
NEXT_PUBLIC_INFURA_ID=xyz789uvw456rst123
```

> **Note:** Replace the example values with your actual API keys.

---

## Testing Without API Keys

If you want to test the app without setting up API keys immediately:

- **MetaMask** will work without any configuration (uses injected provider)
- **WalletConnect** requires the WalletConnect Project ID
- **Coinbase Wallet** requires the Infura ID for RPC connections

For a full demo experience, both API keys are recommended.

---

## Security Notes

- ✅ These are **public** API keys (prefixed with `NEXT_PUBLIC_`)
- ✅ Safe to use in client-side code
- ✅ Free tier is sufficient for demo purposes
- ⚠️ Never commit `.env.local` to version control (already in `.gitignore`)
- ⚠️ For production, consider rate limiting and usage monitoring

---

## Troubleshooting

**Issue:** WalletConnect not working
- **Solution:** Verify your `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is correct
- **Check:** Project is active in WalletConnect Cloud dashboard

**Issue:** Balance not loading
- **Solution:** Verify your `NEXT_PUBLIC_INFURA_ID` is correct
- **Check:** Infura project has Ethereum Mainnet and Sepolia enabled

**Issue:** "Cannot connect to network"
- **Solution:** Check your internet connection
- **Check:** Infura service status at [status.infura.io](https://status.infura.io/)
