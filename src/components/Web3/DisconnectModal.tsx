'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, AlertCircle } from 'lucide-react'

interface DisconnectModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    walletAddress?: string
}

export function DisconnectModal({ isOpen, onClose, onConfirm, walletAddress }: DisconnectModalProps) {
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
                        <div
                            className="glass-strong rounded-2xl p-6 shadow-2xl border border-white/10 mx-4"
                            style={{
                                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(138, 43, 226, 0.05) 100%), rgba(0, 0, 0, 0.7)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Disconnect Wallet</h3>
                                        <p className="text-xs text-white/60 mt-0.5">Are you sure?</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-white/60" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="mb-6">
                                <p className="text-sm text-white/80 mb-3">
                                    You are about to disconnect your wallet from this application.
                                </p>

                                {walletAddress && (
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                        <p className="text-xs text-white/50 mb-1">Connected Address</p>
                                        <p className="text-sm font-mono text-white/90">
                                            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                    <p className="text-xs text-orange-300/90">
                                        ⚠️ You will need to reconnect to access Web3 features
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 rounded-xl glass hover:glass-strong transition-all border border-white/10 hover:border-white/20 text-sm font-medium text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm()
                                        onClose()
                                    }}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all text-sm font-medium text-white flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
