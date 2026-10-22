import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Clock, 
  Star, 
  ArrowRight, 
  Car, 
  Plus, 
  CheckCircle2, 
  Navigation, 
  Award,
  Zap,
  Gauge,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Check
} from 'lucide-react';
import { playTapSound } from '../utils/audio';
import { THEME_PRESETS } from '../config/brandConfig';

const DEFAULT_THEME = THEME_PRESETS[0];

export default function HomeScreen({
  darkMode,
  currentLocation,
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onOpenAddVehicle,
  services,
  onSelectPackage,
  onNavigateToTab,
  activeBooking,
  onOpenTracking,
  brandConfig
}) {
  // Current vehicle price multiplier
  const multiplier = selectedVehicle?.category === 'superbike' ? 0.75 
    : selectedVehicle?.category === 'suv' ? 1.35 
    : selectedVehicle?.category === 'sedan' ? 1.15 
    : 1.0;

  // Use flawlessTheme values directly or override from brandConfig
  const theme = {
    ...DEFAULT_THEME,
    ...(brandConfig?.theme || {})
  };

  const company = brandConfig?.companyInfo || {
    companyName: 'VALETWASH Pvt. Ltd.',
    aboutBio: 'Pioneering aviation-grade automotive surface preservation delivered autonomously straight to your driveway.',
    officeAddress: 'Valetwash Plot No 8, Raghunandan Nagar Baramati Maharashtra 413102',
    phoneNumbers: '+91 92267 87303',
    emails: 'concierge@valetwash.aero, support@valetwash.aero',
    operatingHours: 'Monday – Sunday: 06:30 AM – 09:30 PM (All 365 Days)',
    gstNumber: '27AABCU9603R1ZM'
  };

  const phonesList = company.phoneNumbers ? company.phoneNumbers.split(',').map(p => p.trim()) : ['+91 92267 87303'];
  const emailsList = company.emails ? company.emails.split(',').map(e => e.trim()) : ['concierge@valetwash.aero'];

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      
      {/* 1. HERO COMMAND BANNER (EXACT FLAWLESS OVERLAY & METRICS) */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700/30"
      >
        {/* Background Luxury Car Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85" 
            alt="Aviation Gloss Detailing" 
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* EXACT Hero Overlay: linear-gradient(180deg, rgba(10, 34, 64, 0.85) 0%, rgba(10, 34, 64, 0.95) 100%) */}
          <div 
            className="absolute inset-0 transition-all duration-300"
            style={{
              background: theme.heroOverlay || "linear-gradient(180deg, rgba(10, 34, 64, 0.85) 0%, rgba(10, 34, 64, 0.95) 100%)"
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-5 sm:p-7 max-w-lg text-white">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md mb-3 border shadow-sm"
            style={{ 
              backgroundColor: "rgba(0, 229, 255, 0.15)",
              borderColor: "rgba(0, 229, 255, 0.35)",
              color: "#00E5FF"
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              Standby in {currentLocation.tag || 'Baramati'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight mb-2">
            Aviation-Grade Detailers on Standby in <span className="text-cyan-400">{currentLocation.tag === 'Home' ? 'Baramati' : currentLocation.label?.split(',')[0]}</span>
          </h1>

          <p className="text-xs text-slate-200 leading-relaxed mb-4 line-clamp-2 opacity-95">
            Autonomous mobile rigs equipped with de-mineralized pure water, pH-neutral high-density snow foam & ceramic gloss protection delivered straight to your doorstep .
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                playTapSound();
                onSelectPackage(services[0]);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#00E5FF",
                color: "#0A2240"
              }}
            >
              <span>Instant Doorstep Bay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                playTapSound();
                onNavigateToTab('services');
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all"
            >
              Explore All Specs
            </button>
          </div>

          {/* EXACT Hero Metrics: Bold White (#FFFFFF) & Label (#94A3B8) */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/15">
            <div>
              <div className="text-[10px] font-medium" style={{ color: theme.heroMetricLabel || "#94A3B8" }}>Mobile Rig ETA</div>
              <div className="text-xs font-bold font-mono" style={{ color: theme.heroMetricNumber || "#FFFFFF" }}>12 - 18 Mins</div>
            </div>
            <div>
              <div className="text-[10px] font-medium" style={{ color: theme.heroMetricLabel || "#94A3B8" }}>Paint Safety</div>
              <div className="text-xs font-bold" style={{ color: theme.heroMetricNumber || "#FFFFFF" }}>0% Swirl Marks</div>
            </div>
            <div>
              <div className="text-[10px] font-medium" style={{ color: theme.heroMetricLabel || "#94A3B8" }}>Water Purity</div>
              <div className="text-xs font-bold" style={{ color: theme.heroMetricNumber || "#FFFFFF" }}>0 PPM De-ionized</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "SELECT YOUR MACHINE" CAROUSEL (PURE WHITE CARDS, DEEP CHARCOAL HEADINGS) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-extrabold tracking-tight" style={{ color: theme.cardTitleColor || "#0F172A" }}>
              Select Your Machine
            </h2>
            <p className="text-[11px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>
              Pricing automatically recalculates based on vehicle size & surface area
            </p>
          </div>
          
          <button
            onClick={() => { playTapSound(); onOpenAddVehicle(); }}
            className="flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Machine
          </button>
        </div>

        {/* Saved Vehicles Cards Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-1 px-1">
          {vehicles.map((veh) => {
            const isSelected = selectedVehicle?.id === veh.id;
            return (
              <div
                key={veh.id}
                onClick={() => {
                  playTapSound();
                  onSelectVehicle(veh);
                }}
                className={`relative flex-shrink-0 w-64 sm:w-72 p-4 rounded-2xl cursor-pointer border transition-all duration-200 shadow-sm ${
                  isSelected 
                    ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md scale-[1.02]' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                style={{
                  backgroundColor: theme.cardBackground || "#FFFFFF",
                  borderColor: isSelected ? "#0A2240" : (theme.cardBorderColor || "#E2E8F0")
                }}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div 
                    className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                    style={{ 
                      backgroundColor: theme.badgeBg || "#E0F2FE", 
                      color: theme.badgeText || "#0369A1" 
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </div>
                )}

                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img src={veh.image} alt={veh.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 pr-10">
                    <div className="text-xs font-bold truncate" style={{ color: theme.cardTitleColor || "#0F172A" }}>
                      {veh.name}
                    </div>
                    <div className="text-[10px] font-mono tracking-wider font-semibold text-sky-700">
                      {veh.plate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1" style={{ color: theme.cardBodyTextColor || "#475569" }}>
                    <Gauge className="w-3 h-3 text-sky-600" /> Clean Score: {veh.cleanScore}%
                  </span>
                  <span 
                    className="font-mono font-bold px-1.5 py-0.5 rounded text-[10px]"
                    style={{ 
                      backgroundColor: theme.badgeBg || "#E0F2FE", 
                      color: theme.badgeText || "#0369A1" 
                    }}
                  >
                    {veh.category === 'suv' ? '1.35x SUV' : veh.category === 'sedan' ? '1.15x Sedan' : veh.category === 'superbike' ? '0.75x Bike' : '1.0x Base'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. QUICK SERVICE SELECTOR (PURE WHITE CARDS, CRISP READABILITY) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-extrabold tracking-tight" style={{ color: theme.cardTitleColor || "#0F172A" }}>
              High-Precision Doorstep Services
            </h2>
            <p className="text-[11px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>
              Calibrated for <span className="font-semibold text-sky-700">{selectedVehicle?.name || 'Selected Vehicle'}</span>
            </p>
          </div>

          <button
            onClick={() => { playTapSound(); onNavigateToTab('services'); }}
            className="text-[11px] font-bold text-sky-700 hover:text-sky-900 transition-colors"
          >
            View All ({services.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {services.slice(0, 4).map((pkg) => {
            const adjustedPrice = Math.round(pkg.basePrice * multiplier);
            return (
              <div
                key={pkg.id}
                onClick={() => {
                  playTapSound();
                  onSelectPackage(pkg);
                }}
                className="group p-4 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
                style={{
                  backgroundColor: theme.cardBackground || "#FFFFFF",
                  borderColor: theme.cardBorderColor || "#E2E8F0"
                }}
              >
                <div>
                  {/* Service Image Banner with Badge */}
                  <div className="relative h-28 rounded-2xl overflow-hidden mb-3 border border-slate-200">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Badge: #E0F2FE with #0369A1 text */}
                    <div className="absolute top-2.5 left-2.5">
                      <span 
                        className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm"
                        style={{ 
                          backgroundColor: theme.badgeBg || "#E0F2FE", 
                          color: theme.badgeText || "#0369A1" 
                        }}
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white">
                      <span className="font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {pkg.rating} ({pkg.reviewsCount})
                      </span>
                      <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-300" /> {pkg.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold tracking-tight mb-1" style={{ color: theme.cardTitleColor || "#0F172A" }}>
                    {pkg.title}
                  </h3>

                  <p className="text-[11px] mb-3 line-clamp-1" style={{ color: theme.cardBodyTextColor || "#475569" }}>
                    {pkg.subtitle}
                  </p>

                  <div className="space-y-1 mb-3">
                    {pkg.features.slice(0, 2).map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-1.5 text-[10px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>
                        <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5 text-sky-600" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-400">from</span>
                    <span className="text-base font-extrabold font-mono text-sky-900">
                      ₹{adjustedPrice}
                    </span>
                    {multiplier !== 1.0 && (
                      <span className="text-[9px] text-slate-400 line-through">
                        ₹{pkg.basePrice}
                      </span>
                    )}
                  </div>

                  {/* Primary Button: #0A2240 with #FFFFFF Text */}
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:opacity-95"
                    style={{
                      backgroundColor: theme.primaryButtonBg || "#0A2240",
                      color: theme.primaryButtonText || "#FFFFFF"
                    }}
                  >
                    Add to Bay <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. AVIATION QUALITY STANDARD PILLARS (PURE WHITE CARD, CLEAR LABELS) */}
      <section 
        className="p-4 sm:p-5 rounded-3xl border shadow-sm"
        style={{
          backgroundColor: theme.cardBackground || "#FFFFFF",
          borderColor: theme.cardBorderColor || "#E2E8F0"
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-sky-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900">
            The {brandConfig?.brandName || 'VALETWASH'} Flight Standard
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div className="flex items-start gap-2">
            <Droplets className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky-600" />
            <div>
              <span className="font-bold block" style={{ color: theme.cardTitleColor || "#0F172A" }}>0 PPM Pure Water</span>
              <span className="text-[10px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>Zero water spots or mineral etching on clear coat</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky-600" />
            <div>
              <span className="font-bold block" style={{ color: theme.cardTitleColor || "#0F172A" }}>600 GSM Edgeless</span>
              <span className="text-[10px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>Plush Korean microfibers laundered after every car</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky-600" />
            <div>
              <span className="font-bold block" style={{ color: theme.cardTitleColor || "#0F172A" }}>Autonomous Rig</span>
              <span className="text-[10px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>Self-powered battery generators; zero client power used</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Star className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky-600" />
            <div>
              <span className="font-bold block" style={{ color: theme.cardTitleColor || "#0F172A" }}>₹10 Lakh Insurance</span>
              <span className="text-[10px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>Complete driveway and paintwork liability cover</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION & OFFICE INFO (PURE WHITE CARD, PERFECT READABILITY) */}
      <section 
        className="p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4"
        style={{
          backgroundColor: theme.cardBackground || "#FFFFFF",
          borderColor: theme.cardBorderColor || "#E2E8F0"
        }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-700" />
            <div>
              <h3 className="text-sm font-black tracking-wide" style={{ color: theme.cardTitleColor || "#0F172A" }}>
                {company.companyName}
              </h3>
              <p className="text-[10px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>Official Concierge & Corporate Dispatch Headquarters</p>
            </div>
          </div>

          <span 
            className="text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0"
            style={{ 
              backgroundColor: theme.badgeBg || "#E0F2FE", 
              color: theme.badgeText || "#0369A1",
              borderColor: "#BAE6FD"
            }}
          >
            {company.supportStatus || 'Live Dispatch Active'}
          </span>
        </div>

        {/* Company Bio */}
        <p className="text-xs leading-relaxed" style={{ color: theme.cardBodyTextColor || "#475569" }}>
          {company.aboutBio}
        </p>

        {/* Contact Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          
          {/* Office Address */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: theme.cardTitleColor || "#0F172A" }}>
              <MapPin className="w-3.5 h-3.5 shrink-0 text-sky-700" />
              <span>Office & Operations Hangar</span>
            </div>
            <p className="text-[11px] leading-snug" style={{ color: theme.cardBodyTextColor || "#475569" }}>
              {company.officeAddress}
            </p>
          </div>

          {/* Operating Hours */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: theme.cardTitleColor || "#0F172A" }}>
              <Calendar className="w-3.5 h-3.5 shrink-0 text-sky-700" />
              <span>Fleet Deployment Hours</span>
            </div>
            <p className="text-[11px] leading-snug font-mono" style={{ color: theme.cardBodyTextColor || "#475569" }}>
              {company.operatingHours}
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: theme.cardTitleColor || "#0F172A" }}>
              <Phone className="w-3.5 h-3.5 shrink-0 text-sky-700" />
              <span>Company Phone Numbers</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
              {phonesList.map((ph, idx) => (
                <a
                  key={idx}
                  href={`tel:${ph.replace(/\s+/g, '')}`}
                  className="px-2 py-1 rounded-lg bg-white border border-slate-300 text-sky-800 hover:border-sky-600 transition-colors shadow-xs"
                >
                  {ph}
                </a>
              ))}
            </div>
          </div>

          {/* Emails */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: theme.cardTitleColor || "#0F172A" }}>
              <Mail className="w-3.5 h-3.5 shrink-0 text-sky-700" />
              <span>Official Concierge Emails</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {emailsList.map((em, idx) => (
                <a
                  key={idx}
                  href={`mailto:${em}`}
                  className="px-2 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-sky-600 transition-colors text-[11px] shadow-xs"
                >
                  {em}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* GST / Corporate Registration Footer */}
        {company.gstNumber && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Corporate GSTIN: <strong className="text-slate-800">{company.gstNumber}</strong></span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <Check className="w-3 h-3" /> Ministry of Corporate Affairs Verified
            </span>
          </div>
        )}
      </section>

      {/* 6. ACTIVE BOOKING PERSISTENT BAR */}
      {activeBooking && (
        <div 
          onClick={() => {
            playTapSound();
            onOpenTracking();
          }}
          className="cursor-pointer p-4 rounded-3xl border shadow-md transition-all hover:shadow-lg text-white"
          style={{
            background: "linear-gradient(90deg, #0A2240 0%, #112F55 100%)",
            borderColor: "rgba(0, 229, 255, 0.4)"
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-bold tracking-wide">
                Live Flight: {activeBooking.statusStep || 'En Route to Bay'}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-cyan-300">
              ETA: {activeBooking.eta || '11 mins'}
            </span>
          </div>

          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full rounded-full transition-all duration-500 bg-cyan-400" 
              style={{ 
                width: `${activeBooking.progressPercent || 45}%`
              }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="truncate">
              {activeBooking.packageName} • {activeBooking.vehicleName}
            </span>
            <span className="font-bold flex items-center gap-1 shrink-0 text-cyan-300">
              Track Telematics <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
