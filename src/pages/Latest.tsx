import React from 'react';
import { BlogPost, ViewPage } from '../types';
import { blogPosts } from '../data/blogData';
import { Clock, Calendar, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { useAd } from '../context/AdContext';
import AdPlaceholder from '../components/AdPlaceholder';
import VerifiedBadge from '../components/VerifiedBadge';

interface LatestProps {
  setView: (page: ViewPage) => void;
}

export default function Latest({ setView }: LatestProps) {
  const { triggerAd } = useAd();

  // Sort blog posts by date or keep original premium order
  const latestPosts = [...blogPosts].sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  return (
    <div className="space-y-10 text-left">
      
      {/* Page Header */}
      <div className="rounded-[32px] bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-transparent border border-slate-200 dark:border-white/5 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-bl-2xl text-xs font-bold font-sans">
          LATEST LEAKS
        </div>
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold font-sans">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-rose-500" />
            Latest Leak & Viral Alerts
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Latest Leaks & Breaking Forensic Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-medium leading-relaxed">
            Get instant, verified forensic truth reports about private video leaks, breaking social media controversies, and political rumors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Latest Feed (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {latestPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => triggerAd(() => setView({ type: 'single-blog', blogId: post.id }))}
              className="group rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/2 p-5 hover:border-emerald-500/40 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg flex flex-col md:flex-row gap-6 relative"
            >
              {/* Badge for Categories */}
              <span className="absolute top-4 right-4 z-10 rounded-full bg-slate-900/80 text-white backdrop-blur-sm px-3 py-1 text-[10px] font-bold">
                {post.category.name}
              </span>

              {/* Card Image */}
              <div className="w-full md:w-56 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 border border-slate-200/50 dark:border-white/5">
                <img 
                  src={post.thumbnailImage} 
                  alt={post.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Details */}
              <div className="flex flex-col justify-between flex-1 py-1 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {post.readingTime} read
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-normal group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3 mt-1">
                  <div className="flex items-center gap-2">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="h-6 w-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-gray-300 flex items-center gap-0.5">
                      {post.author.name}
                      <VerifiedBadge />
                    </span>
                  </div>
                  <span className="text-xs text-rose-500 dark:text-rose-400 font-bold flex items-center gap-1 group-hover:translate-x-[4px] transition-transform">
                    Read Full Report
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Space with Dynamic Ad Banners (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <AdPlaceholder type="sidebar" />

          {/* Trending widget */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-rose-500">
              <Flame className="h-5 w-5 animate-bounce" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Popular Stories
              </h3>
            </div>
            <div className="space-y-4">
              {latestPosts.slice(0, 3).map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => triggerAd(() => setView({ type: 'single-blog', blogId: p.id }))}
                  className="flex items-center gap-3 w-full text-left hover:text-emerald-500 transition-colors group cursor-pointer"
                >
                  <span className="text-2xl font-black text-slate-200 dark:text-white/10 group-hover:text-emerald-500/20 font-sans">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-gray-200 line-clamp-2 leading-snug">
                      {p.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-sans mt-1 block">
                      {p.publishDate}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <AdPlaceholder type="bottom-ad" />
        </div>

      </div>

    </div>
  );
}
