# 🌐 TeleConnect - Modern Telecommunication Company Website

> **Tagline:** *"Connecting People, Empowering Futures."*  
> **Built with:** Semantic HTML5, Modern CSS3, and Pure Vanilla JavaScript (ES6+).  
> **Zero External Frameworks or Libraries:** No React, Vue, Angular, Bootstrap, Tailwind, or jQuery.

---

## 📖 1. Project Overview

**TeleConnect** is a fully responsive, enterprise-grade telecommunication web portal engineered from the ground up for a fictional next-generation mobile carrier. The application replicates the real-world digital experience of major telecom operators, including mobile network services, 5G internet data bundles, call & SMS packages, a customer self-care dashboard, and an interactive balance recharge simulator.

This project was built specifically as a **deep JavaScript learning and portfolio project**. It demonstrates clean modular architecture, reactive frontend state management, local storage synchronization, regex form validation, accessible modal dialogs, dynamic DOM manipulation, and interactive animations using modern web standards.

---

## ✨ 2. Key Features

### 🎨 Visual & UI/UX Design
- **Modern Telecom Aesthetic:** Deep Navy Blue (`#0B192C`), Electric Blue (`#0066FF`), and Vibrant Neon Cyan (`#00D2FF`) with crisp gradients, soft shadows, and clean typography.
- **Glassmorphism & Depth:** Backdrop blur surfaces (`backdrop-filter: blur(14px)`), subtle borders, floating stat badges, and interactive hover transformations.
- **Dark and Light Mode:** Real-time theme toggle persisted via `localStorage` with smooth color transitions across all components.
- **Mobile Responsive Navigation:** Slide-out drawer navigation for tablet and mobile devices with backdrop dismiss and hamburger state animation.
- **Scroll Progress & Back-to-Top:** Circular SVG ring indicator reflecting page scroll depth with smooth jump to top.
- **Animated Counter Statistics:** Number counters that dynamically count up when scrolled into view using the `IntersectionObserver` API.

### 📶 Internet & Voice Packages
- **Dynamic Catalog Rendering:** Packages are stored in JavaScript arrays of objects and dynamically rendered via template literals.
- **Multi-Category Filtering:** Filter packages across categories (All, Weekly, Monthly, Unlimited, Gaming Add-ons).
- **Live Search with Debounce:** Real-time search bar instantly matches package name, data allowance, price, and feature descriptions.
- **Sorting Options:** Sort plans by price (low to high, high to low), data allowance, or featured priority.
- **Package Details Modal:** Displays full terms, fair usage guidelines, speed ratings, and official USSD dial codes (e.g., `*115*2#`).
- **Subscription Simulation with Balance Check:** Checks customer's live wallet balance before allowing subscription. If balance is insufficient, alerts the user with the exact deficit and navigates to the recharge section. If balance is sufficient, deducts funds, updates active plan, logs the transaction, and updates the dashboard.

### 📞 Call & SMS Bundles
- Categorized tab switcher for Daily, Weekly, Monthly, and Bulk SMS packs.
- Displays On-Net minutes, Off-Net minutes, SMS allowance, data bonuses, and direct USSD codes.
- One-click package activation updating the customer's call minute and SMS usage meters.

### 📊 Customer Self-Care Dashboard
- **Digital Smart SIM Card:** Displays registered phone number, subscriber name, and network tier badge.
- **Editable Phone Number:** Modal allowing users to customize their simulated registered number.
- **Real-Time Animated Usage Meters:** Visual progress bars displaying remaining Data (GB), Voice Minutes, and SMS with percentage indicators.
- **Active Subscription Status:** Current plan summary, validity counter, and auto-renewal toggle switch.
- **Transaction & Subscription History Table:** Filterable table displaying transaction ID, activity description, payment gateway, date, amount (+PKR for recharges, -PKR for plans), and status badge.
- **Reset Demo Data Button:** One-click option to restore initial dummy values for testing.

### 💳 Interactive Recharge Simulator
- **Live Phone Number Validation:** Real-time regex verification for mobile number formats.
- **Quick Amount Presets & Custom Input:** Preset buttons (PKR 200, 500, 1000, 2000, 3500, 5000) or custom input with bounds checking.
- **Payment Method Selection:** Debit/Credit Card, Mobile Wallet (JazzCash / Easypaisa), and Scratch Card voucher.
- **Real-Time Tax Calculation:** Automatic computation of 15% telecom withholding tax and net credited balance.
- **Confirmation Modal:** Summarizes transaction details before processing.
- **Simulated Payment Gateway:** Realistic 1.2-second spinner simulation followed by immediate balance crediting and celebratory toast.

### ⚡ 5G Network Speed Benchmark Simulator
- Interactive widget simulating download speed (up to 1,450 Mbps), latency (3-5 ms), jitter, and upload throughput.

### 📩 Contact, Support & Newsletter
- Complete contact form with real-time error messaging on blur and submission.
- Generates simulated support ticket IDs (e.g., `#TC-82914`).
- Newsletter form with email format validation.
- Interactive FAQ accordion with accessible ARIA tags.

---

## 🛠️ 3. Technologies Used

- **HTML5:** Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), ARIA attributes, SVG graphics.
- **CSS3:** CSS Custom Properties (Variables), Flexbox, CSS Grid, Media Queries, Keyframe Animations, Glassmorphism, Transitions.
- **Vanilla JavaScript (ES6+):** Arrow functions, template literals, destructuring, modules pattern, `const`/`let`, default parameters, Spread operator.
- **Web APIs:** `localStorage`, `IntersectionObserver`, `Intl.NumberFormat`, `requestAnimationFrame`, `setTimeout`/`setInterval`.
- **Icons & Typography:** Font Awesome 6 (CDN), Google Fonts (`Plus Jakarta Sans` & `Inter`).

---

## 📂 4. Project Folder Structure

```
teleconnect/
│
├── index.html              # Main HTML5 application markup
├── style.css               # Complete stylesheet (themes, layout, animations)
├── script.js               # Core JavaScript engine & application logic
│
├── assets/                 # Static vector assets
│   ├── images/
│   │   ├── hero-network.svg  # Creative 5G network illustration
│   │   └── sim-card.svg      # Smart digital SIM illustration
│   └── icons/
│       ├── telecom-logo.svg  # Horizontal brand logo
│       └── logo-icon.svg     # Favicon / standalone logo icon
│
└── README.md               # Technical documentation & learning guide
```

---

## 🚀 5. How to Run the Project

1. **Clone or Download** the project folder to your local machine.
2. No Node.js build step or package installations (`npm install`) are required!
3. Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari):
   - Double-click `index.html`, OR
   - Right-click `index.html` and choose **Open With > Google Chrome**, OR
   - Use VS Code's **Live Server** extension (`Right-click index.html > Open with Live Server`).
4. Interact with the website:
   - Try toggling between **Dark** and **Light** mode in the header.
   - Search for a plan like *"50"* or *"gaming"*, and filter by category.
   - Click **Subscribe Now** to test balance validation.
   - Go to **Recharge**, top up PKR 1,000, and watch your dashboard update instantly.
   - Click **Start Live Speed Test** to watch the animated 5G speedometer.

---

## 🧠 6. JavaScript Concepts Used

### A. DOM Manipulation
- `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()`: Element selection.
- `innerHTML` and `textContent`: Dynamic content rendering via template literals.
- `classList.add()`, `classList.remove()`, `classList.toggle()`: Dynamic state classes for modals, tabs, active navigation links, and theme switching.
- `setAttribute()` and `getAttribute()`: Managing accessibility attributes (`aria-expanded`, `data-id`, `data-category`).

### B. JavaScript Events & Delegation
- `DOMContentLoaded`: Safe script execution after DOM tree preparation.
- `click`: Buttons, tabs, modal controls, accordions.
- `input`: Real-time phone validation, live debounced package search, dynamic tax calculation.
- `change`: Dropdown sorting, auto-renewal switch toggle.
- `submit`: Forms with `event.preventDefault()` to prevent default page reloads.
- `scroll`: Dynamic sticky header, scroll-to-top progress ring, active navigation spy.

### C. Advanced Array Methods
1. **`map()`**: Transforms catalog arrays into HTML strings:
   ```javascript
   const cardsHTML = packages.map(pkg => `...`).join('');
   ```
2. **`filter()`**: Filters packages by category and search keyword:
   ```javascript
   const filtered = INTERNET_PACKAGES.filter(pkg => pkg.category === category);
   ```
3. **`find()`**: Retrieves a specific object by its unique ID:
   ```javascript
   const selected = INTERNET_PACKAGES.find(pkg => pkg.id === packageId);
   ```
4. **`some()`**: Checks if any feature item matches search keywords:
   ```javascript
   const matches = pkg.features.some(f => f.toLowerCase().includes(query));
   ```
5. **`sort()`**: Sorts plans by numerical price or data capacity:
   ```javascript
   filtered.sort((a, b) => a.price - b.price);
   ```
6. **`forEach()`**: Iterates over NodeLists to bind event listeners cleanly.

### D. Regular Expressions (RegEx)
- **Phone Validation:** Matches Pakistani formats (`0300 1234567`, `03001234567`, `+92 300 1234567`):
  ```javascript
  const pakistaniPhoneRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
  ```
- **Email Validation:** Matches standard email format:
  ```javascript
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  ```

---

## ⚙️ 7. Explanation of Important Functions

| Function Name | Description & Purpose |
|---|---|
| `initTeleConnectApp()` | Central entry point. Initializes theme, loads state, renders all catalogs, and registers event listeners. |
| `renderInternetPackages(packages)` | Generates responsive package cards from array data and attaches event handlers. |
| `filterAndSortPackages()` | Orchestrates category filtering, live keyword search, and price/data sorting. |
| `handleSubscribeInitiation(packageId)` | Validates customer balance against package price; alerts user if balance is insufficient or confirms purchase. |
| `executePackageSubscription(pkg)` | Deducts balance, updates active plan in customer state, prepends transaction, and syncs to `localStorage`. |
| `calculateRechargeBreakdown(gross)` | Computes 15% government withholding tax and net balance credit. |
| `processRechargePayment()` | Simulates gateway processing with loading spinner, credits balance, logs transaction, and fires toast. |
| `updateDashboardUI()` | Re-renders customer phone, name, balance counter, active plan, and usage meters (Data, Minutes, SMS). |
| `renderTransactions(filter)` | Dynamically populates the transaction history table based on the selected filter (All, Recharges, Subscriptions). |
| `showToast(title, msg, type)` | Appends an accessible auto-dismissing toast notification to the stack with smooth slide-in. |
| `initSpeedTestSimulator()` | Simulates realistic 5G speed test counter animation (Ping 4ms, Jitter 1ms, Speed up to 1,450 Mbps). |
| `initThemeEngine()` | Reads saved theme from `localStorage` and toggles between `light` and `dark` modes. |

---

## 💾 8. How LocalStorage Works in This Project

`localStorage` enables data to **persist across browser sessions and page reloads**. In TeleConnect, state is managed in memory via `AppState` and synchronized to storage whenever an update occurs:

1. **Storage Keys:**
   - `'teleconnect_theme'`: Saves `'light'` or `'dark'`.
   - `'teleconnect_customer_data'`: Stores the customer object (name, phone, balance, active plan, usage stats).
   - `'teleconnect_transactions_log'`: Stores an array of past recharge and subscription records.

2. **Loading State on Startup (`loadStateFromStorage`):**
   ```javascript
   const savedCustomer = localStorage.getItem(STORAGE_KEYS.CUSTOMER);
   AppState.customer = savedCustomer ? JSON.parse(savedCustomer) : { ...DEFAULT_CUSTOMER };
   ```

3. **Saving State on Change (`saveStateToStorage`):**
   ```javascript
   localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(AppState.customer));
   localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(AppState.transactions));
   ```

4. **Testing & Resetting:**
   Users can click the **"Reset Demo Data"** button on the dashboard at any time to clear `localStorage` and restore factory dummy records.

---

## 🎓 9. Learning Takeaways for Frontend Developers

- **Separation of Concerns:** Clean boundary between content (`index.html`), presentation (`style.css`), and business logic (`script.js`).
- **Single Source of Truth:** Centralized `AppState` object prevents UI de-synchronization.
- **Defensive Programming:** Input sanitization, bounds checking, and fallbacks for missing storage data.
- **Accessibility (a11y):** ARIA roles (`role="dialog"`, `role="tab"`, `role="alert"`), keyboard navigation (`Escape` key to close modals), and high-contrast color ratios.

---

## 📄 10. License

This project is created for **learning, education, and portfolio demonstration purposes**. Feel free to use, modify, and extend this codebase in your own learning journey!
