'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Download } from 'lucide-react'
import { ReactNode } from 'react'

interface WalletInstallModalProps {
    isOpen: boolean
    onClose: () => void
    walletName: string
    walletIcon: ReactNode
    installUrl: string
}

/**
 * Professional modal for prompting wallet installation
 */
export function WalletInstallModal({
    isOpen,
    onClose,
    walletName,
    walletIcon,
    installUrl
}: WalletInstallModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101]"
                    >
                        <div className="glass-strong rounded-2xl border border-white/10 shadow-2xl p-6 mx-4">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        {walletIcon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            {walletName} Not Detected
                                        </h3>
                                        <p className="text-sm text-white/60 mt-1">
                                            Install to connect
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 mb-6">
                                <div className="glass rounded-xl p-4 border border-white/5">
                                    <div className="flex items-start gap-3">
                                        <Download className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-white mb-1">
                                                Install {walletName}
                                            </h4>
                                            <p className="text-sm text-white/70">
                                                You'll need to install the {walletName} browser extension to connect your wallet.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-4 border border-white/5">
                                    <div className="flex items-start gap-3">
                                        <ExternalLink className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-white mb-1">
                                                After Installation
                                            </h4>
                                            <p className="text-sm text-white/70">
                                                Once installed, refresh this page and {walletName} will appear in your wallet options.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 rounded-xl glass hover:glass-strong transition-all border border-white/10"
                                >
                                    <span className="font-medium">Cancel</span>
                                </button>
                                <a
                                    href={installUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-medium hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Install Extension</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
