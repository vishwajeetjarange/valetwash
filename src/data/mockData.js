// VALETWASH - Core Mock Data & State Definitions

export const VEHICLE_CATEGORIES = [
  { id: 'hatchback', name: 'Hatchback', multiplier: 1.0, icon: 'CarFront', badge: 'Standard 1.0x' },
  { id: 'sedan', name: 'Executive Sedan', multiplier: 1.15, icon: 'Car', badge: 'Sedan 1.15x' },
  { id: 'suv', name: 'Luxury SUV', multiplier: 1.35, icon: 'Shield', badge: 'SUV 1.35x' },
  { id: 'superbike', name: 'Superbike', multiplier: 0.75, icon: 'Bike', badge: 'Bike 0.75x' },
];

export const INITIAL_VEHICLES = [
  {
    id: 'veh-1',
    name: 'Audi A6 45 TFSI',
    category: 'sedan',
    categoryName: 'Executive Sedan',
    plate: 'MH 12 AB 9988',
    color: 'Daytona Gray Pearl',
    colorHex: '#4A5568',
    year: 2023,
    lastDetailed: '14 Oct 2026',
    odometer: '18,420 km',
    isDefault: true,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    cleanScore: 78
  },
  {
    id: 'veh-2',
    name: 'Range Rover Velar',
    category: 'suv',
    categoryName: 'Luxury SUV',
    plate: 'MH 14 CD 4004',
    color: 'Santorini Black Metallic',
    colorHex: '#1A202C',
    year: 2024,
    lastDetailed: '28 Sep 2026',
    odometer: '9,850 km',
    isDefault: false,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    cleanScore: 62
  },
  {
    id: 'veh-3',
    name: 'Ducati Panigale V4',
    category: 'superbike',
    categoryName: 'Superbike',
    plate: 'MH 12 EF 7777',
    color: 'Rosso Corsa Red',
    colorHex: '#E53E3E',
    year: 2024,
    lastDetailed: '02 Oct 2026',
    odometer: '4,100 km',
    isDefault: false,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    cleanScore: 91
  },
  {
    id: 'veh-4',
    name: 'Mini Cooper S JCW',
    category: 'hatchback',
    categoryName: 'Hatchback',
    plate: 'MH 01 GH 1234',
    color: 'British Racing Green',
    colorHex: '#22543D',
    year: 2022,
    lastDetailed: '19 Aug 2026',
    odometer: '26,300 km',
    isDefault: false,
    image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80',
    cleanScore: 45
  }
];

export const SERVICE_PACKAGES = [
  {
    id: 'pkg-1',
    category: 'quick',
    title: 'Aero-Gloss Express',
    subtitle: 'High-Velocity Doorstep Foam & Shine',
    duration: '45 Mins',
    basePrice: 499,
    badge: 'Most Popular',
    badgeColor: 'cyan',
    rating: 4.9,
    reviewsCount: 3840,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
    features: [
      'Aviation-Grade pH-Neutral High-Dense Snow Foam',
      '600-GSM Ultra-Plush Edgeless Scratch-Free Wipe',
      'High-Pressure De-ionized De-mineralized Rinse',
      'All 4 Wheels & Alloy Hydrophobic Dressing',
      'Streak-Free Aircraft-Spec Glass Clarity Treatment',
      'Tire Wall Jet-Black Silicone Gloss Coating'
    ],
    detailedDescription: 'Engineered for vehicle enthusiasts who want prompt, scratch-free perfection at their doorstep. Our mobile rig utilizes filtered water and aviation-grade lubricating foam that floats dirt off your clear coat without inducing swirl marks.'
  },
  {
    id: 'pkg-2',
    category: 'quick',
    title: 'Doorstep Wash & Vacuum Elite',
    subtitle: 'Complete Exterior Shine + Interior Vacuum',
    duration: '60 Mins',
    basePrice: 699,
    badge: 'Best Value',
    badgeColor: 'blue',
    rating: 4.95,
    reviewsCount: 2910,
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
    features: [
      'Everything in Aero-Gloss Express',
      'Deep Cabin Vacuuming (Seats, Carpets & Trunk)',
      'Dashboard & Console UV-Shield Conditioning',
      'Footmat Degrease & High-Pressure Wash',
      'Door Jams & Boot Hinges Precision Cleaning',
      'Subtle Signature ValetWash Cedar Cabin Scent'
    ],
    detailedDescription: 'The complete inside-out treatment for executive commuters. Clears cabin dust, restores dashboard sheen, and washes away road grit with aerospace precision.'
  },
  {
    id: 'pkg-3',
    category: 'deep',
    title: 'Deep Interior Sanitization & Detox',
    subtitle: 'Steam Extraction + Hospital-Grade AC Disinfection',
    duration: '90 Mins',
    basePrice: 1299,
    badge: 'Bio-Shield Spec',
    badgeColor: 'emerald',
    rating: 4.88,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    features: [
      'German Hot-Water Injection Extraction for All Fabric Seats',
      'Full Leather Nourishment & Anti-Crack Balm Dressing',
      'Ultrasonic AC Duct Disinfection & Bacteria Neutralizer',
      'Roof Liner & Sunroof Track Gentle De-spotting',
      'Child Seat Steam Sanitization (99.9% Pathogen Elimination)',
      'Odor Elimination (Pet / Food / Moisture removal)'
    ],
    detailedDescription: 'Transforms your vehicle interior into an allergen-free sanctuary. Uses hospital-grade dry vapor steam and German extraction to penetrate deep into seat cushioning.'
  },
  {
    id: 'pkg-4',
    category: 'paint',
    title: 'Ceramic Gloss & Paint Protection',
    subtitle: 'Single-Stage Swirl Cut + 9H SiO2 Hydrophobic Shell',
    duration: '120 Mins',
    basePrice: 3499,
    badge: 'Showroom Finish',
    badgeColor: 'purple',
    rating: 4.98,
    reviewsCount: 960,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    features: [
      'Clay Bar Decontamination & Iron Fallout Removal',
      'Single-Stage Dual-Action Machine Polish (removes 75% light swirls)',
      'Graphene-Infused Ceramic Hydrophobic Spray Armor (6-Month Durability)',
      'Self-Cleaning Water Beading Angle > 110°',
      'Tire & Plastic Trim Ceramic Sealant Restorer',
      'Complimentary Digital Paint Gloss GU Meter Reading Report'
    ],
    detailedDescription: 'Restores the high-refraction mirror clarity of your vehicle. Eliminates paint haze and locks in an intense hydrophobic shield that repels dust, bird drops, and acid rain.'
  },
  {
    id: 'pkg-5',
    category: 'paint',
    title: 'Aviation 9H Graphene Armor Pro',
    subtitle: 'Triple-Stage Paint Correction + 2-Year Certified Shell',
    duration: '180 Mins',
    basePrice: 5999,
    badge: 'Aviation Spec',
    badgeColor: 'amber',
    rating: 5.0,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: [
      '3-Step Precision Paint Correction (removes 92%+ defects)',
      'Pure Aviation-Certified 9H Graphene Base & Top Coat',
      'Windshield & Panoramic Sunroof Hydrophobic Ceramic Bond',
      'Wheel Barrels & Calipers High-Temp Thermal Coat',
      '2-Year Nationwide Warranty with Serialized Digital Certificate',
      'Quarterly Inspection & Booster Wash Included'
    ],
    detailedDescription: 'The pinnacle of automotive surface science. Formulated with aerospace graphene matrices that dissipate heat and create an ultra-hard, slick crystal layer.'
  },
  {
    id: 'pkg-6',
    category: 'fleet',
    title: 'Fleet & Multi-Car Household Bay',
    subtitle: 'Dual-Detailer Rapid Deployment for 2+ Vehicles',
    duration: '90 Mins',
    basePrice: 899,
    badge: 'Multi-Machine Pack',
    badgeColor: 'blue',
    rating: 4.92,
    reviewsCount: 820,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    features: [
      'Two Dedicated Master Detailers Dispatched Together',
      'Complete Wash & Shine for 2 Vehicles (Car + Bike / 2 Cars)',
      'High-Speed Parallel Processing - Zero Wait Time',
      'Bonus Engine Bay Cleanse on Primary Car',
      'Priority Rescheduling Privilege',
      'Additional Vehicle at flat ₹399 add-on'
    ],
    detailedDescription: 'Ideal for busy multi-vehicle families or executive parking bays. Our double-crew mobile rig details both machines concurrently with zero disruption to your day.'
  }
];

export const ADDONS_LIST = [
  {
    id: 'add-1',
    title: 'Aviation Engine Bay Detailing',
    desc: 'Steam degreasing, moisture displacement & matte dress',
    price: 399,
    duration: '+15 min',
    icon: 'Cpu'
  },
  {
    id: 'add-2',
    title: 'Windshield Rain-X Hydro-Shield',
    desc: 'Ultra-hydrophobic ceramic glass coating for monsoon safety',
    price: 299,
    duration: '+10 min',
    icon: 'CloudRain'
  },
  {
    id: 'add-3',
    title: 'Headlight Lens UV Restoration',
    desc: 'Removes yellow oxidation & seals with polymer polish',
    price: 449,
    duration: '+20 min',
    icon: 'Sun'
  },
  {
    id: 'add-4',
    title: 'Pet Hair Extractor & Ozone Treatment',
    desc: 'Rubber blade agitation & negative ion anti-allergen purge',
    price: 499,
    duration: '+25 min',
    icon: 'Sparkles'
  }
];

export const TIME_SLOTS = [
  { id: 'm1', time: '07:30 AM - 09:00 AM', period: 'Morning Flight', tag: 'Fastest', available: true },
  { id: 'm2', time: '09:30 AM - 11:00 AM', period: 'Morning Flight', tag: 'High Demand', available: true },
  { id: 'm3', time: '11:30 AM - 01:00 PM', period: 'Morning Flight', tag: 'Available', available: true },
  { id: 'a1', time: '01:30 PM - 03:00 PM', period: 'Afternoon Detailing', tag: 'Available', available: true },
  { id: 'a2', time: '03:30 PM - 05:00 PM', period: 'Afternoon Detailing', tag: 'Filling Fast', available: true },
  { id: 'e1', time: '05:30 PM - 07:00 PM', period: 'Sunset Gloss', tag: 'Prime Slot', available: true },
  { id: 'e2', time: '07:30 PM - 09:00 PM', period: 'Sunset Gloss', tag: 'Last Slot', available: false },
];

export const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home (Driveway)',
    tag: 'Home',
    address: 'Bungalow 14, Silver Oak Greens, Pali Hill, Bandra West, Mumbai 400050',
    landmark: 'Opposite Golf Course Gate 2',
    isDefault: true,
    coordinates: { lat: 19.0600, lng: 72.8280 }
  },
  {
    id: 'addr-2',
    label: 'Office (Executive Basement B2)',
    tag: 'Office',
    address: 'Tower C, One International Centre, Senapati Bapat Marg, Lower Parel, Mumbai 400013',
    landmark: 'Valet Parking Bay Slot #44',
    isDefault: false,
    coordinates: { lat: 19.0020, lng: 72.8300 }
  },
  {
    id: 'addr-3',
    label: 'Society Gate / Visitor Bay',
    tag: 'Gate',
    address: 'Imperial Heights, Oshiwara Link Road, Andheri West, Mumbai 400053',
    landmark: 'Security Booth Wash Bay A',
    isDefault: false,
    coordinates: { lat: 19.1430, lng: 72.8350 }
  }
];

export const DETAILER_PROFILE = {
  id: 'det-09',
  name: 'Vikram Malhotra',
  role: 'Senior Aviation Detailer',
  rating: 4.94,
  reviewsCount: 1420,
  yearsExp: '6 Years',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  phone: '+91 98201 44521',
  vanModel: 'Aero-Rig Mobile Van #08 (Tata Winger Pro)',
  vanPlate: 'MH 12 PQ 5511',
  equipment: '300L Filtered De-ionized Tank, Silent Electric Pressure Gun, Dual Action Polisher, HEPA Extractor',
  badges: ['Aviation Certified', 'Background Verified', '100% Paint-Safe Specialist'],
  bio: 'Trained at Dubai Aerocare Academy. Completed over 1,400+ luxury auto transformations.'
};

export const PROMO_CODES = [
  { code: 'AEROFIRST', discount: 200, type: 'flat', description: '₹200 OFF on your first aviation doorstep wash' },
  { code: 'GLOSS100', discount: 100, type: 'flat', description: '₹100 Instant savings on all packages' },
  { code: 'AVISPEC', discount: 0.15, type: 'percent', description: '15% OFF Ceramic and Graphene armor' }
];

export const TRANSFORMATION_REPORTS = [
  {
    id: 'trans-1',
    date: '14 Oct 2026',
    vehicleName: 'Audi A6 45 TFSI (MH 12 AB 9988)',
    serviceName: 'Aero-Gloss Express + Windshield Hydro-Shield',
    detailerName: 'Vikram Malhotra',
    beforeImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    glossScoreBefore: 68,
    glossScoreAfter: 96,
    guImprovement: '+28 GU (Showroom Refraction)',
    metrics: [
      { label: 'Surface Swirl Cut', value: '88% Reduced' },
      { label: 'Hydrophobic Beading', value: '112° Angle' },
      { label: 'Brake Dust Extraction', value: '100% Cleared' },
      { label: 'Interior UV Shield', value: 'Applied' }
    ],
    notes: 'Severe highway mud and tar spots cleared with citrus de-tar. Finished with aerospace SiO2 top coat.'
  },
  {
    id: 'trans-2',
    date: '28 Sep 2026',
    vehicleName: 'Range Rover Velar (MH 14 CD 4004)',
    serviceName: 'Deep Interior Sanitization & Detox',
    detailerName: 'Rajesh Sharma',
    beforeImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    glossScoreBefore: 55,
    glossScoreAfter: 92,
    guImprovement: '+37 GU',
    metrics: [
      { label: 'Cabin Pathogen Reduction', value: '99.9%' },
      { label: 'Leather Hydration', value: 'Balm Restored' },
      { label: 'AC Ducts Sanitized', value: 'Ultrasonic' },
      { label: 'Odor Neutralization', value: 'Pure Cedar' }
    ],
    notes: 'Full extraction of spilled coffee in passenger seat. Seats dry to touch within 20 minutes.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Aero-Rig #08 En Route!',
    desc: 'Vikram Malhotra is navigating toward your driveway. ETA: 12 minutes.',
    time: '2 mins ago',
    unread: true,
    type: 'tracking'
  },
  {
    id: 'notif-2',
    title: 'Monsoon Hydro-Shield Promo',
    desc: 'Apply AEROFIRST for ₹200 off your next Ceramic Glass treatment.',
    time: '2 hours ago',
    unread: true,
    type: 'promo'
  },
  {
    id: 'notif-3',
    title: 'Audi A6 Transformation Ready',
    desc: 'Your digital gloss report & before/after comparison is available.',
    time: 'Yesterday',
    unread: false,
    type: 'report'
  }
];
