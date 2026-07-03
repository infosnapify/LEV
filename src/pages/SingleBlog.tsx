import React, { useState, useEffect } from 'react';
import { BlogPost, ViewPage } from '../types';
import { blogPosts } from '../data/blogData';
import { 
  Clock, 
  Home, 
  ArrowRight, 
  Share2, 
  Heart, 
  List, 
  MessageSquare, 
  Play, 
  Check, 
  Copy, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  ChevronUp,
  PlayCircle,
  Camera,
  Download,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from '../components/Sidebar';
import AdPlaceholder from '../components/AdPlaceholder';
import VerifiedBadge from '../components/VerifiedBadge';
import { useAd } from '../context/AdContext';
import { useLanguage } from '../context/LanguageContext';

interface SingleBlogProps {
  blogId: string;
  setView: (page: ViewPage) => void;
}

export default function SingleBlog({ blogId, setView }: SingleBlogProps) {
  const { triggerAd } = useAd();
  const { language, isRtl, t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Video download states
  const [downloadState, setDownloadState] = useState<'idle' | 'checking' | 'downloading' | 'completed'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const post = blogPosts.find(p => p.id === blogId) || blogPosts[0];

  // Track scroll progress for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Back to Top button handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find index for Prev/Next navigation
  const currentIdx = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  // Fetch related posts from database
  const relatedPosts = blogPosts.filter(p => post.relatedIds?.includes(p.id) || p.category.id === post.category.id).filter(p => p.id !== post.id).slice(0, 2);

  // Social share simulations
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    const text = encodeURIComponent(`Read full forensic investigation: ${isRtl ? post.titleUrdu : post.title}`);
    const url = encodeURIComponent(window.location.href);
    let shareUrl = '';
    
    if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // Dynamic status messages matching the security look for download delay
  const getDownloadMessage = (progress: number) => {
    if (progress <= 20) {
      return isRtl 
        ? 'کنکشن محفوظ کیا جا رہا ہے... (15-30 سیکنڈ انتظار کریں)' 
        : 'Securing streaming line connection... (15-30s wait)';
    }
    if (progress <= 40) {
      return isRtl 
        ? 'سرور کلسٹر لوڈ کو بائی پاس کیا جا رہا ہے...' 
        : 'Bypassing proxy server congestion loops...';
    }
    if (progress <= 60) {
      return isRtl 
        ? 'بیک اپ میڈیا فائل کے خفیہ کوڈ حل کیے جا رہے ہیں...' 
        : 'Decrypting cloud backup source packets...';
    }
    if (progress <= 80) {
      return isRtl 
        ? 'ہائی اسپیڈ ڈاؤن لوڈ پیلوڈ کو ترتیب دیا جا رہا ہے...' 
        : 'Assembling high-speed transmission segments...';
    }
    if (progress <= 95) {
      return isRtl 
        ? 'فارنزک آڈٹ اور SHA-256 ہیش چیک مکمل ہو رہا ہے...' 
        : 'Executing SHA-256 integrity validation check...';
    }
    return isRtl 
      ? 'ڈاؤن لوڈ شروع کرنے کے لیے تیار!' 
      : 'Decryption successful! Unleashing download stream...';
  };

  // Video download process triggering sponsored AdSense Ad
  const handleVideoDownload = () => {
    // 1. Run the AdSense Ad first as requested
    triggerAd(() => {
      // 2. Once ad is viewed, kick off high-fidelity server connection simulation
      setDownloadState('checking');
      setDownloadProgress(0);

      setTimeout(() => {
        setDownloadState('downloading');
        const interval = setInterval(() => {
          setDownloadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setDownloadState('completed');
              
              // Trigger the secure test download stream
              const link = document.createElement('a');
              link.href = post.videoPlaceholder?.url || 'https://www.w3schools.com/html/mov_bbb.mp4';
              link.setAttribute('download', `${post.id}-verified-leak.mp4`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              return 100;
            }
            return prev + 5; // 5% increment every 1s = 20s total wait
          });
        }, 1000);
      }, 2000); // 2s initial verification wait
    });
  };

  // Dynamically extract table of contents based on active language
  const getTOCItems = () => {
    if (isRtl) {
      return [
        { id: 'sec-1', label: '1. خلاصہ اور تعارف' },
        { id: 'sec-2', label: '2. فارنزک ویڈیو اور آڈیو تجزیہ' },
        { id: 'sec-3', label: '3. قانون اور سائبر کرائم انتباہ' }
      ];
    }
    return [
      { id: 'sec-1', label: '1. Summary & Introduction' },
      { id: 'sec-2', label: '2. Forensic Video & Audio Audit' },
      { id: 'sec-3', label: '3. Legal and Cyber-Crime Warnings' }
    ];
  };

  const toc = getTOCItems();

  return (
    <div className={`space-y-8 relative ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
      
      {/* Reading Progress Bar */}
      <div 
        id="reading-progress-bar"
        className="fixed top-16 right-0 left-0 h-1 bg-gradient-to-r from-rose-500 to-purple-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 1. Breadcrumbs */}
      <nav className={`flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 pb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button onClick={() => setView({ type: 'home' })} className="hover:text-rose-500 flex items-center gap-1 cursor-pointer">
          <Home className="h-3 w-3" />
          <span>{isRtl ? 'ہوم' : 'Home'}</span>
        </button>
        <span>/</span>
        <button onClick={() => setView({ type: 'blog-listing', categorySlug: post.category.slug })} className="hover:text-rose-500 cursor-pointer">
          {isRtl ? post.category.nameUrdu : post.category.name}
        </button>
        <span>/</span>
        <span className="text-slate-700 dark:text-gray-300 font-medium truncate max-w-[200px]">{isRtl ? post.titleUrdu : post.title}</span>
      </nav>

      {/* 2. Top Content Banner Ad */}
      <div className="w-full">
        <AdPlaceholder type="top-banner" />
      </div>

      {/* 3. Main Article Body Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Article Area (Col-8) */}
        <article className="lg:col-span-8 space-y-8 bg-white dark:bg-white/2 rounded-[32px] border border-slate-200 dark:border-white/10 p-6 md:p-10 backdrop-blur-md">
          
          {/* Post Header details */}
          <div className="space-y-4">
            <span className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-1 text-xs font-bold">
              {isRtl ? post.category.nameUrdu : post.category.name}
            </span>
            <h1 className={`text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-normal ${isRtl ? 'font-urdu' : ''}`}>
              {isRtl ? post.titleUrdu : post.title}
            </h1>

            {/* Author Profile + Metadata */}
            <div className={`flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 dark:border-white/10 py-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <img
                  src={post.author.avatar}
                  alt={isRtl ? post.author.nameUrdu : post.author.name}
                  className="h-10 w-10 rounded-full object-cover border border-rose-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className={`text-sm font-bold text-slate-800 dark:text-white flex items-center gap-0.5 ${isRtl ? 'flex-row-reverse font-urdu' : ''}`}>
                    {isRtl ? post.author.nameUrdu : post.author.name}
                    <VerifiedBadge />
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {isRtl ? post.author.roleUrdu : post.author.role}
                  </span>
                </div>
              </div>

              <div className={`flex items-center gap-4 text-xs text-slate-500 dark:text-gray-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {post.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {post.readingTime} {t('read_time')}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Large Featured Hero Image */}
          <div id="media-hero-image" className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-sm border border-slate-200 dark:border-white/10">
            <img
              src={post.featuredImage}
              alt={isRtl ? post.titleUrdu : post.title}
              className="h-full w-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
          </div>

          {/* 5. Interactive Table Of Contents */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10 p-6 space-y-3">
            <div className={`flex items-center gap-2 text-rose-600 dark:text-rose-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <List className="h-4.5 w-4.5" />
              <h4 className="text-sm font-bold">
                {isRtl ? 'تفصیلی فہرست' : 'Table of Contents'}
              </h4>
            </div>
            <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-gray-300 ${isRtl ? 'pr-2' : 'pl-2'}`}>
              {toc.map((item, i) => (
                <li key={item.id} className={`hover:text-rose-500 cursor-pointer flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                  <span className="text-[10px] bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded">
                    0{i+1}
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. Rich Content HTML with Embedded Video and Image Gallery */}
          <div className={`text-slate-800 dark:text-gray-200 space-y-6 text-sm md:text-base leading-loose ${isRtl ? 'font-urdu' : ''}`}>
            {(() => {
              const activeHtml = isRtl ? post.contentHtmlUrdu : post.contentHtml;
              const contentParts = activeHtml.split('<h3');
              const sections = contentParts.map((part, idx) => (idx === 0 ? part : '<h3' + part));
              
              return (
                <>
                  {/* Section 0 (Introduction paragraph) */}
                  {sections[0] && (
                    <div dangerouslySetInnerHTML={{ __html: sections[0] }} />
                  )}

                  {/* 1. Under Title/Introduction Big Picture ("title k nechy big picture") */}
                  {post.gallery && post.gallery[0] && (
                    <div className="my-6 space-y-2">
                      <div 
                        onClick={() => setActiveImageIndex(0)}
                        className="relative overflow-hidden aspect-video w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 hover:border-rose-500/30 transition-all cursor-zoom-in group shadow-md"
                      >
                        <img
                          src={post.gallery[0]}
                          alt="Primary Evidence Snapshot"
                          className="h-full w-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-3 left-3 bg-slate-950/80 text-white rounded px-2.5 py-1 text-xs font-mono font-bold tracking-wider backdrop-blur-sm border border-white/10">
                          {isRtl ? 'تصویری ثبوت 1 (تفصیلی جائزہ)' : 'Primary Forensic Snapshot 1'}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic leading-relaxed">
                        {isRtl 
                          ? 'مقدمہ سے متعلق پہلا تصدیق شدہ اسکرین شاٹ اور میڈیا میٹا ڈیٹا لاگ۔' 
                          : 'First verified evidence snapshot and metadata capture associated with the file stream.'
                        }
                      </p>
                    </div>
                  )}

                  {/* 2. Embedded Video Block with Middle Image ("middle mn video k sath") */}
                  {post.videoPlaceholder && (
                    <div id="media-video-player" className="my-8 p-4 md:p-6 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/5 space-y-4">
                      <div className={`flex items-center gap-2 text-rose-600 dark:text-rose-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <PlayCircle className="h-5 w-5 animate-pulse" />
                        <h4 className="text-sm md:text-base font-black">
                          {isRtl ? 'خصوصی فارنزک ویڈیو ثبوت اور لائیو تجزیہ' : 'Exclusive Video Forensic Analysis & Live Verification'}
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        {/* Video streaming box */}
                        <div className="md:col-span-7 relative overflow-hidden aspect-video w-full rounded-2xl bg-slate-950 border border-slate-200 dark:border-white/5 animate-fade-in">
                          {!isPlayingVideo ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/80 z-10">
                              <button
                                onClick={() => triggerAd(() => setIsPlayingVideo(true))}
                                className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-110 cursor-pointer animate-pulse animate-bounce"
                              >
                                <Play className="h-7 w-7 translate-x-[1px]" />
                              </button>
                              <span className="block mt-4 text-xs font-semibold text-slate-300 px-4">
                                {post.videoPlaceholder.title}
                              </span>
                              <span className="text-[10px] text-emerald-400 mt-2 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 animate-pulse">
                                {isRtl ? 'ویڈیو اسٹریمنگ شروع کرنے کے لیے پلے بٹن دبائیں' : 'Click play to start streaming the leak video instantly'}
                              </span>
                            </div>
                          ) : post.videoPlaceholder.type === 'youtube' ? (
                            <iframe
                              id="youtube-player-iframe"
                              src={`${post.videoPlaceholder.url}?autoplay=1`}
                              title={post.videoPlaceholder.title}
                              className="absolute inset-0 h-full w-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={post.videoPlaceholder.url}
                              controls
                              autoPlay
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          )}
                        </div>

                        {/* Middle image next to video player */}
                        <div className="md:col-span-5 space-y-2">
                          {post.gallery && post.gallery[1] && (
                            <div 
                              onClick={() => setActiveImageIndex(1)}
                              className="relative overflow-hidden aspect-video w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 hover:border-rose-500/30 transition-all cursor-zoom-in group shadow-md"
                            >
                              <img
                                src={post.gallery[1]}
                                alt="Middle Forensic Evidence"
                                className="h-full w-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-2 left-2 bg-slate-950/80 text-white rounded px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider backdrop-blur-sm border border-white/10">
                                {isRtl ? 'تصویری ثبوت 2' : 'Evidence Snapshot 2'}
                              </div>
                            </div>
                          )}
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal text-center italic">
                            {isRtl 
                              ? 'ویڈیو ریکارڈ کے درمیانی حصے کا فارنزک امیج تجزیہ۔' 
                              : 'Mid-stream analysis reference frame captured under calibrated focal parameters.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. GLOWING DOWNLOAD PANEL */}
                  <div className="my-8 p-6 rounded-3xl border-2 border-dashed border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 space-y-4">
                    <div className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <div className="p-2 bg-rose-500/10 rounded-2xl text-rose-500 shrink-0">
                        <Download className="h-6 w-6 animate-bounce" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {isRtl ? 'لیک ویڈیو ڈاؤن لوڈ کریں (تیز رفتار سرور)' : 'Download Original Leak Video (Fast Server)'}
                          <span className="text-[9px] font-mono bg-emerald-500 text-white px-2 py-0.5 rounded font-black uppercase animate-pulse">Direct</span>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {isRtl 
                            ? 'ڈاؤن لوڈ کے بٹن پر کلک کرنے سے پریمیم کوالٹی ڈاؤن لوڈ خود کار طریقے سے شروع ہو جائے گا۔' 
                            : 'Clicking the download button instantly boots the high-speed file download protocol in premium quality.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      {downloadState === 'idle' && (
                        <button
                          onClick={handleVideoDownload}
                          className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] shadow-lg shadow-rose-500/20 glow-green"
                        >
                          <Download className="h-4.5 w-4.5" />
                          <span>{isRtl ? 'فائل ڈاؤن لوڈ شروع کریں' : 'Initialize Direct Download'}</span>
                        </button>
                      )}

                      {downloadState === 'checking' && (
                        <div className="flex items-center justify-center gap-2 p-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-600 dark:text-slate-300">
                          <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
                          <span className="text-xs font-bold font-mono animate-pulse">
                            {isRtl ? 'سرور سیکیورٹی ٹنل قائم کی جا رہی ہے...' : 'Establishing Secure Server Tunnel...'}
                          </span>
                        </div>
                      )}

                      {downloadState === 'downloading' && (
                        <div className="space-y-3 bg-slate-100 dark:bg-white/5 p-4 rounded-2xl">
                          <div className={`flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <span className="text-rose-500 animate-pulse">
                              {getDownloadMessage(downloadProgress)}
                            </span>
                            <span className="font-mono bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded text-[10px]">
                              {downloadProgress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-300" 
                              style={{ width: `${downloadProgress}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-slate-400 text-center font-mono">
                            {isRtl ? 'براہ مہربانی صفحہ بند نہ کریں۔ سرور پریمیم کوالٹی لنک تیار کر رہا ہے۔' : 'Do not close this page. High-speed direct access key is being generated.'}
                          </div>
                        </div>
                      )}

                      {downloadState === 'completed' && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                          <ShieldCheck className="h-5 w-5 shrink-0" />
                          <div className="text-xs">
                            <span className="block font-extrabold">{isRtl ? 'ڈاؤن لوڈ کامیابی کے ساتھ شروع ہو گیا!' : 'File Download Started!'}</span>
                            <span className="block mt-0.5 text-slate-500">{isRtl ? 'اگر ڈاؤن لوڈ خود بخود شروع نہیں ہوا تو دوبارہ کلک کریں۔' : 'If your download didn\'t trigger, click to retry.'}</span>
                          </div>
                          <button 
                            onClick={() => setDownloadState('idle')} 
                            className="ml-auto text-xs font-black underline hover:text-emerald-400 cursor-pointer"
                          >
                            {isRtl ? 'دوبارہ ڈاؤن لوڈ کریں' : 'Download Again'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 1 (First subtopic) */}
                  {sections[1] && (
                    <div dangerouslySetInnerHTML={{ __html: sections[1] }} />
                  )}

                  {/* In-Article Ad Banner right between content */}
                  <div className="my-6 py-2 border-y border-slate-200 dark:border-white/10">
                    <AdPlaceholder type="in-article" />
                  </div>

                  {/* Remaining Sections */}
                  {sections.slice(2).map((sectionHtml, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: sectionHtml }} />
                  ))}

                  {/* 4. End of Content Image ("end pr") */}
                  {post.gallery && post.gallery[2] && (
                    <div className="my-8 space-y-2">
                      <div className={`flex items-center gap-2 text-rose-600 dark:text-rose-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <Camera className="h-4.5 w-4.5" />
                        <h4 className="text-xs font-black uppercase tracking-wider">
                          {isRtl ? 'آخری تصویری تجزیہ اور حتمی رپورٹ' : 'Closing Evidence & Verification Analysis'}
                        </h4>
                      </div>
                      <div 
                        onClick={() => setActiveImageIndex(2)}
                        className="relative overflow-hidden aspect-video w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 hover:border-rose-500/30 transition-all cursor-zoom-in group shadow-md"
                      >
                        <img
                          src={post.gallery[2]}
                          alt="Final Closing Evidence Snapshot"
                          className="h-full w-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-3 left-3 bg-slate-950/80 text-white rounded px-2.5 py-1 text-xs font-mono font-bold tracking-wider backdrop-blur-sm border border-white/10">
                          {isRtl ? 'تصویری ثبوت 3 (حتمی خلاصہ)' : 'Evidence Snapshot 3 (Closing)'}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic leading-relaxed">
                        {isRtl 
                          ? 'حتمی خلاصہ اور میٹا ڈیٹا کی صداقت کی تصدیق کی چابی۔' 
                          : 'Final authentication validation proof captured at stream closing.'
                        }
                      </p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Lightbox Modal for Gallery Images */}
          <AnimatePresence>
            {activeImageIndex !== null && post.gallery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageIndex(null)}
                className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
              >
                <div className="max-w-4xl max-h-[80vh] relative">
                  <img
                    src={post.gallery[activeImageIndex]}
                    alt="Expanded look"
                    className="object-contain rounded-2xl w-full h-full border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-[-32px] inset-x-0 text-center text-xs text-slate-400 font-mono">
                    {activeImageIndex + 1} / {post.gallery.length} • Click anywhere to exit
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 10. Tags list */}
          <div className={`flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 dark:border-white/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 pr-1">{isRtl ? 'ٹیگز:' : 'Tags:'}</span>
            {post.tags.map(tag => (
              <button
                key={tag}
                onClick={() => setView({ type: 'blog-listing', searchQuery: tag })}
                className="rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-rose-500/15 hover:text-rose-600 dark:hover:text-rose-400 text-xs text-slate-600 dark:text-gray-300 px-3 py-1 transition-all cursor-pointer border border-slate-200 dark:border-white/5"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* 11. Social Share + Like Interactive Indicators */}
          <div className={`flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/10 p-4 rounded-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Share2 className="h-4 w-4 text-slate-400" />
              <span>{isRtl ? 'رپورٹ شیئر کریں:' : 'Share Report:'}</span>
              <button onClick={() => triggerAd(() => handleShare('whatsapp'))} className="text-emerald-600 dark:text-emerald-500 hover:underline hover:scale-105 transition-all cursor-pointer font-bold">WhatsApp</button>
              <span>•</span>
              <button onClick={() => triggerAd(() => handleShare('twitter'))} className="text-sky-600 dark:text-sky-500 hover:underline hover:scale-105 transition-all cursor-pointer font-bold">Twitter (X)</button>
              <span>•</span>
              <button onClick={() => triggerAd(() => handleShare('facebook'))} className="text-blue-600 hover:underline hover:scale-105 transition-all cursor-pointer font-bold">Facebook</button>
            </div>

            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => triggerAd(handleCopyLink)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-xs font-semibold px-3 py-2 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? (isRtl ? 'لنک کاپی ہو گیا!' : 'Link Copied!') : (isRtl ? 'لنک کاپی کریں' : 'Copy Link')}</span>
              </button>

              <button
                onClick={() => triggerAd(() => setLiked(!liked))}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold cursor-pointer transition-all ${
                  liked 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                    : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{liked ? (isRtl ? 'پسندیدہ!' : 'Liked!') : (isRtl ? 'لائیک کریں' : 'Like')}</span>
              </button>
            </div>
          </div>

          {/* 12. Prev / Next Navigation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            
            {/* Previous post card */}
            {prevPost ? (
              <button
                onClick={() => setView({ type: 'single-blog', blogId: prevPost.id })}
                className={`rounded-2xl border border-slate-200 dark:border-white/10 hover:border-rose-500/30 bg-white dark:bg-white/2 p-5 text-left flex flex-col gap-1 transition-all hover:bg-slate-50 dark:hover:bg-white/5 group cursor-pointer ${isRtl ? 'text-right items-end' : 'text-left items-start'}`}
              >
                <span className={`text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                  {isRtl ? 'پچھلی رپورٹ' : 'PREVIOUS REPORT'}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors">
                  {isRtl ? prevPost.titleUrdu : prevPost.title}
                </span>
              </button>
            ) : <div />}

            {/* Next post card */}
            {nextPost ? (
              <button
                onClick={() => setView({ type: 'single-blog', blogId: nextPost.id })}
                className={`rounded-2xl border border-slate-200 dark:border-white/10 hover:border-rose-500/30 bg-white dark:bg-white/2 p-5 text-right flex flex-col gap-1 transition-all hover:bg-slate-50 dark:hover:bg-white/5 group cursor-pointer ${isRtl ? 'text-left items-start' : 'text-right items-end'}`}
              >
                <span className={`text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1 ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
                  {isRtl ? 'اگلی رپورٹ' : 'NEXT REPORT'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors">
                  {isRtl ? nextPost.titleUrdu : nextPost.title}
                </span>
              </button>
            ) : <div />}

          </div>

          {/* 13. Related Articles recommendation list */}
          {relatedPosts.length > 0 && (
            <div className={`space-y-4 pt-4 border-t border-slate-200 dark:border-white/10 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {isRtl ? 'متعلقہ انویسٹی گیشنز' : 'Related Investigations'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => setView({ type: 'single-blog', blogId: rel.id })}
                    className={`flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-rose-500/30 p-3 bg-white dark:bg-white/2 cursor-pointer group ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <img
                      src={rel.thumbnailImage}
                      alt={isRtl ? rel.titleUrdu : rel.title}
                      className="h-14 w-20 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-500">
                        {isRtl ? rel.titleUrdu : rel.title}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{rel.publishDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 14. Bottom AdSense Banner placeholder */}
          <div className="pt-2">
            <AdPlaceholder type="bottom-ad" />
          </div>

        </article>

        {/* Sidebar Area (Col-4) */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-8">
            
            {/* Quick Share Overlay widget */}
            <div className={`rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 backdrop-blur-lg shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              <h4 className="text-base font-bold text-slate-800 dark:text-white mb-4">
                {isRtl ? 'ردعمل ظاہر کریں' : 'Post Reactions'}
              </h4>
              <div className={`flex items-center justify-around gap-2 text-center text-xs font-semibold ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 ${liked ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300'}`}>
                    <Heart className={`h-4.5 w-4.5 ${liked ? 'fill-rose-500' : ''}`} />
                  </div>
                  <span>{isRtl ? 'لائیک' : 'Like'}</span>
                </button>
                <button onClick={handleCopyLink} className="flex flex-col items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 ${copied ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300'}`}>
                    {copied ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4.5 w-4.5" />}
                  </div>
                  <span>{isRtl ? 'کاپی' : 'Copy'}</span>
                </button>
                <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-rose-500">
                    <MessageSquare className="h-4.5 w-4.5" />
                  </div>
                  <span>{isRtl ? 'شیئر' : 'Share'}</span>
                </button>
              </div>
            </div>

            <Sidebar setView={setView} onPostClick={(id) => setView({ type: 'single-blog', blogId: id })} />
          </div>
        </div>

      </div>

      {/* Floating Back To Top Button */}
      <button
        id="back-to-top-btn"
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-white/5 hover:bg-rose-500 dark:hover:bg-rose-500 text-slate-700 dark:text-white shadow-xl hover:scale-105 transition-all cursor-pointer border border-slate-200 dark:border-white/10"
        title="Scroll to Top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

    </div>
  );
}
