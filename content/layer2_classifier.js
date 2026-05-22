// content/layer2_classifier.js

class Layer2Classifier {
    constructor() {
        this.AI_VARS = ['left', 'right', 'mid', 'result', 'count', 'curr', 'prev', 'ans', 'idx', 'res', 'start', 'end'];
        this.BOILERPLATES = [
            /Time:\s*O\(/i,
            /Space:\s*O\(/i,
            /Time Complexity/i,
            /Space Complexity/i
        ];
    }

    analyzeCode(code, keystrokeLog, backspaceCount) {
        let score = 0;
        
        if (!code || code.trim().length === 0) {
            return { flagged: false, score: 0 };
        }

        // 1. Consistent Camel/Snake Case check
        const hasCamel = /[a-z]+[A-Z][a-z]+/.test(code);
        const hasSnake = /[a-z]+_[a-z]+/.test(code);
        if ((hasCamel && !hasSnake) || (!hasCamel && hasSnake)) {
            score += 1; // High consistency
        }

        // 2. Zero typos or mid-word corrections
        if (keystrokeLog.length > 50 && backspaceCount < keystrokeLog.length * 0.02) {
            score += 1; // Very few mistakes
        }

        // 3. Perfect variable naming
        let varMatches = 0;
        for (const v of this.AI_VARS) {
            const regex = new RegExp(`\\b${v}\\b`, 'g');
            const matches = code.match(regex);
            if (matches) varMatches += matches.length;
        }
        if (varMatches >= 3) score += 1;

        // 4. Over-commenting
        const lines = code.split('\n');
        let commentLines = 0;
        lines.forEach(l => {
            if (l.trim().startsWith('//') || l.trim().startsWith('#')) commentLines++;
        });
        if (lines.length > 10 && (commentLines / lines.length) > 0.4) score += 1;

        // 5. No dead code
        let hasDeadCode = false;
        lines.forEach(l => {
            const trim = l.trim();
            if ((trim.startsWith('//') || trim.startsWith('#')) && (trim.includes('=') || trim.includes('{') || trim.includes(';'))) {
                hasDeadCode = true;
            }
        });
        if (!hasDeadCode && commentLines > 0) score += 1;

        // 6. Perfect indentation
        const indents = lines.map(l => {
            const match = l.match(/^\s*/);
            return match ? match[0].length : 0;
        }).filter(len => len > 0);
        
        if (indents.length > 5) {
            const allPerfect = indents.every(len => len % 2 === 0);
            if (allPerfect) score += 1;
        }

        // 7. Boilerplate header comments
        for (const bp of this.BOILERPLATES) {
            if (bp.test(code)) {
                score += 1;
                break;
            }
        }

        // 8. Complexity heuristic (Suspiciously optimal first-attempt)
        if (code.length > 600) score += 1;
        
        // 9. Continuous uninterrupted burst
        let maxGap = 0;
        for (let i = 1; i < keystrokeLog.length; i++) {
            const gap = keystrokeLog[i] - keystrokeLog[i-1];
            if (gap > maxGap) maxGap = gap;
        }
        if (keystrokeLog.length > 100 && maxGap < 3000) score += 1;

        return { flagged: score >= 4, score };
    }
}
