import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Check, 
  Plus, 
  Bell, 
  Phone, 
  PhoneOff, 
  Mic, 
  Volume2, 
  Send, 
  FileText, 
  Printer, 
  Download, 
  Sparkles, 
  Car, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { playTapSound, playSuccessSound } from '../utils/audio';

// 1. LOCATION MODAL
export function LocationModal({ isOpen, onClose, addresses, selectedAddress, onSelectAddress, darkMode }) {
  const [customAddress, setCustomAddress] = useState('');
  const [customTag, setCustomTag] = useState('Driveway');

  if (!isOpen) return null;

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customAddress.trim()) return;
    playSuccessSound();
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: `${customTag} Bay`,
      tag: customTag,
      address: customAddress.trim(),
      landmark: 'Added via GPS selector',
      isDefault: false
    };
    onSelectAddress(newAddr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-md rounded-3xl p-5 border shadow-2xl ${
        darkMode ? 'bg-brand-slateCard border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-sm font-bold">Select Doorstep Detailing Location</h3>
          </div>
          <button onClick={() => { playTapSound(); onClose(); }} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 my-4">
          {addresses.map((addr) => {
            const isSelected = selectedAddress?.id === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => { playTapSound(); onSelectAddress(addr); onClose(); }}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected ? 'border-brand-cyan bg-brand-navy text-white shadow-cyan-glow' : 'border-slate-800 bg-slate-900/60 text-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    {addr.label}
                    {addr.isDefault && (
                      <span className="text-[9px] px-1 rounded bg-brand-cyan/20 text-brand-cyan">Default</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{addr.address}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-cyan" />}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleAddCustom} className="pt-2 border-t border-slate-700/20 space-y-2">
          <label className="text-[11px] font-semibold text-slate-400 block">Or Enter New Doorstep Address</label>
          <input
            type="text"
            placeholder="Flat 102, Ocean Vista, Bandra West..."
            value={customAddress}
            onChange={(e) => setCustomAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-navy hover:bg-brand-azure text-brand-cyan border border-brand-cyan/30 shadow-sm"
          >
            Save & Detailing at this Location
          </button>
        </form>
      </div>
    </div>
  );
}

// 2. NOTIFICATIONS DRAWER
export function NotificationsDrawer({ isOpen, onClose, notifications, darkMode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-sm h-full p-5 border-l flex flex-col justify-between shadow-2xl overflow-y-auto ${
        darkMode ? 'bg-brand-slateCard border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/20 mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-cyan" />
              <h3 className="text-sm font-bold">Flight Telematics Alerts</h3>
            </div>
            <button onClick={() => { playTapSound(); onClose(); }} className="p-1 rounded-full text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div 
                key={n.id}
                className={`p-3 rounded-2xl border transition-all ${
                  n.unread 
                    ? 'border-brand-cyan/40 bg-brand-navy/60 shadow-cyan-glow' 
                    : 'border-slate-800 bg-slate-900/40 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{n.title}</span>
                  <span className="text-[9px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => { playTapSound(); onClose(); }}
          className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 mt-4"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
}

// 3. CALL MODAL (SIMULATED IN-APP DIALER)
export function CallModal({ isOpen, onClose, detailer, darkMode }) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      return;
    }
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-b from-[#0A2240] to-[#061324] border border-brand-cyan/40 shadow-2xl text-white text-center">
        
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-brand-cyan shadow-cyan-glow mb-4 relative">
          <img src={detailer.avatar} alt={detailer.name} className="w-full h-full object-cover" />
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0A2240]"></span>
        </div>

        <h3 className="text-base font-bold">{detailer.name}</h3>
        <p className="text-xs text-brand-azureLight font-mono mt-0.5">{detailer.role}</p>
        <div className="text-sm font-mono text-brand-cyan font-bold mt-2">
          {callDuration < 2 ? 'Connecting Encrypted Call...' : `In Call • ${formatTime(callDuration)}`}
        </div>

        <div className="p-3 rounded-2xl bg-black/40 border border-white/10 my-5 text-[11px] text-slate-300">
          "Hello, this is Vikram from ValetWash Aero-Rig #08. I am 3 minutes away from your driveway!"
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button 
            onClick={() => { playTapSound(); setIsMuted(!isMuted); }}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
              isMuted ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>

          <button 
            onClick={() => { playTapSound(); setIsSpeaker(!isSpeaker); }}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
              isSpeaker ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan' : 'bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => { playTapSound(); onClose(); }}
          className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <PhoneOff className="w-4 h-4" /> End Call
        </button>
      </div>
    </div>
  );
}

// 4. CHAT MODAL (IN-APP TWO-WAY MESSAGING)
export function ChatModal({ isOpen, onClose, detailer, darkMode }) {
  const [messages, setMessages] = useState([
    { sender: 'detailer', text: 'Good morning! Aero-Rig #08 is on the way to your driveway. ETA 11 mins.', time: '10:04 AM' },
    { sender: 'detailer', text: 'All filtered water tanks and Rupes dual-action polishers are primed.', time: '10:05 AM' }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickReplies = [
    'Park near Pillar B3',
    'Gate clearance given',
    'Take extra care of alloys',
    'Key with security'
  ];

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;
    playTapSound();
    
    const newMsg = {
      sender: 'user',
      text,
      time: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulated detailer reply after 1s
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'detailer', text: 'Acknowledged! Setting up pressure gun and 600-GSM towels.', time: 'Just now' }
      ]);
      playSuccessSound();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-md h-[520px] rounded-3xl border shadow-2xl flex flex-col justify-between overflow-hidden ${
        darkMode ? 'bg-brand-slateCard border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-700/20 flex items-center justify-between bg-brand-navy text-white">
          <div className="flex items-center gap-3">
            <img src={detailer.avatar} alt={detailer.name} className="w-9 h-9 rounded-xl object-cover border border-brand-cyan" />
            <div>
              <div className="text-xs font-bold">{detailer.name}</div>
              <div className="text-[10px] text-brand-cyan font-mono">Senior Master Detailer • Active</div>
            </div>
          </div>
          <button onClick={() => { playTapSound(); onClose(); }} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-r from-brand-azure to-brand-cyan text-brand-navy font-semibold rounded-br-none shadow-cyan-glow' 
                  : 'bg-slate-800 text-white border border-slate-700 rounded-bl-none'
              }`}>
                <div>{m.text}</div>
                <div className="text-[9px] opacity-70 mt-1 text-right">{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-1.5 border-t border-slate-700/20 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickReplies.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qr)}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-brand-cyan border border-brand-cyan/20 whitespace-nowrap"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-700/20 flex gap-2">
          <input
            type="text"
            placeholder="Type message to detailer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-3.5 py-2 rounded-xl bg-brand-navy hover:bg-brand-azure text-brand-cyan border border-brand-cyan/30 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 5. INVOICE MODAL (PDF / PRINT VIEW)
export function InvoiceModal({ isOpen, onClose, invoice, darkMode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
        darkMode ? 'bg-brand-slateCard border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
          <div>
            <div className="text-sm font-extrabold text-brand-cyan">VALETWASH TAX INVOICE</div>
            <div className="text-[10px] text-slate-400 font-mono">INV-2026-VW-09844</div>
          </div>
          <button onClick={() => { playTapSound(); onClose(); }} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Date & Time:</span>
            <span className="font-mono font-bold">{invoice.date || '14 Oct 2026, 11:30 AM'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Vehicle:</span>
            <span className="font-semibold">{invoice.vehicleName || 'Audi A6 45 TFSI (MH 12 AB 9988)'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Master Detailer:</span>
            <span>{invoice.detailerName || 'Vikram Malhotra'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Service:</span>
            <span className="font-bold text-brand-cyan">{invoice.serviceName || 'Aero-Gloss Express'}</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-[11px] font-mono">
          <div className="flex justify-between">
            <span className="text-slate-400">Package Base:</span>
            <span>₹499.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Doorstep Rig Conveyance:</span>
            <span className="text-emerald-400 font-bold">FREE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Aero Eco Disposal Levy:</span>
            <span>₹49.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">CGST (9%) + SGST (9%):</span>
            <span>₹98.64</span>
          </div>
          <div className="pt-2 border-t border-slate-700 flex justify-between text-xs font-bold text-brand-cyan">
            <span>Total Paid (Cashless UPI):</span>
            <span>₹646.64</span>
          </div>
        </div>

        <div className="pt-4 flex gap-2">
          <button 
            onClick={() => { playSuccessSound(); alert('Receipt PDF downloaded to device storage.'); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-brand-navy hover:bg-brand-azure text-brand-cyan border border-brand-cyan/30 flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// 6. ADD VEHICLE MODAL
export function AddVehicleModal({ isOpen, onClose, categories, onAddVehicle, darkMode }) {
  const [category, setCategory] = useState('suv');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('Santorini Black');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model.trim() || !plate.trim()) return;
    playSuccessSound();

    const catObj = categories.find(c => c.id === category) || categories[0];
    const newVeh = {
      id: `veh-${Date.now()}`,
      name: model.trim(),
      category,
      categoryName: catObj.name,
      plate: plate.trim().toUpperCase(),
      color: color.trim() || 'Metallic Pearl',
      colorHex: '#2D3748',
      year: 2024,
      lastDetailed: 'Just Registered',
      odometer: '8,200 km',
      isDefault: false,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      cleanScore: 65
    };

    onAddVehicle(newVeh);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-md rounded-3xl p-5 border shadow-2xl ${
        darkMode ? 'bg-brand-slateCard border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/20">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-sm font-bold">Register Machine into Garage</h3>
          </div>
          <button onClick={() => { playTapSound(); onClose(); }} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 my-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Category & Size Class</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { playTapSound(); setCategory(c.id); }}
                  className={`p-2 rounded-xl border text-left text-xs font-bold transition-all ${
                    category === c.id ? 'border-brand-cyan bg-brand-navy text-brand-cyan' : 'border-slate-800 bg-slate-900 text-slate-400'
                  }`}
                >
                  <div>{c.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{c.badge}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Make & Model</label>
            <input
              type="text"
              placeholder="e.g. Porsche Cayenne / Mercedes E-Class"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Registration / Plate</label>
            <input
              type="text"
              placeholder="MH 12 XY 9000"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-slate-900 border border-slate-700 text-brand-cyan focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-brand-azure to-brand-cyan text-brand-navy shadow-cyan-glow uppercase tracking-wider mt-2"
          >
            Add to Flight Fleet
          </button>
        </form>
      </div>
    </div>
  );
}
