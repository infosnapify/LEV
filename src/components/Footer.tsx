import React, { useState } from 'react';
import { ViewPage } from '../types';
import { categories } from '../data/blogData';
import { Mail, Send, CheckCircle } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setView: (page: ViewPage) => void;
}

export default function Footer({ setView }: FooterProps) {
  const { language, isRtl, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className={`relative z-10 border border-pink-200 dark:border-pink-900/40 bg-pink-100/40 dark:bg-pink-950/40 backdrop-blur-2xl pt-16 pb-8 rounded-3xl m-3 sm:m-4 md:m-6 shadow-2xl ${isRtl ? 'font-urdu text-right' : 'text-left'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top: Brand + Newsletter */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Brand Col */}
          <div className={`lg:col-span-5 flex flex-col gap-4 ${isRtl ? 'items-end' : 'items-start'}`}>
            <button
              onClick={() => setView({ type: 'home' })}
              className={`flex items-center gap-2 group cursor-pointer w-fit ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
            >
              <Logo className="h-10 w-10 shrink-0" />
              <div className={`flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="text-xl font-bold tracking-tight gradient-text leading-none font-old-english">
                  Leak X Viral
                </span>
                <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-semibold uppercase block mt-1">
                  {isRtl ? 'وائرل ویڈیوز اور لیکس پورٹل' : 'VIRAL VIDEO & LEAKS PORTAL'}
                </span>
              </div>
            </button>
            <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed max-w-md">
              {isRtl 
                ? 'لیک X وائرل ایک آزاد تحقیقاتی اور صحافتی نیٹ ورک ہے جو ڈیجیٹل فارنزک، خفیہ آڈیو لیکس، ٹک ٹاکرز اور اداکاراؤں کی وائرل ویڈیوز کے پیچھے چھپے اصل حقائق کو بے نقاب کرتا ہے۔' 
                : 'Leak X Viral is an independent investigative network specializing in open-source intelligence, digital forensics, and reporting on high-profile internet leaks and controversies.'
              }
            </p>
          </div>

          {/* Newsletter subscription form */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-4 bg-white/2 p-6 rounded-3xl border border-white/10">
            <h3 className={`text-base md:text-lg font-bold text-white ${isRtl ? 'font-urdu' : ''}`}>
              {isRtl ? 'سب سے پہلے ویڈیوز حاصل کریں (الرٹس)' : 'Subscribe to Leak Alerts'}
            </h3>
            <p className="text-xs text-gray-400">
              {isRtl 
                ? 'انٹرنیٹ پر وائرل ہونے والی تمام نئی ویڈیوز، خفیہ ریکارڈنگز اور تفتیشی رپورٹس کا الرٹ ای میل کے ذریعے فوری حاصل کریں۔' 
                : 'Get instant notifications of verified private leaks, cyber reports, and trending controversies delivered straight to your inbox.'
              }
            </p>

            <form onSubmit={handleSubscribe} className={`relative flex max-w-md gap-2 mt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <input
                type="email"
                placeholder={isRtl ? 'اپنا ای میل ایڈریس درج کریں...' : 'Enter your email address...'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs focus:border-rose-500/50 focus:outline-none text-white font-sans ${isRtl ? 'text-right' : 'text-left'}`}
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 px-5 py-3 text-xs font-semibold text-white transition-all shadow-lg shadow-rose-500/10 cursor-pointer shrink-0"
              >
                <span>{isRtl ? 'سبسکرائب' : 'Subscribe'}</span>
                <Send className="h-3 w-3" />
              </button>
            </form>

            {isSubscribed && (
              <div className={`flex items-center gap-1.5 text-emerald-400 text-xs mt-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <CheckCircle className="h-3.5 w-3.5" />
                <span>
                  {isRtl ? 'شکریہ! آپ کا ای میل کامیابی سے رجسٹر کر لیا گیا ہے۔' : 'Success! Your email has been registered for update alerts.'}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Footer Middle: Grid of Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          
          {/* Categories col */}
          <div className="flex flex-col gap-4">
            <h4 className={`text-sm font-bold text-white ${isRtl ? 'border-r-2 border-rose-500 pr-2' : 'border-l-2 border-rose-500 pl-2'}`}>
              {isRtl ? 'کیٹیگریز' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setView({ type: 'blog-listing', categorySlug: cat.slug })}
                    className={`hover:text-rose-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer capitalize ${isRtl ? 'font-urdu' : ''}`}
                  >
                    {isRtl ? cat.nameUrdu : cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core pages col */}
          <div className="flex flex-col gap-4">
            <h4 className={`text-sm font-bold text-white ${isRtl ? 'border-r-2 border-purple-500 pr-2' : 'border-l-2 border-purple-500 pl-2'}`}>
              {isRtl ? 'اہم لنکس' : 'Important Links'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => setView({ type: 'home' })}
                  className={`hover:text-purple-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'ہوم پیج' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'latest' })}
                  className={`hover:text-purple-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'تازہ ترین لیکس' : 'Latest Leaks'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'writers' })}
                  className={`hover:text-purple-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'تحقیقاتی رپورٹ کارڈز' : 'OSINT Investigators'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'videos' })}
                  className={`hover:text-purple-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'ویڈیو تھیٹر (گیلری)' : 'Video Theater'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'images' })}
                  className={`hover:text-purple-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'تصویری ثبوت' : 'Photo Evidence'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'about' })}
                  className={`hover:text-purple-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'ہمارے بارے میں' : 'About Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'contact' })}
                  className={`hover:text-purple-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'محفوظ رابطہ کریں' : 'Secure Contact'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal pages col */}
          <div className="flex flex-col gap-4">
            <h4 className={`text-sm font-bold text-white ${isRtl ? 'border-r-2 border-rose-500 pr-2' : 'border-l-2 border-rose-500 pl-2'}`}>
              {isRtl ? 'ڈس کلیمر اور پالیسی' : 'Legal & Policies'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => setView({ type: 'privacy-policy' })}
                  className={`hover:text-rose-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'terms-conditions' })}
                  className={`hover:text-rose-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'شرائط و ضوابط' : 'Terms & Conditions'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'disclaimer' })}
                  className={`hover:text-rose-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'صحافتی ڈس کلیمر' : 'Journalistic Disclaimer'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView({ type: 'cookie-policy' })}
                  className={`hover:text-rose-400 hover:translate-x-[4px] transition-all duration-200 cursor-pointer ${isRtl ? 'font-urdu' : ''}`}
                >
                  {isRtl ? 'کوکیز پالیسی' : 'Cookie Policy'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info col */}
          <div className="flex flex-col gap-4">
            <h4 className={`text-sm font-bold text-white ${isRtl ? 'border-r-2 border-purple-500 pr-2' : 'border-l-2 border-purple-500 pl-2'}`}>
              {isRtl ? 'تحقیقاتی سیل' : 'Communications'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="text-xs">
                <strong>{isRtl ? 'محفوظ ای میل' : 'Secure Support'}:</strong><br />
                <span className="font-mono text-xs text-gray-500">contact@leakxviral.com</span>
              </li>
              <li className="text-xs">
                <strong>{isRtl ? 'سائبر ہیلپ ڈیسک' : 'Cyber Helpdesk'}:</strong><br />
                <span className="font-mono text-xs text-gray-500">+1-800-CYBER-SEC</span>
              </li>
              <li className="text-xs">
                <strong>{isRtl ? 'تحقیقاتی بیورو لوکیشن' : 'Base Location'}:</strong><br />
                <span>{isRtl ? 'محفوظ زون، بلاک سی، گلوبل ہیکرز یونین' : 'Forensics Guild, Secure Block C'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Ad Placement */}
        <div className="my-2 border-t border-white/10 pt-2">
          <AdPlaceholder type="footer-ad" />
        </div>

        {/* Bottom copyright */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-gray-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div>
            &copy; {new Date().getFullYear()} Leak X Viral. {isRtl ? 'جملہ حقوق محفوظ ہیں۔' : 'All rights reserved.'}
          </div>
          <div className={`flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span>{isRtl ? 'کرپٹوگرافک سیکیورٹی کے ساتھ تیار کردہ' : 'Built with cryptographic precision'}</span>
            <span className="text-rose-500">❤️</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
