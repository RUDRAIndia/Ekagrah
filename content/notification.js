// content/notification.js

class NotificationSystem {
    static showPopup(isRoast, message) {
        try {
            const existing = document.getElementById('ekagrah-popup');
            if (existing) existing.remove();

            const popup = document.createElement('div');
            popup.id = 'ekagrah-popup';
            
            // Get user's preferred theme color or fallback to navy
            const themeColor = '#1a1a2e'; // Fallback
            const bgColor = isRoast ? 'rgba(231, 76, 60, 0.95)' : 'rgba(46, 204, 113, 0.95)';

            Object.assign(popup.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '420px',
                backgroundColor: bgColor,
                backdropFilter: 'blur(12px)',
                color: 'white',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                zIndex: '999999',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'center',
                animation: 'ekagrahBounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                border: '1px solid rgba(255,255,255,0.1)'
            });

            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '✕';
            Object.assign(closeBtn.style, {
                position: 'absolute',
                top: '15px',
                right: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '20px',
                opacity: '0.8',
                transition: 'opacity 0.2s'
            });
            closeBtn.onmouseenter = () => closeBtn.style.opacity = '1';
            closeBtn.onmouseleave = () => closeBtn.style.opacity = '0.8';
            closeBtn.onclick = () => {
                popup.style.opacity = '0';
                popup.style.transition = 'opacity 0.3s ease';
                setTimeout(() => popup.remove(), 300);
            };

            const title = document.createElement('h2');
            title.innerText = isRoast ? '⚠️ AI DETECTED' : '✅ GENUINE CODE';
            title.style.marginTop = '0';
            title.style.fontSize = '24px';
            title.style.fontWeight = '800';
            title.style.letterSpacing = '1px';

            const body = document.createElement('p');
            body.innerText = message;
            body.style.fontSize = '17px';
            body.style.lineHeight = '1.6';
            body.style.fontWeight = '500';

            popup.appendChild(closeBtn);
            popup.appendChild(title);
            popup.appendChild(body);

            document.body.appendChild(popup);

            if (!document.getElementById('ekagrah-styles')) {
                const style = document.createElement('style');
                style.id = 'ekagrah-styles';
                style.innerHTML = `
                    @keyframes ekagrahBounceIn {
                        0% { top: 40%; opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                        100% { top: 50%; opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    }
                `;
                document.head.appendChild(style);
            }

            // Auto dismiss after 40 seconds
            setTimeout(() => {
                if (document.body.contains(popup)) {
                    popup.style.opacity = '0';
                    popup.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => popup.remove(), 500);
                }
            }, 40000);
        } catch (e) {}
    }
}
