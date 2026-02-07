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
      <head>
        {/* Load error suppression FIRST - before wallet extensions */}
        <script src="/suppress-wallet-errors.js" />

        {/* Debug WalletConnect modal (remove in production) */}
        <script src="/debug-walletconnect.js" />

        {/* CRITICAL: Suppress wallet extension errors FIRST - before anything else loads */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Immediately suppress console errors
            (function() {
              if (typeof window === 'undefined') return;
              
              const originalError = console.error;
              const originalWarn = console.warn;
              
              // Override console.error
              console.error = function() {
                const args = Array.prototype.slice.call(arguments);
                const errorString = args.join(' ');
                
                // Suppress these specific patterns
                const suppress = [
                  'chrome.runtime.sendMessage',
                  'chrome-extension',
                  'Extension ID',
                  'inpage.js',
                  'opfgelmcmbiajamepnmloijbpoleiama',
                  'must specify an Extension ID'
                ];
                
                for (let i = 0; i < suppress.length; i++) {
                  if (errorString.indexOf(suppress[i]) !== -1) {
                    return; // Suppress this error
                  }
                }
                
                // Log legitimate errors
                originalError.apply(console, args);
              };
              
              // Override console.warn
              console.warn = function() {
                const args = Array.prototype.slice.call(arguments);
                const warnString = args.join(' ');
                
                if (warnString.indexOf('wallet') !== -1 || warnString.indexOf('extension') !== -1) {
                  return; // Suppress wallet warnings
                }
                
                originalWarn.apply(console, args);
              };
              
              // Also suppress window.onerror for these patterns
              const originalOnError = window.onerror;
              window.onerror = function(message, source, lineno, colno, error) {
                const msg = String(message);
                if (msg.indexOf('chrome.runtime') !== -1 || msg.indexOf('Extension ID') !== -1) {
                  return true; // Suppress
                }
                if (originalOnError) {
                  return originalOnError(message, source, lineno, colno, error);
                }
                return false;
              };
            })();
          `
        }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
