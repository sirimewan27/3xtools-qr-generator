// ==========================================
// 3xtools QR Suite Configuration File
// ==========================================
// You can customize the brand title, default settings, 
// support information, and primary colors from this file.

export const CONFIG = {
  // Brand Configuration
  brand: {
    title: '3xtools QR Suite',
    logoText: '3xtools',
    subText: 'QR Suite',
    tagline: 'Realtime Premium Offline QR Suite',
  },

  // Support & Donations
  support: {
    email: 'support@3xtools.app',
    coffeeUrl: 'https://buymeacoffee.com/3xtools',
    coffeeHeading: 'Enjoying our free tools?',
    coffeeSub: 'Keep our premium suite 100% private, clean, and free of ads.',
  },

  // UI Theme Colors (Solid Flat Styles only)
  // These will be programmatically injected on load as CSS custom variables
  theme: {
    // Light Mode Brand Colors
    primary: '#ff0000ff',      // Indigo 600 (Primary button and active accents)
    primaryHover: '#4338ca', // Indigo 700 (Hover state for buttons)
    primaryBadge: '#e0e7ff', // Indigo 100 (Badge and background accent fills)

    // Dark Mode Brand Colors
    primaryDark: '#818cf8',      // Indigo 400 (Accents in dark mode)
    primaryDarkHover: '#6366f1', // Indigo 500 (Hover state in dark mode)
    primaryBadgeDark: 'rgba(99, 102, 241, 0.15)', // Indigo-500 @ 15% opacity
  },

  // Default QR Generator configuration settings
  qrDefaults: {
    bgColor: '#ffffff',
    fgColor: '#000000',
    margin: 4,
    ecLevel: 'M',
    pattern: 'squares',
    eyeStyle: 'squares',
    eyeCenter: 'squares',

    // Frame wraps
    frameStyle: 'no-frame',
    frameText: 'SCAN ME',
    frameFont: 'Outfit',
    frameTextSize: 100,
    frameColor: '#4f46e5',
    frameTextColor: '#ffffff',
  },

  // Bulk Generator settings
  bulkDefaults: {
    defaultPrefix: 'bulk-qr',
    itemsPerPage: 12,
  },

  // Portfolio of Other Developer Utilities
  otherTools: [
    {
      title: 'Image Optimizer',
      desc: 'Compress, scale, and convert PNG, JPEG, and WEBP images completely offline with zero server data collection.',
      url: 'https://3xtools.app/image-optimizer',
      badge: 'Client-side'
    },
    {
      title: 'JSON Formatter',
      desc: 'Format, pretty-print, and explore complex JSON objects in a gorgeous hierarchical tree view offline.',
      url: 'https://3xtools.app/json-formatter',
      badge: 'Offline'
    },
    {
      title: 'Hash & HMAC Generator',
      desc: 'Generate secure SHA-256, MD5, and Bcrypt cryptographic hash hashes right inside your browser window.',
      url: 'https://3xtools.app/hash-generator',
      badge: 'Secure'
    },
    {
      title: 'Base64 Encoder/Decoder',
      desc: 'Instantly translate clean string texts or raw image assets to Base64 data coordinates in real-time.',
      url: 'https://3xtools.app/base64-converter',
      badge: 'Crypto'
    },
    {
      title: 'SVG to PNG Converter',
      desc: 'Transform vector SVG markup coordinates into clean, high-resolution PNG image cards completely client-side.',
      url: 'https://3xtools.app/svg-to-png',
      badge: 'Rasterizer'
    },
    {
      title: 'Markdown Live Editor',
      desc: 'Author standard GFM markdown text and review pixel-perfect HTML compiles dynamically in real-time.',
      url: 'https://3xtools.app/markdown-editor',
      badge: 'Content'
    }
  ]
};
