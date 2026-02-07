// Debug script to check WalletConnect modal visibility
(function () {
    if (typeof window === 'undefined') return;

    // Check for modal elements every second
    setInterval(() => {
        const modalSelectors = [
            'wcm-modal',
            'w3m-modal',
            'wc-modal',
            'walletconnect-modal',
            '[data-walletconnect-modal]',
            '.walletconnect-modal__base',
            '#walletconnect-wrapper',
            '#wcm-modal',
            '#w3m-modal'
        ];

        modalSelectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                console.log('🔍 Found WalletConnect modal:', {
                    selector,
                    element,
                    display: window.getComputedStyle(element).display,
                    visibility: window.getComputedStyle(element).visibility,
                    opacity: window.getComputedStyle(element).opacity,
                    zIndex: window.getComputedStyle(element).zIndex,
                    position: window.getComputedStyle(element).position
                });
            }
        });
    }, 1000);

    // Monitor DOM mutations for new modal elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    const tagName = node.tagName?.toLowerCase();
                    if (tagName && (tagName.includes('modal') || tagName.includes('wc') || tagName.includes('w3m'))) {
                        console.log('🆕 New modal element added:', {
                            tagName,
                            element: node,
                            display: window.getComputedStyle(node).display,
                            visibility: window.getComputedStyle(node).visibility,
                            zIndex: window.getComputedStyle(node).zIndex
                        });
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('🔍 WalletConnect debug script loaded');
})();
