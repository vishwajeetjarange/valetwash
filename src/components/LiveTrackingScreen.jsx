import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Compass, 
  Layers, 
  Maximize2, 
  CheckCircle2, 
  Radio, 
  Truck, 
  Sparkles,
  Share2,
  RefreshCw
} from 'lucide-react';
import { playTapSound, playRadarPing } from '../utils/audio';

export default function LiveTrackingScreen({
  darkMode,
  activeBooking,
  detailer,
  onOpenCallModal,
  onOpenChatModal,
  onOpenTransformation
}) {
  // Stepper state: 0 = Assigned, 1 = En Route, 2 = Arrived, 3 = Wash in Progress, 4 = Completed
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // Default "En Route"
  const [vanPosition, setVanPosition] = useState({ x: 32, y: 68 });
  const [isSimulating, setIsSimulating] = useState(true);
  const [washProgress, setWashProgress] = useState(58);

  const steps = [
    { title: 'Assigned', desc: 'Master Rig & Crew Dispatched', time: '10:02 AM' },
    { title: 'En Route', desc: 'Navigating Traffic via GPS', time: '10:14 AM' },
    { title: 'Arrived', desc: 'Positioned at Driveway Bay', time: '10:25 AM' },
    { title: 'Wash in Progress', desc: 'De-ionized Foam & De-grit', time: 'Active' },
    { title: 'Completed', desc: 'Inspection Report Ready', time: 'Pending' },
  ];

  // Animated moving van on custom map canvas
  useEffect(() => {
    if (!isSimulating || currentStepIndex !== 1) return;

    const interval = setInterval(() => {
      setVanPosition(prev => {
        // Move towards target pin (72, 34)
        const targetX = 68;
        const targetY = 38;
        const dx = (targetX - prev.x) * 0.05;
        const dy = (targetY - prev.y) * 0.05;

        // Ping audio micro-haptic
        if (Math.random() > 0.7) {
          playRadarPing();
        }

        if (Math.abs(targetX - prev.x) < 2 && Math.abs(targetY - prev.y) < 2) {
          return { x: 30, y: 70 }; // Loop simulation
        }
        return { x: prev.x + dx, y: prev.y + dy };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulating, currentStepIndex]);

  const handleManualStepChange = (index) => {
    playTapSound();
    setCurrentStepIndex(index);
  };

  return (
    <div className="space-y-4 pb-28 animate-fadeIn">
      
      {/* Top Telematics Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-ping"></div>
          <h2 className={`text-base font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Live Flight Telematics
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Simulation Stepper Toggle to preview any state */}
          <span className="text-[10px] text-slate-400 font-medium">Test State:</span>
          <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            {steps.map((st, i) => (
              <button
                key={i}
                onClick={() => handleManualStepChange(i)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                  currentStepIndex === i ? 'bg-brand-cyan text-brand-navy shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title={st.title}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. TOP HALF: CUSTOM MAP UI (HOORA-STYLE PRECISION) */}
      <div className="relative h-72 sm:h-80 rounded-3xl overflow-hidden border border-brand-azure/40 shadow-valet-lg">
        {/* Custom Dark Navy Canvas Artwork */}
        <div className="absolute inset-0 bg-[#071322]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="city-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0E2849" strokeWidth="1" />
                <path d="M 0 24 L 48 24 M 24 0 L 24 48" fill="none" stroke="#1B6CA8" strokeWidth="0.4" strokeDasharray="3,3" />
              </pattern>
              
              <linearGradient id="route-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1B6CA8" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* City Blocks Base */}
            <rect width="100%" height="100%" fill="url(#city-grid)" />

            {/* Simulated Geographic Landforms & Coastline contour */}
            <path d="M 0 180 Q 120 140 220 220 T 500 190" fill="none" stroke="#0A2240" strokeWidth="32" opacity="0.4" />
            <path d="M -50 40 Q 200 80 400 30" fill="none" stroke="#0A2240" strokeWidth="24" opacity="0.3" />

            {/* Main Road Highway Veins */}
            <path d="M -20 220 C 100 240, 200 160, 320 120 S 460 60, 600 40" fill="none" stroke="#123258" strokeWidth="14" strokeLinecap="round" />
            
            {/* The Active Animated Route Trail in Glowing Cyan */}
            <path 
              d="M 120 240 Q 180 180 220 140 T 360 90" 
              fill="none" 
              stroke="#00E5FF" 
              strokeWidth="4" 
              strokeDasharray="6,6"
              className="animate-shimmer"
            />
          </svg>
        </div>

        {/* Pulsing Radar Wave Rings Centered around Destination */}
        <div className="absolute top-[34%] left-[68%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-24 h-24 rounded-full border border-brand-cyan/40 animate-radar-pulse"></div>
          <div className="w-40 h-40 rounded-full border border-brand-azure/30 animate-radar-pulse" style={{ animationDelay: '0.8s' }}></div>
        </div>

        {/* DESTINATION PIN (Client's Doorstep Driveway) */}
        <div className="absolute top-[34%] left-[68%] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none z-10">
          <div className="px-2 py-0.5 rounded-md bg-brand-navy border border-brand-cyan text-[9px] font-bold text-brand-cyan shadow-cyan-glow whitespace-nowrap mb-0.5">
            Driveway Bay (Pali Hill)
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-navy to-brand-azure border-2 border-brand-cyan shadow-cyan-glow flex items-center justify-center">
            <MapPin className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div>
        </div>

        {/* MOVING SERVICE VEHICLE (Aero-Rig Mobile Van) */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 pointer-events-none z-20"
          style={{ left: `${vanPosition.x}%`, top: `${vanPosition.y}%` }}
        >
          <div className="relative flex flex-col items-center">
            {/* Van Tag */}
            <div className="px-2 py-0.5 rounded bg-black/80 border border-brand-cyan text-[8px] font-mono font-bold text-white shadow-cyan-glow mb-1">
              Aero-Rig #08 (Moving)
            </div>
            
            {/* Vehicle Icon Disc */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0A2240] to-brand-azure border-2 border-brand-cyan shadow-cyan-glow flex items-center justify-center transform rotate-12">
              <Truck className="w-5 h-5 text-brand-cyan" />
            </div>

            {/* Ripple Underneath */}
            <div className="w-6 h-2 rounded-full bg-brand-cyan/50 blur-[2px] mt-1 animate-pulse"></div>
          </div>
        </div>

        {/* Top Floating ETA Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 p-2.5 rounded-2xl bg-[#061324]/90 backdrop-blur-md border border-brand-cyan/40 shadow-cyan-glow">
          <div className="w-8 h-8 rounded-xl bg-brand-navy flex items-center justify-center border border-brand-cyan/30">
            <Radio className="w-4 h-4 text-brand-cyan animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Real-Time Arrival ETA
            </div>
            <div className="text-sm font-black text-white font-mono flex items-center gap-1.5">
              <span>{currentStepIndex === 0 ? '18 mins' : currentStepIndex === 1 ? '11 mins (1.4 km)' : currentStepIndex === 2 ? 'At Location' : currentStepIndex === 3 ? 'Washing' : 'Ready'}</span>
              <span className="text-[10px] text-brand-cyan font-bold">• Optimal Traffic</span>
            </div>
          </div>
        </div>

        {/* Map Interactive Control Pills */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button 
            onClick={() => { playTapSound(); setVanPosition({ x: 32, y: 68 }); }}
            className="p-2 rounded-xl bg-black/70 hover:bg-black text-brand-cyan border border-white/10 backdrop-blur-md transition-all"
            title="Recenter on Detailer Rig"
          >
            <Compass className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-xl bg-black/70 hover:bg-black text-slate-300 border border-white/10 backdrop-blur-md transition-all"
            title="Satellite / Topography Layer"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Live Weather / Environmental Reading Banner */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-slate-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Outdoor Ambient: 27°C • Zero Rain Threat • Ideal Ceramic Bond</span>
          </span>
          <span className="font-mono text-brand-cyan font-bold">GPS: 4G LTE</span>
        </div>
      </div>

      {/* 2. BOTTOM FLOATING CARD: ASSIGNED DETAILER PROFILE & STATUS STEPPER */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-4 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder shadow-valet-dark' : 'bg-white border-slate-200 shadow-valet'
      }`}>
        
        {/* Detailer Header & Direct Actions */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={detailer.avatar}
                alt={detailer.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-cyan shadow-cyan-glow"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {detailer.name}
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-brand-navy text-brand-cyan border border-brand-cyan/20">
                  {detailer.role.split(' ')[0]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="flex items-center text-yellow-400 font-bold">
                  <Star className="w-3 h-3 fill-yellow-400 mr-0.5" /> {detailer.rating}
                </span>
                <span>• {detailer.reviewsCount}+ washes</span>
                <span>• {detailer.yearsExp}</span>
              </div>
            </div>
          </div>

          {/* One-Tap Action Buttons: Call & In-App Message */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { playTapSound(); onOpenCallModal(); }}
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center justify-center"
              title="Call Detailer"
            >
              <Phone className="w-4 h-4" />
            </button>

            <button
              onClick={() => { playTapSound(); onOpenChatModal(); }}
              className="p-2.5 rounded-xl bg-brand-azure/20 hover:bg-brand-azure/30 text-brand-cyan border border-brand-cyan/30 transition-all flex items-center justify-center"
              title="In-App Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Rig Details */}
        <div className="p-3 rounded-2xl bg-brand-navy/40 border border-brand-cyan/20 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-cyan shrink-0" />
            <div>
              <div className="font-bold text-white">{detailer.vanModel}</div>
              <div className="text-[10px] text-slate-400 font-mono">{detailer.vanPlate} • De-mineralized H2O Rig</div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-brand-cyan px-2 py-0.5 rounded-md bg-brand-navy border border-brand-cyan/30">
            Autonomous
          </span>
        </div>

        {/* STATUS STEPPER: [Assigned] ➔ [En Route] ➔ [Arrived] ➔ [Wash in Progress] ➔ [Completed] */}
        <div className="space-y-3 pt-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-azureLight">
            Doorstep Execution Telematics
          </div>

          <div className="relative">
            {/* Stepper Horizontal Nodes */}
            <div className="flex items-center justify-between relative z-10">
              {steps.map((st, sidx) => {
                const isPassed = sidx < currentStepIndex;
                const isCurrent = sidx === currentStepIndex;

                return (
                  <div 
                    key={sidx} 
                    onClick={() => handleManualStepChange(sidx)}
                    className="flex flex-col items-center flex-1 cursor-pointer group"
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-brand-cyan text-brand-navy shadow-cyan-glow scale-110 ring-4 ring-brand-cyan/20'
                        : isPassed
                          ? 'bg-brand-azure text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : sidx + 1}
                    </div>

                    <span className={`text-[9px] font-bold mt-1.5 text-center leading-tight transition-colors ${
                      isCurrent ? 'text-brand-cyan' : isPassed ? 'text-white' : 'text-slate-500'
                    }`}>
                      {st.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Connecting Track Line */}
            <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-slate-800 -z-0">
              <div 
                className="h-full bg-gradient-to-r from-brand-azure to-brand-cyan transition-all duration-500"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step Description Card */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">
                {steps[currentStepIndex].title}: {steps[currentStepIndex].desc}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Live Status Telemetry: 100% Paint-Safe protocols active
              </div>
            </div>

            {currentStepIndex === 3 && (
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-brand-cyan">{washProgress}%</span>
                <div className="text-[9px] text-slate-400">Foam Soak</div>
              </div>
            )}

            {currentStepIndex === 4 && (
              <button
                onClick={() => { playTapSound(); onOpenTransformation(); }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-cyan text-brand-navy shadow-cyan-glow hover:opacity-90"
              >
                View Report
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
