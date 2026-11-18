/**
 * ============================================================================
 * TeleConnect - Telecom Website JavaScript Engine (ES6+)
 * ============================================================================
 * 
 * Architecture & Features:
 * 1. State Management & LocalStorage Persistence
 * 2. Dataset Arrays of Objects (Plans, Bundles, Services, FAQs, Testimonials)
 * 3. Modern Array Methods: map(), filter(), find(), forEach(), reduce(), some()
 * 4. DOM Manipulation & Event Delegation
 * 5. Dynamic Modal Dialog System & Toast Notification Queue
 * 6. Interactive Recharge Simulation with Real-time Tax Computation
 * 7. Real-time Customer Dashboard with Usage Progress Tracking
 * 8. 5G Network Speed Benchmark Simulator
 * 9. Form Validation with Regex (Mobile numbers, emails, amounts)
 * 10. Dark / Light Mode Theme Engine
 * ============================================================================
 */

'use strict';

/* ==========================================================================
   1. LOCALSTORAGE KEYS & INITIAL STATE
   ========================================================================== */
const STORAGE_KEYS = {
  THEME: 'teleconnect_theme',
  CUSTOMER: 'teleconnect_customer_data',
  TRANSACTIONS: 'teleconnect_transactions_log',
  ACTIVE_PLAN: 'teleconnect_active_plan'
};

/** Default initial customer profile used on first visit or reset */
const DEFAULT_CUSTOMER = {
  name: 'Ahmed Khan',
  phone: '0300 1234567',
  simTier: '5G Platinum eSIM',
  balance: 2450.00,
  activePlan: {
    id: 'pkg_standard_30d',
    name: 'Standard Monthly 15GB',
    data: '15 GB',
    price: 1000,
    validity: '24 Days Remaining',
    autoRenewal: true
  },
  usage: {
    dataUsed: 4.6,
    dataTotal: 15.0,
    minsUsed: 280,
    minsTotal: 1000,
    smsUsed: 150,
    smsTotal: 1000
  }
};

/** Default initial transaction log */
const DEFAULT_TRANSACTIONS = [
  {
    id: 'TXN-9021',
    activity: 'Easyload Online Recharge',
    method: 'Mobile Wallet (JazzCash)',
    date: '16 Nov 2026',
    amount: 1000,
    type: 'recharge',
    status: 'Completed'
  },
  {
    id: 'TXN-8842',
    activity: 'Standard Monthly 15GB Subscription',
    method: 'Account Balance',
    date: '15 Nov 2026',
    amount: -1000,
    type: 'subscription',
    status: 'Completed'
  },
  {
    id: 'TXN-7612',
    activity: 'Debit Card Instant Top-Up',
    method: 'Visa Debit Card',
    date: '02 Nov 2026',
    amount: 2000,
    type: 'recharge',
    status: 'Completed'
  },
  {
    id: 'TXN-6510',
    activity: 'Weekly Mega Internet 8GB',
    method: 'Account Balance',
    date: '24 Oct 2026',
    amount: -450,
    type: 'subscription',
    status: 'Completed'
  }
];

/* ==========================================================================
   2. DATASET ARRAYS OF OBJECTS
   ========================================================================== */

/**
 * Internet Packages Catalog
 * Includes diverse data quotas, validity periods, categories, and USSD activation codes
 */
const INTERNET_PACKAGES = [
  {
    id: 'pkg_basic_7d',
    name: 'Basic Plan',
    tagline: 'Light browsing, emails, messaging & daily social apps',
    category: 'weekly',
    data: '5 GB',
    dataRaw: 5,
    validity: '7 Days',
    validityDays: 7,
    price: 500,
    isPopular: false,
    ussdCode: '*500*1#',
    features: [
      '5 GB High-Speed 5G & 4G Data',
      'Free 1 GB Night Data (1 AM - 9 AM)',
      'Zero Throttling 5G Speeds',
      'Hotspot Tethering Allowed'
    ]
  },
  {
    id: 'pkg_standard_30d',
    name: 'Standard Plan',
    tagline: 'Perfect balance for everyday streaming, work & video calls',
    category: 'monthly',
    data: '15 GB',
    dataRaw: 15,
    validity: '30 Days',
    validityDays: 30,
    price: 1000,
    isPopular: true,
    ussdCode: '*115*2#',
    features: [
      '15 GB High-Speed 5G & 4G Data',
      'Free 5 GB Social Media (WhatsApp & YouTube)',
      'Sub-5ms Ultra-Low Latency Routing',
      'Data Rollover on Timely Renewal',
      '24/7 Priority Network Bandwidth'
    ]
  },
  {
    id: 'pkg_premium_30d',
    name: 'Premium Plan',
    tagline: 'For content creators, pro remote work & heavy streaming',
    category: 'monthly',
    data: '50 GB',
    dataRaw: 50,
    validity: '30 Days',
    validityDays: 30,
    price: 2000,
    isPopular: false,
    ussdCode: '*200*50#',
    features: [
      '50 GB All-Use High-Speed 5G Data',
      'Unlimited WhatsApp HD Voice & Video Calling',
      'Free 15 GB Cloud Storage Backup',
      'Zero Throttling During Peak Hours',
      'VIP Customer Care Helpline Access'
    ]
  },
  {
    id: 'pkg_unlimited_30d',
    name: 'Unlimited Plan',
    tagline: 'Unlimited freedom with 100 GB lightning-fast data allowance',
    category: 'unlimited',
    data: '100 GB',
    dataRaw: 100,
    validity: '30 Days',
    validityDays: 30,
    price: 3500,
    isPopular: false,
    ussdCode: '*350*100#',
    features: [
      '100 GB 5G Standalone Ultra Bandwidth',
      'Peak Speeds up to 1.5 Gbps',
      'Complimentary Global Roaming 1GB Pass',
      'Full Hotspot Tethering on up to 5 Devices',
      'Free eSIM Migration Included'
    ]
  },
  {
    id: 'pkg_gaming_15d',
    name: 'Pro Gamer Add-on',
    tagline: 'Low-latency fast-path routing optimized for online battle arenas',
    category: 'gaming',
    data: '35 GB',
    dataRaw: 35,
    validity: '15 Days',
    validityDays: 15,
    price: 1400,
    isPopular: false,
    ussdCode: '*999*35#',
    features: [
      '35 GB Dedicated Gaming & Streaming Data',
      'Dedicated Fast-Path Routing (3-5ms Ping)',
      'Optimized for Mobile Legends, PUBG & Valorant',
      'Zero Jitter Buffer Management'
    ]
  },
  {
    id: 'pkg_weekend_3d',
    name: 'Weekend Binge',
    tagline: 'Non-stop weekend movie marathons and binge downloads',
    category: 'weekly',
    data: '12 GB',
    dataRaw: 12,
    validity: '3 Days',
    validityDays: 3,
    price: 350,
    isPopular: false,
    ussdCode: '*300*12#',
    features: [
      '12 GB High-Speed Weekend Allowance',
      'Valid Friday 6 PM to Monday 8 AM',
      'Full 4K UHD Streaming Capability',
      'Instant One-Click Activation'
    ]
  },
  {
    id: 'pkg_mega_ultra_30d',
    name: 'Mega Ultra Enterprise',
    tagline: 'Massive capacity bundle designed for power users & households',
    category: 'unlimited',
    data: '250 GB',
    dataRaw: 250,
    validity: '30 Days',
    validityDays: 30,
    price: 5000,
    isPopular: false,
    ussdCode: '*500*250#',
    features: [
      '250 GB Full-Speed 5G High-Volume Data',
      'Multi-SIM Shared Data Capable (Up to 3 SIMs)',
      'Dedicated Leased Backbone Quality',
      'Automatic Renewal Protection'
    ]
  },
  {
    id: 'pkg_social_pass_30d',
    name: 'Social Media Freedom',
    tagline: 'Dedicated unlimited allowance for all trending social networks',
    category: 'gaming',
    data: '20 GB',
    dataRaw: 20,
    validity: '30 Days',
    validityDays: 30,
    price: 650,
    isPopular: false,
    ussdCode: '*650*20#',
    features: [
      '20 GB Exclusively for Social Applications',
      'Covers YouTube, Instagram, TikTok & Facebook',
      'Free 1,000 SMS to all networks',
      'Instant Activation'
    ]
  }
];

/**
 * Call & SMS Packages Catalog
 * Categorized by daily, weekly, monthly, and SMS-specific bundles
 */
const CALL_SMS_PACKAGES = [
  // Daily Packages
  {
    id: 'call_daily_super',
    name: 'Daily Super Talk',
    category: 'daily',
    price: 55,
    validity: '1 Day (24 Hrs)',
    onNetMins: '300 Mins',
    offNetMins: '30 Mins',
    smsCount: '300 SMS',
    dataBonus: '150 MB 5G',
    badge: 'Popular Daily',
    ussdCode: '*11*1#'
  },
  {
    id: 'call_daily_unlimited',
    name: 'Daily Day-Long Voice',
    category: 'daily',
    price: 80,
    validity: '1 Day (6 AM - 6 PM)',
    onNetMins: 'Unlimited',
    offNetMins: '40 Mins',
    smsCount: '500 SMS',
    dataBonus: '250 MB 5G',
    badge: 'Daytime Saver',
    ussdCode: '*11*2#'
  },

  // Weekly Packages
  {
    id: 'call_weekly_max',
    name: 'Weekly All-Network Hub',
    category: 'weekly',
    price: 320,
    validity: '7 Days',
    onNetMins: '2,500 Mins',
    offNetMins: '150 Mins',
    smsCount: '2,500 SMS',
    dataBonus: '3 GB 5G Data',
    badge: 'Best Value Weekly',
    ussdCode: '*77*1#'
  },
  {
    id: 'call_weekly_voice_pro',
    name: 'Weekly Voice Supreme',
    category: 'weekly',
    price: 450,
    validity: '7 Days',
    onNetMins: '5,000 Mins',
    offNetMins: '300 Mins',
    smsCount: '5,000 SMS',
    dataBonus: '5 GB 5G Data',
    badge: 'Heavy Callers',
    ussdCode: '*77*2#'
  },

  // Monthly Packages
  {
    id: 'call_monthly_freedom',
    name: 'Monthly Total Freedom',
    category: 'monthly',
    price: 950,
    validity: '30 Days',
    onNetMins: '5,000 Mins',
    offNetMins: '500 Mins',
    smsCount: '5,000 SMS',
    dataBonus: '10 GB 5G Data',
    badge: 'Top Pick Monthly',
    ussdCode: '*30*1#'
  },
  {
    id: 'call_monthly_executive',
    name: 'Executive Infinity Bundle',
    category: 'monthly',
    price: 1500,
    validity: '30 Days',
    onNetMins: '10,000 Mins',
    offNetMins: '1,000 Mins',
    smsCount: '10,000 SMS',
    dataBonus: '25 GB 5G Data',
    badge: 'Business Class',
    ussdCode: '*30*2#'
  },

  // SMS Bundles
  {
    id: 'sms_weekly_mega',
    name: 'Weekly 1,500 SMS Pack',
    category: 'sms',
    price: 60,
    validity: '7 Days',
    onNetMins: '0 Mins',
    offNetMins: '0 Mins',
    smsCount: '1,500 SMS',
    dataBonus: '100 MB WhatsApp',
    badge: 'SMS Only',
    ussdCode: '*22*1#'
  },
  {
    id: 'sms_monthly_ultra',
    name: 'Monthly 10,000 SMS Pack',
    category: 'sms',
    price: 180,
    validity: '30 Days',
    onNetMins: '0 Mins',
    offNetMins: '0 Mins',
    smsCount: '10,000 SMS',
    dataBonus: '500 MB WhatsApp',
    badge: 'Bulk Messaging',
    ussdCode: '*22*2#'
  }
];

/**
 * Telecom Core Services Catalog
 */
const SERVICES_DATA = [
  {
    id: 'srv_5g',
    title: '5G Ultra Connectivity',
    icon: 'fa-tower-broadcast',
    shortDesc: 'Standalone 5G network delivering download speeds up to 1.5 Gbps and ultra-responsive low-latency response times.',
    longDesc: 'TeleConnect operates a next-generation 5G Standalone (SA) core network operating across C-Band and millimeter-wave frequencies. Whether you are downloading 4K video streams in seconds or driving enterprise IoT deployments, experience unparalleled wireless stability.',
    badge: 'Ultra High-Speed',
    features: ['Up to 1.5 Gbps Peak Speeds', 'Sub-4ms Round-Trip Ping', 'Zero Congestion Sub-6GHz & mmWave']
  },
  {
    id: 'srv_4g',
    title: '4G LTE-Advanced',
    icon: 'fa-signal',
    shortDesc: 'Nationwide 4G LTE-A coverage covering 99% of urban centers and remote motorway corridors with zero dead zones.',
    longDesc: 'Our 4G LTE-Advanced network utilizes 4x4 MIMO and carrier aggregation to deliver reliable, high-speed mobile data even in crowded venues, rural routes, and basement offices.',
    badge: 'Nationwide',
    features: ['99.9% Population Reach', 'Carrier Aggregation Enabled', 'Seamless 5G Handover']
  },
  {
    id: 'srv_voice',
    title: 'HD VoLTE & VoWiFi',
    icon: 'fa-phone-volume',
    shortDesc: 'Crystal-clear high-definition voice calling over our data network with instant call connect and zero ambient noise.',
    longDesc: 'Experience studio-quality voice calls with Voice over LTE (VoLTE) and Voice over WiFi (VoWiFi). Keep browsing the web at 5G speeds while speaking on the phone without interruption.',
    badge: 'HD Audio',
    features: ['Sub-second Call Setup', 'HD Voice Codec Clarity', 'Simultaneous 5G Data While on Call']
  },
  {
    id: 'srv_sms',
    title: 'SMS & Enterprise Messaging',
    icon: 'fa-comment-dots',
    shortDesc: 'Ultra-reliable two-way SMS communication, transaction alerts, secure OTP verification, and high-volume business messaging.',
    longDesc: 'High-throughput enterprise SMS gateways capable of delivering millions of time-sensitive OTP codes, bank transaction notifications, and marketing broadcasts in milliseconds.',
    badge: 'Instant Delivery',
    features: ['99.99% Guaranteed Delivery Rate', 'Secure OTP Token Routing', 'REST API Integration for Businesses']
  },
  {
    id: 'srv_roaming',
    title: 'International Roaming',
    icon: 'fa-earth-americas',
    shortDesc: 'Stay smoothly connected in over 150 countries worldwide with transparent daily fixed rates and zero unexpected bill shocks.',
    longDesc: 'Touch down in London, Dubai, New York, or Tokyo and connect instantly with our preferred Tier-1 global carrier partners. Retain your local mobile number for calls, WhatsApp, and banking OTPs.',
    badge: '150+ Lands',
    features: ['Fixed Flat Daily Pass', 'Keep Local Number for OTPs', 'Automatic Carrier Pairing']
  },
  {
    id: 'srv_business',
    title: 'Enterprise Dedicated Lines',
    icon: 'fa-building-shield',
    shortDesc: 'Mission-critical leased lines, static IP allocations, secure cloud direct connects, and enterprise SLA guarantees.',
    longDesc: 'Tailored telecommunication infrastructure for modern banks, software houses, and multinational corporate headquarters. Includes 99.99% guaranteed uptime SLA and dedicated network engineers.',
    badge: 'Enterprise SLA',
    features: ['1:1 Contention Dedicated Bandwidth', 'Static IPv4 & IPv6 Subnets', '24/7 Priority Field Dispatch']
  },
  {
    id: 'srv_broadband',
    title: 'Gigabit Fiber Broadband',
    icon: 'fa-house-signal',
    shortDesc: 'Pure optical fiber to the home (FTTH) delivering symmetric upload and download speeds for multi-device households.',
    longDesc: 'Direct-to-home fiber optic connectivity offering symmetrical speeds up to 1 Gbps. Comes paired with intelligent WiFi 6 mesh routers for full home coverage from corner to corner.',
    badge: 'Smart Home',
    features: ['Symmetrical Upload/Download', 'Free WiFi 6 Smart Mesh Router', 'Unlimited Monthly Quota']
  }
];

/**
 * Customer Testimonials Data
 */
const TESTIMONIALS_DATA = [
  {
    id: 'test_1',
    name: 'Zainab Tariq',
    role: 'Lead UI/UX Designer',
    avatar: 'ZT',
    rating: 5,
    quote: 'TeleConnect 5G has transformed my remote work life. Uploading multi-gigabyte Figma prototypes and hopping onto 4K client Zoom calls happens with zero stutter. Truly dependable service.'
  },
  {
    id: 'test_2',
    name: 'Bilal Farooq',
    role: 'Competitive Esports Player',
    avatar: 'BF',
    rating: 5,
    quote: 'The low-latency gaming routing package is a game-changer. My ping in competitive tournaments consistently sits at 4-6ms with zero packet drops. Hands down the best telecom in the country.'
  },
  {
    id: 'test_3',
    name: 'Dr. Sarah Malik',
    role: 'Healthcare Professional',
    avatar: 'SM',
    rating: 5,
    quote: 'Instant online recharge and crystal-clear VoLTE calling make my long on-call hospital shifts seamless. Converting my physical SIM to eSIM took less than two minutes online.'
  },
  {
    id: 'test_4',
    name: 'Hamza Sheikh',
    role: 'Tech Entrepreneur',
    avatar: 'HS',
    rating: 5,
    quote: 'We switched our 80-person software agency to TeleConnect enterprise leased line. Exceptional uptime, honest pricing, and stellar engineer support. Highly recommended for businesses.'
  }
];

/**
 * Frequently Asked Questions
 */
const FAQS_DATA = [
  {
    id: 'faq_1',
    question: 'How do I activate a new 5G SIM or convert to eSIM?',
    answer: 'You can convert your existing physical SIM to a digital eSIM in just two minutes! Simply dial *121# or use the customer self-care dashboard. We will generate a secure QR code on your screen; simply scan it with your iPhone or Android device under Cellular Settings to activate.'
  },
  {
    id: 'faq_2',
    question: 'How does the online mobile recharge system work?',
    answer: 'Our instant recharge portal accepts Visa/Mastercard debit and credit cards, mobile wallets (JazzCash, Easypaisa, Raast), or scratch card vouchers. Your balance is credited to your account within 3 seconds, and a detailed tax breakdown (15% standard withholding tax) is clearly displayed before payment.'
  },
  {
    id: 'faq_3',
    question: 'Can I subscribe to multiple packages at the same time?',
    answer: 'Yes! TeleConnect allows simultaneous subscriptions. For instance, you can run a 30-Day Monthly Internet Plan alongside a Weekly Call Bundle. Remaining data and voice minutes will accumulate seamlessly in your dashboard.'
  },
  {
    id: 'faq_4',
    question: 'What happens if my data quota finishes before validity expires?',
    answer: 'If your main data runs out, you will never be charged surprise overage fees. You can either subscribe to an instant Add-on bundle (such as our 5GB Quick Top-up) or enjoy complimentary low-speed messaging until your next billing cycle.'
  },
  {
    id: 'faq_5',
    question: 'How do I check my remaining balance and data via USSD?',
    answer: 'Dial *111# to check your main balance. Dial *111*2# to view remaining 5G data, call minutes, and SMS limits. USSD balance inquiries are 100% free of charge and work even if your account balance is PKR 0.00.'
  },
  {
    id: 'faq_6',
    question: 'Does TeleConnect support International Roaming?',
    answer: 'Yes, TeleConnect provides pre-activated international roaming in over 150 countries worldwide. You can purchase flat daily passes starting from PKR 500/day, ensuring you keep your Pakistani SIM active for bank OTPs and urgent calls while traveling abroad.'
  }
];

/* ==========================================================================
   3. APPLICATION STATE STORE
   ========================================================================== */
const AppState = {
  customer: null,
  transactions: [],
  selectedPackageForModal: null,
  rechargeDraft: {
    phone: '',
    grossAmount: 500,
    tax: 75,
    netAmount: 425,
    method: 'Debit / Credit Card'
  },
  activeCategoryFilter: 'all',
  activeSearchQuery: '',
  activeSortOption: 'featured',
  activeCallTab: 'daily'
};

/* ==========================================================================
   4. DOM ELEMENT CACHE
   ========================================================================== */
const DOM = {
  html: document.documentElement,
  header: document.getElementById('header'),
  themeToggle: document.getElementById('theme-toggle'),
  mobileToggle: document.getElementById('mobile-toggle'),
  mainNav: document.getElementById('main-nav'),
  mobileOverlay: document.getElementById('mobile-overlay'),
  navBalanceVal: document.getElementById('nav-balance-val'),
  navLinks: document.querySelectorAll('.nav-link'),

  // Package section elements
  packagesContainer: document.getElementById('packages-container'),
  packageCategoryFilters: document.getElementById('package-category-filters'),
  packageSearchInput: document.getElementById('package-search-input'),
  clearPackageSearch: document.getElementById('clear-package-search'),
  packageSortSelect: document.getElementById('package-sort-select'),
  packageEmptyState: document.getElementById('package-empty-state'),
  resetPackageFilters: document.getElementById('reset-package-filters'),

  // Call & SMS section elements
  callSmsTabs: document.querySelectorAll('.call-tab-btn'),
  callSmsContainer: document.getElementById('call-sms-container'),

  // Services & FAQs & Testimonials
  servicesContainer: document.getElementById('services-container'),
  testimonialsContainer: document.getElementById('testimonials-container'),
  faqAccordion: document.getElementById('faq-accordion'),

  // Dashboard elements
  dashPhoneNumber: document.getElementById('dash-phone-number'),
  dashSubscriberName: document.getElementById('dash-subscriber-name'),
  dashSimTier: document.getElementById('dash-sim-tier'),
  dashActivePlanName: document.getElementById('dash-active-plan-name'),
  dashPlanExpiry: document.getElementById('dash-plan-expiry'),
  dashPlanCost: document.getElementById('dash-plan-cost'),
  dashBalanceDisplay: document.getElementById('dash-balance-display'),
  autoRenewalToggle: document.getElementById('auto-renewal-toggle'),
  btnEditPhone: document.getElementById('btn-edit-phone'),
  btnResetDemo: document.getElementById('btn-reset-demo'),
  btnClearHistory: document.getElementById('btn-clear-history'),

  // Usage meters
  dashDataSummary: document.getElementById('dash-data-summary'),
  dashDataBar: document.getElementById('dash-data-bar'),
  dashDataPercent: document.getElementById('dash-data-percent'),

  dashMinsSummary: document.getElementById('dash-mins-summary'),
  dashMinsBar: document.getElementById('dash-mins-bar'),
  dashMinsPercent: document.getElementById('dash-mins-percent'),

  dashSmsSummary: document.getElementById('dash-sms-summary'),
  dashSmsBar: document.getElementById('dash-sms-bar'),
  dashSmsPercent: document.getElementById('dash-sms-percent'),

  // Transaction table
  transactionsBody: document.getElementById('transactions-body'),
  txCountDisplay: document.getElementById('tx-count-display'),
  txFilterPills: document.querySelectorAll('.history-filter-pills .pill'),

  // Recharge form elements
  rechargeForm: document.getElementById('recharge-form'),
  rechargePhone: document.getElementById('recharge-phone'),
  phoneValidationBadge: document.getElementById('phone-validation-badge'),
  phoneError: document.getElementById('phone-error'),
  amountPresetsGroup: document.getElementById('amount-presets-group'),
  rechargeAmountInput: document.getElementById('recharge-amount-input'),
  amountError: document.getElementById('amount-error'),
  paymentMethodsGroup: document.getElementById('payment-methods-group'),
  previewGrossVal: document.getElementById('preview-gross-val'),
  previewTaxVal: document.getElementById('preview-tax-val'),
  previewNetVal: document.getElementById('preview-net-val'),

  // Speed test simulator
  btnStartSpeedtest: document.getElementById('btn-start-speedtest'),
  speedReading: document.getElementById('speed-reading'),
  speedStatus: document.getElementById('speed-status'),
  testLatency: document.getElementById('test-latency'),
  testJitter: document.getElementById('test-jitter'),
  testUpload: document.getElementById('test-upload'),

  // Contact form elements
  contactForm: document.getElementById('contact-form'),
  contactName: document.getElementById('contact-name'),
  contactEmail: document.getElementById('contact-email'),
  contactPhone: document.getElementById('contact-phone'),
  contactSubject: document.getElementById('contact-subject'),
  contactMessage: document.getElementById('contact-message'),

  // Newsletter form
  newsletterForm: document.getElementById('newsletter-form'),
  newsletterEmail: document.getElementById('newsletter-email'),
  newsletterFeedback: document.getElementById('newsletter-feedback'),

  // Modals
  packageModal: document.getElementById('package-modal'),
  modalPkgBadge: document.getElementById('modal-pkg-badge'),
  modalPkgTitle: document.getElementById('modal-pkg-title'),
  modalPkgTagline: document.getElementById('modal-pkg-tagline'),
  modalPkgData: document.getElementById('modal-pkg-data'),
  modalPkgValidity: document.getElementById('modal-pkg-validity'),
  modalPkgPrice: document.getElementById('modal-pkg-price'),
  modalPkgPerks: document.getElementById('modal-pkg-perks'),
  modalPkgUssd: document.getElementById('modal-pkg-ussd'),
  modalPkgClose: document.getElementById('modal-pkg-close'),
  modalPkgCancel: document.getElementById('modal-pkg-cancel'),
  modalPkgSubscribeBtn: document.getElementById('modal-pkg-subscribe-btn'),

  // Recharge confirm modal
  rechargeConfirmModal: document.getElementById('recharge-confirm-modal'),
  modalRechargeClose: document.getElementById('modal-recharge-close'),
  modalRechargeCancel: document.getElementById('modal-recharge-cancel'),
  modalRechargeConfirmBtn: document.getElementById('modal-recharge-confirm-btn'),
  rechargeBtnLabel: document.getElementById('recharge-btn-label'),
  confirmPhone: document.getElementById('confirm-phone'),
  confirmAmount: document.getElementById('confirm-amount'),
  confirmTax: document.getElementById('confirm-tax'),
  confirmNet: document.getElementById('confirm-net'),
  confirmMethod: document.getElementById('confirm-method'),

  // Phone edit modal
  phoneModal: document.getElementById('phone-modal'),
  editPhoneInput: document.getElementById('edit-phone-input'),
  editPhoneError: document.getElementById('edit-phone-error'),
  modalPhoneClose: document.getElementById('modal-phone-close'),
  modalPhoneCancel: document.getElementById('modal-phone-cancel'),
  modalPhoneSave: document.getElementById('modal-phone-save'),

  // Service modal
  serviceModal: document.getElementById('service-modal'),
  modalServiceIcon: document.getElementById('modal-service-icon'),
  modalServiceTitle: document.getElementById('modal-service-title'),
  modalServiceSub: document.getElementById('modal-service-sub'),
  modalServiceDesc: document.getElementById('modal-service-desc'),
  modalServiceFeatures: document.getElementById('modal-service-features'),
  modalServiceClose: document.getElementById('modal-service-close'),
  modalServiceDone: document.getElementById('modal-service-done'),

  // Toast & Scroll-to-top
  toastContainer: document.getElementById('toast-container'),
  scrollTopBtn: document.getElementById('scroll-top-btn'),
  scrollRingFill: document.getElementById('scroll-ring-fill'),
  currentYear: document.getElementById('current-year')
};

/* ==========================================================================
   5. UTILITY & HELPER FUNCTIONS
   ========================================================================== */

/**
 * Formats a numeric value into localized Pakistani Rupee string (e.g. "PKR 1,500.00")
 * Demonstrates clean formatting logic using Intl.NumberFormat
 * @param {number} amount
 * @param {boolean} includePrefix
 * @returns {string}
 */
function formatPKR(amount, includePrefix = true) {
  const formatted = new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
  return includePrefix ? `PKR ${formatted}` : formatted;
}

/**
 * Validates a mobile phone number using regex
 * Matches standard Pakistani formats: 03XX XXXXXXX, 03XXXXXXXXX, +92 3XX XXXXXXX, 00923XXXXXXXXX
 * @param {string} phone
 * @returns {boolean}
 */
function isValidPhoneNumber(phone) {
  if (!phone) return false;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const pakistaniPhoneRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
  return pakistaniPhoneRegex.test(cleanPhone);
}

/**
 * Validates email format using standard RFC-compliant regex
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Computes telecom tax breakdown (15% standard withholding tax)
 * @param {number} grossAmount
 * @returns {{gross: number, tax: number, net: number}}
 */
function calculateRechargeBreakdown(grossAmount) {
  const taxRate = 0.15; // 15% telecom tax
  const tax = grossAmount * taxRate;
  const net = grossAmount - tax;
  return {
    gross: grossAmount,
    tax: Math.round(tax * 100) / 100,
    net: Math.round(net * 100) / 100
  };
}

/* ==========================================================================
   6. TOAST NOTIFICATION SYSTEM
   ========================================================================== */

/**
 * Displays an accessible, stacked toast notification with auto-dismiss
 * @param {string} title - Heading of the alert
 * @param {string} message - Description message
 * @param {'success'|'error'|'info'|'warning'} type - Visual styling type
 * @param {number} durationMs - Auto-dismiss timeout in ms
 */
function showToast(title, message, type = 'info', durationMs = 4500) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  // Choose icon based on type
  const iconMap = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation'
  };
  const iconClass = iconMap[type] || 'fa-bell';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close-btn" aria-label="Dismiss Notification">&times;</button>
  `;

  // Close button event
  const closeBtn = toast.querySelector('.toast-close-btn');
  closeBtn.addEventListener('click', () => removeToast(toast));

  // Add to DOM
  DOM.toastContainer.appendChild(toast);

  // Trigger CSS slide-in
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after duration
  const autoDismissTimer = setTimeout(() => {
    removeToast(toast);
  }, durationMs);

  function removeToast(el) {
    clearTimeout(autoDismissTimer);
    el.classList.remove('show');
    el.addEventListener('transitionend', () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, { once: true });
  }
}

/* ==========================================================================
   7. MODAL DIALOG CONTROLLER
   ========================================================================== */

/**
 * Opens a modal dialog by DOM element or ID
 * @param {HTMLElement|string} modalElement
 */
function openModal(modalElement) {
  const modal = typeof modalElement === 'string' ? document.getElementById(modalElement) : modalElement;
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Closes a modal dialog
 * @param {HTMLElement|string} modalElement
 */
function closeModal(modalElement) {
  const modal = typeof modalElement === 'string' ? document.getElementById(modalElement) : modalElement;
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Setup modal backdrop clicks & Escape key listener
 */
function setupModalListeners() {
  const allModals = document.querySelectorAll('.modal-backdrop');
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      // If clicked on backdrop itself (outside container)
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
}

/* ==========================================================================
   8. LOCALSTORAGE PERSISTENCE ENGINE
   ========================================================================== */

/**
 * Loads customer state from LocalStorage or sets defaults
 */
function loadStateFromStorage() {
  try {
    const savedCustomer = localStorage.getItem(STORAGE_KEYS.CUSTOMER);
    AppState.customer = savedCustomer ? JSON.parse(savedCustomer) : { ...DEFAULT_CUSTOMER };

    const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    AppState.transactions = savedTransactions ? JSON.parse(savedTransactions) : [...DEFAULT_TRANSACTIONS];

    // Ensure state integrity
    if (!AppState.customer.usage) {
      AppState.customer.usage = { ...DEFAULT_CUSTOMER.usage };
    }
  } catch (error) {
    console.error('LocalStorage load error, using default demo state:', error);
    AppState.customer = { ...DEFAULT_CUSTOMER };
    AppState.transactions = [...DEFAULT_TRANSACTIONS];
  }
}

/**
 * Persists current state back to LocalStorage
 */
function saveStateToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(AppState.customer));
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(AppState.transactions));
  } catch (error) {
    console.error('LocalStorage save error:', error);
  }
}

/**
 * Resets state back to factory demo defaults
 */
function resetAllDemoData() {
  if (confirm('Are you sure you want to reset all demo data, balances, and history back to default?')) {
    localStorage.removeItem(STORAGE_KEYS.CUSTOMER);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    AppState.customer = JSON.parse(JSON.stringify(DEFAULT_CUSTOMER));
    AppState.transactions = JSON.parse(JSON.stringify(DEFAULT_TRANSACTIONS));
    saveStateToStorage();
    updateDashboardUI();
    renderTransactions('all');
    showToast('Reset Complete', 'Demo account restored to default values.', 'info');
  }
}

/* ==========================================================================
   9. THEME ENGINE (DARK / LIGHT MODE)
   ========================================================================== */

/**
 * Initializes and toggles Dark / Light theme with LocalStorage persistence
 */
function initThemeEngine() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  applyTheme(savedTheme);

  DOM.themeToggle.addEventListener('click', () => {
    const currentTheme = DOM.html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(
      'Theme Updated',
      `Switched to ${newTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`,
      'info',
      2500
    );
  });
}

function applyTheme(theme) {
  DOM.html.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

/* ==========================================================================
   10. INTERNET PACKAGES RENDERING & FILTERING
   ========================================================================== */

/**
 * Dynamically renders internet package cards using Array.map() and template literals
 * @param {Array<Object>} packages
 */
function renderInternetPackages(packages) {
  if (!DOM.packagesContainer) return;

  if (packages.length === 0) {
    DOM.packagesContainer.innerHTML = '';
    DOM.packageEmptyState.classList.remove('hidden');
    return;
  }

  DOM.packageEmptyState.classList.add('hidden');

  const cardsHTML = packages.map(pkg => {
    // Check if this plan is currently active on user account
    const isCurrentlyActive = AppState.customer.activePlan && AppState.customer.activePlan.id === pkg.id;

    // Build features list items using map()
    const featuresListHTML = pkg.features.map(feat => `
      <li class="pkg-feature-item">
        <i class="fa-solid fa-circle-check"></i>
        <span>${feat}</span>
      </li>
    `).join('');

    return `
      <article class="package-card ${pkg.isPopular ? 'popular' : ''}" data-id="${pkg.id}">
        ${pkg.isPopular ? '<div class="popular-badge">POPULAR</div>' : ''}
        
        <div class="pkg-header">
          <span class="pkg-category-tag">${pkg.category.toUpperCase()} PLAN</span>
          <h3 class="pkg-title">${pkg.name}</h3>
          <p class="pkg-tagline">${pkg.tagline}</p>
        </div>

        <div class="pkg-data-banner">
          <div>
            <span class="pkg-data-val">${pkg.data.split(' ')[0]}</span>
            <span class="pkg-data-unit">${pkg.data.split(' ')[1] || 'GB'}</span>
          </div>
          <span class="pkg-validity-pill"><i class="fa-regular fa-clock"></i> ${pkg.validity}</span>
        </div>

        <div class="pkg-price-row">
          <span class="pkg-currency">PKR</span>
          <span class="pkg-price-val">${pkg.price.toLocaleString()}</span>
          <span class="pkg-tax-note">(Tax incl.)</span>
        </div>

        <ul class="pkg-features">
          ${featuresListHTML}
        </ul>

        <div class="pkg-actions">
          <button class="btn ${isCurrentlyActive ? 'btn-outline' : 'btn-primary'} w-100 btn-subscribe" data-id="${pkg.id}">
            <i class="fa-solid ${isCurrentlyActive ? 'fa-check' : 'fa-bolt'}"></i>
            <span>${isCurrentlyActive ? 'Subscribed' : 'Subscribe Now'}</span>
          </button>
          <button class="btn-details" data-id="${pkg.id}">
            <i class="fa-solid fa-circle-info"></i> View Details & Dial Code
          </button>
        </div>
      </article>
    `;
  }).join('');

  DOM.packagesContainer.innerHTML = cardsHTML;
  attachPackageCardEvents();
}

/**
 * Event delegation and direct listeners for rendered package cards
 */
function attachPackageCardEvents() {
  // Subscribe buttons
  const subscribeBtns = DOM.packagesContainer.querySelectorAll('.btn-subscribe');
  subscribeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const packageId = e.currentTarget.getAttribute('data-id');
      handleSubscribeInitiation(packageId);
    });
  });

  // View details buttons
  const detailBtns = DOM.packagesContainer.querySelectorAll('.btn-details');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const packageId = e.currentTarget.getAttribute('data-id');
      openPackageDetailsModal(packageId);
    });
  });
}

/**
 * Filters and sorts packages based on category tab, live search input, and sort dropdown
 * Demonstrates filter(), some(), toLowerCase(), and sort()
 */
function filterAndSortPackages() {
  const category = AppState.activeCategoryFilter;
  const searchQuery = AppState.activeSearchQuery.trim().toLowerCase();
  const sortOption = AppState.activeSortOption;

  // 1. Filter by category
  let filtered = INTERNET_PACKAGES.filter(pkg => {
    if (category === 'all') return true;
    return pkg.category === category;
  });

  // 2. Filter by search query (name, data, price, features)
  if (searchQuery) {
    filtered = filtered.filter(pkg => {
      const matchesName = pkg.name.toLowerCase().includes(searchQuery);
      const matchesData = pkg.data.toLowerCase().includes(searchQuery);
      const matchesPrice = pkg.price.toString().includes(searchQuery);
      const matchesTagline = pkg.tagline.toLowerCase().includes(searchQuery);
      const matchesFeature = pkg.features.some(f => f.toLowerCase().includes(searchQuery));
      return matchesName || matchesData || matchesPrice || matchesTagline || matchesFeature;
    });
  }

  // 3. Sort packages
  filtered.sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'data-desc') return b.dataRaw - a.dataRaw;
    // Featured / default: popular first
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  renderInternetPackages(filtered);
}

/**
 * Opens the Package Details Modal populated with the selected plan's attributes
 * @param {string} packageId
 */
function openPackageDetailsModal(packageId) {
  const pkg = INTERNET_PACKAGES.find(p => p.id === packageId);
  if (!pkg) return;

  AppState.selectedPackageForModal = pkg;

  DOM.modalPkgBadge.textContent = pkg.isPopular ? 'POPULAR CHOICE' : `${pkg.category.toUpperCase()} PLAN`;
  DOM.modalPkgTitle.textContent = pkg.name;
  DOM.modalPkgTagline.textContent = pkg.tagline;
  DOM.modalPkgData.textContent = pkg.data;
  DOM.modalPkgValidity.textContent = pkg.validity;
  DOM.modalPkgPrice.textContent = `PKR ${pkg.price.toLocaleString()}`;
  DOM.modalPkgUssd.textContent = pkg.ussdCode;

  // Render perks list
  DOM.modalPkgPerks.innerHTML = pkg.features.map(feat => `
    <li><i class="fa-solid fa-check"></i> <span>${feat}</span></li>
  `).join('');

  // Update modal subscribe button text
  const isCurrentlyActive = AppState.customer.activePlan && AppState.customer.activePlan.id === pkg.id;
  DOM.modalPkgSubscribeBtn.innerHTML = `
    <i class="fa-solid ${isCurrentlyActive ? 'fa-check' : 'fa-bolt'}"></i>
    <span>${isCurrentlyActive ? 'Already Active' : 'Subscribe Now'}</span>
  `;

  openModal(DOM.packageModal);
}

/**
 * Handles package subscription logic: checks balance, updates state, and logs transaction
 * @param {string} packageId
 */
function handleSubscribeInitiation(packageId) {
  const pkg = INTERNET_PACKAGES.find(p => p.id === packageId);
  if (!pkg) return;

  // Check if already active
  if (AppState.customer.activePlan && AppState.customer.activePlan.id === pkg.id) {
    showToast('Plan Already Active', `You are already subscribed to ${pkg.name}.`, 'info');
    return;
  }

  // Check customer balance
  const currentBalance = AppState.customer.balance;
  if (currentBalance < pkg.price) {
    const deficit = pkg.price - currentBalance;
    showToast(
      'Insufficient Balance',
      `You need PKR ${deficit.toLocaleString()} more to subscribe to ${pkg.name}. Please recharge your balance.`,
      'error',
      6000
    );
    // Smooth scroll to recharge section
    const rechargeSection = document.getElementById('recharge');
    if (rechargeSection) {
      rechargeSection.scrollIntoView({ behavior: 'smooth' });
      // Pre-fill recharge amount input
      DOM.rechargeAmountInput.value = Math.ceil(deficit / 100) * 100;
      updateRechargeCalculations();
    }
    return;
  }

  // If sufficient balance, confirm subscription
  const confirmMsg = `Subscribe to ${pkg.name} for PKR ${pkg.price.toLocaleString()}?\nAmount will be deducted from your available balance.`;
  if (confirm(confirmMsg)) {
    executePackageSubscription(pkg);
  }
}

/**
 * Executes confirmed package deduction and updates dashboard state
 * @param {Object} pkg
 */
function executePackageSubscription(pkg) {
  // Deduct balance
  AppState.customer.balance -= pkg.price;

  // Set active package
  AppState.customer.activePlan = {
    id: pkg.id,
    name: pkg.name,
    data: pkg.data,
    price: pkg.price,
    validity: `${pkg.validityDays} Days Remaining`,
    autoRenewal: true
  };

  // Add data allocation to usage
  AppState.customer.usage.dataTotal = pkg.dataRaw;
  AppState.customer.usage.dataUsed = 0.0; // Reset usage for fresh plan

  // Create new transaction record
  const newTxn = {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    activity: `${pkg.name} Subscription`,
    method: 'Account Balance',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    amount: -pkg.price,
    type: 'subscription',
    status: 'Completed'
  };

  // Prepend transaction using unshift
  AppState.transactions.unshift(newTxn);

  // Save & update UI
  saveStateToStorage();
  updateDashboardUI();
  renderTransactions('all');
  filterAndSortPackages(); // Re-render to reflect "Subscribed" badge

  // Close modal if open
  closeModal(DOM.packageModal);

  showToast(
    'Subscription Successful!',
    `You are now subscribed to ${pkg.name}. Enjoy blazing 5G connectivity!`,
    'success'
  );
}

/* ==========================================================================
   11. CALL & SMS PACKAGES RENDERING
   ========================================================================== */

/**
 * Renders Call and SMS bundles for a given category tab
 * @param {'daily'|'weekly'|'monthly'|'sms'} category
 */
function renderCallSMSPackages(category) {
  if (!DOM.callSmsContainer) return;

  const filtered = CALL_SMS_PACKAGES.filter(bundle => bundle.category === category);

  const cardsHTML = filtered.map(item => `
    <article class="call-card glass-card">
      <div class="call-card-header">
        <div>
          <h3 class="call-card-title">${item.name}</h3>
          <span class="call-card-validity"><i class="fa-regular fa-clock"></i> ${item.validity}</span>
        </div>
        <span class="call-card-badge">${item.badge}</span>
      </div>

      <div class="call-metrics-grid">
        <div class="call-metric-item">
          <span class="call-metric-label">On-Net Minutes</span>
          <span class="call-metric-val">${item.onNetMins}</span>
        </div>
        <div class="call-metric-item">
          <span class="call-metric-label">Off-Net Minutes</span>
          <span class="call-metric-val">${item.offNetMins}</span>
        </div>
        <div class="call-metric-item">
          <span class="call-metric-label">SMS Allowance</span>
          <span class="call-metric-val">${item.smsCount}</span>
        </div>
        <div class="call-metric-item">
          <span class="call-metric-label">Bonus Data</span>
          <span class="call-metric-val">${item.dataBonus}</span>
        </div>
      </div>

      <div class="modal-ussd-box" style="margin-bottom: 1.25rem;">
        <span>Dial Code:</span>
        <code>${item.ussdCode}</code>
      </div>

      <div class="call-card-footer">
        <div class="call-price-wrap">
          <span class="call-price-label">Price (Tax Incl.)</span>
          <span class="call-price-num">PKR ${item.price}</span>
        </div>
        <button class="btn btn-primary btn-sm btn-subscribe-call" data-id="${item.id}">
          <i class="fa-solid fa-phone"></i> Subscribe
        </button>
      </div>
    </article>
  `).join('');

  DOM.callSmsContainer.innerHTML = cardsHTML;

  // Attach subscribe listeners
  const callBtns = DOM.callSmsContainer.querySelectorAll('.btn-subscribe-call');
  callBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bundleId = e.currentTarget.getAttribute('data-id');
      handleCallBundleSubscribe(bundleId);
    });
  });
}

/**
 * Subscribes to a Call or SMS bundle
 * @param {string} bundleId
 */
function handleCallBundleSubscribe(bundleId) {
  const bundle = CALL_SMS_PACKAGES.find(b => b.id === bundleId);
  if (!bundle) return;

  if (AppState.customer.balance < bundle.price) {
    showToast(
      'Insufficient Balance',
      `You need PKR ${bundle.price} to activate ${bundle.name}. Please recharge first.`,
      'error'
    );
    return;
  }

  if (confirm(`Activate ${bundle.name} for PKR ${bundle.price}?`)) {
    AppState.customer.balance -= bundle.price;

    // Parse minutes to add if numeric
    const minsMatch = bundle.onNetMins.match(/\d+/);
    if (minsMatch) {
      AppState.customer.usage.minsTotal += parseInt(minsMatch[0], 10);
    }
    const smsMatch = bundle.smsCount.match(/\d+/);
    if (smsMatch) {
      AppState.customer.usage.smsTotal += parseInt(smsMatch[0], 10);
    }

    // Add transaction
    AppState.transactions.unshift({
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      activity: `${bundle.name} Activation`,
      method: 'Account Balance',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: -bundle.price,
      type: 'subscription',
      status: 'Completed'
    });

    saveStateToStorage();
    updateDashboardUI();
    renderTransactions('all');

    showToast('Bundle Activated!', `${bundle.name} is now active on your number.`, 'success');
  }
}

/* ==========================================================================
   12. SERVICES, TESTIMONIALS & FAQ RENDERING
   ========================================================================== */

/**
 * Dynamically renders the 7 Core Services cards
 */
function renderServices() {
  if (!DOM.servicesContainer) return;

  const html = SERVICES_DATA.map(srv => `
    <article class="service-card" data-service-id="${srv.id}">
      <div class="service-icon-wrap">
        <i class="fa-solid ${srv.icon}"></i>
      </div>
      <h3>${srv.title}</h3>
      <p>${srv.shortDesc}</p>
      
      <div class="service-perks-list">
        ${srv.features.map(f => `<div class="service-perk"><i class="fa-solid fa-angle-right"></i> <span>${f}</span></div>`).join('')}
      </div>

      <span class="service-explore-link">
        <span>Explore Details</span>
        <i class="fa-solid fa-arrow-right"></i>
      </span>
    </article>
  `).join('');

  DOM.servicesContainer.innerHTML = html;

  // Add click to open service modal
  const cards = DOM.servicesContainer.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const srvId = card.getAttribute('data-service-id');
      const service = SERVICES_DATA.find(s => s.id === srvId);
      if (service) openServiceModal(service);
    });
  });
}

function openServiceModal(service) {
  DOM.modalServiceIcon.innerHTML = `<i class="fa-solid ${service.icon}"></i>`;
  DOM.modalServiceTitle.textContent = service.title;
  DOM.modalServiceSub.textContent = service.badge;
  DOM.modalServiceDesc.textContent = service.longDesc;
  DOM.modalServiceFeatures.innerHTML = service.features.map(f => `
    <li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>
  `).join('');

  openModal(DOM.serviceModal);
}

/**
 * Renders Customer Testimonials cards
 */
function renderTestimonials() {
  if (!DOM.testimonialsContainer) return;

  const html = TESTIMONIALS_DATA.map(t => {
    const starsHTML = Array.from({ length: t.rating }, () => '<i class="fa-solid fa-star"></i>').join('');
    return `
      <div class="testimonial-card glass-card">
        <div class="testimonial-rating">${starsHTML}</div>
        <p class="testimonial-quote">"${t.quote}"</p>
        <div class="testimonial-author">
          <div class="author-avatar">${t.avatar}</div>
          <div class="author-info">
            <h4>${t.name}</h4>
            <span>${t.role}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  DOM.testimonialsContainer.innerHTML = html;
}

/**
 * Renders Interactive FAQ Accordion items with smooth expand/collapse
 */
function renderFAQs() {
  if (!DOM.faqAccordion) return;

  const html = FAQS_DATA.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      <button class="faq-question" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span>${faq.question}</span>
        <i class="fa-solid fa-chevron-down faq-icon-arrow"></i>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  DOM.faqAccordion.innerHTML = html;

  // Setup click toggling
  const faqItems = DOM.faqAccordion.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items (classic accordion behavior)
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   13. CUSTOMER DASHBOARD ENGINE
   ========================================================================== */

/**
 * Updates all dashboard statistics, meters, numbers, and badges in real-time
 */
function updateDashboardUI() {
  const { customer } = AppState;
  if (!customer) return;

  // Phone number and profile
  DOM.dashPhoneNumber.textContent = customer.phone;
  DOM.dashSubscriberName.textContent = customer.name;
  DOM.dashSimTier.textContent = customer.simTier || '5G Platinum eSIM';

  // Balance displays
  const formattedBalance = customer.balance.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  DOM.dashBalanceDisplay.textContent = formattedBalance;
  DOM.navBalanceVal.textContent = `PKR ${customer.balance.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;

  // Mobile drawer balance sync
  const mobileDrawerBalance = document.getElementById('mobile-drawer-balance');
  if (mobileDrawerBalance) {
    mobileDrawerBalance.textContent = `PKR ${formattedBalance}`;
  }

  // Active Plan
  if (customer.activePlan) {
    DOM.dashActivePlanName.textContent = customer.activePlan.name;
    DOM.dashPlanExpiry.textContent = customer.activePlan.validity;
    DOM.dashPlanCost.textContent = `PKR ${customer.activePlan.price.toLocaleString()}`;
    DOM.autoRenewalToggle.checked = customer.activePlan.autoRenewal !== false;
  } else {
    DOM.dashActivePlanName.textContent = 'No Active Plan';
    DOM.dashPlanExpiry.textContent = 'Expired';
    DOM.dashPlanCost.textContent = 'PKR 0';
    DOM.autoRenewalToggle.checked = false;
  }

  // Internet Data Meter
  const dataTotal = customer.usage.dataTotal || 15;
  const dataUsed = Math.min(customer.usage.dataUsed || 0, dataTotal);
  const dataRemaining = Math.max(0, dataTotal - dataUsed);
  const dataPercent = Math.round((dataRemaining / dataTotal) * 100);

  DOM.dashDataSummary.textContent = `${dataRemaining.toFixed(1)} GB / ${dataTotal.toFixed(1)} GB`;
  DOM.dashDataBar.style.width = `${dataPercent}%`;
  DOM.dashDataPercent.textContent = `${dataPercent}% Left`;

  // Minutes Meter
  const minsTotal = customer.usage.minsTotal || 1000;
  const minsUsed = Math.min(customer.usage.minsUsed || 0, minsTotal);
  const minsRemaining = Math.max(0, minsTotal - minsUsed);
  const minsPercent = Math.round((minsRemaining / minsTotal) * 100);

  DOM.dashMinsSummary.textContent = `${minsRemaining} / ${minsTotal} Mins`;
  DOM.dashMinsBar.style.width = `${minsPercent}%`;
  DOM.dashMinsPercent.textContent = `${minsPercent}% Left`;

  // SMS Meter
  const smsTotal = customer.usage.smsTotal || 1000;
  const smsUsed = Math.min(customer.usage.smsUsed || 0, smsTotal);
  const smsRemaining = Math.max(0, smsTotal - smsUsed);
  const smsPercent = Math.round((smsRemaining / smsTotal) * 100);

  DOM.dashSmsSummary.textContent = `${smsRemaining} / ${smsTotal} SMS`;
  DOM.dashSmsBar.style.width = `${smsPercent}%`;
  DOM.dashSmsPercent.textContent = `${smsPercent}% Left`;
}

/**
 * Dynamically renders the Transaction & Subscription History table
 * Uses Array.filter() and Array.map()
 * @param {'all'|'recharge'|'subscription'} filterType
 */
function renderTransactions(filterType = 'all') {
  if (!DOM.transactionsBody) return;

  let filtered = AppState.transactions;
  if (filterType !== 'all') {
    filtered = AppState.transactions.filter(t => t.type === filterType);
  }

  DOM.txCountDisplay.textContent = `Showing ${filtered.length} transaction${filtered.length === 1 ? '' : 's'}`;

  if (filtered.length === 0) {
    DOM.transactionsBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <i class="fa-solid fa-receipt" style="font-size: 1.8rem; margin-bottom: 0.5rem; display: block;"></i>
          No transaction history found for this filter.
        </td>
      </tr>
    `;
    return;
  }

  const rowsHTML = filtered.map(t => {
    const isCredit = t.amount > 0;
    const amountClass = isCredit ? 'amount-plus' : 'amount-minus';
    const amountSign = isCredit ? '+' : '';
    const formattedAmount = `${amountSign}PKR ${Math.abs(t.amount).toLocaleString()}`;

    return `
      <tr>
        <td><code>${t.id}</code></td>
        <td><strong>${t.activity}</strong></td>
        <td><i class="fa-solid ${t.type === 'recharge' ? 'fa-wallet' : 'fa-sim-card'}"></i> ${t.method}</td>
        <td>${t.date}</td>
        <td class="${amountClass}">${formattedAmount}</td>
        <td><span class="badge-success">${t.status}</span></td>
      </tr>
    `;
  }).join('');

  DOM.transactionsBody.innerHTML = rowsHTML;
}

/**
 * Sets up history table filter pill buttons
 */
function setupHistoryFilterListeners() {
  DOM.txFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      DOM.txFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-txfilter');
      renderTransactions(filter);
    });
  });

  // Clear history button
  DOM.btnClearHistory.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your transaction history log?')) {
      AppState.transactions = [];
      saveStateToStorage();
      renderTransactions('all');
      showToast('History Cleared', 'All transaction records have been erased.', 'info');
    }
  });

  // Edit phone number button
  DOM.btnEditPhone.addEventListener('click', () => {
    DOM.editPhoneInput.value = AppState.customer.phone;
    DOM.editPhoneError.classList.remove('visible');
    openModal(DOM.phoneModal);
  });

  // Save new phone number
  DOM.modalPhoneSave.addEventListener('click', () => {
    const newPhone = DOM.editPhoneInput.value.trim();
    if (!isValidPhoneNumber(newPhone)) {
      DOM.editPhoneError.classList.add('visible');
      return;
    }
    AppState.customer.phone = newPhone;
    saveStateToStorage();
    updateDashboardUI();
    closeModal(DOM.phoneModal);
    showToast('Number Updated', `Registered phone set to ${newPhone}`, 'success');
  });

  // Reset demo data button
  DOM.btnResetDemo.addEventListener('click', resetAllDemoData);
}

/* ==========================================================================
   14. RECHARGE SYSTEM SIMULATION
   ========================================================================== */

/**
 * Updates real-time tax calculation breakdown preview
 */
function updateRechargeCalculations() {
  const amountVal = parseFloat(DOM.rechargeAmountInput.value) || 0;
  const breakdown = calculateRechargeBreakdown(amountVal);

  DOM.previewGrossVal.textContent = `PKR ${breakdown.gross.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
  DOM.previewTaxVal.textContent = `- PKR ${breakdown.tax.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
  DOM.previewNetVal.textContent = `PKR ${breakdown.net.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;

  AppState.rechargeDraft.grossAmount = breakdown.gross;
  AppState.rechargeDraft.tax = breakdown.tax;
  AppState.rechargeDraft.netAmount = breakdown.net;
}

/**
 * Sets up Recharge Form events, preset chips, live tax calculator, and confirmation modal
 */
function setupRechargeEngine() {
  if (!DOM.rechargeForm) return;

  // Preset chips click
  const presetChips = DOM.amountPresetsGroup.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const amount = parseFloat(chip.getAttribute('data-amount'));
      DOM.rechargeAmountInput.value = amount;
      DOM.amountError.classList.remove('visible');
      updateRechargeCalculations();
    });
  });

  // Custom amount input event
  DOM.rechargeAmountInput.addEventListener('input', () => {
    // Deselect preset chips if custom value doesn't match
    const currentVal = DOM.rechargeAmountInput.value;
    presetChips.forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-amount') === currentVal);
    });
    DOM.amountError.classList.remove('visible');
    updateRechargeCalculations();
  });

  // Payment method selection radio
  const methodCards = DOM.paymentMethodsGroup.querySelectorAll('.payment-method-card');
  methodCards.forEach(card => {
    card.addEventListener('click', () => {
      methodCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        const methodTitle = card.querySelector('.method-info strong').textContent;
        AppState.rechargeDraft.method = methodTitle;
      }
    });
  });

  // Live phone number validation feedback
  DOM.rechargePhone.addEventListener('input', () => {
    const val = DOM.rechargePhone.value.trim();
    if (val.length === 0) {
      DOM.phoneValidationBadge.className = 'input-validation-indicator';
      DOM.phoneValidationBadge.innerHTML = '';
      DOM.phoneError.classList.remove('visible');
      return;
    }

    if (isValidPhoneNumber(val)) {
      DOM.phoneValidationBadge.className = 'input-validation-indicator valid';
      DOM.phoneValidationBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      DOM.phoneError.classList.remove('visible');
      DOM.rechargePhone.classList.remove('is-invalid');
      DOM.rechargePhone.classList.add('is-valid');
    } else {
      DOM.phoneValidationBadge.className = 'input-validation-indicator invalid';
      DOM.phoneValidationBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      DOM.rechargePhone.classList.remove('is-valid');
    }
  });

  // Recharge Form Submission
  DOM.rechargeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = DOM.rechargePhone.value.trim();
    const amount = parseFloat(DOM.rechargeAmountInput.value);

    let hasError = false;

    // Validate phone
    if (!isValidPhoneNumber(phone)) {
      DOM.phoneError.classList.add('visible');
      DOM.rechargePhone.classList.add('is-invalid');
      hasError = true;
    } else {
      DOM.phoneError.classList.remove('visible');
      DOM.rechargePhone.classList.remove('is-invalid');
    }

    // Validate amount (50 to 50,000)
    if (isNaN(amount) || amount < 50 || amount > 50000) {
      DOM.amountError.classList.add('visible');
      DOM.rechargeAmountInput.classList.add('is-invalid');
      hasError = true;
    } else {
      DOM.amountError.classList.remove('visible');
      DOM.rechargeAmountInput.classList.remove('is-invalid');
    }

    if (hasError) return;

    // Populate confirmation modal
    AppState.rechargeDraft.phone = phone;
    DOM.confirmPhone.textContent = phone;
    DOM.confirmAmount.textContent = `PKR ${amount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
    DOM.confirmTax.textContent = `- PKR ${AppState.rechargeDraft.tax.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
    DOM.confirmNet.textContent = `PKR ${AppState.rechargeDraft.netAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
    DOM.confirmMethod.textContent = AppState.rechargeDraft.method;

    openModal(DOM.rechargeConfirmModal);
  });

  // Confirm Payment in Modal
  DOM.modalRechargeConfirmBtn.addEventListener('click', () => {
    processRechargePayment();
  });
}

/**
 * Simulates payment processing with loading spinner, credits customer balance, and saves state
 */
function processRechargePayment() {
  const { grossAmount, netAmount, phone, method } = AppState.rechargeDraft;

  // Show loading spinner on confirm button
  DOM.modalRechargeConfirmBtn.disabled = true;
  DOM.rechargeBtnLabel.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Payment...';

  setTimeout(() => {
    // Credit net balance
    AppState.customer.balance += netAmount;

    // Log transaction
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      activity: `Online Easyload Recharge (${phone})`,
      method: method,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: netAmount,
      type: 'recharge',
      status: 'Completed'
    };

    AppState.transactions.unshift(newTxn);

    // Persist & Update UI
    saveStateToStorage();
    updateDashboardUI();
    renderTransactions('all');

    // Reset button & close modal
    DOM.modalRechargeConfirmBtn.disabled = false;
    DOM.rechargeBtnLabel.innerHTML = '<i class="fa-solid fa-check"></i> Confirm & Pay';
    closeModal(DOM.rechargeConfirmModal);

    // Reset form
    DOM.rechargeForm.reset();
    DOM.rechargePhone.classList.remove('is-valid');
    DOM.phoneValidationBadge.innerHTML = '';
    DOM.rechargeAmountInput.value = 500;
    updateRechargeCalculations();

    showToast(
      'Recharge Successful!',
      `PKR ${netAmount.toLocaleString()} credited to ${phone}. Thank you!`,
      'success',
      6000
    );
  }, 1200); // 1.2s realistic simulation delay
}

/* ==========================================================================
   15. 5G SPEED TEST SIMULATOR ENGINE
   ========================================================================== */

/**
 * Simulates a high-performance 5G speed benchmark with realistic needle acceleration
 */
function initSpeedTestSimulator() {
  if (!DOM.btnStartSpeedtest) return;

  let isRunning = false;

  DOM.btnStartSpeedtest.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;

    DOM.btnStartSpeedtest.disabled = true;
    DOM.btnStartSpeedtest.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Benchmarking 5G...';
    DOM.speedStatus.textContent = 'Testing Ping...';
    DOM.speedStatus.style.color = 'var(--secondary)';

    // Step 1: Simulate Ping & Jitter
    setTimeout(() => {
      const pingVal = Math.floor(3 + Math.random() * 3); // 3 - 5 ms
      const jitterVal = (Math.random() * 1.5).toFixed(1);
      DOM.testLatency.textContent = `${pingVal} ms`;
      DOM.testJitter.textContent = `${jitterVal} ms`;
      DOM.speedStatus.textContent = 'Testing 5G Downlink...';

      // Step 2: Animate speed counter up to 1,200 - 1,480 Mbps
      const targetSpeed = Math.floor(1250 + Math.random() * 230);
      let current = 0;
      const step = targetSpeed / 40;

      const speedInterval = setInterval(() => {
        current += step;
        if (current >= targetSpeed) {
          current = targetSpeed;
          clearInterval(speedInterval);

          // Step 3: Finish and display Upload speed
          setTimeout(() => {
            const uploadVal = Math.floor(280 + Math.random() * 90);
            DOM.testUpload.textContent = `${uploadVal} Mbps`;
            DOM.speedStatus.textContent = 'Ultra Fast 5G';
            DOM.speedStatus.style.color = 'var(--success)';
            DOM.btnStartSpeedtest.disabled = false;
            DOM.btnStartSpeedtest.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Test Again';
            isRunning = false;

            showToast(
              'Benchmark Finished',
              `Peak 5G Download: ${targetSpeed} Mbps | Latency: ${pingVal} ms`,
              'success'
            );
          }, 400);
        }
        DOM.speedReading.textContent = current.toFixed(1);
      }, 35);

    }, 800);
  });
}

/* ==========================================================================
   16. CONTACT & SUPPORT FORM VALIDATION
   ========================================================================== */

/**
 * Handles Contact Form validation with real-time field error indicators
 */
function setupContactForm() {
  if (!DOM.contactForm) return;

  DOM.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = DOM.contactName.value.trim();
    const email = DOM.contactEmail.value.trim();
    const phone = DOM.contactPhone.value.trim();
    const subject = DOM.contactSubject.value;
    const message = DOM.contactMessage.value.trim();

    let isValid = true;

    // Validate Name (>= 3 chars)
    if (name.length < 3) {
      document.getElementById('contact-name-error').classList.add('visible');
      DOM.contactName.classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('contact-name-error').classList.remove('visible');
      DOM.contactName.classList.remove('is-invalid');
    }

    // Validate Email
    if (!isValidEmail(email)) {
      document.getElementById('contact-email-error').classList.add('visible');
      DOM.contactEmail.classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('contact-email-error').classList.remove('visible');
      DOM.contactEmail.classList.remove('is-invalid');
    }

    // Validate Phone
    if (!isValidPhoneNumber(phone)) {
      document.getElementById('contact-phone-error').classList.add('visible');
      DOM.contactPhone.classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('contact-phone-error').classList.remove('visible');
      DOM.contactPhone.classList.remove('is-invalid');
    }

    // Validate Subject
    if (!subject) {
      document.getElementById('contact-subject-error').classList.add('visible');
      DOM.contactSubject.classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('contact-subject-error').classList.remove('visible');
      DOM.contactSubject.classList.remove('is-invalid');
    }

    // Validate Message (>= 15 chars)
    if (message.length < 15) {
      document.getElementById('contact-message-error').classList.add('visible');
      DOM.contactMessage.classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('contact-message-error').classList.remove('visible');
      DOM.contactMessage.classList.remove('is-invalid');
    }

    if (!isValid) return;

    // Generate simulated ticket number
    const ticketId = `TC-${Math.floor(10000 + Math.random() * 90000)}`;

    // Reset Form
    DOM.contactForm.reset();

    showToast(
      'Support Ticket Created',
      `Ticket #${ticketId} submitted. A customer engineer will contact you shortly.`,
      'success',
      7000
    );
  });
}

/**
 * Handles Newsletter Subscription
 */
function setupNewsletterForm() {
  if (!DOM.newsletterForm) return;

  DOM.newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = DOM.newsletterEmail.value.trim();

    if (!isValidEmail(email)) {
      DOM.newsletterFeedback.className = 'newsletter-feedback error';
      DOM.newsletterFeedback.textContent = 'Please enter a valid email address.';
      return;
    }

    DOM.newsletterFeedback.className = 'newsletter-feedback success';
    DOM.newsletterFeedback.textContent = 'Subscribed successfully! Check your inbox for exclusive promos.';
    DOM.newsletterForm.reset();

    showToast('Subscribed!', 'Welcome to TeleConnect VIP updates.', 'success');

    setTimeout(() => {
      DOM.newsletterFeedback.textContent = '';
    }, 5000);
  });
}

/* ==========================================================================
   17. NAVIGATION, SCROLL EVENTS & COUNTERS
   ========================================================================== */

/**
 * Mobile Drawer Menu Toggle and Overlay
 */
function setupMobileNavigation() {
  const toggleBtn = DOM.mobileToggle;
  const nav = DOM.mainNav;
  const overlay = DOM.mobileOverlay;
  const closeBtn = document.getElementById('mobile-nav-close');
  const mobileRechargeBtn = document.querySelector('.mobile-drawer-recharge');

  function openDrawer() {
    nav.classList.add('open');
    overlay.classList.add('active');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    nav.classList.remove('open');
    overlay.classList.remove('active');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (nav.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (mobileRechargeBtn) {
    mobileRechargeBtn.addEventListener('click', closeDrawer);
  }

  // Close when clicking nav links
  DOM.navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Reset overflow and close if resized to desktop (> 1024px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && nav.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * Sticky header shadow, active link highlighting on scroll, and scroll-to-top ring
 */
function setupScrollEngine() {
  const header = DOM.header;
  const scrollTopBtn = DOM.scrollTopBtn;
  const ringFill = DOM.scrollRingFill;
  const circumference = 125.6; // 2 * PI * 20

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header sticky styling
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility & circular SVG progress
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
      const scrollPercent = scrollY / docHeight;
      const offset = circumference - (scrollPercent * circumference);
      ringFill.style.strokeDashoffset = offset;
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Highlight active nav link based on scroll position
    highlightActiveNavLink();
  });

  // Scroll to top click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Highlights corresponding nav item as user scrolls through sections
 */
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      DOM.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/**
 * Animated statistics numbers (counts up from 0 when section enters viewport)
 * Implements IntersectionObserver
 */
function initStatsCounter() {
  const statBoxes = document.querySelectorAll('.stat-box');
  if (!statBoxes.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const box = entry.target;
        const counterEl = box.querySelector('.counter');
        const targetVal = parseFloat(box.getAttribute('data-target'));
        const isDecimal = targetVal % 1 !== 0;

        let start = 0;
        const duration = 2000;
        const steps = 50;
        const increment = targetVal / steps;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= targetVal) {
            start = targetVal;
            clearInterval(timer);
          }
          counterEl.textContent = isDecimal ? start.toFixed(2) : Math.floor(start).toLocaleString();
        }, intervalTime);

        obs.unobserve(box); // Run animation once
      }
    });
  }, { threshold: 0.3 });

  statBoxes.forEach(box => observer.observe(box));
}

/* ==========================================================================
   18. EVENT LISTENERS INITIALIZATION
   ========================================================================== */
function setupGeneralEventListeners() {
  // Package Category Filters
  const categoryChips = DOM.packageCategoryFilters.querySelectorAll('.filter-chip');
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      AppState.activeCategoryFilter = chip.getAttribute('data-category');
      filterAndSortPackages();
    });
  });

  // Package Search Input (Live debounced filter)
  let searchDebounceTimer;
  DOM.packageSearchInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounceTimer);
    const val = e.target.value;
    DOM.clearPackageSearch.classList.toggle('visible', val.length > 0);
    searchDebounceTimer = setTimeout(() => {
      AppState.activeSearchQuery = val;
      filterAndSortPackages();
    }, 200);
  });

  // Clear package search button
  DOM.clearPackageSearch.addEventListener('click', () => {
    DOM.packageSearchInput.value = '';
    DOM.clearPackageSearch.classList.remove('visible');
    AppState.activeSearchQuery = '';
    filterAndSortPackages();
  });

  // Package Sort Select
  DOM.packageSortSelect.addEventListener('change', (e) => {
    AppState.activeSortOption = e.target.value;
    filterAndSortPackages();
  });

  // Reset Package Filters on empty state
  DOM.resetPackageFilters.addEventListener('click', () => {
    AppState.activeCategoryFilter = 'all';
    AppState.activeSearchQuery = '';
    AppState.activeSortOption = 'featured';

    categoryChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-category') === 'all'));
    DOM.packageSearchInput.value = '';
    DOM.clearPackageSearch.classList.remove('visible');
    DOM.packageSortSelect.value = 'featured';

    filterAndSortPackages();
  });

  // Call & SMS Category Tabs
  DOM.callSmsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.callSmsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-tab');
      AppState.activeCallTab = cat;
      renderCallSMSPackages(cat);
    });
  });

  // Package Modal Buttons
  DOM.modalPkgClose.addEventListener('click', () => closeModal(DOM.packageModal));
  DOM.modalPkgCancel.addEventListener('click', () => closeModal(DOM.packageModal));
  DOM.modalPkgSubscribeBtn.addEventListener('click', () => {
    if (AppState.selectedPackageForModal) {
      handleSubscribeInitiation(AppState.selectedPackageForModal.id);
    }
  });

  // Recharge Modal Cancel/Close
  DOM.modalRechargeClose.addEventListener('click', () => closeModal(DOM.rechargeConfirmModal));
  DOM.modalRechargeCancel.addEventListener('click', () => closeModal(DOM.rechargeConfirmModal));

  // Phone Edit Modal Cancel/Close
  DOM.modalPhoneClose.addEventListener('click', () => closeModal(DOM.phoneModal));
  DOM.modalPhoneCancel.addEventListener('click', () => closeModal(DOM.phoneModal));

  // Service Modal Close
  DOM.modalServiceClose.addEventListener('click', () => closeModal(DOM.serviceModal));
  DOM.modalServiceDone.addEventListener('click', () => closeModal(DOM.serviceModal));

  // Auto-renewal toggle change
  DOM.autoRenewalToggle.addEventListener('change', (e) => {
    if (AppState.customer.activePlan) {
      AppState.customer.activePlan.autoRenewal = e.target.checked;
      saveStateToStorage();
      showToast(
        'Auto-Renewal Updated',
        `Package auto-renewal is now ${e.target.checked ? 'Enabled' : 'Disabled'}.`,
        'info'
      );
    }
  });

  // Set current copyright year
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   19. APPLICATION INITIALIZATION (ENTRY POINT)
   ========================================================================== */
function initTeleConnectApp() {
  console.log('%c🚀 TeleConnect Engine Initialized | Pure Vanilla JavaScript ES6+', 'color: #00d2ff; font-weight: bold; font-size: 14px;');

  // 1. Initialize Theme from storage
  initThemeEngine();

  // 2. Load Customer & Transaction Data
  loadStateFromStorage();

  // 3. Render Packages & Catalogs
  filterAndSortPackages();
  renderCallSMSPackages('daily');
  renderServices();
  renderTestimonials();
  renderFAQs();

  // 4. Render Dashboard and Usage Meters
  updateDashboardUI();
  renderTransactions('all');

  // 5. Initialize Interactive Subsystems
  setupModalListeners();
  setupHistoryFilterListeners();
  setupRechargeEngine();
  updateRechargeCalculations();
  initSpeedTestSimulator();
  setupContactForm();
  setupNewsletterForm();
  setupMobileNavigation();
  setupScrollEngine();
  initStatsCounter();
  setupGeneralEventListeners();
}

// Run application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTeleConnectApp);
} else {
  initTeleConnectApp();
}
