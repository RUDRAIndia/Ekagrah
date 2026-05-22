// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleInput = document.getElementById('power-toggle');
    const toggleStatusText = document.getElementById('toggle-status-text');
    const sessionBadge = document.getElementById('session-badge');
    const badgeIcon = sessionBadge.querySelector('.badge-icon');
    const badgeText = sessionBadge.querySelector('.badge-text');

    // Load initial state
    chrome.storage.local.get(['ekagrah_enabled', 'session_flagged'], (data) => {
        const isEnabled = data.ekagrah_enabled !== false; // default true
        const isFlagged = data.session_flagged === true;
        
        toggleInput.checked = isEnabled;
        updateUI(isEnabled, isFlagged);
    });

    // Handle toggle switch changes
    toggleInput.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        chrome.storage.local.set({ ekagrah_enabled: isEnabled });
        
        chrome.storage.local.get(['session_flagged'], (data) => {
            updateUI(isEnabled, data.session_flagged);
        });
    });

    // Listen for state changes (e.g., when content script flags a session)
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local') {
            chrome.storage.local.get(['ekagrah_enabled', 'session_flagged'], (data) => {
                updateUI(data.ekagrah_enabled, data.session_flagged);
            });
        }
    });

    function updateUI(isEnabled, isFlagged) {
        if (isEnabled) {
            toggleStatusText.textContent = "Ekagrah is ON";
            
            if (isFlagged) {
                sessionBadge.className = 'session-badge flagged';
                badgeIcon.textContent = '⚠️';
                badgeText.textContent = 'Flag Detected';
            } else {
                sessionBadge.className = 'session-badge';
                badgeIcon.textContent = '✅';
                badgeText.textContent = 'Session Clean';
            }
        } else {
            toggleStatusText.textContent = "Ekagrah is OFF";
            sessionBadge.className = 'session-badge disabled';
            badgeIcon.textContent = '⏸️';
            badgeText.textContent = 'Monitoring Paused';
        }
    }
});
