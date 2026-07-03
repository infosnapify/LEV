import React from 'react';
import { ViewPage, Category } from '../types';
import { categories, blogPosts } from '../data/blogData';
import { Flame, Video, Sparkles, TrendingUp, Compass, ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoriesProps {
  setView: (page: ViewPage) => void;
}

export default function Categories({ setView }: CategoriesProps) {
  
  // Category Icon Resolver
  const getCategoryIcon = (iconName: string, colorClass: string) => {
    const commonClass = `h-10 w-10 text-${colorClass}-500 mb-4 group-hover:scale-110 transition-transform duration-300`;
    switch (iconName) {
      case 'Flame': return <Flame className={commonClass} />;
      case 'Video': return <Video className={commonClass} />;
      case 'Sparkles': return <Sparkles className={commonClass} />;
      case 'TrendingUp': return <TrendingUp className={commonClass} />;
      case 'Compass': return <Compass className={commonClass} />;
      default: return <Flame className={commonClass} />;
    }
  };

  const getPostCount = (categoryId: string) => {
    return blogPosts.filter(p => p.category.id === categoryId).length;
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 border-b border-white/10 pb-4">
        <button onClick={() => setView({ type: 'home' })} className="hover:text-emerald-500 flex items-center gap-1 cursor-pointer">
          <Home className="h-3 w-3" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-gray-300 font-medium">Categories</span>
      </nav>

      {/* Page Header */}
      <div className="rounded-[32px] border border-white/10 bg-white/2 p-8 md:p-10 shadow-lg shadow-black/10">
        <span className="text-[10px] font-mono tracking-wider text-emerald-500 uppercase font-bold block mb-2">
          Browse by Topic
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white">
          Leak & Scandal Categories
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl mt-2">
          Select a category to view verified reports, leaked videos, private conversations, and detailed forensic investigations.
        </p>
      </div>

      {/* Categories Bento/Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            onClick={() => setView({ type: 'blog-listing', categorySlug: cat.slug })}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/2 p-6 backdrop-blur-lg shadow-sm hover:shadow-md hover:border-emerald-500/30 cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div>
              {getCategoryIcon(cat.icon, cat.color)}
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-500 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  View
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span>Total Articles: <strong>{getPostCount(cat.id)}</strong></span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-[4px] transition-transform">
                Browse Category
                <ChevronRight className="h-4.5 w-4.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
