import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { CONFIG } from './config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CoffeeModal from './components/CoffeeModal';
import FAQPage from './pages/FAQPage';
import HelpPage from './pages/HelpPage';
import ToolsPage from './pages/ToolsPage';
import {
  Link as LinkIcon,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Wifi,
  User,
  MapPin,
  Calendar,
  ArrowDown,
  Printer,
  QrCode,
  Palette,
  Layout,
  Sliders,
  Check,
  Upload,
  Layers,
  ChevronLeft,
  ChevronRight,
  Archive,
  Plus
} from 'lucide-react';

// ==========================================
// Shared QR Code Drawing Utility
// ==========================================
export function renderQrCodeToCanvas(canvas, payload, {
  bgColor = '#ffffff',
  fgColor = '#000000',
  margin = 4,
  ecLevel = 'M',
  pattern = 'squares',
  eyeStyle = 'squares',
  eyeCenter = 'squares',
  customMarkerColor = false,
  markerBorderColor = '#000000',
  customCenterColor = false,
  markerCenterColor = '#000000',
  frameStyle = 'no-frame',
  frameText = 'SCAN ME',
  frameFont = 'Outfit',
  frameTextSize = 100,
  customFrameColor = false,
  frameColor = '#4f46e5',
  frameTextColor = '#ffffff'
}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  try {
    const qr = QRCode.create(payload, {
      errorCorrectionLevel: ecLevel,
      margin: parseInt(margin.toString(), 10)
    });

    const modules = qr.modules;
    const size = modules.size;

    const qrDrawSize = 250;
    let canvasW = 300;
    let canvasH = 300;
    let qrX = 25;
    let qrY = 25;

    // Layout dimensional updates based on active Frame wrappers
    if (frameStyle === 'bottom-banner' || frameStyle === 'top-banner') {
      canvasW = 320;
      canvasH = 380;
      qrX = 35;
      qrY = frameStyle === 'bottom-banner' ? 32 : 98;
    } else if (frameStyle === 'bottom-accent') {
      canvasW = 320;
      canvasH = 360;
      qrX = 35;
      qrY = 28;
    } else if (frameStyle === 'border-banner') {
      canvasW = 320;
      canvasH = 380;
      qrX = 35;
      qrY = 36;
    } else if (frameStyle === 'ribbon-bottom' || frameStyle === 'ribbon-top') {
      canvasW = 320;
      canvasH = 385;
      qrX = 35;
      qrY = frameStyle === 'ribbon-bottom' ? 30 : 102;
    } else if (frameStyle === 'phone-mockup') {
      canvasW = 320;
      canvasH = 460;
      qrX = 35;
      qrY = 74;
    } else if (frameStyle === 'clapperboard') {
      canvasW = 320;
      canvasH = 410;
      qrX = 35;
      qrY = 58;
    }

    canvas.width = canvasW;
    canvas.height = canvasH;

    const scale = qrDrawSize / size;

    // Fill canvas background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasW, canvasH);

    const frameColorHex = customFrameColor ? frameColor : fgColor;
    const frameTextHex = frameTextColor;

    // Draw premium Frame Wrappers
    if (frameStyle !== 'no-frame') {
      ctx.fillStyle = frameColorHex;
      ctx.strokeStyle = frameColorHex;

      if (frameStyle === 'bottom-banner') {
        ctx.beginPath();
        ctx.roundRect(10, 10, 300, 360, 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(10, 305, 300, 65, [0, 0, 20, 20]);
        ctx.fill();
      } else if (frameStyle === 'top-banner') {
        ctx.beginPath();
        ctx.roundRect(10, 10, 300, 360, 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(10, 10, 300, 65, [20, 20, 0, 0]);
        ctx.fill();
      } else if (frameStyle === 'bottom-accent') {
        ctx.fillRect(40, 305, 240, 5);
        ctx.beginPath();
        ctx.moveTo(40, 296);
        ctx.lineTo(25, 307.5);
        ctx.lineTo(40, 319);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(280, 296);
        ctx.lineTo(295, 307.5);
        ctx.lineTo(280, 319);
        ctx.closePath();
        ctx.fill();
      } else if (frameStyle === 'border-banner') {
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.roundRect(12, 12, 296, 356, 18);
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(60, 310, 200, 45, 12);
        ctx.fill();
      } else if (frameStyle === 'ribbon-bottom') {
        ctx.beginPath();
        ctx.moveTo(35, 315);
        ctx.lineTo(15, 335);
        ctx.lineTo(35, 355);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(285, 315);
        ctx.lineTo(305, 335);
        ctx.lineTo(285, 355);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(30, 310, 260, 50, 6);
        ctx.fill();
      } else if (frameStyle === 'ribbon-top') {
        ctx.beginPath();
        ctx.moveTo(35, 25);
        ctx.lineTo(15, 45);
        ctx.lineTo(35, 65);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(285, 25);
        ctx.lineTo(305, 45);
        ctx.lineTo(285, 65);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(30, 20, 260, 50, 6);
        ctx.fill();
      } else if (frameStyle === 'phone-mockup') {
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.roundRect(15, 15, 290, 430, 36);
        ctx.stroke();
        ctx.fillStyle = frameColorHex;
        ctx.beginPath();
        ctx.roundRect(110, 432, 100, 5, 2.5);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(95, 15, 130, 22, [0, 0, 12, 12]);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(35, 360, 250, 50, 16);
        ctx.fill();
      } else if (frameStyle === 'clapperboard') {
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(10, 10, 300, 390, 16);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 300, 45, [16, 16, 0, 0]);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        for (let offset = 20; offset < 300; offset += 55) {
          ctx.beginPath();
          ctx.moveTo(10 + offset, 10);
          ctx.lineTo(10 + offset + 20, 10);
          ctx.lineTo(10 + offset - 10, 55);
          ctx.lineTo(10 + offset - 30, 55);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillStyle = frameColorHex;
        ctx.beginPath();
        ctx.roundRect(35, 310, 250, 55, 12);
        ctx.fill();
      }
    }

    // Check if pixel is part of Finder pattern
    const isFinderPattern = (r, c) => {
      if (r >= 0 && r < 7 && c >= 0 && c < 7) return true;
      if (r >= 0 && r < 7 && c >= size - 7 && c < size) return true;
      if (r >= size - 7 && r < size && c >= 0 && c < 7) return true;
      return false;
    };

    ctx.fillStyle = fgColor;

    // Draw custom Data Pixel Patterns
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (modules.get(r, c)) {
          if (isFinderPattern(r, c)) continue;

          const x = qrX + c * scale;
          const y = qrY + r * scale;
          const w = scale;
          const h = scale;

          if (pattern === 'dots') {
            ctx.beginPath();
            ctx.arc(x + w / 2, y + h / 2, (w / 2) * 0.85, 0, 2 * Math.PI);
            ctx.fill();
          } else if (pattern === 'small-dots') {
            ctx.beginPath();
            ctx.arc(x + w / 2, y + h / 2, (w / 2) * 0.55, 0, 2 * Math.PI);
            ctx.fill();
          } else if (pattern === 'rounded') {
            ctx.beginPath();
            ctx.roundRect(x + 0.4, y + 0.4, w - 0.8, h - 0.8, w * 0.32);
            ctx.fill();
          } else if (pattern === 'diamonds') {
            ctx.beginPath();
            ctx.moveTo(x + w / 2, y);
            ctx.lineTo(x + w, y + h / 2);
            ctx.lineTo(x + w / 2, y + h);
            ctx.lineTo(x, y + h / 2);
            ctx.closePath();
            ctx.fill();
          } else if (pattern === 'cross') {
            ctx.fillRect(x + w * 0.35, y, w * 0.3, h);
            ctx.fillRect(x, y + h * 0.35, w, h * 0.3);
          } else if (pattern === 'hearts') {
            ctx.beginPath();
            ctx.moveTo(x + w / 2, y + h * 0.85);
            ctx.bezierCurveTo(x, y + h * 0.5, x, y, x + w / 4, y);
            ctx.bezierCurveTo(x + w / 2, y, x + w / 2, y + h * 0.3, x + w / 2, y + h * 0.3);
            ctx.bezierCurveTo(x + w / 2, y + h * 0.3, x + w / 2, y, x + (3 * w) / 4, y);
            ctx.bezierCurveTo(x + w, y, x + w, y + h * 0.5, x + w / 2, y + h * 0.85);
            ctx.closePath();
            ctx.fill();
          } else if (pattern === 'stars') {
            ctx.beginPath();
            const cx = x + w / 2;
            const cy = y + h / 2;
            const outer = (w / 2) * 0.95;
            const inner = (w / 2) * 0.35;
            ctx.moveTo(cx, cy - outer);
            ctx.lineTo(cx + inner * 0.7, cy - inner * 0.7);
            ctx.lineTo(cx + outer, cy);
            ctx.lineTo(cx + inner * 0.7, cy + inner * 0.7);
            ctx.lineTo(cx, cy + outer);
            ctx.lineTo(cx - inner * 0.7, cy + inner * 0.7);
            ctx.lineTo(cx - outer, cy);
            ctx.lineTo(cx - inner * 0.7, cy - inner * 0.7);
            ctx.closePath();
            ctx.fill();
          } else if (pattern === 'liquid') {
            const hasLeft = c > 0 && modules.get(r, c - 1) && !isFinderPattern(r, c - 1);
            const hasRight = c < size - 1 && modules.get(r, c + 1) && !isFinderPattern(r, c + 1);
            const hasUp = r > 0 && modules.get(r - 1, c) && !isFinderPattern(r - 1, c);
            const hasDown = r < size - 1 && modules.get(r + 1, c) && !isFinderPattern(r + 1, c);

            const radTL = hasLeft || hasUp ? 0 : w * 0.5;
            const radTR = hasRight || hasUp ? 0 : w * 0.5;
            const radBR = hasRight || hasDown ? 0 : w * 0.5;
            const radBL = hasLeft || hasDown ? 0 : w * 0.5;

            ctx.beginPath();
            ctx.roundRect(x, y, w, h, [radTL, radTR, radBR, radBL]);
            ctx.fill();
          } else if (pattern === 'h-lines') {
            ctx.beginPath();
            ctx.roundRect(x + 0.2, y + h * 0.25, w - 0.4, h * 0.5, h * 0.25);
            ctx.fill();
          } else if (pattern === 'v-lines') {
            ctx.beginPath();
            ctx.roundRect(x + w * 0.25, y + 0.2, w * 0.5, h - 0.4, w * 0.25);
            ctx.fill();
          } else {
            ctx.fillRect(x, y, w, h);
          }
        }
      }
    }

    // Draw locator Eyes
    const drawFinderEye = (startX, startY) => {
      const size7 = scale * 7;
      const size5 = scale * 5;
      const size3 = scale * 3;
      const cx = startX + size7 / 2;
      const cy = startY + size7 / 2;

      ctx.fillStyle = customMarkerColor ? markerBorderColor : fgColor;
      ctx.beginPath();
      if (eyeStyle === 'rounded') {
        ctx.roundRect(startX, startY, size7, size7, scale * 1.8);
      } else if (eyeStyle === 'circle') {
        ctx.arc(cx, cy, size7 / 2, 0, 2 * Math.PI);
      } else if (eyeStyle === 'leaf') {
        ctx.roundRect(startX, startY, size7, size7, [0, scale * 3.5, 0, scale * 3.5]);
      } else if (eyeStyle === 'shield') {
        ctx.roundRect(startX, startY, size7, size7, [0, 0, scale * 3.5, scale * 3.5]);
      } else if (eyeStyle === 'flower') {
        for (let a = 0; a < Math.PI * 2; a += 0.08) {
          const r = (size7 / 2) * (0.94 + 0.06 * Math.sin(a * 8));
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      } else {
        ctx.rect(startX, startY, size7, size7);
      }
      ctx.fill();

      ctx.fillStyle = bgColor;
      ctx.beginPath();
      if (eyeStyle === 'rounded') {
        ctx.roundRect(startX + scale, startY + scale, size5, size5, scale * 1.2);
      } else if (eyeStyle === 'circle') {
        ctx.arc(cx, cy, size5 / 2, 0, 2 * Math.PI);
      } else if (eyeStyle === 'leaf') {
        ctx.roundRect(startX + scale, startY + scale, size5, size5, [0, scale * 2.5, 0, scale * 2.5]);
      } else if (eyeStyle === 'shield') {
        ctx.roundRect(startX + scale, startY + scale, size5, size5, [0, 0, scale * 2.5, scale * 2.5]);
      } else if (eyeStyle === 'flower') {
        ctx.arc(cx, cy, size5 / 2, 0, 2 * Math.PI);
      } else {
        ctx.rect(startX + scale, startY + scale, size5, size5);
      }
      ctx.fill();

      ctx.fillStyle = customCenterColor
        ? markerCenterColor
        : customMarkerColor
          ? markerBorderColor
          : fgColor;
      ctx.beginPath();
      if (eyeCenter === 'circle') {
        ctx.arc(cx, cy, size3 / 2, 0, 2 * Math.PI);
      } else if (eyeCenter === 'leaf') {
        ctx.roundRect(startX + scale * 2, startY + scale * 2, size3, size3, [0, scale * 1.5, 0, scale * 1.5]);
      } else if (eyeCenter === 'diamonds') {
        ctx.moveTo(cx, cy - size3 / 2);
        ctx.lineTo(cx + size3 / 2, cy);
        ctx.lineTo(cx, cy + size3 / 2);
        ctx.lineTo(cx - size3 / 2, cy);
      } else if (eyeCenter === 'stars') {
        const outer = (size3 / 2) * 1.1;
        const inner = (size3 / 2) * 0.45;
        ctx.moveTo(cx, cy - outer);
        ctx.lineTo(cx + inner * 0.7, cy - inner * 0.7);
        ctx.lineTo(cx + outer, cy);
        ctx.lineTo(cx + inner * 0.7, cy + inner * 0.7);
        ctx.lineTo(cx, cy + outer);
        ctx.lineTo(cx - inner * 0.7, cy + inner * 0.7);
        ctx.lineTo(cx - outer, cy);
        ctx.lineTo(cx - inner * 0.7, cy - inner * 0.7);
      } else if (eyeCenter === 'hearts') {
        const h = size3;
        const w = size3;
        const hx = startX + scale * 2;
        const hy = startY + scale * 2;
        ctx.moveTo(cx, hy + h * 0.85);
        ctx.bezierCurveTo(hx, hy + h * 0.5, hx, hy, hx + w / 4, hy);
        ctx.bezierCurveTo(cx, hy, cx, hy + h * 0.3, cx, hy + h * 0.3);
        ctx.bezierCurveTo(cx, hy + h * 0.3, cx, hy, hx + (3 * w) / 4, hy);
        ctx.bezierCurveTo(hx + w, hy, hx + w, hy + h * 0.5, cx, hy + h * 0.85);
      } else if (eyeCenter === 'cross') {
        ctx.fillRect(cx - scale * 0.5, startY + scale * 2, scale, size3);
        ctx.fillRect(startX + scale * 2, cy - scale * 0.5, size3, scale);
      } else {
        ctx.rect(startX + scale * 2, startY + scale * 2, size3, size3);
      }
      ctx.fill();
    };

    drawFinderEye(qrX, qrY);
    drawFinderEye(qrX + (size - 7) * scale, qrY);
    drawFinderEye(qrX, qrY + (size - 7) * scale);

    // Draw custom Typography Label if frame text exists
    if (frameStyle !== 'no-frame' && frameText) {
      ctx.fillStyle = frameTextHex;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let fontFamily = 'Outfit, sans-serif';
      if (frameFont === 'AbrilFatface') fontFamily = "'Abril Fatface', serif";
      else if (frameFont === 'Inter') fontFamily = 'Inter, sans-serif';
      else if (frameFont === 'Montserrat') fontFamily = 'Montserrat, sans-serif';
      else if (frameFont === 'Playfair') fontFamily = "'Playfair Display', serif";

      const sizePx = Math.round(16 * (parseInt(frameTextSize.toString(), 10) / 100));
      ctx.font = 'bold ' + sizePx + 'px ' + fontFamily;

      let textY = 0;
      if (frameStyle === 'bottom-banner') textY = 338;
      else if (frameStyle === 'top-banner') textY = 42;
      else if (frameStyle === 'bottom-accent') {
        ctx.fillStyle = customFrameColor ? frameColor : fgColor;
        textY = 338;
      } else if (frameStyle === 'border-banner') textY = 332;
      else if (frameStyle === 'ribbon-bottom') textY = 335;
      else if (frameStyle === 'ribbon-top') textY = 45;
      else if (frameStyle === 'phone-mockup') textY = 385;
      else if (frameStyle === 'clapperboard') textY = 338;

      ctx.fillText(frameText, canvasW / 2, textY);
    }
  } catch (e) {
    console.error('Error drawing canvas in utility:', e);
  }
}

// ==========================================
// Standalone Custom Bulk QR Card Component
// ==========================================
function BulkQrCard({
  item,
  index,
  bgColor,
  fgColor,
  margin,
  ecLevel,
  pattern,
  eyeStyle,
  eyeCenter,
  customMarkerColor,
  markerBorderColor,
  customCenterColor,
  markerCenterColor,
  frameStyle,
  frameText,
  frameFont,
  frameTextSize,
  customFrameColor,
  frameColor,
  frameTextColor,
  onDownloadSuccess
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderQrCodeToCanvas(canvas, item.payload, {
      bgColor,
      fgColor,
      margin,
      ecLevel,
      pattern,
      eyeStyle,
      eyeCenter,
      customMarkerColor,
      markerBorderColor,
      customCenterColor,
      markerCenterColor,
      frameStyle,
      frameText: item.frameText || frameText, // Cell override or global default
      frameFont,
      frameTextSize,
      customFrameColor,
      frameColor,
      frameTextColor
    });
  }, [
    item.payload,
    item.frameText,
    bgColor,
    fgColor,
    margin,
    ecLevel,
    pattern,
    eyeStyle,
    eyeCenter,
    customMarkerColor,
    markerBorderColor,
    customCenterColor,
    markerCenterColor,
    frameStyle,
    frameText,
    frameFont,
    frameTextSize,
    customFrameColor,
    frameColor,
    frameTextColor
  ]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${item.label || `qr-code-${index + 1}`}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onDownloadSuccess();
  };

  return (
    <div className="bg-slate-50 dark:bg-zinc-950/70 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-4 flex flex-col items-center justify-between text-center gap-3 transition-all hover:shadow-md hover:border-slate-350 dark:hover:border-zinc-700/80 shadow-xs relative">
      <div className="w-full text-slate-800 dark:text-zinc-200 text-xs font-bold truncate max-w-full px-1" title={item.label}>
        #{index + 1} - {item.label || 'QR Item'}
      </div>
      <div className="bg-white p-2.5 rounded-xl flex items-center justify-center shadow-inner relative max-w-full overflow-hidden">
        <canvas ref={canvasRef} id={`bulk-canvas-${index}`} className="w-32 h-auto max-h-32 rounded-lg"></canvas>
      </div>
      <div className="w-full">
        <button
          onClick={downloadPng}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-750 active:scale-95 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <ArrowDown className="h-3.5 w-3.5" />
          <span>Download PNG</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// Main App Component
// ==========================================
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState('url');
  const [qrLoaded, setQrLoaded] = useState(false);
  const [page, setPage] = useState('generator'); // Routing state: 'generator' | 'faq' | 'help'
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Content state variables
  const [url, setUrl] = useState('https://3xtools.app');
  const [text, setText] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSub, setEmailSub] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phone, setPhone] = useState('');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsText, setSmsText] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [waText, setWaText] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiType, setWifiType] = useState('WPA');
  const [cardName, setCardName] = useState('');
  const [cardOrg, setCardOrg] = useState('');
  const [cardPhone, setCardPhone] = useState('');
  const [cardEmail, setCardEmail] = useState('');
  const [cardUrl, setCardUrl] = useState('');
  const [cardAddr, setCardAddr] = useState('');
  const [locLat, setLocLat] = useState('');
  const [locLng, setLocLng] = useState('');
  const [evtTitle, setEvtTitle] = useState('');
  const [evtLoc, setEvtLoc] = useState('');
  const [evtStart, setEvtStart] = useState('');
  const [evtEnd, setEvtEnd] = useState('');

  // Bulk Mode state variables
  const [bulkInputMode, setBulkInputMode] = useState('text'); // 'text' or 'csv'
  const [bulkTextList, setBulkTextList] = useState('');
  const [bulkCsvData, setBulkCsvData] = useState([]);
  const [bulkCsvFilename, setBulkCsvFilename] = useState('');
  const [bulkHeaders, setBulkHeaders] = useState([]);
  const [bulkQrCol, setBulkQrCol] = useState(0);
  const [bulkLabelCol, setBulkLabelCol] = useState('none');
  const [bulkFrameTextCol, setBulkFrameTextCol] = useState('none');
  const [bulkDefaultPrefix, setBulkDefaultPrefix] = useState(CONFIG.bulkDefaults.defaultPrefix);
  const [bulkItems, setBulkItems] = useState([]);

  // Bulk Pagination state
  const [bulkPage, setBulkPage] = useState(1);
  const [itemsPerPage] = useState(CONFIG.bulkDefaults.itemsPerPage);

  // Design customizations state variables
  const [bgColor, setBgColor] = useState(CONFIG.qrDefaults.bgColor);
  const [fgColor, setFgColor] = useState(CONFIG.qrDefaults.fgColor);
  const [margin, setMargin] = useState(CONFIG.qrDefaults.margin);
  const [ecLevel, setEcLevel] = useState(CONFIG.qrDefaults.ecLevel);

  // Patterns & markers
  const [pattern, setPattern] = useState(CONFIG.qrDefaults.pattern);
  const [eyeStyle, setEyeStyle] = useState(CONFIG.qrDefaults.eyeStyle);
  const [eyeCenter, setEyeCenter] = useState(CONFIG.qrDefaults.eyeCenter);
  const [customMarkerColor, setCustomMarkerColor] = useState(false);
  const [markerBorderColor, setMarkerBorderColor] = useState(CONFIG.qrDefaults.fgColor);
  const [customCenterColor, setCustomCenterColor] = useState(false);
  const [markerCenterColor, setMarkerCenterColor] = useState(CONFIG.qrDefaults.fgColor);

  // Frame customizations
  const [frameStyle, setFrameStyle] = useState(CONFIG.qrDefaults.frameStyle);
  const [frameText, setFrameText] = useState(CONFIG.qrDefaults.frameText);
  const [frameFont, setFrameFont] = useState(CONFIG.qrDefaults.frameFont);
  const [frameTextSize, setFrameTextSize] = useState(CONFIG.qrDefaults.frameTextSize);
  const [customFrameColor, setCustomFrameColor] = useState(false);
  const [frameColor, setFrameColor] = useState(CONFIG.qrDefaults.frameColor);
  const [frameTextColor, setFrameTextColor] = useState(CONFIG.qrDefaults.frameTextColor);

  // FAQ Expanded index state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  const canvasRef = useRef(null);

  // Inject custom config theme colors on mount and dynamic configuration shifts
  useEffect(() => {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--primary-color', CONFIG.theme.primary);
    rootStyle.setProperty('--primary-hover', CONFIG.theme.primaryHover);
    rootStyle.setProperty('--primary-badge', CONFIG.theme.primaryBadge);

    rootStyle.setProperty('--primary-dark', CONFIG.theme.primaryDark);
    rootStyle.setProperty('--primary-dark-hover', CONFIG.theme.primaryDarkHover);
    rootStyle.setProperty('--primary-badge-dark', CONFIG.theme.primaryBadgeDark);
  }, []);

  // Manage dark mode classes on root html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // QR Content Payload Generator (for standard mode)
  const getQrText = () => {
    switch (activeTab) {
      case 'url':
        return url || 'https://3xtools.app';
      case 'text':
        return text || ' ';
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSub)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phone}`;
      case 'sms':
        return `smsto:${smsPhone}:${smsText}`;
      case 'whatsapp':
        return `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiType};P:${wifiPass};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${cardName}\nORG:${cardOrg}\nTEL:${cardPhone}\nEMAIL:${cardEmail}\nURL:${cardUrl}\nADR:${cardAddr}\nEND:VCARD`;
      case 'location':
        return `geo:${locLat},${locLng}`;
      case 'event':
        return `BEGIN:VEVENT\nSUMMARY:${evtTitle}\nDTSTART:${evtStart}\nDTEND:${evtEnd}\nLOCATION:${evtLoc}\nEND:VEVENT`;
      default:
        return 'https://3xtools.app';
    }
  };

  // Re-run standard canvas drawing logic when parameters change
  useEffect(() => {
    if (activeTab !== 'bulk' && page === 'generator') {
      render();
    }
  }, [
    activeTab,
    page,
    url,
    text,
    emailTo,
    emailSub,
    emailBody,
    phone,
    smsPhone,
    smsText,
    waPhone,
    waText,
    wifiSsid,
    wifiPass,
    wifiType,
    cardName,
    cardOrg,
    cardPhone,
    cardEmail,
    cardUrl,
    cardAddr,
    locLat,
    locLng,
    evtTitle,
    evtLoc,
    evtStart,
    evtEnd,
    bgColor,
    fgColor,
    margin,
    ecLevel,
    pattern,
    eyeStyle,
    eyeCenter,
    customMarkerColor,
    markerBorderColor,
    customCenterColor,
    markerCenterColor,
    frameStyle,
    frameText,
    frameFont,
    frameTextSize,
    customFrameColor,
    frameColor,
    frameTextColor
  ]);

  const render = () => {
    const payload = getQrText();
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      setQrLoaded(true);
      renderQrCodeToCanvas(canvas, payload, {
        bgColor,
        fgColor,
        margin,
        ecLevel,
        pattern,
        eyeStyle,
        eyeCenter,
        customMarkerColor,
        markerBorderColor,
        customCenterColor,
        markerCenterColor,
        frameStyle,
        frameText,
        frameFont,
        frameTextSize,
        customFrameColor,
        frameColor,
        frameTextColor
      });
    } catch (e) {
      console.error('Error drawing canvas payload:', e);
    }
  };

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setShowCoffeeModal(true); // Pop coffee popup success
  };

  // Compile vector SVG string offline and trigger download
  const downloadSvg = () => {
    const textVal = getQrText();
    try {
      const getRectPath = (x, y, w, h, rTL, rTR, rBR, rBL) => {
        return (
          'M ' +
          (x + rTL) +
          ' ' +
          y +
          ' L ' +
          (x + w - rTR) +
          ' ' +
          y +
          ' A ' +
          rTR +
          ' ' +
          rTR +
          ' 0 0 1 ' +
          (x + w) +
          ' ' +
          (y + rTR) +
          ' L ' +
          (x + w) +
          ' ' +
          (y + h - rBR) +
          ' A ' +
          rBR +
          ' ' +
          rBR +
          ' 0 0 1 ' +
          (x + w - rBR) +
          ' ' +
          (y + h) +
          ' L ' +
          (x + rBL) +
          ' ' +
          (y + h) +
          ' A ' +
          rBL +
          ' ' +
          rBL +
          ' 0 0 1 ' +
          x +
          ' ' +
          (y + h - rBL) +
          ' L ' +
          x +
          ' ' +
          (y + rTL) +
          ' A ' +
          rTL +
          ' ' +
          rTL +
          ' 0 0 1 ' +
          (x + rTL) +
          ' ' +
          y +
          ' Z'
        );
      };

      const qr = QRCode.create(textVal, {
        errorCorrectionLevel: ecLevel,
        margin: parseInt(margin.toString(), 10)
      });

      const modules = qr.modules;
      const size = modules.size;

      const qrDrawSize = 250;
      let canvasW = 300;
      let canvasH = 300;
      let qrX = 25;
      let qrY = 25;

      if (frameStyle === 'bottom-banner' || frameStyle === 'top-banner') {
        canvasW = 320;
        canvasH = 380;
        qrX = 35;
        qrY = frameStyle === 'bottom-banner' ? 32 : 98;
      } else if (frameStyle === 'bottom-accent') {
        canvasW = 320;
        canvasH = 360;
        qrX = 35;
        qrY = 28;
      } else if (frameStyle === 'border-banner') {
        canvasW = 320;
        canvasH = 380;
        qrX = 35;
        qrY = 36;
      } else if (frameStyle === 'ribbon-bottom' || frameStyle === 'ribbon-top') {
        canvasW = 320;
        canvasH = 385;
        qrX = 35;
        qrY = frameStyle === 'ribbon-bottom' ? 30 : 102;
      } else if (frameStyle === 'phone-mockup') {
        canvasW = 320;
        canvasH = 460;
        qrX = 35;
        qrY = 74;
      } else if (frameStyle === 'clapperboard') {
        canvasW = 320;
        canvasH = 410;
        qrX = 35;
        qrY = 58;
      }

      const scale = qrDrawSize / size;

      let svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasW} ${canvasH}" width="${canvasW}" height="${canvasH}">`;
      svgStr += `<rect width="${canvasW}" height="${canvasH}" fill="${bgColor}" />`;

      const frameColorHex = customFrameColor ? frameColor : fgColor;
      const frameTextHex = frameTextColor;

      if (frameStyle !== 'no-frame') {
        if (frameStyle === 'bottom-banner') {
          svgStr += `<rect x="10" y="10" width="300" height="360" rx="20" ry="20" fill="none" stroke="${frameColorHex}" stroke-width="2" />`;
          svgStr += `<path d="M10,305 h300 v45 a20,20 0 0,1 -20,20 h-260 a20,20 0 0,1 -20,-20 z" fill="${frameColorHex}" />`;
        } else if (frameStyle === 'top-banner') {
          svgStr += `<rect x="10" y="10" width="300" height="360" rx="20" ry="20" fill="none" stroke="${frameColorHex}" stroke-width="2" />`;
          svgStr += `<path d="M10,75 v-45 a20,20 0 0,1 20,-20 h260 a20,20 0 0,1 20,20 v45 z" fill="${frameColorHex}" />`;
        } else if (frameStyle === 'bottom-accent') {
          svgStr += `<rect x="40" y="305" width="240" height="5" fill="${frameColorHex}" />`;
          svgStr += `<polygon points="40,296 25,307.5 40,319" fill="${frameColorHex}" />`;
          svgStr += `<polygon points="280,296 295,307.5 280,319" fill="${frameColorHex}" />`;
        } else if (frameStyle === 'border-banner') {
          svgStr += `<rect x="12" y="12" width="296" height="356" rx="18" ry="18" fill="none" stroke="${frameColorHex}" stroke-width="6" />`;
          svgStr += `<rect x="60" y="310" width="200" height="45" rx="12" ry="12" fill="${frameColorHex}" />`;
        } else if (frameStyle === 'ribbon-bottom') {
          svgStr += `<polygon points="35,315 15,335 35,355" fill="${frameColorHex}" />`;
          svgStr += `<polygon points="285,315 305,335 285,355" fill="${frameColorHex}" />`;
          svgStr += `<rect x="30" y="310" width="260" height="50" rx="6" ry="6" fill="${frameColorHex}" />`;
        } else if (frameStyle === 'ribbon-top') {
          svgStr += `<polygon points="35,25 15,45 35,65" fill="${frameColorHex}" />`;
          svgStr += `<polygon points="285,25 305,45 285,65" fill="${frameColorHex}" />`;
          svgStr += `<rect x="30" y="20" width="260" height="50" rx="6" ry="6" fill="${frameColorHex}" />`;
        } else if (frameStyle === 'phone-mockup') {
          svgStr += `<rect x="15" y="15" width="290" height="430" rx="36" ry="36" fill="none" stroke="${frameColorHex}" stroke-width="8" />`;
          svgStr += `<rect x="110" y="432" width="100" height="5" rx="2.5" ry="2.5" fill="${frameColorHex}" />`;
          svgStr += `<path d="M 95 15 L 225 15 C 225 27 213 37 201 37 L 119 37 C 107 37 95 27 95 15 Z" fill="${frameColorHex}" />`;
          svgStr += `<rect x="35" y="360" width="250" height="50" rx="16" ry="16" fill="${frameColorHex}" />`;
        } else if (frameStyle === 'clapperboard') {
          svgStr += `<rect x="10" y="10" width="300" height="390" rx="16" ry="16" fill="#1e293b" />`;
          svgStr += `<rect x="10" y="10" width="300" height="45" rx="16" ry="16" fill="#0f172a" />`;
          for (let offset = 20; offset < 300; offset += 55) {
            svgStr += `<polygon points="${10 + offset},10 ${10 + offset + 20},10 ${10 + offset - 10},55 ${10 + offset - 30},55" fill="#ffffff" />`;
          }
          svgStr += `<rect x="35" y="310" width="250" height="55" rx="12" ry="12" fill="${frameColorHex}" />`;
        }
      }

      const isFinderPattern = (r, c) => {
        if (r >= 0 && r < 7 && c >= 0 && c < 7) return true;
        if (r >= 0 && r < 7 && c >= size - 7 && c < size) return true;
        if (r >= size - 7 && r < size && c >= 0 && c < 7) return true;
        return false;
      };

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (modules.get(r, c)) {
            if (isFinderPattern(r, c)) continue;

            const x = qrX + c * scale;
            const y = qrY + r * scale;
            const w = scale;
            const h = scale;

            if (pattern === 'dots') {
              svgStr += `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(w / 2) * 0.85}" fill="${fgColor}" />`;
            } else if (pattern === 'small-dots') {
              svgStr += `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(w / 2) * 0.55}" fill="${fgColor}" />`;
            } else if (pattern === 'rounded') {
              svgStr += `<rect x="${x + 0.4}" y="${y + 0.4}" width="${w - 0.8}" height="${h - 0.8}" rx="${w * 0.32}" ry="${w * 0.32}" fill="${fgColor}" />`;
            } else if (pattern === 'diamonds') {
              svgStr += `<polygon points="${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}" fill="${fgColor}" />`;
            } else if (pattern === 'cross') {
              svgStr += `<polygon points="${x + w * 0.35},${y} ${x + w * 0.65},${y} ${x + w * 0.65},${y + h * 0.35} ${x + w},${y + h * 0.35} ${x + w},${y + h * 0.65} ${x + w * 0.65},${y + h * 0.65} ${x + w * 0.65},${y + h} ${x + w * 0.35},${y + h} ${x + w * 0.35},${y + h * 0.65} ${x},${y + h * 0.65} ${x},${y + h * 0.35} ${x + w * 0.35},${y + h * 0.35}" fill="${fgColor}" />`;
            } else if (pattern === 'hearts') {
              const path = `M ${x + w / 2} ${y + h * 0.85} C ${x} ${y + h * 0.5}, ${x} ${y}, ${x + w / 4} ${y} C ${x + w / 2} ${y}, ${x + w / 2} ${y + h * 0.3}, ${x + w / 2} ${y + h * 0.3} C ${x + w / 2} ${y + h * 0.3}, ${x + w / 2} ${y}, ${x + (3 * w) / 4} ${y} C ${x + w} ${y}, ${x + w} ${y + h * 0.5}, ${x + w / 2} ${y + h * 0.85} Z`;
              svgStr += `<path d="${path}" fill="${fgColor}" />`;
            } else if (pattern === 'stars') {
              const cx = x + w / 2;
              const cy = y + h / 2;
              const outer = (w / 2) * 0.95;
              const inner = (w / 2) * 0.35;
              const points = [
                `${cx},${cy - outer}`,
                `${cx + inner * 0.7},${cy - inner * 0.7}`,
                `${cx + outer},${cy}`,
                `${cx + inner * 0.7},${cy + inner * 0.7}`,
                `${cx},${cy + outer}`,
                `${cx - inner * 0.7},${cy + inner * 0.7}`,
                `${cx - outer},${cy}`,
                `${cx - inner * 0.7},${cy - inner * 0.7}`
              ].join(' ');
              svgStr += `<polygon points="${points}" fill="${fgColor}" />`;
            } else if (pattern === 'liquid') {
              svgStr += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${scale * 0.5}" ry="${scale * 0.5}" fill="${fgColor}" />`;
            } else if (pattern === 'h-lines') {
              svgStr += `<rect x="${x + 0.2}" y="${y + h * 0.25}" width="${w - 0.4}" height="${h * 0.5}" rx="${h * 0.25}" ry="${h * 0.25}" fill="${fgColor}" />`;
            } else if (pattern === 'v-lines') {
              svgStr += `<rect x="${x + w * 0.25}" y="${y + 0.2}" width="${w * 0.5}" height="${h - 0.4}" rx="${w * 0.25}" ry="${w * 0.25}" fill="${fgColor}" />`;
            } else {
              svgStr += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fgColor}" />`;
            }
          }
        }
      }

      const drawSvgFinderEye = (startX, startY) => {
        const size7 = scale * 7;
        const size5 = scale * 5;
        const size3 = scale * 3;
        const cx = startX + size7 / 2;
        const cy = startY + size7 / 2;

        let borderCol = customMarkerColor ? markerBorderColor : fgColor;
        let centerCol = customCenterColor
          ? markerCenterColor
          : customMarkerColor
            ? markerBorderColor
            : fgColor;

        if (eyeStyle === 'rounded') {
          svgStr += `<rect x="${startX}" y="${startY}" width="${size7}" height="${size7}" rx="${scale * 1.8}" ry="${scale * 1.8}" fill="${borderCol}" />`;
        } else if (eyeStyle === 'circle') {
          svgStr += `<circle cx="${cx}" cy="${cy}" r="${size7 / 2}" fill="${borderCol}" />`;
        } else if (eyeStyle === 'leaf') {
          svgStr += `<path d="${getRectPath(startX, startY, size7, size7, 0, scale * 3.5, 0, scale * 3.5)}" fill="${borderCol}" />`;
        } else if (eyeStyle === 'shield') {
          svgStr += `<path d="${getRectPath(startX, startY, size7, size7, 0, 0, scale * 3.5, scale * 3.5)}" fill="${borderCol}" />`;
        } else if (eyeStyle === 'flower') {
          let pointsList = [];
          for (let a = 0; a < Math.PI * 2; a += 0.1) {
            const r = (size7 / 2) * (0.94 + 0.06 * Math.sin(a * 8));
            pointsList.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
          }
          svgStr += `<polygon points="${pointsList.join(' ')}" fill="${borderCol}" />`;
        } else {
          svgStr += `<rect x="${startX}" y="${startY}" width="${size7}" height="${size7}" fill="${borderCol}" />`;
        }

        if (eyeStyle === 'rounded') {
          svgStr += `<rect x="${startX + scale}" y="${startY + scale}" width="${size5}" height="${size5}" rx="${scale * 1.2}" ry="${scale * 1.2}" fill="${bgColor}" />`;
        } else if (eyeStyle === 'circle' || eyeStyle === 'flower') {
          svgStr += `<circle cx="${cx}" cy="${cy}" r="${size5 / 2}" fill="${bgColor}" />`;
        } else if (eyeStyle === 'leaf') {
          svgStr += `<path d="${getRectPath(startX + scale, startY + scale, size5, size5, 0, scale * 2.5, 0, scale * 2.5)}" fill="${bgColor}" />`;
        } else if (eyeStyle === 'shield') {
          svgStr += `<path d="${getRectPath(startX + scale, startY + scale, size5, size5, 0, 0, scale * 2.5, scale * 2.5)}" fill="${bgColor}" />`;
        } else {
          svgStr += `<rect x="${startX + scale}" y="${startY + scale}" width="${size5}" height="${size5}" fill="${bgColor}" />`;
        }

        if (eyeCenter === 'circle') {
          svgStr += `<circle cx="${cx}" cy="${cy}" r="${size3 / 2}" fill="${centerCol}" />`;
        } else if (eyeCenter === 'leaf') {
          svgStr += `<path d="${getRectPath(startX + scale * 2, startY + scale * 2, size3, size3, 0, scale * 1.5, 0, scale * 1.5)}" fill="${centerCol}" />`;
        } else if (eyeCenter === 'diamonds') {
          svgStr += `<polygon points="${cx},${cy - size3 / 2} ${cx + size3 / 2},${cy} ${cx},${cy + size3 / 2} ${cx - size3 / 2},${cy}" fill="${centerCol}" />`;
        } else if (eyeCenter === 'stars') {
          const outer = (size3 / 2) * 1.1;
          const inner = (size3 / 2) * 0.45;
          const points = [
            `${cx},${cy - outer}`,
            `${cx + inner * 0.7},${cy - inner * 0.7}`,
            `${cx + outer},${cy}`,
            `${cx + inner * 0.7},${cy + inner * 0.7}`,
            `${cx},${cy + outer}`,
            `${cx - inner * 0.7},${cy + inner * 0.7}`,
            `${cx - outer},${cy}`,
            `${cx - inner * 0.7},${cy - inner * 0.7}`
          ].join(' ');
          svgStr += `<polygon points="${points}" fill="${centerCol}" />`;
        } else if (eyeCenter === 'hearts') {
          const path = `M ${cx} ${startY + scale * 2 + size3 * 0.85} C ${startX + scale * 2} ${startY + scale * 2 + size3 * 0.5}, ${startX + scale * 2} ${startY + scale * 2}, ${startX + scale * 2 + size3 / 4} ${startY + scale * 2} C ${cx} ${startY + scale * 2}, ${cx} ${startY + scale * 2 + size3 * 0.3}, ${cx} ${startY + scale * 2 + size3 * 0.3} C ${cx} ${startY + scale * 2 + size3 * 0.3}, ${cx} ${startY + scale * 2}, ${startX + scale * 2 + (3 * size3) / 4} ${startY + scale * 2} C ${startX + scale * 2 + size3} ${startY + scale * 2}, ${startX + scale * 2 + size3} ${startY + scale * 2 + size3 * 0.5}, ${cx} ${startY + scale * 2 + size3 * 0.85} Z`;
          svgStr += `<path d="${path}" fill="${centerCol}" />`;
        } else if (eyeCenter === 'cross') {
          svgStr += `<rect x="${cx - scale * 0.5}" y="${startY + scale * 2}" width="${scale}" height="${size3}" fill="${centerCol}" />`;
          svgStr += `<rect x="${startX + scale * 2}" y="${cy - scale * 0.5}" width="${size3}" height="${scale}" fill="${centerCol}" />`;
        } else {
          svgStr += `<rect x="${startX + scale * 2}" y="${startY + scale * 2}" width="${size3}" height="${size3}" fill="${centerCol}" />`;
        }
      };

      drawSvgFinderEye(qrX, qrY);
      drawSvgFinderEye(qrX + (size - 7) * scale, qrY);
      drawSvgFinderEye(qrX, qrY + (size - 7) * scale);

      if (frameStyle !== 'no-frame' && frameText) {
        let textY = 0;
        if (frameStyle === 'bottom-banner') textY = 338;
        else if (frameStyle === 'top-banner') textY = 42;
        else if (frameStyle === 'bottom-accent') textY = 338;
        else if (frameStyle === 'border-banner') textY = 332;
        else if (frameStyle === 'ribbon-bottom') textY = 335;
        else if (frameStyle === 'ribbon-top') textY = 45;
        else if (frameStyle === 'phone-mockup') textY = 385;
        else if (frameStyle === 'clapperboard') textY = 338;

        let fontFamily = 'Outfit, sans-serif';
        if (frameFont === 'AbrilFatface') fontFamily = "'Abril Fatface', serif";
        else if (frameFont === 'Inter') fontFamily = 'Inter, sans-serif';
        else if (frameFont === 'Montserrat') fontFamily = 'Montserrat, sans-serif';
        else if (frameFont === 'Playfair') fontFamily = "'Playfair Display', serif";

        const sizePx = Math.round(16 * (parseInt(frameTextSize.toString(), 10) / 100));
        let textCol = frameStyle === 'bottom-accent' ? frameColorHex : frameTextHex;

        svgStr += `<text x="${canvasW / 2}" y="${textY}" fill="${textCol}" font-family="${fontFamily}" font-size="${sizePx}" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${frameText}</text>`;
      }

      svgStr += '</svg>';

      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const link = document.createElement('a');
      link.download = 'qrcode.svg';
      link.href = URL.createObjectURL(blob);
      link.click();
      setShowCoffeeModal(true); // Pop coffee success popup
    } catch (e) {
      console.error('Error compiling SVG:', e);
    }
  };

  const printQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(
        `<html><head><title>Print QR Code</title></head><body style='display:flex;align-items:center;justify-content:center;height:100vh;margin:0;'><img src='${canvas.toDataURL()}' style='width:300px;height:300px;' onload='window.print();window.close();' /></body></html>`
      );
    }
  };

  // CSV Simple robust Parser
  const parseCSV = (textVal) => {
    const lines = textVal.split(/\r?\n/);
    const result = [];
    for (let line of lines) {
      if (!line.trim()) continue;
      const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
      if (matches) {
        result.push(matches.map((m) => m.replace(/^"|"$/g, '').trim()));
      }
    }
    return result;
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBulkCsvFilename(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target.result;
      const rows = parseCSV(csvText);
      if (rows.length > 0) {
        setBulkCsvData(rows);
        setBulkHeaders(rows[0]);
        setBulkQrCol(0);
        setBulkLabelCol('none');
      }
    };
    reader.readAsText(file);
  };

  // Run Bulk items compiler
  const generateBulkQRs = () => {
    let items = [];
    if (bulkInputMode === 'text') {
      const payloads = bulkTextList.split('\n');
      let idx = 1;
      for (let pay of payloads) {
        const clean = pay.trim();
        if (clean) {
          items.push({
            payload: clean,
            label: `${bulkDefaultPrefix}-${idx}`,
            frameText: ''
          });
          idx++;
        }
      }
    } else {
      // CSV Mode
      if (bulkCsvData.length < 2) return;
      const dataRows = bulkCsvData.slice(1);
      let idx = 1;
      for (let row of dataRows) {
        if (!row || row.length === 0) continue;
        const payload = row[bulkQrCol] || '';
        let label = '';
        if (bulkLabelCol === 'none') {
          label = `${bulkDefaultPrefix}-${idx}`;
        } else {
          label = row[bulkLabelCol] || `${bulkDefaultPrefix}-${idx}`;
        }
        let customFrameText = '';
        if (bulkFrameTextCol !== 'none') {
          customFrameText = row[bulkFrameTextCol] || '';
        }
        if (payload.trim()) {
          items.push({
            payload: payload.trim(),
            label: label.trim(),
            frameText: customFrameText.trim()
          });
          idx++;
        }
      }
    }
    setBulkItems(items);
    setBulkPage(1);
  };

  // ZIP Downloader client side (programmatic offline compiler)
  const downloadAllPngsZip = async () => {
    if (bulkItems.length === 0) return;
    const zip = new JSZip();

    for (let i = 0; i < bulkItems.length; i++) {
      const item = bulkItems[i];
      const canvas = document.createElement('canvas');
      renderQrCodeToCanvas(canvas, item.payload, {
        bgColor,
        fgColor,
        margin,
        ecLevel,
        pattern,
        eyeStyle,
        eyeCenter,
        customMarkerColor,
        markerBorderColor,
        customCenterColor,
        markerCenterColor,
        frameStyle,
        frameText: item.frameText || frameText,
        frameFont,
        frameTextSize,
        customFrameColor,
        frameColor,
        frameTextColor
      });
      const dataUrl = canvas.toDataURL('image/png');
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      zip.file(`${item.label || `qr-code-${i + 1}`}.png`, base64Data, { base64: true });
    }

    const zipContent = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.download = 'qrcodes-bulk.zip';
    link.href = URL.createObjectURL(zipContent);
    link.click();
    setShowCoffeeModal(true); // Pop coffee success popup
  };

  const tabs = [
    { id: 'url', label: 'Link / URL', icon: LinkIcon },
    { id: 'text', label: 'Plain Text', icon: FileText },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'phone', label: 'Phone', icon: Phone },
    { id: 'sms', label: 'SMS', icon: MessageSquare },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'vcard', label: 'vCard', icon: User },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'bulk', label: 'Bulk QR', icon: QrCode }
  ];

  // Pattern previews custom SVGs
  const patternsList = [
    {
      id: 'squares',
      label: 'Squares',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="4" height="4" rx="0.5" />
          <rect x="10" y="2" width="4" height="4" rx="0.5" />
          <rect x="18" y="2" width="4" height="4" rx="0.5" />
          <rect x="2" y="10" width="4" height="4" rx="0.5" />
          <rect x="10" y="10" width="4" height="4" rx="0.5" />
          <rect x="18" y="10" width="4" height="4" rx="0.5" />
          <rect x="2" y="18" width="4" height="4" rx="0.5" />
          <rect x="10" y="18" width="4" height="4" rx="0.5" />
          <rect x="18" y="18" width="4" height="4" rx="0.5" />
        </svg>
      )
    },
    {
      id: 'dots',
      label: 'Dots',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="4" cy="4" r="2.5" />
          <circle cx="12" cy="4" r="2.5" />
          <circle cx="20" cy="4" r="2.5" />
          <circle cx="4" cy="12" r="2.5" />
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="20" cy="12" r="2.5" />
          <circle cx="4" cy="20" r="2.5" />
          <circle cx="12" cy="20" r="2.5" />
          <circle cx="20" cy="20" r="2.5" />
        </svg>
      )
    },
    {
      id: 'small-dots',
      label: 'Tiny Dots',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="4" cy="4" r="1.5" />
          <circle cx="12" cy="4" r="1.5" />
          <circle cx="20" cy="4" r="1.5" />
          <circle cx="4" cy="12" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="20" cy="12" r="1.5" />
          <circle cx="4" cy="20" r="1.5" />
          <circle cx="12" cy="20" r="1.5" />
          <circle cx="20" cy="20" r="1.5" />
        </svg>
      )
    },
    {
      id: 'rounded',
      label: 'Rounded',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="4" height="4" rx="1.5" />
          <rect x="10" y="2" width="4" height="4" rx="1.5" />
          <rect x="18" y="2" width="4" height="4" rx="1.5" />
          <rect x="2" y="10" width="4" height="4" rx="1.5" />
          <rect x="10" y="10" width="4" height="4" rx="1.5" />
          <rect x="18" y="10" width="4" height="4" rx="1.5" />
          <rect x="2" y="18" width="4" height="4" rx="1.5" />
          <rect x="10" y="18" width="4" height="4" rx="1.5" />
          <rect x="18" y="18" width="4" height="4" rx="1.5" />
        </svg>
      )
    },
    {
      id: 'diamonds',
      label: 'Diamonds',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 4 1.5 L 6.5 4 L 4 6.5 L 1.5 4 Z M 12 1.5 L 14.5 4 L 12 6.5 L 9.5 4 Z M 20 1.5 L 22.5 4 L 20 6.5 L 17.5 4 Z M 4 9.5 L 6.5 12 L 4 14.5 L 1.5 12 Z M 12 9.5 L 14.5 12 L 12 14.5 L 9.5 12 Z M 20 9.5 L 22.5 12 L 20 14.5 L 17.5 12 Z M 4 17.5 L 6.5 20 L 4 22.5 L 1.5 20 Z M 12 17.5 L 14.5 20 L 12 22.5 L 9.5 20 Z M 20 17.5 L 22.5 20 L 20 22.5 L 17.5 20 Z" />
        </svg>
      )
    },
    {
      id: 'cross',
      label: 'Crosses',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 3 1.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 11 1.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 19 1.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 3 9.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 11 9.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 19 9.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 3 17.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 11 17.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z M 19 17.5 h2 v1 h1 v2 h-1 v-1 h-2 v-1 h-1 v-2 h1 z" />
        </svg>
      )
    },
    {
      id: 'hearts',
      label: 'Hearts',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 4 6.2 C 2.5 4.5 1.5 3 2.5 2 C 3.2 1.3 4 2 4.5 2.5 C 5 2 5.8 1.3 6.5 2 C 7.5 3 6.5 4.5 5 6.2 Z M 12 6.2 C 10.5 4.5 9.5 3 10.5 2 C 11.2 1.3 12 2 12.5 2.5 C 13 2 13.8 1.3 14.5 2 C 15.5 3 14.5 4.5 13 6.2 Z M 20 6.2 C 18.5 4.5 17.5 3 18.5 2 C 19.2 1.3 20 2 20.5 2.5 C 21 2 21.8 1.3 22.5 2 C 23.5 3 22.5 4.5 21 6.2 Z M 4 14.2 C 2.5 12.5 1.5 11 2.5 10 C 3.2 9.3 4 10 4.5 10.5 C 5 10 5.8 9.3 6.5 10 C 7.5 11 6.5 12.5 5 14.2 Z M 12 14.2 C 10.5 12.5 9.5 11 10.5 10 C 11.2 9.3 12 10 12.5 10.5 C 13 10 13.8 9.3 14.5 10 C 15.5 11 14.5 12.5 13 14.2 Z M 20 14.2 C 18.5 12.5 17.5 11 18.5 10 C 19.2 9.3 20 10 20.5 10.5 C 21 10 21.8 9.3 22.5 10 C 23.5 11 22.5 12.5 21 14.2 Z M 4 22.2 C 2.5 20.5 1.5 19 2.5 18 C 3.2 17.3 4 18 4.5 18.5 C 5 18 5.8 17.3 6.5 18 C 7.5 19 6.5 20.5 5 22.2 Z M 12 22.2 C 10.5 20.5 9.5 19 10.5 18 C 11.2 17.3 12 18 12.5 18.5 C 13 18 13.8 17.3 14.5 18 C 15.5 19 14.5 20.5 13 22.2 Z M 20 22.2 C 18.5 20.5 17.5 19 18.5 18 C 19.2 17.3 20 18 20.5 18.5 C 21 18 21.8 17.3 22.5 18 C 23.5 19 22.5 20.5 21 22.2 Z" />
        </svg>
      )
    },
    {
      id: 'stars',
      label: 'Stars',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 4 1.5 Q 4 4 6.5 4 Q 4 4 4 6.5 Q 4 4 4 1.5 Z M 12 1.5 Q 12 4 14.5 4 Q 12 4 12 6.5 Q 12 4 9.5 4 Q 12 4 12 1.5 Z M 20 1.5 Q 20 4 22.5 4 Q 20 4 20 6.5 Q 20 4 17.5 4 Q 20 4 20 1.5 Z M 4 9.5 Q 4 12 6.5 12 Q 4 12 4 14.5 Q 4 12 1.5 12 Q 4 12 4 9.5 Z M 12 9.5 Q 12 12 14.5 12 Q 12 12 12 14.5 Q 12 12 9.5 12 Q 12 12 12 9.5 Z M 20 9.5 Q 20 12 22.5 12 Q 20 12 20 14.5 Q 20 12 17.5 12 Q 20 12 20 9.5 Z M 4 17.5 Q 4 20 6.5 20 Q 4 20 4 22.5 Q 4 20 1.5 20 Q 4 20 4 17.5 Z M 12 17.5 Q 12 20 14.5 20 Q 12 20 12 22.5 Q 12 20 9.5 20 Q 12 20 12 17.5 Z M 20 17.5 Q 20 20 22.5 20 Q 20 20 20 22.5 Q 20 20 17.5 20 Q 20 20 20 17.5 Z" />
        </svg>
      )
    },
    {
      id: 'liquid',
      label: 'Liquid',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="12" height="4" rx="2" />
          <rect x="10" y="10" width="12" height="4" rx="2" />
          <rect x="2" y="18" width="12" height="4" rx="2" />
          <rect x="18" y="2" width="4" height="12" rx="2" />
          <rect x="2" y="10" width="4" height="12" rx="2" />
        </svg>
      )
    },
    {
      id: 'h-lines',
      label: 'H-Lines',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="3" width="20" height="2.5" rx="1.25" />
          <rect x="2" y="11" width="20" height="2.5" rx="1.25" />
          <rect x="2" y="19" width="20" height="2.5" rx="1.25" />
        </svg>
      )
    },
    {
      id: 'v-lines',
      label: 'V-Lines',
      svg: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="2" width="2.5" height="20" rx="1.25" />
          <rect x="11" y="2" width="2.5" height="20" rx="1.25" />
          <rect x="19" y="2" width="2.5" height="20" rx="1.25" />
        </svg>
      )
    }
  ];

  // Eye styles lists
  const eyeStylesList = [
    {
      id: 'squares',
      label: 'Squares',
      svg: (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="18" height="18" rx="0.5" />
        </svg>
      )
    },
    {
      id: 'rounded',
      label: 'Rounded',
      svg: (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="18" height="18" rx="4" />
        </svg>
      )
    },
    {
      id: 'circle',
      label: 'Circle',
      svg: (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
    },
    {
      id: 'leaf',
      label: 'Leaf',
      svg: (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M 3 12 C 3 3 12 3 21 3 C 21 12 12 21 3 21 Z" />
        </svg>
      )
    },
    {
      id: 'shield',
      label: 'Shield',
      svg: (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M 3 3 h 18 v 9 C 21 17 17 21 12 21 C 7 21 3 17 3 12 Z" />
        </svg>
      )
    },
    {
      id: 'flower',
      label: 'Flower',
      svg: (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12,2 C10,2 9,4 8,4 C7,4 6,3 5,4 C4,5 4,7 4,8 C4,9 2,10 2,12 C2,14 4,15 4,16 C4,17 4,19 5,20 C6,21 7,20 8,20 C9,20 10,22 12,22 C14,22 15,20 16,20 C17,20 18,21 19,20 C20,19 20,17 20,16 C20,15 22,14 22,12 C22,10 20,9 20,8 C20,7 20,5 19,4 C18,3 17,4 16,4 C15,4 14,2 12,2 Z" />
        </svg>
      )
    }
  ];

  const eyeCentersList = [
    {
      id: 'squares',
      label: 'Squares',
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      )
    },
    {
      id: 'circle',
      label: 'Circle',
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5" />
        </svg>
      )
    },
    {
      id: 'leaf',
      label: 'Leaf',
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 6 12 C 6 6 12 6 18 6 C 18 12 12 18 6 18 Z" />
        </svg>
      )
    },
    {
      id: 'diamonds',
      label: 'Diamonds',
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 12 4 L 20 12 L 12 20 L 4 12 Z" />
        </svg>
      )
    },
    {
      id: 'stars',
      label: 'Stars',
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 12 2 Q 12 12 22 12 Q 12 12 12 22 Q 12 12 2 12 Q 12 12 12 2 Z" />
        </svg>
      )
    },
    {
      id: 'hearts',
      label: 'Hearts',
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 12 20 C 6 14 3 9.5 4.5 6 C 5.5 3.5 8 5 12 7.5 C 16 5 18.5 3.5 19.5 6 C 21 9.5 18 14 12 20 Z" />
        </svg>
      )
    },
    {
      id: 'cross',
      label: 'Plus',
      svg: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M 10 3 h4 v7 h7 v4 h-7 v-7 h-4 v-7 h-7 v-4 h7 z" />
        </svg>
      )
    }
  ];

  // Bulk Pagination variables
  const totalBulkPages = Math.ceil(bulkItems.length / itemsPerPage);
  const startBulkIdx = (bulkPage - 1) * itemsPerPage;
  const paginatedBulkItems = bulkItems.slice(startBulkIdx, startBulkIdx + itemsPerPage);

  const isBulkActive = activeTab === 'bulk';

  // FAQs data list
  const faqs = [
    {
      q: 'Are the generated QR codes private?',
      a: 'Absolutely. All compiling and rendering take place strictly inside your browser environment completely client-side. Your inputs, CSV files, and contents are never uploaded to any server, offering absolute privacy.'
    },
    {
      q: 'Can I use these QR codes for commercial projects?',
      a: 'Yes, 100%. All custom vector QR codes downloaded from this suite can be used for branding, printing, packaging, and commercial campaigns. There are no licenses, hidden royalties, or restrictions.'
    },
    {
      q: 'How does the Bulk QR Code generator work?',
      a: 'In the Bulk QR tab, you can enter data line-by-line or drag-and-drop a CSV file. Once loaded, choose which column holds the QR data payloads and (optionally) which column defines the downloaded filenames. The generator will render all of them and package them in a clean ZIP archive!'
    },
    {
      q: 'Is there a limit on bulk generation?',
      a: 'Because the suite compiles codes locally inside browser memory, there are no software limits. However, to maintain peak browser performance, we suggest keeping CSV batches under 1,000 items at a time.'
    },
    {
      q: 'Which file format (PNG or SVG) should I download?',
      a: 'Download PNG images for immediate digital sharing (websites, presentations, social media). Download vector SVGs for professional printing, large-format banners, and editing inside graphic design applications (Illustrator, Figma).'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">

      <Navbar
        page={page}
        setPage={setPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* ==========================================
          Main View Controller
          ========================================== */}
      <main className="flex-grow">

        {/* 1. VIEW: QR Suite Generator Workspace */}
        {page === 'generator' && (
          <section className="py-12 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Header Info */}
              <div className="max-w-3xl mb-12 space-y-3">
                <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                  Premium QR Code Generator
                </h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400">
                  Build custom vector QR codes in real-time. Choose professional frames, eye patterns, and custom palettes with absolute data privacy.
                </p>
              </div>

              {/* Editor Workspace Column Grid */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">

                {/* Left side settings: expanded if bulk tab is chosen */}
                <div className={`${isBulkActive ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-6`}>

                  {/* Category selector */}
                  <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-3xl p-5 shadow-xs transition-all">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4.5 pl-1.5">Select QR Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center justify-center py-4 px-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${isActive
                              ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-750 scale-[1.02]'
                              : 'bg-slate-50 dark:bg-zinc-950/80 hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                              }`}
                          >
                            <Icon className="h-5 w-5 mb-2" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input payloads Card */}
                  <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">

                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800/50">
                      <div className="h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Sliders className="h-4.5 w-4.5" />
                      </div>
                      <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">
                        {isBulkActive ? 'Configure Bulk Generation' : 'Configure QR Content'}
                      </h2>
                    </div>

                    {/* QR Form Types */}
                    {activeTab === 'url' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Link / URL Settings</h3>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Website URL</label>
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'text' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Plain Text Settings</h3>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase block pl-1">QR Code Text Payload</label>
                          <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type plain text here..."
                            rows={4}
                            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'email' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Email QR Configuration</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Recipient Email</label>
                            <input
                              type="email"
                              value={emailTo}
                              onChange={(e) => setEmailTo(e.target.value)}
                              placeholder="hello@3xtools.app"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Subject</label>
                            <input
                              type="text"
                              value={emailSub}
                              onChange={(e) => setEmailSub(e.target.value)}
                              placeholder="Inquiry"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Email Body</label>
                          <textarea
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            placeholder="Write message..."
                            rows={3}
                            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'phone' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Phone Configuration</h3>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+123456789"
                            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'sms' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">SMS Configuration</h3>
                        <div className="grid sm:grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Phone Number</label>
                            <input
                              type="tel"
                              value={smsPhone}
                              onChange={(e) => setSmsPhone(e.target.value)}
                              placeholder="+123456789"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Message Text</label>
                            <textarea
                              value={smsText}
                              onChange={(e) => setSmsText(e.target.value)}
                              placeholder="Type SMS body here..."
                              rows={3}
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'whatsapp' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">WhatsApp Settings</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Phone Number (with Country Code)</label>
                            <input
                              type="tel"
                              value={waPhone}
                              onChange={(e) => setWaPhone(e.target.value)}
                              placeholder="94771234567"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Prefilled Text Message</label>
                            <textarea
                              value={waText}
                              onChange={(e) => setWaText(e.target.value)}
                              placeholder="Hello! I would like to inquire about..."
                              rows={3}
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'wifi' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Wi-Fi Connection Details</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Network Name / SSID</label>
                            <input
                              type="text"
                              value={wifiSsid}
                              onChange={(e) => setWifiSsid(e.target.value)}
                              placeholder="HomeWifi"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Security Encryption Type</label>
                            <select
                              value={wifiType}
                              onChange={(e) => setWifiType(e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            >
                              <option value="WPA">WPA/WPA2</option>
                              <option value="WEP">WEP</option>
                              <option value="nopass">None / Unsecured</option>
                            </select>
                          </div>
                        </div>
                        {wifiType !== 'nopass' && (
                          <div className="space-y-2 transition-all duration-300">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Network Password</label>
                            <input
                              type="password"
                              value={wifiPass}
                              onChange={(e) => setWifiPass(e.target.value)}
                              placeholder="••••••••"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'vcard' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">vCard Contact File Details</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Contact Full Name</label>
                            <input
                              type="text"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="Alex Carter"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Organization / Title</label>
                            <input
                              type="text"
                              value={cardOrg}
                              onChange={(e) => setCardOrg(e.target.value)}
                              placeholder="3xtools Inc"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Telephone / Phone</label>
                            <input
                              type="tel"
                              value={cardPhone}
                              onChange={(e) => setCardPhone(e.target.value)}
                              placeholder="+123456789"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Email Address</label>
                            <input
                              type="email"
                              value={cardEmail}
                              onChange={(e) => setCardEmail(e.target.value)}
                              placeholder="alex@example.com"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Website URL</label>
                            <input
                              type="url"
                              value={cardUrl}
                              onChange={(e) => setCardUrl(e.target.value)}
                              placeholder="https://example.com"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Physical Address</label>
                            <input
                              type="text"
                              value={cardAddr}
                              onChange={(e) => setCardAddr(e.target.value)}
                              placeholder="Silicon Valley, CA"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'location' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Geographic Coordinates</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Latitude</label>
                            <input
                              type="text"
                              value={locLat}
                              onChange={(e) => setLocLat(e.target.value)}
                              placeholder="37.7749"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Longitude</label>
                            <input
                              type="text"
                              value={locLng}
                              onChange={(e) => setLocLng(e.target.value)}
                              placeholder="-122.4194"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'event' && (
                      <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Event Details</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Event Title</label>
                            <input
                              type="text"
                              value={evtTitle}
                              onChange={(e) => setEvtTitle(e.target.value)}
                              placeholder="Product Launch"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Location / Venue</label>
                            <input
                              type="text"
                              value={evtLoc}
                              onChange={(e) => setEvtLoc(e.target.value)}
                              placeholder="San Francisco, CA"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Start Time (UTC)</label>
                            <input
                              type="datetime-local"
                              value={evtStart}
                              onChange={(e) => setEvtStart(e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">End Time (UTC)</label>
                            <input
                              type="datetime-local"
                              value={evtEnd}
                              onChange={(e) => setEvtEnd(e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bulk Generation View */}
                    {isBulkActive && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center pb-2">
                          <h3 className="font-outfit font-bold text-lg text-slate-800 dark:text-zinc-150">Bulk Payload Settings</h3>
                          <div className="flex rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800 p-1">
                            <button
                              onClick={() => setBulkInputMode('text')}
                              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${bulkInputMode === 'text'
                                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200'
                                }`}
                            >
                              Line-by-Line List
                            </button>
                            <button
                              onClick={() => setBulkInputMode('csv')}
                              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${bulkInputMode === 'csv'
                                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200'
                                }`}
                            >
                              CSV File Upload
                            </button>
                          </div>
                        </div>

                        {bulkInputMode === 'text' ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase block pl-1">QR List (One payload per line)</label>
                              <textarea
                                value={bulkTextList}
                                onChange={(e) => setBulkTextList(e.target.value)}
                                placeholder="https://example1.com&#10;https://example2.com&#10;Product 3 Text Payload"
                                rows={6}
                                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all resize-none"
                              />
                            </div>
                            <div className="space-y-2 max-w-sm">
                              <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Default file prefix</label>
                              <input
                                type="text"
                                value={bulkDefaultPrefix}
                                onChange={(e) => setBulkDefaultPrefix(e.target.value)}
                                placeholder="bulk-qr"
                                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3 text-sm outline-none transition-all"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl p-8 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer flex flex-col items-center justify-center text-center relative bg-slate-50/20 dark:bg-zinc-950/20">
                              <input
                                type="file"
                                accept=".csv"
                                onChange={handleCsvUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                              <Upload className="h-10 w-10 text-slate-400 mb-3" />
                              <h4 className="text-sm font-bold text-slate-700 dark:text-zinc-250">
                                {bulkCsvFilename ? `Selected: ${bulkCsvFilename}` : 'Upload your CSV File'}
                              </h4>
                              <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-normal">
                                Drag and drop your file or click anywhere inside to browse.
                              </p>
                            </div>

                            {bulkCsvData.length > 0 && (
                              <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800/40 animate-fade-in">
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-slate-400 uppercase block pl-1">QR Data Column</label>
                                  <select
                                    value={bulkQrCol}
                                    onChange={(e) => setBulkQrCol(parseInt(e.target.value, 10))}
                                    className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3 text-xs outline-none"
                                  >
                                    {bulkHeaders.map((header, i) => (
                                      <option key={i} value={i}>
                                        Col {i + 1}: {header}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Label/Filename Column</label>
                                  <select
                                    value={bulkLabelCol}
                                    onChange={(e) => setBulkLabelCol(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3 text-xs outline-none"
                                  >
                                    <option value="none">Auto-increment (Prefix + Count)</option>
                                    {bulkHeaders.map((header, i) => (
                                      <option key={i} value={i}>
                                        Col {i + 1}: {header}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Frame Text Column</label>
                                  <select
                                    value={bulkFrameTextCol}
                                    onChange={(e) => setBulkFrameTextCol(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3 text-xs outline-none"
                                  >
                                    <option value="none">Global Default ({frameText})</option>
                                    {bulkHeaders.map((header, i) => (
                                      <option key={i} value={i}>
                                        Col {i + 1}: {header}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Prefix (If Auto-increment)</label>
                                  <input
                                    type="text"
                                    value={bulkDefaultPrefix}
                                    onChange={(e) => setBulkDefaultPrefix(e.target.value)}
                                    placeholder="bulk-qr"
                                    disabled={bulkLabelCol !== 'none'}
                                    className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3 text-xs outline-none disabled:opacity-50"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="pt-4 flex flex-wrap gap-4">
                          <button
                            onClick={generateBulkQRs}
                            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-750 active:scale-95 text-white font-bold text-sm transition-all cursor-pointer shadow-md flex items-center gap-2"
                          >
                            <QrCode className="h-4.5 w-4.5" />
                            <span>Generate Bulk QR Codes</span>
                          </button>

                          {bulkItems.length > 0 && (
                            <button
                              onClick={downloadAllPngsZip}
                              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm transition-all cursor-pointer shadow-md flex items-center gap-2"
                            >
                              <Archive className="h-4.5 w-4.5" />
                              <span>Download All QRs (.ZIP)</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* 3. Custom Frames Configuration Panel */}
                  <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">

                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800/50">
                      <div className="h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Layout className="h-4.5 w-4.5" />
                      </div>
                      <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">Choose Frame Wrapper</h2>
                    </div>

                    {/* Grid of Frames mockups */}
                    <div className="grid grid-cols-3 sm:grid-cols-9 gap-3">

                      {/* No Frame */}
                      <button
                        onClick={() => setFrameStyle('no-frame')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'no-frame'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="No Frame"
                      >
                        <span className="text-xl mb-1.5 text-slate-400 select-none">✕</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider">No Frame</span>
                      </button>

                      {/* Bottom Banner */}
                      <button
                        onClick={() => setFrameStyle('bottom-banner')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'bottom-banner'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Bot Banner"
                      >
                        <div className="w-8 h-8 border border-current rounded-md relative flex items-end justify-center mb-1">
                          <div className="w-full h-2.5 bg-current rounded-b-[2px]"></div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Bot Banner</span>
                      </button>

                      {/* Top Banner */}
                      <button
                        onClick={() => setFrameStyle('top-banner')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'top-banner'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Top Banner"
                      >
                        <div className="w-8 h-8 border border-current rounded-md relative flex items-start justify-center mb-1">
                          <div className="w-full h-2.5 bg-current rounded-t-[2px]"></div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Top Banner</span>
                      </button>

                      {/* Bottom Accent */}
                      <button
                        onClick={() => setFrameStyle('bottom-accent')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'bottom-accent'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Accents"
                      >
                        <div className="w-8 h-8 relative flex flex-col items-center justify-end mb-1">
                          <div className="w-6 h-0.5 bg-current"></div>
                          <div className="flex justify-between w-6 mt-0.5">
                            <div className="w-1 h-1 bg-current rotate-45"></div>
                            <div className="w-1 h-1 bg-current rotate-45"></div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Accents</span>
                      </button>

                      {/* Borders frame */}
                      <button
                        onClick={() => setFrameStyle('border-banner')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'border-banner'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Borders"
                      >
                        <div className="w-8 h-8 border-2 border-current rounded-md relative flex items-end justify-center mb-1 p-0.5">
                          <div className="w-full h-2 bg-current rounded-xs"></div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Borders</span>
                      </button>

                      {/* Ribbon Bottom */}
                      <button
                        onClick={() => setFrameStyle('ribbon-bottom')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'ribbon-bottom'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Ribbon Bot"
                      >
                        <div className="w-8 h-8 relative flex flex-col items-center justify-end mb-1">
                          <div className="w-5 h-2.5 bg-current relative flex items-center justify-between">
                            <div className="w-1 h-2 bg-slate-300 dark:bg-zinc-700 absolute left-[-3px] rotate-45"></div>
                            <div className="w-1 h-2 bg-slate-300 dark:bg-zinc-700 absolute right-[-3px] -rotate-45"></div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Ribbon Bot</span>
                      </button>

                      {/* Ribbon Top */}
                      <button
                        onClick={() => setFrameStyle('ribbon-top')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'ribbon-top'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Ribbon Top"
                      >
                        <div className="w-8 h-8 relative flex flex-col items-center justify-start mb-1">
                          <div className="w-5 h-2.5 bg-current relative flex items-center justify-between">
                            <div className="w-1 h-2 bg-slate-300 dark:bg-zinc-700 absolute left-[-3px] rotate-45"></div>
                            <div className="w-1 h-2 bg-slate-300 dark:bg-zinc-700 absolute right-[-3px] -rotate-45"></div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Ribbon Top</span>
                      </button>

                      {/* Smartphone mockup */}
                      <button
                        onClick={() => setFrameStyle('phone-mockup')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'phone-mockup'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Phone"
                      >
                        <div className="w-5 h-8 border-2 border-current rounded-lg relative flex flex-col items-center justify-between mb-1 py-0.5">
                          <div className="w-2 h-0.5 bg-current rounded-full"></div>
                          <div className="w-3.5 h-4.5 bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-xs"></div>
                          <div className="w-2 h-0.5 bg-current rounded-full"></div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Phone</span>
                      </button>

                      {/* Clapperboard */}
                      <button
                        onClick={() => setFrameStyle('clapperboard')}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer ${frameStyle === 'clapperboard'
                          ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-600'
                          : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500'
                          }`}
                        title="Cinema"
                      >
                        <div className="w-8 h-8 border border-current rounded-md relative flex flex-col items-center justify-start mb-1 overflow-hidden">
                          <div className="w-full h-2.5 bg-current flex justify-between px-0.5 py-0.5">
                            <span className="w-0.5 h-1.5 bg-white rotate-12"></span>
                            <span className="w-0.5 h-1.5 bg-white rotate-12"></span>
                            <span className="w-0.5 h-1.5 bg-white rotate-12"></span>
                          </div>
                          <div className="w-full h-full bg-slate-300 dark:bg-zinc-700 opacity-0"></div>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Cinema</span>
                      </button>

                    </div>

                    {/* Frame Settings Inputs */}
                    {frameStyle !== 'no-frame' && (
                      <div className="pt-6 border-t border-slate-150 dark:border-zinc-800/50 grid sm:grid-cols-2 gap-6 transition-all duration-300">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Frame label</label>
                            <input
                              type="text"
                              value={frameText}
                              onChange={(e) => setFrameText(e.target.value)}
                              placeholder="SCAN ME"
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">
                              Text Size (<span className="text-slate-600 dark:text-zinc-300">{frameTextSize}%</span>)
                            </label>
                            <input
                              type="range"
                              min="50"
                              max="150"
                              value={frameTextSize}
                              onChange={(e) => setFrameTextSize(parseInt(e.target.value, 10))}
                              className="w-full h-1.5 bg-slate-200 dark:bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Label font</label>
                            <select
                              value={frameFont}
                              onChange={(e) => setFrameFont(e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3.5 text-sm outline-none transition-all"
                            >
                              <option value="Outfit">Outfit (Default)</option>
                              <option value="AbrilFatface">Abril Fatface (Elegant Bold)</option>
                              <option value="Inter">Inter (Clean Sans)</option>
                              <option value="Montserrat">Montserrat (Geometric)</option>
                              <option value="Playfair">Playfair Display (Classy Serif)</option>
                            </select>
                          </div>

                          <div className="space-y-3.5 pt-1.5">
                            <label className="flex items-center gap-3 cursor-pointer select-none text-slate-600 dark:text-zinc-400">
                              <input
                                type="checkbox"
                                checked={customFrameColor}
                                onChange={(e) => setCustomFrameColor(e.target.checked)}
                                className="rounded border-slate-300 text-indigo-605 focus:ring-indigo-500 h-4.5 w-4.5 accent-indigo-600"
                              />
                              <span className="text-xs font-bold uppercase tracking-wider">Custom frame color</span>
                            </label>
                            {customFrameColor && (
                              <div className="flex items-center gap-3 transition-all duration-300">
                                <input
                                  type="color"
                                  value={frameColor}
                                  onChange={(e) => setFrameColor(e.target.value)}
                                  className="h-10 w-10 border-0 p-0 rounded-xl cursor-pointer bg-transparent"
                                />
                                <input
                                  type="text"
                                  value={frameColor}
                                  onChange={(e) => setFrameColor(e.target.value)}
                                  className="text-sm p-2 w-28 bg-slate-50/50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-zinc-200"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4. Custom Patterns & Markers Panel */}
                  <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">

                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800/50">
                      <div className="h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <QrCode className="h-4.5 w-4.5" />
                      </div>
                      <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">Pattern & Eyes</h2>
                    </div>

                    {/* 4.1 Pixel Pattern (Graphical SVGs with Labels) */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-outfit font-bold text-slate-800 dark:text-zinc-150">Foreground Pattern Style</h3>
                        <p className="text-[11px] text-slate-400">Choose the shape style for foreground data modules</p>
                      </div>
                      <div className="flex flex-wrap gap-3.5">
                        {patternsList.map((pat) => (
                          <button
                            key={pat.id}
                            onClick={() => setPattern(pat.id)}
                            className={`w-20 h-20 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 focus:outline-none ${pattern === pat.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/10'
                              : 'border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-350 hover:bg-slate-105/50 dark:hover:bg-zinc-900/50'
                              }`}
                            title={pat.label}
                          >
                            <div className="shrink-0">{pat.svg}</div>
                            <span className="text-[9px] font-bold uppercase tracking-wider select-none truncate max-w-full px-1">{pat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4.2 Eye Border Style (Graphical SVGs with Labels) */}
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                      <div>
                        <h3 className="font-outfit font-bold text-slate-800 dark:text-zinc-150">Eye Border Style</h3>
                        <p className="text-[11px] text-slate-400">Customize the outer frame of the corner locator markers</p>
                      </div>
                      <div className="flex flex-wrap gap-3.5">
                        {eyeStylesList.map((eye) => (
                          <button
                            key={eye.id}
                            onClick={() => setEyeStyle(eye.id)}
                            className={`w-20 h-20 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 focus:outline-none ${eyeStyle === eye.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/10'
                              : 'border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-350 hover:bg-slate-105/50 dark:hover:bg-zinc-900/50'
                              }`}
                            title={eye.label}
                          >
                            <div className="shrink-0">{eye.svg}</div>
                            <span className="text-[9px] font-bold uppercase tracking-wider select-none truncate max-w-full px-1">{eye.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4.3 Eye Pupil Style (Graphical SVGs with Labels) */}
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                      <div>
                        <h3 className="font-outfit font-bold text-slate-800 dark:text-zinc-150">Eye Center Style</h3>
                        <p className="text-[11px] text-slate-400">Customize the inner pupil dot of the corner locator markers</p>
                      </div>
                      <div className="flex flex-wrap gap-3.5">
                        {eyeCentersList.map((ctr) => (
                          <button
                            key={ctr.id}
                            onClick={() => setEyeCenter(ctr.id)}
                            className={`w-20 h-20 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 focus:outline-none ${eyeCenter === ctr.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/10'
                              : 'border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-350 hover:bg-slate-105/50 dark:hover:bg-zinc-900/50'
                              }`}
                            title={ctr.label}
                          >
                            <div className="shrink-0">{ctr.svg}</div>
                            <span className="text-[9px] font-bold uppercase tracking-wider select-none truncate max-w-full px-1">{ctr.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4.4 Custom Marker Colors */}
                    <div className="pt-6 border-t border-slate-100 dark:border-zinc-800/50 grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer select-none text-slate-600 dark:text-zinc-400">
                          <input
                            type="checkbox"
                            checked={customMarkerColor}
                            onChange={(e) => setCustomMarkerColor(e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4.5 w-4.5 accent-indigo-600"
                          />
                          <span className="text-xs font-bold uppercase tracking-wider">Custom eye border color</span>
                        </label>
                        {customMarkerColor && (
                          <div className="flex items-center gap-3 transition-all duration-300">
                            <input
                              type="color"
                              value={markerBorderColor}
                              onChange={(e) => setMarkerBorderColor(e.target.value)}
                              className="h-10 w-10 border-0 p-0 rounded-xl cursor-pointer bg-transparent"
                            />
                            <input
                              type="text"
                              value={markerBorderColor}
                              onChange={(e) => setMarkerBorderColor(e.target.value)}
                              className="text-sm p-2 w-28 bg-slate-50/50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-zinc-200"
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer select-none text-slate-600 dark:text-zinc-400">
                          <input
                            type="checkbox"
                            checked={customCenterColor}
                            onChange={(e) => setCustomCenterColor(e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4.5 w-4.5 accent-indigo-600"
                          />
                          <span className="text-xs font-bold uppercase tracking-wider">Custom eye center color</span>
                        </label>
                        {customCenterColor && (
                          <div className="flex items-center gap-3 transition-all duration-300">
                            <input
                              type="color"
                              value={markerCenterColor}
                              onChange={(e) => setMarkerCenterColor(e.target.value)}
                              className="h-10 w-10 border-0 p-0 rounded-xl cursor-pointer bg-transparent"
                            />
                            <input
                              type="text"
                              value={markerCenterColor}
                              onChange={(e) => setMarkerCenterColor(e.target.value)}
                              className="text-sm p-2 w-28 bg-slate-50/50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-zinc-200"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* 5. Color Palette panel */}
                  <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">

                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800/50">
                      <div className="h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Palette className="h-4.5 w-4.5" />
                      </div>
                      <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">Color Palette & Sizing</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Foreground / QR Color</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="h-10 w-10 border-0 p-0 rounded-xl cursor-pointer bg-transparent"
                          />
                          <input
                            type="text"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3 outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Background Color</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="h-10 w-10 border-0 p-0 rounded-xl cursor-pointer bg-transparent"
                          />
                          <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-200 p-3 outline-none transition-all text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 pt-6 mt-6 border-t border-slate-100 dark:border-zinc-800/50">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase block pl-1">
                          Margin / Quiet Zone Size (<span className="text-slate-600 dark:text-zinc-300">{margin}</span>)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="6"
                          value={margin}
                          onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                          className="w-full h-1.5 bg-slate-200 dark:bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase block pl-1">Error Correction Capability</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['L', 'M', 'Q', 'H'].map((lvl) => {
                            const labelMap = { L: 'L (7%)', M: 'M (15%)', Q: 'Q (25%)', H: 'H (30%)' };
                            const isSelected = ecLevel === lvl;
                            return (
                              <button
                                key={lvl}
                                onClick={() => setEcLevel(lvl)}
                                className={`py-2.5 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${isSelected
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                  : 'bg-slate-50 dark:bg-zinc-950/50 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-350 hover:bg-slate-100 dark:hover:bg-zinc-900'
                                  }`}
                              >
                                {labelMap[lvl]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* 6. Dynamic Previews Gallery (Visible only when bulk items generated) */}
                  {isBulkActive && bulkItems.length > 0 && (
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 dark:border-zinc-800/50 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Layers className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">Generated Bulk Gallery</h2>
                            <p className="text-xs text-slate-400">Showing {startBulkIdx + 1} - {Math.min(startBulkIdx + itemsPerPage, bulkItems.length)} of {bulkItems.length} codes</p>
                          </div>
                        </div>

                        <button
                          onClick={downloadAllPngsZip}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                        >
                          <Archive className="h-4 w-4" />
                          <span>Download All QRs (.ZIP)</span>
                        </button>
                      </div>

                      {/* Paginated Cards Grid (Passing down frames properties!) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {paginatedBulkItems.map((item, i) => (
                          <BulkQrCard
                            key={startBulkIdx + i}
                            item={item}
                            index={startBulkIdx + i}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            margin={margin}
                            ecLevel={ecLevel}
                            pattern={pattern}
                            eyeStyle={eyeStyle}
                            eyeCenter={eyeCenter}
                            customMarkerColor={customMarkerColor}
                            markerBorderColor={markerBorderColor}
                            customCenterColor={customCenterColor}
                            markerCenterColor={markerCenterColor}
                            frameStyle={frameStyle}
                            frameText={frameText}
                            frameFont={frameFont}
                            frameTextSize={frameTextSize}
                            customFrameColor={customFrameColor}
                            frameColor={frameColor}
                            frameTextColor={frameTextColor}
                            onDownloadSuccess={() => setShowCoffeeModal(true)}
                          />
                        ))}
                      </div>
                      {/* Pagination Controls */}
                      {totalBulkPages > 1 && (
                        <div className="flex items-center justify-center gap-3 pt-6 border-t border-slate-100 dark:border-zinc-800/40">
                          <button
                            onClick={() => setBulkPage(Math.max(1, bulkPage - 1))}
                            disabled={bulkPage === 1}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:scale-100 active:scale-95 cursor-pointer transition-all"
                          >
                            <ChevronLeft className="h-4.5 w-4.5" />
                          </button>

                          <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 select-none">
                            Page {bulkPage} of {totalBulkPages}
                          </span>

                          <button
                            onClick={() => setBulkPage(Math.min(totalBulkPages, bulkPage + 1))}
                            disabled={bulkPage === totalBulkPages}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:scale-100 active:scale-95 cursor-pointer transition-all"
                          >
                            <ChevronRight className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Right Column: Live Floating Preview & Actions (Hidden in Bulk tab) */}
                {!isBulkActive && (
                  <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 animate-fade-in">

                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-center justify-between text-center relative overflow-hidden transition-all duration-300">

                      <div className="w-full pb-4 mb-4.5 border-b border-slate-100 dark:border-zinc-800/50 flex items-center justify-center gap-2">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                        <h2 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">Live QR Preview</h2>
                      </div>

                      <div className="p-4 bg-white rounded-3xl border border-slate-200/50 shadow-inner flex items-center justify-center max-w-full overflow-hidden relative min-h-[300px] w-full">
                        {!qrLoaded && (
                          <div className="absolute inset-0 bg-white/95 dark:bg-zinc-900/95 flex flex-col items-center justify-center p-6 space-y-3 z-30">
                            <div className="h-9 w-9 rounded-full border-4 border-indigo-600/30 border-t-indigo-600 animate-spin"></div>
                            <p className="text-xs font-bold text-slate-700 dark:text-zinc-200">Initializing Local Engine...</p>
                          </div>
                        )}
                        <canvas ref={canvasRef} id="qr-canvas" className="max-w-full rounded-2xl shadow-xs transition-all duration-300"></canvas>
                      </div>

                      <p className="text-[10px] text-slate-400 mt-4 leading-relaxed max-w-[240px]">
                        Generated 100% locally on your browser. Your data never leaves your device.
                      </p>

                      <div className="grid grid-cols-2 gap-3.5 w-full mt-6">
                        <button
                          onClick={downloadPng}
                          disabled={!qrLoaded}
                          className="flex items-center justify-center gap-2 px-4.5 py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-600/15 disabled:opacity-50 disabled:scale-100 transition-all duration-200 cursor-pointer"
                        >
                          <ArrowDown className="h-4.5 w-4.5" />
                          <span>PNG Image</span>
                        </button>

                        <button
                          onClick={downloadSvg}
                          disabled={!qrLoaded}
                          className="flex items-center justify-center gap-2 px-4.5 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-250 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-zinc-700 active:scale-95 border border-slate-200/50 dark:border-zinc-750 disabled:opacity-50 disabled:scale-100 transition-all duration-200 cursor-pointer"
                        >
                          <ArrowDown className="h-4.5 w-4.5" />
                          <span>Vector SVG</span>
                        </button>
                      </div>

                      <button
                        onClick={printQr}
                        disabled={!qrLoaded}
                        className="w-full flex items-center justify-center gap-2.5 px-4 py-3 mt-3.5 rounded-2xl border border-slate-200/70 dark:border-zinc-750 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-660 dark:text-zinc-300 font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:scale-100 active:scale-[0.98]"
                      >
                        <Printer className="h-4.5 w-4.5" />
                        <span>Print QR Code</span>
                      </button>

                    </div>

                  </div>
                )}

              </div>

            </div>
          </section>
        )}

        {page === 'faq' && (
          <FAQPage
            expandedFaqIndex={expandedFaqIndex}
            setExpandedFaqIndex={setExpandedFaqIndex}
          />
        )}

        {page === 'help' && <HelpPage />}

        {page === 'tools' && <ToolsPage />}

      </main>

      <Footer
        setPage={setPage}
        setShowCoffeeModal={setShowCoffeeModal}
      />

      <CoffeeModal
        showCoffeeModal={showCoffeeModal}
        setShowCoffeeModal={setShowCoffeeModal}
      />

    </div>
  );
}

export default App;
