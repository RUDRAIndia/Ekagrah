// content/content.js

const DEBUG = false;

function log(...args) {
    if (DEBUG) console.log("[Ekagrah]", ...args);
}

function getRandomMessage(arr) {
    if (!arr || arr.length === 0) return "AI Code Detected.";
    return arr[Math.floor(Math.random() * arr.length)];
}

async function init() {
    try {
        const storage = await chrome.storage.local.get(['ekagrah_enabled']);
        if (storage.ekagrah_enabled === false) {
            log("Extension is disabled.");
            return;
        }

        const platform = getCurrentPlatform();
        if (!platform) {
            log("Platform not recognized.");
            return;
        }

        log(`Running on platform: ${platform.host}`);

        const layer1 = new Layer1Behavioral();
        layer1.attachListeners(platform);

        const layer2 = new Layer2Classifier();

        // Listen for Layer 1 flags
        document.addEventListener('ekagrah_flag', (e) => {
            const detail = e.detail;
            log("FLAGGED:", detail.reason);
            const roast = getRandomMessage(typeof ROAST_MESSAGES !== 'undefined' ? ROAST_MESSAGES : ["Layer 1 caught you!"]);
            NotificationSystem.showPopup(true, `${detail.reason}\n\n${roast}`);
        });

        // Intercept submission
        setupSubmitInterception(platform, (finalCode) => {
            log("Submit intercepted. Checking Layer 1...");
            
            // Check submission time
            layer1.checkSubmissionTime();

            if (layer1.isFlagged) {
                log("Layer 1 already flagged. Skipping Layer 2.");
                const roast = getRandomMessage(typeof ROAST_MESSAGES !== 'undefined' ? ROAST_MESSAGES : ["Layer 1 caught you!"]);
                NotificationSystem.showPopup(true, `${layer1.flagReason}\n\n${roast}`);
                return;
            }

            log("Layer 1 passed. Running Layer 2...");
            const result = layer2.analyzeCode(finalCode, layer1.keystrokesLog, layer1.backspaceCount);
            
            if (result.flagged) {
                log(`Layer 2 FLAGGED with score ${result.score}`);
                chrome.storage.local.set({ session_flagged: true });
                const roast = getRandomMessage(typeof ROAST_MESSAGES !== 'undefined' ? ROAST_MESSAGES : ["Layer 2 caught you!"]);
                NotificationSystem.showPopup(true, `Layer 2 caught you — Your code screams AI 🤖\n\n${roast}`);
            } else {
                log("Layer 2 PASSED. Genuine code.");
                const praise = getRandomMessage(typeof PRAISE_MESSAGES !== 'undefined' ? PRAISE_MESSAGES : ["Genuine code!"]);
                NotificationSystem.showPopup(false, praise);
            }
        });
    } catch (e) {
        log("Initialization error:", e);
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
