// content/platform_adapter.js

const PLATFORMS = {
    LEETCODE: {
        host: "leetcode.com",
        getEditor: () => document.querySelector('.view-lines') || document.querySelector('.monaco-editor'),
        getSubmitBtn: () => document.querySelector('[data-e2e-locator="console-submit-button"]') || Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.toLowerCase().includes('submit'))
    },
    CODEFORCES: {
        host: "codeforces.com",
        getEditor: () => document.querySelector('#sourceCodeTextarea') || document.querySelector('.ace_content'),
        getSubmitBtn: () => document.querySelector('#submit') || document.querySelector('input[value="Submit"]') || document.querySelector('#submitSolution')
    },
    HACKERRANK: {
        host: "hackerrank.com",
        getEditor: () => document.querySelector('.CodeMirror'),
        getSubmitBtn: () => document.querySelector('.ui-btn-primary.pull-right') || Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.toLowerCase().includes('submit code'))
    },
    GEEKSFORGEEKS: {
        host: "geeksforgeeks.org",
        getEditor: () => document.querySelector('.ace_content') || document.querySelector('.CodeMirror'),
        getSubmitBtn: () => document.querySelector('.problem-tab__submit-btn') || Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.toLowerCase() === 'submit')
    },
    CODECHEF: {
        host: "codechef.com",
        getEditor: () => document.querySelector('.ace_content') || document.querySelector('#ide-editor'),
        getSubmitBtn: () => document.querySelector('#submit-btn') || Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.toLowerCase() === 'submit')
    },
    ATCODER: {
        host: "atcoder.jp",
        getEditor: () => document.querySelector('.CodeMirror') || document.querySelector('#sourceCode'),
        getSubmitBtn: () => document.querySelector('#submit')
    }
};

function getCurrentPlatform() {
    const hostname = window.location.hostname;
    for (const key in PLATFORMS) {
        if (hostname.includes(PLATFORMS[key].host)) {
            return PLATFORMS[key];
        }
    }
    return null;
}

function getFinalCode(platform) {
    try {
        const editor = platform.getEditor();
        if (!editor) return "";
        
        // Extract hidden textarea values commonly used by Monaco/CodeMirror/Ace
        const hiddenTextarea = document.querySelector('textarea.inputarea, .CodeMirror textarea, .ace_text-input, textarea#sourceCodeTextarea, textarea#sourceCode');
        if (hiddenTextarea && hiddenTextarea.value) {
            return hiddenTextarea.value;
        }
        
        // Extract visually rendered lines
        let code = "";
        const lines = editor.querySelectorAll('.view-line, .CodeMirror-line, .ace_line');
        if (lines.length > 0) {
            lines.forEach(line => {
                code += line.textContent + '\n';
            });
            return code;
        }

        return editor.innerText || editor.textContent || "";
    } catch (e) {
        return "";
    }
}

function setupSubmitInterception(platform, onSubmitCallback) {
    const observer = new MutationObserver(() => {
        try {
            const btn = platform.getSubmitBtn();
            if (btn && !btn.hasAttribute('data-ekagrah-attached')) {
                btn.setAttribute('data-ekagrah-attached', 'true');
                
                // standard click
                btn.addEventListener('click', () => {
                    onSubmitCallback(getFinalCode(platform));
                });
                
                // form submit
                const form = btn.closest('form');
                if (form && !form.hasAttribute('data-ekagrah-attached')) {
                    form.setAttribute('data-ekagrah-attached', 'true');
                    form.addEventListener('submit', () => {
                        onSubmitCallback(getFinalCode(platform));
                    });
                }
            }
        } catch(e) {}
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}
