
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

<img width="1919" height="962" alt="image" src="https://github.com/user-attachments/assets/5fb4528a-340d-4f57-a9e4-398df0b27c10" />
<img width="1919" height="954" alt="image" src="https://github.com/user-attachments/assets/495a3dbf-a12a-43a4-8785-c8c9fd5eb3ef" />
<img width="1919" height="960" alt="image" src="https://github.com/user-attachments/assets/2160cf52-8afe-448e-b39e-516c616f370e" />
<img width="1918" height="965" alt="image" src="https://github.com/user-attachments/assets/289d1db2-72ee-4aae-8560-e210e15fab0b" />
<img width="1917" height="965" alt="image" src="https://github.com/user-attachments/assets/db46c45f-e72b-4530-b377-272423a60fcc" />
<img width="1917" height="965" alt="image" src="https://github.com/user-attachments/assets/dd3655fc-2972-419b-8844-30f1def88d32" />
<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/c716230b-65b2-4304-8233-9032ead9e203" />
<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/d6f5ae93-687c-49fa-8db9-2dd8a6ef16a9" />
<img width="1919" height="961" alt="image" src="https://github.com/user-attachments/assets/dcfac6c1-1c4e-461b-a7a1-6766c97224d8" />




## License

This project is open source and free to use for personal and commercial projects.

---

**WarpLink** — Bend the web to your will. Create short, powerful links in a snap.


