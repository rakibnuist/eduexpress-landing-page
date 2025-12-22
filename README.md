# 🎓 EduExpress International Landing Page

![Project Status](https://img.shields.io/badge/Status-Live-green)
![License](https://img.shields.io/badge/License-Proprietary-blue)

A high-conversion landing page for **EduExpress International**, a study abroad consultancy specializing in Malaysia and Estonia work-study programs. Designed with a mobile-first approach, this project focuses on lead generation, speed, and user trust.

🌐 **Live Site:** [https://www.eduexpress.info/](https://www.eduexpress.info/)

---

## 🚀 Key Features

*   **Conversion Optimization:**
    *   "Check Eligibility" CTAs driven by behavioral psychology.
    *   Strategic "No IELTS" & "Payment After Visa" hooks.
    *   Sticky mobile bottom bar for high-speed contact (WhatsApp/Call).
*   **Tech Stack:**
    *   **HTML5 / Vanilla JS**: Lightweight and zero-bloat for maximum load speed.
    *   **Tailwind CSS**: Modern, responsive styling with a custom design system.
    *   **Vercel**: Edge network deployment for global performance.
*   **Tracking & Analytics:**
    *   **Meta Pixel (Facebook)**: Advanced event tracking including `ViewContent` (Deep Scroll) and `CompleteRegistration`.
    *   **Google Analytics 4**: Integrated for traffic analysis.

## 📂 Project Structure

```
EduExpress-Landing-Page/
├── index.html          # Main application structure (SEO Optimized)
├── styles.css          # Custom overrides and animations
├── script.js           # Form handling, validation, and Pixel logic
├── favicon.ico         # Brand asset
├── META_MARKETING_GUIDE.md # Comprehensive ad strategy for this page
└── README.md           # Documentation
```

## 🛠️ Setup & Development

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/eduexpress-landing.git
    cd eduexpress-landing
    ```

2.  **Install Dependencies (Optional for Tailwind):**
    *   *Note: This project currently uses Tailwind via CDN for simplicity. For production builds, a build step is recommended.*

3.  **Run Locally:**
    Using Vercel CLI:
    ```bash
    vercel dev
    ```
    Or simply open `index.html` in your browser.

## 📊 Marketing Events implemented

| Event Name | Trigger | Purpose |
| :--- | :--- | :--- |
| **ViewContent** | Scroll Depth > 20% | Identifies interested users who read content. |
| **CompleteRegistration** | Form Submit | Primary conversion event (Lead generated). |

## 📝 Author

**EduExpress Tech Team**
*Focusing on Student Success in Europe & Asia.*

---
*© 2025 EduExpress International. All Rights Reserved.*
