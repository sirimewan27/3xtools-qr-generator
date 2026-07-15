# 3xtools QR Suite

3xtools QR Suite is a private, browser-based QR code generator built with React and Vite. It lets users create styled QR codes for links, text, email, phone, SMS, WhatsApp, Wi-Fi, contact cards, locations, calendar events, and bulk datasets without sending input data to a server.

## Features

- Generate QR codes entirely in the browser
- Support for URL, text, email, phone, SMS, WhatsApp, Wi-Fi, vCard, location, calendar, and bulk QR workflows
- Customize QR colors, margins, error correction, module patterns, finder eyes, and frame styles
- Export QR codes as PNG or SVG
- Bulk-generate QR codes from pasted lines or CSV data
- Download bulk QR output as a ZIP archive
- Light and dark theme support
- Configurable branding, support links, default QR settings, and related tools in `src/config.js`

## Tech Stack

- React
- Vite
- Tailwind CSS
- qrcode
- JSZip
- Lucide React

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

### Build

```bash
npm run build
```

The production build is written to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Configuration

Most app-level settings live in `src/config.js`:

- Brand name and tagline
- Support email and donation link
- Theme colors
- Default QR options
- Bulk generator settings
- Related tool links

## Privacy

QR generation and CSV processing run locally in the user's browser. The app does not need a backend to generate or export QR codes.

## Releasing on GitHub

This project is ready to publish as an open-source GitHub repository under the GNU General Public License v3.0 or later.

Recommended release checklist:

1. Confirm `LICENSE` is present in the repository root.
2. Update repository description, topics, and homepage URL on GitHub.
3. Run `npm run lint` and `npm run build`.
4. Commit the release files.
5. Create a GitHub release tag such as `v1.0.0`.

## License

This project is licensed under the GNU General Public License v3.0 or later. See [LICENSE](LICENSE) for details.
