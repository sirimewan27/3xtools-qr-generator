import { CONFIG } from '../config';
import { QrCode, Sun, Moon, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <header className="bg-background/80 backdrop-blur-md text-foreground border-b border-border sticky top-0 z-40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo Brand */}
          <button
            onClick={() => setPage('generator')}
            className="flex items-center gap-2.5 hover:opacity-90 cursor-pointer text-left focus:outline-none"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
              <QrCode className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight select-none text-foreground">
              {CONFIG.brand.logoText} <span className="text-primary font-medium">{CONFIG.brand.subText}</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setPage('generator')}
              className={`hover:text-primary transition-colors cursor-pointer focus:outline-none py-1 ${page === 'generator' ? 'text-primary border-b-2 border-primary font-extrabold' : 'text-muted-foreground'}`}
            >
              Home
            </button>
            <button
              onClick={() => setPage('faq')}
              className={`hover:text-primary transition-colors cursor-pointer focus:outline-none py-1 ${page === 'faq' ? 'text-primary border-b-2 border-primary font-extrabold' : 'text-muted-foreground'}`}
            >
              FAQs
            </button>
            <button
              onClick={() => setPage('help')}
              className={`hover:text-primary transition-colors cursor-pointer focus:outline-none py-1 ${page === 'help' ? 'text-primary border-b-2 border-primary font-extrabold' : 'text-muted-foreground'}`}
            >
              Help & Support
            </button>
            <button
              onClick={() => setPage('tools')}
              className={`hover:text-primary transition-colors cursor-pointer focus:outline-none py-1 ${page === 'tools' ? 'text-primary border-b-2 border-primary font-extrabold' : 'text-muted-foreground'}`}
            >
              Other Tools
            </button>
          </nav>

          {/* Theme mode & Menu Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full cursor-pointer h-9 w-9"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-primary" />}
            </Button>

            {/* Mobile Hamburger Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden rounded-lg cursor-pointer h-9 w-9"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-md border-b border-border shadow-lg z-35 py-4 px-6 space-y-2">
          <button
            onClick={() => { setPage('generator'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'generator' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
          >
            Home / QR Designer
          </button>
          <button
            onClick={() => { setPage('faq'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'faq' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
          >
            FAQs
          </button>
          <button
            onClick={() => { setPage('help'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'help' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
          >
            Help & Support
          </button>
          <button
            onClick={() => { setPage('tools'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all block cursor-pointer ${page === 'tools' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
          >
            Other Tools
          </button>
        </div>
      )}
    </>
  );
}
