import React from 'react';
import { Home, Sparkles, Navigation, Car } from 'lucide-react';
import { playTapSound } from '../utils/audio';
import { THEME_PRESETS } from '../config/brandConfig';

const DEFAULT_THEME = THEME_PRESETS[0];

export default function BottomNav({ activeTab, onSelectTab, darkMode, hasActiveBooking, brandConfig }) {
  const theme = {
    ...DEFAULT_THEME,
    ...(brandConfig?.theme || {})
  };
  const navBg      = theme.bottomNavBg      || theme.bottomNavBackground || '#0A2240';
  const activeColor = theme.bottomNavActive  || theme.bottomNavActiveTab  || '#00E5FF';
  const tabs = [
    { id: 'home', label: 'Command', icon: Home },
    { id: 'services', label: 'Packages', icon: Sparkles },
    { id: 'tracking', label: 'Live GPS', icon: Navigation, hasBadge: hasActiveBooking },
    { id: 'garage', label: 'My Garage', icon: Car },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto transition-all border-t border-slate-800 shadow-2xl backdrop-blur-lg"
      style={{ backgroundColor: navBg }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playTapSound();
                onSelectTab(tab.id);
              }}
              className="relative flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl select-none"
              style={{
                color: isActive ? activeColor : "#94A3B8"
              }}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-100 opacity-80'
                }`} />
                
                {tab.hasBadge && (
                  <span className="absolute -top-1 -right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                  </span>
                )}
              </div>

              <span className={`text-[10px] mt-1 tracking-tight ${
                isActive ? 'font-bold' : 'font-medium opacity-85'
              }`}>
                {tab.label}
              </span>

              {/* Active Cyan Pill Indicator */}
              {isActive && (
                <span 
                  className="absolute -bottom-1 w-6 h-0.5 rounded-full"
                  style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }}
                ></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
