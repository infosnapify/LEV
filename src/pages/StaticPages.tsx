import React, { useState } from 'react';
import { ViewPage } from '../types';
import { aboutContent, faqData } from '../data/blogData';
import { 
  Home, 
  Send, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Cookie,
  HelpCircle as QuestionIcon,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface StaticPageProps {
  type: 'about' | 'contact' | 'privacy-policy' | 'terms-conditions' | 'disclaimer' | 'cookie-policy' | '404';
  setView: (page: ViewPage) => void;
}

export default function StaticPage({ type, setView }: StaticPageProps) {
  
  // States for contact form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const renderBreadcrumbs = (label: string) => (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 pb-4 mb-8">
      <button onClick={() => setView({ type: 'home' })} className="hover:text-emerald-500 flex items-center gap-1 cursor-pointer">
        <Home className="h-3 w-3" />
        <span>Home</span>
      </button>
      <span>/</span>
      <span className="text-slate-700 dark:text-gray-300 font-medium">{label}</span>
    </nav>
  );

  // 1. ABOUT US PAGE
  if (type === 'about') {
    return (
      <div className="text-left space-y-12">
        {renderBreadcrumbs('About Us')}

        {/* Hero banner */}
        <div className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-8 md:p-12 text-center relative overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/10">
          <div className="absolute top-[-50px] right-[-50px] h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="absolute bottom-[-50px] left-[-50px] h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />
          
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-500 tracking-wider uppercase block mb-3 font-sans">About Leak X Viral</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-normal mb-4">
            Leak X Viral: Truth & Forensic Investigation
          </h1>
          <p className="text-base text-slate-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are an independent digital team committed to cyber forensics, social media transparency, and analyzing viral controversies across the internet.
          </p>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-8 backdrop-blur-lg shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Our Core Mission
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-300 leading-loose">
              To debunk deepfakes, inspect leaking visual evidence, and verify real sources to deliver unaltered journalistic truth on breaking controversies.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-8 backdrop-blur-lg shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-6">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Our Longterm Vision
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-300 leading-loose">
              Setting high-standards in digital forensic journalism, establishing clear lines between user-submitted rumors and hard cryptographic facts.
            </p>
          </div>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white dark:bg-white/2 border border-slate-200 dark:border-white/10 p-8 rounded-3xl text-center shadow-lg shadow-black/5">
          <div className="space-y-1">
            <span className="block text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans">
              2.5M+
            </span>
            <span className="block text-xs font-bold text-slate-500 dark:text-gray-400">
              Monthly Active Users
            </span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans">
              150+
            </span>
            <span className="block text-xs font-bold text-slate-500 dark:text-gray-400">
              Forensic Reports Filed
            </span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans">
              100%
            </span>
            <span className="block text-xs font-bold text-slate-500 dark:text-gray-400">
              Unaltered Truth Commitment
            </span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans">
              24/7
            </span>
            <span className="block text-xs font-bold text-slate-500 dark:text-gray-400">
              Viral Monitoring Service
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. CONTACT US PAGE
  if (type === 'contact') {
    return (
      <div className="text-left space-y-12">
        {renderBreadcrumbs('Contact Us')}

        <div className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-8 md:p-10 shadow-lg shadow-black/5 dark:shadow-black/10">
          <span className="text-[10px] font-mono tracking-wider text-emerald-600 dark:text-emerald-500 uppercase font-bold block mb-2 font-sans">Get in Touch</span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            Secure Contact Form & Support
          </h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 max-w-2xl mt-2">
            If you have dmca copyright concerns, secure leaks to submit, or visual media verification suggestions, please fill out the contact form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Form (Col-7) */}
          <div className="lg:col-span-7 bg-white dark:bg-white/2 rounded-3xl border border-slate-200 dark:border-white/10 p-6 md:p-8 backdrop-blur-lg shadow-sm">
            <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-6">
              Secure Message Portal
            </h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-gray-400">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-gray-400">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none text-slate-800 dark:text-white font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Copyright Claim / Advertising Inquiry / Secure Leak"
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please state details including specific URL references if any..."
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none text-slate-800 dark:text-white leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 py-3 text-sm font-semibold text-white transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>

            {submitted && (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm mt-4 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Your message has been securely submitted. Our legal and support team will inspect and respond shortly.</span>
              </div>
            )}
          </div>

          {/* Quick FAQ / Contacts card (Col-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact details */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 backdrop-blur-lg shadow-sm">
              <h3 className="text-base font-bold text-slate-850 dark:text-white mb-4">
                Direct Communications
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-500 dark:text-gray-400">Secure DMCA Support</span>
                    <span className="block text-sm font-semibold font-mono text-slate-700 dark:text-gray-300">dmca@leakviralvideo.com</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-500 dark:text-gray-400">Helpline</span>
                    <span className="block text-sm font-semibold font-mono text-slate-700 dark:text-gray-300">+1-800-CYBER-SEC</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-500 dark:text-gray-400">Headquarters</span>
                    <span className="block text-xs text-slate-700 dark:text-gray-300">International Cyber Forensic Alliance, Cyber Hub.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs inside sidebar */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-6 backdrop-blur-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-purple-600 dark:text-purple-400">
                <QuestionIcon className="h-4.5 w-4.5" />
                <h3 className="text-base font-bold text-slate-850 dark:text-white">
                  Common Inquiries FAQ
                </h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1 text-left">
                  <span className="block text-sm font-bold text-slate-800 dark:text-white">
                    Are the video links safe to preview?
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-semibold">
                    Yes, all files undergo thorough cloud sandbox checks. Our integrated media player utilizes strict browser restrictions to ensure zero payload downloads.
                  </span>
                </div>
                <div className="space-y-1 text-left">
                  <span className="block text-sm font-bold text-slate-800 dark:text-white">
                    How do I submit a legal DMCA notice?
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-semibold">
                    Submit verified identification and specific file coordinates to our dmca@leakviralvideo.com inbox. Our legal handlers inspect requests immediately.
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // 3. PRIVACY POLICY PAGE
  if (type === 'privacy-policy') {
    return (
      <div className="space-y-8 text-left">
        {renderBreadcrumbs('Privacy Policy')}
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 backdrop-blur-md space-y-6 shadow-lg">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-emerald-400">
            <ShieldCheck className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Privacy Policy
            </h1>
          </div>
          
          <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>

          <p className="text-sm text-gray-300 leading-loose">
            At Leak X Viral, your privacy and digital identity security are extremely important. This documentation details exactly what type of transient user agent logs we process, how Google AdSense operates personalized telemetry, and how to restrict cookies safely.
          </p>

          <h3 className="text-lg font-bold text-white mt-6">Telemetries & Log Files:</h3>
          <p className="text-sm text-gray-300 leading-loose">
            We follow standard web framework procedures of keeping standard log files (IP addresses, browser type, referral paths, time markers). This information is solely used to prevent web scraping attacks, filter spam bots, and monitor bandwidth capacities.
          </p>

          <h3 className="text-lg font-bold text-white mt-6">Google AdSense Integration:</h3>
          <p className="text-sm text-gray-300 leading-loose">
            Our platform uses Google AdSense cookies (including the DART cookie) to optimize targeted advertising delivery based on your user interests across our categories. To opt-out of targeted profiling, you can modify browser cookies or visit the Google Ad Settings portal.
          </p>
        </div>
      </div>
    );
  }

  // 4. TERMS & CONDITIONS PAGE
  if (type === 'terms-conditions') {
    return (
      <div className="space-y-8 text-left">
        {renderBreadcrumbs('Terms & Conditions')}
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 backdrop-blur-md space-y-6 shadow-lg">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-purple-400">
            <FileText className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Terms & Conditions
            </h1>
          </div>
          
          <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>

          <p className="text-sm text-gray-300 leading-loose">
            By accessing or browsing the directory logs of Leak X Viral, you agree to comply with our global internet terms of use.
          </p>

          <h3 className="text-lg font-bold text-white mt-6">Content Licensing & Fair Use:</h3>
          <p className="text-sm text-gray-300 leading-loose">
            All text, forensic analysis, layouts, and logos are properties of Leak X Viral. Under fair-use journalistic laws, brief quotes may be cited elsewhere provided clear digital links are attributed to our source coordinates.
          </p>

          <h3 className="text-lg font-bold text-white mt-6">Limitation of Liabilities:</h3>
          <p className="text-sm text-gray-300 leading-loose">
            All user-authored files, community opinions, and forum links represent individual posters and do not reflect our editing team. We are not liable for transient browser damage or external link redirects.
          </p>
        </div>
      </div>
    );
  }

  // 5. DISCLAIMER PAGE
  if (type === 'disclaimer') {
    return (
      <div className="space-y-8 text-left">
        {renderBreadcrumbs('Disclaimer')}
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 backdrop-blur-md space-y-6 shadow-lg">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-amber-400">
            <AlertTriangle className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Journalistic Disclaimer
            </h1>
          </div>
          
          <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>

          <p className="text-sm text-gray-300 leading-loose">
            All reports, leaked conversations, video snippets, and transcripts hosted on Leak X Viral are presented purely for informational and digital forensic verification purposes.
          </p>

          <h3 className="text-lg font-bold text-white mt-6">Accuracy Warning:</h3>
          <p className="text-sm text-gray-300 leading-loose">
            While we dedicate cybersecurity tools to filter rumors, Leak X Viral makes no guarantees regarding 100% authenticity of third-party audio/video, since internet data is subject to deepfake modification and digital editings. Use logical individual discretion.
          </p>
        </div>
      </div>
    );
  }

  // 6. COOKIE POLICY PAGE
  if (type === 'cookie-policy') {
    return (
      <div className="space-y-8 text-left">
        {renderBreadcrumbs('Cookie Policy')}
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 backdrop-blur-md space-y-6 shadow-lg">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-emerald-400">
            <Cookie className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Cookie Policy
            </h1>
          </div>
          
          <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>

          <p className="text-sm text-gray-300 leading-loose">
            Leak X Viral uses standard browser cookies to keep state preferences (like Light/Dark mode) active and support high-speed image cache optimizations.
          </p>

          <h3 className="text-lg font-bold text-white mt-6">Managing Your Cookies:</h3>
          <p className="text-sm text-gray-300 leading-loose">
            You can customize, block, or clear cookies in your specific browser settings at any time. Note that certain responsive sidebar utilities may require basic storage to operate smoothly.
          </p>
        </div>
      </div>
    );
  }

  // 7. 404 PAGE (PAGE NOT FOUND)
  return (
    <div className="text-center py-16 space-y-8">
      <div className="relative mx-auto max-w-lg overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/2 p-12 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/15">
        <div className="absolute top-[-50px] right-[-50px] h-32 w-32 rounded-full bg-emerald-500/5 blur-xl" />
        
        {/* Large visual typography representing error */}
        <div className="font-sans text-8xl font-black bg-gradient-to-br from-emerald-400 via-purple-400 to-purple-600 bg-clip-text text-transparent select-none">
          404
        </div>
        
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-6">
          Report Not Found
        </h1>
        
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-3 leading-relaxed max-w-sm mx-auto">
          The requested leak file or forensic article could not be retrieved. It may have been relocated or taken down under legal notice.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setView({ type: 'home' })}
            className="w-full sm:w-auto rounded-2xl bg-slate-100 hover:bg-emerald-600 dark:bg-white/10 dark:hover:bg-emerald-500 text-slate-800 dark:text-white hover:text-white text-xs font-bold px-6 py-3 shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
          >
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </button>
          
          <button
            onClick={() => setView({ type: 'blog-listing' })}
            className="w-full sm:w-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold px-6 py-3 cursor-pointer transition-all"
          >
            Browse Directory
          </button>
        </div>
      </div>
    </div>
  );
}
