// background.js

// Initialize default state on install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        ekagrah_enabled: true,
        session_flagged: false
    });
});

// Update icon based on state
function updateIcon() {
    chrome.storage.local.get(['ekagrah_enabled', 'session_flagged'], (data) => {
        if (!data.ekagrah_enabled) {
            // Disabled icon (using the canvas approach to grey out, but for simplicity, 
            // since we generated green and red, we will dynamically grey out the green one or just use red/green)
            // Actually, we can just use setIcon with a dynamically generated gray icon using canvas in background worker (Offscreen document not strictly needed for basic icons, we can use ImageData).
            // Let's create an ImageData for gray icon if disabled, or use green/red if enabled.
            // Wait, standard icons are 16, 48, 128.
            setGrayIcon();
        } else if (data.session_flagged) {
            chrome.action.setIcon({
                path: {
                    "16": "icons/icon16_red.png",
                    "48": "icons/icon48_red.png",
                    "128": "icons/icon128_red.png"
                }
            });
        } else {
            chrome.action.setIcon({
                path: {
                    "16": "icons/icon16.png",
                    "48": "icons/icon48.png",
                    "128": "icons/icon128.png"
                }
            });
        }
    });
}

function setGrayIcon() {
    // Generate gray icon programmatically for the "Disabled" state
    const canvas = new OffscreenCanvas(16, 16);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#95a5a6';
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(8, 8, 4, 0, Math.PI * 2);
    ctx.fill();
    
    const imageData16 = ctx.getImageData(0, 0, 16, 16);
    
    chrome.action.setIcon({
        imageData: {
            "16": imageData16
        }
    });
}

// Listen for storage changes to instantly update icon
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && (changes.ekagrah_enabled || changes.session_flagged)) {
        updateIcon();
    }
});

// Reset session flag when navigating to a new page or reloading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        chrome.storage.local.set({ session_flagged: false });
    }
});

// Run initially
updateIcon();
