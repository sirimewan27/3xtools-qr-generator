import { CONFIG } from '../config';
import { QrCode, Sun, Moon, X, Menu } from 'lucide-react';

export default function Navbar({
  page,
  setPage,
  darkMode,
  setDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  return (
    <>
      {/* ==========================================
          Premium Solid Navbar
          ========================================== */}
      <header className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs text-slate-800 dark:text-zinc-200 shadow-sm z-40 sticky top-0 border-b border-slate-200/60 dark:border-zinc-800/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo Brand */}
          <button
            onClick={() => setPage('generator')}
            className="flex items-center gap-2.5 hover:opacity-90 cursor-pointer text-left focus:outline-none"
          >
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <QrCode className="h-5 w-5" />
            </div>
            <span className="font-outfit font-extrabold text-lg tracking-tight select-none text-slate-900 dark:text-white">
              {CONFIG.brand.logoText} <span className="text-indigo-600 dark:text-indigo-400 font-medium">{CONFIG.brand.subText}</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setPage('generator')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer focus:outline-none py-1 ${page === 'generator' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-555 dark:text-zinc-400'}`}
            >
              Home
            </button>
            <button
              onClick={() => setPage('faq')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer focus:outline-none py-1 ${page === 'faq' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-555 dark:text-zinc-400'}`}
            >
              FAQs
            </button>
            <button
              onClick={() => setPage('help')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer focus:outline-none py-1 ${page === 'help' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-555 dark:text-zinc-400'}`}
            >
              Help & Support
            </button>
            <button
              onClick={() => setPage('tools')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer focus:outline-none py-1 ${page === 'tools' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-555 dark:text-zinc-400'}`}
            >
              Other Tools
            </button>
          </nav>

          {/* Theme mode & Menu Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 cursor-pointer transition-all focus:outline-none"
              title="Toggle system theme"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-indigo-600" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-750 cursor-pointer transition-all focus:outline-none"
              title="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-4.5 w-4.5 animate-fade-in" /> : <Menu className="h-4.5 w-4.5 animate-fade-in" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-slate-200/60 dark:border-zinc-800/60 shadow-lg z-35 py-4 px-6 animate-fade-in space-y-2.5">
          <button
            onClick={() => { setPage('generator'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-3 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'generator' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-655 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60'}`}
          >
            Home / QR Designer
          </button>
          <button
            onClick={() => { setPage('faq'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-3 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'faq' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-655 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60'}`}
          >
            FAQs
          </button>
          <button
            onClick={() => { setPage('help'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-3 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'help' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-655 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60'}`}
          >
            Help & Support
          </button>
          <button
            onClick={() => { setPage('tools'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-3 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'tools' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-655 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60'}`}
          >
            Other Tools
          </button>
        </div>
      )}
    </>
  );
}
