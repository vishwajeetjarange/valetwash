import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Tag, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Car, 
  Clock, 
  Info,
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTapSound, playSuccessSound } from '../utils/audio';

export default function CheckoutScreen({
  darkMode,
  selectedPackage,
  selectedVehicle,
  selectedAddons,
  selectedAddress,
  bookingDetails,
  onConfirmBooking,
  onBack,
  promoCodes
}) {
  const [couponCode, setCouponCode] = useState('AEROFIRST');
  const [appliedPromo, setAppliedPromo] = useState({
    code: 'AEROFIRST',
    discount: 200,
    type: 'flat',
    description: '₹200 OFF on your first aviation doorstep wash'
  });
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'pay_after'
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'custom'
  const [customUpiId, setCustomUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const multiplier = selectedVehicle?.category === 'superbike' ? 0.75 
    : selectedVehicle?.category === 'suv' ? 1.35 
    : selectedVehicle?.category === 'sedan' ? 1.15 
    : 1.0;

  const basePrice = Math.round((selectedPackage?.basePrice || 499) * multiplier);
  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
  const subtotal = basePrice + addonsTotal;
  
  // Doorstep conveyance is waived for all orders >= 499
  const conveyanceFee = subtotal >= 499 ? 0 : 99;
  const ecoLevy = 49; // De-ionized water conservation & eco disposal

  // Calculate discount
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'flat') {
      discountAmount = appliedPromo.discount;
    } else if (appliedPromo.type === 'percent') {
      discountAmount = Math.round(subtotal * appliedPromo.discount);
    }
  }

  const taxableAmount = Math.max(0, subtotal + conveyanceFee + ecoLevy - discountAmount);
  const gst = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + gst;

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    playTapSound();
    setPromoError('');
    const cleanCode = couponCode.trim().toUpperCase();
    const match = promoCodes.find(p => p.code === cleanCode);

    if (match) {
      setAppliedPromo(match);
      playSuccessSound();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } else {
      setPromoError('Invalid flight code. Try AEROFIRST or GLOSS100');
    }
  };

  const handleRemoveCoupon = () => {
    playTapSound();
    setAppliedPromo(null);
    setCouponCode('');
    setPromoError('');
  };

  const handleCompletePayment = () => {
    playTapSound();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      playSuccessSound();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      onConfirmBooking({
        packageName: selectedPackage?.title,
        vehicleName: selectedVehicle?.name,
        plate: selectedVehicle?.plate,
        address: selectedAddress?.label,
        slotDate: bookingDetails?.date,
        slotTime: bookingDetails?.slot,
        totalPaid: grandTotal,
        paymentMethod: paymentMethod === 'pay_after' ? 'Doorstep Cash/UPI' : `Instant UPI (${selectedUpiApp.toUpperCase()})`,
        eta: '12 mins',
        statusStep: 'Assigned to Master Detailer'
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { playTapSound(); onBack(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            darkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
          Step 3 of 3: Cashless Checkout
        </span>
      </div>

      {/* 1. ORDER SUMMARY CARD */}
      <div className={`p-4 sm:p-5 rounded-3xl border ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-700/20">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-navy text-[10px] font-bold text-brand-cyan border border-brand-cyan/30 mb-1">
              <Sparkles className="w-3 h-3" /> {selectedPackage?.badge || 'Aero Spec'}
            </div>
            <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {selectedPackage?.title}
            </h3>
            <p className="text-xs text-brand-azureLight font-semibold">
              {selectedVehicle?.name} • <span className="font-mono">{selectedVehicle?.plate}</span>
            </p>
          </div>

          <div className="text-right">
            <div className="text-base font-extrabold text-brand-cyan font-mono">
              ₹{basePrice}
            </div>
            <div className="text-[10px] text-slate-400">{selectedPackage?.duration}</div>
          </div>
        </div>

        {/* Selected Add-ons List if any */}
        {selectedAddons.length > 0 && (
          <div className="py-2.5 border-b border-slate-700/20 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Add-ons ({selectedAddons.length})
            </div>
            {selectedAddons.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between text-xs">
                <span className="text-slate-300">{addon.title}</span>
                <span className="font-mono font-semibold text-brand-cyan">+₹{addon.price}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-3 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-azureLight" /> Doorstep Slot: Today, 07:30 AM
          </span>
          <span className="text-brand-cyan font-semibold">
            {selectedAddress?.label || 'Home (Driveway)'}
          </span>
        </div>
      </div>

      {/* 2. PROMO COUPON BOX */}
      <div className={`p-4 rounded-2xl border ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-brand-cyan" />
          <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Aero Pass & Promo Codes
          </h4>
        </div>

        {appliedPromo ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-brand-navy border border-brand-cyan/40 shadow-cyan-glow">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
              <div>
                <div className="text-xs font-extrabold font-mono text-brand-cyan">
                  {appliedPromo.code} Applied!
                </div>
                <div className="text-[10px] text-slate-300">
                  {appliedPromo.description}
                </div>
              </div>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-xs font-bold text-red-400 hover:text-red-300 ml-2"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter AEROFIRST or GLOSS100"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border focus:outline-none ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-brand-cyan focus:border-brand-cyan' : 'bg-slate-50 border-slate-300 text-brand-navy focus:border-brand-azure'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-navy hover:bg-brand-azure text-brand-cyan border border-brand-cyan/30 shadow-sm transition-all"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <div className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {promoError}
              </div>
            )}
          </form>
        )}
      </div>

      {/* 3. ITEMIZED BILL BREAKDOWN */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-2.5 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <h4 className={`text-xs font-bold uppercase tracking-wider text-slate-400 mb-2`}>
          Itemized Bill Breakdown
        </h4>

        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Aviation Detailing Base Fee</span>
          <span className="font-mono font-semibold">₹{basePrice}</span>
        </div>

        {selectedAddons.length > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Add-ons Subtotal</span>
            <span className="font-mono font-semibold">₹{addonsTotal}</span>
          </div>
        )}

        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Doorstep Mobile Rig Conveyance</span>
          <span className="font-mono font-bold text-emerald-400">
            {conveyanceFee === 0 ? 'FREE (Waived)' : `₹${conveyanceFee}`}
          </span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            Aero Eco & De-ionized Water Levy <Info className="w-3 h-3 opacity-60" />
          </span>
          <span className="font-mono font-semibold">₹{ecoLevy}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-xs font-bold text-brand-cyan">
            <span>Aero Pass Voucher ({appliedPromo?.code})</span>
            <span className="font-mono">-₹{discountAmount}</span>
          </div>
        )}

        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Government GST (18%)</span>
          <span className="font-mono font-semibold">₹{gst}</span>
        </div>

        <div className="pt-3 border-t border-slate-700/30 flex items-baseline justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-white dark:text-white">
              Total Amount Payable
            </div>
            <div className="text-[10px] text-slate-400">Inclusive of all doorstep taxes</div>
          </div>
          <div className="text-2xl font-black text-brand-cyan font-mono shadow-cyan-glow">
            ₹{grandTotal}
          </div>
        </div>
      </div>

      {/* 4. CASHLESS PAYMENT OPTIONS */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
        darkMode ? 'bg-brand-slateCard border-brand-slateBorder' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-cyan" />
            <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Select Cashless Payment Method
            </h4>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted
          </span>
        </div>

        {/* UPI Intent Selector */}
        <div
          onClick={() => { playTapSound(); setPaymentMethod('upi'); }}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            paymentMethod === 'upi'
              ? 'border-brand-cyan bg-brand-navy text-white shadow-cyan-glow'
              : darkMode ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-bold">UPI Instant Intent (GPay / PhonePe / Paytm)</span>
            </div>
            {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-brand-cyan" />}
          </div>

          {paymentMethod === 'upi' && (
            <div className="pt-2 grid grid-cols-3 gap-2">
              {[
                { id: 'gpay', label: 'Google Pay' },
                { id: 'phonepe', label: 'PhonePe' },
                { id: 'paytm', label: 'Paytm UPI' }
              ].map(app => (
                <button
                  key={app.id}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); playTapSound(); setSelectedUpiApp(app.id); }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all text-center ${
                    selectedUpiApp === app.id 
                      ? 'border-brand-cyan bg-brand-azure text-white shadow-sm' 
                      : 'border-slate-700 bg-slate-800/80 text-slate-300'
                  }`}
                >
                  {app.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Credit / Debit Card Option */}
        <div
          onClick={() => { playTapSound(); setPaymentMethod('card'); }}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            paymentMethod === 'card'
              ? 'border-brand-cyan bg-brand-navy text-white shadow-cyan-glow'
              : darkMode ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-bold">Credit / Debit Card (Visa, Mastercard, Amex)</span>
            </div>
            {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-brand-cyan" />}
          </div>
          {paymentMethod === 'card' && (
            <div className="mt-2 text-[11px] text-brand-azureLight font-mono">
              Saved Card: HDFC Regalia Millennia •••• 4022
            </div>
          )}
        </div>

        {/* Pay After Service Cash / UPI Option */}
        <div
          onClick={() => { playTapSound(); setPaymentMethod('pay_after'); }}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            paymentMethod === 'pay_after'
              ? 'border-brand-cyan bg-brand-navy text-white shadow-cyan-glow'
              : darkMode ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-brand-cyan" />
              <div>
                <span className="text-xs font-bold block">Pay After Service (Zero Risk Guarantee)</span>
                <span className="text-[10px] text-slate-400">Pay via UPI or Cash only after 100% inspection approval</span>
              </div>
            </div>
            {paymentMethod === 'pay_after' && <CheckCircle2 className="w-4 h-4 text-brand-cyan" />}
          </div>
        </div>
      </div>

      {/* Pay CTA Button */}
      <div className="pt-2">
        <button
          disabled={isProcessing}
          onClick={handleCompletePayment}
          className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-brand-azure via-blue-500 to-brand-cyan text-brand-navy shadow-cyan-glow hover:shadow-cyan-glow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-brand-navy border-t-transparent rounded-full animate-spin"></span>
              Securing Flight Slot & Dispatching Rig...
            </span>
          ) : (
            <>
              <span>Authorize & Book Doorstep Bay (₹{grandTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-brand-cyan" /> 100% Paint-Safe Guarantee
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-cyan" /> Insured up to ₹10 Lakhs
          </span>
        </div>
      </div>

    </div>
  );
}
