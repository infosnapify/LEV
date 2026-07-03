import React from 'react';
import { useAd } from '../context/AdContext';
import { X, ExternalLink, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdInterstitial() {
  const { isAdOpen, activeAd, countdown, closeAd, visitSponsor } = useAd();

  if (!isAdOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="adsense-interstitial-wrapper" 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col text-slate-800 dark:text-slate-100 text-left"
        >
          {/* Top Bar: Google Ads branding and controls */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-white/5">
            {/* Google Ads Badge */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
              <span className="flex items-center justify-center bg-amber-500 text-white rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider">
                Ad
              </span>
              <span className="flex items-center gap-1">
                Google Ads
                <Info className="h-3.5 w-3.5 text-blue-500 fill-current bg-white dark:bg-transparent rounded-full" />
              </span>
            </div>

            {/* Countdown / Skip Button */}
            <div className="flex items-center gap-2">
              {countdown > 0 ? (
                <div className="rounded-full bg-slate-200/80 dark:bg-white/10 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Closing ad in {countdown}s...</span>
                </div>
              ) : (
                <button
                  onClick={closeAd}
                  className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
                  title="Skip Ad"
                >
                  <span>Skip Ad</span>
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Ad Content Scrollable */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh] space-y-6">
            
            {/* Category / Sponsor Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full capitalize">
                {activeAd.category}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                {activeAd.title} Premium Campaign
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-snug hover:text-emerald-500 transition-colors cursor-pointer" onClick={visitSponsor}>
              {activeAd.headline}
            </h2>

            {/* Main Visual Asset (Clickable Image) */}
            <div 
              className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 shadow-sm group cursor-pointer"
              onClick={visitSponsor}
            >
              <img
                src={activeAd.image}
                alt={activeAd.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all" />
              
              {/* Floating Call-to-action hint */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-slate-900/90 text-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                Sponsor Offer
              </div>
            </div>

            {/* Ad Description */}
            <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {activeAd.description}
            </p>

            {/* Massive Glowing Primary Call-to-Action Button */}
            <div className="pt-2">
              <button
                onClick={visitSponsor}
                className="w-full relative overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-base md:text-lg font-black text-center transition-all shadow-xl hover:shadow-emerald-500/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group animate-pulse"
              >
                <span>{activeAd.actionText}</span>
                <ExternalLink className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2 font-sans">
                Clicking this button safely redirects you to the sponsor's secure, verified website.
              </p>
            </div>
          </div>

          {/* Bottom Bar: Privacy/Feedback */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-500 font-sans">
            <div className="flex items-center gap-3">
              <button onClick={visitSponsor} className="hover:text-blue-500 hover:underline cursor-pointer">
                Report Ad
              </button>
              <span>•</span>
              <button onClick={visitSponsor} className="hover:text-blue-500 hover:underline cursor-pointer">
                Why this ad?
              </button>
            </div>
            <div className="flex items-center gap-1 font-sans">
              <span>Ads by Google</span>
              <span>•</span>
              <span>Privacy Choices</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
