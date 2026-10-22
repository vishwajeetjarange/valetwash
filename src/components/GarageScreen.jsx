import React, { useState } from 'react';
import { 
  Car, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  SlidersHorizontal,
  ChevronRight, 
  Gauge, 
  Award,
  Download
} from 'lucide-react';
import { playTapSound } from '../utils/audio';

export default function GarageScreen({
  darkMode,
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onOpenAddVehicle,
  transformations,
  onViewInvoice
}) {
  const [activeReportIndex, setActiveReportIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 for before/after comparison

  const report = transformations[activeReportIndex] || transformations[0];

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      
      {/* Header & Add Vehicle CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg sm:text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            My Fleet Garage
          </h1>
          <p className="text-xs text-slate-400">
            Registered machines with custom flight specifications
          </p>
        </div>

        <button
          onClick={() => { playTapSound(); onOpenAddVehicle(); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-brand-navy hover:bg-brand-azure text-brand-cyan border border-brand-cyan/30 shadow-cyan-glow transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Machine</span>
        </button>
      </div>

      {/* 1. VEHICLE PROFILE CARDS */}
      <div className="space-y-3">
        {vehicles.map((veh) => {
          const isSelected = selectedVehicle?.id === veh.id;
          return (
            <div
              key={veh.id}
              className={`p-4 rounded-3xl border transition-all duration-200 ${
                isSelected
                  ? 'border-brand-cyan bg-gradient-to-r from-brand-navy/90 to-brand-slateCard shadow-cyan-glow'
                  : darkMode
                    ? 'border-brand-slateBorder bg-brand-slateCard hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                    <img src={veh.image} alt={veh.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white dark:text-white">
                        {veh.name}
                      </h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-brand-cyan font-mono border border-brand-cyan/20">
                        {veh.categoryName}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-brand-azureLight mt-0.5">
                      {veh.plate} • {veh.color}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>Last Detailed: {veh.lastDetailed}</span>
                      <span>• Odo: {veh.odometer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {isSelected ? (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-cyan/20 border border-brand-cyan text-brand-cyan text-xs font-bold shadow-cyan-glow">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selected Bay
                    </span>
                  ) : (
                    <button
                      onClick={() => { playTapSound(); onSelectVehicle(veh); }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                    >
                      Make Active
                    </button>
                  )}
                </div>
              </div>

              {/* Cleanliness Telemetry Meter */}
              <div className="mt-3 pt-3 border-t border-slate-700/20 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <Gauge className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Gloss Retention: <strong className="text-white">{veh.cleanScore}%</strong></span>
                </div>
                <div className="w-36 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-cyan h-full rounded-full shadow-cyan-glow" 
                    style={{ width: `${veh.cleanScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. PHOTO TRANSFORMATION REPORTS (INTERACTIVE BEFORE / AFTER SLIDER) */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-4 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <h3 className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Photo Transformation Report
            </h3>
          </div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider">
            {report.guImprovement}
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Drag the interactive slider horizontally to compare highway road grime vs aviation high-gloss finish.
        </p>

        {/* INTERACTIVE BEFORE / AFTER COMPARISON SLIDER */}
        <div 
          className="relative h-60 sm:h-72 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-brand-azure/30 shadow-valet-lg"
          onMouseMove={handleSliderMove}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
            setSliderPosition((x / rect.width) * 100);
          }}
        >
          {/* After Image (Background) */}
          <img 
            src={report.afterImage} 
            alt="After Aviation Gloss Detailing" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before Image (Clipped Overlay) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={report.beforeImage} 
              alt="Before Wash" 
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', height: '100%' }}
            />
            {/* Dark grime tint for visual drama */}
            <div className="absolute inset-0 bg-black/25"></div>
            
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/80 border border-white/20 text-[10px] font-bold text-red-300">
              BEFORE: Grime & Road Film ({report.glossScoreBefore} GU)
            </div>
          </div>

          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/80 border border-brand-cyan/40 text-[10px] font-bold text-brand-cyan shadow-cyan-glow">
            AFTER: 9H Mirror Shield ({report.glossScoreAfter} GU)
          </div>

          {/* Divider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-brand-cyan shadow-cyan-glow"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-navy border-2 border-brand-cyan shadow-cyan-glow flex items-center justify-center text-brand-cyan">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Inspection Checklist Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {report.metrics.map((m, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/40 text-center">
              <div className="text-[10px] text-slate-400">{m.label}</div>
              <div className="text-xs font-bold text-brand-cyan font-mono mt-0.5">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-2xl bg-brand-navy/40 border border-brand-azure/30 text-[11px] text-slate-300">
          <strong className="text-brand-cyan">Detailer Notes: </strong>
          {report.notes}
        </div>
      </div>

      {/* 3. SERVICE HISTORY LOG & PAST INVOICES */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-cyan" />
            <h3 className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Service History & Tax Invoices
            </h3>
          </div>
        </div>

        <div className="space-y-2">
          {transformations.map((hist) => (
            <div
              key={hist.id}
              className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-700/50 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white">{hist.serviceName}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {hist.date} • Detailer: {hist.detailerName}
                </div>
              </div>

              <button
                onClick={() => { playTapSound(); onViewInvoice(hist); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-navy hover:bg-brand-azure text-brand-cyan border border-brand-cyan/20 transition-all"
              >
                <Download className="w-3 h-3" />
                <span>Invoice PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
