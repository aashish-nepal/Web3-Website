import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Web3 OS | Production-Grade Decentralized Operating System",
  description: "Experience the future of Web3 with our cyber-minimalist operating system. Connect wallets, view real-time metrics, and explore the blockchain with unparalleled style and performance.",
  keywords: ["Web3", "DeFi", "Wallet", "MetaMask", "WalletConnect", "Coinbase Wallet", "Ethereum", "Polygon", "Arbitrum", "Dashboard", "Analytics"],
  authors: [{ name: "Web3 OS Team" }],
  openGraph: {
    title: "Web3 OS | Production-Grade Decentralized Operating System",
    description: "Experience the future of Web3 with our cyber-minimalist operating system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
