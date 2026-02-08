'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useEffect } from 'react'

interface DisconnectToastProps {
    isVisible: boolean
    onClose: () => void
    duration?: number
}

export function DisconnectToast({
    isVisible,
    onClose,
    duration = 4000
}: DisconnectToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [isVisible, duration, onClose])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="fixed bottom-6 right-6 z-[200]"
                >
                    <div
                        className="relative rounded-xl p-4 shadow-2xl border border-emerald-500/30 min-w-[340px] max-w-md overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%), rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(24px)',
                        }}
                    >
                        {/* Animated border glow */}
                        <div className="absolute inset-0 rounded-xl opacity-50">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 animate-pulse" />
                        </div>

                        <div className="relative flex items-start gap-3">
                            {/* Success Icon with animation */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                                className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/30 flex items-center justify-center flex-shrink-0 relative"
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-md" />
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 relative z-10" strokeWidth={2.5} />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-0.5">
                                <motion.h4
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="text-sm font-bold text-white mb-1"
                                >
                                    Wallet Disconnected
                                </motion.h4>
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xs text-emerald-100/80 leading-relaxed"
                                >
                                    Your wallet has been disconnected successfully
                                </motion.p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-all flex-shrink-0 group"
                                aria-label="Close notification"
                            >
                                <X className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Animated Progress Bar */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 rounded-b-xl"
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: duration / 1000, ease: 'linear' }}
                            style={{
                                boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
                            }}
                        />

                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 rounded-xl"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
