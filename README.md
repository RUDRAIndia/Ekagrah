# Ekagrah 👁️

**Ekagrah** is a production-ready Chrome Extension designed to detect AI-generated and copy-pasted code on popular competitive programming platforms.

## What is Ekagrah?
Ekagrah acts as a strict invigilator inside your browser. Whether you are a student, educator, or developer striving for genuine practice, Ekagrah ensures that the code submitted was actually typed by a human, without reliance on AI tools like ChatGPT, Claude, Gemini, or GitHub Copilot.

## How it works
Ekagrah uses a powerful, offline **Two-Layer Detection System**:

1. **Layer 1 (Behavioral Analysis):** Runs in real-time while you code. It catches Ctrl+V paste events, tracks inhuman typing speeds (> 200 WPM), detects sudden bulk text insertions, and monitors "Time-to-full-solution". If you cheat here, you get flagged immediately.
2. **Layer 2 (AI Style Heuristic Classifier):** Runs upon hitting "Submit". It analyzes the final code for AI patterns, including perfect variable naming (`left`, `right`, `result`), perfect camelCase/snake_case consistency, over-commenting, absence of typos in history, textbook indentation, and boilerplate headers like `// Time: O(n)`.

If Ekagrah catches you using AI, you get a savage Roast popup. If you code genuinely, you get hyped up with a Praise popup!

## Supported Platforms
Ekagrah automatically injects into the following platforms:
- LeetCode
- Codeforces
- HackerRank
- GeeksForGeeks
- CodeChef
- AtCoder

## How to Install from GitHub
1. Go to the GitHub repository for Ekagrah.
2. Click the green **Code** button and select **Download ZIP**.
3. Unzip the downloaded file on your computer to a folder (e.g., `Ekagrah`).
4. Open Google Chrome (or Edge/Brave) and go to `chrome://extensions/`.
5. Enable the **Developer Mode** toggle in the top right corner.
6. Click the **Load unpacked** button.
7. Select the unzipped `Ekagrah` folder.
8. The extension is now active! Visit any supported platform to see it in action.

## How to use toggle
Click on the Ekagrah icon in your browser toolbar to open the popup interface. You will see a large ON/OFF switch. You can disable Ekagrah temporarily if needed, and the icon will turn grey to reflect that monitoring is paused. The interface will also show if your current session is "Clean" (Green ✅) or "Flagged" (Red ⚠️).

## Contributing
Pull requests are welcome! If you want to add a new competitive programming platform to `platform_adapter.js`, or introduce new AI-detection heuristics in Layer 2, feel free to open a PR.

---
*Built for genuine learning.* 🧠
