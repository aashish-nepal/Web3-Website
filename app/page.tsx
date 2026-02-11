import { Navbar } from '@/components/Navigation/Navbar'
import { BentoGrid } from '@/components/Dashboard/BentoGrid'
import { FeatureCard } from '@/components/FeatureCard'
import { Timeline } from '@/components/Roadmap/Timeline'
import { PriceTicker } from '@/components/Shared/PriceTicker'
import { GasTracker } from '@/components/Shared/GasTracker'
import { ParticleBackground } from '@/components/Shared/ParticleBackground'
import { GradientOrbs } from '@/components/Shared/GradientOrbs'
import { CursorGlow } from '@/components/Shared/CursorGlow'
import { ScrollProgress } from '@/components/Shared/ScrollProgress'
import { MagneticButton } from '@/components/Shared/MagneticButton'
import { FloatingScrollTop } from '@/components/Shared/FloatingScrollTop'
import { MeshGradient } from '@/components/Shared/MeshGradient'
import { AnimatedText } from '@/components/Shared/AnimatedText'
import { FloatingElements } from '@/components/Shared/FloatingElements'
import { ScrollReveal } from '@/components/Shared/ScrollReveal'
import { ScrollCounter } from '@/components/Shared/ScrollCounter'
import { ParallaxSection } from '@/components/Shared/ParallaxSection'
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
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Advanced Background Effects */}
      <ParticleBackground />
      <GradientOrbs />
      <CursorGlow />

      {/* Animated Background Gradient */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#6B4E9A]/10 animate-gradient" />
      </div>

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="py-26 md:py-24 lg:py-32 flex items-center justify-center relative min-h-screen md:min-h-0">
          {/* Animated Background Blobs - Now enhanced with new animations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#D4AF37]/20 rounded-full blur-[128px] animate-float-slow" />
            <div className="absolute bottom-1/4 -right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#6B4E9A]/20 rounded-full blur-[128px] animate-float-slow" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

              {/* Left Column - Content */}
              <div className="text-left lg:text-left">
                {/* Mobile/Tablet Ultra-Premium Layout */}
                <div className="lg:hidden relative">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--accent-gold)]/20 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[var(--purple-accent)]/20 rounded-full blur-3xl animate-float-delayed"></div>
                    {/* Animated grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                  </div>

                  {/* Main Headline - Left Aligned */}
                  <div className="mb-6">
                    <h1 className="text-left">
                      <span className="block text-sm font-medium text-white/50 mb-2 uppercase tracking-widest">Welcome to</span>
                      <span className="block text-5xl sm:text-6xl font-black leading-tight">
                        <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-200 to-white bg-clip-text text-transparent">
                          Web3 Operating System
                        </span>
                      </span>
                    </h1>
                    {/* Animated underline */}
                    <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[var(--accent-gold)] to-transparent rounded-full"></div>
                  </div>

                  {/* Subtitle with Icon */}
                  <p className="text-left text-base text-white/70 leading-relaxed mb-8 max-w-md">

                    Experience the future of decentralized applications with unparalleled performance
                  </p>

                  {/* Layered CTA Cards */}
                  <div className="space-y-3 mb-8">
                    {/* Primary CTA - Premium Card */}
                    <MagneticButton
                      href="#dashboard"
                      strength={0.4}
                      className="group relative w-full block"
                    >
                      <div className="relative glass-strong rounded-2xl p-5 border border-white/20 hover:border-[var(--accent-gold)]/50 transition-all overflow-hidden">
                        {/* Animated scan line */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        {/* Content */}
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-light-gold)] flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-[var(--bg-primary)]" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">Launch Dashboard</div>
                              <div className="text-xs text-white/60">Start exploring now</div>
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-[var(--accent-gold)] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </MagneticButton>

                    {/* Secondary CTA - Minimal Card */}
                    <MagneticButton
                      href="#features"
                      strength={0.3}
                      className="group relative w-full block"
                    >
                      <div className="relative glass rounded-2xl p-5 border border-white/10 hover:border-white/30 transition-all">
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center border border-[var(--accent-gold)]/30">
                              <Zap className="w-5 h-5 text-[var(--accent-gold)]" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white/90">Explore Features</div>
                              <div className="text-xs text-white/50">See what's possible</div>
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </MagneticButton>
                  </div>

                  {/* Feature Tags - Horizontal Scroll */}
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    <div className="flex items-center gap-2 px-4 py-2.5 glass-strong rounded-xl border border-white/10 hover:border-[var(--accent-gold)]/30 transition-all whitespace-nowrap group">
                      <Shield className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Non-Custodial</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 glass-strong rounded-xl border border-white/10 hover:border-[var(--accent-gold)]/30 transition-all whitespace-nowrap group">
                      <Zap className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Lightning Fast</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 glass-strong rounded-xl border border-white/10 hover:border-[var(--accent-gold)]/30 transition-all whitespace-nowrap group">
                      <Globe className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Multi-Chain</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 glass-strong rounded-xl border border-white/10 hover:border-[var(--accent-gold)]/30 transition-all whitespace-nowrap group">
                      <Code className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Open Source</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Hidden on Mobile/Tablet */}
                <div className="hidden lg:block">
                  {/* Animated Badge */}
                  <div className="inline-flex items-center gap-2 glass-ultra px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 md:mb-8 border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/60 transition-all duration-300 group cursor-default">
                    <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-gold)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-[var(--accent-gold)]"></span>
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                      🚀 Production-Ready • Multi-Chain
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                    <span className="block text-white/90">Welcome to the</span>
                    <span className="block mt-2">
                      <AnimatedText text="Web3 Operating System" gradient={true} />
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 md:mb-8 leading-relaxed">
                    Experience the future of decentralized applications with our
                    production-grade Web3 OS. <span className="text-[var(--accent-gold)]">Connect, transact, and explore</span> the
                    blockchain with unparalleled style and performance.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
                    <MagneticButton
                      href="#dashboard"
                      strength={0.4}
                      className="px-6 sm:px-8 py-3 sm:py-4 gradient-gold-purple rounded-xl font-bold text-base sm:text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all hover:scale-105 ripple-effect gpu-accelerated inline-flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      Launch Dashboard
                    </MagneticButton>
                    <MagneticButton
                      href="#features"
                      strength={0.3}
                      className="px-6 sm:px-8 py-3 sm:py-4 glass rounded-xl font-bold text-base sm:text-lg hover:glass-strong transition-all border border-white/20 hover:border-white/40 ripple-effect gpu-accelerated inline-flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-gold)]" />
                      Explore Features
                    </MagneticButton>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
                      <span>Non-Custodial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
                      <span>Lightning Fast</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
                      <span>Multi-Chain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-gold)]" />
                      <span>Open Source</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Dashboard Mockup */}
              <div className="relative mt-8 lg:mt-0">
                <div className="relative group">
                  {/* Main Image Container */}
                  <div className="glass-ultra rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/60 transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.3)]">
                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                      <img
                        src="/images/dashboard-mockup.png"
                        alt="Web3 Dashboard Interface Preview"
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-20" />
                    </div>
                  </div>

                  {/* Decorative glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-gold)]/20 to-[var(--purple-accent)]/20 rounded-2xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating badge - Hidden on mobile */}
                  <div className="hidden sm:block absolute -top-4 -right-4 glass-ultra px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[var(--accent-gold)]/40 animate-float-slow">
                    <span className="text-xs sm:text-sm font-bold text-[var(--accent-gold)]">Live Preview</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Stats - Unique Design with Glassmorphic Cards */}
            <div className="mt-12 md:mt-16 lg:mt-24 relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-gold)]/5 via-[var(--purple-accent)]/5 to-[var(--accent-gold)]/5 blur-3xl -z-10" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w mx-auto">
                {/* Stat Card 1 - TVL */}
                <ScrollReveal animation="slide-up" delay={0.1}>
                  <div className="group relative">
                    {/* Animated border gradient */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light-gold)] rounded-xl sm:rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-ring"></div>

                    {/* Card content */}
                    <div className="relative glass-ultra rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)]/40 transition-all duration-500 hover:scale-105 cursor-default">
                      {/* Icon */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 to-[var(--accent-light-gold)]/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>

                      {/* Number */}
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text-gold animate-glow-pulse mb-2">
                        <ScrollCounter end={1.2} decimals={1} prefix="$" suffix="B+" />
                      </div>

                      {/* Label */}
                      <div className="text-xs sm:text-sm font-medium text-white/60 uppercase tracking-wider">Total Value Locked</div>

                      {/* Decorative line */}
                      <div className="mt-3 sm:mt-4 h-1 w-12 sm:w-16 bg-gradient-to-r from-[var(--accent-gold)] to-transparent rounded-full"></div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Stat Card 2 - Users */}
                <ScrollReveal animation="slide-up" delay={0.2}>
                  <div className="group relative">
                    {/* Animated border gradient */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--purple-accent)] to-[#8B5FBF] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>

                    {/* Card content */}
                    <div className="relative glass-ultra rounded-2xl p-8 border border-[var(--purple-accent)]/20 hover:border-[var(--purple-accent)]/40 transition-all duration-500 hover:scale-105 cursor-default">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--purple-accent)]/20 to-[#8B5FBF]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-[var(--purple-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>

                      {/* Number */}
                      <div className="text-4xl md:text-5xl font-bold animate-glow-pulse mb-2" style={{ color: 'var(--purple-accent)' }}>
                        <ScrollCounter end={45} suffix="K+" />
                      </div>

                      {/* Label */}
                      <div className="text-sm font-medium text-white/60 uppercase tracking-wider">Active Users</div>

                      {/* Decorative line */}
                      <div className="mt-4 h-1 w-16 bg-gradient-to-r from-[var(--purple-accent)] to-transparent rounded-full"></div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Stat Card 3 - Chains */}
                <ScrollReveal animation="slide-up" delay={0.3}>
                  <div className="group relative">
                    {/* Animated border gradient */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>

                    {/* Card content */}
                    <div className="relative glass-ultra rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 cursor-default">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 via-[var(--purple-accent)]/20 to-[var(--accent-gold)]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>

                      {/* Number */}
                      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                        <ScrollCounter end={3} />
                      </div>

                      {/* Label */}
                      <div className="text-sm font-medium text-white/60 uppercase tracking-wider">Supported Chains</div>

                      {/* Decorative line */}
                      <div className="mt-4 h-1 w-16 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-transparent rounded-full"></div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Bottom decorative element */}
              <div className="mt-12 flex justify-center">
                <div className="h-px w-64 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/50 to-transparent"></div>
              </div>
            </div>

            {/* Hero Visualization Image */}
            <ScrollReveal animation="scale" delay={0.5}>
              <div className="mt-20 max-w-5xl mx-auto relative group">
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Dashboard Section - Enhanced with Parallax */}
        <ParallaxSection speed={0.3}>
          <section id="dashboard" className="py-16  md:py-24 lg:py-32 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[var(--accent-gold)]/10 rounded-full blur-[150px] animate-float-slow" />
              <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[var(--purple-accent)]/10 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '2s' }} />
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)]/20 to-transparent" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              {/* Section Header - Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">

                {/* Left Column - Command Center Image - Ultra Professional */}
                <div className="relative group perspective-1000">
                  {/* Animated gradient border container */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700 animate-gradient-xy"></div>

                  {/* Main Image Container with advanced glassmorphism */}
                  <div className="relative glass-ultra rounded-3xl p-3 border border-[var(--accent-gold)]/40 hover:border-[var(--accent-gold)]/80 transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(212,175,55,0.4)] backdrop-blur-xl">
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* Image with 3D transform effect */}
                      <img
                        src="/images/dashboard-command-center.png"
                        alt="Web3 Command Center Dashboard Visualization"
                        className="w-full h-auto transform group-hover:scale-[1.05] group-hover:rotate-[0.5deg] transition-all duration-1000 ease-out"
                      />

                      {/* Multi-layer overlay gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-30" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/10 via-transparent to-[var(--purple-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Animated scan line effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent animate-scan-line"></div>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--accent-gold)]/60 rounded-tl-lg"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--accent-gold)]/60 rounded-tr-lg"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--purple-accent)]/60 rounded-bl-lg"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--purple-accent)]/60 rounded-br-lg"></div>
                  </div>

                  {/* Premium multi-layer glow effects */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent-gold)]/20 via-[var(--purple-accent)]/20 to-[var(--accent-gold)]/20 rounded-3xl blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -inset-8 bg-gradient-to-r from-[var(--accent-gold)]/10 to-[var(--purple-accent)]/10 rounded-3xl blur-[60px] -z-20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Floating stats badges */}
                  <div className="absolute -top-6 -right-6 glass-ultra px-5 py-3 rounded-2xl border border-[var(--accent-gold)]/50 animate-float-slow shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[var(--accent-gold)] blur-md opacity-50"></div>
                        <svg className="w-5 h-5 text-[var(--accent-gold)] relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 font-medium">Live Status</div>
                        <div className="text-sm font-bold text-[var(--accent-gold)]">Active</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 glass-ultra px-5 py-3 rounded-2xl border border-[var(--purple-accent)]/50 animate-float-slow shadow-[0_0_30px_rgba(107,78,154,0.3)]" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[var(--purple-accent)] blur-md opacity-50"></div>
                        <svg className="w-5 h-5 text-[var(--purple-accent)] relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 font-medium">Security</div>
                        <div className="text-sm font-bold text-[var(--purple-accent)]">Verified</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Content - Unique Stacked Card Design */}
                <div className="relative space-y-4 sm:space-y-6 mt-8 lg:mt-0">
                  {/* Main Content Card - Stacked with 3D effect */}
                  <div className="relative" style={{ perspective: '1500px' }}>
                    {/* Background stacked cards for depth - Hidden on mobile */}
                    <div className="hidden sm:block absolute inset-0 translate-y-3 translate-x-3 glass-ultra rounded-3xl border border-[var(--accent-gold)]/10 blur-sm opacity-40"></div>
                    <div className="hidden sm:block absolute inset-0 translate-y-1.5 translate-x-1.5 glass-ultra rounded-3xl border border-[var(--accent-gold)]/20 blur-[2px] opacity-60"></div>

                    {/* Main Card */}
                    <div className="relative group/card glass-ultra rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/60 transition-all duration-700 hover:shadow-[0_0_60px_rgba(212,175,55,0.3)]">
                      {/* Animated gradient border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-2xl sm:rounded-3xl opacity-0 group-hover/card:opacity-20 blur transition-opacity duration-700 animate-gradient-xy"></div>

                      {/* Content */}
                      <div className="relative space-y-4 sm:space-y-6">
                        {/* Compact Badge */}
                        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[var(--accent-gold)]/20 to-[var(--purple-accent)]/20 border border-[var(--accent-gold)]/30">
                          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-gold)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[var(--accent-gold)]"></span>
                          </span>
                          <span className="text-[10px] sm:text-xs font-bold text-[var(--accent-gold)]">LIVE DASHBOARD</span>
                        </div>

                        {/* Title - More compact and bold */}
                        <div>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-2 sm:mb-3">
                            <span className="block text-white/95">Command Your</span>
                            <span className="block gradient-text animate-gradient-flow bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] bg-[length:200%_auto]">
                              Web3 Empire
                            </span>
                          </h2>

                          {/* Animated underline */}
                          <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-transparent rounded-full"></div>
                        </div>

                        {/* Description - More concise */}
                        <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
                          Real-time market monitoring, cross-chain gas tracking, and portfolio management—unified in one powerful dashboard.
                        </p>

                        {/* Floating Metric Badges */}
                        <div className="flex flex-wrap gap-3">
                          {/* Metric 1 */}
                          <div className="group/metric relative glass rounded-xl px-4 py-3 border border-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)]/50 transition-all duration-500 hover:scale-105 cursor-default">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/10 to-transparent rounded-xl opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center gap-2">
                              <svg className="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <div>
                                <div className="text-xs text-white/50 font-medium">Updates</div>
                                <div className="text-sm font-bold text-[var(--accent-gold)]">Real-time</div>
                              </div>
                            </div>
                          </div>

                          {/* Metric 2 */}
                          <div className="group/metric relative glass rounded-xl px-4 py-3 border border-[var(--purple-accent)]/20 hover:border-[var(--purple-accent)]/50 transition-all duration-500 hover:scale-105 cursor-default">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-accent)]/10 to-transparent rounded-xl opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center gap-2">
                              <svg className="w-4 h-4 text-[var(--purple-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                              <div>
                                <div className="text-xs text-white/50 font-medium">Networks</div>
                                <div className="text-sm font-bold text-[var(--purple-accent)]">3+ Chains</div>
                              </div>
                            </div>
                          </div>

                          {/* Metric 3 */}
                          <div className="group/metric relative glass rounded-xl px-4 py-3 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 cursor-default">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center gap-2">
                              <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              <div>
                                <div className="text-xs text-white/50 font-medium">Security</div>
                                <div className="text-sm font-bold text-white/90">Verified</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button - Unique Design */}
                  <div className="relative group/cta">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-2xl blur-lg opacity-30 group-hover/cta:opacity-60 transition-opacity duration-500 animate-gradient-xy"></div>

                    {/* Button */}
                    <a
                      href="#dashboard-grid"
                      className="relative flex items-center justify-between gap-4 glass-ultra rounded-2xl p-6 border border-[var(--accent-gold)]/40 hover:border-[var(--accent-gold)]/80 transition-all duration-500 group-hover/cta:shadow-[0_0_40px_rgba(212,175,55,0.4)] cursor-pointer overflow-hidden"
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-gold)]/10 via-[var(--purple-accent)]/10 to-[var(--accent-gold)]/10 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient-flow"></div>

                      {/* Content */}
                      <div className="relative">
                        <div className="text-sm font-medium text-white/60 mb-1">Ready to explore?</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                          Launch Dashboard
                          <svg className="w-5 h-5 text-[var(--accent-gold)] transform group-hover/cta:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 to-[var(--purple-accent)]/20 flex items-center justify-center group-hover/cta:scale-110 transition-transform duration-500">
                        <Sparkles className="w-6 h-6 text-[var(--accent-gold)]" />
                      </div>
                    </a>
                  </div>

                  {/* Trust Indicators - Minimal */}
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Non-Custodial</span>
                    </div>
                    <div className="w-px h-3 bg-white/20"></div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Lightning Fast</span>
                    </div>
                    <div className="w-px h-3 bg-white/20"></div>
                    <div className="flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      <span>Open Source</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Price Ticker & Gas Tracker */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="lg:col-span-2">
                  <PriceTicker />
                </div>
                <div>
                  <GasTracker />
                </div>
              </div>

              {/* Bento Grid Dashboard - Enhanced Container */}
              <div className="relative group">
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-gold)]/5 via-[var(--purple-accent)]/5 to-[var(--accent-gold)]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Content */}
                <div className="relative">
                  <BentoGrid />
                </div>
              </div>
            </div>
          </section>
        </ParallaxSection>



        <section id="features" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[var(--accent-gold)]/5 rounded-full blur-[150px] animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[var(--purple-accent)]/5 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header - Ultra Premium Design */}
            <ScrollReveal animation="fade" delay={0}>
              <div className="text-center mb-12 md:mb-16 lg:mb-24 relative">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Scan line effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/5 to-transparent h-32 animate-scan-line"></div>
                  {/* Floating particles */}
                  <div className="absolute top-10 left-1/4 w-1 h-1 bg-[var(--accent-gold)] rounded-full animate-float"></div>
                  <div className="absolute top-20 right-1/3 w-1 h-1 bg-[var(--purple-accent)] rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Premium Full-Width Badge with 3D Effect */}
                <div className="max-w-7xl mx-auto mb-8 md:mb-12 relative group/badge" style={{ perspective: '1000px' }}>
                  <div className="relative px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-[var(--accent-gold)]/15 via-[var(--purple-accent)]/15 to-[var(--accent-gold)]/15 backdrop-blur-md border-2 border-[var(--accent-gold)]/40 rounded-2xl sm:rounded-3xl transform group-hover/badge:rotateX-2 transition-transform duration-700">
                    {/* Holographic shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1500 rounded-2xl sm:rounded-3xl"></div>

                    {/* Animated border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-2xl sm:rounded-3xl opacity-0 group-hover/badge:opacity-30 blur-lg transition-opacity duration-700 animate-gradient-xy"></div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 relative z-10">
                      {/* Left accent */}
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent to-[var(--accent-gold)]"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                      </div>

                      {/* Main text with split gradient */}
                      <div className="relative">
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black uppercase whitespace-nowrap">
                          <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">Built for </span>
                          <span className="bg-gradient-to-r from-[var(--purple-accent)] via-blue-400 to-[var(--purple-accent)] bg-clip-text text-transparent">Web3 Natives</span>
                        </span>
                        {/* Text shadow effect */}
                        <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)]"></div>
                      </div>

                      {/* Right accent */}
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-l from-transparent to-[var(--accent-gold)]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced corner accents with animation */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-6 group-hover/badge:h-6 sm:group-hover/badge:w-8 sm:group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-6 group-hover/badge:h-6 sm:group-hover/badge:w-8 sm:group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-6 group-hover/badge:h-6 sm:group-hover/badge:w-8 sm:group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-6 group-hover/badge:h-6 sm:group-hover/badge:w-8 sm:group-hover/badge:h-8 transition-all duration-500"></div>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature Grid - Unique Professional Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 - Secure & Trustless */}
              <ScrollReveal animation="slide-up" delay={0}>
                <div className="group relative h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light-gold)] rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>

                  {/* Card Container */}
                  <div className="relative h-full glass-ultra rounded-3xl overflow-hidden border border-[var(--accent-gold)]/20 group-hover:border-[var(--accent-gold)]/40 transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                    {/* Number Badge */}
                    <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 to-[var(--accent-gold)]/5 border border-[var(--accent-gold)]/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg font-black text-[var(--accent-gold)]">01</span>
                    </div>

                    {/* Image Header - Larger */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="/images/feature-secure-trustless.png"
                        alt="Secure & Trustless"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 to-transparent border border-[var(--accent-gold)]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Shield className="w-7 h-7 text-[var(--accent-gold)]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--accent-gold)] transition-colors duration-300">
                        Secure & Trustless
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 leading-relaxed mb-6">
                        Your keys, your crypto. Non-custodial architecture ensures you maintain full control of your assets at all times.
                      </p>

                      {/* Decorative Line */}
                      <div className="h-1 w-16 bg-gradient-to-r from-[var(--accent-gold)] to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 2 - Lightning Fast */}
              <ScrollReveal animation="slide-up" delay={0.1}>
                <div className="group relative h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>

                  {/* Card Container */}
                  <div className="relative h-full glass-ultra rounded-3xl overflow-hidden border border-yellow-500/20 group-hover:border-yellow-500/40 transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(234,179,8,0.2)]">
                    {/* Number Badge */}
                    <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg font-black text-yellow-400">02</span>
                    </div>

                    {/* Image Header - Larger */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="/images/feature-lightning-fast.png"
                        alt="Lightning Fast"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <Zap className="w-7 h-7 text-yellow-400" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                        Lightning Fast
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 leading-relaxed mb-6">
                        Optimized RPC endpoints and batch requests deliver instant wallet connections and real-time balance updates.
                      </p>

                      {/* Decorative Line */}
                      <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 3 - Multi-Chain Native */}
              <ScrollReveal animation="slide-up" delay={0.2}>
                <div className="group relative h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--purple-accent)] to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>

                  {/* Card Container */}
                  <div className="relative h-full glass-ultra rounded-3xl overflow-hidden border border-[var(--purple-accent)]/20 group-hover:border-[var(--purple-accent)]/40 transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(107,78,154,0.2)]">
                    {/* Number Badge */}
                    <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--purple-accent)]/20 to-[var(--purple-accent)]/5 border border-[var(--purple-accent)]/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg font-black text-[var(--purple-accent)]">03</span>
                    </div>

                    {/* Image Header - Larger */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="/images/feature-multichain.png"
                        alt="Multi-Chain Native"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--purple-accent)]/20 to-transparent border border-[var(--purple-accent)]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-180 transition-all duration-700">
                        <Globe className="w-7 h-7 text-[var(--purple-accent)]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--purple-accent)] transition-colors duration-300">
                        Multi-Chain Native
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 leading-relaxed mb-6">
                        Seamlessly interact with Ethereum, Polygon, and Arbitrum. Switch networks with a single click.
                      </p>

                      {/* Decorative Line */}
                      <div className="h-1 w-16 bg-gradient-to-r from-[var(--purple-accent)] to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 4 - Beautiful UI/UX */}
              <ScrollReveal animation="slide-up" delay={0.3}>
                <div className="group relative h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>

                  {/* Card Container */}
                  <div className="relative h-full glass-ultra rounded-3xl overflow-hidden border border-pink-500/20 group-hover:border-pink-500/40 transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]">
                    {/* Number Badge */}
                    <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg font-black text-pink-400">04</span>
                    </div>

                    {/* Image Header - Larger */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="/images/decentralized-network.png"
                        alt="Beautiful UI/UX"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="w-7 h-7 text-pink-400" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">
                        Beautiful UI/UX
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 leading-relaxed mb-6">
                        Cyber-minimalist design with glassmorphism, neon accents, and smooth animations for a premium experience.
                      </p>

                      {/* Decorative Line */}
                      <div className="h-1 w-16 bg-gradient-to-r from-pink-400 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 5 - Mobile Optimized */}
              <ScrollReveal animation="slide-up" delay={0.4}>
                <div className="group relative h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>

                  {/* Card Container */}
                  <div className="relative h-full glass-ultra rounded-3xl overflow-hidden border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.2)]">
                    {/* Number Badge */}
                    <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg font-black text-blue-400">05</span>
                    </div>

                    {/* Image Header - Larger */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="/images/feature-mobile-optimized.png"
                        alt="Mobile Optimized"
                        className="w-full h-full object-cover transform scale-120 group-hover:scale-[1.35] transition-transform duration-1000"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Smartphone className="w-7 h-7 text-blue-400" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                        Mobile Optimized
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 leading-relaxed mb-6">
                        Responsive design ensures perfect functionality across desktop, tablet, and mobile devices.
                      </p>

                      {/* Decorative Line */}
                      <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 6 - Production Ready */}
              <ScrollReveal animation="slide-up" delay={0.5}>
                <div className="group relative h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-700"></div>

                  {/* Card Container */}
                  <div className="relative h-full glass-ultra rounded-3xl overflow-hidden border border-green-500/20 group-hover:border-green-500/40 transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(16,185,129,0.2)]">
                    {/* Number Badge */}
                    <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-lg font-black text-green-400">06</span>
                    </div>

                    {/* Image Header - Larger */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="/images/feature-production-ready.png"
                        alt="Production Ready"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Code className="w-7 h-7 text-green-400" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                        Production Ready
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 leading-relaxed mb-6">
                        Built with Next.js 14, TypeScript, and wagmi. Enterprise-grade code ready for deployment.
                      </p>

                      {/* Decorative Line */}
                      <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Metrics Section - Ultra Premium Design */}
        <section id="metrics" className="py-32 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-gold)]/5 rounded-full blur-[150px] animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--purple-accent)]/5 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Section Header - Ultra Premium Design */}
            <ScrollReveal animation="fade" delay={0}>
              <div className="text-center mb-24 relative">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Scan line effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/5 to-transparent h-32 animate-scan-line"></div>
                  {/* Floating particles */}
                  <div className="absolute top-10 left-1/4 w-1 h-1 bg-[var(--accent-gold)] rounded-full animate-float"></div>
                  <div className="absolute top-20 right-1/3 w-1 h-1 bg-[var(--purple-accent)] rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Premium Full-Width Badge with 3D Effect */}
                <div className="max-w-7xl mx-auto mb-12 relative group/badge" style={{ perspective: '1000px' }}>
                  <div className="relative px-16 py-6 bg-gradient-to-r from-[var(--accent-gold)]/15 via-[var(--purple-accent)]/15 to-[var(--accent-gold)]/15 backdrop-blur-md border-2 border-[var(--accent-gold)]/40 rounded-3xl transform group-hover/badge:rotateX-2 transition-transform duration-700">
                    {/* Holographic shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1500 rounded-3xl"></div>

                    {/* Animated border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover/badge:opacity-30 blur-lg transition-opacity duration-700 animate-gradient-xy"></div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 relative z-10">
                      {/* Left accent */}
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent to-[var(--accent-gold)]"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                      </div>

                      {/* Main text with split gradient */}
                      <div className="relative max-w-7xl">
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black uppercase text-center block sm:whitespace-nowrap">
                          <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">Powering
                          </span>
                          <span className="bg-gradient-to-r from-[var(--purple-accent)] via-blue-400 to-[var(--purple-accent)] bg-clip-text text-transparent">Decentralized Future</span>
                        </span>
                        {/* Text shadow effect */}
                        <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)]"></div>
                      </div>

                      {/* Right accent */}
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-l from-transparent to-[var(--accent-gold)]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced corner accents with animation */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                </div>

                {/* Advanced Metric Showcase Panel */}
                <div className="max-w-7xl mx-auto relative group/panel">
                  {/* Animated border appears on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover/panel:opacity-20 blur-xl transition-opacity duration-700 animate-gradient-xy"></div>

                  {/* Main Panel with enhanced glassmorphism */}
                  <div className="relative glass-ultra rounded-3xl p-8 md:p-12 border border-[var(--accent-gold)]/30 backdrop-blur-2xl">
                    {/* Multiple animated glows */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--accent-gold)]/20 rounded-full blur-3xl opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700" style={{ transitionDelay: '100ms' }}></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[var(--purple-accent)]/20 rounded-full blur-3xl opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700" style={{ transitionDelay: '200ms' }}></div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                      {/* Metric 1 - Uptime */}
                      <ScrollReveal animation="slide-up" delay={0.1}>
                        <div className="group/metric relative">
                          {/* Card glow */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-light-gold)] rounded-2xl opacity-0 group-hover/metric:opacity-30 blur transition-opacity duration-500"></div>

                          {/* Card */}
                          <div className="relative glass rounded-2xl p-6 border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/60 transition-all duration-500 hover:scale-105 cursor-default">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 to-transparent border border-[var(--accent-gold)]/40 flex items-center justify-center mb-4 group-hover/metric:scale-110 transition-transform duration-300">
                              <svg className="w-7 h-7 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>

                            {/* Value */}
                            <div className="text-4xl font-black neon-text-gold mb-2 animate-glow-pulse">99.9%</div>

                            {/* Label */}
                            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Uptime</div>

                            {/* Subtitle */}
                            <div className="text-xs text-white/40 mt-1">Always Available</div>
                          </div>
                        </div>
                      </ScrollReveal>

                      {/* Metric 2 - Response Time */}
                      <ScrollReveal animation="slide-up" delay={0.2}>
                        <div className="group/metric relative">
                          {/* Card glow */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl opacity-0 group-hover/metric:opacity-30 blur transition-opacity duration-500"></div>

                          {/* Card */}
                          <div className="relative glass rounded-2xl p-6 border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 hover:scale-105 cursor-default">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/40 flex items-center justify-center mb-4 group-hover/metric:scale-110 transition-transform duration-300">
                              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>

                            {/* Value */}
                            <div className="text-4xl font-black mb-2 animate-glow-pulse" style={{ color: 'var(--accent-light-gold)' }}>&lt;100ms</div>

                            {/* Label */}
                            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Response Time</div>

                            {/* Subtitle */}
                            <div className="text-xs text-white/40 mt-1">Lightning Fast</div>
                          </div>
                        </div>
                      </ScrollReveal>

                      {/* Metric 3 - Support */}
                      <ScrollReveal animation="slide-up" delay={0.3}>
                        <div className="group/metric relative">
                          {/* Card glow */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--purple-accent)] to-blue-500 rounded-2xl opacity-0 group-hover/metric:opacity-30 blur transition-opacity duration-500"></div>

                          {/* Card */}
                          <div className="relative glass rounded-2xl p-6 border border-[var(--purple-accent)]/30 hover:border-[var(--purple-accent)]/60 transition-all duration-500 hover:scale-105 cursor-default">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--purple-accent)]/20 to-transparent border border-[var(--purple-accent)]/40 flex items-center justify-center mb-4 group-hover/metric:scale-110 transition-transform duration-300">
                              <svg className="w-7 h-7 text-[var(--purple-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>

                            {/* Value */}
                            <div className="text-4xl font-black gradient-text mb-2">24/7</div>

                            {/* Label */}
                            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Support</div>

                            {/* Subtitle */}
                            <div className="text-xs text-white/40 mt-1">Always Here</div>
                          </div>
                        </div>
                      </ScrollReveal>

                      {/* Metric 4 - Open Source */}
                      <ScrollReveal animation="slide-up" delay={0.4}>
                        <div className="group/metric relative">
                          {/* Card glow */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-2xl opacity-0 group-hover/metric:opacity-30 blur transition-opacity duration-500"></div>

                          {/* Card */}
                          <div className="relative glass rounded-2xl p-6 border border-white/30 hover:border-white/60 transition-all duration-500 hover:scale-105 cursor-default">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 via-[var(--purple-accent)]/10 to-transparent border border-white/40 flex items-center justify-center mb-4 group-hover/metric:scale-110 transition-transform duration-300">
                              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            </div>

                            {/* Value */}
                            <div className="text-4xl font-black neon-text-gold mb-2 animate-glow-pulse">100%</div>

                            {/* Label */}
                            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Open Source</div>

                            {/* Subtitle */}
                            <div className="text-xs text-white/40 mt-1">Fully Transparent</div>
                          </div>
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Roadmap Section - Ultra Premium Design */}
        <section id="roadmap" className="py-32 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-gold)]/5 rounded-full blur-[150px] animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--purple-accent)]/5 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Section Header - Ultra Premium Design */}
            <ScrollReveal animation="fade" delay={0}>
              <div className="text-center mb-24 relative">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Scan line effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/5 to-transparent h-32 animate-scan-line"></div>
                  {/* Floating particles */}
                  <div className="absolute top-10 left-1/4 w-1 h-1 bg-[var(--accent-gold)] rounded-full animate-float"></div>
                  <div className="absolute top-20 right-1/3 w-1 h-1 bg-[var(--purple-accent)] rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Premium Full-Width Badge with 3D Effect */}
                <div className="max-w-7xl mx-auto mb-12 relative group/badge" style={{ perspective: '1000px' }}>
                  <div className="relative px-16 py-4 bg-gradient-to-r from-[var(--accent-gold)]/15 via-[var(--purple-accent)]/15 to-[var(--accent-gold)]/15 backdrop-blur-md border-2 border-[var(--accent-gold)]/40 rounded-3xl transform group-hover/badge:rotateX-2 transition-transform duration-700">
                    {/* Holographic shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1500 rounded-3xl"></div>

                    {/* Animated border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover/badge:opacity-30 blur-lg transition-opacity duration-700 animate-gradient-xy"></div>

                    <div className="flex items-center justify-center gap-6 relative z-10">
                      {/* Left accent */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[var(--accent-gold)]"></div>
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                      </div>

                      {/* Main text with split gradient */}
                      <div className="relative">
                        <span className="text-4xl md:text-4xl lg:text-6xl font-black uppercase whitespace-nowrap">
                          <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">Our </span>
                          <span className="bg-gradient-to-r from-[var(--purple-accent)] via-blue-400 to-[var(--purple-accent)] bg-clip-text text-transparent">Roadmap</span>
                        </span>
                        {/* Text shadow effect */}
                        <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)]"></div>
                      </div>

                      {/* Right accent */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[var(--accent-gold)]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced corner accents with animation */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--accent-gold)] group-hover/badge:w-8 group-hover/badge:h-8 transition-all duration-500"></div>
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline Container - Optimized for Performance */}
            <div className="relative max-w-7xl mx-auto">
              {/* Simplified Background Effects */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {/* Single optimized scan line */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/10 to-transparent h-40 animate-scan-line"></div>

                {/* Reduced floating particles - only 2 for performance */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--accent-gold)] rounded-full animate-float blur-sm opacity-60"></div>
                <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-[var(--purple-accent)] rounded-full animate-float-slow blur-sm opacity-60" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Single stacked card for depth - reduced from 3 */}
              <div className="absolute inset-0 translate-y-3 translate-x-3 glass-ultra rounded-3xl border border-[var(--accent-gold)]/5 blur-sm opacity-30"></div>

              {/* Main Container */}
              <div className="relative group/container">
                {/* Cyber grid overlay */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_48%,rgba(212,175,55,0.08)_49%,rgba(212,175,55,0.08)_51%,transparent_52%),linear-gradient(transparent_48%,rgba(212,175,55,0.08)_49%,rgba(212,175,55,0.08)_51%,transparent_52%)] bg-[length:30px_30px]"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(107,78,154,0.05)_25%,rgba(107,78,154,0.05)_26%,transparent_27%,transparent_74%,rgba(107,78,154,0.05)_75%,rgba(107,78,154,0.05)_76%,transparent_77%),linear-gradient(transparent_24%,rgba(107,78,154,0.05)_25%,rgba(107,78,154,0.05)_26%,transparent_27%,transparent_74%,rgba(107,78,154,0.05)_75%,rgba(107,78,154,0.05)_76%,transparent_77%)] bg-[length:60px_60px]"></div>
                </div>

                {/* Multi-layer holographic border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover/container:opacity-30 blur-xl transition-opacity duration-700 animate-gradient-xy"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400/20 via-transparent to-[var(--purple-accent)]/20 rounded-3xl opacity-0 group-hover/container:opacity-100 transition-opacity duration-700"></div>

                {/* Main Panel - Optimized */}
                <div className="relative glass-ultra rounded-3xl p-6 md:p-10 border-2 border-[var(--accent-gold)]/40 backdrop-blur-3xl overflow-hidden transition-opacity duration-700">
                  {/* Reduced glow system - only 2 glows instead of 4 */}
                  <div className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--accent-gold)]/15 rounded-full blur-3xl opacity-0 group-hover/container:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -bottom-20 right-0 w-60 h-60 bg-[var(--purple-accent)]/15 rounded-full blur-3xl opacity-0 group-hover/container:opacity-100 transition-opacity duration-700" style={{ animationDelay: '0.5s' }}></div>

                  {/* Corner radar effects */}
                  <div className="absolute top-0 left-0 w-32 h-32 opacity-30">
                    <div className="absolute inset-0 border-t-2 border-l-2 border-[var(--accent-gold)]/60 rounded-tl-3xl"></div>
                    <div className="absolute inset-2 border-t border-l border-[var(--accent-gold)]/40 rounded-tl-3xl"></div>
                    <div className="absolute inset-4 border-t border-l border-[var(--accent-gold)]/20 rounded-tl-3xl"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
                    <div className="absolute inset-0 border-t-2 border-r-2 border-[var(--accent-gold)]/60 rounded-tr-3xl"></div>
                    <div className="absolute inset-2 border-t border-r border-[var(--accent-gold)]/40 rounded-tr-3xl"></div>
                    <div className="absolute inset-4 border-t border-r border-[var(--accent-gold)]/20 rounded-tr-3xl"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 opacity-30">
                    <div className="absolute inset-0 border-b-2 border-l-2 border-[var(--purple-accent)]/60 rounded-bl-3xl"></div>
                    <div className="absolute inset-2 border-b border-l border-[var(--purple-accent)]/40 rounded-bl-3xl"></div>
                    <div className="absolute inset-4 border-b border-l border-[var(--purple-accent)]/20 rounded-bl-3xl"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
                    <div className="absolute inset-0 border-b-2 border-r-2 border-[var(--purple-accent)]/60 rounded-br-3xl"></div>
                    <div className="absolute inset-2 border-b border-r border-[var(--purple-accent)]/40 rounded-br-3xl"></div>
                    <div className="absolute inset-4 border-b border-r border-[var(--purple-accent)]/20 rounded-br-3xl"></div>
                  </div>

                  {/* Advanced Floating Stat Cards - Top Right */}
                  <div className="absolute -top-6 -right-6 z-20 flex flex-col gap-3">
                    {/* Progress Overview Card */}
                    <div className="group/stat glass-ultra rounded-2xl p-4 border-2 border-[var(--accent-gold)]/50 animate-float-slow shadow-[0_0_40px_rgba(212,175,55,0.4)] backdrop-blur-2xl min-w-[200px]">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-yellow-400 rounded-2xl opacity-0 group-hover/stat:opacity-20 blur transition-opacity duration-500"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Progress</div>
                          <div className="relative w-8 h-8">
                            {/* Animated progress ring */}
                            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                              <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"></circle>
                              <circle cx="16" cy="16" r="14" fill="none" stroke="url(#progressGradient)" strokeWidth="3" strokeDasharray="88" strokeDashoffset="29" strokeLinecap="round" className="animate-pulse-ring"></circle>
                              <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="var(--accent-gold)" />
                                  <stop offset="100%" stopColor="var(--purple-accent)" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--accent-gold)]">67%</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/60">Completed</span>
                            <span className="font-bold text-green-400">2/6</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/60">In Progress</span>
                            <span className="font-bold text-[var(--accent-gold)]">1/6</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/60">Upcoming</span>
                            <span className="font-bold text-white/40">3/6</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Status Card */}
                    <div className="group/stat glass-ultra rounded-2xl px-4 py-3 border-2 border-[var(--purple-accent)]/50 animate-float-slow shadow-[0_0_40px_rgba(107,78,154,0.4)] backdrop-blur-2xl" style={{ animationDelay: '0.5s' }}>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--purple-accent)] to-blue-500 rounded-2xl opacity-0 group-hover/stat:opacity-20 blur transition-opacity duration-500"></div>
                      <div className="relative flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[var(--purple-accent)] blur-lg opacity-50 animate-pulse"></div>
                          <svg className="w-5 h-5 text-[var(--purple-accent)] relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-white/50 font-medium">Status</div>
                          <div className="text-sm font-bold text-[var(--purple-accent)]">Live Updates</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Development Status Card - Bottom Left */}
                  <div className="absolute -bottom-6 -left-6 z-20 group/stat glass-ultra rounded-2xl px-5 py-4 border-2 border-yellow-500/50 animate-float-slow shadow-[0_0_40px_rgba(234,179,8,0.4)] backdrop-blur-2xl" style={{ animationDelay: '1s' }}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl opacity-0 group-hover/stat:opacity-20 blur transition-opacity duration-500"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-50 animate-pulse"></div>
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/20 to-transparent border border-yellow-400/40 flex items-center justify-center">
                          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Development</div>
                        <div className="text-base font-black text-yellow-400">Active Build</div>
                        <div className="text-xs text-white/40 mt-0.5">Q1 2026</div>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Counter - Bottom Right */}
                  <div className="absolute -bottom-6 -right-6 z-20 group/stat glass-ultra rounded-2xl px-5 py-4 border-2 border-white/30 animate-float-slow shadow-[0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-2xl" style={{ animationDelay: '1.5s' }}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-2xl opacity-0 group-hover/stat:opacity-20 blur transition-opacity duration-500"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)] blur-lg opacity-50"></div>
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-gold)]/20 via-[var(--purple-accent)]/10 to-transparent border border-white/40 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Total</div>
                        <div className="text-base font-black gradient-text">6 Milestones</div>
                        <div className="text-xs text-white/40 mt-0.5">2024-2026</div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Component */}
                  <div className="relative z-10">
                    <Timeline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer / CTA Section - Ultra Premium Design */}
        <footer className="py-16 md:py-24 lg:py-32 relative overflow-hidden border-t border-[var(--accent-gold)]/20">
          {/* Animated Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[var(--accent-gold)]/5 rounded-full blur-[150px] animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[var(--purple-accent)]/5 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '2s' }}></div>
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/5 to-transparent h-32 animate-scan-line"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Premium CTA Badge */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              {/* 3D Badge Container */}
              <div className="max-w-7xl mx-auto mb-8 md:mb-12 relative group/cta" style={{ perspective: '1000px' }}>
                <div className="relative px-6 sm:px-10 md:px-16 py-6 sm:py-7 md:py-8 bg-gradient-to-r from-[var(--accent-gold)]/15 via-[var(--purple-accent)]/15 to-[var(--accent-gold)]/15 backdrop-blur-md border-2 border-[var(--accent-gold)]/40 rounded-2xl sm:rounded-3xl transform group-hover/cta:rotateX-2 transition-transform duration-700">
                  {/* Holographic shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1500 rounded-3xl"></div>

                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--purple-accent)] to-[var(--accent-gold)] rounded-3xl opacity-0 group-hover/cta:opacity-30 blur-lg transition-opacity duration-700 animate-gradient-xy"></div>

                  <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 relative z-10">
                    {/* Top accent line - Hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-[var(--accent-gold)]"></div>
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-[var(--accent-gold)]"></div>
                    </div>

                    {/* Main text with split gradient */}
                    <div className="relative">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase text-center leading-tight">
                        <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">Ready to </span>
                        <span className="bg-gradient-to-r from-[var(--purple-accent)] via-blue-400 to-[var(--purple-accent)] bg-clip-text text-transparent">Get Started</span>
                        <span className="bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">?</span>
                      </h2>
                      {/* Text shadow effect */}
                      <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)]"></div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
                      Connect your wallet and experience the future of Web3 with our ultra-premium dashboard
                    </p>

                    {/* Enhanced CTA Button */}
                    <div className="relative group/btn mt-2 sm:mt-3 md:mt-4">
                      {/* Button glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-gold)] via-yellow-400 to-[var(--accent-gold)] rounded-2xl opacity-50 group-hover/btn:opacity-100 blur-lg transition-opacity duration-500 animate-gradient-xy"></div>

                      <MagneticButton
                        href="#dashboard"
                        strength={0.4}
                        className="relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-[var(--accent-gold)] via-yellow-400 to-[var(--accent-gold)] rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg text-black shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all hover:scale-105 ripple-effect gpu-accelerated border-2 border-yellow-300/50"
                      >
                        <span>Launch Dashboard</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </MagneticButton>
                    </div>

                    {/* Bottom accent line - Hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-[var(--accent-gold)]"></div>
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-[var(--accent-gold)]"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced corner accents with animation - Hidden on mobile */}
                <div className="hidden sm:block absolute -top-2 -left-2 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-[var(--accent-gold)] group-hover/cta:w-6 group-hover/cta:h-6 sm:group-hover/cta:w-8 sm:group-hover/cta:h-8 transition-all duration-500"></div>
                <div className="hidden sm:block absolute -top-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-[var(--accent-gold)] group-hover/cta:w-6 group-hover/cta:h-6 sm:group-hover/cta:w-8 sm:group-hover/cta:h-8 transition-all duration-500"></div>
                <div className="hidden sm:block absolute -bottom-2 -left-2 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-[var(--accent-gold)] group-hover/cta:w-6 group-hover/cta:h-6 sm:group-hover/cta:w-8 sm:group-hover/cta:h-8 transition-all duration-500"></div>
                <div className="hidden sm:block absolute -bottom-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-[var(--accent-gold)] group-hover/cta:w-6 group-hover/cta:h-6 sm:group-hover/cta:w-8 sm:group-hover/cta:h-8 transition-all duration-500"></div>
              </div>
            </div>

            {/* Footer Links - Advanced Web3 Market Design */}
            <div className="relative">
              {/* Holographic divider line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent"></div>

              <div className="pt-8 md:pt-12 lg:pt-16">
                {/* Main Footer Grid */}
                <div className="mb-8 md:mb-10 lg:mb-12">
                  {/* Mobile/Tablet: Stacked Layout, Desktop: 6-Column Grid */}
                  <div className="flex flex-col lg:grid lg:grid-cols-6 gap-8 md:gap-10 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-col gap-6">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-gold)] via-yellow-400 to-[var(--purple-accent)] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                              <span className="text-black font-black text-xl">W3</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-black text-2xl bg-gradient-to-r from-[var(--accent-gold)] via-yellow-300 to-[var(--accent-gold)] bg-clip-text text-transparent">
                              Web3 OS
                            </div>
                            <div className="text-xs text-white/40 font-medium">The Future of DeFi</div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-white/60 leading-relaxed">
                          The most advanced Web3 operating system for managing your digital assets, DeFi protocols, and blockchain interactions.
                        </p>

                        {/* Newsletter Signup */}
                        <div className="space-y-3">
                          <h4 className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider">Stay Updated</h4>
                          <div className="relative group/input">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--purple-accent)] rounded-xl opacity-0 group-hover/input:opacity-20 blur transition-opacity duration-300"></div>
                            <div className="relative flex flex-col sm:flex-row gap-2">
                              <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl glass border border-white/10 focus:border-[var(--accent-gold)]/40 bg-white/5 text-white text-xs sm:text-sm placeholder:text-white/40 outline-none transition-all duration-300"
                              />
                              <button className="px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-yellow-500 text-black font-bold text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 whitespace-nowrap">
                                Subscribe
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Links Container - 2 Columns on Mobile/Tablet, Individual Columns on Desktop */}
                    <div className="grid grid-cols-2 lg:contents gap-8 md:gap-10 lg:gap-0">
                      {/* Product Links */}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-[var(--accent-gold)] to-transparent rounded-full"></div>
                          Product
                        </h4>
                        <ul className="space-y-3">
                          {['Dashboard', 'Analytics', 'Swap', 'Stake', 'Portfolio', 'NFTs'].map((item) => (
                            <li key={item}>
                              <a href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-[var(--accent-gold)] transition-colors duration-300 flex items-center gap-2 group/link">
                                <div className="w-1 h-1 rounded-full bg-white/40 group-hover/link:bg-[var(--accent-gold)] transition-colors duration-300"></div>
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources Links */}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-[var(--purple-accent)] to-transparent rounded-full"></div>
                          Resources
                        </h4>
                        <ul className="space-y-3">
                          {['Documentation', 'API Reference', 'Blog', 'Support', 'Community', 'Tutorials'].map((item) => (
                            <li key={item}>
                              <a href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-[var(--accent-gold)] transition-colors duration-300 flex items-center gap-2 group/link">
                                <div className="w-1 h-1 rounded-full bg-white/40 group-hover/link:bg-[var(--accent-gold)] transition-colors duration-300"></div>
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Company Links */}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"></div>
                          Company
                        </h4>
                        <ul className="space-y-3">
                          {['About Us', 'Careers', 'Press Kit', 'Partners', 'Brand Assets', 'Contact'].map((item) => (
                            <li key={item}>
                              <a href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-[var(--accent-gold)] transition-colors duration-300 flex items-center gap-2 group/link">
                                <div className="w-1 h-1 rounded-full bg-white/40 group-hover/link:bg-[var(--accent-gold)] transition-colors duration-300"></div>
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Legal Links */}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
                          Legal
                        </h4>
                        <ul className="space-y-3">
                          {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'Compliance', 'Licenses'].map((item) => (
                            <li key={item}>
                              <a href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-[var(--accent-gold)] transition-colors duration-300 flex items-center gap-2 group/link">
                                <div className="w-1 h-1 rounded-full bg-white/40 group-hover/link:bg-[var(--accent-gold)] transition-colors duration-300"></div>
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 md:pt-8 border-t border-white/10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                    {/* Copyright */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/40 text-center">
                      <span>© 2026 Web3 OS. All rights reserved.</span>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-2">
                        <span>Built with</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>by Aashish Nepal</span>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      {[
                        { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                        { name: 'GitHub', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z' },
                        { name: 'Discord', icon: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' },
                        { name: 'Telegram', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z' },
                        { name: 'Medium', icon: 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z' },
                      ].map((social) => (
                        <a
                          key={social.name}
                          href={`#${social.name.toLowerCase()}`}
                          className="group/social relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass border border-white/10 flex items-center justify-center hover:border-[var(--accent-gold)]/40 transition-all duration-300"
                          aria-label={social.name}
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-yellow-400 rounded-lg sm:rounded-xl opacity-0 group-hover/social:opacity-20 blur transition-opacity duration-300"></div>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover/social:text-[var(--accent-gold)] transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d={social.icon} />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main >

      {/* Floating Scroll to Top Button */}
      < FloatingScrollTop />
    </div >
  )
}
