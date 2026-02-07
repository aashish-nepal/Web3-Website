// Wallet Extension Error Suppressor
// This script suppresses harmless console errors from wallet browser extensions
// Place in public folder to load before any other scripts

(function () {
    'use strict';

    if (typeof window === 'undefined') return;

    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;

    // Patterns to suppress
    const errorPatterns = [
        'chrome.runtime.sendMessage',
        'chrome-extension',
        'Extension ID',
        'inpage.js',
        'opfgelmcmbiajamepnmloijbpoleiama', // Rainbow
        'nkbihfbeogaeaoehlefnkodbefgpgknn', // MetaMask
        'bfnaelmomeimhlpmgjnjophhpkkoljpa', // Phantom
        'must specify an Extension ID',
        'runtime.sendMessage'
    ];

    // Override console.error
    console.error = function () {
        const args = Array.prototype.slice.call(arguments);
        const errorString = args.join(' ');

        // Check if should suppress
        for (let i = 0; i < errorPatterns.length; i++) {
            if (errorString.indexOf(errorPatterns[i]) !== -1) {
                return; // Suppress
            }
        }

        // Log legitimate errors
        originalError.apply(console, args);
    };

    // Override console.warn
    console.warn = function () {
        const args = Array.prototype.slice.call(arguments);
        const warnString = args.join(' ');

        // Suppress wallet-related warnings
        if (warnString.indexOf('wallet') !== -1 ||
            warnString.indexOf('extension') !== -1 ||
            warnString.indexOf('provider') !== -1) {
            return;
        }

        originalWarn.apply(console, args);
    };

    // Suppress window errors
    const originalOnError = window.onerror;
    window.onerror = function (message, source, lineno, colno, error) {
        const msg = String(message);

        // Suppress extension errors
        if (msg.indexOf('chrome.runtime') !== -1 ||
            msg.indexOf('Extension ID') !== -1 ||
            msg.indexOf('chrome-extension') !== -1) {
            return true;
        }

        if (originalOnError) {
            return originalOnError(message, source, lineno, colno, error);
        }
        return false;
    };

    // Mark as loaded
    window.__walletErrorSuppressorLoaded = true;

})();
