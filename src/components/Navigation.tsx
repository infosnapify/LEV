import React, { useState } from 'react';
import { ViewPage, Category } from '../types';
import { categories } from '../data/blogData';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  Compass,
  Info,
  PhoneCall,
  Sparkles,
  BookOpen,
  Clock,
  User,
  Video,
  Image as ImageIcon,
  Flame,
  TrendingUp,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { useAd } from '../context/AdContext';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  currentView: ViewPage;
  setView: (page: ViewPage) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export default function Navigation({ currentView, setView, isDarkMode, setIsDarkMode }: NavigationProps) {
  const { triggerAd } = useAd();
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="h-4 w-4" />;
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Sparkles': return <Sparkles className="h-4 w-4" />;
      case 'TrendingUp': return <TrendingUp className="h-4 w-4" />;
      case 'Compass': return <Compass className="h-4 w-4" />;
      default: return <Flame className="h-4 w-4" />;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      triggerAd(() => {
        setView({ type: 'blog-listing', searchQuery: searchQuery.trim() });
        setIsSearchActive(false);
        setIsMobileMenuOpen(false);
      });
    }
  };

  const isActive = (type: ViewPage['type'], categorySlug?: string) => {
    if (currentView.type !== type) return false;
    if (type === 'blog-listing' && categorySlug) {
      return (currentView as any).categorySlug === categorySlug;
    }
    return true;
  };

  return (
    <header className="sticky top-3 sm:top-4 z-50 mx-auto max-w-7xl w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] transition-all duration-300 bg-pink-100/40 dark:bg-pink-950/40 backdrop-blur-2xl border border-pink-200/50 dark:border-pink-900/40 rounded-2xl shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <button 
              id="logo-btn"
              onClick={() => setView({ type: 'home' })} 
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <Logo className="h-10 w-10 shrink-0" />
              <div className="flex flex-col">
                <span className={`font-old-english text-xl sm:text-2xl font-bold tracking-tight gradient-text leading-none ${isRtl ? 'font-urdu py-0.5' : ''}`}>
                  {t('app_name')}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                  {t('app_tagline')}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              id="nav-home"
              onClick={() => setView({ type: 'home' })}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive('home')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
              }`}
            >
              {t('nav_home')}
            </button>

            {/* Dynamic categories requested by user */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setView({ type: 'blog-listing', categorySlug: cat.slug })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive('blog-listing', cat.slug)
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
                }`}
              >
                {isRtl ? cat.nameUrdu : cat.name}
              </button>
            ))}

            <button
              id="nav-latest"
              onClick={() => setView({ type: 'latest' })}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive('latest')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
              }`}
            >
              {t('nav_latest')}
            </button>

            <button
              id="nav-videos"
              onClick={() => setView({ type: 'videos' })}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive('videos')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
              }`}
            >
              {t('nav_videos')}
            </button>

            <button
              id="nav-images"
              onClick={() => setView({ type: 'images' })}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive('images')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
              }`}
            >
              {t('nav_images')}
            </button>
          </nav>

          {/* Action Tools Section */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher Button (Requested: English / Urdu Nastaleeq Switcher in Header) */}
            <button
              id="language-toggle-btn"
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex h-10 px-2.5 items-center justify-center gap-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 cursor-pointer transition-colors duration-200 text-xs font-extrabold shadow-sm border border-rose-500/20"
              title={language === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
            >
              <Languages className="h-3.5 w-3.5" />
              <span className={language === 'en' ? 'font-urdu text-[11px] font-bold mt-0.5' : 'font-mono text-[10px] uppercase font-black'}>
                {language === 'en' ? 'اردو' : 'English'}
              </span>
            </button>

            {/* Search Bar Trigger & Input */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchActive && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '180px', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearchSubmit}
                    className={`absolute ${isRtl ? 'left-12' : 'right-12'} flex items-center bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200/50 dark:border-slate-700/50 overflow-hidden px-3`}
                  >
                    <input
                      type="text"
                      placeholder={t('search_placeholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full bg-transparent text-xs py-1.5 focus:outline-none text-slate-800 dark:text-white ${isRtl ? 'text-right font-urdu' : 'text-left font-sans'}`}
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>

              <button
                id="search-toggle-btn"
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/80 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors duration-200"
                title="Search"
              >
                {isSearchActive ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/80 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors duration-200"
              title={isDarkMode ? 'Light Theme' : 'Dark Theme'}
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-purple-600" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/80 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 xl:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden border-t border-pink-200/50 dark:border-pink-900/50 bg-pink-100/50 dark:bg-pink-950/50 backdrop-blur-2xl overflow-hidden"
          >
            <div className="space-y-2 p-4 text-left">
              {/* Mobile Search Form */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden px-3 mb-4">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-transparent text-sm py-2 focus:outline-none text-slate-800 dark:text-white ${isRtl ? 'text-right font-urdu' : 'text-left font-sans'}`}
                />
                <button type="submit" className="p-1">
                  <Search className="h-4 w-4 text-slate-400 hover:text-emerald-500" />
                </button>
              </form>

              <button
                onClick={() => { setView({ type: 'home' }); setIsMobileMenuOpen(false); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>{t('nav_home')}</span>
                <Compass className="h-4 w-4 text-emerald-500" />
              </button>

              {/* Mobile Categories Accordion */}
              <div className="border-y border-slate-100 dark:border-slate-800/50 my-1 py-1">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('nav_categories')}</div>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setView({ type: 'blog-listing', categorySlug: cat.slug }); setIsMobileMenuOpen(false); }}
                    className="flex w-full items-center justify-between rounded-xl px-6 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <span>{isRtl ? cat.nameUrdu : cat.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">View</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setView({ type: 'latest' }); setIsMobileMenuOpen(false); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>{t('nav_latest')}</span>
                <Clock className="h-4 w-4 text-rose-500" />
              </button>

              <button
                onClick={() => { setView({ type: 'writers' }); setIsMobileMenuOpen(false); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>{t('nav_writers')}</span>
                <User className="h-4 w-4 text-indigo-500" />
              </button>

              <button
                onClick={() => { setView({ type: 'videos' }); setIsMobileMenuOpen(false); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>{t('nav_videos')}</span>
                <Video className="h-4 w-4 text-rose-500" />
              </button>

              <button
                onClick={() => { setView({ type: 'images' }); setIsMobileMenuOpen(false); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>{t('nav_images')}</span>
                <ImageIcon className="h-4 w-4 text-amber-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
