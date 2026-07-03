import React, { useState, useEffect } from 'react';
import { ViewPage } from './types';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogListing from './pages/BlogListing';
import SingleBlog from './pages/SingleBlog';
import Categories from './pages/Categories';
import StaticPage from './pages/StaticPages';
import Latest from './pages/Latest';
import Writers from './pages/Writers';
import VideosPage from './pages/VideosPage';
import ImagesPage from './pages/ImagesPage';
import { motion, AnimatePresence } from 'motion/react';
import { AdProvider, useAd } from './context/AdContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import AdInterstitial from './components/AdInterstitial';
import { Coins, X } from 'lucide-react';

export default function App() {
  return (
    <LanguageProvider>
      <AdProvider>
        <AppContent />
      </AdProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const [currentView, setView] = useState<ViewPage>({ type: 'home' });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isFloatingStatsOpen, setIsFloatingStatsOpen] = useState<boolean>(false);
  const { triggerAd, earnings } = useAd();
  const { language, isRtl, t } = useLanguage();

  // Initialize and sync dark mode state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll to top automatically when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Intercept view switching to show a realistic Google Ad Interstitial first!
  const setViewWithAd = (view: ViewPage) => {
    // Show interstitial ad, then navigate to the view on close
    triggerAd(() => {
      setView(view);
    });
  };

  // Page switcher router logic
  const renderActiveView = () => {
    switch (currentView.type) {
      case 'home':
        return <Home setView={setViewWithAd} />;
      case 'blog-listing':
        return (
          <BlogListing
            categorySlug={currentView.categorySlug}
            searchQuery={currentView.searchQuery}
            setView={setViewWithAd}
          />
        );
      case 'single-blog':
        return <SingleBlog blogId={currentView.blogId} setView={setViewWithAd} />;
      case 'categories':
        return <Categories setView={setViewWithAd} />;
      case 'latest':
        return <Latest setView={setViewWithAd} />;
      case 'writers':
        return <Writers setView={setViewWithAd} />;
      case 'videos':
        return <VideosPage setView={setViewWithAd} />;
      case 'images':
        return <ImagesPage setView={setViewWithAd} />;
      case 'about':
      case 'contact':
      case 'privacy-policy':
      case 'terms-conditions':
      case 'disclaimer':
      case 'cookie-policy':
      case 'not-found':
        return <StaticPage type={currentView.type === 'not-found' ? '404' : currentView.type} setView={setViewWithAd} />;
      default:
        return <StaticPage type="404" setView={setViewWithAd} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#050505] dark:text-gray-100 transition-colors duration-300 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Global Sticky Glassmorphism Navigation */}
      <Navigation
        currentView={currentView}
        setView={setViewWithAd}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* 2. Main Container with Responsive Padding */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        
        {/* Background ambient lighting effects */}
        <div className="absolute top-[15vh] right-[10vw] h-[350px] w-[350px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/3 blur-[120px] pointer-events-none select-none z-0" />
        <div className="absolute top-[40vh] left-[5vw] h-[400px] w-[400px] rounded-full bg-purple-500/10 dark:bg-purple-500/3 blur-[150px] pointer-events-none select-none z-0" />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(currentView)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* 3. Global Dynamic Footer Section */}
      <Footer setView={setViewWithAd} />

      {/* 4. Global Interactive Google Ads Interstitial Overlay */}
      <AdInterstitial />

    </div>
  );
}
