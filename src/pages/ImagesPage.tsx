import React, { useState } from 'react';
import { ViewPage } from '../types';
import { blogPosts } from '../data/blogData';
import { useAd } from '../context/AdContext';
import { Camera, Eye, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdPlaceholder from '../components/AdPlaceholder';
import { useLanguage } from '../context/LanguageContext';

interface ImagesPageProps {
  setView: (page: ViewPage) => void;
}

export default function ImagesPage({ setView }: ImagesPageProps) {
  const { triggerAd } = useAd();
  const { language, isRtl, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Extract all gallery images across all blog posts and associate with their corresponding blog posts
  const allGalleryItems = blogPosts.flatMap((post) => {
    if (!post.gallery) return [];
    return post.gallery.map((img) => ({
      url: img,
      postTitle: post.title,
      postTitleUrdu: post.titleUrdu,
      postId: post.id,
      category: post.category.name,
      categoryUrdu: post.category.nameUrdu,
    }));
  });

  const handleOpenLightbox = (index: number) => {
    triggerAd(() => {
      setActiveImageIndex(index);
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % allGalleryItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + allGalleryItems.length) % allGalleryItems.length);
    }
  };

  return (
    <div className={`space-y-10 ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
      
      {/* Page Title Header */}
      <div className="rounded-[32px] bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent border border-slate-200 dark:border-white/5 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
        <div className={`absolute top-0 ${isRtl ? 'left-0 rounded-br-2xl' : 'right-0 rounded-bl-2xl'} bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-4 py-2 text-xs font-bold font-sans`}>
          {isRtl ? 'خصوصی تصاویر اور ثبوت' : 'EXCLUSIVE PHOTO ARCHIVE'}
        </div>
        <div className={`relative z-10 space-y-4 max-w-2xl ${isRtl ? 'mr-0' : 'ml-0'}`}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-sans ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Camera className="h-3.5 w-3.5 animate-pulse" />
            <span>{isRtl ? 'تصویری ثبوت اور شواہد' : 'Evidence & Photo Bank'}</span>
          </div>
          <h1 className={`text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight ${isRtl ? 'font-urdu' : ''}`}>
            {isRtl ? 'لیک تصاویر اور تفصیلی شواہد کی گیلری' : 'Leaked Photos & Forensic Media Gallery'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed">
            {isRtl 
              ? 'سوشل میڈیا اور انٹرنیٹ پر وائرل ہونے والے وائرل اسنیپ شاٹس، خفیہ بیک اپ اور بریکنگ تصاویر کا ہائی ڈیفینیشن اور واضح فارنزک جائزہ لیں۔' 
              : 'Verify leaked snapshots, critical cyber backups, hardware designs, and visual evidence with deep-zoom high-definition forensic panels.'
            }
          </p>
        </div>
      </div>

      {/* Main Grid & Ads layout */}
      <div className="space-y-8">
        
        {/* Dynamic Ad Placement */}
        <div className="py-2 border-y border-slate-200 dark:border-white/10">
          <AdPlaceholder type="in-article" />
        </div>

        {/* Visual Masonry Mosaic Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {allGalleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleOpenLightbox(index)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 cursor-zoom-in group"
            >
              {/* Photo */}
              <img
                src={item.url}
                alt={isRtl ? item.postTitleUrdu : item.postTitle}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay with details */}
              <div className={`absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 ${isRtl ? 'text-right items-end' : 'text-left items-start'}`}>
                <span className="self-start rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 text-[10px] font-bold">
                  {isRtl ? item.categoryUrdu : item.category}
                </span>

                <div className="space-y-3 w-full">
                  <h3 className={`text-xs font-bold text-white leading-snug line-clamp-2 ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
                    {isRtl ? item.postTitleUrdu : item.postTitle}
                  </h3>
                  <span className={`text-[10px] text-indigo-400 font-bold flex items-center gap-1 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <span>{isRtl ? 'تصویر بڑی کریں' : 'Zoom Photo'}</span>
                    <Eye className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Another Ad Placement at bottom */}
        <div className="py-4">
          <AdPlaceholder type="bottom-ad" />
        </div>
      </div>

      {/* Lightbox Immersive Zoom Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 md:p-8 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-rose-600 transition-colors cursor-pointer`}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous Navigation Button */}
            <button
              onClick={handlePrev}
              className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-emerald-500 hover:scale-110 transition-all cursor-pointer`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={handleNext}
              className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-emerald-500 hover:scale-110 transition-all cursor-pointer`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Zoom Card Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
            >
              {/* Image Frame */}
              <div className="flex-1 overflow-hidden flex items-center justify-center bg-slate-950">
                <img
                  src={allGalleryItems[activeImageIndex].url}
                  alt={isRtl ? allGalleryItems[activeImageIndex].postTitleUrdu : allGalleryItems[activeImageIndex].postTitle}
                  className="max-w-full max-h-[60vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info Frame at bottom */}
              <div className={`bg-slate-900 p-6 md:p-8 space-y-4 border-t border-white/5 ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold">
                  {isRtl ? allGalleryItems[activeImageIndex].categoryUrdu : allGalleryItems[activeImageIndex].category}
                </span>
                
                <h3 className={`text-base md:text-lg font-bold text-white ${isRtl ? 'font-urdu' : ''}`}>
                  {isRtl ? allGalleryItems[activeImageIndex].postTitleUrdu : allGalleryItems[activeImageIndex].postTitle}
                </h3>

                <button
                  onClick={() => {
                    const id = allGalleryItems[activeImageIndex].postId;
                    setActiveImageIndex(null);
                    triggerAd(() => setView({ type: 'single-blog', blogId: id }));
                  }}
                  className={`inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline cursor-pointer ${isRtl ? 'flex-row-reverse font-urdu' : ''}`}
                >
                  <span>{isRtl ? 'مکمل تحقیقاتی رپورٹ پڑھیں' : 'Read full forensic investigation'}</span>
                  <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
