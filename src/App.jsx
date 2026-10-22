import React, { useState, useEffect } from 'react';
import NavbarHeader from './components/NavbarHeader';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import ServicesScreen from './components/ServicesScreen';
import BookingSlotScreen from './components/BookingSlotScreen';
import CheckoutScreen from './components/CheckoutScreen';
import LiveTrackingScreen from './components/LiveTrackingScreen';
import GarageScreen from './components/GarageScreen';
import OnboardingModal from './components/OnboardingModal';
import DevSettingsModal from './components/DevSettingsModal';
import { 
  LocationModal, 
  NotificationsDrawer, 
  CallModal, 
  ChatModal, 
  InvoiceModal, 
  AddVehicleModal 
} from './components/Modals';

import { 
  DEFAULT_BRAND_CONFIG, 
  DEFAULT_PRICING_CONFIG,
  THEME_PRESETS
} from './config/brandConfig';

// Convenience alias – first preset is the "Flawless Executive" default
const FLAWLESS_THEME = THEME_PRESETS[0];

import { 
  VEHICLE_CATEGORIES, 
  INITIAL_VEHICLES, 
  SERVICE_PACKAGES, 
  ADDONS_LIST, 
  SAVED_ADDRESSES, 
  DETAILER_PROFILE, 
  PROMO_CODES, 
  TRANSFORMATION_REPORTS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

import { playTapSound, playSuccessSound, toggleSound } from './utils/audio';

export default function App() {
  // Appearance & Device Frame: Light Mode as Executive Default with Flawless Palette
  const [darkMode, setDarkMode] = useState(false);
  const [mobileView, setMobileView] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
// Dev Modal State & Triple-Tap Counter
  const [isDevSettingsOpen, setIsDevSettingsOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  // Secret Keyboard Shortcut (Cmd+Shift+D or Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsDevSettingsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hidden Triple-Tap Handler for Mobile Logo
  const handleLogoTap = () => {
    setTapCount((prev) => {
      if (prev + 1 === 3) {
        setIsDevSettingsOpen((prev) => !prev);
        return 0;
      }
      return prev + 1;
    });
    setTimeout(() => setTapCount(0), 1000);
  };
  // Active Screen / Flow State
  const [activeTab, setActiveTab] = useState('home');
  
  // DEVELOPER BRAND & PRICING CONFIGURATION (Persistent via LocalStorage)
  const [brandConfig, setBrandConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('valetwash_brand_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure flawlessTheme values are incorporated
        return {
          ...DEFAULT_BRAND_CONFIG,
          ...parsed,
          theme: {
            ...FLAWLESS_THEME,
            ...(parsed.theme || {})
          }
        };
      }
      return DEFAULT_BRAND_CONFIG;
    } catch (e) {
      return DEFAULT_BRAND_CONFIG;
    }
  });

  const [pricingConfig, setPricingConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('valetwash_pricing_config');
      return saved ? JSON.parse(saved) : DEFAULT_PRICING_CONFIG;
    } catch (e) {
      return DEFAULT_PRICING_CONFIG;
    }
  });

  // Apply Dynamic Theme Colors & CSS Variables to document root whenever brandConfig changes
  useEffect(() => {
    const theme = {
      ...FLAWLESS_THEME,
      ...(brandConfig?.theme || {})
    };
    const root = document.documentElement;
    // Short-key names (canvasBg, headerBg, …) are the canonical tokens in THEME_PRESETS
    root.style.setProperty('--canvas-bg',       theme.canvasBg      || theme.canvasBackground || '#F8FAFC');
    root.style.setProperty('--header-bg',        theme.headerBg      || theme.headerBackground || '#0A2240');
    root.style.setProperty('--bottom-nav-bg',    theme.bottomNavBg   || theme.bottomNavBackground || '#0A2240');
    root.style.setProperty('--bottom-nav-active',theme.bottomNavActive || theme.bottomNavActiveTab || '#00E5FF');
    root.style.setProperty('--card-bg',          theme.cardBg        || theme.cardBackground || '#FFFFFF');
    root.style.setProperty('--card-title',       theme.cardTitle     || theme.cardTitleColor || '#0F172A');
    root.style.setProperty('--card-body',        theme.cardBody      || theme.cardBodyTextColor || '#475569');
    root.style.setProperty('--card-border',      theme.cardBorder    || theme.cardBorderColor || '#E2E8F0');
    root.style.setProperty('--primary-btn-bg',   theme.primary       || theme.primaryButtonBg || '#0A2240');
    root.style.setProperty('--primary-btn-text', theme.primaryButtonText || '#FFFFFF');
    root.style.setProperty('--badge-bg',         theme.badgeBg       || '#E0F2FE');
    root.style.setProperty('--badge-text',       theme.badgeText     || '#0369A1');
    root.style.setProperty('--accent',           theme.accent        || '#00E5FF');
  }, [brandConfig]);

  // Fleet & Pricing State
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState(INITIAL_VEHICLES[0]);

  // Doorstep Address State
  const [savedAddresses, setSavedAddresses] = useState(SAVED_ADDRESSES);
  const [currentLocation, setCurrentLocation] = useState(SAVED_ADDRESSES[0]);

  // Dynamically map titles, subtitles, images, and base prices from developer configuration
  const services = SERVICE_PACKAGES.map(pkg => ({
    ...pkg,
    title: pricingConfig.packages?.[pkg.id]?.title || pkg.title,
    subtitle: pricingConfig.packages?.[pkg.id]?.subtitle || pkg.subtitle,
    image: pricingConfig.packages?.[pkg.id]?.image || pkg.image,
    basePrice: pricingConfig.packages?.[pkg.id]?.price ?? pkg.basePrice
  }));

  const addons = ADDONS_LIST.map(add => ({
    ...add,
    price: pricingConfig.addons?.[add.id] ?? add.price
  }));

  // Update selected vehicle multiplier based on developer config
  const activeMultiplier = pricingConfig.multipliers?.[selectedVehicle?.category] ?? (
    selectedVehicle?.category === 'superbike' ? 0.75 
      : selectedVehicle?.category === 'suv' ? 1.35 
      : selectedVehicle?.category === 'sedan' ? 1.15 
      : 1.0
  );

  const [selectedPackage, setSelectedPackage] = useState(services[0]);
  const [selectedAddons, setSelectedAddons] = useState([addons[1]]);
  const [bookingDetails, setBookingDetails] = useState({
    date: '2026-10-20',
    slot: 'm1',
    instructions: 'Park near Pillar B3. Autonomous power rig preferred.'
  });

  // Keep selectedPackage synchronized if its title, price, or image changes
  useEffect(() => {
    const updated = services.find(s => s.id === selectedPackage.id);
    if (updated) {
      setSelectedPackage(updated);
    }
  }, [pricingConfig]);

  // Active Booking Telematics State
  const [activeBooking, setActiveBooking] = useState({
    id: 'aero-bk-9021',
    packageName: services[0]?.title || 'Aero-Gloss Express',
    vehicleName: 'Audi A6 45 TFSI',
    plate: 'MH 12 AB 9988',
    statusStep: 'En Route to Bay',
    eta: '11 mins',
    progressPercent: 48,
    assignedDetailer: DETAILER_PROFILE
  });

  // Modals Visibility
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Save Brand & Pricing to localStorage
  const handleUpdateBrandConfig = (newConfig) => {
    setBrandConfig(newConfig);
    try {
      localStorage.setItem('valetwash_brand_config', JSON.stringify(newConfig));
    } catch (e) {}
  };

  const handleUpdatePricingConfig = (newConfig) => {
    setPricingConfig(newConfig);
    try {
      localStorage.setItem('valetwash_pricing_config', JSON.stringify(newConfig));
    } catch (e) {}
  };

  const handleResetDefaults = () => {
    setBrandConfig(DEFAULT_BRAND_CONFIG);
    setPricingConfig(DEFAULT_PRICING_CONFIG);
    try {
      localStorage.removeItem('valetwash_brand_config');
      localStorage.removeItem('valetwash_pricing_config');
    } catch (e) {}
    playSuccessSound();
  };

  // Handlers
  const handleToggleSound = () => {
    const state = toggleSound();
    setSoundEnabled(state);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleToggleMobileView = () => {
    setMobileView(!mobileView);
  };

  const handleSelectPackageAndStartBooking = (pkg) => {
    setSelectedPackage(pkg);
    setActiveTab('slot_booking');
  };

  const handleToggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleProceedToCheckout = (details) => {
    setBookingDetails(details);
    setActiveTab('checkout');
  };

  const handleConfirmBooking = (newBookingData) => {
    setActiveBooking({
      id: `aero-bk-${Date.now()}`,
      packageName: newBookingData.packageName,
      vehicleName: newBookingData.vehicleName,
      plate: newBookingData.plate,
      statusStep: 'En Route to Bay',
      eta: '12 mins',
      progressPercent: 25,
      assignedDetailer: DETAILER_PROFILE
    });

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Rig Dispatched to Driveway',
        desc: `${DETAILER_PROFILE.name} has departed in Aero-Rig #08.`,
        time: 'Just now',
        unread: true,
        type: 'tracking'
      },
      ...prev
    ]);

    setActiveTab('tracking');
  };

  const handleAddVehicle = (newVeh) => {
    setVehicles(prev => [newVeh, ...prev]);
    setSelectedVehicle(newVeh);
  };

  const canvasBg = brandConfig?.theme?.canvasBg || brandConfig?.theme?.canvasBackground || '#F8FAFC';

  return (
    <div 
      className="min-h-screen transition-colors duration-300 flex flex-col items-center justify-start"
      style={{ backgroundColor: "#EEF2F6" }}
    >
      
      {/* Device Frame Wrapper (USES EXACT FLAWLESS CANVAS #F8FAFC) */}
      <div 
        className={`w-full transition-all duration-300 ${
          mobileView 
            ? 'max-w-[430px] my-0 sm:my-6 sm:rounded-[44px] shadow-[0px_25px_70px_rgba(10,34,64,0.22)] border-0 sm:border-[8px] sm:border-slate-800 overflow-hidden relative min-h-screen sm:min-h-[900px] flex flex-col' 
            : 'max-w-4xl min-h-screen shadow-lg'
        }`}
        style={{ backgroundColor: canvasBg }}
      >

        {/* Dynamic Island Notch (EXECUTIVE DEEP NAVY #0A2240) */}
        {mobileView && (
          <div 
  className="w-full text-white pt-2 pb-1.5 px-4 flex items-center justify-between select-none z-50 border-b border-white/10 shadow-lg"
  style={{ backgroundColor: brandConfig?.theme?.headerBg || brandConfig?.theme?.headerBackground || "#0A2240" }}
>
  {/* Simulated iPhone Time */}
  <span className="text-[11px] font-semibold tracking-tight text-slate-300">09:41</span>

  {/* DYNAMIC ISLAND LIVE ACTIVITY PILL */}
  <div 
    onClick={() => { playTapSound(); setActiveTab('tracking'); }}
    className="group relative flex items-center gap-2 bg-black hover:bg-slate-900 border border-cyan-500/30 text-white px-3 py-1 rounded-full shadow-md hover:shadow-cyan-500/20 transition-all duration-300 ease-out cursor-pointer hover:scale-105 active:scale-95"
    title="Click Dynamic Island for Live Telematics"
  >
    {/* Live Pulsing Radar Dot */}
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
    </span>

    {/* Live Telematics Info */}
    <div className="flex items-center gap-1.5 text-[10px] font-medium">
      <span className="text-cyan-400 font-bold uppercase tracking-wider text-[9px] bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded">
        Aero-Rig #08
      </span>
      <span className="text-slate-200 font-semibold">En Route</span>
      <span className="text-slate-500">•</span>
      <span className="text-cyan-300 font-mono font-bold">{rigEta || "11m"}</span>
    </div>
  </div>

  {/* Network & Battery */}
  <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
    <span className="font-bold text-[9px]">5G</span>
    <div className="w-5 h-2.5 border border-slate-300 rounded-sm p-0.5 flex items-center">
      <div className="h-full w-3/4 bg-white rounded-xs"></div>
    </div>
  </div>
</div>
          </div>
        )}

        {/* Global Navigation Header with Dev Config Access */}
        <NavbarHeader
          currentLocation={currentLocation}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          unreadNotifsCount={notifications.filter(n => n.unread).length}
          onOpenNotifs={() => setIsNotifsOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          mobileView={mobileView}
          onToggleMobileView={handleToggleMobileView}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          selectedVehicle={selectedVehicle}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          brandConfig={brandConfig}
          onLogoTap={handleLogoTap}
        />

        {/* Main Content Viewport (Crisp Canvas Background #F8FAFC) */}
        <main 
          className="flex-1 p-3.5 sm:p-5 overflow-y-auto"
          style={{ backgroundColor: canvasBg }}
        >
          {activeTab === 'home' && (
            <HomeScreen
              darkMode={darkMode}
              currentLocation={currentLocation}
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
              onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
              services={services}
              onSelectPackage={handleSelectPackageAndStartBooking}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              activeBooking={activeBooking}
              onOpenTracking={() => setActiveTab('tracking')}
              brandConfig={brandConfig}
            />
          )}

          {activeTab === 'services' && (
            <ServicesScreen
              darkMode={darkMode}
              services={services}
              selectedVehicle={selectedVehicle}
              onSelectPackage={handleSelectPackageAndStartBooking}
              addons={addons}
              selectedAddons={selectedAddons}
              onToggleAddon={handleToggleAddon}
              brandConfig={brandConfig}
            />
          )}

          {activeTab === 'slot_booking' && (
            <BookingSlotScreen
              darkMode={darkMode}
              selectedPackage={selectedPackage}
              selectedVehicle={selectedVehicle}
              selectedAddons={selectedAddons}
              savedAddresses={savedAddresses}
              selectedAddress={currentLocation}
              onSelectAddress={setCurrentLocation}
              onProceedToCheckout={handleProceedToCheckout}
              onBack={() => setActiveTab('services')}
            />
          )}

          {activeTab === 'checkout' && (
            <CheckoutScreen
              darkMode={darkMode}
              selectedPackage={selectedPackage}
              selectedVehicle={selectedVehicle}
              selectedAddons={selectedAddons}
              selectedAddress={currentLocation}
              bookingDetails={bookingDetails}
              onConfirmBooking={handleConfirmBooking}
              onBack={() => setActiveTab('slot_booking')}
              promoCodes={PROMO_CODES}
            />
          )}

          {activeTab === 'tracking' && (
            <LiveTrackingScreen
              darkMode={darkMode}
              activeBooking={activeBooking}
              detailer={DETAILER_PROFILE}
              onOpenCallModal={() => setIsCallModalOpen(true)}
              onOpenChatModal={() => setIsChatModalOpen(true)}
              onOpenTransformation={() => setActiveTab('garage')}
            />
          )}

          {activeTab === 'garage' && (
            <GarageScreen
              darkMode={darkMode}
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
              onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
              transformations={TRANSFORMATION_REPORTS}
              onViewInvoice={(invoice) => setSelectedInvoice(invoice)}
            />
          )}
        </main>

        {/* Global Bottom Navigation (EXECUTIVE DEEP NAVY #0A2240) */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          darkMode={darkMode}
          hasActiveBooking={!!activeBooking}
          brandConfig={brandConfig}
        />

        {/* Floating Quick Settings / Onboarding Buttons */}
        
          <button
            onClick={() => { playTapSound(); setIsOnboardingOpen(true); }}
            className="p-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-md flex items-center gap-1.5 transition-all text-xs font-medium"
            title="App Briefing & Tutorial"
          >
            <span>Tutorial</span>
          </button>
        </div>

        {/* Modals & Sheets */}
        <DevSettingsModal
          isOpen={isDevSettingsOpen}
          onClose={() => setIsDevSettingsOpen(false)}
          brandConfig={brandConfig}
          pricingConfig={pricingConfig}
          onUpdateBrandConfig={handleUpdateBrandConfig}
          onUpdatePricingConfig={handleUpdatePricingConfig}
          onResetDefaults={handleResetDefaults}
          darkMode={darkMode}
        />

        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onCompleteAuth={() => setIsOnboardingOpen(false)}
          darkMode={darkMode}
          categories={VEHICLE_CATEGORIES}
          onAddVehicle={handleAddVehicle}
        />

        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          addresses={savedAddresses}
          selectedAddress={currentLocation}
          onSelectAddress={setCurrentLocation}
          darkMode={darkMode}
        />

        <NotificationsDrawer
          isOpen={isNotifsOpen}
          onClose={() => setIsNotifsOpen(false)}
          notifications={notifications}
          darkMode={darkMode}
        />

        <CallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
          detailer={DETAILER_PROFILE}
          darkMode={darkMode}
        />

        <ChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          detailer={DETAILER_PROFILE}
          darkMode={darkMode}
        />

      <AddVehicleModal
    isOpen={isAddVehicleOpen}
    onClose={() => setIsAddVehicleOpen(false)}
    categories={VEHICLE_CATEGORIES}
    onAddVehicle={handleAddVehicle}
    darkMode={darkMode}
  />

  <InvoiceModal
    isOpen={!!selectedInvoice}
    onClose={() => setSelectedInvoice(null)}
    invoice={selectedInvoice || {}}
    darkMode={darkMode}
  />
    </div>
  );
}
