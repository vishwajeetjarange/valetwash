import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Upload, 
  DollarSign, 
  Image as ImageIcon, 
  Check, 
  RotateCcw, 
  Code, 
  Copy, 
  Sparkles, 
  Layers, 
  Edit3, 
  Maximize2, 
  Palette, 
  Type, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar
} from 'lucide-react';
import { playTapSound, playSuccessSound } from '../utils/audio';
import { THEME_PRESETS, FONT_OPTIONS } from '../config/brandConfig';

export default function DevSettingsModal({
  isOpen,
  onClose,
  brandConfig,
  pricingConfig,
  onUpdateBrandConfig,
  onUpdatePricingConfig,
  onResetDefaults,
  darkMode
}) {
  const [activeTab, setActiveTab] = useState('brand');
  const [localBrand, setLocalBrand] = useState(brandConfig);
  const [localPricing, setLocalPricing] = useState(pricingConfig);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync state if modal opens with fresh brandConfig
  React.useEffect(() => {
    if (isOpen) {
      setLocalBrand(brandConfig);
      setLocalPricing(pricingConfig);
    }
  }, [isOpen, brandConfig, pricingConfig]);

  if (!isOpen) return null;

  // Handle Logo Upload via File Input
  const handleLogoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        setLocalBrand(prev => ({
          ...prev,
          logoType: 'image',
          logoUrl: dataUrl,
          logoHeight: prev.logoHeight || 46,
          logoWidth: prev.logoWidth || 160
        }));
        playSuccessSound();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Package Custom Image Upload
  const handlePackageImageUpload = (pkgKey, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        setLocalPricing(prev => ({
          ...prev,
          packages: {
            ...prev.packages,
            [pkgKey]: {
              ...prev.packages[pkgKey],
              image: dataUrl
            }
          }
        }));
        playSuccessSound();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Preset Theme Selection (NOW FULLY SYNCS ALL TOKENS)
  const handleSelectPresetTheme = (preset) => {
    playTapSound();
    setLocalBrand(prev => ({
      ...prev,
      theme: {
        presetId: preset.id,
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent,
        canvasBg: preset.canvasBg,
        cardBg: preset.cardBg,
        headerBg: preset.headerBg || preset.primary,
        bottomNavBg: preset.bottomNavBg || preset.primary,
        bottomNavActive: preset.bottomNavActive || preset.accent,
        badgeBg: preset.badgeBg || `${preset.accent}20`,
        badgeText: preset.badgeText || preset.secondary,
        cardTitle: preset.cardTitle || '#0F172A',
        cardBody: preset.cardBody || '#475569',
        cardBorder: preset.cardBorder || `${preset.secondary}30`,
        heroOverlay: preset.heroOverlay || `linear-gradient(180deg, ${preset.primary}D9 0%, ${preset.primary}F2 100%)`
      }
    }));
  };

  const handleSaveAll = () => {
    playSuccessSound();
    onUpdateBrandConfig(localBrand);
    onUpdatePricingConfig(localPricing);
    onClose();
  };

  const handleReset = () => {
    playTapSound();
    if (window.confirm("Reset all custom branding, themes, about section, service names & prices to factory defaults?")) {
      onResetDefaults();
      onClose();
    }
  };

  // Code Export
  const generatedCode = `// Generated Configuration from Developer Panel
export const DEFAULT_BRAND_CONFIG = ${JSON.stringify(localBrand, null, 2)};

export const DEFAULT_PRICING_CONFIG = ${JSON.stringify(localPricing, null, 2)};
`;

  const handleCopyCode = () => {
    playTapSound();
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const currentHeight = localBrand.logoHeight || 44;
  const currentWidth = localBrand.logoWidth || 160;
  const currentTheme = localBrand.theme || THEME_PRESETS[0];

  const company = localBrand.companyInfo || {
    companyName: 'VALETWASH Aero Detailing Technologies Pvt. Ltd.',
    aboutBio: 'Pioneering aviation-grade automotive surface preservation delivered autonomously straight to your driveway.',
    officeAddress: 'Hangar 4, Aviation Business Bay, Santacruz West, Mumbai, Maharashtra 400054',
    phoneNumbers: '+91 98200 98200, +91 22 4980 1100',
    emails: 'concierge@valetwash.aero, dispatch@valetwash.aero',
    operatingHours: 'Monday – Sunday: 06:30 AM – 09:30 PM (All 365 Days)',
    gstNumber: '27AABCU9603R1ZM',
    supportStatus: 'Live Doorstep Dispatch Active'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-3xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
        darkMode ? 'bg-[#0E1726] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div 
          className="p-4 sm:p-5 border-b border-slate-700/20 flex items-center justify-between text-white transition-colors duration-300"
          style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg border"
              style={{ backgroundColor: `${currentTheme.primary}`, borderColor: `${currentTheme.accent}60`, color: currentTheme.accent }}
            >
              <Palette className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black tracking-wider uppercase">Master Developer Studio</h3>
                <span 
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase"
                  style={{ backgroundColor: currentTheme.accent, color: currentTheme.primary }}
                >
                  Live Customizer
                </span>
              </div>
              <p className="text-[11px] text-slate-200 opacity-90">Customize colors, display canvas, cards, about info, logo & media</p>
            </div>
          </div>

          <button onClick={() => { playTapSound(); onClose(); }} className="p-1.5 rounded-full text-slate-300 hover:text-white bg-black/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation (6 Comprehensive Tabs) */}
        <div className="flex border-b border-slate-700/20 bg-slate-900/60 px-4 pt-2 gap-2 text-xs font-bold overflow-x-auto no-scrollbar">
          {[
            { id: 'brand', label: '1. Logo & Font', icon: ImageIcon },
            { id: 'theme', label: '2. Main Display Colors', icon: Palette },
            { id: 'about', label: '3. About & Office Info', icon: Building2 },
            { id: 'services', label: '4. Service Images & Names', icon: Edit3 },
            { id: 'multipliers', label: '5. Multipliers', icon: Layers },
            { id: 'code', label: '6. Export Code', icon: Code },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { playTapSound(); setActiveTab(tab.id); }}
                className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  isActive 
                    ? 'text-white border-cyan-400' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
                style={isActive ? { borderColor: currentTheme.accent, color: currentTheme.accent } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: LOGO, BANNER REPLACEMENT & FONT */}
          {activeTab === 'brand' && (
            <div className="space-y-5">
              
              {/* Header Preview */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Navigation Header Live Preview</span>
                  <span className="text-[10px] font-mono" style={{ color: currentTheme.accent }}>
                    Mode: {localBrand.logoDisplayMode || 'image_with_text'}
                  </span>
                </div>

                <div 
                  className="p-3.5 rounded-2xl border flex items-center justify-between min-h-[68px] overflow-hidden"
                  style={{ backgroundColor: currentTheme.headerBg || currentTheme.primary, borderColor: `${currentTheme.accent}40` }}
                >
                  {localBrand.logoDisplayMode === 'image_replaces_text' && localBrand.logoUrl ? (
                    <div className="flex items-center justify-center">
                      <img 
                        src={localBrand.logoUrl} 
                        alt="Logo Wordmark" 
                        style={{ height: `${currentHeight}px`, maxWidth: `${currentWidth}px` }} 
                        className="w-auto object-contain drop-shadow" 
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      {localBrand.logoType === 'image' && localBrand.logoUrl ? (
                        <img 
                          src={localBrand.logoUrl} 
                          alt="Logo Icon" 
                          style={{ height: `${currentHeight}px` }} 
                          className="w-auto max-w-[120px] object-contain drop-shadow" 
                        />
                      ) : (
                        <div 
                          className="w-10 h-10 rounded-xl p-0.5 flex items-center justify-center shrink-0 shadow-md"
                          style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` }}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={currentTheme.accent} strokeWidth="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                        </div>
                      )}

                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="text-base font-black tracking-wider text-white"
                            style={{ 
                              fontFamily: localBrand.brandFont || 'Inter'
                            }}
                          >
                            {localBrand.brandName}
                          </span>
                          <span 
                            className="text-[9px] font-bold px-1.5 py-0.2 rounded uppercase border"
                            style={{ 
                              backgroundColor: 'rgba(0,0,0,0.4)', 
                              color: currentTheme.accent,
                              borderColor: `${currentTheme.accent}40` 
                            }}
                          >
                            {localBrand.badgeText || 'Aero'}
                          </span>
                        </div>
                        <div className="text-[9px] text-slate-300 font-medium">{localBrand.brandTagline}</div>
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-300 hidden sm:block">Header Scale Match</div>
                </div>
              </div>

              {/* Brand Logo Display Mode */}
              <div>
                <label className="block text-xs font-bold text-white mb-2">
                  Brand Header Display Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    {
                      id: 'image_replaces_text',
                      title: 'Image Replaces Brand Name',
                      desc: 'Full logo banner graphic completely replaces the text title'
                    },
                    {
                      id: 'image_with_text',
                      title: 'Logo Icon + Brand Name',
                      desc: 'Custom image icon alongside styled text brand name'
                    },
                    {
                      id: 'emblem_with_text',
                      title: 'Aviation Emblem + Text',
                      desc: 'Default flight wings icon alongside styled text'
                    }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setLocalBrand(prev => ({ 
                        ...prev, 
                        logoDisplayMode: mode.id,
                        logoType: mode.id === 'emblem_with_text' ? 'emblem' : 'image'
                      }))}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        localBrand.logoDisplayMode === mode.id
                          ? 'bg-slate-900 shadow-md text-white'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                      style={localBrand.logoDisplayMode === mode.id ? { borderColor: currentTheme.accent, backgroundColor: currentTheme.cardBg } : {}}
                    >
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{mode.title}</span>
                        {localBrand.logoDisplayMode === mode.id && <Check className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-tight">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Upload & Sizing Controls */}
              {localBrand.logoDisplayMode !== 'emblem_with_text' && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Custom Logo Graphic Upload</span>
                    <span className="text-[10px] text-slate-400">PNG / SVG transparent background</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed border-slate-700 hover:border-cyan-400 bg-slate-950 cursor-pointer transition-all text-xs font-bold text-slate-200">
                      <Upload className="w-5 h-5" style={{ color: currentTheme.accent }} />
                      <span>Upload Logo File from Computer</span>
                      <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden" />
                    </label>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-400">Or Paste Image URL</label>
                      <input
                        type="text"
                        placeholder="https://example.com/logo.png or /logo.png"
                        value={localBrand.logoUrl}
                        onChange={(e) => setLocalBrand(prev => ({ ...prev, logoUrl: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:outline-none font-mono"
                        style={{ borderColor: `${currentTheme.accent}50` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-white mb-1">
                        <span>Logo Height: {currentHeight}px</span>
                        <span className="text-[10px] text-slate-400">24px - 72px</span>
                      </div>
                      <input
                        type="range"
                        min="24"
                        max="72"
                        value={currentHeight}
                        onChange={(e) => setLocalBrand(prev => ({ ...prev, logoHeight: Number(e.target.value) }))}
                        className="w-full cursor-pointer"
                        style={{ accentColor: currentTheme.accent }}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-white mb-1">
                        <span>Max Width: {currentWidth}px</span>
                        <span className="text-[10px] text-slate-400">100px - 320px</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="320"
                        value={currentWidth}
                        onChange={(e) => setLocalBrand(prev => ({ ...prev, logoWidth: Number(e.target.value) }))}
                        className="w-full cursor-pointer"
                        style={{ accentColor: currentTheme.accent }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Brand Font Selector */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4" style={{ color: currentTheme.accent }} />
                    <span className="text-xs font-bold text-white">Brand Name Font Family</span>
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: currentTheme.accent }}>{localBrand.brandFont || 'Inter'}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {FONT_OPTIONS.map(font => {
                    const isSelected = (localBrand.brandFont || 'Inter') === font.id;
                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => {
                          playTapSound();
                          setLocalBrand(prev => ({ ...prev, brandFont: font.id }));
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'text-white shadow-md'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                        }`}
                        style={isSelected ? { borderColor: currentTheme.accent, backgroundColor: currentTheme.primary } : {}}
                      >
                        <div 
                          className="text-xs font-bold truncate text-white"
                          style={{ fontFamily: font.id }}
                        >
                          {font.id}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate mt-0.5">{font.name.split('(')[1]?.replace(')', '') || font.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Name & Tagline Text Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Brand Name Text</label>
                  <input
                    type="text"
                    value={localBrand.brandName}
                    onChange={(e) => setLocalBrand(prev => ({ ...prev, brandName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-white focus:outline-none"
                    style={{ fontFamily: localBrand.brandFont || 'Inter' }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={localBrand.badgeText}
                    onChange={(e) => setLocalBrand(prev => ({ ...prev, badgeText: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-slate-900 border border-slate-700 text-white focus:outline-none"
                    style={{ color: currentTheme.accent }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Brand Slogan / Tagline</label>
                  <input
                    type="text"
                    value={localBrand.brandTagline}
                    onChange={(e) => setLocalBrand(prev => ({ ...prev, brandTagline: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MAIN DISPLAY PAGE COLOR CONTROLS (FULL DYNAMIC REACTION) */}
          {activeTab === 'theme' && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-white">Main Display Page & Full Site Theme</div>
                <div className="text-[10px] text-slate-400">Controls the entire canvas, header, service cards, badges & accents</div>
              </div>

              {/* 1-Click Theme Presets with Canvas & Card colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEME_PRESETS.map(preset => {
                  const isSelected = currentTheme.presetId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPresetTheme(preset)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden shadow-lg ${
                        isSelected ? 'scale-[1.02] ring-2 ring-cyan-400' : 'hover:scale-[1.01]'
                      }`}
                      style={{
                        backgroundColor: preset.cardBg || '#FFFFFF',
                        borderColor: isSelected ? preset.accent : '#CBD5E1'
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold" style={{ color: preset.cardTitle || '#0F172A' }}>{preset.name}</span>
                        <span 
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase"
                          style={{ backgroundColor: preset.badgeBg || `${preset.accent}20`, color: preset.badgeText || preset.accent }}
                        >
                          {preset.badge}
                        </span>
                      </div>

                      {/* Swatch Bars representing Canvas, Card, Primary & Accent */}
                      <div className="flex items-center gap-1.5 h-6 rounded-lg overflow-hidden border border-slate-300 p-0.5 bg-slate-100">
                        <div className="h-full flex-1 rounded" style={{ backgroundColor: preset.canvasBg }} title="Main Canvas Background"></div>
                        <div className="h-full flex-1 rounded" style={{ backgroundColor: preset.cardBg }} title="Service Card Background"></div>
                        <div className="h-full flex-1 rounded" style={{ backgroundColor: preset.primary }} title="Header / Primary Color"></div>
                        <div className="h-full w-8 rounded shadow-sm" style={{ backgroundColor: preset.accent }} title="Accent Color"></div>
                      </div>

                      <div className="flex justify-between text-[9px] text-slate-500 mt-2 font-mono">
                        <span>Canvas: {preset.canvasBg}</span>
                        <span>Card: {preset.cardBg}</span>
                        <span style={{ color: preset.accent }}>Accent: {preset.accent}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DETAILED MAIN DISPLAY CANVAS & CARD COLOR PICKERS */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-4">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Palette className="w-4 h-4" style={{ color: currentTheme.accent }} />
                  <span>Fine-Tune Custom Palette Hex Codes</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  
                  {/* Canvas Background Color */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                      Main Canvas Page Background
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentTheme.canvasBg || '#F8FAFC'}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { ...prev.theme, canvasBg: e.target.value, presetId: 'custom' }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={currentTheme.canvasBg || '#F8FAFC'}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { ...prev.theme, canvasBg: e.target.value, presetId: 'custom' }
                        }))}
                        className="flex-1 px-2 py-1 rounded text-xs font-mono text-white bg-slate-900 border border-slate-700"
                      />
                    </div>
                  </div>

                  {/* Service Card Background Color */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                      Service Cards Background
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentTheme.cardBg || '#FFFFFF'}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { ...prev.theme, cardBg: e.target.value, presetId: 'custom' }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={currentTheme.cardBg || '#FFFFFF'}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { ...prev.theme, cardBg: e.target.value, presetId: 'custom' }
                        }))}
                        className="flex-1 px-2 py-1 rounded text-xs font-mono text-white bg-slate-900 border border-slate-700"
                      />
                    </div>
                  </div>

                  {/* Primary Color */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                      Header & Button Dark Tone
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentTheme.primary}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { 
                            ...prev.theme, 
                            primary: e.target.value, 
                            headerBg: e.target.value,
                            bottomNavBg: e.target.value,
                            presetId: 'custom' 
                          }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={currentTheme.primary}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { 
                            ...prev.theme, 
                            primary: e.target.value, 
                            headerBg: e.target.value,
                            bottomNavBg: e.target.value,
                            presetId: 'custom' 
                          }
                        }))}
                        className="flex-1 px-2 py-1 rounded text-xs font-mono text-white bg-slate-900 border border-slate-700"
                      />
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                      Secondary Flow & Borders
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentTheme.secondary}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { ...prev.theme, secondary: e.target.value, presetId: 'custom' }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={currentTheme.secondary}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { ...prev.theme, secondary: e.target.value, presetId: 'custom' }
                        }))}
                        className="flex-1 px-2 py-1 rounded text-xs font-mono text-white bg-slate-900 border border-slate-700"
                      />
                    </div>
                  </div>

                  {/* Accent Highlight / Glow */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 sm:col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                      Electric Accent & Active Tabs
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentTheme.accent}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { 
                            ...prev.theme, 
                            accent: e.target.value, 
                            bottomNavActive: e.target.value,
                            presetId: 'custom' 
                          }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={currentTheme.accent}
                        onChange={(e) => setLocalBrand(prev => ({
                          ...prev,
                          theme: { 
                            ...prev.theme, 
                            accent: e.target.value, 
                            bottomNavActive: e.target.value,
                            presetId: 'custom' 
                          }
                        }))}
                        className="flex-1 px-2 py-1 rounded text-xs font-mono text-white bg-slate-900 border border-slate-700"
                      />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CUSTOMIZABLE ABOUT SECTION & OFFICE INFO */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Customizable About & Corporate Concierge Section</div>
                  <div className="text-[10px] text-slate-400">Directly rendered on the main display page for client transparency</div>
                </div>
                <span className="text-[10px] font-bold font-mono" style={{ color: currentTheme.accent }}>Client-Facing</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3.5">
                
                {/* Company Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Company Registered Name</label>
                  <input
                    type="text"
                    value={company.companyName}
                    onChange={(e) => setLocalBrand(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, companyName: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl text-xs font-bold text-white bg-slate-950 border border-slate-700 focus:outline-none"
                  />
                </div>

                {/* About Mission Statement */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Company Bio / Mission Statement</label>
                  <textarea
                    rows={3}
                    value={company.aboutBio}
                    onChange={(e) => setLocalBrand(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, aboutBio: e.target.value }
                    }))}
                    className="w-full p-3 rounded-xl text-xs text-slate-200 bg-slate-950 border border-slate-700 focus:outline-none"
                  />
                </div>

                {/* Office & Hangar Address */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                    <span>Office & Operations Hangar Address</span>
                  </label>
                  <input
                    type="text"
                    value={company.officeAddress}
                    onChange={(e) => setLocalBrand(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, officeAddress: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl text-xs text-white bg-slate-950 border border-slate-700 focus:outline-none"
                  />
                </div>

                {/* Phone Numbers & Emails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                      <span>Company Phone Numbers (comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98200 98200, +91 22 4980 1100"
                      value={company.phoneNumbers}
                      onChange={(e) => setLocalBrand(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, phoneNumbers: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold text-white bg-slate-950 border border-slate-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                      <span>Official Emails (comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="concierge@valetwash.aero, support@valetwash.aero"
                      value={company.emails}
                      onChange={(e) => setLocalBrand(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, emails: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono text-white bg-slate-950 border border-slate-700 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Operating Hours & GST Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                      <span>Operating & Deployment Hours</span>
                    </label>
                    <input
                      type="text"
                      value={company.operatingHours}
                      onChange={(e) => setLocalBrand(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, operatingHours: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl text-xs text-white bg-slate-950 border border-slate-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Corporate GSTIN / Tax ID</label>
                    <input
                      type="text"
                      value={company.gstNumber}
                      onChange={(e) => setLocalBrand(prev => ({
                        ...prev,
                        companyInfo: { ...prev.companyInfo, gstNumber: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono text-white bg-slate-950 border border-slate-700 focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: SERVICE MEDIA, NAMES & PRICING */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Full Service Customizer (Names, Images & Prices)</div>
                  <div className="text-[10px] text-slate-400">Upload or link unique photos for each service package</div>
                </div>
                <span className="text-[10px] font-bold font-mono" style={{ color: currentTheme.accent }}>6 Packages</span>
              </div>

              <div className="space-y-4">
                {Object.entries(localPricing.packages).map(([pkgKey, pkgData], idx) => (
                  <div 
                    key={pkgKey} 
                    className="p-4 rounded-2xl border space-y-3 shadow-md"
                    style={{ backgroundColor: currentTheme.cardBg || '#0F1E33', borderColor: `${currentTheme.secondary}40` }}
                  >
                    {/* Header Row: Package ID & Base Price */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded border"
                          style={{ backgroundColor: `${currentTheme.primary}`, color: currentTheme.accent, borderColor: `${currentTheme.accent}40` }}
                        >
                          Package #{idx + 1} ({pkgKey})
                        </span>
                        <span className="text-xs font-bold text-white">{pkgData.title}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-400">Base: ₹</span>
                        <input
                          type="number"
                          min="0"
                          step="50"
                          value={pkgData.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLocalPricing(prev => ({
                              ...prev,
                              packages: {
                                ...prev.packages,
                                [pkgKey]: {
                                  ...prev.packages[pkgKey],
                                  price: val
                                }
                              }
                            }));
                          }}
                          className="w-24 px-2 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 border border-slate-700 text-right"
                          style={{ color: currentTheme.accent }}
                        />
                      </div>
                    </div>

                    {/* Image Preview & Upload Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700 relative group">
                        <img 
                          src={pkgData.image} 
                          alt={pkgData.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[9px] font-bold text-white">
                          Change
                        </div>
                      </div>

                      <div className="flex-1 space-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-semibold text-slate-400">Custom Package Image</label>
                          <label className="text-[10px] font-bold hover:underline cursor-pointer flex items-center gap-1" style={{ color: currentTheme.accent }}>
                            <Upload className="w-3 h-3" />
                            <span>Upload from Disk</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handlePackageImageUpload(pkgKey, e)} 
                              className="hidden" 
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Image URL: https://images.unsplash.com/..."
                          value={pkgData.image || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLocalPricing(prev => ({
                              ...prev,
                              packages: {
                                ...prev.packages,
                                [pkgKey]: {
                                  ...prev.packages[pkgKey],
                                  image: val
                                }
                              }
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 border border-slate-700 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Titles & Subtitles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Service Title / Name</label>
                        <input
                          type="text"
                          value={pkgData.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLocalPricing(prev => ({
                              ...prev,
                              packages: {
                                ...prev.packages,
                                [pkgKey]: {
                                  ...prev.packages[pkgKey],
                                  title: val
                                }
                              }
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-950 border border-slate-700 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">Subtitle / Description</label>
                        <input
                          type="text"
                          value={pkgData.subtitle || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLocalPricing(prev => ({
                              ...prev,
                              packages: {
                                ...prev.packages,
                                [pkgKey]: {
                                  ...prev.packages[pkgKey],
                                  subtitle: val
                                }
                              }
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs text-slate-300 bg-slate-950 border border-slate-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add-ons Pricing */}
              <div className="pt-3 border-t border-slate-700/20">
                <div className="text-xs font-bold text-white mb-2">Specialized Add-on Prices (₹)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'add-1', label: 'Engine Bay Detailing' },
                    { id: 'add-2', label: 'Rain-X Hydro-Shield' },
                    { id: 'add-3', label: 'Headlight Lens UV Restoration' },
                    { id: 'add-4', label: 'Pet Hair Extractor & Ozone' },
                  ].map(addon => (
                    <div 
                      key={addon.id} 
                      className="p-2.5 rounded-xl border flex items-center justify-between text-xs"
                      style={{ backgroundColor: currentTheme.cardBg || '#0F1E33', borderColor: `${currentTheme.secondary}30` }}
                    >
                      <span className="text-slate-300 text-[11px] truncate">{addon.label}</span>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <span className="text-slate-400 font-mono text-[11px]">₹</span>
                        <input
                          type="number"
                          step="50"
                          value={localPricing.addons[addon.id] || 0}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLocalPricing(prev => ({
                              ...prev,
                              addons: {
                                ...prev.addons,
                                [addon.id]: val
                              }
                            }));
                          }}
                          className="w-16 px-2 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 border border-slate-700 text-right"
                          style={{ color: currentTheme.accent }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VEHICLE MULTIPLIERS */}
          {activeTab === 'multipliers' && (
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-white">Vehicle Category Multipliers</div>
                <div className="text-[10px] text-slate-400">Formula: Final Price = Package Base × Vehicle Multiplier</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'hatchback', label: 'Hatchback / Compact', desc: 'Standard baseline footprint (1.0x)' },
                  { key: 'sedan', label: 'Executive Sedan', desc: 'Mid-size executive surface (+15%)' },
                  { key: 'suv', label: 'Luxury SUV', desc: 'Full-size high vehicle (+35%)' },
                  { key: 'superbike', label: 'Superbike / Motorcycle', desc: 'Two-wheeler precision (-25%)' },
                ].map(v => (
                  <div 
                    key={v.key} 
                    className="p-3 rounded-2xl border space-y-1"
                    style={{ backgroundColor: currentTheme.cardBg || '#0F1E33', borderColor: `${currentTheme.secondary}30` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{v.label}</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.05"
                          min="0.1"
                          max="3.0"
                          value={localPricing.multipliers[v.key]}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setLocalPricing(prev => ({
                              ...prev,
                              multipliers: {
                                ...prev.multipliers,
                                [v.key]: val
                              }
                            }));
                          }}
                          className="w-16 px-2 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 border border-slate-700 text-right"
                          style={{ color: currentTheme.accent }}
                        />
                        <span className="text-xs font-bold" style={{ color: currentTheme.accent }}>x</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EXPORT CODE */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Permanent Code Export</div>
                  <div className="text-[10px] text-slate-400">Copy and paste this directly into <code className="text-cyan-400">src/config/brandConfig.js</code></div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all"
                  style={{ backgroundColor: currentTheme.primary, borderColor: `${currentTheme.accent}60`, color: currentTheme.accent }}
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-72 leading-relaxed">
                {generatedCode}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-700/20 bg-slate-900/80 flex items-center justify-between gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { playTapSound(); onClose(); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg hover:opacity-95 transition-all"
              style={{ background: `linear-gradient(90deg, ${currentTheme.secondary}, ${currentTheme.accent})` }}
            >
              <Check className="w-4 h-4" />
              <span>Apply Changes Live</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
