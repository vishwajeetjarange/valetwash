import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Star, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Search, 
  Shield
} from 'lucide-react';
import { playTapSound } from '../utils/audio';
import { THEME_PRESETS } from '../config/brandConfig';

const DEFAULT_THEME = THEME_PRESETS[0];

export default function ServicesScreen({
  darkMode,
  services,
  selectedVehicle,
  onSelectPackage,
  addons,
  selectedAddons,
  onToggleAddon,
  brandConfig
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Multiplier from selected vehicle
  const multiplier = selectedVehicle?.category === 'superbike' ? 0.75 
    : selectedVehicle?.category === 'suv' ? 1.35 
    : selectedVehicle?.category === 'sedan' ? 1.15 
    : 1.0;

  const theme = {
    ...DEFAULT_THEME,
    ...(brandConfig?.theme || {})
  };

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'quick', label: 'Quick Wash' },
    { id: 'deep', label: 'Deep Detail' },
    { id: 'paint', label: 'Paint Care' },
    { id: 'fleet', label: 'Fleet Bay' },
  ];

  const filteredServices = services.filter((pkg) => {
    const matchesTab = activeTab === 'all' || pkg.category === activeTab;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      
      {/* Header & Machine Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: theme.cardTitleColor || "#0F172A" }}>
            Aviation Detailing Packages
          </h1>
          <p className="text-xs" style={{ color: theme.cardBodyTextColor || "#475569" }}>
            Engineered formulas for <span className="font-semibold text-sky-800">{selectedVehicle?.name || 'Your Machine'}</span>
          </p>
        </div>

        {/* Selected Vehicle Multiplier Chip */}
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold self-start sm:self-auto shadow-xs"
          style={{ 
            backgroundColor: theme.badgeBg || "#E0F2FE", 
            borderColor: "#BAE6FD", 
            color: theme.badgeText || "#0369A1" 
          }}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>{selectedVehicle?.categoryName || 'Sedan'}: {multiplier}x Pricing</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search aerospace foam, graphene coat, interior detox..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-medium border focus:outline-none transition-all shadow-xs"
          style={{ 
            backgroundColor: theme.cardBackground || "#FFFFFF", 
            borderColor: theme.cardBorderColor || "#E2E8F0",
            color: theme.cardTitleColor || "#0F172A"
          }}
        />
      </div>

      {/* Tabbed Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { playTapSound(); setActiveTab(cat.id); }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-xs"
              style={isActive ? {
                backgroundColor: theme.primaryButtonBg || "#0A2240",
                borderColor: theme.primaryButtonBg || "#0A2240",
                color: theme.primaryButtonText || "#FFFFFF"
              } : {
                backgroundColor: theme.cardBackground || "#FFFFFF",
                borderColor: theme.cardBorderColor || "#E2E8F0",
                color: theme.cardBodyTextColor || "#475569"
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Services List (PURE WHITE CARDS, CRISP CONTRAST) */}
      <div className="space-y-4">
        {filteredServices.map((pkg) => {
          const adjustedPrice = Math.round(pkg.basePrice * multiplier);
          return (
            <div
              key={pkg.id}
              className="rounded-3xl border overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
              style={{
                backgroundColor: theme.cardBackground || "#FFFFFF",
                borderColor: theme.cardBorderColor || "#E2E8F0"
              }}
            >
              {/* Package Header Banner with Badge Tag */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(0deg, rgba(10, 34, 64, 0.9) 0%, rgba(10, 34, 64, 0.3) 50%, transparent 100%)"
                  }}
                ></div>
                
                {/* Badge Tag: #E0F2FE with #0369A1 text */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span 
                    className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm"
                    style={{ 
                      backgroundColor: theme.badgeBg || "#E0F2FE", 
                      color: theme.badgeText || "#0369A1" 
                    }}
                  >
                    {pkg.badge}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>{pkg.rating} ({pkg.reviewsCount})</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-[11px] font-medium text-cyan-300">
                      {pkg.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-200 bg-black/60 px-2 py-0.5 rounded-lg backdrop-blur-sm shrink-0">
                    <Clock className="w-3 h-3 text-cyan-300" /> {pkg.duration}
                  </div>
                </div>
              </div>

              {/* Package Body & Feature Checklist */}
              <div className="p-4 sm:p-5 space-y-4">
                <p className="text-xs leading-relaxed" style={{ color: theme.cardBodyTextColor || "#475569" }}>
                  {pkg.detailedDescription}
                </p>

                {/* Technical Feature Checklist */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                    Aviation Precision Protocols
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pkg.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky-700" />
                        <span className="text-[11px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Pricing Pill & "Add to Bay" CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex flex-col">
                    <div className="text-[10px] uppercase font-semibold text-slate-400">
                      Total Calibration
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black font-mono text-sky-950">
                        ₹{adjustedPrice}
                      </span>
                      {multiplier !== 1.0 && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{pkg.basePrice}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">Doorstep Incl.</span>
                    </div>
                  </div>

                  {/* Primary Button: #0A2240 with #FFFFFF Text */}
                  <button
                    onClick={() => {
                      playTapSound();
                      onSelectPackage(pkg);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-95 transition-all"
                    style={{
                      backgroundColor: theme.primaryButtonBg || "#0A2240",
                      color: theme.primaryButtonText || "#FFFFFF"
                    }}
                  >
                    <span>Add to Bay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-ons Section (PURE WHITE CONTAINER) */}
      <div 
        className="p-4 sm:p-5 rounded-3xl border shadow-sm"
        style={{
          backgroundColor: theme.cardBackground || "#FFFFFF",
          borderColor: theme.cardBorderColor || "#E2E8F0"
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-extrabold" style={{ color: theme.cardTitleColor || "#0F172A" }}>
              High-Altitude Precision Add-ons
            </h3>
            <p className="text-[11px]" style={{ color: theme.cardBodyTextColor || "#475569" }}>
              Custom specialized treatments added to any doorstep session
            </p>
          </div>
          <span 
            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
            style={{ 
              backgroundColor: theme.badgeBg || "#E0F2FE", 
              color: theme.badgeText || "#0369A1",
              borderColor: "#BAE6FD"
            }}
          >
            {selectedAddons.length} Selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {addons.map((add) => {
            const isSelected = selectedAddons.some(a => a.id === add.id);
            return (
              <div
                key={add.id}
                onClick={() => {
                  playTapSound();
                  onToggleAddon(add);
                }}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected ? 'border-sky-600 bg-sky-50/50 shadow-xs' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div className="pr-3">
                  <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: theme.cardTitleColor || "#0F172A" }}>
                    {add.title}
                    <span className="text-[9px] font-mono text-sky-700">{add.duration}</span>
                  </div>
                  <div className="text-[10px] leading-tight mt-0.5" style={{ color: theme.cardBodyTextColor || "#475569" }}>
                    {add.desc}
                  </div>
                  <div className="text-xs font-mono font-bold mt-1 text-sky-900">
                    +₹{add.price}
                  </div>
                </div>

                <div 
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
