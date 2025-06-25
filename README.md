# Standard Notes - Enable Browser Back to Previous View ⏪

## 📌 Overview

This userscript makes the **browser back button** work intuitively in the **Standard Notes web app**.  
Instead of closing the tab, pressing "Back" will now return to the previous screen within the app—such as note editing, tags, search, or settings.

- 📱 Works with mobile back gestures and buttons  
- 🔄 Supports transitions from notes, tags, search, and settings  
- 🧠 Fully compatible with SPA behavior and dynamic content changes  

---

## ⚙️ How to Install

1. Install **[Violentmonkey](https://violentmonkey.github.io/)** or **[Tampermonkey](https://www.tampermonkey.net/)** in your browser  
2. Install the userscript from the following link:  
   👉 [Install standardnotes-mobile-back-fix.user.js](https://raw.githubusercontent.com/koyasi777/standardnotes-mobile-back-fix/main/standardnotes-mobile-back-fix.user.js)

---

## 💡 Features

- Detects when a "Go back" view is active, and adds a custom `history.pushState`  
- Intercepts browser's back (`popstate`) to simulate in-app navigation  
- Locates the app's own back button using `aria-label="Go to items list"`  
- Uses `MutationObserver` to monitor DOM changes for consistent behavior in SPA

---

## 🔗 Useful Links

- [Standard Notes](https://standardnotes.com/)
- [Standard Notes Web App](https://app.standardnotes.com/)
- [Violentmonkey](https://violentmonkey.github.io/)
- [Tampermonkey](https://www.tampermonkey.net/)

---

## 📜 License

MIT License  
Free to use, modify, and redistribute—use at your own risk.

---

> Make navigation in Standard Notes feel natural—go back without leaving the app.
