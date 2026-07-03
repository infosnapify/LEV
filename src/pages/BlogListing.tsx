import React from 'react';
import { BlogPost, ViewPage, Category } from '../types';
import { blogPosts, categories } from '../data/blogData';
import { Clock, Home, ArrowRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from '../components/Sidebar';
import AdPlaceholder from '../components/AdPlaceholder';
import VerifiedBadge from '../components/VerifiedBadge';
import { useLanguage } from '../context/LanguageContext';

interface BlogListingProps {
  categorySlug?: string;
  searchQuery?: string;
  setView: (page: ViewPage) => void;
}

export default function BlogListing({ categorySlug, searchQuery, setView }: BlogListingProps) {
  const { language, isRtl, t } = useLanguage();
  
  // Filter posts based on category or search (multilingual match)
  const filteredPosts = blogPosts.filter((post) => {
    let match = true;
    if (categorySlug) {
      match = match && post.category.slug === categorySlug;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inTitle = post.title.toLowerCase().includes(q) || (post.titleUrdu && post.titleUrdu.toLowerCase().includes(q));
      const inExcerpt = post.excerpt.toLowerCase().includes(q) || (post.excerptUrdu && post.excerptUrdu.toLowerCase().includes(q));
      const inTags = post.tags.some(t => t.toLowerCase().includes(q));
      const inCategory = post.category.name.toLowerCase().includes(q) || (post.category.nameUrdu && post.category.nameUrdu.toLowerCase().includes(q));
      match = match && (inTitle || inExcerpt || inTags || inCategory);
    }
    return match;
  });

  const getPageTitleAndDetails = () => {
    if (categorySlug) {
      const cat = categories.find(c => c.slug === categorySlug);
      return {
        title: cat ? (isRtl ? `${cat.nameUrdu}` : `Category: ${cat.name}`) : (isRtl ? 'وائرل ویڈیوز اور لنکس' : 'Viral Videos & Leaks'),
        desc: cat ? cat.description : 'List of articles under this category.',
        tagline: cat ? cat.englishName : 'Category List'
      };
    }
    if (searchQuery) {
      return {
        title: isRtl ? `تلاش کے نتائج: "${searchQuery}"` : `Search Results: "${searchQuery}"`,
        desc: isRtl ? `تلاش کے نتائج کے مطابق ${filteredPosts.length} لنکس ملے ہیں۔` : `Found ${filteredPosts.length} matches for your search terms.`,
        tagline: 'Search Results'
      };
    }
    return {
      title: isRtl ? 'تمام خفیہ ویڈیوز اور وائرل لیکس' : 'All Viral Leaks & Videos',
      desc: isRtl ? 'سوشل میڈیا اور انٹرنیٹ پر وائرل ہونے والی تمام خفیہ ویڈیوز، آڈیو لیکس اور ثبوتوں کا مکمل ریکارڈ۔' : 'The complete directory of breaking viral videos, secret audio leaks, and digital forensic investigative reports from across the web.',
      tagline: 'All Leaks & Trending'
    };
  };

  const details = getPageTitleAndDetails();

  return (
    <div className={`space-y-8 ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
      
      {/* 1. Breadcrumb navigation */}
      <nav className={`flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 pb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button onClick={() => setView({ type: 'home' })} className="hover:text-rose-500 flex items-center gap-1 cursor-pointer">
          <Home className="h-3 w-3" />
          <span>{isRtl ? 'ہوم' : 'Home'}</span>
        </button>
        <span>/</span>
        <span className="text-slate-700 dark:text-gray-300 font-medium">{isRtl ? 'لیکس ڈائریکٹری' : 'Leaks Directory'}</span>
        {categorySlug && (
          <>
            <span>/</span>
            <span className="text-rose-600 dark:text-rose-500 capitalize">
              {categorySlug.replace('-', ' ')}
            </span>
          </>
        )}
      </nav>

      {/* 2. Page Header details */}
      <div className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-8 md:p-10 shadow-lg shadow-black/5 dark:shadow-black/10">
        <span className={`text-[10px] font-mono tracking-wider text-rose-600 dark:text-rose-500 uppercase font-bold block mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
          {details.tagline}
        </span>
        <h1 className={`text-xl md:text-3xl font-black text-slate-900 dark:text-white ${isRtl ? 'font-urdu text-right' : ''}`}>
          {details.title}
        </h1>
        <p className={`text-xs sm:text-sm text-slate-500 dark:text-gray-400 max-w-2xl mt-2 ${isRtl ? 'font-urdu text-right' : ''}`}>
          {details.desc}
        </p>
      </div>

      {/* 3. Main Grid layout: Blog list + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Posts Area (Col-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/20 bg-white dark:bg-white/2 p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-urdu">
                {isRtl ? 'کوئی ویڈیو نہیں ملی' : 'No Articles Found'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-gray-400 mt-2 max-w-md mx-auto leading-relaxed font-urdu">
                {isRtl 
                  ? 'ہمارے ڈیٹا بیس میں اس نام کی کوئی بھی ویڈیو یا لیک فائل دستیاب نہیں ہے۔ براڈ کیٹیگری یا نام کے سپیلنگ تبدیل کر کے دوبارہ کوشش کریں۔' 
                  : 'We could not find any stories matching your criteria. Try looking up another viral keyword or explore latest articles.'
                }
              </p>
              <button
                onClick={() => setView({ type: 'home' })}
                className="mt-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-sm px-5 py-2.5 shadow-md font-semibold cursor-pointer"
              >
                {isRtl ? 'ہوم پیج پر جائیں' : 'Go to Home'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 shadow-sm hover:shadow-md hover:border-rose-500/30 transition-all"
                >
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
                    <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'}`}>
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
                          className="h-6 w-6 rounded-full object-cover"
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
              ))}
            </div>
          )}

          {/* AdSense In-Article Responsive placement */}
          <div className="pt-4">
            <AdPlaceholder type="in-article" />
          </div>

        </div>

        {/* Sidebar Area (Col-4) */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <Sidebar setView={setView} />
          </div>
        </div>

      </div>

    </div>
  );
}
