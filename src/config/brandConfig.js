// VALETWASH - Developer Brand, Theme, Company & Pricing Configuration File
// Edit this file directly or use the in-app "Dev Settings" panel (gear icon in header)

export const THEME_PRESETS = [
  {
    id: 'flawless-executive',
    name: 'Flawless Executive Light (Default)',
    primary: '#0A2240',
    secondary: '#1B6CA8',
    accent: '#00E5FF',
    canvasBg: '#F8FAFC',
    cardBg: '#FFFFFF',
    headerBg: '#0A2240',
    bottomNavBg: '#0A2240',
    bottomNavActive: '#00E5FF',
    badgeBg: '#E0F2FE',
    badgeText: '#0369A1',
    cardTitle: '#0F172A',
    cardBody: '#475569',
    cardBorder: '#E2E8F0',
    heroOverlay: 'linear-gradient(180deg, rgba(10, 34, 64, 0.85) 0%, rgba(10, 34, 64, 0.95) 100%)',
    badge: 'Flawless Spec'
  },
  {
    id: 'british-emerald',
    name: 'British Racing Green & Gold',
    primary: '#062D1D',
    secondary: '#0F6B42',
    accent: '#E5B83B',
    canvasBg: '#F2F8F5',
    cardBg: '#FFFFFF',
    headerBg: '#062D1D',
    bottomNavBg: '#062D1D',
    bottomNavActive: '#E5B83B',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    cardTitle: '#0F291E',
    cardBody: '#374151',
    cardBorder: '#D1FAE5',
    heroOverlay: 'linear-gradient(180deg, rgba(6, 45, 29, 0.85) 0%, rgba(6, 45, 29, 0.95) 100%)',
    badge: 'Luxury Spec'
  },
  {
    id: 'rosso-corsa',
    name: 'Rosso Corsa Crimson & Scarlet',
    primary: '#1A060A',
    secondary: '#991B1B',
    accent: '#FF3366',
    canvasBg: '#FFF5F5',
    cardBg: '#FFFFFF',
    headerBg: '#1A060A',
    bottomNavBg: '#1A060A',
    bottomNavActive: '#FF3366',
    badgeBg: '#FFE4E6',
    badgeText: '#9F1239',
    cardTitle: '#1F1315',
    cardBody: '#4B5563',
    cardBorder: '#FECDD3',
    heroOverlay: 'linear-gradient(180deg, rgba(26, 6, 10, 0.85) 0%, rgba(26, 6, 10, 0.95) 100%)',
    badge: 'Scuderia Spec'
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Stealth Violet & Neon Cyan',
    primary: '#0D081E',
    secondary: '#581C87',
    accent: '#00F0FF',
    canvasBg: '#FAF5FF',
    cardBg: '#FFFFFF',
    headerBg: '#0D081E',
    bottomNavBg: '#0D081E',
    bottomNavActive: '#00F0FF',
    badgeBg: '#EDE9FE',
    badgeText: '#5B21B6',
    cardTitle: '#1E1B4B',
    cardBody: '#4B5563',
    cardBorder: '#DDD6FE',
    heroOverlay: 'linear-gradient(180deg, rgba(13, 8, 30, 0.85) 0%, rgba(13, 8, 30, 0.95) 100%)',
    badge: 'Cyber Spec'
  },
  {
    id: 'monaco-azure',
    name: 'Monaco Liquid Azure & Aqua',
    primary: '#0A1C2A',
    secondary: '#0284C7',
    accent: '#0284C7',
    canvasBg: '#F0F9FF',
    cardBg: '#FFFFFF',
    headerBg: '#0A1C2A',
    bottomNavBg: '#0A1C2A',
    bottomNavActive: '#38BDF8',
    badgeBg: '#E0F2FE',
    badgeText: '#0369A1',
    cardTitle: '#082F49',
    cardBody: '#475569',
    cardBorder: '#BAE6FD',
    heroOverlay: 'linear-gradient(180deg, rgba(10, 28, 42, 0.85) 0%, rgba(10, 28, 42, 0.95) 100%)',
    badge: 'Coastal Spec'
  },
  {
    id: 'aviation-navy-dark',
    name: 'Aviation Midnight Stealth (Dark Mode)',
    primary: '#0A2240',
    secondary: '#1B6CA8',
    accent: '#00E5FF',
    canvasBg: '#08101D',
    cardBg: '#0F1E33',
    headerBg: '#061324',
    bottomNavBg: '#061324',
    bottomNavActive: '#00E5FF',
    badgeBg: 'rgba(0, 229, 255, 0.15)',
    badgeText: '#00E5FF',
    cardTitle: '#FFFFFF',
    cardBody: '#CBD5E1',
    cardBorder: '#1E293B',
    heroOverlay: 'linear-gradient(180deg, rgba(10, 34, 64, 0.85) 0%, rgba(10, 34, 64, 0.95) 100%)',
    badge: 'Midnight Spec'
  }
];

// Backward-compat alias so existing component imports don't break
export const FLAWLESS_THEME = THEME_PRESETS[0];

export const FONT_OPTIONS = [
  { id: 'Inter', name: 'Inter (Modern Tech Clean)', css: 'font-sans' },
  { id: 'Orbitron', name: 'Orbitron (Futuristic High-Tech)', css: "font-['Orbitron',sans-serif]" },
  { id: 'Space Grotesk', name: 'Space Grotesk (Neo-Brutalist Aero)', css: "font-['Space_Grotesk',sans-serif]" },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Premium Geometric)', css: "font-['Plus_Jakarta_Sans',sans-serif]" },
  { id: 'Montserrat', name: 'Montserrat (Bold Executive)', css: "font-['Montserrat',sans-serif]" },
  { id: 'Syne', name: 'Syne (Avant-Garde Hypercar)', css: "font-['Syne',sans-serif]" },
  { id: 'Oswald', name: 'Oswald (Industrial Condensed)', css: "font-['Oswald',sans-serif]" },
];

export const DEFAULT_BRAND_CONFIG = {
  // Brand Identity
  brandName: 'VALETWASH',
  brandTagline: 'Aviation-Grade Auto Detailing',
  badgeText: 'AERO',
  brandFont: 'Inter',
  
  // Custom Logo Configuration
  logoType: 'emblem',
  logoDisplayMode: 'image_with_text',
  logoUrl: '',
  logoHeight: 46,
  logoWidth: 160,

  // Full Site Color Theme
  theme: { ...THEME_PRESETS[0] },

  // Customizable Company & About Information
  companyInfo: {
    companyName: 'VALETWASH Aero Detailing Technologies Pvt. Ltd.',
    aboutBio: 'Pioneering aviation-grade automotive surface preservation delivered autonomously straight to your driveway. Equipped with pressurized 0 PPM de-ionized water rigs, 600-GSM plush microfibers, and silent electric generators.',
    officeAddress: 'Hangar 4, Aviation Business Bay, Near Domestic Airport Terminal, Santacruz West, Mumbai, Maharashtra 400054',
    phoneNumbers: '+91 98200 98200, +91 22 4980 1100',
    emails: 'concierge@valetwash.aero, dispatch@valetwash.aero, support@valetwash.aero',
    operatingHours: 'Monday – Sunday: 06:30 AM – 09:30 PM (All 365 Days)',
    gstNumber: '27AABCU9603R1ZM',
    supportStatus: 'Live Doorstep Dispatch Active'
  },

  // Currency & Taxes
  currencySymbol: '₹',
  gstRate: 0.18,
  ecoLevy: 49,
  freeConveyanceThreshold: 499
};

export const DEFAULT_PRICING_CONFIG = {
  packages: {
    'pkg-1': { 
      id: 'pkg-1', 
      title: 'Aero-Gloss Express', 
      subtitle: 'High-Velocity Doorstep Foam & Shine',
      price: 499,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80'
    },
    'pkg-2': { 
      id: 'pkg-2', 
      title: 'Doorstep Wash & Vacuum Elite', 
      subtitle: 'Complete Exterior Shine + Interior Vacuum',
      price: 699,
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80'
    },
    'pkg-3': { 
      id: 'pkg-3', 
      title: 'Deep Interior Sanitization & Detox', 
      subtitle: 'Steam Extraction + Hospital-Grade AC Disinfection',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'
    },
    'pkg-4': { 
      id: 'pkg-4', 
      title: 'Ceramic Gloss & Paint Protection', 
      subtitle: 'Single-Stage Swirl Cut + 9H SiO2 Hydrophobic Shell',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    },
    'pkg-5': { 
      id: 'pkg-5', 
      title: 'Aviation 9H Graphene Armor Pro', 
      subtitle: 'Triple-Stage Paint Correction + 2-Year Certified Shell',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    },
    'pkg-6': { 
      id: 'pkg-6', 
      title: 'Fleet & Multi-Car Household Bay', 
      subtitle: 'Dual-Detailer Rapid Deployment for 2+ Vehicles',
      price: 899,
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80'
    },
  },

  multipliers: {
    hatchback: 1.0,
    sedan: 1.15,
    suv: 1.35,
    superbike: 0.75,
  },

  addons: {
    'add-1': 399,
    'add-2': 299,
    'add-3': 449,
    'add-4': 499,
  }
};
