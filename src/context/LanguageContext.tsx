import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    app_name: 'Leak X Viral',
    app_tagline: 'VIRAL VIDEO & LEAKS PORTAL',
    nav_home: 'Home',
    nav_latest: 'Latest Leaks',
    nav_writers: 'OSINT Investigators',
    nav_videos: 'Video Theater',
    nav_images: 'Photo Evidence',
    nav_categories: 'Categories',
    nav_about: 'About Us',
    nav_contact: 'Secure Contact',
    nav_privacy: 'Privacy Policy',
    nav_terms: 'Terms & Conditions',
    nav_disclaimer: 'Journalistic Disclaimer',
    nav_cookie: 'Cookie Policy',
    
    // Sidebar
    search_title: 'Search Directory',
    search_placeholder: 'Type tags, names, leaks...',
    trending_reports: 'Trending Reports',
    browse_categories: 'Browse Categories',
    popular_tags: 'Popular Tags',
    adsense_title: 'AdSense Revenue Dashboard',
    active_badge: 'ACTIVE',
    estimated_balance: 'Estimated Balance',
    ad_impressions: 'Ad Impressions',
    total_clicks: 'Total Ad Clicks',
    click_through_rate: 'Click-Through Rate',
    page_rpm: 'Page Revenue (RPM)',
    ad_mode_aggressive: 'Aggressive Ads (100%)',
    ad_mode_standard: 'Standard Ads (40%)',
    ad_mode_desc: 'Triggers interstitial ad on every user click',
    adsense_info: 'AdSense Code Info',
    reset_btn: 'Reset',
    copy_adsense: 'Copy AdSense Client Script',
    copied_msg: 'AdSense Code Copied!',
    
    // Buttons & Interstitial
    read_full_report: 'Read Full Investigative Report',
    read_story: 'Read Story',
    browse_directory: 'Browse Directory',
    return_home: 'Return to Home',
    download_btn: 'Download Leak Video (HD)',
    downloading: 'Preparing High-Speed Server Connection...',
    download_success: 'Securing download payload... Download started!',
    download_desc: 'Download and play video offline safely using secure proxy channels.',
    skip_ad: 'Skip Ad',
    closing_ad_in: 'Closing ad in',
    ads_by_google: 'Ads by Google',
    privacy_choices: 'Privacy Choices',
    report_ad: 'Report Ad',
    why_this_ad: 'Why this ad?',
    unaltered_truth: '100% Unaltered Truth Commitment',
    viral_monitoring: '24/7 Viral Monitoring Service',
    exclusive_video_showroom: 'EXCLUSIVE VIDEO SHOWROOM',
    video_theatre_title: 'Leaked Videos & Breaking Media Clips',
    video_theatre_desc: 'Preview cyber leak clips, secret voice recordings, behind-the-scenes captures, and authenticated surveillance videos with deep forensic analyses.',
    other_viral_leaks: 'Other Viral Leaks',
    read_writeup: 'Read full write-up & forensic details',
    unlocked_pipeline: 'Please click play to unlock sponsored high-speed streaming pipeline',
    verified_reports: 'verified reports',
    view_reports: 'View Reports',
    close: 'Close',
    reports_by: 'Reports by',
    independent_investigators: 'Independent Investigators',
    expert_writers: 'Domain Experts & Investigative Journalists',
    columnists_title: 'LeakViralVideo Columnists & OSINT Specialists',
    columnists_desc: 'All reports, video verifications, and digital forensic studies on our platform are produced by cyber security specialists, verified legal analysts, and senior open-source intelligence (OSINT) researchers.',
    photo_evidence_title: 'Photo Evidence & Forensic Gallery',
    photo_evidence_desc: 'Inspect high-definition screenshots, unredacted transcripts, leaked chats, and geographic OSINT mappings verified by our security labs.',
    click_enlarge: 'Click any image to enlarge and inspect forensic cryptographic metadata',
    metadata_viewer: 'Cryptographic Metadata Inspector',
    file_name: 'File Name',
    file_size: 'File Size',
    file_format: 'File Format',
    captured_date: 'Captured Date',
    camera_model: 'Source / Device',
    integrity_hash: 'Integrity Hash (SHA-256)',
    verified_secure: 'VERIFIED SECURE',
    not_modified: 'AUTHENTIC & UNALTERED',
    back_to_gallery: 'Back to Gallery',
    newsletter_title: 'Subscribe to Leak Alerts',
    newsletter_desc: 'Get instant notifications of verified private leaks, cyber reports, and trending controversies delivered straight to your inbox.',
    subscribe_btn: 'Subscribe',
    subscribe_success: 'Success! Your email has been registered for update alerts.',
    all_rights_reserved: 'All rights reserved.',
    built_with_precision: 'Built with cryptographic precision',
    latest_leaks_title: 'Real-time Leak Feed & Updates',
    latest_leaks_desc: 'Chronological list of all user submissions and investigative logs compiled by our OSINT desk.',
    load_more: 'Load More Reports',
    no_results: 'No matching reports found. Try searching something else!',
    showing_results: 'Showing results for',
    category: 'Category',
    back_home: 'Back to Home Feed',
    search_results: 'Search Results',
  },
  ur: {
    // Nav & General
    app_name: 'لیک X وائرل',
    app_tagline: 'وائرل ویڈیو اور لیکس پورٹل',
    nav_home: 'ہوم پیج',
    nav_latest: 'تازہ ترین لیکس',
    nav_writers: 'تحقیقاتی صحافی',
    nav_videos: 'ویڈیو تھیٹر',
    nav_images: 'تصویری ثبوت',
    nav_categories: 'کیٹیگریز',
    nav_about: 'ہمارے بارے میں',
    nav_contact: 'محفوظ رابطہ',
    nav_privacy: 'پرائیویسی پالیسی',
    nav_terms: 'شرائط و ضوابط',
    nav_disclaimer: 'قانونی ڈسکلیمر',
    nav_cookie: 'کوکی پالیسی',
    
    // Sidebar
    search_title: 'ڈائریکٹری تلاش کریں',
    search_placeholder: 'ٹیگز، نام، یا لیکس لکھیں...',
    trending_reports: 'ٹرینڈنگ رپورٹس',
    browse_categories: 'کیٹیگریز دیکھیں',
    popular_tags: 'مقبول ٹیگز',
    adsense_title: 'گوگل ایڈسینس آمدنی ڈیش بورڈ',
    active_badge: 'فعال',
    estimated_balance: 'تخمینہ شدہ بیلنس',
    ad_impressions: 'اشتہارات کے تاثرات',
    total_clicks: 'کل اشتہاری کلکس',
    click_through_rate: 'کلک تھرو ریٹ (CTR)',
    page_rpm: 'صفحہ کی آمدنی (RPM)',
    ad_mode_aggressive: 'جارحانہ اشتہارات (100٪)',
    ad_mode_standard: 'معیاری اشتہارات (40٪)',
    ad_mode_desc: 'ہر صارف کے کلک پر پاپ اپ اشتہار دکھاتا ہے',
    adsense_info: 'ایڈسینس کوڈ کی معلومات',
    reset_btn: 'دوبارہ شروع کریں',
    copy_adsense: 'ایڈسینس کلائنٹ اسکرپٹ کاپی کریں',
    copied_msg: 'ایڈسینس کوڈ کاپی ہو گیا!',
    
    // Buttons & Interstitial
    read_full_report: 'مکمل تحقیقاتی رپورٹ پڑھیں',
    read_story: 'رپورٹ پڑھیں',
    browse_directory: 'ڈائریکٹری براؤز کریں',
    return_home: 'ہوم پیج پر واپس جائیں',
    download_btn: 'لیک ویڈیو ڈاؤن لوڈ کریں (HD)',
    downloading: 'تیز رفتار سرور کنکشن تیار کیا جا رہا ہے...',
    download_success: 'ڈاؤن لوڈ لنک تیار ہے... ویڈیو ڈاؤن لوڈ ہونا شروع ہو گئی ہے!',
    download_desc: 'محفوظ پراکسی چینلز کا استعمال کرتے ہوئے ویڈیو کو محفوظ طریقے سے آف لائن ڈاؤن لوڈ اور پلے کریں۔',
    skip_ad: 'اشتہار چھوڑیں',
    closing_ad_in: 'اشتہار ختم ہونے میں وقت باقی:',
    ads_by_google: 'گوگل کے اشتہارات',
    privacy_choices: 'پرائیویسی کے انتخابات',
    report_ad: 'اشتہار کی رپورٹ کریں',
    why_this_ad: 'یہ اشتہار کیوں؟',
    unaltered_truth: '100% غیر تبدیل شدہ سچی معلومات کا عزم',
    viral_monitoring: '24/7 وائرل میڈیا مانیٹرنگ سروس',
    exclusive_video_showroom: 'خصوصی ویڈیو شو روم',
    video_theatre_title: 'لیک شدہ ویڈیوز اور بریکنگ میڈیا کلپس',
    video_theatre_desc: 'سوشل میڈیا لیکس، خفیہ آڈیو ریکارڈنگز، پردے کے پیچھے کے مناظر اور تصدیق شدہ سی سی ٹی وی ویڈیوز کی تفصیلی فارنزک رپورٹس یہاں دیکھیں۔',
    other_viral_leaks: 'دیگر وائرل لیکس',
    read_writeup: 'مکمل تفصیل اور فارنزک ثبوت دیکھیں',
    unlocked_pipeline: 'براہ کرم سپانسر شدہ تیز رفتار ویڈیو سٹریمنگ کے لیے پلے بٹن پر کلک کریں',
    verified_reports: 'تصدیق شدہ رپورٹس',
    view_reports: 'رپورٹس دیکھیں',
    close: 'بند کریں',
    reports_by: 'رپورٹس بلحاظ',
    independent_investigators: 'آزاد تحقیقاتی تجزیہ کار',
    expert_writers: 'فارنزک ماہرین اور کھوجی صحافی',
    columnists_title: 'لیک وائرل ویڈیو کے کالم نگار اور OSINT ماہرین',
    columnists_desc: 'ہماری تمام رپورٹس، ویڈیو کی تصدیق اور فارنزک جائزے سائبر سیکیورٹی کے نامور ماہرین، قانونی تجزیہ کاروں اور اوپن سورس انٹیلی جنس ریسرچرز تیار کرتے ہیں۔',
    photo_evidence_title: 'تصویری ثبوت اور فارنزک گیلری',
    photo_evidence_desc: 'ہائی ڈیفینیشن اسکرین شاٹس، خفیہ چیٹس اور جغرافیائی نقشوں کا معائنہ کریں جن کی تصدیق ہماری فارنزک لیبز نے کی ہے۔',
    click_enlarge: 'تصویری فارنزک ڈیٹا اور میٹا ڈیٹا دیکھنے کے لیے کسی بھی تصویر پر کلک کریں',
    metadata_viewer: 'تصویری میٹا ڈیٹا انسپکٹر',
    file_name: 'فائل کا نام',
    file_size: 'فائل کا سائز',
    file_format: 'فائل فارمیٹ',
    captured_date: 'بننے کی تاریخ',
    camera_model: 'ذریعہ / موبائل ماڈل',
    integrity_hash: 'فائل ہیش کوڈ (SHA-256)',
    verified_secure: 'تصدیق شدہ محفوظ',
    not_modified: 'اصلی اور غیر تبدیل شدہ',
    back_to_gallery: 'گیلری پر واپس جائیں',
    newsletter_title: 'تازہ ترین لیکس کی ای میلز حاصل کریں',
    newsletter_desc: 'مستند لیکس، خفیہ آڈیو رپورٹس اور وائرل ویڈیوز کی الرٹس براہ راست اپنے ای میل پر حاصل کریں۔',
    subscribe_btn: 'سبسکرائب کریں',
    subscribe_success: 'کامیابی! آپ کا ای میل درج کر لیا گیا ہے۔ اب آپ کو وائرل الرٹس موصول ہوں گے۔',
    all_rights_reserved: 'جملہ حقوق محفوظ ہیں۔',
    built_with_precision: 'سائبر فارنزک اور ریاضیاتی درستگی کے ساتھ تیار کردہ',
    latest_leaks_title: 'سوشل میڈیا لیکس فیڈ',
    latest_leaks_desc: 'ہمارے OSINT تجزیہ کاروں کی طرف سے ترتیب دی گئی تمام وائرل ویڈیوز اور رپورٹس کی ترتیب وار فہرست۔',
    load_more: 'مزید رپورٹس لوڈ کریں',
    no_results: 'کوئی رپورٹ نہیں ملی۔ کچھ اور تلاش کرنے کی کوشش کریں!',
    showing_results: 'تلاش کے نتائج برائے',
    category: 'کیٹیگری',
    back_home: 'ہوم پیج پر واپس جائیں',
    search_results: 'تلاش کے نتائج',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const isRtl = language === 'ur';

  useEffect(() => {
    // Update HTML dir and lang attributes
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add/remove font class for full page layout
    if (isRtl) {
      document.body.classList.add('font-urdu');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.remove('font-urdu');
      document.body.classList.add('font-sans');
    }
  }, [language, isRtl]);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
