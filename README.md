
# WarpLink: Bend the Web

WarpLink is a modern, privacy-friendly URL shortener web app that lets you create short, powerful links with advanced features—all in your browser, with no backend required.

## Features

- **Shorten URLs:** Paste any long URL and instantly generate a short link.
- **Custom Aliases:** Choose a custom alias for your short link (optional).
- **Password Protection:** Secure your links with an optional password.
- **Expiration Dates:** Set an expiry date for your links; expired links show a status page.
- **QR Code Generation:** Instantly generate a QR code for your short link.
- **Advanced Analytics:** Track clicks, view stats like total clicks, average clicks per day, and more.
- **Link History:** See all your previously created links, with stats and management options.
- **Delete Links:** Remove unwanted links from your history.
- **Theme Toggle:** Switch between light and dark mode; your preference is saved.
- **Responsive Design:** Works beautifully on desktop and mobile.

## How It Works

- All data is stored locally in your browser (using `localStorage`).
- Short links use the browser's hash (e.g., `index.html#abc123`).
- Clicking a short link redirects to the original URL, increments click count, and checks for password/expiry.
- No server, no tracking, no ads—your data stays private.

## Usage

1. Open `index.html` in your browser.
2. Paste your long URL, set options (alias, password, expiry), and click **Warp Link**.
3. Copy your new short link or QR code.
4. Access your link history and stats below the form.

## Technologies Used

- HTML5, CSS3 (with Figtree font, modern gradients, and animations)
- JavaScript (ES6+, fully client-side)
- [Chart.js](https://www.chartjs.org/) for analytics charts
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) for QR code generation

## File Structure

- `index.html` — Main app UI
- `style.css` — Styles and responsive design
- `script.js` — App logic, link management, analytics, QR code, theme toggle

## Privacy & Security

- All data is stored locally; nothing is sent to any server.
- Passwords are checked client-side; links with passwords require entry before redirecting.
- Expired links show a status page and cannot be accessed.

## Screenshots



## License

This project is open source and free to use for personal and commercial projects.

---

**WarpLink** — Bend the web to your will. Create short, powerful links in a snap.

