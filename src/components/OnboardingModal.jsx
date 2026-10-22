import React, { useState } from 'react';
import { 
  Plane, 
  ShieldCheck, 
  Navigation, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Car, 
  Sparkles, 
  X,
  Layers,
  KeyRound
} from 'lucide-react';
import { playTapSound, playSuccessSound } from '../utils/audio';

export default function OnboardingModal({ 
  isOpen, 
  onClose, 
  onCompleteAuth, 
  darkMode,
  categories,
  onAddVehicle
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [step, setStep] = useState('tutorial'); // 'tutorial' | 'phone' | 'otp' | 'vehicle'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [vehicleCategory, setVehicleCategory] = useState('sedan');
  const [plateNumber, setPlateNumber] = useState('');
  const [modelName, setModelName] = useState('');

  if (!isOpen) return null;

  const slides = [
    {
      title: "Aviation-Grade Care at Your Doorstep",
      subtitle: "Aerospace Surface Technology",
      description: "We deploy pressurized, mobile-deionized water rigs directly to your driveway. Zero hose dragging, zero water waste, uncompromising flight-grade gloss.",
      icon: Plane,
      badge: "Pure De-Ionized H2O",
      img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Precision Foam & Paint-Safe Technology",
      subtitle: "Zero-Swirl Guarantee",
      description: "Our pH-neutral hyper-dense snow foam encapsulates abrasive grime before a single microfiber touches your vehicle. Guaranteed 100% swirl-free clear coat preservation.",
      icon: ShieldCheck,
      badge: "600-GSM Edgeless Microfiber",
      img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Live Technician Arrival Tracking",
      subtitle: "Hoora-Style Precision Dispatch",
      description: "Watch your assigned master detailer navigate in real-time. Full transparency with verified certifications, direct encrypted calling, and live status telematics.",
      icon: Navigation,
      badge: "Real-Time Telematics",
      img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleNextSlide = () => {
    playTapSound();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setStep('phone');
    }
  };

  const handleSendOtp = (e) => {
    e?.preventDefault();
    playTapSound();
    if (!phoneNumber) {
      setPhoneNumber('98200 98200');
    }
    setStep('otp');
    setOtp(['4', '8', '2', '0']); // auto-suggested demo code
  };

  const handleVerifyOtp = () => {
    playSuccessSound();
    setStep('vehicle');
  };

  const handleSaveVehicleAndFinish = (e) => {
    e?.preventDefault();
    playSuccessSound();
    
    const cat = categories.find(c => c.id === vehicleCategory) || categories[1];
    const newVehicle = {
      id: `veh-${Date.now()}`,
      name: modelName.trim() || `${cat.name} Machine`,
      category: vehicleCategory,
      categoryName: cat.name,
      plate: plateNumber.trim().toUpperCase() || 'MH 12 VW 2026',
      color: 'Daytona Gray',
      colorHex: '#4A5568',
      year: 2024,
      lastDetailed: 'Just Added',
      odometer: '12,500 km',
      isDefault: true,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
      cleanScore: 70
    };

    onAddVehicle(newVehicle);
    onCompleteAuth();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl transition-all border ${
        darkMode ? 'bg-brand-slateCard border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-700/20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-azureLight">
              {step === 'tutorial' ? 'Aviation Briefing' : step === 'phone' ? 'One-Tap Login' : step === 'otp' ? 'Secure Verify' : 'Vehicle Registry'}
            </span>
          </div>
          <button 
            onClick={() => { playTapSound(); onClose(); }}
            className="p-1 rounded-full hover:bg-slate-700/30 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: TUTORIAL SLIDES */}
        {step === 'tutorial' && (
          <div className="p-6">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-5 border border-brand-azure/30">
              <img 
                src={slides[currentSlide].img} 
                alt="Tutorial Visual" 
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent flex flex-col justify-end p-4">
                <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 backdrop-blur-sm">
                  {React.createElement(slides[currentSlide].icon, { className: "w-3 h-3 text-brand-cyan" })}
                  {slides[currentSlide].badge}
                </span>
                <span className="text-[11px] font-semibold text-brand-azureLight uppercase tracking-wider mt-1">
                  {slides[currentSlide].subtitle}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold tracking-tight text-white dark:text-white mb-2 leading-tight">
              {slides[currentSlide].title}
            </h3>

            <p className={`text-xs leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {slides[currentSlide].description}
            </p>

            {/* Pagination Dots */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playTapSound(); setCurrentSlide(idx); }}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === idx ? 'w-6 bg-brand-cyan' : 'w-2 bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {currentSlide < slides.length - 1 ? (
                  <button
                    onClick={handleNextSlide}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-navy hover:bg-brand-azure text-brand-cyan border border-brand-cyan/30 shadow-cyan-glow transition-all"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => { playTapSound(); setStep('phone'); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-azure to-brand-cyan text-brand-navy shadow-cyan-glow hover:opacity-95 transition-all"
                  >
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PHONE / SOCIAL AUTH */}
        {step === 'phone' && (
          <div className="p-6">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center mx-auto mb-3 border border-brand-cyan/30 shadow-cyan-glow">
                <Phone className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="text-base font-bold">Fast Doorstep Access</h3>
              <p className="text-xs text-slate-400 mt-1">Sign in with your phone or biometric social identity</p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mobile Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    placeholder="98200 98200"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full pl-16 pr-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide border focus:outline-none transition-colors ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-brand-cyan' : 'bg-slate-50 border-slate-300 focus:border-brand-azure'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-navy via-brand-azure to-brand-cyan text-white shadow-cyan-glow hover:shadow-cyan-glow-lg transition-all flex items-center justify-center gap-2"
              >
                Request OTP Code <ArrowRight className="w-4 h-4 text-brand-cyan" />
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700/50"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider"><span className={`px-2 ${darkMode ? 'bg-brand-slateCard text-slate-400' : 'bg-white text-slate-500'}`}>or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button 
                onClick={() => { playTapSound(); setStep('vehicle'); }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-700 hover:border-slate-500' : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                Google
              </button>

              <button 
                onClick={() => { playTapSound(); setStep('vehicle'); }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-700 hover:border-slate-500' : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.63 1.35-.57.65-1.07 1.72-.94 2.73 1 .08 2.02-.48 2.64-1.23z"/></svg>
                Apple ID
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OTP VERIFICATION */}
        {step === 'otp' && (
          <div className="p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center mx-auto mb-3 border border-brand-cyan/30 shadow-cyan-glow">
              <KeyRound className="w-6 h-6 text-brand-cyan" />
            </div>
            <h3 className="text-base font-bold">Enter Verification Code</h3>
            <p className="text-xs text-slate-400 mt-1">
              Code sent to <span className="text-brand-cyan font-semibold">+91 {phoneNumber || '98200 98200'}</span>
            </p>

            <div className="flex justify-center gap-3 my-5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  readOnly
                  className={`w-12 h-12 text-center text-lg font-bold rounded-xl border ${
                    darkMode ? 'bg-slate-900 border-brand-cyan text-brand-cyan' : 'bg-slate-50 border-brand-azure text-brand-navy'
                  } shadow-cyan-glow`}
                />
              ))}
            </div>

            <p className="text-[11px] text-brand-azureLight mb-5">Auto-filled simulated test OTP: 4820</p>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-azure to-brand-cyan text-brand-navy shadow-cyan-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              Verify & Add Vehicle <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 4: QUICK VEHICLE ONBOARDING SHEET */}
        {step === 'vehicle' && (
          <div className="p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center border border-brand-cyan/30">
                <Car className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Register Your First Vehicle</h3>
                <p className="text-[11px] text-slate-400">Determines custom foam volume & precision pricing</p>
              </div>
            </div>

            <form onSubmit={handleSaveVehicleAndFinish} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Vehicle Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => { playTapSound(); setVehicleCategory(cat.id); }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        vehicleCategory === cat.id 
                          ? 'border-brand-cyan bg-brand-navy text-white shadow-cyan-glow' 
                          : darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{cat.name}</div>
                      <div className="text-[10px] text-brand-cyan font-mono mt-0.5">{cat.badge}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Make & Model</label>
                <input
                  type="text"
                  placeholder="e.g. BMW M340i / Tata Safari / Vespa"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-brand-cyan' : 'bg-slate-50 border-slate-300 focus:border-brand-azure'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Registration / License Plate</label>
                <input
                  type="text"
                  placeholder="MH 12 AB 9988"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-brand-cyan focus:border-brand-cyan' : 'bg-slate-50 border-slate-300 text-brand-navy focus:border-brand-azure'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-azure to-brand-cyan text-brand-navy shadow-cyan-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                Complete Onboarding & Enter Command Bay <Sparkles className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
