import React from 'react';
import { ExternalLink, Info, Award } from 'lucide-react';
import { useAd } from '../context/AdContext';

interface AdPlaceholderProps {
  type: 'top-banner' | 'responsive-header' | 'sidebar' | 'in-article' | 'bottom-ad' | 'footer-ad';
  className?: string;
}

export default function AdPlaceholder({ type, className = '' }: AdPlaceholderProps) {
  return null;
  const { triggerAd } = useAd();

  // Define realistic premium Google Ad designs in English
  const getBannerDetails = () => {
    switch (type) {
      case 'top-banner':
        return {
          title: 'Google Banner Ad',
          size: '728 × 90',
          headline: 'No.1 Global Trading Platform — Earn daily returns with Exness secure assets!',
          sponsor: 'Exness Trade',
          badge: 'High CPC',
          actionText: 'Start Trading',
          bgStyle: 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/30',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=150&h=80',
          textColor: 'text-indigo-200',
        };
      case 'responsive-header':
        return {
          title: 'Google Premium Banner',
          size: 'Responsive Dynamic',
          headline: 'Ultra-Fast & Secure Cloud Hosting — Get 75% Off plus Free Domain & SSL!',
          sponsor: 'Bluehost Cloud',
          badge: 'Sponsor',
          actionText: 'Get Hosting',
          bgStyle: 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-blue-500/30',
          image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=150&h=80',
          textColor: 'text-blue-200',
        };
      case 'sidebar':
        return {
          title: 'Google Large Skyscraper',
          size: '300 × 600',
          headline: 'Secure Your Family\'s Future & Health with the Premier State Life Gold Insurance Plan!',
          sponsor: 'State Life Gold Plan',
          badge: 'Premium CPC',
          actionText: 'Get Free Brochure',
          bgStyle: 'bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/20',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=260&h=150',
          textColor: 'text-emerald-200',
        };
      case 'in-article':
        return {
          title: 'Google Native Inline',
          size: 'Responsive',
          headline: 'Say goodbye to hackers and cyber espionage. Get verified NordVPN at 65% Discount!',
          sponsor: 'NordVPN Secure',
          badge: 'Verified Sponsor',
          actionText: 'Get NordVPN',
          bgStyle: 'bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border-rose-500/20',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=150&h=80',
          textColor: 'text-rose-200',
        };
      case 'bottom-ad':
        return {
          title: 'Google Content Bottom',
          size: '728 × 90',
          headline: 'The revolutionary tri-fold handset Huawei Mate XT — Pre-order your custom model online now!',
          sponsor: 'Huawei Premium',
          badge: 'Auto Campaign',
          actionText: 'Order Online',
          bgStyle: 'bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/20',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=150&h=80',
          textColor: 'text-amber-200',
        };
      case 'footer-ad':
        return {
          title: 'Google Recommended Links',
          size: 'Responsive Ads',
          headline: 'Gemini Pro AI System — Enterprise-grade automated text, audio, and video forensic analysis!',
          sponsor: 'Gemini AI Pro',
          badge: 'Google AI Ads',
          actionText: 'Try Free Trial',
          bgStyle: 'bg-gradient-to-r from-slate-950 via-purple-950/30 to-slate-950 border-purple-500/20',
          image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=150&h=80',
          textColor: 'text-purple-200',
        };
    }
  };

  const ad = getBannerDetails();

  const handleAdClick = () => {
    // Show a beautiful full-page interstitial before redirecting
    triggerAd(() => {
      // Callback executed after closing the interstitial
      console.log(`User closed the interstitial initiated by clicking ${type}`);
    });
  };

  // Render Horizontal Banners
  const isSidebar = type === 'sidebar';

  return (
    <div
      id={`google-adsense-banner-${type}`}
      onClick={handleAdClick}
      className={`group relative mx-auto my-6 overflow-hidden rounded-2xl border border-solid transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/40 cursor-pointer shadow-md select-none ${ad.bgStyle} ${className}`}
      style={{
        minHeight: isSidebar ? '500px' : '100px',
        maxWidth: isSidebar ? '300px' : '728px',
        width: '100%'
      }}
    >
      {/* Ad Tag and Labels */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
        <span className="flex items-center justify-center bg-amber-500 text-white rounded px-1.5 py-0.5 text-[8px] font-sans font-bold tracking-wider">
          Ad
        </span>
        <span className="text-[9px] font-bold text-slate-400 font-sans tracking-wide flex items-center gap-0.5 bg-slate-950/60 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
          Google AdSense
          <Info className="h-2.5 w-2.5 text-blue-400" />
        </span>
      </div>

      <div className="absolute top-2 right-2 z-10">
        <span className="text-[8px] font-mono bg-slate-950/50 text-emerald-400 px-1.5 py-0.5 rounded backdrop-blur-sm font-bold uppercase tracking-wider flex items-center gap-1">
          <Award className="h-2.5 w-2.5 text-emerald-400" />
          {ad.badge}
        </span>
      </div>

      {isSidebar ? (
        /* Vertical Sidebar Ad Layout */
        <div className="flex flex-col h-full justify-between p-5 pt-10 text-left">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 tracking-widest uppercase font-mono block">
              {ad.sponsor} Sponsor Offer
            </span>
            
            {/* Visual Thumbnail */}
            <div className="overflow-hidden rounded-xl border border-white/5 aspect-video w-full bg-slate-950 relative">
              <img
                src={ad.image}
                alt={ad.sponsor}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <h4 className="text-base md:text-lg font-extrabold text-white leading-relaxed group-hover:text-emerald-400 transition-colors">
              {ad.headline}
            </h4>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5">
            <button className="w-full relative overflow-hidden py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-xs font-bold text-center transition-all group-hover:from-indigo-700 group-hover:to-emerald-700 shadow-md">
              <span className="flex items-center justify-center gap-1.5">
                {ad.actionText}
                <ExternalLink className="h-3 w-3" />
              </span>
            </button>
            <div className="flex items-center justify-center gap-1 text-[8px] text-slate-500 font-mono">
              <span>Size: {ad.size}</span>
              <span>•</span>
              <span>AdChoices</span>
            </div>
          </div>
        </div>
      ) : (
        /* Horizontal Banner Layout */
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 pt-8 sm:pt-5 h-full text-left">
          <div className="flex items-center gap-4 flex-1">
            {/* Horizontal Ad Thumbnail */}
            <div className="hidden sm:block overflow-hidden rounded-xl border border-white/5 h-16 w-24 bg-slate-950 flex-shrink-0">
              <img
                src={ad.image}
                alt={ad.sponsor}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="space-y-1">
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 tracking-wider uppercase block font-mono">
                {ad.sponsor} • Sponsored Ad
              </span>
              <h4 className="text-xs sm:text-sm font-black text-white leading-relaxed group-hover:text-emerald-400 transition-colors line-clamp-2 max-w-xl">
                {ad.headline}
              </h4>
            </div>
          </div>

          <div className="flex flex-col sm:items-end justify-center gap-1.5 w-full sm:w-auto">
            <button className="whitespace-nowrap py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md group-hover:scale-[1.03] flex items-center justify-center gap-1 cursor-pointer">
              <span>{ad.actionText}</span>
              <ExternalLink className="h-3 w-3" />
            </button>
            <span className="text-[8px] text-slate-500 font-mono text-center sm:text-right block">
              AdSense Optimized ({ad.size})
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
