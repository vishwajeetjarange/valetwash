# VALETWASH — Aviation-Grade Doorstep Auto Care

VALETWASH is a high-converting, mobile-first Web & React application designed with elite UI/UX standards for doorstep automotive detailing and aerospace-grade surface preservation.

---

## 🎨 Brand Designation & Design System

- **Primary Brand Color**: Deep Navy / Midnight Blue (`#0A2240` / `#061528`)
- **Secondary / Accent Colors**: Metallic Azure (`#1B6CA8`) & Ocean Liquid Blue (`#4A90E2`)
- **Highlight / Status Color**: Electric Gloss Cyan (`#00E5FF`)
- **Background & Canvas**:
  - Light Mode: Crisp Pearl White (`#F8FAFC`) & Pure White (`#FFFFFF`)
  - Dark Mode: Deep Space Slate (`#0D131D`) & Slate Card (`#131B2A`)
- **Typography**: Inter / SF Pro Display with tight leading and high-tech monospace accents.
- **Micro-Interactions**: Curved 16px/24px cards, `0px 8px 24px rgba(10,34,64,0.08)` drop shadows, pulsing cyan radar beacons, Web Audio API synthetic haptic feedback.

---

## 📱 Screen-by-Screen Architecture

1. **Onboarding & Authentication (`OnboardingModal.jsx`)**
   - 3-Slide tutorial overlay detailing aviation-grade pH foam, 600-GSM plush microfibers, and  live GPS tracking.
   - One-tap OTP phone verification flow (auto-suggested `4820` demo code) + Google & Apple ID instant sign-in.
   - Quick vehicle onboarding sheet with category selection and license plate registration.

2. **Command Center Home Screen (`HomeScreen.jsx`)**
   - GPS Location Pill with rapid location-switching sheet.
   - High-gloss glassmorphism hero banner with standby status for detailers.
   - **"Select Your Machine"** carousel: Instantly recalibrates pricing across all packages using size class multipliers (Hatchback 1.0x, Sedan 1.15x, SUV 1.35x, Superbike 0.75x).
   - High-precision quick service selector with direct "Add to Bay" CTAs.
   - Four core Aviation Quality Pillars (0 PPM De-ionized Water, 600-GSM Edgeless Microfiber, Autonomous Mobile Rig, ₹10L Insurance Guarantee).
   - Persistent active booking status bar with real-time ETA and progress bar.

3. **Service Selection & Packages (`ServicesScreen.jsx`)**
   - Tabbed filtering: `[All Packages]` | `[Quick Wash]` | `[Deep Detail]` | `[Paint Care]` | `[Fleet Bay]`.
   - Real-time search with instant filtering.
   - Feature checklists with blue/cyan checkmark icons.
   - Specialized Add-ons Drawer (Aviation Engine Bay Detailing, Windshield Rain-X Hydro-Shield, UV Headlight Restoration, Pet Hair & Ozone Detox).

4. **Slot Scheduling & Doorstep Pin Picker (`BookingSlotScreen.jsx`)**
   - 7-Day horizontal date chips.
   - Morning, Afternoon, and Sunset Gloss time slots with live availability tags.
   - Custom dark navy interactive map canvas with draggable/clickable doorstep bay pin (lat/long telematics).
   - Saved address presets ("Home Driveway", "Office Basement B2", "Society Gate").
   - Pre-set access chips & special instructions text area.

5. **Cashless Checkout & Payment Sheet (`CheckoutScreen.jsx`)**
   - Itemized bill breakdown (Service fee + Add-ons + Free Doorstep Conveyance + Eco Levy + GST 18% - Promo discount).
   - Interactive Aero Pass coupon engine supporting `AEROFIRST`, `GLOSS100`, and `AVISPEC` with confetti animations.
   - Payment methods: Instant UPI intent (Google Pay, PhonePe, Paytm), Saved Cards, and "Pay After Service" zero-risk guarantee.

6. **Live Technician Tracking (`LiveTrackingScreen.jsx`)**
   - Custom dark navy vector map canvas with glowing cyan route trails.
   - Real-time moving Aero-Rig mobile van animation toward client's driveway pin.
   - Pulsing radar waves and audio ping synthesizers.
   - Assigned detailer profile (Vikram Malhotra, 4.9★, 1,420+ washes, Tata Winger Rig #08).
   - 5-Stage interactive telematics stepper (`Assigned` ➔ `En Route` ➔ `Arrived` ➔ `Wash in Progress` ➔ `Completed`).
   - One-tap simulated phone dialer and live two-way in-app chat modal.

7. **My Fleet Garage & Transformation Reports (`GarageScreen.jsx`)**
   - Vehicle cards with clean score meters and default machine switcher.
   - **Interactive Before / After photo comparison slider** allowing customers to slide between highway road film and 9H mirror glass finish.
   - Digital Paint Gloss GU Meter Report (+28 GU improvement).
   - Past tax invoice viewer with printable/downloadable format.

---

## 🚀 Running the Application

```bash
cd /Users/apple/.gemini/antigravity/scratch/valetwash-app

# Install dependencies (already installed)
npm install

# Start Vite Dev Server (running on port 3000)
npm run dev

# Production Build
npm run build
```

Access at `http://localhost:3000/`.
