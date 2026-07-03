import React, { useState } from 'react';
import { ViewPage, BlogPost } from '../types';
import { blogPosts } from '../data/blogData';
import { useAd } from '../context/AdContext';
import { Play, Tv, Clock, Calendar, ArrowRight, Video } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import VerifiedBadge from '../components/VerifiedBadge';
import { useLanguage } from '../context/LanguageContext';

interface VideosPageProps {
  setView: (page: ViewPage) => void;
}

export default function VideosPage({ setView }: VideosPageProps) {
  const { triggerAd } = useAd();
  const { language, isRtl, t } = useLanguage();
  const [activeVideoPost, setActiveVideoPost] = useState<BlogPost | null>(blogPosts[0]);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  // Filter posts with video placeholder
  const videoPosts = blogPosts.filter(post => post.videoPlaceholder);

  const handleSelectVideo = (post: BlogPost) => {
    setActiveVideoPost(post);
    setIsPlayingVideo(false);
  };

  return (
    <div className={`space-y-10 ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
      
      {/* Page Title Header */}
      <div className="rounded-[32px] bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-transparent border border-slate-200 dark:border-white/5 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
        <div className={`absolute top-0 ${isRtl ? 'left-0 rounded-br-2xl' : 'right-0 rounded-bl-2xl'} bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-2 text-xs font-bold font-sans`}>
          {isRtl ? 'خصوصی ویڈیو گیلری' : 'EXCLUSIVE VIDEO SHOWROOM'}
        </div>
        <div className={`relative z-10 space-y-4 max-w-2xl ${isRtl ? 'mr-0' : 'ml-0'}`}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold font-sans ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Video className="h-3.5 w-3.5 animate-pulse animate-bounce" />
            <span>{isRtl ? 'ویڈیو تھیٹر اور لائیو شواہد' : 'Video Theatre & Live Streams'}</span>
          </div>
          <h1 className={`text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight ${isRtl ? 'font-urdu' : ''}`}>
            {isRtl ? 'لیک ویڈیوز اور بریکنگ میڈیا کلپس' : 'Leaked Videos & Breaking Media Clips'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed">
            {isRtl 
              ? 'انٹرنیٹ اور سوشل میڈیا پر ہیک ہونے والی تمام ویڈیوز، آڈیو ثبوت، اداکاراؤں اور ٹک ٹاکرز کی خفیہ ریکارڈنگز کا تفصیلی فارنزک تجزیہ یہاں دیکھیں۔' 
              : 'Preview cyber leak clips, secret voice recordings, behind-the-scenes captures, and authenticated surveillance videos with deep forensic analyses.'
            }
          </p>
        </div>
      </div>

      {/* Video Theater Block */}
      {activeVideoPost && activeVideoPost.videoPlaceholder && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Player Screen (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative overflow-hidden aspect-video w-full rounded-3xl bg-slate-950 border border-slate-200 dark:border-white/10 shadow-2xl animate-fade-in">
              {!isPlayingVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-950/80 z-10">
                  <button
                    onClick={() => triggerAd(() => setIsPlayingVideo(true))}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-110 cursor-pointer animate-pulse animate-bounce"
                  >
                    <Play className="h-9 w-9 translate-x-[-1px]" />
                  </button>
                  <span className={`block mt-6 text-sm font-bold text-white px-6 ${isRtl ? 'font-urdu' : ''}`}>
                    {isRtl ? activeVideoPost.titleUrdu : activeVideoPost.videoPlaceholder.title}
                  </span>
                  <span className="text-xs text-amber-500 mt-2 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
                    {isRtl 
                      ? 'اسپانسرڈ تیز رفتار میڈیا سرور کو فعال کرنے کے لیے پلے کے نشان پر کلک کریں' 
                      : 'Please click play to unlock sponsored high-speed streaming pipeline'
                    }
                  </span>
                </div>
              ) : activeVideoPost.videoPlaceholder.type === 'youtube' ? (
                <iframe
                  id="youtube-player-iframe"
                  src={`${activeVideoPost.videoPlaceholder.url}?autoplay=1`}
                  title={activeVideoPost.videoPlaceholder.title}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoPost.videoPlaceholder.url}
                  controls
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>

            {/* Video Details Card */}
            <div className={`rounded-[32px] border border-slate-200 dark:border-white/5 bg-white dark:bg-white/2 p-6 md:p-8 backdrop-blur-md space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-1 text-xs font-bold">
                {isRtl ? activeVideoPost.category.nameUrdu : activeVideoPost.category.name}
              </span>
              <h2 className={`text-lg md:text-2xl font-black text-slate-900 dark:text-white leading-snug ${isRtl ? 'font-urdu' : ''}`}>
                {isRtl ? activeVideoPost.titleUrdu : activeVideoPost.videoPlaceholder.title}
              </h2>
              
              <div className={`flex flex-wrap items-center gap-6 text-[10px] text-slate-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {activeVideoPost.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {activeVideoPost.readingTime} {isRtl ? 'تجزیہ' : 'Analysis'}
                </span>
                <span className={`text-rose-500 font-bold flex items-center gap-0.5 ${isRtl ? 'font-urdu' : ''}`}>
                  {isRtl ? 'بذریعہ' : 'by'} {isRtl ? activeVideoPost.author.nameUrdu : activeVideoPost.author.name}
                  <VerifiedBadge />
                </span>
              </div>

              <p className={`text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed ${isRtl ? 'font-urdu' : ''}`}>
                {isRtl 
                  ? `یہ خصوصی میڈیا کلپ ہماری تفصیلی تحقیقاتی رپورٹ کا حصہ ہے: "${activeVideoPost.titleUrdu}"۔ مکمل سچائی، شواہد اور سائبر فارنزک رپورٹ جاننے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔` 
                  : `This media clip is a secure evidence reference for the main report: "${activeVideoPost.title}". Please click below to read the comprehensive write-up and check additional forensic context.`
                }
              </p>

              <button
                onClick={() => triggerAd(() => setView({ type: 'single-blog', blogId: activeVideoPost.id }))}
                className={`inline-flex items-center gap-2 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs px-5 py-3 shadow-md hover:scale-105 transition-all cursor-pointer ${isRtl ? 'flex-row-reverse font-urdu' : ''}`}
              >
                <span>{isRtl ? 'مکمل تحقیقاتی رپورٹ پڑھیں' : 'Read Full Investigative Report'}</span>
                <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Video Playlist Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h3 className={`text-base font-bold text-slate-800 dark:text-white border-rose-500 ${isRtl ? 'border-r-4 pr-3 text-right' : 'border-l-4 pl-3 text-left'}`}>
              {isRtl ? 'دیگر وائرل ویڈیوز' : 'Other Viral Leaks'}
            </h3>

            <div className="space-y-4">
              {videoPosts.map((post) => {
                const isActive = activeVideoPost.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => triggerAd(() => handleSelectVideo(post))}
                    className={`rounded-2xl border p-3 cursor-pointer transition-all duration-200 flex gap-4 ${
                      isActive 
                        ? 'bg-rose-500/10 border-rose-500/40 shadow-md shadow-rose-500/5' 
                        : 'bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 hover:border-rose-500/30'
                    } ${isRtl ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 relative border border-slate-100 dark:border-white/5 bg-slate-900">
                      <img 
                        src={post.thumbnailImage} 
                        alt={isRtl ? post.titleUrdu : post.title}
                        className="h-full w-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20">
                        <Play className="h-5 w-5 text-white filter drop-shadow" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between py-0.5 w-full">
                      <h4 className={`text-xs font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug ${isRtl ? 'font-urdu' : ''}`}>
                        {isRtl ? post.titleUrdu : post.videoPlaceholder?.title}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-sans">
                        {isRtl ? post.category.nameUrdu : post.category.name} • {post.publishDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <AdPlaceholder type="sidebar" />
          </div>

        </div>
      )}

    </div>
  );
}
