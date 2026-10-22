import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Plus, 
  Navigation, 
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { playTapSound } from '../utils/audio';

export default function BookingSlotScreen({
  darkMode,
  selectedPackage,
  selectedVehicle,
  selectedAddons,
  savedAddresses,
  selectedAddress,
  onSelectAddress,
  onProceedToCheckout,
  onBack
}) {
  // Generate next 7 days for horizontal chips
  const today = new Date(2026, 9, 20); // Local time reference Oct 20, 2026
  const dateOptions = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date(today);
    d.setDate(today.getDate() + idx);
    const dayName = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return {
      id: d.toISOString().split('T')[0],
      dayName,
      formatted,
      isToday: idx === 0
    };
  });

  const [selectedDate, setSelectedDate] = useState(dateOptions[0].id);
  const [selectedSlot, setSelectedSlot] = useState('m1'); // 07:30 AM - 09:00 AM
  const [instructions, setInstructions] = useState('Park near Pillar B3. Autonomous power rig preferred.');
  const [mapPinPos, setMapPinPos] = useState({ x: 50, y: 50 }); // simulated draggable pin coordinates
  const [isDraggingPin, setIsDraggingPin] = useState(false);

  const slotGroups = [
    {
      group: 'Morning Flight Slots (07:30 - 01:00)',
      slots: [
        { id: 'm1', time: '07:30 AM - 09:00 AM', tag: 'Fastest ETA', available: true },
        { id: 'm2', time: '09:30 AM - 11:00 AM', tag: 'High Demand', available: true },
        { id: 'm3', time: '11:30 AM - 01:00 PM', tag: 'Available', available: true },
      ]
    },
    {
      group: 'Afternoon Detailing Slots (01:30 - 05:00)',
      slots: [
        { id: 'a1', time: '01:30 PM - 03:00 PM', tag: 'Available', available: true },
        { id: 'a2', time: '03:30 PM - 05:00 PM', tag: 'Filling Fast', available: true },
      ]
    },
    {
      group: 'Sunset Gloss Slots (05:30 - 09:00)',
      slots: [
        { id: 'e1', time: '05:30 PM - 07:00 PM', tag: 'Prime Slot', available: true },
        { id: 'e2', time: '07:30 PM - 09:00 PM', tag: 'Last Slot', available: false },
      ]
    }
  ];

  const quickInstructionChips = [
    'Park near Pillar B3',
    'Power outlet available nearby',
    'Water tap in driveway',
    'Key with Security Guard',
    'Call before entering gate'
  ];

  const handleChipClick = (chipText) => {
    playTapSound();
    if (!instructions.includes(chipText)) {
      setInstructions(prev => prev ? `${prev}, ${chipText}` : chipText);
    }
  };

  const handleMapClick = (e) => {
    playTapSound();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(15, Math.min(85, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
    setMapPinPos({ x, y });
  };

  const handleProceed = () => {
    playTapSound();
    onProceedToCheckout({
      date: selectedDate,
      slot: selectedSlot,
      instructions,
      pinCoordinates: mapPinPos
    });
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { playTapSound(); onBack(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            darkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-azureLight">
          Step 2 of 3: Slot & Doorstep Pin
        </span>
      </div>

      {/* Package & Machine Summary Banner */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-blue-50/60 border-blue-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-brand-azure/30">
            <img src={selectedPackage?.image} alt={selectedPackage?.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-bold text-white dark:text-white">
              {selectedPackage?.title}
            </div>
            <div className="text-[11px] text-brand-azureLight font-medium">
              Machine: {selectedVehicle?.name} ({selectedVehicle?.plate})
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-brand-cyan">
            {selectedPackage?.duration}
          </span>
          <div className="text-[10px] text-slate-400">Doorstep Bay</div>
        </div>
      </div>

      {/* 1. INTERACTIVE DATE & TIME MATRIX */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-4 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-cyan" />
            <h3 className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Select Doorstep Flight Date
            </h3>
          </div>
          <span className="text-[10px] text-brand-azureLight font-bold uppercase tracking-wider">
            7-Day Scheduling
          </span>
        </div>

        {/* Horizontal Date Chips */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {dateOptions.map((d) => {
            const isSelected = selectedDate === d.id;
            return (
              <button
                key={d.id}
                onClick={() => { playTapSound(); setSelectedDate(d.id); }}
                className={`flex-shrink-0 w-20 py-2.5 px-2 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'border-brand-cyan bg-brand-navy text-white shadow-cyan-glow'
                    : darkMode
                      ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-tight ${isSelected ? 'text-brand-cyan' : ''}`}>
                  {d.dayName}
                </div>
                <div className="text-xs font-black tracking-tight mt-0.5 font-mono">
                  {d.formatted}
                </div>
              </button>
            );
          })}
        </div>

        {/* Time Slot Grid */}
        <div className="space-y-3 pt-2">
          {slotGroups.map((group, gidx) => (
            <div key={gidx} className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.group}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {group.slots.map((s) => {
                  const isSelected = selectedSlot === s.id;
                  return (
                    <button
                      key={s.id}
                      disabled={!s.available}
                      onClick={() => { playTapSound(); setSelectedSlot(s.id); }}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        !s.available 
                          ? 'opacity-40 cursor-not-allowed border-dashed border-slate-700 bg-slate-900/30'
                          : isSelected
                            ? 'border-brand-cyan bg-brand-navy text-white shadow-cyan-glow'
                            : darkMode
                              ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold font-mono">{s.time}</div>
                        <div className={`text-[9px] font-semibold ${
                          isSelected ? 'text-brand-cyan' : 'text-slate-400'
                        }`}>
                          {s.tag}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DOORSTEP ADDRESS & MAP PIN SELECTOR */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-4 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-cyan" />
            <h3 className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Doorstep Address & Bay Pin
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">Click map to fine-tune pin</span>
        </div>

        {/* Interactive Custom Map UI with Dark Navy Styling */}
        <div 
          onClick={handleMapClick}
          className="relative h-44 rounded-2xl overflow-hidden cursor-crosshair border border-brand-azure/40 shadow-inner group"
          title="Click to reposition technician bay pin"
        >
          {/* Custom Dark Navy Map Canvas Artwork */}
          <div className="absolute inset-0 bg-[#0A1628]">
            {/* Grid Lines simulating city streets */}
            <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B6CA8" strokeWidth="0.8" />
                  <path d="M 0 20 L 40 20 M 20 0 L 20 40" fill="none" stroke="#00E5FF" strokeWidth="0.3" strokeDasharray="2,2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Simulated Road Arteries */}
              <path d="M -20 80 Q 150 120 300 60 T 600 140" fill="none" stroke="#1B6CA8" strokeWidth="6" opacity="0.6" />
              <path d="M 80 -10 Q 120 100 200 200" fill="none" stroke="#00E5FF" strokeWidth="3" opacity="0.4" />
            </svg>
          </div>

          {/* Draggable / Positioned Location Pin */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none"
            style={{ left: `${mapPinPos.x}%`, top: `${mapPinPos.y}%` }}
          >
            {/* Radar Pulse Effect */}
            <div className="absolute -bottom-1 -left-4 w-8 h-8 rounded-full bg-brand-cyan/30 animate-ping"></div>
            <div className="relative flex flex-col items-center">
              <div className="px-2 py-0.5 rounded-md bg-brand-navy border border-brand-cyan text-[9px] font-bold text-white shadow-cyan-glow whitespace-nowrap mb-0.5">
                Precision Bay Pin
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-navy to-brand-azure border-2 border-brand-cyan shadow-cyan-glow flex items-center justify-center">
                <MapPin className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-cyan-glow"></div>
            </div>
          </div>

          {/* Map Overlay Badge */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>GPS Satellite Lock: ±0.5m Precision</span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/60 text-[9px] text-brand-azureLight font-mono">
            Lat: 19.0600° N • Lng: 72.8280° E
          </div>
        </div>

        {/* Address Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {savedAddresses.map((addr) => {
            const isSelected = selectedAddress?.id === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => { playTapSound(); onSelectAddress(addr); }}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-cyan bg-brand-navy/80 text-white shadow-cyan-glow'
                    : darkMode
                      ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{addr.label}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />}
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                  {addr.address}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SPECIAL INSTRUCTIONS BOX */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-cyan" />
          <h3 className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Special Bay Access Instructions
          </h3>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5">
          {quickInstructionChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-colors ${
                darkMode ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-brand-azure' : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-brand-azure'
              }`}
            >
              + {chip}
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g. Park near Pillar B3, power socket available on wall, security clearance already provided."
          className={`w-full p-3 rounded-2xl text-xs font-medium border focus:outline-none transition-all ${
            darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-brand-cyan' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-brand-azure'
          }`}
        />
      </div>

      {/* Floating Proceed Bar */}
      <div className="pt-2">
        <button
          onClick={handleProceed}
          className="w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-azure to-brand-cyan text-brand-navy shadow-cyan-glow hover:shadow-cyan-glow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Confirm Bay & Proceed to Cashless Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
