import React, { useState } from 'react';
import { ViewPage, Author, BlogPost } from '../types';
import { authors, blogPosts } from '../data/blogData';
import { useAd } from '../context/AdContext';
import { BookOpen, ArrowRight, Award } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import VerifiedBadge from '../components/VerifiedBadge';

interface WritersProps {
  setView: (page: ViewPage) => void;
}

export default function Writers({ setView }: WritersProps) {
  const { triggerAd } = useAd();
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  // Convert the authors dictionary to an array
  const writersList = Object.values(authors);

  // Filter posts written by the selected author
  const authorPosts = selectedAuthor 
    ? blogPosts.filter(post => post.author.name === selectedAuthor.name)
    : [];

  return (
    <div className="space-y-10 text-left">
      
      {/* Page Title Header */}
      <div className="rounded-[32px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-slate-200 dark:border-white/5 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-bl-2xl text-xs font-bold font-sans">
          OUR WRITERS & RESEARCHERS
        </div>
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-sans">
            <Award className="h-3.5 w-3.5 animate-pulse" />
            Domain Experts & Investigative Journalists
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            LeakViralVideo Columnists & OSINT Specialists
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-medium leading-relaxed">
            All reports, video verifications, and digital forensic studies on our platform are produced by cyber security specialists, verified legal analysts, and senior open-source intelligence (OSINT) researchers.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Writers List Grid (Col 8 or full depending on filter) */}
        <div className={`${selectedAuthor ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6 transition-all duration-300`}>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-l-4 border-indigo-500 pl-3">
            Independent Investigators
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {writersList.map((writer) => {
              const postCount = blogPosts.filter(p => p.author.name === writer.name).length;
              const isSelected = selectedAuthor?.name === writer.name;

              return (
                <div
                  key={writer.name}
                  onClick={() => triggerAd(() => setSelectedAuthor(writer))}
                  className={`rounded-3xl border p-6 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between space-y-6 ${
                    isSelected 
                      ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                      : 'bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 hover:border-indigo-500/40 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <img 
                        src={writer.avatar} 
                        alt={writer.name}
                        className="h-16 w-16 rounded-2xl object-cover border-2 border-indigo-500/20 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-0.5">
                          {writer.name}
                          <VerifiedBadge />
                        </h4>
                        <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold">
                          {writer.role}
                        </span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {writer.bio}
                    </p>
                  </div>

                  {/* Actions & Count */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-indigo-400" />
                      {postCount} verified reports
                    </span>
                    <span className="text-xs text-indigo-500 font-bold flex items-center gap-1">
                      View Reports
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <AdPlaceholder type="in-article" />
          </div>
        </div>

        {/* Selected Author Articles Feed (Col 6) */}
        {selectedAuthor && (
          <div className="lg:col-span-6 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white border-l-4 border-indigo-500 pl-3 flex items-center gap-0.5">
                Reports by {selectedAuthor.name} <VerifiedBadge />
              </h3>
              <button 
                onClick={() => setSelectedAuthor(null)}
                className="text-xs text-rose-500 hover:underline font-bold"
              >
                Close ×
              </button>
            </div>

            <div className="space-y-4">
              {authorPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => triggerAd(() => setView({ type: 'single-blog', blogId: post.id }))}
                  className="group rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/2 p-4 hover:border-indigo-500/40 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer flex gap-4"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-white/5">
                    <img 
                      src={post.thumbnailImage} 
                      alt={post.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-0.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
                        <span>{post.publishDate}</span>
                        <span>•</span>
                        <span>{post.readingTime} read</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-500 transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <span className="text-xs text-indigo-500 font-bold flex items-center gap-1">
                      Read Story <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
