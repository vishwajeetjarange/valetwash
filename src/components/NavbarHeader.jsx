import React from 'react';
import { 
  MapPin, 
  Bell, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Smartphone, 
  Monitor, 
  ChevronDown, 
  Plane,
  Settings,
  Palette
} from 'lucide-react';
import { playTapSound } from '../utils/audio';
import { THEME_PRESETS } from '../config/brandConfig';

const DEFAULT_THEME = THEME_PRESETS[0];

export default function NavbarHeader({
  currentLocation,
  onOpenLocationModal,
  unreadNotifsCount,
  onOpenNotifs,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode,
  mobileView,
  onToggleMobileView,
  activeTab,
  onSelectTab,
  selectedVehicle,
  onOpenOnboarding,
  brandConfig,
  onLogoTap,
}) {
  const theme = {
    ...DEFAULT_THEME,
    ...(brandConfig?.theme || {})
  };
  const headerBg = theme.headerBg || theme.headerBackground || '#0A2240';

  const customHeight = brandConfig?.logoHeight || 44;
  const customWidth = brandConfig?.logoWidth || 160;
  const logoMode = brandConfig?.logoDisplayMode || 'image_with_text';
  const hasCustomImage = brandConfig?.logoType === 'image' && !!brandConfig?.logoUrl;
  const brandFontFamily = brandConfig?.brandFont || 'Inter';

  return (
    <header 
      className="sticky top-0 z-40 transition-colors duration-200 border-b border-slate-800 text-white shadow-md"
      style={{ backgroundColor: headerBg }}
    >
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2">
          
          {/* BRAND IDENTITY / LOGO AREA */}
          <div onClick={() => { playTapSound(); onSelectTab('home'); if (onLogoTap) onLogoTap(); }}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            {/* MODE 1: IMAGE LOGO REPLACES BRAND NAME COMPLETELY */}
            {logoMode === 'image_replaces_text' && hasCustomImage ? (
              <div 
                className="flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:opacity-95"
                style={{ height: `${customHeight}px` }}
              >
                <img 
                  src={brandConfig.logoUrl} 
                  alt={brandConfig.brandName} 
                  style={{ 
                    height: `${customHeight}px`, 
                    maxWidth: `${customWidth}px` 
                  }}
                  className="w-auto object-contain drop-shadow-md rounded-md"
                />
              </div>
            ) : (
              /* MODE 2 & 3: ICON / EMBLEM + BRAND NAME TEXT */
              <>
                {hasCustomImage ? (
                  <div 
                    className="flex items-center justify-center overflow-hidden rounded-xl border border-cyan-400/30 p-0.5 shrink-0 bg-[#061528] transition-all"
                    style={{ height: `${customHeight}px` }}
                  >
                    <img 
                      src={brandConfig.logoUrl} 
                      alt={brandConfig.brandName} 
                      style={{ height: `${customHeight}px` }}
                      className="w-auto max-w-[120px] object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-10 h-10 rounded-xl p-0.5 shadow-md flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-all shrink-0 bg-gradient-to-tr from-[#0A2240] to-blue-600"
                  >
                    <div className="w-full h-full bg-[#0A2240] rounded-[10px] flex items-center justify-center relative">
                      <Plane className="w-5 h-5 text-cyan-400 transform -rotate-45 transition-transform" />
                      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    </div>
                  </div>
                )}

                {/* Brand Name Text */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="font-extrabold tracking-wider text-base sm:text-lg bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent"
                      style={{ fontFamily: brandFontFamily }}
                    >
                      {brandConfig?.brandName || 'VALETWASH'}
                    </span>
                    <span 
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-black/40 text-cyan-300 border border-cyan-400/30"
                    >
                      {brandConfig?.badgeText || 'Aero'}
                    </span>
                  </div>
                  <span className="text-[10px] tracking-tight font-medium text-slate-300 opacity-90 flex items-center gap-1">
                    {brandConfig?.brandTagline || 'Aviation-Grade Auto Detailing'}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Location Pill */}
          <button
            onClick={() => { playTapSound(); onOpenLocationModal(); }}
            className="hidden xs:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all max-w-[130px] sm:max-w-[180px] truncate bg-black/30 hover:bg-black/50 text-slate-200 border border-white/10"
            title="Change Doorstep Detailing Location"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate font-semibold text-[11px] sm:text-xs text-white">
              {currentLocation.tag}: {currentLocation.label}
            </span>
            <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
          </button>

          {/* Top Right Action Tools */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            
            {/* DEVELOPER / ADMIN SETTINGS BUTTON */}
            <button
              onClick={() => { playTapSound(); onOpenDevSettings(); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md bg-cyan-400 text-[#0A2240] hover:bg-cyan-300 border border-cyan-200"
              title="Developer Settings"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Dev Config</span>
            </button>

            {/* View Mode Simulator Toggle */}
            <button
              onClick={() => { playTapSound(); onToggleMobileView(); }}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
              title={mobileView ? "Switch to Full Screen View" : "Preview in Mobile Frame"}
            >
              {mobileView ? <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> : <Monitor className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{mobileView ? 'Mobile' : 'Full'}</span>
            </button>

            {/* Audio Feedback Toggle */}
            <button
              onClick={() => { playTapSound(); onToggleSound(); }}
              className="p-1.5 rounded-lg text-xs transition-colors hover:bg-white/10 text-slate-300"
              title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => { playTapSound(); onOpenNotifs(); }}
              className="p-1.5 rounded-lg relative transition-colors hover:bg-white/10 text-slate-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse ring-2 ring-[#0A2240]"></span>
              )}
            </button>

            {/* User Avatar */}
            <button 
              onClick={() => { playTapSound(); onOpenOnboarding(); }}
              className="flex items-center gap-1.5 pl-0.5 focus:outline-none"
              title="Account & Vehicle Profile"
            >
              <div className="w-7 h-7 rounded-full p-0.5 shadow-sm bg-gradient-to-tr from-cyan-400 to-blue-500">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
