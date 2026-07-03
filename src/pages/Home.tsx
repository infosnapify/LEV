import React, { useState, useEffect } from 'react';
import { BlogPost, ViewPage } from '../types';
import { blogPosts, categories } from '../data/blogData';
import { 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Zap, 
  ChevronLeft,
  ChevronRight,
  Flame,
  Video,
  Sparkles,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdPlaceholder from '../components/AdPlaceholder';
import VerifiedBadge from '../components/VerifiedBadge';
import { useLanguage } from '../context/LanguageContext';

interface HomeProps {
  setView: (page: ViewPage) => void;
}

export default function Home({ setView }: HomeProps) {
  const { language, isRtl, t } = useLanguage();
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Extract featured/trending articles
  const featuredPosts = blogPosts.filter(post => post.trending || post.popular).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 6);

  // Simulate premium content loading skeleton
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNextFeatured = () => {
    setFeaturedIdx((prev) => (prev + 1) % featuredPosts.length);
  };

  const handlePrevFeatured = () => {
    setFeaturedIdx((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string, colorClass: string) => {
    const commonClass = `h-8 w-8 text-${colorClass}-500 mb-3`;
    switch (iconName) {
      case 'Flame': return <Flame className={commonClass} />;
      case 'Video': return <Video className={commonClass} />;
      case 'Sparkles': return <Sparkles className={commonClass} />;
      case 'TrendingUp': return <TrendingUp className={commonClass} />;
      case 'Compass': return <Compass className={commonClass} />;
      default: return <Flame className={commonClass} />;
    }
  };

  const activeFeatured = featuredPosts[featuredIdx] || blogPosts[0];

  return (
    <div className={`space-y-12 ${isRtl ? 'font-urdu' : ''}`}>
      
      {/* 1. Top Responsive Header AdSense Banner */}
      <div className="w-full">
        <AdPlaceholder type="responsive-header" />
      </div>

      {/* 2. Hero Section: Featured Interactive Slider */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-4 md:p-6 backdrop-blur-md">
        <div className="relative aspect-video max-h-[500px] w-full overflow-hidden rounded-[24px] bg-slate-950">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatured.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img
                src={activeFeatured.featuredImage}
                alt={isRtl ? activeFeatured.titleUrdu : activeFeatured.title}
                className="h-full w-full object-cover opacity-65 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Premium dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Slider Content & Details */}
          <div className={`absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col justify-end text-white ${isRtl ? 'text-right items-end' : 'text-left items-start'}`}>
            <div className={`flex flex-wrap items-center gap-2 mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="rounded-full bg-rose-500/90 px-3 py-1 text-[11px] font-bold">
                {isRtl ? activeFeatured.category.nameUrdu : activeFeatured.category.name}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full">
                <Clock className="h-3 w-3 text-emerald-400" />
                {activeFeatured.readingTime} {t('read_time')}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300 bg-purple-500/35 backdrop-blur-md px-3 py-1 rounded-full">
                <Zap className="h-3 w-3 text-purple-400 animate-pulse" />
                {t('top_story')}
              </span>
            </div>

            <h1 className={`text-xl md:text-3xl font-extrabold tracking-tight mb-4 leading-normal max-w-3xl cursor-pointer hover:text-rose-400 transition-colors duration-200 ${isRtl ? 'font-urdu' : ''}`}
                onClick={() => setView({ type: 'single-blog', blogId: activeFeatured.id })}>
              {isRtl ? activeFeatured.titleUrdu : activeFeatured.title}
            </h1>

            <p className={`text-xs md:text-sm text-slate-300 max-w-2xl mb-6 line-clamp-2 md:line-clamp-3 ${isRtl ? 'font-urdu' : ''}`}>
              {isRtl ? activeFeatured.excerptUrdu : activeFeatured.excerpt}
            </p>

            {/* Author info and navigational controls */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 w-full ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <img
                  src={activeFeatured.author.avatar}
                  alt={isRtl ? activeFeatured.author.nameUrdu : activeFeatured.author.name}
                  className="h-10 w-10 rounded-full border-2 border-rose-500 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className={`text-sm font-bold text-white flex items-center gap-1 ${isRtl ? 'flex-row-reverse font-urdu' : ''}`}>
                    {isRtl ? activeFeatured.author.nameUrdu : activeFeatured.author.name}
                    <VerifiedBadge />
                  </span>
                  <span className="block text-[10px] text-slate-400">{activeFeatured.publishDate}</span>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={handlePrevFeatured}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-rose-500 text-white hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/5"
                  title="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <span>{featuredIdx + 1}</span>
                  <span>/</span>
                  <span>{featuredPosts.length}</span>
                </div>
                <button
                  onClick={handleNextFeatured}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-rose-500 text-white hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/5"
                  title="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Trending Ticker Bar */}
      <section className={`rounded-2xl bg-gradient-to-r from-rose-500/5 via-purple-500/5 to-rose-500/5 border border-slate-200 dark:border-white/10 px-6 py-4 flex flex-col md:flex-row items-center gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex items-center gap-2 shrink-0 bg-rose-600 text-white text-xs px-3.5 py-1.5 rounded-full font-bold shadow-sm shadow-rose-500/10">
          <Flame className="h-3.5 w-3.5 text-amber-300 animate-bounce" />
          <span>{isRtl ? 'گرم ترین خبر:' : 'HOT NOW:'}</span>
        </div>
        <div className="flex-1 overflow-hidden relative w-full">
          <div className={`animate-pulse flex items-center gap-4 text-sm text-slate-600 dark:text-gray-300 cursor-pointer hover:text-rose-500 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
               onClick={() => setView({ type: 'single-blog', blogId: blogPosts[0].id })}>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              #{isRtl ? blogPosts[0].category.nameUrdu : blogPosts[0].category.name}
            </span>
            <span className={`font-medium line-clamp-1 text-slate-800 dark:text-white ${isRtl ? 'font-urdu' : ''}`}>
              {isRtl ? blogPosts[0].titleUrdu : blogPosts[0].title}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Beautiful Categories Section */}
      <section className="space-y-6">
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {t('browse_categories')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-1">
            {t('browse_categories_sub')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setView({ type: 'blog-listing', categorySlug: cat.slug })}
              className="flex flex-col items-center p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 hover:border-rose-500/30 hover:bg-rose-500/5 text-center transition-all duration-300 shadow-sm cursor-pointer group"
            >
              {getCategoryIcon(cat.icon, cat.color)}
              <span className={`block text-sm sm:text-base font-bold text-slate-800 dark:text-white group-hover:text-rose-500 transition-colors ${isRtl ? 'font-urdu' : ''}`}>
                {isRtl ? cat.nameUrdu : cat.name}
              </span>
              <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 uppercase tracking-wider">
                {cat.englishName}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. In-Article Responsive Ad placeholder */}
      <div className="w-full my-4">
        <AdPlaceholder type="in-article" />
      </div>

      {/* 6. Main Latest Articles Grid */}
      <section className="space-y-6">
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {t('latest_leaks')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-1">
              {t('latest_leaks_sub')}
            </p>
          </div>
          <button
            onClick={() => setView({ type: 'blog-listing' })}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 cursor-pointer border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all self-start sm:self-center ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span>{t('view_all')}</span>
            <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton loader
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-4">
                <div className="aspect-video w-full rounded-2xl bg-slate-100 dark:bg-white/5" />
                <div className="h-4 w-1/4 rounded bg-slate-100 dark:bg-white/5" />
                <div className="h-6 w-3/4 rounded bg-slate-100 dark:bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-white/5" />
              </div>
            ))
          ) : (
            latestPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 shadow-sm hover:shadow-lg hover:border-rose-500/30 transition-all"
              >
                {/* Media Image Thumbnail Placeholders */}
                <div 
                  className="relative aspect-video overflow-hidden rounded-t-3xl bg-slate-900 cursor-pointer"
                  onClick={() => setView({ type: 'single-blog', blogId: post.id })}
                >
                  <img
                    src={post.thumbnailImage}
                    alt={isRtl ? post.titleUrdu : post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} flex gap-1.5`}>
                    <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      {isRtl ? post.category.nameUrdu : post.category.name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className={`flex items-center gap-3 text-[10px] text-slate-500 dark:text-gray-400 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span>{post.publishDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} {t('read_time')}
                    </span>
                  </div>

                  <h3 
                    className={`text-base font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-200 mb-3 cursor-pointer ${isRtl ? 'font-urdu text-right' : 'text-left'}`}
                    onClick={() => setView({ type: 'single-blog', blogId: post.id })}
                  >
                    {isRtl ? post.titleUrdu : post.title}
                  </h3>

                  <p className={`text-xs text-slate-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4 ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
                    {isRtl ? post.excerptUrdu : post.excerpt}
                  </p>

                  <div className={`mt-auto flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <img
                        src={post.author.avatar}
                        alt={isRtl ? post.author.nameUrdu : post.author.name}
                        className="h-7 w-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className={`text-xs font-bold text-slate-700 dark:text-gray-300 flex items-center gap-0.5 ${isRtl ? 'font-urdu' : ''}`}>
                        {isRtl ? post.author.nameUrdu : post.author.name}
                        <VerifiedBadge />
                      </span>
                    </div>

                    <button
                      onClick={() => setView({ type: 'single-blog', blogId: post.id })}
                      className={`text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-500 dark:hover:text-rose-300 group-hover:underline flex items-center gap-1 cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      <span>{t('read_more')}</span>
                      <ArrowRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-[2px] ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>

      {/* 7. Bottom banner Ad */}
      <div className="w-full pt-4">
        <AdPlaceholder type="bottom-ad" />
      </div>

    </div>
  );
}
