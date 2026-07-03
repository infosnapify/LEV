import React, { useState } from 'react';
import { BlogPost, ViewPage } from '../types';
import { categories, blogPosts } from '../data/blogData';
import { Search, Flame, Tag, TrendingUp, Video, Sparkles, Compass } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';
import { useAd } from '../context/AdContext';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  setView: (page: ViewPage) => void;
  onPostClick?: (blogId: string) => void;
}

export default function Sidebar({ setView, onPostClick }: SidebarProps) {
  const { triggerAd } = useAd();
  const { language, isRtl, t } = useLanguage();
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      triggerAd(() => {
        setView({ type: 'blog-listing', searchQuery: searchVal.trim() });
        setSearchVal('');
      });
    }
  };

  // Extract top trending / popular posts
  const trendingPosts = blogPosts.filter(post => post.trending || post.popular).slice(0, 4);

  // Extract all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 10);

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

  return (
    <aside className={`space-y-8 ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
      
      {/* 1. Glassmorphic Search Widget */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 backdrop-blur-lg shadow-sm">
        <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">
          {isRtl ? 'ڈائریکٹری میں تلاش کریں' : 'Search Directory'}
        </h3>
        <form onSubmit={handleSearch} className={`relative flex items-center bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden px-3 py-1 focus-within:border-rose-500/50 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <input
            type="text"
            placeholder={isRtl ? 'ٹیگز، نام یا کیٹگری...' : 'Type tags, names, leaks...'}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className={`w-full bg-transparent text-xs py-2 focus:outline-none text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 ${isRtl ? 'text-right font-urdu' : 'text-left font-sans'}`}
          />
          <button type="submit" className="p-1.5 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer">
            <Search className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* 2. Google AdSense Sidebar Ad (300x600) */}
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <AdPlaceholder type="sidebar" />
      </div>

      {/* 3. Trending Articles List */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 backdrop-blur-lg shadow-sm">
        <div className={`flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-white/10 pb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <TrendingUp className="h-5 w-5 text-purple-500 animate-pulse" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {isRtl ? 'رجحان ساز رپورٹس' : 'Trending Reports'}
          </h3>
        </div>

        <div className="space-y-4">
          {trendingPosts.map((post, idx) => (
            <button
              key={post.id}
              onClick={() => onPostClick ? onPostClick(post.id) : setView({ type: 'single-blog', blogId: post.id })}
              className={`flex items-start gap-3 text-left group w-full cursor-pointer ${isRtl ? 'flex-row-reverse text-right' : ''}`}
            >
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={post.thumbnailImage}
                  alt={isRtl ? post.titleUrdu : post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className={`absolute top-1 ${isRtl ? 'right-1' : 'left-1'} flex h-4 w-4 items-center justify-center rounded-md bg-purple-600/90 text-[10px] font-mono text-white`}>
                  {idx + 1}
                </div>
              </div>
              <div className="flex flex-col gap-1 overflow-hidden w-full">
                <span className={`text-xs font-semibold text-slate-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2 transition-colors duration-200 leading-snug ${isRtl ? 'font-urdu' : ''}`}>
                  {isRtl ? post.titleUrdu : post.title}
                </span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-sans">
                  {post.publishDate} • {post.readingTime} {t('read_time')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Interactive Categories list */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 backdrop-blur-lg shadow-sm">
        <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">
          {isRtl ? 'اہم کیٹیگریز' : 'Browse Categories'}
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setView({ type: 'blog-listing', categorySlug: cat.slug })}
              className={`flex items-center justify-between w-full rounded-2xl px-4 py-2.5 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group cursor-pointer ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
            >
              <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className={`text-${cat.color}-500 group-hover:scale-110 transition-transform duration-200`}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span className={isRtl ? 'font-urdu' : ''}>
                  {isRtl ? cat.nameUrdu : cat.name}
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-700 dark:group-hover:text-gray-300 uppercase">
                {cat.slug.replace('-', ' ')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Elegant Tag Cloud */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 backdrop-blur-lg shadow-sm">
        <div className={`flex items-center gap-2 mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Tag className="h-4 w-4 text-rose-500" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {isRtl ? 'مقبول ترین ٹیگز' : 'Popular Tags'}
          </h3>
        </div>
        <div className={`flex flex-wrap gap-1.5 ${isRtl ? 'justify-end' : 'justify-start'}`}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setView({ type: 'blog-listing', searchQuery: tag })}
              className="rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-rose-500/15 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-white/5 hover:border-rose-500/30 px-3 py-1 text-xs text-slate-600 dark:text-gray-400 transition-all cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}
