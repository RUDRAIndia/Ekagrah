// content/layer1_behavioral.js

class Layer1Behavioral {
    constructor() {
        this.isFlagged = false;
        this.flagReason = "";
        this.editorFocusTime = null;
        
        this.keystrokesLog = [];
        this.backspaceCount = 0;
        this.lastCharCount = 0;
    }

    attachListeners(platform) {
        // Track Paste
        document.addEventListener('paste', (e) => {
            try {
                const pastedData = (e.clipboardData || window.clipboardData).getData('text');
                if (pastedData && pastedData.trim().length > 0) {
                    this.flagSession("Layer 1 caught you — You pasted code 💀");
                }
            } catch(e) {}
        });

        // Track Keystrokes
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                this.backspaceCount++;
            }
            if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Tab') {
                this.editorFocusTime = this.editorFocusTime || Date.now();
                this.keystrokesLog.push(Date.now());
            }
        });

        // Periodic Analysis (Speed & Bulk)
        setInterval(() => {
            if (this.isFlagged) return;

            const now = Date.now();
            
            // Calculate recent sustained WPM
            const recentKeys = this.keystrokesLog.filter(t => now - t < 60000);
            if (recentKeys.length > 1000) { // > 200 WPM
                this.flagSession("Layer 1 caught you — Sustained speed > 200 WPM is inhuman 💀");
            }

            const currentCode = getFinalCode(platform);
            const currentLen = currentCode.length;

            if (this.lastCharCount > 0) {
                const diff = currentLen - this.lastCharCount;
                if (diff >= 50) {
                    // Check if bulk text appeared without corresponding keystrokes
                    const veryRecentStrokes = this.keystrokesLog.filter(t => now - t < 3000).length;
                    if (veryRecentStrokes < diff * 0.3) { 
                        this.flagSession("Layer 1 caught you — Bulk text appeared without typing 💀");
                    }
                }
            }
            this.lastCharCount = currentLen;
        }, 2000);
    }

    checkSubmissionTime() {
        if (!this.editorFocusTime) return true;
        const elapsedSec = (Date.now() - this.editorFocusTime) / 1000;
        if (elapsedSec < 10) {
            this.flagSession("Layer 1 caught you — Full solution submitted in under 10 seconds 💀");
            return false;
        }
        return true;
    }

    flagSession(reason) {
        if (this.isFlagged) return;
        this.isFlagged = true;
        this.flagReason = reason;
        
        chrome.storage.local.set({ session_flagged: true });
        
        const event = new CustomEvent('ekagrah_flag', { detail: { reason, layer: 1 } });
        document.dispatchEvent(event);
    }
}
