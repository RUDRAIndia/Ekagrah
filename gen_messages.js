const fs = require('fs');

const roastTemplates = [
    "Bro really copy-pasted and thought we wouldn't notice {emoji} The audacity is REAL",
    "ChatGPT did your homework and you submitted it like it was yours {emoji} Shame.",
    "Layer 2 saw through your disguise. Your code is TOO clean. Humans make mistakes. You don't. {emoji}",
    "You typed {speed} words per minute. Are you a human or a printer? {emoji}",
    "This code has zero typos, perfect naming, and textbook structure. You wrote NOTHING. {emoji}",
    "Bro let the AI cook and served it as his own dish {emoji} Gordon Ramsay would be disgusted.",
    "Copilot practically wrote the whole thing for you. Do you even know what a variable is? {emoji}",
    "Claude is crying right now because you stole its code and called it yours {emoji}",
    "Not even hiding the 'Time: O(n)' header comment. Absolute legendary AI copy-paste. {emoji}",
    "Gemini wants its solution back bro {emoji} You ain't fooling anyone.",
    "Ah yes, perfect camelCase and zero debug prints. Truly a human marvel {emoji}",
    "You pasted that faster than the speed of light. Try actually typing next time. {emoji}",
    "Layer 1 caught you red-handed. We saw that Ctrl+V {emoji}",
    "Bro's WPM is off the charts. Straight up AI behavior {emoji}",
    "Even your variables are perfectly named. We know you didn't think of 'current_node' yourself {emoji}"
];

const roastEmojis = ["💀🤣", "😭🤖", "🕵️💀", "🖨️😂", "🤖✨💀", "👨‍🍳🤖😭", "🤦‍♂️🤡", "🤡💀", "💀🤡🤣", "🚨💀", "🚔🤡", "🧐🤖", "🗑️🤖", "👀💀", "🥶🤖"];

const praiseTemplates = [
    "YOU WROTE THAT YOURSELF?? ABSOLUTE BEAST {emoji} No AI, pure brain!",
    "Genuine code detected. You're the real deal {emoji} Keep grinding legend!",
    "Zero paste. Zero AI. 100% YOU. This is what it looks like to actually learn {emoji}",
    "Bro is out here solving problems with his own neurons {emoji} Respect earned!",
    "Clean behavioral score. Clean style score. You're built different {emoji}",
    "Typing every single character like a true gigachad {emoji} Massive W.",
    "No Copilot? No ChatGPT? Just raw human intellect. We love to see it {emoji}",
    "Your code isn't perfect, and that's what makes it beautiful. Real human effort {emoji}",
    "You didn't cheat. You actually learned today. Proud of you {emoji}",
    "Absolute unit. Writing algorithms from scratch like it's 2010 {emoji}",
    "The grind is real. The bugs are real. The success is REAL. {emoji}",
    "This is the way. Pure focus, zero shortcuts. Keep it up {emoji}",
    "Sweat, tears, and manual typing. The holy trinity of a real dev {emoji}",
    "Layer 2 couldn't find a single trace of AI. You're goated {emoji}",
    "Respect the hustle. Building those problem-solving muscles {emoji}"
];

const praiseEmojis = ["🔥🔥🔥", "💪⚡", "🧠🚀🔥", "🧠💥", "👑🔥✨", "🐐🔥", "💯🚀", "👏🔥", "🌟💪", "🏆⚡", "🏅🔥", "🙌🚀", "💎⚡", "🔥👑", "⚡💯"];

function generate(templates, emojis, count) {
    let result = [];
    let set = new Set();
    while (result.length < count) {
        let t = templates[Math.floor(Math.random() * templates.length)];
        let e = emojis[Math.floor(Math.random() * emojis.length)];
        let msg = t.replace('{emoji}', e);
        if (msg.includes('{speed}')) {
            msg = msg.replace('{speed}', Math.floor(Math.random() * 200 + 300));
        }
        if (!set.has(msg)) {
            set.add(msg);
            result.push(msg);
        }
    }
    return result;
}

const roasts = generate(roastTemplates, roastEmojis, 150);
const praises = generate(praiseTemplates, praiseEmojis, 150);

fs.writeFileSync('messages/roast_messages.js', 'const ROAST_MESSAGES = ' + JSON.stringify(roasts, null, 4) + ';\n');
fs.writeFileSync('messages/praise_messages.js', 'const PRAISE_MESSAGES = ' + JSON.stringify(praises, null, 4) + ';\n');

console.log("Messages generated successfully.");
