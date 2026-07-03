import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdItem {
  id: string;
  title: string;
  headline: string;
  description: string;
  category: string;
  image: string;
  actionText: string;
  url: string;
  cpc: number;
}

export const INTERSTITIAL_ADS: AdItem[] = [
  {
    id: 'bluehost-pk',
    title: 'Bluehost Premium Cloud',
    headline: 'Most Affordable & High-Speed Cloud Hosting — Exclusive 75% Saving Offer!',
    description: 'Launch your website today for only $2.95/month. Get free domain, SSL certificate, and premium local support.',
    category: 'Cloud Web Hosting',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=600&h=400',
    actionText: 'Get Started Now',
    url: 'https://bluehost.com',
    cpc: 3.45
  },
  {
    id: 'exness-urdu',
    title: 'Exness Forex Trade',
    headline: 'Smart Forex Asset Trading — Transfer your profits securely directly to your bank account!',
    description: 'Register with the world\'s most trusted multi-regulated broker. Enjoy zero commission fees, instant deposits, and lightning-fast withdrawals.',
    category: 'Investment & Trading',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600&h=400',
    actionText: 'Start Trading',
    url: 'https://exness.com',
    cpc: 5.20
  },
  {
    id: 'nordvpn-sec',
    title: 'NordVPN Secure Internet',
    headline: 'Protect Your Internet Network — Complete Defense Against Public WiFi Hazards & Malware!',
    description: 'Ultra-fast VPN service with military-grade 256-bit AES encryption. Unrestricted access to global media streams.',
    category: 'Cybersecurity & VPN',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600&h=400',
    actionText: 'Protect My Connection',
    url: 'https://nordvpn.com',
    cpc: 2.80
  },
  {
    id: 'statelife-ins',
    title: 'State Life Gold Plan 2026',
    headline: 'Secure Your Children\'s College Education & Family Health Budget Now!',
    description: 'Enjoy high annual savings payouts and full accident coverage under the newly introduced State Life Premium Plan.',
    category: 'Insurance & Assets Protection',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400',
    actionText: 'Request Free Quote',
    url: 'https://statelife.com.pk',
    cpc: 4.50
  },
  {
    id: 'huawei-mate-xt',
    title: 'Huawei Mate XT Ultimate',
    headline: 'The World\'s First Tri-Folding Dynamic Screen — A True Masterpiece of Mobile Tech!',
    description: 'Features a massive 10.2-inch flexible OLED screen, high-fidelity AI lens camera system, and ultra-thin chassis design.',
    category: 'High-End Smart Devices',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600&h=400',
    actionText: 'Pre-Order Now',
    url: 'https://huawei.com',
    cpc: 3.10
  }
];

interface AdContextType {
  isAdOpen: boolean;
  activeAd: AdItem;
  countdown: number;
  triggerAd: (onClose: () => void) => void;
  closeAd: () => void;
  visitSponsor: () => void;
  // Simulated stats
  impressions: number;
  clicks: number;
  earnings: number;
  resetStats: () => void;
  // Settings
  aggressiveMode: boolean;
  setAggressiveMode: (mode: boolean) => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export function AdProvider({ children }: { children: React.ReactNode }) {
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [activeAd, setActiveAd] = useState<AdItem>(INTERSTITIAL_ADS[0]);
  const [countdown, setCountdown] = useState(0);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Simulated AdSense Stats Persisted in LocalStorage
  const [impressions, setImpressions] = useState<number>(() => {
    const saved = localStorage.getItem('adsense_impressions');
    return saved ? parseInt(saved, 10) : 1842; // Starting mock seed
  });
  const [clicks, setClicks] = useState<number>(() => {
    const saved = localStorage.getItem('adsense_clicks');
    return saved ? parseInt(saved, 10) : 124; // Starting mock seed
  });
  const [earnings, setEarnings] = useState<number>(() => {
    const saved = localStorage.getItem('adsense_earnings');
    return saved ? parseFloat(saved) : 238.45; // Starting mock seed
  });
  const [aggressiveMode, setAggressiveMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('adsense_aggressive');
    return saved !== 'false'; // Default to true (aggressive mode, 100% clicks trigger ads)
  });

  // Sync simulated AdSense stats to localStorage
  useEffect(() => {
    localStorage.setItem('adsense_impressions', impressions.toString());
    localStorage.setItem('adsense_clicks', clicks.toString());
    localStorage.setItem('adsense_earnings', earnings.toFixed(2));
    localStorage.setItem('adsense_aggressive', aggressiveMode.toString());
  }, [impressions, clicks, earnings, aggressiveMode]);

  // Countdown timer for close button
  useEffect(() => {
    if (isAdOpen && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAdOpen, countdown]);

  const triggerAd = (onClose: () => void) => {
    onClose();
  };

  const closeAd = () => {
    setIsAdOpen(false);
  };

  const visitSponsor = () => {
    closeAd();
  };

  const resetStats = () => {
    setImpressions(0);
    setClicks(0);
    setEarnings(0.00);
  };

  return (
    <AdContext.Provider
      value={{
        isAdOpen,
        activeAd,
        countdown,
        triggerAd,
        closeAd,
        visitSponsor,
        impressions,
        clicks,
        earnings,
        resetStats,
        aggressiveMode,
        setAggressiveMode,
      }}
    >
      {children}
    </AdContext.Provider>
  );
}

export function useAd() {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAd must be used within an AdProvider');
  }
  return context;
}
