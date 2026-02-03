# Web3 Marketing Demo

A professional, full-stack Web3 marketing demo application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **wagmi**. Features seamless wallet integration with MetaMask, WalletConnect, and Coinbase Wallet.

![Next.js](https://img.shields.io/badge/Next.js-14.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)
![wagmi](https://img.shields.io/badge/wagmi-3.4.2-purple?style=flat-square)

## ✨ Features

- 🦊 **MetaMask Integration** - Connect via browser extension
- 🔗 **WalletConnect Support** - QR code for mobile wallets
- 🔵 **Coinbase Wallet** - Native Coinbase integration
- 🌓 **Dark Mode** - Full dark mode support with system preference detection
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Built with Next.js 14 App Router
- 🎨 **Modern UI** - Beautiful, professional design with Tailwind CSS
- 🔒 **Type Safe** - Full TypeScript coverage
- 🚀 **Production Ready** - Optimized build, ready for deployment

## 🎯 Live Demo

Connect your wallet and experience Web3 connectivity with:
- Real-time balance display
- Chain detection (Ethereum Mainnet / Sepolia)
- Copy-to-clipboard wallet address
- Direct links to blockchain explorers
- Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Web3 wallet (MetaMask, Coinbase Wallet, or WalletConnect-compatible)
- WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com/))
- Infura API Key ([Get one here](https://infura.io/))

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/aashishnepal/Desktop/web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update `.env.local` with your API keys:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_INFURA_ID=your_infura_project_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
web-app/
├── src/
│   ├── lib/
│   │   └── wagmi.ts              # Wagmi configuration
│   ├── components/
│   │   ├── Wallet.tsx            # Wallet connection component
│   │   └── FeatureCard.tsx       # Feature card component
│   └── app/
│       └── providers.tsx         # React providers wrapper
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── .env.local                    # Environment variables
└── package.json                  # Dependencies
```

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[wagmi](https://wagmi.sh/)** - React Hooks for Ethereum
- **[viem](https://viem.sh/)** - TypeScript interface for Ethereum
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching

## 🎨 Features Breakdown

### Wallet Connectivity
- **Pre-Connection State**: Clear call-to-action with wallet options
- **Connection Buttons**: Styled buttons for each wallet provider with loading states
- **Post-Connection Display**:
  - Full wallet address with copy functionality
  - Current blockchain network
  - Real-time ETH balance
  - Link to blockchain explorer
  - Disconnect option

### UI/UX Design
- **Hero Section**: Eye-catching gradient background with animated blobs
- **Features Grid**: 6 feature cards highlighting platform benefits
- **Call-to-Action**: Links to download wallet applications
- **Footer**: Technology credits and copyright

### Responsive & Accessible
- Mobile-first design approach
- Breakpoints for all device sizes
- Dark mode with proper contrast
- Semantic HTML structure
- Custom animations and transitions

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Environment Variables for Production

Make sure to add these in your deployment platform:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_INFURA_ID`

## 🧪 Testing

### Manual Testing Checklist
- [ ] Connect with MetaMask
- [ ] Connect with WalletConnect (mobile)
- [ ] Connect with Coinbase Wallet
- [ ] Copy wallet address
- [ ] View on blockchain explorer
- [ ] Disconnect wallet
- [ ] Test responsive design
- [ ] Toggle dark mode

## 📝 License

This project is open source and available for portfolio and educational purposes.

## 🤝 Contributing

This is a demo project, but feel free to fork and customize for your own needs!

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, and wagmi**

© 2026 Web3 Marketing Demo. All rights reserved.
# Web3-Website
