import { Navbar } from '@/components/Navigation/Navbar'
import { BentoGrid } from '@/components/Dashboard/BentoGrid'
import { FeatureCard } from '@/components/FeatureCard'
import { Timeline } from '@/components/Roadmap/Timeline'
import { PriceTicker } from '@/components/Shared/PriceTicker'
import { GasTracker } from '@/components/Shared/GasTracker'
import { Sparkles, Shield, Zap, Globe, Smartphone, Code } from 'lucide-react'

/**
 * Home Page - Cyber-Minimalist Web3 OS
 * 
 * Architecture:
 * - Server Components for static sections (Hero, Features, Roadmap, Footer)
 * - Client Components for interactive parts (Navbar, Dashboard)
 * - Prevents hydration mismatches
 * 
 * Sections:
 * 1. Hero - Gradient headline, CTA
 * 2. Dashboard - Bento grid (client component, wallet-dependent)
 * 3. Features - Grid of feature cards
 * 4. Metrics - Additional metrics showcase
 * 5. Roadmap - Vertical timeline
 * 6. Footer - Secondary CTA
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[128px] animate-float" />
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#6B4E9A]/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Welcome to the
              <span className="block gradient-text mt-2">
                Web3 Operating System
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of decentralized applications with our
              production-grade Web3 OS. Connect, transact, and explore the
              blockchain with unparalleled style and performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#dashboard"
                className="px-8 py-4 gradient-gold-purple rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105"
              >
                Launch Dashboard
              </a>
              <a
                href="#features"
                className="px-8 py-4 glass rounded-xl font-bold text-lg hover:glass-strong transition-all border border-white/20"
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20">
              <div>
                <div className="text-3xl md:text-4xl font-bold neon-text-gold">$1.2B+</div>
                <div className="text-sm text-white/60 mt-1">Total Value Locked</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--purple-accent)' }}>45K+</div>
                <div className="text-sm text-white/60 mt-1">Active Users</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text">3</div>
                <div className="text-sm text-white/60 mt-1">Supported Chains</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="py-20 relative">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Your <span className="gradient-text">Command Center</span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Real-time metrics, live transactions, and comprehensive analytics
                at your fingertips
              </p>
            </div>

            {/* Live Price Ticker & Gas Tracker */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              <div className="lg:col-span-2">
                <PriceTicker />
              </div>
              <div>
                <GasTracker />
              </div>
            </div>

            {/* Bento Grid Dashboard */}
            <BentoGrid />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built for <span className="gradient-text">Web3 Natives</span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Enterprise-grade features designed for the decentralized future
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon="🔒"
                title="Secure & Trustless"
                description="Your keys, your crypto. Non-custodial architecture ensures you maintain full control of your assets at all times."
                delay={0}
              />
              <FeatureCard
                icon="⚡"
                title="Lightning Fast"
                description="Optimized RPC endpoints and batch requests deliver instant wallet connections and real-time balance updates."
                delay={0.1}
              />
              <FeatureCard
                icon="🌐"
                title="Multi-Chain Native"
                description="Seamlessly interact with Ethereum, Polygon, and Arbitrum. Switch networks with a single click."
                delay={0.2}
              />
              <FeatureCard
                icon="🎨"
                title="Beautiful UI/UX"
                description="Cyber-minimalist design with glassmorphism, neon accents, and smooth animations for a premium experience."
                delay={0.3}
              />
              <FeatureCard
                icon="📱"
                title="Mobile Optimized"
                description="Responsive design ensures perfect functionality across desktop, tablet, and mobile devices."
                delay={0.4}
              />
              <FeatureCard
                icon="🚀"
                title="Production Ready"
                description="Built with Next.js 14, TypeScript, and wagmi. Enterprise-grade code ready for deployment."
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section id="metrics" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="glass-strong rounded-3xl p-12 md:p-16 border border-white/10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powering the <span className="gradient-text">Decentralized Future</span>
              </h2>
              <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
                Join thousands of users who trust our platform for their Web3 operations.
                Experience the perfect blend of security, speed, and style.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold neon-text-gold mb-2">99.9%</div>
                  <div className="text-sm text-white/60">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--purple-accent)' }}>&lt;100ms</div>
                  <div className="text-sm text-white/60">Response Time</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                  <div className="text-sm text-white/60">Support</div>
                </div>
                <div>
                  <div className="text-4xl font-bold neon-text-gold mb-2">100%</div>
                  <div className="text-sm text-white/60">Open Source</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-20 relative">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="gradient-text">Roadmap</span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Building the future of Web3, one milestone at a time
              </p>
            </div>

            {/* Timeline */}
            <Timeline />
          </div>
        </section>

        {/* Footer / CTA Section */}
        <footer className="py-20 relative border-t border-white/10">
          <div className="container mx-auto px-6">
            {/* Final CTA */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="gradient-text">Get Started</span>?
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                Connect your wallet and experience the future of Web3
              </p>
              <a
                href="#dashboard"
                className="inline-block px-8 py-4 gradient-gold-purple rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105"
              >
                Launch Dashboard
              </a>
            </div>

            {/* Footer Links */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-gold-purple flex items-center justify-center">
                  <span className="text-white font-bold">W3</span>
                </div>
                <span className="font-bold gradient-text">Web3 OS</span>
              </div>

              <div className="text-sm text-white/60">
                Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and wagmi
              </div>

              <div className="text-sm text-white/40">
                © 2026 Web3 OS. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div >
  )
}
