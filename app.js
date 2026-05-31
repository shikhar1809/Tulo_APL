let properties = [];
let rentRows = [];
let requests = [];
let tenantRentHistory = [];
let tenantRequests = [];
let listingDraft = {
  name: "",
  type: "PG",
  address: "",
  rent: "",
  deposit: "",
  maintenance: "Included",
  furnishing: "",
  restrictions: "",
  availability: "",
  sourceText: ""
};

const LANGUAGES = {
  en: { label: "English", native: "English" },
  hi: { label: "हिन्दी", native: "हिन्दी" },
  ur: { label: "اردو", native: "اردو" },
  bn: { label: "বাংলা", native: "বাংলা" },
  mr: { label: "मराठी", native: "मराठी" },
  ta: { label: "தமிழ்", native: "தமிழ்" },
  te: { label: "తెలుగు", native: "తెలుగు" },
};

const TRANSLATIONS = {
  en: {
    "app.title": "TULO Lucknow",
    "auth.eyebrow": "Choose your app",
    "auth.title": "Sign in to TULO",
    "auth.copy": "Use your Google account to continue as a tenant or landlord.",
    "auth.landlord": "Landlord",
    "auth.landlord.desc": "Manage properties, rent, maintenance, posters, and AI workflows.",
    "auth.tenant": "Tenant",
    "auth.tenant.desc": "Pay rent, view lease details, track maintenance, and access receipts.",
    "auth.google": "Continue with Google",
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.rent": "Rent",
    "nav.map": "Map",
    "nav.tools": "Tools",
    "nav.property": "Explore",
    "nav.rentRepair": "Rent & Repair",
    "nav.ai": "Conceirage",
    "nav.properties.title": "Properties & Maintenance",
    "nav.rent.title": "Rent & Tenant View",
    "nav.map.title": "Lucknow Map",
    "nav.tools.title": "Tools",
    "session.landlord": "Manage verified listings",
    "session.tenant": "Find a verified home faster",
    "page.dashboard": "Home",
    "page.properties": "Properties",
    "page.maintenance": "Maintenance",
    "page.rentTenant": "Rent & Tenant View",
    "page.mapView": "Lucknow Map",
    "page.aiAndPosters": "Tools",
    "page.propertyDetailsView": "Property Details",
    "page.propertyDetail.desc": "Everything you need to know about this listing.",
    "page.tenantHome": "Home",
    "page.tenantProperty": "My Property & Lease",
    "page.tenantRentAndRepair": "Rent & Maintenance",
    "page.tenantAi": "TULO AI Concierge",
    "tenant.welcome.title": "Continue your verified search",
    "tenant.welcome.desc": "Your shortlist, visit reminders, and transparent deal sheets stay in one place.",
    "tenant.brokerage.saved": "Brokerage saved if you close via TULO",
    "tenant.continue.search": "Continue Search",
    "tenant.quick.links": "Quick Links",
    "tenant.report.issue": "Report Issue",
    "tenant.view.lease": "View Lease",
    "tenant.ask.ai": "Ask Conceirage",
    "tenant.recent.updates": "Recent Updates",
    "tenant.rent.title": "Rent & Receipts",
    "tenant.rent.desc": "Track your payments and download receipts for HRA.",
    "tenant.maintenance": "Maintenance",
    "tenant.maintenance.desc": "Submit and track repair requests.",
    "tenant.property.title": "Explore Properties",
    "tenant.property.desc": "Find the perfect personalized property using AI matching.",
    "tenant.ai.title": "TULO AI Conceirage",
    "tenant.ai.desc": "Ask anything about your lease, property rules, or request help drafting messages.",
    "role.landlord": "Landlord",
    "role.tenant": "Tenant",
    "signout": "Sign out",
    "stat.listed": "Listed",
    "stat.listed.detail": "Public and attested",
    "stat.brokerage": "Brokerage saved",
    "stat.brokerage.detail": "Zero brokerage proof",
    "stat.attention": "Needs attention",
    "bell.pill": "Bell",
    "bell.title": "Incoming requests",
    "bell.open": "Open properties",
    "attention.pill": "Attention",
    "attention.title": "Top things to fix",
    "attention.add": "Add property",
    "attention.clear": "Clear",
    "attention.count": "{n} property needs attention",
    "attention.delisted": "Delisted",
    "attention.fix": "Fix",
    "attention.allClear": "All properties clear",
    "attention.allClear.detail": "Live listings have fresh attested videos.",
    "home.your.properties": "Your Properties",
    "home.view.all": "View all",
    "props.tab.properties": "Properties",
    "props.tab.maintenance": "Maintenance",
    "props.add": "+ Add Property",
    "props.desc": "Manage units and repair work from one operating view.",
    "props.maint.title": "Maintenance Requests",
    "props.maint.new": "+ New Request",
    "props.maint.desc": "Track and manage maintenance requests from tenants.",
    "map.filter.all": "All",
    "map.filter.pg": "PG (Green)",
    "map.filter.flat": "Flat (Yellow)",
    "map.filter.commercial": "Commercial (Blue)",
    "map.overlay.predictor": "Rent Predictor",
    "map.overlay.ranking": "Top Rankings",
    "map.predictor.locality": "Locality",
    "map.predictor.locality.ph": "e.g. Gomti Nagar, Indira Nagar",
    "map.predictor.type": "Type",
    "map.predictor.bhk": "BHK",
    "map.predictor.btn": "Predict Rent",
    "map.predictor.placeholder": "Enter details to get predicted rent range.",
    "map.predictor.savings": "Save",
    "map.marker.type": "Type:",
    "map.marker.rent": "Rent:",
    "map.marker.brokerage": "Brokerage:",
    "map.marker.view": "View Property",
    "map.result.noestimate": 'Could not estimate for "{loc}".',
    "map.result.try": "Try Gomti Nagar, Indira Nagar, Hazratganj, etc.",
    "map.ranking.empty": "No live listings to rank yet.",
    "tools.eyebrow": "Owner Tools",
    "tools.title": "Tools",
    "tools.desc": "Run small owner workflows from one place: poster, maintenance, lease, KYC, and vacancy listing.",
    "tools.poster.title": "Poster Maker",
    "tools.poster.desc": "Create rental posters with templates, AI copy, and export to PNG for WhatsApp or Instagram.",
    "tools.poster.btn": "Open Poster Maker",
    "tools.maintenance.title": "Smart Maintenance Router",
    "tools.maintenance.desc": "Classify priority, draft tenant reply, and suggest the right caretaker in seconds.",
    "tools.maintenance.btn": "Generate route",
    "tools.lease.title": "Lease Autofill",
    "tools.lease.desc": "Pre-fill lease terms from property, unit, rent, deposit, landlord, and tenant records.",
    "tools.lease.btn": "Generate lease fields",
    "tools.kyc.title": "KYC Review",
    "tools.kyc.desc": "Check Aadhaar document type, name match, and image quality as an advisory review.",
    "tools.kyc.btn": "Review sample",
    "tools.vacancy.title": "Vacancy listing",
    "tools.vacancy.desc": "Create a Lucknow-local listing using verified amenities and attest-video trust cues.",
    "tools.vacancy.btn": "Generate",
    "tools.placeholder": "Choose a tool above to get started.",
    "tools.gemini.ready": "Gemini is ready for poster copy, reminders, maintenance triage, and tenant invites.",
    "tools.gemini.missing": "Gemini key missing locally. Add config.local.js or save a key in this browser.",
    "rent.title": "Rent & Tenant View",
    "rent.desc": "Collections, overdue action, and the tenant-side experience together.",
    "rent.reminders": "Send reminders",
    "rent.unit": "Unit",
    "rent.tenant": "Tenant",
    "rent.amount": "Amount",
    "rent.status": "Status",
    "rent.action": "Action",
    "poster.headline": "Poster Maker",
    "poster.rent": "Rent amount",
    "poster.locality": "Locality",
    "poster.headline.input": "Poster headline",
    "poster.generate": "Generate poster copy",
    "poster.export": "Export poster",
    "poster.placeholder": "Create poster copy, amenities, and share captions for WhatsApp or Instagram.",
    "notification.title": "Notifications",
    "notification.desc": "Incoming visit requests.",
    "notification.visit": "Visit Requests",
    "notification.empty": "No visit requests yet.",
    "det.heading": "Property Details",
    "det.back": "Back to Map",
    "det.rating": "TULO trust score",
    "det.momentum.match": "Match score",
    "det.momentum.shortlisted": "Shortlisted",
    "det.momentum.response": "Owner response",
    "sidebar.title": "Trust system",
    "sidebar.subtitle": "Verified listings only",
    "sidebar.desc": "Fresh video, transparent terms, and no brokerage nudges stay visible.",
    "empty.maint": "No maintenance requests.",
    "maint.updated": "Updated today",
    "owner.empty": "No incoming requests",
    "owner.empty.detail": "Keep listings fresh to stay discoverable",
    "owner.empty.status": "Clear",
    "owner.unit.fallback": "Property request",
    "owner.status.fallback": "New",
    "all.clear": "All listings are clear",
    "attention.clear": "Clear",
    "modal.add.title": "Add property",
    "modal.add.desc": "Speak or type the property story. TULO extracts the listing, then asks only for missing details.",
    "modal.add.source": "Message to listing",
    "modal.add.source.ph": "Example: 2BHK in Gomti Nagar, semi furnished, rent 18000, deposit 2 months, available from 1 June, family preferred.",
    "modal.add.voice": "Voice guide",
    "modal.add.extract": "Extract listing",
    "modal.add.save": "Save blocked draft",
    "modal.attest.title": "Attest property",
    "modal.attest.desc": "Record a timestamped walkthrough up to 3 minutes. The uploaded video expires after 90 days and cannot be edited.",
    "modal.attest.upload": "Upload attest video",
    "modal.request.title": "New maintenance request",
    "modal.request.cat": "Category",
    "modal.request.cat.ph": "Plumbing",
    "modal.request.pri": "Priority",
    "modal.request.pri.ph": "Medium",
    "modal.request.desc": "Description",
    "modal.request.desc.ph": "Describe the issue",
    "modal.request.submit": "Submit request",
    "video.record": "Record Attested Video",
    "video.play": "Attested Property Video",
    "chat.placeholder": "Type your message here...",
    "chat.send": "Send",
    "pay.now": "Pay now (UPI/Card)",
  },
  hi: {
    "app.title": "TULO लखनऊ",
    "auth.eyebrow": "अपना ऐप चुनें",
    "auth.title": "TULO में साइन इन करें",
    "auth.copy": "लैंडलॉर्ड या किराएदार के रूप में जारी रखने के लिए अपने Google खाते का उपयोग करें।",
    "auth.landlord": "मकान मालिक",
    "auth.landlord.desc": "संपत्तियां, किराया, रखरखाव, पोस्टर और AI वर्कफ़्लो प्रबंधित करें।",
    "auth.tenant": "किराएदार",
    "auth.tenant.desc": "किराया दें, लीज़ विवरण देखें, रखरखाव ट्रैक करें और रसीदें प्राप्त करें।",
    "auth.google": "Google से जारी रखें",
    "nav.home": "होम",
    "nav.properties": "संपत्तियां",
    "nav.rent": "किराया",
    "nav.map": "मैप",
    "nav.tools": "टूल्स",
    "nav.property": "संपत्ति",
    "nav.rentRepair": "किराया और मरम्मत",
    "nav.ai": "AI सहायक",
    "nav.properties.title": "संपत्तियां और रखरखाव",
    "nav.rent.title": "किराया और किराएदार दृश्य",
    "nav.map.title": "लखनऊ मैप",
    "nav.tools.title": "टूल्स",
    "session.landlord": "सत्यापित लिस्टिंग प्रबंधित करें",
    "session.tenant": "तेज़ी से सत्यापित घर खोजें",
    "page.dashboard": "होम",
    "page.properties": "संपत्तियां",
    "page.maintenance": "रखरखाव",
    "page.rentTenant": "किराया और किराएदार",
    "page.mapView": "लखनऊ मैप",
    "page.aiAndPosters": "टूल्स",
    "page.propertyDetailsView": "संपत्ति विवरण",
    "page.propertyDetail.desc": "इस लिस्टिंग के बारे में वह सब कुछ जो आपको जानना चाहिए।",
    "page.tenantHome": "होम",
    "page.tenantProperty": "मेरी संपत्ति और लीज़",
    "page.tenantRentAndRepair": "किराया और रखरखाव",
    "page.tenantAi": "TULO AI सहायक",
    "tenant.welcome.title": "अपनी सत्यापित खोज जारी रखें",
    "tenant.welcome.desc": "आपकी शॉर्टलिस्ट, विज़िट रिमाइंडर और पारदर्शी डील शीट एक ही जगह पर।",
    "tenant.brokerage.saved": "यदि आप TULO के माध्यम से बंद करते हैं तो बचाई गई ब्रोकरेज",
    "tenant.continue.search": "खोज जारी रखें",
    "tenant.quick.links": "त्वरित लिंक",
    "tenant.report.issue": "समस्या की रिपोर्ट करें",
    "tenant.view.lease": "लीज़ देखें",
    "tenant.ask.ai": "AI से पूछें",
    "tenant.recent.updates": "हाल के अपडेट",
    "tenant.rent.title": "किराया और रसीदें",
    "tenant.rent.desc": "अपने भुगतान ट्रैक करें और HRA के लिए रसीदें डाउनलोड करें।",
    "tenant.maintenance": "रखरखाव",
    "tenant.maintenance.desc": "मरम्मत अनुरोध सबमिट और ट्रैक करें।",
    "tenant.property.title": "मेरी संपत्ति और लीज़",
    "tenant.property.desc": "संपत्ति विवरण, सुविधाएं और आपका डिजिटल समझौता।",
    "tenant.ai.title": "TULO AI कंसीयर्ज",
    "tenant.ai.desc": "अपने लीज़, संपत्ति नियमों के बारे में कुछ भी पूछें या संदेश ड्राफ्ट करने में सहायता लें।",
    "role.landlord": "मकान मालिक",
    "role.tenant": "किराएदार",
    "signout": "साइन आउट",
    "stat.listed": "लिस्टेड",
    "stat.listed.detail": "सार्वजनिक और प्रमाणित",
    "stat.brokerage": "ब्रोकरेज बचत",
    "stat.brokerage.detail": "शून्य ब्रोकरेज प्रमाण",
    "stat.attention": "ध्यान देने की ज़रूरत",
    "stat.attention.detail": "1 संपत्ति को ध्यान देने की आवश्यकता है",
    "bell.pill": "बेल",
    "bell.title": "इनकमिंग रिक्वेस्ट",
    "bell.open": "संपत्तियां खोलें",
    "attention.pill": "ध्यान दें",
    "attention.title": "ठीक करने लायक मुख्य चीज़ें",
    "attention.add": "संपत्ति जोड़ें",
    "home.your.properties": "आपकी संपत्तियां",
    "home.view.all": "सभी देखें",
    "props.tab.properties": "संपत्तियां",
    "props.tab.maintenance": "रखरखाव",
    "props.add": "+ संपत्ति जोड़ें",
    "props.desc": "एक ही व्यू से यूनिट और मरम्मत कार्य प्रबंधित करें।",
    "props.maint.title": "रखरखाव अनुरोध",
    "props.maint.new": "+ नया अनुरोध",
    "props.maint.desc": "किराएदारों से रखरखाव अनुरोध ट्रैक और प्रबंधित करें।",
    "map.filter.all": "सभी",
    "map.filter.pg": "PG (हरा)",
    "map.filter.flat": "फ़्लैट (पीला)",
    "map.filter.commercial": "वाणिज्यिक (नीला)",
    "map.overlay.predictor": "किराया अनुमानक",
    "map.overlay.ranking": "टॉप रैंकिंग",
    "map.predictor.locality": "इलाका",
    "map.predictor.locality.ph": "जैसे गोमती नगर, इंदिरा नगर",
    "map.predictor.type": "प्रकार",
    "map.predictor.bhk": "BHK",
    "map.predictor.btn": "किराया अनुमान लगाएं",
    "map.predictor.placeholder": "किराया अनुमान पाने के लिए विवरण दर्ज करें।",
    "map.predictor.enter": "किराया अनुमान पाने के लिए इलाके का नाम दर्ज करें।",
    "map.predictor.savings": "ब्रोकरेज में बचत",
    "map.marker.type": "प्रकार:",
    "map.marker.rent": "किराया:",
    "map.marker.brokerage": "ब्रोकरेज:",
    "map.marker.view": "संपत्ति देखें",
    "map.result.noestimate": '"{loc}" के लिए अनुमान नहीं लगा सके।',
    "map.result.try": "गोमती नगर, इंदिरा नगर, हज़रतगंज आदि आज़माएं।",
    "map.ranking.empty": "अभी तक रैंक करने के लिए कोई लाइव लिस्टिंग नहीं।",
    "tools.eyebrow": "मालिक उपकरण",
    "tools.title": "टूल्स",
    "tools.desc": "एक जगह से छोटे मालिक वर्कफ़्लो चलाएं: पोस्टर, रखरखाव, लीज़, KYC और वैकेंसी लिस्टिंग।",
    "tools.poster.title": "पोस्टर मेकर",
    "tools.poster.desc": "टेम्पलेट, AI कॉपी और WhatsApp या Instagram के लिए PNG एक्सपोर्ट के साथ किराये के पोस्टर बनाएं।",
    "tools.poster.btn": "पोस्टर मेकर खोलें",
    "tools.maintenance.title": "स्मार्ट मेंटेनेंस राउटर",
    "tools.maintenance.desc": "प्राथमिकता तय करें, किराएदार को जवाब draft करें और सही केयरटेकर सुझाएं।",
    "tools.maintenance.btn": "रूट जनरेट करें",
    "tools.lease.title": "लीज़ ऑटोफ़िल",
    "tools.lease.desc": "संपत्ति, यूनिट, किराया, जमा, मालिक और किराएदार रिकॉर्ड से लीज़ शर्तें प्री-फ़िल करें।",
    "tools.lease.btn": "लीज़ फ़ील्ड जनरेट करें",
    "tools.kyc.title": "KYC समीक्षा",
    "tools.kyc.desc": "आधार दस्तावेज़ प्रकार, नाम मिलान और छवि गुणवत्ता की सलाहकार समीक्षा करें।",
    "tools.kyc.btn": "नमूना समीक्षा करें",
    "tools.vacancy.title": "रिक्ति लिस्टिंग",
    "tools.vacancy.desc": "सत्यापित सुविधाओं और प्रमाण-वीडियो विश्वास संकेतों का उपयोग करके लखनऊ-स्थानीय लिस्टिंग बनाएं।",
    "tools.vacancy.btn": "जनरेट करें",
    "tools.placeholder": "शुरू करने के लिए ऊपर एक उपकरण चुनें।",
    "tools.gemini.ready": "Gemini पोस्टर कॉपी, रिमाइंडर, मेंटेनेंस ट्रायेज और किराएदार निमंत्रण के लिए तैयार है।",
    "tools.gemini.missing": "Gemini कुंजी स्थानीय रूप से गुम है। अपने ब्राउज़र में config.local.js जोड़ें या कुंजी सहेजें।",
    "rent.title": "किराया और किराएदार दृश्य",
    "rent.desc": "संग्रह, बकाया कार्रवाई और किराएदार-पक्ष अनुभव एक साथ।",
    "rent.reminders": "रिमाइंडर भेजें",
    "rent.unit": "यूनिट",
    "rent.tenant": "किराएदार",
    "rent.amount": "राशि",
    "rent.status": "स्थिति",
    "rent.action": "कार्रवाई",
    "poster.headline": "पोस्टर मेकर",
    "poster.rent": "किराया राशि",
    "poster.locality": "इलाका",
    "poster.headline.input": "पोस्टर हेडलाइन",
    "poster.generate": "पोस्टर कॉपी जनरेट करें",
    "poster.export": "पोस्टर एक्सपोर्ट करें",
    "poster.placeholder": "WhatsApp या Instagram के लिए पोस्टर कॉपी, सुविधाएं और शेयर कैप्शन बनाएं।",
    "notification.title": "सूचनाएं",
    "notification.desc": "इनकमिंग विज़िट अनुरोध।",
    "notification.visit": "विज़िट अनुरोध",
    "notification.empty": "अभी तक कोई विज़िट अनुरोध नहीं।",
    "det.heading": "संपत्ति विवरण",
    "det.back": "मैप पर वापस जाएं",
    "det.asking": "किराया मांग",
    "det.coords": "निर्देशांक",
    "det.rating": "TULO विश्वास स्कोर",
    "det.contact": "मकान मालिक से संपर्क करें",
    "det.transparent": "पूरी तरह पारदर्शी",
    "det.transparent.desc": "संपर्क से पहले डील शीट",
    "det.deal.brokerage": "ब्रोकरेज",
    "det.deal.token": "विज़िट से पहले टोकन",
    "det.deal.deposit": "जमा",
    "det.deal.maintenance": "रखरखाव",
    "det.deal.notice": "नोटिस अवधि",
    "det.deal.video": "सत्यापित वीडियो",
    "det.nearby": "सत्यापित आस-पास के स्थान",
    "det.nearby.verified": "Google Maps द्वारा सत्यापित",
    "det.momentum.match": "मैच स्कोर",
    "det.momentum.shortlisted": "शॉर्टलिस्ट किया गया",
    "det.momentum.response": "मालिक जवाब",
    "sidebar.title": "विश्वास प्रणाली",
    "sidebar.subtitle": "केवल सत्यापित लिस्टिंग",
    "sidebar.desc": "ताज़ा वीडियो, पारदर्शी शर्तें और कोई ब्रोकरेज नजर नहीं आता।",
    "search.continue": "खोज जारी रखें",
    "empty.maint": "कोई रखरखाव अनुरोध नहीं।",
    "maint.updated": "आज अपडेट किया गया",
    "owner.empty": "कोई इनकमिंग रिक्वेस्ट नहीं",
    "owner.empty.detail": "खोजने योग्य बने रहने के लिए लिस्टिंग ताज़ा रखें।",
    "owner.empty.status": "स्पष्ट",
    "owner.unit.fallback": "संपत्ति अनुरोध",
    "owner.status.fallback": "नया",
    "all.clear": "सभी लिस्टिंग स्पष्ट हैं",
    "attention.clear": "स्टेटस स्पष्ट",
    "attention.count": "{n} संपत्ति को ध्यान देने की आवश्यकता है",
    "attention.delisted": "सूची से हटाया गया",
    "attention.fix": "ठीक करें",
    "attention.allClear": "सभी संपत्तियां स्पष्ट हैं",
    "attention.allClear.detail": "लाइव लिस्टिंग के पास ताज़ा अटेस्टेड वीडियो हैं।",
    "modal.add.title": "संपत्ति जोड़ें",
    "modal.add.desc": "संपत्ति की जानकारी बोलें या टाइप करें। TULO लिस्टिंग निकालता है, फिर केवल गुम विवरण मांगता है।",
    "modal.add.source": "लिस्टिंग के लिए संदेश",
    "modal.add.source.ph": "उदाहरण: गोमती नगर में 2BHK, सेमी फ़र्निश्ड, किराया 18000, जमा 2 महीने, 1 जून से उपलब्ध, परिवार को प्राथमिकता।",
    "modal.add.voice": "वॉइस गाइड",
    "modal.add.extract": "लिस्टिंग निकालें",
    "modal.add.save": "ब्लॉक किया गया ड्राफ्ट सहेजें",
    "modal.attest.title": "संपत्ति प्रमाणित करें",
    "modal.attest.desc": "3 मिनट तक का टाइमस्टैम्प्ड वॉकथ्रू रिकॉर्ड करें।",
    "modal.attest.upload": "प्रमाण वीडियो अपलोड करें",
    "modal.request.title": "नया रखरखाव अनुरोध",
    "modal.request.cat": "श्रेणी",
    "modal.request.cat.ph": "प्लंबिंग",
    "modal.request.pri": "प्राथमिकता",
    "modal.request.pri.ph": "मध्यम",
    "modal.request.desc": "विवरण",
    "modal.request.desc.ph": "समस्या का वर्णन करें",
    "modal.request.submit": "अनुरोध सबमिट करें",
    "video.record": "प्रमाण वीडियो रिकॉर्ड करें",
    "video.play": "प्रमाणित संपत्ति वीडियो",
    "chat.placeholder": "अपना संदेश यहां टाइप करें...",
    "chat.send": "भेजें",
    "pay.now": "अभी भुगतान करें (UPI/कार्ड)",
  },
  ur: {
    "nav.home": "ہوم",
    "nav.properties": "پراپرٹیز",
    "nav.rent": "کرایہ",
    "nav.map": "نقشہ",
    "nav.tools": "ٹولز",
    "stat.listed": "درج شدہ",
    "stat.brokerage": "بروکریج کی بچت",
    "stat.attention": "توجہ کی ضرورت",
    "map.overlay.predictor": "کرایہ پیش گو",
    "map.overlay.ranking": "ٹاپ رینکنگ",
    "role.landlord": "مالک مکان",
    "role.tenant": "کرایہ دار",
    "signout": "سائن آؤٹ",
  },
  bn: {
    "nav.home": "হোম",
    "nav.properties": "সম্পত্তি",
    "nav.rent": "ভাড়া",
    "nav.map": "ম্যাপ",
    "nav.tools": "টুলস",
    "stat.listed": "তালিকাভুক্ত",
    "stat.brokerage": "ব্রোকারেজ সঞ্চয়",
    "stat.attention": "মনোযোগ প্রয়োজন",
    "map.overlay.predictor": "ভাড়া পূর্বাভাস",
    "map.overlay.ranking": "শীর্ষ র্যাঙ্কিং",
    "role.landlord": "বাড়িওয়ালা",
    "role.tenant": "ভাড়াটিয়া",
    "signout": "সাইন আউট",
  },
  mr: {
    "nav.home": "होम",
    "nav.properties": "मालमत्ता",
    "nav.rent": "भाडे",
    "nav.map": "नकाशा",
    "nav.tools": "साधने",
    "stat.listed": "यादीत",
    "stat.brokerage": "दलाली बचत",
    "stat.attention": "लक्ष देणे आवश्यक",
    "map.overlay.predictor": "भाडे अंदाज",
    "map.overlay.ranking": "शीर्ष क्रमवारी",
    "role.landlord": "जमीनदार",
    "role.tenant": "भाडेकरू",
    "signout": "साइन आउट",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.properties": "சொத்துக்கள்",
    "nav.rent": "வாடகை",
    "nav.map": "வரைபடம்",
    "nav.tools": "கருவிகள்",
    "stat.listed": "பட்டியலிடப்பட்டது",
    "stat.brokerage": "தரகு சேமிப்பு",
    "stat.attention": "கவனம் தேவை",
    "map.overlay.predictor": "வாடகை முன்கணிப்பு",
    "map.overlay.ranking": "சிறந்த தரவரிசை",
    "role.landlord": "நில உரிமையாளர்",
    "role.tenant": "குத்தகைதாரர்",
    "signout": "வெளியேறு",
  },
  te: {
    "nav.home": "హోమ్",
    "nav.properties": "ఆస్తులు",
    "nav.rent": "అద్దె",
    "nav.map": "మ్యాప్",
    "nav.tools": "సాధనాలు",
    "stat.listed": "జాబితా చేయబడింది",
    "stat.brokerage": "బ్రోకరేజ్ పొదుపు",
    "stat.attention": "శ్రద్ధ అవసరం",
    "map.overlay.predictor": "అద్దె అంచనా",
    "map.overlay.ranking": "టాప్ ర్యాంకింగ్",
    "role.landlord": "భూస్వామి",
    "role.tenant": "అద్దెదారు",
    "signout": "సైన్ అవుట్",
  },
};

let currentLang = localStorage.getItem("tulo_lang") || "en";

function t(key, params) {
  function resolve(k) {
    if (currentLang === "en") return TRANSLATIONS.en[k] || "";
    const langData = TRANSLATIONS[currentLang];
    if (langData && langData[k]) return langData[k];
    return TRANSLATIONS.en[k] || "";
  }
  let val = resolve(key);
  if (params && val) {
    Object.keys(params).forEach(k => { val = val.replace(`{${k}}`, params[k]); });
  }
  return val;
}

function getLanguageName(lang) {
  return LANGUAGES[lang]?.native || LANGUAGES[lang]?.label || lang;
}

function getLanguageInstruction() {
  if (currentLang === "en") return "";
  const names = { hi: "Hindi", ur: "Urdu", bn: "Bengali", mr: "Marathi", ta: "Tamil", te: "Telugu" };
  return `\n\nIMPORTANT: Respond entirely in ${names[currentLang] || "Hindi"} (Devanagari script for Hindi/Marathi, Nastaliq for Urdu, Bengali script for Bengali, Tamil script for Tamil, Telugu script for Telugu).`;
}

function getLanguageInstructionShort() {
  if (currentLang === "en") return "";
  const names = { hi: "Hindi", ur: "Urdu", bn: "Bengali", mr: "Marathi", ta: "Tamil", te: "Telugu" };
  return `\n\nRespond in ${names[currentLang] || "Hindi"}.`;
}

function applyTranslatedText(el, val) {
  if (el.hasAttribute("aria-label")) {
    el.setAttribute("aria-label", val);
    return;
  }
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    el.placeholder = val;
    return;
  }
  if (el.children.length) {
    const firstText = [...el.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
    if (firstText) {
      firstText.nodeValue = val;
    } else {
      el.prepend(document.createTextNode(val));
    }
    return;
  }
  el.textContent = val;
}

function setLanguage(lang) {
  if (!LANGUAGES[lang]) return;
  currentLang = lang;
  localStorage.setItem("tulo_lang", lang);
  document.documentElement.lang = lang;
  const sel = document.querySelector("#lang-select");
  if (sel) sel.value = lang;

  document.title = t("app.title") || "TULO Lucknow";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) applyTranslatedText(el, val);
  });

  const activeView = document.querySelector(".view.active");
  if (activeView) {
    const activeNav = document.querySelector(`[data-view="${activeView.id}"]`);
    const titleEl = document.querySelector("#page-title");
    if (activeNav && titleEl) {
      const titleKey = `page.${activeView.id}`;
      const translated = t(titleKey);
      titleEl.textContent = translated || activeNav.dataset.title || activeNav.textContent.trim();
    }
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    const view = item.dataset.view;
    const labelKey = ({ dashboard: "nav.home", properties: "nav.properties", rentTenant: "nav.rent", mapView: "nav.map", aiAndPosters: "nav.tools", tenantHome: "nav.home", tenantProperty: "nav.property", tenantRentAndRepair: "nav.rentRepair", tenantAi: "nav.ai" })[view];
    if (labelKey) {
      const labelSpan = item.querySelector(".nav-label");
      const val = t(labelKey);
      if (val && labelSpan) labelSpan.textContent = val;
    }
  });

  document.querySelectorAll(".props-tab").forEach(tab => {
    if (tab.dataset.propsTab === "properties") { const v = t("props.tab.properties"); if (v) tab.textContent = v; }
    else if (tab.dataset.propsTab === "maintenance") { const v = t("props.tab.maintenance"); if (v) tab.textContent = v; }
  });

  updateGeminiState();
}

document.addEventListener("change", (event) => {
  if (event.target.id === "lang-select") {
    setLanguage(event.target.value);
    render();
    updateGeminiState();
    if (typeof updateMapMarkers === "function") updateMapMarkers();
  }
});

document.addEventListener("keydown", (event) => {
  const card = event.target.closest?.("#properties-list .property-card");
  if (!card || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  card.click();
});

const defaultTransparency = {
  brokerage: "INR 0",
  token: "Not allowed before visit",
  deposit: "Clear before contact",
  maintenance: "Shown upfront",
  notice: "30 days",
  video: "Attested video expected"
};

const attestedVideoSteps = [
  "Start at the main entrance",
  "Pan living room slowly",
  "Show kitchen storage and sink",
  "Show each bedroom corner",
  "Show bathroom fittings and ventilation",
  "End on balcony or window view"
];

const ATTESTATION_VALID_DAYS = 15;
const nowMs = Date.now();
const daysAgoIso = (days) => new Date(nowMs - days * 24 * 60 * 60 * 1000).toISOString();

const productionListings = [];


const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.querySelector("#page-title");
const sessionContext = document.querySelector("#session-context");
const roleChip = document.querySelector("#role-chip");
const addPropertyAction = document.querySelector("#add-property-action");
const geminiModel = "gemini-2.5-flash";
const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;

let map;
let mapMarkers = [];
const mapZones = [
  { name: "Mohan Meakin", color: "#e9d5ff", bounds: [[26.87, 80.85], [26.90, 80.89]] },
  { name: "Aishbagh", color: "#fef08a", bounds: [[26.84, 80.89], [26.90, 80.93]] },
  { name: "Quaisar Bagh", color: "#bbf7d0", bounds: [[26.87, 80.93], [26.90, 80.97]] },
  { name: "Vikas Nagar", color: "#fbcfe8", bounds: [[26.87, 80.97], [26.90, 81.01]] },
  { name: "Mubarakpur", color: "#fed7aa", bounds: [[26.87, 81.01], [26.90, 81.06]] },
  { name: "Rajajipuram", color: "#bfdbfe", bounds: [[26.81, 80.85], [26.87, 80.89]] },
  { name: "Charbagh", color: "#fed7aa", bounds: [[26.84, 80.93], [26.87, 80.97]] },
  { name: "Aminabad", color: "#a7f3d0", bounds: [[26.84, 80.97], [26.87, 81.01]] },
  { name: "Gomti Nagar", color: "#d9f99d", bounds: [[26.81, 81.01], [26.87, 81.06]] },
  { name: "Anora Kala", color: "#e9d5ff", bounds: [[26.81, 80.89], [26.84, 80.93]] },
  { name: "Hazratganj", color: "#fef08a", bounds: [[26.81, 80.93], [26.84, 80.97]] },
  { name: "Alambagh", color: "#bbf7d0", bounds: [[26.78, 80.85], [26.81, 80.93]] },
  { name: "Aliganj", color: "#fbcfe8", bounds: [[26.78, 80.93], [26.81, 80.97]] },
  { name: "Indira Nagar", color: "#e9d5ff", bounds: [[26.78, 80.97], [26.84, 81.01]] },
  { name: "Sushant Golf City", color: "#fde047", bounds: [[26.78, 81.01], [26.81, 81.06]] },
  { name: "Bakshi Ka Talab", color: "#fef08a", bounds: [[26.75, 80.85], [26.78, 80.89]] },
  { name: "Krishna Nagar", color: "#bfdbfe", bounds: [[26.75, 80.89], [26.78, 80.93]] },
  { name: "Transport Nagar", color: "#fed7aa", bounds: [[26.75, 80.93], [26.78, 80.97]] },
  { name: "Telibagh", color: "#bbf7d0", bounds: [[26.75, 80.97], [26.78, 81.01]] },
  { name: "Jankipuram Extension", color: "#a7f3d0", bounds: [[26.75, 81.01], [26.78, 81.06]] }
];

function switchView(id) {
  views.forEach((view) => view.classList.toggle("active", view.id === id));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === id));
  const active = document.querySelector(`[data-view="${id}"]`);
  const titleKey = `page.${id}`;
  pageTitle.textContent = active ? (t(titleKey) || active.dataset.title || active.textContent) : t("page.dashboard");
  if (addPropertyAction) {
    const showAddInTopbar = document.body.dataset.role !== "tenant" && id === "properties";
    addPropertyAction.style.display = showAddInTopbar ? "" : "none";
  }
  
  if (id === "mapView") {
    if (!map) {
      initMap();
      setTimeout(() => { initMapOverlay(); updateMapViewPanels(); }, 100);
    }
    setTimeout(() => map.invalidateSize(), 10);
    setTimeout(() => updateMapViewPanels(), 200);
  }
}

let currentMapFilter = "All";
let tenantPropertyFilter = "All";

function initMap() {
  const lucknowBounds = [
    [26.65, 80.80], // SouthWest
    [27.00, 81.10]  // NorthEast
  ];
  
  map = L.map('map', {
    maxBounds: lucknowBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 11
  }).setView([26.8467, 80.9462], 12);
  
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap & CartoDB'
  }).addTo(map);

  const zoneNamesHi = {
    "Mohan Meakin": "मोहन मीकिन", "Aishbagh": "ऐशबाग", "Quaisar Bagh": "कैसरबाग",
    "Vikas Nagar": "विकास नगर", "Mubarakpur": "मुबारकपुर", "Rajajipuram": "राजाजीपुरम",
    "Charbagh": "चारबाग", "Aminabad": "अमीनाबाद", "Gomti Nagar": "गोमती नगर",
    "Anora Kala": "अनोरा कला", "Hazratganj": "हज़रतगंज", "Alambagh": "आलमबाग",
    "Aliganj": "अलीगंज", "Indira Nagar": "इंदिरा नगर", "Sushant Golf City": "सुशांत गोल्फ सिटी",
    "Bakshi Ka Talab": "बख्शी का तालाब", "Krishna Nagar": "कृष्णा नगर",
    "Transport Nagar": "ट्रांसपोर्ट नगर", "Telibagh": "तेलीबाग", "Jankipuram Extension": "जानकीपुरम एक्सटेंशन"
  };
  mapZones.forEach(z => {
    const zoneName = currentLang === "hi" && zoneNamesHi[z.name] ? zoneNamesHi[z.name] : z.name;
    L.rectangle(z.bounds, { color: z.color, fillColor: z.color, fillOpacity: 0.12, weight: 1, opacity: 0.4 })
      .addTo(map)
      .bindPopup(`<div style="text-align:center;"><strong>${zoneName}</strong></div>`);
  });

  document.querySelectorAll(".map-filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".map-filter-btn").forEach(b => {
        b.style.background = "var(--white)";
        b.style.color = "var(--ink)";
        b.style.border = "1px solid var(--line)";
      });
      e.target.style.background = "var(--primary)";
      e.target.style.color = "var(--white)";
      e.target.style.border = "1px solid var(--primary)";
      currentMapFilter = e.target.dataset.filter;
      updateMapMarkers();
    });
  });

  map.on("popupopen", (event) => {
    const button = event.popup.getElement()?.querySelector("[data-map-detail]");
    if (button) {
      button.addEventListener("click", () => openPropertyDetails(button.dataset.mapDetail), { once: true });
    }
  });

  updateMapMarkers();
}

const rentEstimates = {
  "gomti nagar": { PG: [7000, 12000], "1 BHK": [12000, 18000], "2 BHK": [18000, 28000], "3 BHK": [28000, 40000], Commercial: [22000, 60000] },
  "indira nagar": { PG: [6000, 10000], "1 BHK": [10000, 16000], "2 BHK": [16000, 25000], "3 BHK": [25000, 35000], Commercial: [18000, 50000] },
  "hazratganj": { PG: [8000, 14000], "1 BHK": [15000, 22000], "2 BHK": [22000, 35000], "3 BHK": [35000, 55000], Commercial: [30000, 80000] },
  "aliganj": { PG: [5500, 9000], "1 BHK": [9000, 14000], "2 BHK": [14000, 22000], "3 BHK": [22000, 30000], Commercial: [15000, 40000] },
  "gomti nagar extension": { PG: [6000, 10000], "1 BHK": [10000, 15000], "2 BHK": [15000, 24000], "3 BHK": [24000, 32000], Commercial: [18000, 45000] },
  "vikas nagar": { PG: [5000, 8000], "1 BHK": [8000, 12000], "2 BHK": [12000, 18000], "3 BHK": [18000, 25000], Commercial: [12000, 30000] },
  "rajajipuram": { PG: [5000, 8000], "1 BHK": [8000, 12000], "2 BHK": [12000, 18000], "3 BHK": [18000, 25000], Commercial: [12000, 30000] },
  "alambagh": { PG: [4500, 7500], "1 BHK": [7000, 11000], "2 BHK": [11000, 16000], "3 BHK": [16000, 22000], Commercial: [10000, 25000] },
  "charbagh": { PG: [4500, 7000], "1 BHK": [7000, 10000], "2 BHK": [10000, 15000], "3 BHK": [15000, 20000], Commercial: [10000, 22000] },
  "jankipuram": { PG: [4000, 6500], "1 BHK": [6000, 9500], "2 BHK": [9500, 14000], "3 BHK": [14000, 20000], Commercial: [8000, 20000] },
  "sushant golf city": { PG: [7000, 11000], "1 BHK": [12000, 18000], "2 BHK": [18000, 30000], "3 BHK": [30000, 45000], Commercial: [25000, 55000] },
  "aishbagh": { PG: [4000, 6000], "1 BHK": [6000, 10000], "2 BHK": [10000, 14000], "3 BHK": [14000, 18000], Commercial: [8000, 18000] }
};

function predictRent() {
  const localityEl = document.getElementById("rent-predictor-locality");
  const typeEl = document.getElementById("rent-predictor-type");
  const bhkEl = document.getElementById("rent-predictor-bhk");
  const resultEl = document.getElementById("rent-prediction-result");
  if (!localityEl || !typeEl || !bhkEl || !resultEl) return;

  const input = localityEl.value.trim().toLowerCase();
  const type = typeEl.value;
  const bhk = bhkEl.value;

  if (!input) {
    resultEl.innerHTML = t("map.predictor.enter");
    return;
  }

  let matchedZone = "";
  let bestRange = null;
  for (const [zone, data] of Object.entries(rentEstimates)) {
    if (input.includes(zone)) {
      matchedZone = zone;
      const key = type === "Commercial" ? "Commercial" : type === "PG" ? "PG" : bhk;
      bestRange = data[key] || data["2 BHK"];
      break;
    }
  }

  if (!bestRange) {
    resultEl.innerHTML = `${t("map.result.noestimate", { loc: localityEl.value.trim() })} ${t("map.result.try")}`;
    return;
  }

  const avg = Math.round((bestRange[0] + bestRange[1]) / 2);
  const savings = estimateBrokerageSavings(avg);

  resultEl.innerHTML = `
    <div style="font-size:15px;margin-bottom:4px;">₹${bestRange[0].toLocaleString("en-IN")} – ₹${bestRange[1].toLocaleString("en-IN")}/month</div>
    <div style="font-size:11px;opacity:0.8;">Estimated for ${type === "Flat" ? bhk : type} in ${matchedZone.replace(/\b\w/g, c => c.toUpperCase())}</div>
    <div style="font-size:11px;opacity:0.8;margin-top:4px;">${t("map.predictor.savings")} ${savings}</div>
  `;
}

function getTopRankedProperties(count = 5) {
  return getLiveListings()
    .map(p => ({ ...p, score: (p.matchScore || 80) + (p.savedCount || 0) * 0.5 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

function getMappedPropertyType(property = {}) {
  const text = (property.type || "").toLowerCase();
  if (text.includes("pg")) return "PG";
  if (text.includes("commercial") || text.includes("shop") || text.includes("office")) return "Commercial";
  return "Flat";
}

function getPropertyScore(property = {}) {
  return (property.matchScore || 80) + (property.savedCount || 0) * 0.5 + (isLiveListing(property) ? 10 : 0);
}

function getRentFairness(property = {}) {
  const rent = parseCurrency(property.rent);
  const address = (property.address || "").toLowerCase();
  const zoneKey = Object.keys(rentEstimates).find((zone) => address.includes(zone));
  const mappedType = getMappedPropertyType(property);
  const bhkMatch = (property.type || "").match(/[123]\s?BHK/i);
  const estimateKey = mappedType === "Commercial" ? "Commercial" : mappedType === "PG" ? "PG" : (bhkMatch ? bhkMatch[0].replace(/\s+/g, " ").toUpperCase() : "2 BHK");
  const range = zoneKey ? (rentEstimates[zoneKey][estimateKey] || rentEstimates[zoneKey]["2 BHK"]) : null;
  if (!rent || !range) {
    return { label: "Fairness pending", tone: "warning", detail: "AI needs locality and rent range to compare this listing.", delta: 0 };
  }
  const midpoint = Math.round((range[0] + range[1]) / 2);
  const delta = Math.round(((rent - midpoint) / midpoint) * 100);
  if (delta <= -8) return { label: "Value deal", tone: "success", detail: `${Math.abs(delta)}% below local midpoint for ${estimateKey}.`, delta };
  if (delta >= 15) return { label: "Premium rent", tone: "warning", detail: `${delta}% above local midpoint. Video and amenities must justify price.`, delta };
  return { label: "Fair price", tone: "success", detail: `Within local ${estimateKey} range for ${zoneKey.replace(/\b\w/g, c => c.toUpperCase())}.`, delta };
}

function getAiVideoReview(property = {}) {
  const age = getAttestationAgeDays(property);
  const fresh = isAttestationFresh(property);
  const hasGps = Number.isFinite(Number(property.lat)) && Number.isFinite(Number(property.lng));
  const completeness = fresh ? Math.max(78, Math.min(96, (property.matchScore || 84) + (property.savedCount || 0) * 0.12)) : 42;
  return {
    label: fresh ? "Video useful" : "Video missing",
    completeness: Math.round(completeness),
    detail: fresh
      ? `AI expects entrance, kitchen, bathroom and room sweep. Current video age: ${age}d.`
      : "AI cannot verify rooms until landlord records a fresh attested walkthrough.",
    signals: [
      { label: "No pause", value: fresh ? "locked" : "required" },
      { label: "GPS", value: hasGps ? "matched" : "missing" },
      { label: "Freshness", value: fresh ? `${Math.max(0, ATTESTATION_VALID_DAYS - age)}d left` : "blocked" },
      { label: "Lighting", value: fresh ? "checked" : "pending" }
    ]
  };
}

function getScamGuard(property = {}) {
  const terms = getPropertyTerms(property);
  const missingDeposit = !property.deposit || String(property.deposit).toLowerCase().includes("clear");
  const fresh = isAttestationFresh(property);
  if (!fresh) {
    return { label: "Do not pay token yet", tone: "danger", detail: "Attested video is missing or expired." };
  }
  if (missingDeposit) {
    return { label: "Clarify deposit", tone: "warning", detail: "Deposit terms must be clear before tenant pays anything." };
  }
  return { label: "Token risk low", tone: "success", detail: `${terms.brokerage} brokerage. Token before visit is not allowed.` };
}

function getAiTrustIntelligence(property = {}) {
  const video = getAiVideoReview(property);
  const rent = getRentFairness(property);
  const guard = getScamGuard(property);
  const score = Math.max(20, Math.min(98,
    Math.round(
      (isAttestationFresh(property) ? 38 : 8) +
      (video.completeness * 0.24) +
      ((property.matchScore || 80) * 0.2) +
      (rent.tone === "success" ? 12 : 4) +
      (guard.tone === "success" ? 12 : guard.tone === "warning" ? 5 : 0)
    )
  ));
  const label = score >= 86 ? "Trust Strong" : score >= 70 ? "Needs Clarification" : "Do Not Pay Token Yet";
  const tone = score >= 86 ? "success" : score >= 70 ? "warning" : "danger";
  return {
    score,
    label,
    tone,
    summary: `${video.label}. ${rent.label}. ${guard.label}.`,
    video,
    rent,
    guard,
    signals: [
      { label: "Video", value: `${video.completeness}% complete` },
      { label: "Rent", value: rent.label },
      { label: "Payment", value: guard.label },
      { label: "AI Rank", value: `${Math.round(getPropertyScore(property))}` }
    ]
  };
}

function getRegionName(address = "") {
  const text = address.toLowerCase();
  const knownRegions = ["Gomti Nagar", "Indira Nagar", "Aliganj", "Hazratganj", "Alambagh", "Vikas Nagar", "Jankipuram", "Sushant Golf City"];
  return knownRegions.find(region => text.includes(region.toLowerCase())) || "Lucknow";
}

function getRegionalRankingForProperty(property) {
  if (!property) return null;
  const region = getRegionName(property.address);
  const ranked = properties
    .filter(item => getRegionName(item.address) === region)
    .map(item => ({ ...item, score: getPropertyScore(item) }))
    .sort((a, b) => b.score - a.score);
  const index = ranked.findIndex(item => item.id === property.id || item.name === property.name);
  return {
    property,
    rank: index >= 0 ? index + 1 : 1,
    total: ranked.length || 1,
    region,
    score: Math.round(getPropertyScore(property))
  };
}

function getLandlordRegionalRanking() {
  const topProperty = getLiveListings()
    .map(property => ({ property, score: getPropertyScore(property) }))
    .sort((a, b) => b.score - a.score)[0]?.property || properties[0];
  return getRegionalRankingForProperty(topProperty);
}

function getTenantRegionalRanking() {
  const shortlisted = properties.find(property => property.id === "lko-indira-metro-1bhk")
    || getLiveListings()[0]
    || properties[0];
  return getRegionalRankingForProperty(shortlisted);
}

function renderRankings() {
  const list = document.getElementById("top-rankings-list");
  if (!list) return;
  const top = getTopRankedProperties(5);
  if (!top.length) {
    list.innerHTML = `<div style="text-align:center;color:var(--muted);padding:12px;font-size:13px;">${t("map.ranking.empty")}</div>`;
    return;
  }
  list.innerHTML = top.map((p, i) => `
    <div class="ranking-item">
      <span class="ranking-num">${i + 1}</span>
      <strong>${escapeHtml(p.name)}</strong>
      <span class="ranking-rent">${escapeHtml(p.rent)}</span>
      <span class="ranking-score">${p.matchScore || 80}%</span>
    </div>
  `).join("");
}

function initMapOverlay() {
  const overlay = document.getElementById("map-overlay-panel");
  if (!overlay || overlay.dataset.ready === "true") return;
  overlay.dataset.ready = "true";
  const toggleBtn = document.getElementById("map-overlay-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      overlay.classList.toggle("collapsed");
    });
  } else {
    seedLocalCatalog();
  }
  document.querySelectorAll(".map-overlay-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".map-overlay-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".map-overlay-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById(tab.dataset.panel + "-panel");
      if (panel) panel.classList.add("active");
      if (tab.dataset.panel === "ranking") renderRankings();
    });
  });
  const predictBtn = document.getElementById("predict-rent-btn");
  if (predictBtn) predictBtn.addEventListener("click", predictRent);
  const predictorLocality = document.getElementById("rent-predictor-locality");
  if (predictorLocality) {
    predictorLocality.addEventListener("keydown", e => { if (e.key === "Enter") predictRent(); });
  }
}

function updateMapViewPanels() {
  renderRankings();
}

function initHomeSlideshow() {
  document.querySelectorAll(".home-slideshow").forEach((slideshow, slideshowIndex) => {
    if (slideshow.dataset.ready === "true") return;
    const slides = [...slideshow.querySelectorAll(".home-slide")];
    const dots = [...slideshow.querySelectorAll(".home-slide-dots i")];
    if (!slides.length) return;
    slideshow.dataset.ready = "true";
    let index = slides.findIndex((slide) => slide.classList.contains("active"));
    if (index < 0) index = 0;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    setInterval(() => {
      index = (index + 1) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }, 3200 + slideshowIndex * 350);
  });
}

function showPosterTool() {
  const output = document.getElementById("ai-output");
  if (!output) return;
  openToolUI("Poster Maker");
  output.classList.remove("large");
  output.innerHTML = `
    <div class="poster-layout" style="grid-template-columns:1fr 240px;gap:14px;">
      <div>
        <h3 style="margin:0 0 8px;font-size:16px;">${t("poster.headline")}</h3>
        <div class="template-row">
          <button class="template active">Modern Blue</button>
          <button class="template">Classic</button>
          <button class="template">Bold</button>
          <button class="template">Minimal</button>
        </div>
        <label>${t("poster.rent")}<input id="poster-rent" value="₹7,000/month" /></label>
        <label>${t("poster.locality")}<input id="poster-locality" value="Gomti Nagar, Lucknow" /></label>
        <label>${t("poster.headline.input")}<input id="poster-headline-input" value="ROOM AVAILABLE" /></label>
        <div class="button-row">
          <button class="primary small" data-ai="poster">${t("poster.generate")}</button>
          <button class="secondary small" id="export-poster">${t("poster.export")}</button>
        </div>
        <div class="ai-output" id="poster-ai-output" style="margin-top:8px;">${t("poster.placeholder")}</div>
      </div>
      <div class="poster-preview">
        <div class="poster-photo"></div>
        <h3 id="poster-headline">ROOM AVAILABLE</h3>
        <p id="poster-place">Gomti Nagar, Lucknow</p>
        <strong id="poster-price">₹7,000/month</strong>
        <div class="amenities" id="poster-amenities"><span>AC</span><span>WiFi</span><span>Meals</span></div>
        <div class="poster-footer"><span>98XXX XXXXX</span><div class="qr">QR</div></div>
      </div>
    </div>
  `;
}

function showNotificationsModal() {
  const isTenant = document.body.dataset.role === "tenant";
  const ownerAttentionItems = buildOwnerAttentionItems(properties).filter(item => item.tone !== "green");
  const incomingItems = requests.length ? requests : [{ title: t("owner.empty"), unit: t("owner.empty.detail"), status: t("owner.empty.status"), priority: "Low" }];
  const tenantItems = tenantRequests.length ? tenantRequests.map(item => ({
    title: item.title,
    unit: item.status || item.priority || "",
    status: item.priority || item.date || "",
    emergency: item.emergency
  })) : [{ title: t("notification.empty"), unit: t("tenant.recent.updates"), status: "" }];

  const renderRequestGroup = (list) => list.length ? list.map(r => `
    <article class="owner-row ${r.emergency ? "red" : ""}">
      <div>
        <strong>${escapeHtml(r.title)}</strong>
        <span>${escapeHtml(r.unit || "")}</span>
      </div>
      <small>${escapeHtml(r.status || r.priority || "")}</small>
    </article>
  `).join("") : `<div style="color:var(--muted);font-size:13px;padding:8px 0;">${t("notification.empty")}</div>`;

  const renderAttentionGroup = (list) => list.length ? list.map(item => `
    <article class="owner-row ${escapeHtml(item.tone)}">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.detail)}</span>
      </div>
      <small>${item.tone === "red" ? t("attention.delisted") : t("attention.fix")}</small>
    </article>
  `).join("") : `
    <article class="owner-row green">
      <div>
        <strong>${t("attention.allClear")}</strong>
        <span>${t("attention.allClear.detail")}</span>
      </div>
      <small>${t("attention.clear")}</small>
    </article>
  `;

  modalContent.innerHTML = isTenant ? `
    <h2 style="margin-bottom:4px;">${t("notification.title")}</h2>
    <p style="color:var(--muted);margin-bottom:14px;">${t("tenant.recent.updates")}</p>
    <div class="notification-stack">
      <span class="pill success">${t("tenant.maintenance")}</span>
      <div class="notification-list">${renderRequestGroup(tenantItems)}</div>
    </div>
  ` : `
    <h2 style="margin-bottom:4px;">${t("notification.title")}</h2>
    <p style="color:var(--muted);margin-bottom:14px;">${t("notification.desc")}</p>
    <div class="notification-stack">
      <span class="pill warning">${t("attention.title")}</span>
      <div class="notification-list">${renderAttentionGroup(ownerAttentionItems)}</div>
      <span class="pill success">${t("bell.title")}</span>
      <div class="notification-list">${renderRequestGroup(incomingItems)}</div>
    </div>
  `;
  modal.classList.add("active");
}

function updateMapMarkers() {
  if (!map) return;
  mapMarkers.forEach(m => map.removeLayer(m));
  mapMarkers = [];
  getLiveListings().forEach(p => {
    const mappedType = getMappedPropertyType(p);

    if (currentMapFilter !== "All" && mappedType !== currentMapFilter) return;

    let typeIndicator = "flat";
    if (mappedType === "PG") typeIndicator = "pg";
    if (mappedType === "Commercial") typeIndicator = "commercial";

    const lat = Number(p.lat) || 26.8467;
    const lng = Number(p.lng) || 80.9462;
    const terms = getPropertyTerms(p);
    
    const rentShort = (p.rent || "₹0").replace(/ monthly| monthly| \/month/gi, "");
    
    const popupContent = `
      <div style="text-align:left;font-family:Inter,system-ui,sans-serif;">
        <b>${p.name}</b><br>
        <span style="font-size:12px; color:#5f6368;">${p.address}</span><br>
        <div style="margin-top:6px; font-size:13px;">${t("map.marker.type")} <b>${p.type}</b></div>
        <div style="font-size:13px;">${t("map.marker.rent")} <b>${p.rent}</b></div>
        <div style="font-size:13px;">${t("map.marker.brokerage")} <b>${terms.brokerage}</b></div>
        <button style="margin-top:12px; width:100%; padding: 6px;" class="primary small" data-map-detail="${escapeHtml(p.id || p.name)}">${t("map.marker.view")}</button>
      </div>
    `;

    const markerIcon = L.divIcon({
      html: `<div class="price-pill ${typeIndicator}"><span class="pill-rent">${escapeHtml(rentShort)}</span></div>`,
      className: 'price-marker-icon',
      iconSize: null,
      iconAnchor: [0, 0]
    });

    const marker = L.marker([lat, lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(popupContent);
    
    mapMarkers.push(marker);
  });
}

function openPropertyDetails(idOrName) {
  const key = decodeURIComponent(idOrName);
  const property = getLiveListings().find((item) => item.id === key || item.name === key) || getLiveListings()[0];
  if (!property) return;
  const lat = Number(property.lat) || 26.8467;
  const lng = Number(property.lng) || 80.9462;
  document.getElementById('detail-title').textContent = property.name;
  document.getElementById('detail-address').textContent = property.address;
  document.getElementById('detail-rent').textContent = property.rent || "Rent on request";
  document.getElementById('detail-coords').textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  document.getElementById('detail-status').textContent = property.status || "Verification pending";
  document.getElementById('detail-status').className = `pill ${property.statusClass || "warning"}`;
  document.getElementById('detail-rating').textContent = `${property.verifiedRating || "4.5/5"} ${t("det.rating")}`;
  document.getElementById('detail-deposit').textContent = property.deposit || "Shared before contact";
  document.getElementById('detail-maintenance').textContent = property.maintenance || "Shown upfront";
  const intelligence = getAiTrustIntelligence(property);
  const trustTitle = document.getElementById("detail-ai-trust-title");
  if (trustTitle) trustTitle.textContent = intelligence.label;
  const trustCopy = document.getElementById("detail-ai-trust-copy");
  if (trustCopy) trustCopy.textContent = intelligence.summary;
  const trustScore = document.getElementById("detail-ai-trust-score");
  if (trustScore) trustScore.textContent = String(intelligence.score);
  const trustBar = document.getElementById("detail-ai-trust-bar");
  if (trustBar) trustBar.style.width = `${intelligence.score}%`;
  const trustSignals = document.getElementById("detail-ai-signals");
  if (trustSignals) {
    trustSignals.innerHTML = [
      ...intelligence.signals,
      { label: "Scam guard", value: intelligence.guard.detail },
      { label: "Video AI", value: intelligence.video.detail }
    ].map((signal) => `
      <span><strong>${escapeHtml(signal.label)}</strong>${escapeHtml(signal.value)}</span>
    `).join("");
  }
  const nearbyList = document.getElementById("detail-nearby-list");
  if (nearbyList) {
    nearbyList.innerHTML = (property.nearby || []).map((place) => `<li>${escapeHtml(place)}</li>`).join("");
    if (!document.getElementById("detail-momentum")) {
      nearbyList.insertAdjacentHTML("afterend", `<div class="deal-grid compact" id="detail-momentum"></div>`);
    }
  }
  const momentum = document.getElementById("detail-momentum");
  if (momentum) {
    momentum.innerHTML = `
      <span>${t("det.momentum.match")}</span><strong>${property.matchScore || 80}%</strong>
      <span>${t("det.momentum.shortlisted")}</span><strong>${property.savedCount || 0} renters</strong>
      <span>${t("det.momentum.response")}</span><strong>${escapeHtml(property.ownerResponse || "Response time pending")}</strong>
    `;
  }
  const rating = property.verifiedRating || "4.5";
  
  document.getElementById('detail-rating').textContent = `★★★★☆ (${rating}/5)`;
  
  switchView('propertyDetailsView');
}
window.openPropertyDetails = openPropertyDetails;
window.switchView = switchView;

function applyAuthRole(role) {
  const isTenant = role === "tenant";
  document.body.classList.add("authenticated");
  document.body.dataset.role = role;
  if (sessionContext) sessionContext.textContent = isTenant ? t("session.tenant") : t("session.landlord");
  if (roleChip) roleChip.textContent = isTenant ? t("role.tenant") : t("role.landlord");
  
  const landlordNav = document.getElementById("landlord-nav");
  const tenantNav = document.getElementById("tenant-nav");
  if (landlordNav) landlordNav.style.display = isTenant ? "none" : "";
  if (tenantNav) tenantNav.style.display = isTenant ? "" : "none";

  switchView(isTenant ? "tenantHome" : "dashboard");
  render();
}

let db;

async function seedRealDatabase() {
  // Properties are added manually by the landlord via the wizard.
  // Only seed rent rows, requests, and tenant data here.
  if (localStorage.getItem("tulo_production_seeded_v1")) return;
  const productionBatch = db.batch();
  // No property seeding — landlord adds manually
  [
    { month: "May 2026", amount: "INR 0", status: "Upcoming", date: "01/06/2026", action: "Reminder" }
  ].forEach(r => productionBatch.set(db.collection("tenantRentHistory").doc(), r));
  [{ title: "Confirm visit slot", status: "Open", priority: "Medium", emergency: false, date: "29/05/2026" }]
    .forEach(r => productionBatch.set(db.collection("tenantRequests").doc(), r));
  await productionBatch.commit();
  localStorage.setItem("tulo_production_seeded_v1", "true");

  if (localStorage.getItem("tulo_db_seeded_v2")) return;
  const seedProperties = [
    { name: "Vibhuti Khand Premium", type: "2 BHK Flat", address: "Vibhuti Khand, Gomti Nagar", units: "Occupied", rent: "₹26,000 monthly", status: "Attested · 52 days left", statusClass: "success" },
    { name: "Hazratganj Heritage", type: "3 BHK Flat", address: "Near Vidhan Sabha Marg", units: "Occupied", rent: "₹38,000 monthly", status: "Rent paid", statusClass: "success" },
    { name: "Aliganj Independent", type: "1 BHK Builder Floor", address: "Sector Q, Aliganj", units: "Vacant", rent: "₹9,500 expected", status: "Make poster", statusClass: "vacant" }
  ];
  const seedRentRows = [
    { unit: "Room 1", tenant: "Ajay Kumar", amount: "₹7,000", status: "Paid", action: "Receipt" },
    { unit: "Archived listing", tenant: "Applicant", amount: "INR 0", status: "Archived", action: "Ignore" },
    { unit: "Room 3", tenant: "Vacant", amount: "—", status: "Vacant", action: "Add tenant" },
    { unit: "Flat A", tenant: "Nisha Verma", amount: "₹18,000", status: "Paid", action: "Receipt" }
  ];
  const seedRequests = [
    { title: "Archived task", unit: "Archived listing", status: "Closed", priority: "Low", emergency: false },
    { title: "Main gate lock broken", unit: "Gomti Nagar PG", status: "Open", priority: "Emergency", emergency: true },
    { title: "AC service needed", unit: "Flat A · Nisha Verma", status: "Assigned", priority: "Low", emergency: false }
  ];
  const seedTenantRentHistory = [
    { month: "Apr 2026", amount: "₹7,000", status: "Paid", date: "02/04/2026", action: "Receipt" },
    { month: "Mar 2026", amount: "₹7,000", status: "Paid", date: "01/03/2026", action: "Receipt" },
    { month: "Feb 2026", amount: "₹7,000", status: "Paid", date: "03/02/2026", action: "Receipt" }
  ];
  const seedTenantRequests = [
    { title: "Bathroom tap dripping", status: "In progress", priority: "Medium", emergency: false, date: "20/04/2026" },
    { title: "WiFi router restart", status: "Resolved", priority: "Low", emergency: false, date: "15/03/2026" }
  ];
  
  const batch = db.batch();
  seedProperties.forEach(p => batch.set(db.collection("properties").doc(), p));
  seedRentRows.forEach(r => batch.set(db.collection("rentRows").doc(), r));
  seedRequests.forEach(r => batch.set(db.collection("requests").doc(), r));
  seedTenantRentHistory.forEach(r => batch.set(db.collection("tenantRentHistory").doc(), r));
  seedTenantRequests.forEach(r => batch.set(db.collection("tenantRequests").doc(), r));
  
  await batch.commit();
  localStorage.setItem("tulo_db_seeded_v2", "true");
}

async function ensureProductionCatalogOnly() {
  if (localStorage.getItem("tulo_archived_map_seeded_v4")) return;
  const archivedProperties = [
    { name: "Archived Flat", type: "Flat", address: "Lucknow", units: "Archived", rent: "INR 0", status: "Archived", statusClass: "warning" },
    { name: "Archived Commercial", type: "Commercial", address: "Lucknow", units: "Archived", rent: "INR 0", status: "Archived", statusClass: "warning" },
    { name: "Indira Nagar Metro", type: "2 BHK Flat", address: "Indira Nagar, Lucknow", units: "Vacant", rent: "₹16,500 monthly", status: "Attested", statusClass: "success" },
    { name: "Riverside Apartments", type: "3 BHK Flat", address: "Gomti Nagar Extension", units: "Vacant", rent: "₹32,000 monthly", status: "Make poster", statusClass: "vacant" },
    { name: "Urban Workspace", type: "Commercial", address: "Alambagh, Lucknow", units: "Occupied", rent: "₹45,000 monthly", status: "Rent Paid", statusClass: "success" },
    { name: "Royal Plaza Shop", type: "Commercial", address: "Hazratganj, Lucknow", units: "Vacant", rent: "₹85,000 monthly", status: "Available", statusClass: "success" },
    { name: "Golf View Residency", type: "3 BHK Villa", address: "Sushant Golf City", units: "Occupied", rent: "₹45,000 monthly", status: "Rent Pending", statusClass: "vacant" },
    { name: "Archived PG", type: "PG", address: "Lucknow", units: "Archived", rent: "INR 0", status: "Archived", statusClass: "warning" },
    { name: "Metro Heights", type: "2 BHK Flat", address: "Krishna Nagar, Lucknow", units: "Occupied", rent: "₹14,500 monthly", status: "Rent Paid", statusClass: "success" },
    { name: "Transport Hub Godown", type: "Commercial", address: "Transport Nagar", units: "Vacant", rent: "₹65,000 monthly", status: "Available", statusClass: "success" },
    { name: "Lake View PG", type: "PG", address: "Jankipuram Extension", units: "5/10 occupied", rent: "₹6,500 per bed", status: "Action Required", statusClass: "vacant" },
    { name: "Heritage House", type: "1 BHK Flat", address: "Hazratganj", units: "Occupied", rent: "₹21,000 monthly", status: "Attested", statusClass: "success" },
    { name: "Tech Park Office", type: "Commercial", address: "Vikas Nagar", units: "Occupied", rent: "₹95,000 monthly", status: "Rent Paid", statusClass: "success" },
    { name: "Central Mall Shop", type: "Commercial", address: "Aminabad", units: "Vacant", rent: "₹55,000 monthly", status: "Make poster", statusClass: "vacant" },
    { name: "Cozy Corner PG", type: "PG", address: "Telibagh", units: "8/10 occupied", rent: "₹5,000 per bed", status: "Rent Paid", statusClass: "success" }
  ];
  
  const moreRentRows = [
    { unit: "Flat B", tenant: "Suresh Gupta", amount: "₹15,000", status: "Paid", action: "Receipt" },
    { unit: "Flat C", tenant: "Karan Singh", amount: "₹35,000", status: "Overdue", action: "Mark paid" },
    { unit: "Shop 101", tenant: "Ravi Traders", amount: "₹45,000", status: "Paid", action: "Receipt" },
    { unit: "PG Room 5", tenant: "Vikram", amount: "₹6,000", status: "Paid", action: "Receipt" }
  ];
  
  const moreRequests = [
    { title: "Power backup failure", unit: "Vibhuti Khand Premium 2BHK", status: "Open", priority: "Emergency", emergency: true },
    { title: "Geyser not working in guest bathroom", unit: "Indira Nagar Metro 1BHK", status: "Closed", priority: "Low", emergency: false },
    { title: "Pest control needed (Termites)", unit: "Mahanagar Cozy 2BHK", status: "Assigned", priority: "Medium", emergency: false },
    { title: "Shop shutter locking issue", unit: "Aliganj Main Road Shop", status: "Resolved", priority: "High", emergency: false }
  ];

  const batch = db.batch();
  archivedProperties.forEach(p => batch.set(db.collection("properties").doc(), p));
  moreRentRows.forEach(r => batch.set(db.collection("rentRows").doc(), r));
  moreRequests.forEach(r => batch.set(db.collection("requests").doc(), r));
  
  await batch.commit();
  localStorage.setItem("tulo_archived_map_seeded_v4", "true");
}

function seedLocalCatalog() {
  // Properties start empty — landlord adds their own via wizard
  properties = [];
  rentRows = [];
  requests = [];
  tenantRentHistory = [
    { month: "May 2026", amount: "INR 0", status: "Upcoming", date: "01/06/2026", action: "Reminder" }
  ];
  tenantRequests = [
    { title: "Confirm visit slot", status: "Open", priority: "Medium", emergency: false, date: "29/05/2026" }
  ];
  render();
}

function initFirestoreListeners() {
  db.collection("properties").onSnapshot(snap => {
    properties = snap.docs.map(doc => ({ id: doc.data().id || doc.id, ...doc.data() }));
    render();
    if (typeof updateMapMarkers === "function") updateMapMarkers();
  });
  db.collection("rentRows").onSnapshot(snap => {
    rentRows = snap.docs.map(doc => doc.data());
    render();
  });
  db.collection("requests").onSnapshot(snap => {
    requests = snap.docs.map(doc => doc.data());
    render();
  });
  db.collection("tenantRentHistory").onSnapshot(snap => {
    tenantRentHistory = snap.docs.map(doc => doc.data());
    render();
  });
  db.collection("tenantRequests").onSnapshot(snap => {
    tenantRequests = snap.docs.map(doc => doc.data());
    render();
  });
}

// ── One-time migration: clear old property seed flags so the landlord starts fresh ──
(function clearOldPropertySeeds() {
  const MIGRATION_KEY = "tulo_migration_empty_props_v1";
  if (!localStorage.getItem(MIGRATION_KEY)) {
    ["tulo_production_seeded_v1", "tulo_db_seeded", "tulo_archived_map_seeded_v3"].forEach(k => localStorage.removeItem(k));
    localStorage.setItem(MIGRATION_KEY, "true");
  }
})();

window.addEventListener("DOMContentLoaded", () => {

  if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0) {
    db = firebase.firestore();
    seedRealDatabase().then(() => ensureProductionCatalogOnly()).then(() => {
      initFirestoreListeners();
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const savedRole = localStorage.getItem("tulo_auth_role") || "tenant";
        if (!document.body.classList.contains("authenticated")) {
          applyAuthRole(savedRole);
        }
      }
    });
  } else {
    seedLocalCatalog();
  }
});

function signInWithGoogle(role) {
  localStorage.setItem("tulo_auth_role", role);
  if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      applyAuthRole(role);
    }).catch((error) => {
      console.warn("Firebase Auth Error (falling back to mock auth):", error);
      applyAuthRole(role);
    });
  } else {
    console.warn("Firebase not loaded. Using mock auth.");
    applyAuthRole(role);
  }
}

function signOut() {
  localStorage.removeItem("tulo_auth_role");
  document.body.classList.remove("authenticated");
  delete document.body.dataset.role;
  switchView("dashboard");
  if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0) {
    firebase.auth().signOut().catch(console.error);
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function parseCurrency(value) {
  const number = String(value || "").replace(/[^\d]/g, "");
  return Number(number || 0);
}

function formatInr(value) {
  const number = typeof value === "number" ? value : parseCurrency(value);
  if (!number) return "INR 0";
  return `INR ${number.toLocaleString("en-IN")}`;
}

function estimateBrokerageSavings(rentValue) {
  const rent = parseCurrency(rentValue);
  return rent ? formatInr(rent) : "1 month rent";
}

function getPropertyTerms(property = {}) {
  const age = getAttestationAgeDays(property);
  const freshness = property.attestedAt
    ? `${age}d old, ${Math.max(0, ATTESTATION_VALID_DAYS - age)}d left`
    : "Needs attested video";
  return {
    ...defaultTransparency,
    rent: property.rent || "Rent shown upfront",
    deposit: property.deposit || defaultTransparency.deposit,
    maintenance: property.maintenance || defaultTransparency.maintenance,
    restrictions: property.restrictions || "Shared before visit",
    savings: estimateBrokerageSavings(property.rent),
    videoFreshness: freshness
  };
}

function isPropertyAttested(property = {}) {
  const status = (property.status || "").toLowerCase();
  return property.attested === true || (status.includes("attested") && !status.includes("required") && !status.includes("expired"));
}

function getAttestationAgeDays(property = {}) {
  if (!property.attestedAt) return 999;
  const started = new Date(property.attestedAt).getTime();
  if (!Number.isFinite(started)) return 999;
  return Math.max(0, Math.floor((Date.now() - started) / (24 * 60 * 60 * 1000)));
}

function isAttestationFresh(property = {}) {
  return isPropertyAttested(property) && getAttestationAgeDays(property) < ATTESTATION_VALID_DAYS;
}

function isLiveListing(property = {}) {
  return property.listingState === "live" && isAttestationFresh(property);
}

function getLiveListings() {
  return properties.filter(isLiveListing);
}

function getDraftListings() {
  return properties.filter((property) => !isLiveListing(property));
}

function getBrokerageSavedTotal(listings = properties) {
  return formatInr(listings.reduce((sum, property) => sum + parseCurrency(property.rent), 0));
}

function getPropertyHealth(property = {}) {
  const age = getAttestationAgeDays(property);
  const daysLeft = Math.max(0, ATTESTATION_VALID_DAYS - age);
  const attestedButExpired = isPropertyAttested(property) && !isAttestationFresh(property);
  if (property.listingState === "delisted" || attestedButExpired) {
    return {
      tone: "red",
      label: "Red - delisted",
      detail: attestedButExpired
        ? "Video expired. Record a fresh attested video to relist."
        : "Attested video required before this can be listed again."
    };
  }
  if (!isLiveListing(property)) {
    return {
      tone: "yellow",
      label: "Yellow - action needed",
      detail: "Attested video required before this appears to renters."
    };
  }
  if (daysLeft <= 3) {
    return {
      tone: "yellow",
      label: "Yellow - expiring soon",
      detail: `${daysLeft} days left. Refresh video to protect ranking.`
    };
  }
  return {
    tone: "green",
    label: "Green - all clear",
    detail: `${daysLeft} days left on attested video.`
  };
}

function buildOwnerAttentionItems(listings = properties) {
  const items = listings
    .map((property) => ({ property, health: getPropertyHealth(property) }))
    .filter(({ health }) => health.tone !== "green")
    .map(({ property, health }) => ({
      tone: health.tone,
      title: property.name,
      detail: health.detail
    }));
  if (!items.length) {
    return [{
      tone: "green",
      title: t("attention.allClear"),
      detail: t("attention.allClear.detail")
    }];
  }
  return items;
}

function markPropertyAttested(propertyId) {
  const property = properties.find((item) => item.id === propertyId || item.name === propertyId);
  if (!property) return;
  const attestedAt = new Date();
  const expiresAt = new Date(attestedAt.getTime() + ATTESTATION_VALID_DAYS * 24 * 60 * 60 * 1000);
  property.attested = true;
  property.attestedAt = attestedAt.toISOString();
  property.attestationExpiresAt = expiresAt.toISOString();
  property.listingState = "live";
  property.status = "Attested - valid 15 days";
  property.statusClass = "success";
  if (!property.verifiedRating) property.verifiedRating = "4.6";
  if (!property.matchScore) property.matchScore = 84;
  if (!property.ownerResponse) property.ownerResponse = "Response time pending";
  render();
  if (typeof updateMapMarkers === "function") updateMapMarkers();
  if (db && property.id) {
    db.collection("properties").doc(property.id).set({
      attested: true,
      attestedAt: property.attestedAt,
      attestationExpiresAt: property.attestationExpiresAt,
      listingState: "live",
      status: property.status,
      statusClass: property.statusClass,
      verifiedRating: property.verifiedRating,
      matchScore: property.matchScore,
      ownerResponse: property.ownerResponse
    }, { merge: true }).catch(console.error);
  }
}

function removePropertyAttestation(propertyId) {
  const property = properties.find((item) => item.id === propertyId || item.name === propertyId);
  if (!property) return;
  property.attested = false;
  property.attestedAt = "";
  property.attestationExpiresAt = "";
  property.listingState = "draft";
  property.status = "Draft - attested video required";
  property.statusClass = "warning";
  deleteVideoBlob().catch(console.error);
  render();
  if (typeof updateMapMarkers === "function") updateMapMarkers();
  if (db && property.id) {
    db.collection("properties").doc(property.id).set({
      attested: false,
      attestedAt: "",
      attestationExpiresAt: "",
      listingState: "draft",
      status: property.status,
      statusClass: property.statusClass
    }, { merge: true }).catch(console.error);
  }
}

function inferListingCoordinates(address = "") {
  const text = address.toLowerCase();
  if (text.includes("gomti")) return { lat: 26.86572, lng: 81.00864 };
  if (text.includes("indira")) return { lat: 26.87513, lng: 80.99922 };
  if (text.includes("aliganj")) return { lat: 26.88958, lng: 80.94496 };
  if (text.includes("hazratganj")) return { lat: 26.85031, lng: 80.94612 };
  return { lat: 26.8467, lng: 80.9462 };
}

function propertyCard(property) {
  const terms = getPropertyTerms(property);
  const live = isLiveListing(property);
  const expired = isPropertyAttested(property) && !isAttestationFresh(property);
  const age = getAttestationAgeDays(property);
  const health = getPropertyHealth(property);
  const intelligence = getAiTrustIntelligence(property);
  const cardActions = live
    ? `
        <button data-attest-property="${escapeHtml(property.id || property.name)}">Refresh video</button>
        <button data-remove-attestation="${escapeHtml(property.id || property.name)}">Remove video</button>
        <button data-view-jump="aiAndPosters">Tools</button>
      `
    : `
        <button data-attest-property="${escapeHtml(property.id || property.name)}">Attest now</button>
          <button class="is-disabled" type="button" disabled>Publish locked</button>
      `;
  return `
    <article class="property-card ${live ? "is-live" : "is-draft"} health-${health.tone}" data-property-card="${escapeHtml(property.id || property.name)}" aria-expanded="false" tabindex="0">
      <div class="property-photo" style="${property.image ? `background-image: url('${escapeHtml(property.image)}'); background-size: cover; background-position: center;` : ''}">
        <div class="photo-badge">${escapeHtml(health.label)}</div>
      </div>
      <div class="property-body">
        <div class="health-line ${health.tone}">
          <span></span>
          <strong>${escapeHtml(health.label)}</strong>
          <small>${escapeHtml(health.detail)}</small>
        </div>
        <span class="pill ${escapeHtml(property.statusClass || "success")}">${escapeHtml(property.status || "New listing")}</span>
        <h3>${escapeHtml(property.name)}</h3>
        <p class="property-meta">${escapeHtml(property.type)} - ${escapeHtml(property.address)}</p>
        <p><strong>${escapeHtml(property.units)}</strong><br>${escapeHtml(property.rent)}</p>
        <div class="mini-deal">
          <span>Brokerage</span><strong>${terms.brokerage}</strong>
          <span>Tenant saves</span><strong>${terms.savings}</strong>
          <span>Video</span><strong>${escapeHtml(terms.videoFreshness)}</strong>
        </div>
        <div class="decision-cues">
          <span>${property.matchScore || 80}% match</span>
          <span>AI trust ${intelligence.score}</span>
          <span>${escapeHtml(property.ownerResponse || "Response time pending")}</span>
          <span>${property.savedCount || 0} shortlists</span>
        </div>
        <div class="ai-video-review">
          <span><strong>${escapeHtml(intelligence.video.label)}</strong>${escapeHtml(intelligence.video.detail)}</span>
          <span><strong>${escapeHtml(intelligence.rent.label)}</strong>${escapeHtml(intelligence.rent.detail)}</span>
        </div>
        <div class="ideal-tenant-box" style="margin-top:16px; background:#f5f6f8; padding:12px; border-radius:8px;">
          <label style="display:block; font-weight:600; margin-bottom:6px; font-size:14px;">Ideal Tenant Profile (For AI Matching)</label>
          <textarea data-tenant-profile-id="${escapeHtml(property.id)}" style="width:100%; padding:8px; border:1px solid var(--line); border-radius:4px; font-size:14px; min-height:60px;" placeholder="Describe your ideal tenant (e.g. Family only, no pets, working professionals)">${escapeHtml(property.idealTenantProfile || "")}</textarea>
          <button class="secondary small save-tenant-profile-btn" data-property-id="${escapeHtml(property.id)}" style="margin-top:8px;">Save Profile</button>
        </div>
        ${live ? `<div class="attest-freshness">Attested videos expire every ${ATTESTATION_VALID_DAYS} days. Current video age: ${age} days.</div>` : `<div class="publish-lock">${expired ? "Attested video expired. Record a fresh video to publish again." : "Attested video is mandatory before this property appears in search, posters, or map listings."}</div>`}
        <div class="card-actions">
          ${cardActions}
        </div>
      </div>
    </article>
  `;
}

function getTenantFilteredListings() {
  let list = getLiveListings();
  if (tenantPropertyFilter === "Best") {
    const rents = list.map((property) => parseCurrency(property.rent)).filter(Boolean);
    const midpoint = rents.length ? rents.sort((a, b) => a - b)[Math.floor(rents.length / 2)] : 0;
    list = list.filter((property) => parseCurrency(property.rent) <= midpoint || (property.matchScore || 0) >= 90);
  } else if (tenantPropertyFilter !== "All") {
    list = list.filter((property) => getMappedPropertyType(property) === tenantPropertyFilter);
  }
  return list
    .map((property) => ({ ...property, tenantScore: getPropertyScore(property) }))
    .sort((a, b) => b.tenantScore - a.tenantScore);
}

function getTenantTags(property = {}, rank = 1) {
  const tags = ["Attested video", "Zero brokerage"];
  if (rank === 1 || (property.savedCount || 0) >= 35) tags.unshift("Guest favorite");
  if ((property.matchScore || 0) >= 90) tags.push("Top match");
  if (parseCurrency(property.rent) <= 16000) tags.push("Best price");
  return tags.slice(0, 4);
}

function tenantListingCard(property, index) {
  const terms = getPropertyTerms(property);
  const rank = getRegionalRankingForProperty(property);
  const tags = getTenantTags(property, index + 1);
  const age = getAttestationAgeDays(property);
  const intelligence = getAiTrustIntelligence(property);
  return `
    <article class="property-card tenant-listing-card">
      <div class="tenant-listing-photo">
        <span class="tenant-listing-rank">#${rank?.rank || index + 1}</span>
        <span class="tenant-listing-price">${escapeHtml((property.rent || "Rent shown").replace(/ monthly/gi, ""))}</span>
      </div>
      <div class="tenant-listing-body">
        <div class="tenant-tags">
          ${tags.map((tag) => `<span class="tenant-tag ${tag.includes("Guest") || tag.includes("Best") ? "hot" : "trust"}">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <h3>${escapeHtml(property.name)}</h3>
        <p>${escapeHtml(property.address)}</p>
        <div class="tenant-card-metrics">
          <span><strong>${intelligence.score}</strong> trust</span>
          <span><strong>${rank ? `#${rank.rank}/${rank.total}` : "#1"}</strong> region</span>
          <span><strong>${age}d</strong> video age</span>
        </div>
        <div class="mini-deal">
          <span>Brokerage</span><strong>${terms.brokerage}</strong>
          <span>AI rent</span><strong>${escapeHtml(intelligence.rent.label)}</strong>
          <span>Risk guard</span><strong>${escapeHtml(intelligence.guard.label)}</strong>
        </div>
        <div class="card-actions">
          <button data-tenant-view-property="${escapeHtml(property.id || property.name)}">View property</button>
          <button data-view-jump="mapView">Map</button>
        </div>
      </div>
    </article>
  `;
}

function renderTenantPropertyDiscovery() {
  const results = document.querySelector("#tenant-property-results");
  const rankings = document.querySelector("#tenant-rankings-list");
  if (!results && !rankings) return;
  const filtered = getTenantFilteredListings();
  if (results) {
    results.innerHTML = filtered.length
      ? filtered.map(tenantListingCard).join("")
      : `<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:24px;">No attested listings match this filter.</div>`;
  }
  if (rankings) {
    const ranked = getTopRankedProperties(5);
    rankings.innerHTML = ranked.map((property, index) => {
      const rank = getRegionalRankingForProperty(property);
      return `
        <div class="ranking-item">
          <span class="ranking-num">${index + 1}</span>
          <strong>${escapeHtml(property.name)}</strong>
          <span class="ranking-rent">#${rank?.rank || 1} ${escapeHtml(rank?.region || "Lucknow")}</span>
          <span class="ranking-score">${property.matchScore || 80}%</span>
        </div>
      `;
    }).join("");
  }
}

function render() {
  const liveListings = getLiveListings();
  const draftListings = getDraftListings();
  renderRankings();
  document.querySelector("#dashboard-properties").innerHTML = liveListings.slice(0, 2).map(propertyCard).join("");
  const propertiesList = document.querySelector("#properties-list");
  if (propertiesList) {
    if (properties.length === 0) {
      propertiesList.innerHTML = `
        <div style="text-align:center;padding:40px 20px;background:var(--soft);border-radius:12px;border:1px dashed var(--line);margin:20px 0;">
          <div style="font-size:40px;margin-bottom:12px;">🏠</div>
          <h3 style="margin:0 0 8px;font-size:16px;">No properties yet</h3>
          <p style="margin:0 0 16px;font-size:13px;color:var(--muted);max-width:300px;margin-inline:auto;">Add your first property with an attested video to start getting verified leads.</p>
          <button class="primary" onclick="openAddPropertyWizard()" style="padding:10px 20px;">+ Add Property</button>
        </div>
      `;
    } else {
      propertiesList.innerHTML = properties.map(propertyCard).join("");
    }
  }
  const homePrimaryAction = document.querySelector("#home-primary-action");
  if (homePrimaryAction) homePrimaryAction.textContent = draftListings.length
    ? t("attention.count", { n: draftListings.length })
    : t("all.clear");
  const homeLiveCount = document.querySelector("#home-live-count");
  if (homeLiveCount) homeLiveCount.textContent = String(liveListings.length || 0);
  const homeDraftCount = document.querySelector("#home-draft-count");
  if (homeDraftCount) homeDraftCount.textContent = String(draftListings.length || 0);
  const ownerListedCount = document.querySelector("#owner-listed-count");
  if (ownerListedCount) ownerListedCount.textContent = String(liveListings.length || 0);
  const ownerBrokerageSaved = document.querySelector("#owner-brokerage-saved");
  if (ownerBrokerageSaved) ownerBrokerageSaved.textContent = getBrokerageSavedTotal(properties);
  const ownerAttentionItems = buildOwnerAttentionItems(properties);
  const ownerAttentionCount = document.querySelector("#owner-attention-count");
  if (ownerAttentionCount) ownerAttentionCount.textContent = String(ownerAttentionItems.filter((item) => item.tone !== "green").length);
  const landlordRank = getLandlordRegionalRanking();
  const ownerRankValue = document.querySelector("#owner-rank-value");
  if (ownerRankValue && landlordRank) ownerRankValue.textContent = `#${landlordRank.rank}`;
  const ownerRankDetail = document.querySelector("#owner-rank-detail");
  if (ownerRankDetail && landlordRank) {
    ownerRankDetail.textContent = `${landlordRank.property.name} in ${landlordRank.region}`;
  }
  const tenantRank = getTenantRegionalRanking();
  const tenantRankValue = document.querySelector("#tenant-rank-value");
  if (tenantRankValue && tenantRank) tenantRankValue.textContent = `#${tenantRank.rank} in ${tenantRank.region}`;
  const tenantRankDetail = document.querySelector("#tenant-rank-detail");
  if (tenantRankDetail && tenantRank) {
    tenantRankDetail.textContent = `${tenantRank.property.name} scores ${tenantRank.score} for verified, zero-brokerage search.`;
  }
  renderTenantPropertyDiscovery();
  const tenantListings = getLiveListings();
  const tenantLiveCount = document.querySelector("#tenant-live-count");
  if (tenantLiveCount) tenantLiveCount.textContent = String(tenantListings.length || 0);
  const tenantBrokerageSaved = document.querySelector("#tenant-brokerage-saved");
  if (tenantBrokerageSaved) tenantBrokerageSaved.textContent = getBrokerageSavedTotal(tenantListings);
  const tenantBestMatch = document.querySelector("#tenant-best-match");
  if (tenantBestMatch) tenantBestMatch.textContent = `${Math.max(...tenantListings.map((property) => property.matchScore || 0), 0)}%`;
  const tenantRecoList = document.querySelector("#tenant-reco-list");
  if (tenantRecoList) {
    tenantRecoList.innerHTML = getTopRankedProperties(2).map((property) => `
      <article class="owner-row green">
        <div>
          <strong>${escapeHtml(property.name)}</strong>
          <span>${escapeHtml(property.rent)} - ${property.matchScore || 80}% match</span>
        </div>
        <small>${(property.savedCount || 0) >= 35 ? "Guest favorite" : "Verified"}</small>
      </article>
    `).join("");
  }
  const tenantAlertList = document.querySelector("#tenant-alert-list");
  if (tenantAlertList) {
    const alerts = tenantRequests.length ? tenantRequests : [{ title: "No open repair request", status: "Clear", priority: "Good", date: "Today" }];
    tenantAlertList.innerHTML = alerts.map((request) => `
      <article class="owner-row ${request.emergency ? "red" : ""}">
        <div>
          <strong>${escapeHtml(request.title)}</strong>
          <span>${escapeHtml(request.status || request.date || "")}</span>
        </div>
        <small>${escapeHtml(request.priority || "Open")}</small>
      </article>
    `).join("");
  }
  const ownerRequestCount = document.querySelector("#owner-request-count");
  if (ownerRequestCount) {
    const attentionCount = ownerAttentionItems.filter((item) => item.tone !== "green").length;
    const notificationCount = document.body.dataset.role === "tenant"
      ? tenantRequests.length
      : (requests.length || 0) + attentionCount;
    ownerRequestCount.textContent = String(notificationCount || 0);
  }
  const ownerRequestList = document.querySelector("#owner-request-list");
  if (ownerRequestList) {
    ownerRequestList.innerHTML = (requests.length ? requests : [{ title: t("owner.empty"), unit: t("owner.empty.detail"), status: t("owner.empty.status"), priority: "Low" }]).map((request) => `
      <article class="owner-row ${request.emergency ? "red" : ""}">
        <div>
          <strong>${escapeHtml(request.title)}</strong>
          <span>${escapeHtml(request.unit || t("owner.unit.fallback"))}</span>
        </div>
        <small>${escapeHtml(request.status || request.priority || t("owner.status.fallback"))}</small>
      </article>
    `).join("");
  }
  
  const agentActivityList = document.querySelector("#agent-activity-list");
  if (agentActivityList) {
    const activities = [
      { text: "Drafted WhatsApp reminder for Flat C", time: "10 mins ago" },
      { text: "Matched 3 new tenant leads to Indira Nagar PG", time: "1 hr ago" },
      { text: "Routed plumbing issue to Caretaker Ramesh", time: "3 hrs ago" }
    ];
    agentActivityList.innerHTML = activities.map((activity) => `
      <article class="owner-row" style="padding: 12px 16px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="font-size: 20px;">🤖</span>
          <div>
            <strong style="display: block; font-size: 14px; font-weight: 500; color: var(--text);">${activity.text}</strong>
            <span style="font-size: 12px; color: var(--muted);">${activity.time}</span>
          </div>
        </div>
      </article>
    `).join("");
  }
  const ownerAttentionList = document.querySelector("#owner-attention-list");
  if (ownerAttentionList) {
    ownerAttentionList.innerHTML = ownerAttentionItems.map((item) => `
      <article class="owner-row ${escapeHtml(item.tone)}">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.detail)}</span>
        </div>
        <small>${item.tone === "red" ? t("attention.delisted") : item.tone === "yellow" ? t("attention.fix") : t("attention.clear")}</small>
      </article>
    `).join("");
  }
  const tenantBalance = document.querySelector(".tenant-balance-card h2");
  if (tenantBalance) tenantBalance.textContent = "INR 15,500";
  document.querySelector("#rent-list").innerHTML = rentRows.map((row) => `
    <div class="table-row">
      <span>${row.unit}</span><span>${row.tenant}</span><span>${row.amount}</span>
      <span><span class="pill ${row.status === "Paid" ? "success" : row.status === "Overdue" ? "danger" : "vacant"}">${row.status}</span></span>
      <span style="display: flex; gap: 8px;">
        <button class="secondary small landlord-rent-action-btn" data-unit="${row.unit}" data-action="${row.action}">${row.action}</button>
        ${row.status === 'Overdue' ? `<button class="primary small landlord-rent-action-btn" data-unit="${row.unit}" data-action="AI Reminder" style="background: var(--primary);">🤖 Draft Msg</button>` : ''}
      </span>
    </div>
  `).join("");
  const maintListEl = document.querySelector("#maint-list");
  if (maintListEl) {
    if (!requests.length) {
      maintListEl.innerHTML = `<div style="text-align:center;color:var(--muted);padding:24px;font-size:14px;">${t("empty.maint")}</div>`;
    } else {
      maintListEl.innerHTML = requests.map((request) => `
        <article class="request-card ${request.emergency ? "emergency" : ""}">
          <div>
            <span class="pill ${request.emergency ? "danger" : "warning"}">${request.priority}</span>
            <h3>${request.title}</h3>
            <p>${request.unit}</p>
          </div>
          <div>
            <strong>${request.status}</strong>
            <p>${t("maint.updated")}</p>
          </div>
        </article>
      `).join("");
    }
  }

  document.querySelector("#tenant-rent-history").innerHTML = tenantRentHistory.map((row) => `
    <div class="table-row">
      <span>${row.month}</span><span>${row.amount}</span>
      <span><span class="pill success">${row.status}</span></span>
      <span>${row.date}</span>
      <span><button class="secondary small tenant-rent-action-btn ${row.action === 'Reminder Set' ? 'success' : ''}" data-month="${row.month}" data-action="${row.action}">${row.action}</button></span>
    </div>
  `).join("");

  document.querySelector("#tenant-request-list").innerHTML = tenantRequests.map((request) => `
    <article class="request-card ${request.emergency ? "emergency" : ""}">
      <div>
        <span class="pill ${request.emergency ? "danger" : request.status === "Resolved" ? "success" : "warning"}">${request.priority}</span>
        <h3>${request.title}</h3>
        <p>Reported on ${request.date}</p>
      </div>
      <div>
        <strong>${request.status}</strong>
      </div>
    </article>
  `).join("");
}

function extractListingDetailsFromText(text) {
  const draft = { ...listingDraft, sourceText: text };
  const lower = text.toLowerCase();
  const rentMatch = text.match(/(?:rent|rs|inr|₹)\s*[:\-]?\s*(\d[\d,]{2,})/i) || text.match(/(\d[\d,]{2,})\s*(?:per month|monthly|\/month)/i);
  const depositMatch = text.match(/(?:deposit|security)\s*[:\-]?\s*([a-z0-9,\s]+?)(?:,|\.| available| family| bachelor| furnished|$)/i);
  const bhkMatch = text.match(/(\d+\s?bhk|pg|commercial|shop|office|flat)/i);
  const pinMatch = text.match(/\b(22\d{4})\b/);
  const dateMatch = text.match(/(?:available|from|move in|move-in)\s*(?:from)?\s*([0-3]?\d[\/\-.][01]?\d[\/\-.]\d{2,4}|[0-3]?\d\s+[a-z]+\s+\d{4}|[a-z]+\s+\d{1,2})/i);
  const localityMatch = text.match(/\b(?:in|at|near)\s+([a-z][a-z\s]+?)(?:,| with| rent| deposit| available|$)/i);

  if (bhkMatch) {
    const rawType = bhkMatch[1].trim();
    draft.type = rawType.toLowerCase().includes("pg") ? "PG" : rawType.toLowerCase().includes("shop") || rawType.toLowerCase().includes("office") || rawType.toLowerCase().includes("commercial") ? "Commercial" : "Flat";
    draft.name = rawType.toUpperCase().includes("BHK") ? `${rawType.toUpperCase()} Listing` : `${rawType[0].toUpperCase()}${rawType.slice(1)} Listing`;
  }
  if (localityMatch) {
    const locality = localityMatch[1].trim().replace(/\s+/g, " ");
    draft.address = `${locality.replace(/\b\w/g, (letter) => letter.toUpperCase())}, Lucknow`;
    if (!draft.name) draft.name = `${locality.replace(/\b\w/g, (letter) => letter.toUpperCase())} ${draft.type}`;
  }
  if (rentMatch) draft.rent = `${formatInr(rentMatch[1])} monthly`;
  if (depositMatch) draft.deposit = depositMatch[1].trim();
  if (pinMatch) draft.pincode = pinMatch[1];
  if (dateMatch) draft.availability = dateMatch[1].trim();
  draft.furnishing = lower.includes("fully furnished") ? "Fully furnished" : lower.includes("semi furnished") || lower.includes("semi-furnished") ? "Semi furnished" : lower.includes("unfurnished") ? "Unfurnished" : draft.furnishing;
  draft.maintenance = lower.includes("maintenance extra") ? "Extra" : lower.includes("maintenance included") || lower.includes("including maintenance") ? "Included" : draft.maintenance;
  draft.restrictions = lower.includes("family") ? "Family preferred" : lower.includes("bachelor") ? "Bachelors allowed" : draft.restrictions;
  return draft;
}

function syncListingDraftToForm() {
  const fieldMap = {
    "add-prop-name": listingDraft.name,
    "add-prop-type": listingDraft.type,
    "add-prop-address": listingDraft.address,
    "add-prop-pin": listingDraft.pincode || "",
    "add-prop-rent": listingDraft.rent,
    "add-prop-deposit": listingDraft.deposit,
    "add-prop-maintenance": listingDraft.maintenance,
    "add-prop-availability": listingDraft.availability,
    "add-prop-restrictions": listingDraft.restrictions,
    "add-prop-furnishing": listingDraft.furnishing
  };
  Object.entries(fieldMap).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (field && value) field.value = value;
  });
}

function updateListingPreview() {
  const preview = document.getElementById("listing-preview");
  if (!preview) return;
  const required = [
    ["Name", document.getElementById("add-prop-name")?.value],
    ["Address", document.getElementById("add-prop-address")?.value],
    ["Rent", document.getElementById("add-prop-rent")?.value],
    ["Deposit", document.getElementById("add-prop-deposit")?.value],
    ["Availability", document.getElementById("add-prop-availability")?.value]
  ];
  const missing = required.filter(([, value]) => !value).map(([label]) => label);
  const rent = document.getElementById("add-prop-rent")?.value || listingDraft.rent || "Rent pending";
  const savings = estimateBrokerageSavings(rent);
  preview.innerHTML = `
    <span class="pill warning">${missing.length ? "Needs details" : "Draft only"}</span>
    <h3>${escapeHtml(document.getElementById("add-prop-name")?.value || listingDraft.name || "Draft listing")}</h3>
    <p>${escapeHtml(document.getElementById("add-prop-address")?.value || listingDraft.address || "Address pending")}</p>
    <div class="deal-grid compact">
      <span>Rent</span><strong>${escapeHtml(rent)}</strong>
      <span>Brokerage</span><strong>INR 0</strong>
      <span>Tenant saves</span><strong>${savings}</strong>
      <span>Attest steps</span><strong>${attestedVideoSteps.length} guided shots</strong>
    </div>
    <p class="safety-note">${missing.length ? `Ask: ${missing.join(", ")}` : "This will be saved as a blocked draft. Record attested video to publish it live."}</p>
  `;
}

function startListingVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const source = document.getElementById("listing-source");
  if (!SpeechRecognition || !source) {
    alert("Voice input is not supported in this browser. Type the property details instead.");
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.onresult = (event) => {
    source.value = event.results[0][0].transcript;
    listingDraft = extractListingDetailsFromText(source.value);
    syncListingDraftToForm();
    updateListingPreview();
  };
  recognition.start();
}

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
function getSheet(name) {
  const sheets = {
    geminiKey: `
      <h2>Gemini API key</h2>
      <p>Your key is stored only in this browser's localStorage for the prototype. Do not commit API keys to git.</p>
      <label>API key<input id="gemini-key-input" type="password" placeholder="Paste Gemini API key"></label>
      <div class="button-row">
        <button class="primary" id="save-gemini-key">Save key</button>
        <button class="secondary" id="clear-gemini-key">Clear key</button>
      </div>
    `,
    addProperty: `<p style="color:var(--muted)">Use the wizard.</p>`,

    attest: `
      <h2>${t("modal.attest.title")}</h2>
      <p>${t("modal.attest.desc")}</p>
      <div class="attention-band"><div><span class="pill danger">REC</span><h2>00:00 / 03:00</h2></div><button class="secondary">Start</button></div>
      <button class="primary">${t("modal.attest.upload")}</button>
    `,
    newRequest: `
      <h2>${t("modal.request.title")}</h2>
      <div class="form-grid">
        <label>${t("modal.request.cat")}<input id="req-cat" placeholder="${t("modal.request.cat.ph")}"></label>
        <label>${t("modal.request.pri")}<input id="req-pri" placeholder="${t("modal.request.pri.ph")}"></label>
        <label>${t("modal.request.desc")}<input id="req-desc" placeholder="${t("modal.request.desc.ph")}"></label>
        <button class="primary" id="btn-save-request">${t("modal.request.submit")}</button>
      </div>
    `,
  };
  return sheets[name] || "";
}

// =====================================================================
// ADD PROPERTY WIZARD — 6-step guided flow
// =====================================================================

const LUCKNOW_LOCALITIES = [
  "Gomti Nagar", "Vibhuti Khand", "Indira Nagar", "Aliganj",
  "Hazratganj", "Mahanagar", "Rajajipuram", "Charbagh",
  "Alambagh", "Vikas Nagar", "Sushant Golf City", "Jankipuram",
  "Lalbagh", "Aminabad", "Ashiyana", "Patrakarpuram",
  "Nishatganj", "Telibagh", "Kalyanpur", "Krishna Nagar",
  "Tiwariganj", "Anora Kala"
];

const LOCALITY_PINCODES = {
  "Gomti Nagar": "226010", "Vibhuti Khand": "226010", "Indira Nagar": "226016", "Aliganj": "226024",
  "Hazratganj": "226001", "Mahanagar": "226006", "Rajajipuram": "226017", "Charbagh": "226004",
  "Alambagh": "226005", "Vikas Nagar": "226022", "Sushant Golf City": "226030", "Jankipuram": "226021",
  "Lalbagh": "226001", "Aminabad": "226018", "Ashiyana": "226012", "Patrakarpuram": "226010",
  "Nishatganj": "226006", "Telibagh": "226002", "Kalyanpur": "226022", "Krishna Nagar": "226012",
  "Tiwariganj": "226028", "Anora Kala": "226028"
};

let wizardMiniMap = null;
let wizardMiniMarker = null;

let wizardLocalStream = null;
let wizardMediaRecorder = null;
let wizardRecordedChunks = [];
let wizardAnimationFrame = null;
let wizardCapturedFrame = null; // base64 JPEG for AI

function resetWizardState() {
  wizardState = {
    step: 1,
    type: "PG",
    locality: "",
    flatNo: "",
    street: "",
    landmark: "",
    address: "",
    pincode: "",
    pinLat: null,
    pinLng: null,
    videoRecorded: false,
    frameBase64: null,
    ai: { sqft: "", bhk: "", furnishing: "", condition: "", lighting: "" },
    name: "",
    bhk: "",
    sqft: "",
    furnishing: "",
    availability: "",
    restrictions: "",
    rent: "",
    deposit: "",
    maintenance: "Included",
    rentReasoning: "",
    idealTenantProfile: "",
  };
  wizardCapturedFrame = null;
  wizardRecordedChunks = [];
}

window.wizHandleCoverImage = function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => { 
      wizardState.coverImage = ev.target.result;
      const preview = document.getElementById("wiz-cover-preview");
      if (preview) preview.innerHTML = `<img src="${wizardState.coverImage}" style="max-height:100px;border-radius:6px;">`;
    };
    reader.readAsDataURL(file);
  }
};

function openAddPropertyWizard() {
  resetWizardState();
  modal.classList.add("active");
  modal.innerHTML = `
    <div class="wizard-sheet" id="wizard-sheet">
      <div class="wizard-header">
        <h2>Add New Property</h2>
        <button class="wizard-close" id="wizard-close-btn" aria-label="Close">×</button>
      </div>
      <div class="wizard-steps" id="wizard-steps-bar" style="display:none;"></div>
      <div class="wizard-body" id="wizard-body" style="padding:24px;">
        <h3 style="margin-bottom: 24px;">How would you like to add your listing?</h3>
        
        <div style="display:flex; flex-direction:column; gap: 16px;">
          <div class="property-card" style="padding: 20px; cursor: pointer; border: 2px solid var(--line); display:flex; gap: 16px; align-items: center;" onclick="document.getElementById('wizard-steps-bar').style.display='flex'; document.getElementById('wizard-nav').style.display='flex'; renderWizardStep(1);">
            <div style="font-size: 32px;">📝</div>
            <div>
              <h4 style="margin: 0 0 4px; font-size: 16px;">Fill Manually</h4>
              <p style="margin: 0; font-size: 13px; color: var(--muted);">Standard step-by-step form entry</p>
            </div>
          </div>
          
          <div class="property-card" style="padding: 20px; cursor: pointer; border: 2px solid var(--primary); display:flex; gap: 16px; align-items: center; background: rgba(0, 102, 255, 0.05);" onclick="document.getElementById('poster-upload').click()">
            <div style="font-size: 32px;">📸</div>
            <div>
              <h4 style="margin: 0 0 4px; font-size: 16px; color: var(--primary);">Poster to Listing <span class="pill success" style="font-size: 10px; padding: 2px 6px;">HERO</span></h4>
              <p style="margin: 0; font-size: 13px; color: var(--muted);">Upload a photo of your 'To-Let' poster and we'll instantly pre-fill everything.</p>
            </div>
            <input type="file" id="poster-upload" accept="image/*" style="display:none" onchange="handlePosterUpload(event)">
          </div>
        </div>
      </div>
      <div class="wizard-nav" id="wizard-nav" style="display:none;">
        <button class="secondary" id="wizard-back-btn" disabled>← Back</button>
        <div style="font-size:12px;color:var(--muted);font-weight:700;" id="wizard-step-label">Step 1 of 6</div>
        <button class="primary" id="wizard-next-btn">Next →</button>
      </div>
    </div>`;

  document.getElementById("wizard-close-btn").addEventListener("click", closeWizard);
  document.getElementById("wizard-back-btn").addEventListener("click", wizardBack);
  document.getElementById("wizard-next-btn").addEventListener("click", wizardNext);
}

window.handlePosterUpload = async function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const body = document.getElementById("wizard-body");
  body.innerHTML = `
    <div style="text-align: center; padding: 40px 20px; display:flex; flex-direction:column; align-items:center; gap: 16px;">
      <div class="ai-spinner" style="width:40px; height:40px; border-width:4px;"></div>
      <h3 style="margin:0;">✨ AI is reading your poster...</h3>
      <p style="color: var(--muted); margin:0;">Extracting rent, config, and contact details from image.</p>
    </div>
  `;

  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result.split(",")[1];
      const mimeType = file.type;

      const prompt = `You are an expert real estate data extractor. Extract property details from this 'To-Let' poster. 
Return ONLY a valid JSON object with these exact keys. Do not include markdown.
- "property_type": (e.g. "Flat", "PG", "Commercial", "Apartment")
- "bhk": (e.g. "1 BHK", "2 BHK")
- "rent": (extract just the number or string, e.g. "35000")
- "deposit": (extract the deposit details, e.g. "6 Months Rent")
- "locality": (the general area name, e.g. "Chembur", "Indira Nagar")
- "street": (specific street, building, or address, e.g. "Shanti Niwas, Ganesh Nagar")
- "flatNo": (house/flat/floor number, e.g. "3rd Floor")
- "pincode": (extract if present)
- "furnishing": ("Unfurnished", "Semi-furnished", or "Fully furnished")
- "restrictions": (e.g. "Family / Bachelors (Vegetarian only)")
- "sqft": (extract the area in Sq Ft, e.g. "950")
- "facilities": (extract any facilities mentioned)
- "contact": (extract the phone numbers)
If any detail is missing, leave it as an empty string.`;

      let aiResultText;
      try {
        aiResultText = await callGemini(prompt, base64Data, mimeType, "application/json");
      } catch (err) {
        return;
      }

      try {
        const cleanJson = aiResultText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const extracted = JSON.parse(cleanJson);
        
        wizardState.type = extracted.property_type && extracted.property_type.toLowerCase().includes("pg") ? "PG" : "Flat";
        wizardState.locality = extracted.locality || "Unknown Locality";
        wizardState.name = (extracted.locality && extracted.bhk) ? `${extracted.bhk} in ${extracted.locality}` : "New Property";
        wizardState.bhk = extracted.bhk || "";
        wizardState.rent = extracted.rent || "";
        wizardState.deposit = extracted.deposit || "";
        wizardState.flatNo = extracted.flatNo || "";
        wizardState.street = extracted.street || "";
        wizardState.address = [extracted.flatNo, extracted.street, extracted.locality].filter(Boolean).join(", ");
        wizardState.pincode = extracted.pincode || "";
        wizardState.furnishing = extracted.furnishing || "Unfurnished";
        
        // Combine restrictions and facilities into the restrictions box for now
        wizardState.restrictions = [extracted.restrictions, extracted.facilities, extracted.contact ? "Contact: " + extracted.contact : ""].filter(Boolean).join(" | ");
        wizardState.sqft = extracted.sqft || "";
        
        // Auto-assign coordinates if locality matches predefined ones, else put a default
        if (extracted.locality && typeof LOCALITY_COORDS !== 'undefined' && LOCALITY_COORDS[extracted.locality]) {
            wizardState.pinLat = LOCALITY_COORDS[extracted.locality][0];
            wizardState.pinLng = LOCALITY_COORDS[extracted.locality][1];
        } else {
            // Default pin for unknown locations just so the map works
            wizardState.pinLat = 19.0522; // Chembur approx lat
            wizardState.pinLng = 72.8981; // Chembur approx lng
        }

      } catch (parseErr) {
        console.error("Failed to parse AI output:", aiResultText);
      }

      document.getElementById('wizard-steps-bar').style.display='flex';
      document.getElementById('wizard-nav').style.display='flex';
      renderWizardStep(1);
      
      setTimeout(() => {
        const btn = document.getElementById("wizard-next-btn");
        if (btn) btn.innerHTML = "Perfect, Next →";
      }, 100);
    };
    reader.readAsDataURL(file);

  } catch (error) {
    console.error(error);
    alert("AI extraction failed. Please fill manually.");
    document.getElementById('wizard-steps-bar').style.display='flex';
    document.getElementById('wizard-nav').style.display='flex';
    renderWizardStep(1);
  }
}

function closeWizard() {
  stopWizardStream();
  if (wizardAnimationFrame) cancelAnimationFrame(wizardAnimationFrame);
  // Restore original modal structure
  modal.classList.remove("active");
  modal.innerHTML = `
    <div class="sheet">
      <button class="close" aria-label="Close">×</button>
      <div id="modal-content"></div>
    </div>`;
  // Re-bind original close logic
  modal.querySelector(".close").addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("active"); });
}

function stopWizardStream() {
  if (wizardLocalStream) {
    wizardLocalStream.getTracks().forEach(t => t.stop());
    wizardLocalStream = null;
  }
  if (wizardMediaRecorder && wizardMediaRecorder.state === "recording") {
    wizardMediaRecorder.stop();
  }
  wizardMediaRecorder = null;
}

function buildStepsBar(currentStep) {
  const labels = ["Location", "Video", "AI Scan", "Details", "Rent", "Publish"];
  const bar = document.getElementById("wizard-steps-bar");
  if (!bar) return;
  let html = "";
  labels.forEach((label, i) => {
    const step = i + 1;
    const isDone = step < currentStep;
    const isActive = step === currentStep;
    html += `<div class="wizard-step-item">
      <div class="wizard-step-dot ${isDone ? "done" : isActive ? "active" : ""}">${isDone ? "✓" : step}</div>
      ${step < labels.length ? `<div class="wizard-step-line ${isDone ? "done" : ""}"></div>` : ""}
    </div>`;
  });
  bar.innerHTML = html;
  const label = document.getElementById("wizard-step-label");
  if (label) label.textContent = `Step ${currentStep} of 6`;
  const backBtn = document.getElementById("wizard-back-btn");
  if (backBtn) backBtn.disabled = currentStep === 1;
}

function renderWizardStep(step) {
  wizardState.step = step;
  buildStepsBar(step);
  const body = document.getElementById("wizard-body");
  if (!body) return;
  const renderers = [null, step1Html, step2Html, step3Html, step4Html, step5Html, step6Html];
  body.innerHTML = renderers[step]();
  // Bind step-specific events
  const nextBtn = document.getElementById("wizard-next-btn");
  if (step === 1) {
    document.querySelectorAll(".type-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".type-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        wizardState.type = card.dataset.type;
      });
    });
    document.querySelectorAll(".locality-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".locality-chip").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
        wizardState.locality = chip.dataset.locality;
        
        // Auto-fill pincode
        const autoPin = LOCALITY_PINCODES[chip.dataset.locality] || "";
        wizardState.pincode = autoPin;
        const pinInput = document.getElementById("wiz-pincode");
        if (pinInput) pinInput.value = autoPin;
        
        flyWizardMapToLocality(chip.dataset.locality);
      });
    });
    if (nextBtn) nextBtn.textContent = "Next →";
    // Init mini map after DOM is painted
    requestAnimationFrame(() => initWizardMiniMap());
  }
  if (step === 2) {
    if (nextBtn) {
      nextBtn.textContent = wizardState.videoRecorded ? "Next →" : "Skip Video →";
      nextBtn.style.background = wizardState.videoRecorded ? "" : "var(--muted)";
    }
    initWizardVideo();
  }
  if (step === 3) {
    if (nextBtn) nextBtn.textContent = "Next →";
    runAiFrameAnalysis();
  }
  if (step === 4) {
    prefillDetailsForm();
    if (nextBtn) nextBtn.textContent = "Next →";
  }
  if (step === 5) {
    if (nextBtn) nextBtn.textContent = "Next →";
    runRentRecommendation();
  }
  if (step === 6) {
    if (nextBtn) { nextBtn.textContent = "🚀 Publish Property"; nextBtn.style.background = ""; }
    prefillProfileStep();
    runTenantProfileAI();
  }
}

function saveWizardStepData(step) {
  if (step === 1) {
    wizardState.flatNo   = document.getElementById("wiz-flat")?.value   || wizardState.flatNo   || "";
    wizardState.street   = document.getElementById("wiz-street")?.value  || wizardState.street   || "";
    wizardState.landmark = document.getElementById("wiz-landmark")?.value|| wizardState.landmark || "";
    wizardState.pincode  = document.getElementById("wiz-pincode")?.value  || wizardState.pincode  || "";
    // Build composite address string
    const parts = [wizardState.flatNo, wizardState.street, wizardState.landmark].filter(Boolean);
    wizardState.address = parts.join(", ");
    if (!wizardState.type) wizardState.type = "PG";
  }
  if (step === 4) {
    wizardState.name = document.getElementById("wiz-name")?.value || "";
    wizardState.bhk = document.getElementById("wiz-bhk")?.value || "";
    wizardState.sqft = document.getElementById("wiz-sqft")?.value || "";
    wizardState.furnishing = document.getElementById("wiz-furnishing")?.value || "";
    wizardState.availability = document.getElementById("wiz-avail")?.value || "";
    wizardState.restrictions = document.getElementById("wiz-restrictions")?.value || "";
  }
  if (step === 5) {
    wizardState.rent = document.getElementById("wiz-rent")?.value || "";
    wizardState.deposit = document.getElementById("wiz-deposit")?.value || "";
    wizardState.maintenance = document.getElementById("wiz-maintenance")?.value || "Included";
  }
  if (step === 6) {
    wizardState.idealTenantProfile = document.getElementById("wiz-profile")?.value || "";
  }
}

function wizardNext() {
  saveWizardStepData(wizardState.step);
  if (wizardState.step === 1) {
    if (!wizardState.locality) { alert("Please select a locality."); return; }
    // Destroy mini map before leaving step
    if (wizardMiniMap) { wizardMiniMap.remove(); wizardMiniMap = null; wizardMiniMarker = null; }
  }
  if (wizardState.step === 6) { publishPropertyFromWizard(); return; }
  stopWizardStream();
  if (wizardAnimationFrame) { cancelAnimationFrame(wizardAnimationFrame); wizardAnimationFrame = null; }
  renderWizardStep(wizardState.step + 1);
}

function wizardBack() {
  saveWizardStepData(wizardState.step);
  stopWizardStream();
  if (wizardAnimationFrame) { cancelAnimationFrame(wizardAnimationFrame); wizardAnimationFrame = null; }
  if (wizardState.step > 1) renderWizardStep(wizardState.step - 1);
}

// --- Step 1: Location ---
const LOCALITY_COORDS = {
  "Gomti Nagar":      [26.865, 81.009],
  "Vibhuti Khand":   [26.863, 81.006],
  "Indira Nagar":    [26.875, 80.999],
  "Aliganj":         [26.890, 80.945],
  "Hazratganj":      [26.850, 80.946],
  "Mahanagar":       [26.865, 80.943],
  "Rajajipuram":     [26.825, 80.875],
  "Charbagh":        [26.831, 80.919],
  "Alambagh":        [26.826, 80.903],
  "Vikas Nagar":     [26.870, 80.973],
  "Sushant Golf City": [26.787, 80.995],
  "Jankipuram":      [26.905, 80.977],
  "Lalbagh":         [26.843, 80.934],
  "Aminabad":        [26.852, 80.930],
  "Ashiyana":        [26.834, 80.958],
  "Patrakarpuram":   [26.876, 80.960],
  "Nishatganj":      [26.860, 80.919],
  "Telibagh":        [26.810, 80.952],
  "Kalyanpur":       [26.875, 80.884],
  "Krishna Nagar":   [26.762, 80.910],
  "Tiwariganj":      [26.885, 81.050],
  "Anora Kala":      [26.880, 81.060]
};

function step1Html() {
  const typeIcons = { PG: "🏠", Flat: "🏢", Commercial: "🏪" };
  return `
    <p class="wizard-step-title">Step 1 — Location</p>
    <!-- Property type -->
    <div class="type-grid" style="margin-bottom:14px;">
      ${["PG","Flat","Commercial"].map(t => `
        <button class="type-card ${wizardState.type === t ? "selected" : ""}" data-type="${t}">
          <span class="type-card-icon">${typeIcons[t]}</span>${t}
        </button>`).join("")}
    </div>
    <!-- Two column -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start;">
      <div>
        <p style="font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.4px;margin:0 0 6px;">Locality</p>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px;">
          ${LUCKNOW_LOCALITIES.map(l => `<button class="locality-chip ${wizardState.locality === l ? "selected" : ""}" data-locality="${l}" style="min-height:30px;font-size:11px;padding:0 8px;">${l}</button>`).join("")}
        </div>
        <p style="font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.4px;margin:0 0 6px;">Address</p>
        <div style="display:grid;gap:7px;">
          <input id="wiz-flat" placeholder="Flat / House / Shop No." value="${escapeHtml(wizardState.flatNo||"")}"
            style="min-height:36px;border:1px solid var(--line);border-radius:6px;padding:0 10px;font-size:13px;background:var(--soft);color:var(--ink);">
          <input id="wiz-street" placeholder="Street / Colony / Area *" value="${escapeHtml(wizardState.street||"")}"
            style="min-height:36px;border:1px solid var(--line);border-radius:6px;padding:0 10px;font-size:13px;background:var(--soft);color:var(--ink);">
          <input id="wiz-landmark" placeholder="Landmark (optional)" value="${escapeHtml(wizardState.landmark||"")}"
            style="min-height:36px;border:1px solid var(--line);border-radius:6px;padding:0 10px;font-size:13px;background:var(--soft);color:var(--ink);">
          <input id="wiz-pincode" placeholder="Pincode" maxlength="6" type="tel" value="${escapeHtml(wizardState.pincode||"")}"
            style="min-height:36px;border:1px solid var(--line);border-radius:6px;padding:0 10px;font-size:13px;background:var(--soft);color:var(--ink);">
        </div>
      </div>
      <div>
        <p style="font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.4px;margin:0 0 6px;">📍 Pin on map</p>
        <div id="wiz-mini-map" style="height:280px;border-radius:10px;overflow:hidden;border:1px solid var(--line);"></div>
        <div id="wiz-pin-info" style="font-size:11px;color:var(--muted);margin-top:5px;font-weight:700;text-align:center;">
          ${wizardState.pinLat ? `📍 ${wizardState.pinLat.toFixed(4)}, ${wizardState.pinLng.toFixed(4)}` : "Tap map to drop pin"}
        </div>
      </div>
    </div>`;
}




function initWizardMiniMap() {
  if (!document.getElementById("wiz-mini-map")) return;
  if (typeof L === "undefined") return;
  if (wizardMiniMap) { wizardMiniMap.remove(); wizardMiniMap = null; wizardMiniMarker = null; }

  const defaultCoords = wizardState.locality && LOCALITY_COORDS[wizardState.locality]
    ? LOCALITY_COORDS[wizardState.locality]
    : [26.8467, 80.9462];

  wizardMiniMap = L.map("wiz-mini-map", { zoomControl: true, attributionControl: false }).setView(defaultCoords, 15);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 20, attribution: "© CartoDB"
  }).addTo(wizardMiniMap);

  // Restore existing pin
  if (wizardState.pinLat) {
    const pos = [wizardState.pinLat, wizardState.pinLng];
    wizardMiniMarker = L.marker(pos, { draggable: true }).addTo(wizardMiniMap);
    wizardMiniMarker.on("dragend", (e) => {
      const ll = e.target.getLatLng();
      wizardState.pinLat = ll.lat; wizardState.pinLng = ll.lng;
      updatePinInfo();
    });
  }

  wizardMiniMap.on("click", (e) => {
    const { lat, lng } = e.latlng;
    wizardState.pinLat = lat; wizardState.pinLng = lng;
    if (wizardMiniMarker) { wizardMiniMarker.setLatLng(e.latlng); }
    else {
      wizardMiniMarker = L.marker(e.latlng, { draggable: true }).addTo(wizardMiniMap);
      wizardMiniMarker.on("dragend", (ev) => {
        const ll = ev.target.getLatLng();
        wizardState.pinLat = ll.lat; wizardState.pinLng = ll.lng;
        updatePinInfo();
      });
    }
    updatePinInfo();
  });
}

function updatePinInfo() {
  const el = document.getElementById("wiz-pin-info");
  if (el && wizardState.pinLat) {
    el.textContent = `📍 Pinned: ${wizardState.pinLat.toFixed(5)}, ${wizardState.pinLng.toFixed(5)}`;
    el.style.color = "var(--primary-dark)";
  }
}

function flyWizardMapToLocality(locality) {
  if (!wizardMiniMap) return;
  const coords = LOCALITY_COORDS[locality];
  if (coords) wizardMiniMap.flyTo(coords, 15, { duration: 0.8 });
}


// --- Step 2: Video ---
function step2Html() {
  return `
    <p class="wizard-step-title">Step 2 — Attested Video</p>
    <h3 class="wizard-section-h">Record a property walkthrough</h3>
    <p class="wizard-section-p">TULO needs camera + mic + GPS. A single JPEG frame will be sent to AI for property analysis — the video stays on your device.</p>
    ${wizardState.videoRecorded ? `
      <div class="wizard-status-bar success">✅ Video recorded! A frame has been captured for AI analysis. You can re-record or continue.</div>
      <div style="display:flex;gap:10px;margin-top:12px;">
        <button class="secondary" id="wiz-rerecord-btn" style="min-height:40px;flex:1;">🔄 Re-record</button>
      </div>` : ""}
    <div class="wizard-video-area" id="wiz-video-area" style="${wizardState.videoRecorded ? "display:none;" : ""}">
      <video id="wiz-preview" autoplay muted playsinline style="display:none;"></video>
      <canvas id="wiz-canvas" width="960" height="540" style="display:none;"></canvas>
      <div id="wiz-video-placeholder" style="min-height:180px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:var(--muted);font-size:14px;font-weight:700;">
        <span style="font-size:36px;">📹</span>
        Camera preview will appear here
      </div>
    </div>
    <div class="wizard-status-bar" id="wiz-video-status" style="display:none;"></div>
    <div id="wiz-video-controls" style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
      ${!wizardState.videoRecorded ? `<button class="primary" id="wiz-access-btn" style="flex:1;">📹 Grant Camera + GPS Access</button>` : ""}
    </div>
    <div class="ai-coach-panel" style="margin-top:12px;">
      <span class="pill success">AI Walkthrough Guide</span>
      <div class="coach-grid" style="margin-top:8px;">
        <span>🚪 Entrance</span><span>🍳 Kitchen</span><span>🛁 Bathroom</span>
        <span>🛏 Bedrooms</span><span>💡 Lighting</span><span>📍 GPS Lock</span>
      </div>
      <p style="margin:8px 0 0;font-size:12px;color:var(--muted);">Walk slowly through each room. TULO will scan one frame for size, furnishing, and condition.</p>
    </div>`;
}

// --- Step 3: AI Scan ---
function step3Html() {
  return `
    <p class="wizard-step-title">Step 3 — AI Property Analysis</p>
    <h3 class="wizard-section-h">Analysing your property…</h3>
    <p class="wizard-section-p">Gemini Vision is scanning the captured frame to estimate size, furnishing, and condition.</p>
    <div id="wiz-ai-scan-area">
      <div class="ai-analyzing"><div class="ai-spinner"></div><span>Analysing frame with AI…</span></div>
    </div>`;
}

// --- Step 4: Details ---
function step4Html() {
  const ai = wizardState.ai;
  return `
    <p class="wizard-step-title">Step 4 — Property Details</p>
    <h3 class="wizard-section-h">Confirm your property</h3>
    <p class="wizard-section-p">AI has pre-filled these from your video. Edit anything that's off.</p>
    <div class="wizard-form">
      <label class="full">Property Name
        <input id="wiz-name" placeholder="${wizardState.locality} ${wizardState.type}" value="${escapeHtml(wizardState.name || (wizardState.locality + " " + wizardState.type))}">
      </label>
      <label>Type
        <select id="wiz-type-sel">
          ${["PG","Flat","Commercial"].map(tp => `<option value="${tp}" ${wizardState.type===tp?"selected":""}>${tp}</option>`).join("")}
        </select>
      </label>
      <label>BHK / Config
        <input id="wiz-bhk" placeholder="2 BHK" value="${escapeHtml(wizardState.bhk || ai.bhk)}">
      </label>
      <label>Est. Sq. Ft.
        <input id="wiz-sqft" placeholder="650" type="number" value="${escapeHtml(wizardState.sqft || ai.sqft)}">
      </label>
      <label>Furnishing
        <select id="wiz-furnishing">
          ${["Unfurnished","Semi-furnished","Fully furnished"].map(f => `<option value="${f}" ${(wizardState.furnishing||ai.furnishing)===f?"selected":""}>${f}</option>`).join("")}
        </select>
      </label>
      <label>Condition
        <select id="wiz-condition">
          ${["New","Good","Needs work"].map(c => `<option value="${c}" ${ai.condition===c?"selected":""}>${c}</option>`).join("")}
        </select>
      </label>
      <label>Available From
        <input id="wiz-avail" type="date" value="${wizardState.availability}">
      </label>
      <label class="full">Restrictions / Preferences
        <textarea id="wiz-restrictions" placeholder="Family preferred, no smoking, no pets…">${escapeHtml(wizardState.restrictions)}</textarea>
      </label>
    </div>`;
}

// --- Step 5: Rent ---
function step5Html() {
  return `
    <p class="wizard-step-title">Step 5 — Rent & Deposit</p>
    <h3 class="wizard-section-h">Set competitive rent</h3>
    <p class="wizard-section-p">AI is calculating the market rate for ${wizardState.locality}.</p>
    <div id="wiz-rent-area">
      <div class="ai-analyzing"><div class="ai-spinner"></div><span>Fetching rent recommendation…</span></div>
    </div>
    <div class="wizard-form" style="margin-top:16px;" id="wiz-rent-form">
      <label>Monthly Rent (INR)
        <input id="wiz-rent" type="number" placeholder="18000" value="${escapeHtml(wizardState.rent)}">
      </label>
      <label>Security Deposit (INR)
        <input id="wiz-deposit" type="number" placeholder="36000" value="${escapeHtml(wizardState.deposit)}">
      </label>
      <label class="full">Maintenance
        <select id="wiz-maintenance">
          <option value="Included" ${wizardState.maintenance==="Included"?"selected":""}>Included in rent</option>
          <option value="Extra" ${wizardState.maintenance==="Extra"?"selected":""}>Charged extra</option>
          <option value="Tenant handles" ${wizardState.maintenance==="Tenant handles"?"selected":""}>Tenant handles</option>
        </select>
      </label>
      <label class="full">Cover Image (optional)
        <input id="wiz-cover-image" type="file" accept="image/*" onchange="window.wizHandleCoverImage(event)" style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--soft);">
        <div id="wiz-cover-preview" style="margin-top:8px;">
          ${wizardState.coverImage ? `<img src="${wizardState.coverImage}" style="max-height:100px;border-radius:6px;">` : ""}
        </div>
      </label>
    </div>`;
}

// --- Step 6: Profile & Publish ---
function step6Html() {
  const s = wizardState;
  const rentDisplay = s.rent ? `INR ${Number(s.rent).toLocaleString("en-IN")} / month` : "Not set";
  return `
    <p class="wizard-step-title">Step 6 — Tenant Profile & Publish</p>
    <h3 class="wizard-section-h">Almost done!</h3>
    <p class="wizard-section-p">Review your listing summary and set your ideal tenant profile.</p>
    <div class="publish-summary">
      <div class="publish-summary-row"><span>Property</span><strong>${escapeHtml(s.name || s.locality + " " + s.type)}</strong></div>
      <div class="publish-summary-row"><span>Type</span><strong>${escapeHtml(s.type)}</strong></div>
      <div class="publish-summary-row"><span>Location</span><strong>${escapeHtml(s.locality)}, Lucknow</strong></div>
      <div class="publish-summary-row"><span>BHK / Size</span><strong>${escapeHtml(s.bhk || "—")} · ${escapeHtml(s.sqft || "—")} sq ft</strong></div>
      <div class="publish-summary-row"><span>Furnishing</span><strong>${escapeHtml(s.furnishing || "—")}</strong></div>
      <div class="publish-summary-row"><span>Rent</span><strong>${rentDisplay}</strong></div>
      <div class="publish-summary-row"><span>Brokerage</span><strong style="color:var(--primary-dark);">INR 0 — Zero brokerage</strong></div>
    </div>
    <label style="font-weight:700;font-size:13px;display:grid;gap:6px;margin-bottom:14px;">
      Ideal Tenant Profile
      <span id="wiz-profile-ai-status" style="font-size:11px;font-weight:700;color:var(--muted);">✨ AI is writing a profile…</span>
      <textarea id="wiz-profile" rows="5" placeholder="Describe who you'd like as a tenant…">${escapeHtml(s.idealTenantProfile)}</textarea>
    </label>
    <div class="ai-insight-notice">🏠 Publishing creates a <strong>Draft</strong> listing. Record an attested video to go live and rank higher.</div>`;
}

// --- Video logic for Step 2 ---
async function initWizardVideo() {
  const accessBtn = document.getElementById("wiz-access-btn");
  const rerecordBtn = document.getElementById("wiz-rerecord-btn");
  if (rerecordBtn) {
    rerecordBtn.addEventListener("click", () => {
      wizardState.videoRecorded = false;
      renderWizardStep(2);
    });
  }
  if (!accessBtn) return;
  accessBtn.addEventListener("click", async () => {
    accessBtn.disabled = true;
    accessBtn.textContent = "Requesting access…";
    const statusBar = document.getElementById("wiz-video-status");
    statusBar.style.display = "";
    statusBar.textContent = "Requesting camera, microphone, and GPS access…";
    try {
      wizardLocalStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: true });
      const preview = document.getElementById("wiz-preview");
      const placeholder = document.getElementById("wiz-video-placeholder");
      if (preview) { preview.srcObject = wizardLocalStream; preview.style.display = "block"; await preview.play(); }
      if (placeholder) placeholder.style.display = "none";
      statusBar.className = "wizard-status-bar success";
      statusBar.textContent = "✅ Camera and mic ready. Press Record when ready.";
      // Inject record button
      const controls = document.getElementById("wiz-video-controls");
      if (controls) controls.innerHTML = `<button class="primary" id="wiz-record-btn" style="flex:1;">⏺ Start Recording</button>`;
      document.getElementById("wiz-record-btn")?.addEventListener("click", startWizardRecording);
    } catch (err) {
      statusBar.className = "wizard-status-bar warning";
      statusBar.textContent = `⚠ Access denied: ${err.message}. You can skip and fill details manually.`;
      accessBtn.disabled = false;
      accessBtn.textContent = "📹 Try Again";
    }
  });
}

function startWizardRecording() {
  const canvas = document.getElementById("wiz-canvas");
  const preview = document.getElementById("wiz-preview");
  const statusBar = document.getElementById("wiz-video-status");
  const recordBtn = document.getElementById("wiz-record-btn");
  if (!wizardLocalStream || !canvas || !preview) return;

  canvas.style.display = "block";
  preview.style.display = "none";
  wizardRecordedChunks = [];
  let lastFrameData = null;

  function drawWizardFrame() {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(preview, 0, 0, canvas.width, canvas.height);
    lastFrameData = canvas.toDataURL("image/jpeg", 0.7).split(",")[1];
    wizardAnimationFrame = requestAnimationFrame(drawWizardFrame);
  }
  preview.style.display = "block"; // show for canvas to read
  drawWizardFrame();

  const canvasStream = canvas.captureStream(15);
  wizardLocalStream.getAudioTracks().forEach(t => canvasStream.addTrack(t));
  wizardMediaRecorder = new MediaRecorder(canvasStream);
  wizardMediaRecorder.ondataavailable = e => { if (e.data.size > 0) wizardRecordedChunks.push(e.data); };
  wizardMediaRecorder.onstop = () => {
    cancelAnimationFrame(wizardAnimationFrame);
    wizardCapturedFrame = lastFrameData;
    wizardState.frameBase64 = lastFrameData;
    wizardState.videoRecorded = true;
    if (statusBar) { statusBar.className = "wizard-status-bar success"; statusBar.textContent = "✅ Recording saved. Frame captured for AI analysis."; }
    const controls = document.getElementById("wiz-video-controls");
    if (controls) controls.innerHTML = "";
    // Update next button
    const nextBtn = document.getElementById("wizard-next-btn");
    if (nextBtn) { nextBtn.textContent = "Next →"; nextBtn.style.background = ""; }
  };
  wizardMediaRecorder.start(1000);

  let secs = 0;
  const timer = setInterval(() => {
    secs++;
    if (statusBar) statusBar.textContent = `⏺ Recording… ${secs}s (press Stop when done)`;
  }, 1000);

  if (recordBtn) {
    recordBtn.textContent = "⏹ Stop Recording";
    recordBtn.className = "primary";
    recordBtn.style.background = "var(--error)";
    recordBtn.onclick = () => {
      clearInterval(timer);
      stopWizardStream();
    };
  }
  if (statusBar) { statusBar.style.display = ""; statusBar.textContent = "⏺ Recording started…"; }
}

// --- Step 3: AI Frame Analysis ---
async function runAiFrameAnalysis() {
  const area = document.getElementById("wiz-ai-scan-area");
  if (!area) return;

  if (!wizardState.frameBase64) {
    // No frame — show skip notice
    area.innerHTML = `
      <div class="ai-insight-notice" style="flex-direction:column;align-items:flex-start;gap:6px;">
        <strong>No video frame available</strong>
        <span>Skipping AI analysis — you'll fill in details manually in the next step.</span>
      </div>`;
    return;
  }

  const prompt = `You are a property analyst AI for TULO real estate platform in Lucknow, India. Analyze this single photo from a property walkthrough video. Return ONLY a valid JSON object with exactly these keys: sqft (number, estimated floor area), bhk (string, e.g. "2 BHK"), furnishing ("Unfurnished" or "Semi-furnished" or "Fully furnished"), condition ("New" or "Good" or "Needs work"), lighting ("Good" or "Poor"). Be conservative. Return only the JSON object, no markdown.`;

  try {
    const result = await callGemini(prompt, wizardState.frameBase64, "image/jpeg", "application/json");
    let parsed;
    try { parsed = JSON.parse(result); } catch { parsed = {}; }
    wizardState.ai = {
      sqft: String(parsed.sqft || ""),
      bhk: parsed.bhk || "",
      furnishing: parsed.furnishing || "",
      condition: parsed.condition || "",
      lighting: parsed.lighting || "",
    };
    area.innerHTML = `
      <div class="ai-insight-notice" style="margin-bottom:12px;">✨ AI analysed your property from the video frame</div>
      <div class="ai-insight-grid">
        <div class="ai-insight-card highlight">
          <span class="ai-ic-label">Est. Floor Area</span>
          <span class="ai-ic-value">${wizardState.ai.sqft || "—"} sq ft</span>
        </div>
        <div class="ai-insight-card highlight">
          <span class="ai-ic-label">Configuration</span>
          <span class="ai-ic-value">${wizardState.ai.bhk || "—"}</span>
        </div>
        <div class="ai-insight-card">
          <span class="ai-ic-label">Furnishing</span>
          <span class="ai-ic-value">${wizardState.ai.furnishing || "—"}</span>
        </div>
        <div class="ai-insight-card">
          <span class="ai-ic-label">Condition</span>
          <span class="ai-ic-value">${wizardState.ai.condition || "—"}</span>
        </div>
        <div class="ai-insight-card" style="grid-column:1/-1;">
          <span class="ai-ic-label">Lighting Quality</span>
          <span class="ai-ic-value">${wizardState.ai.lighting === "Good" ? "✅ Good lighting" : wizardState.ai.lighting === "Poor" ? "⚠ Poor lighting — re-record for better trust score" : "—"}</span>
        </div>
      </div>
      <p style="font-size:12px;color:var(--muted);margin-top:12px;">These values will pre-fill the next step. You can edit anything.</p>`;
  } catch (err) {
    wizardState.ai = { sqft: "", bhk: "", furnishing: "Semi-furnished", condition: "Good", lighting: "" };
    area.innerHTML = `
      <div class="ai-insight-notice" style="border-color:#f6d38f;background:#fff8e9;color:#633806;">
        ⚠ AI analysis skipped (${escapeHtml(err.message.includes("Gemini key") ? "No Gemini API key set" : err.message)}). Fill details manually in the next step.
      </div>`;
  }
}

// --- Step 4: Pre-fill ---
function prefillDetailsForm() {
  // Values already bound via HTML value attributes in step4Html
}

// --- Step 5: Rent Recommendation ---
async function runRentRecommendation() {
  const area = document.getElementById("wiz-rent-area");
  if (!area) return;
  const { locality, type, bhk, sqft, furnishing } = wizardState;
  const prompt = `You are a Lucknow, India rental market expert for the TULO real estate platform. Property: ${type}, ${bhk || "unknown config"}, approx ${sqft || "unknown"} sq ft, ${furnishing || "semi-furnished"}, in ${locality}. Return ONLY a valid JSON object with keys: suggestedRent (number, monthly INR), suggestedDeposit (number, INR), marketRangeLow (number), marketRangeHigh (number), reasoning (string, one sentence). No markdown.`;
  try {
    const result = await callGemini(prompt, null, null, "application/json");
    let parsed;
    try { parsed = JSON.parse(result); } catch { parsed = {}; }
    const rent = parsed.suggestedRent || "";
    const deposit = parsed.suggestedDeposit || "";
    const low = parsed.marketRangeLow || "";
    const high = parsed.marketRangeHigh || "";
    const reason = parsed.reasoning || "";
    wizardState.rent = wizardState.rent || String(rent);
    wizardState.deposit = wizardState.deposit || String(deposit);
    wizardState.rentReasoning = reason;
    area.innerHTML = rent ? `
      <div class="rent-rec-card">
        <span style="font-size:11px;font-weight:800;color:var(--primary-dark);text-transform:uppercase;">✨ AI Recommended</span>
        <div class="rent-rec-amount">₹${Number(rent).toLocaleString("en-IN")}<span style="font-size:16px;font-weight:700;">/mo</span></div>
        <div class="rent-rec-range">Market range: ₹${Number(low).toLocaleString("en-IN")} – ₹${Number(high).toLocaleString("en-IN")}</div>
        ${reason ? `<div class="rent-rec-reason">${escapeHtml(reason)}</div>` : ""}
      </div>` : `<div class="ai-insight-notice" style="margin-bottom:12px;">No AI recommendation — enter rent manually below.</div>`;
    // Pre-fill inputs
    const rentInput = document.getElementById("wiz-rent");
    const depInput = document.getElementById("wiz-deposit");
    if (rentInput && !rentInput.value) rentInput.value = rent;
    if (depInput && !depInput.value) depInput.value = deposit;
  } catch (err) {
    area.innerHTML = `<div class="ai-insight-notice" style="border-color:#f6d38f;background:#fff8e9;color:#633806;margin-bottom:12px;">⚠ Rent AI unavailable. Enter manually.</div>`;
  }
}

// --- Step 6: AI Tenant Profile ---
function prefillProfileStep() {
  const ta = document.getElementById("wiz-profile");
  if (ta && wizardState.idealTenantProfile) ta.value = wizardState.idealTenantProfile;
}

async function runTenantProfileAI() {
  const statusEl = document.getElementById("wiz-profile-ai-status");
  const ta = document.getElementById("wiz-profile");
  if (!ta || ta.value) { if (statusEl) statusEl.textContent = ""; return; }
  const { type, locality, bhk, sqft, furnishing, restrictions } = wizardState;
  const prompt = `Write a concise 3-4 sentence ideal tenant profile for this property in Lucknow: ${type}, ${bhk || ""}, ${sqft ? sqft + " sq ft" : ""}, ${furnishing || ""}, located in ${locality}. Additional preferences: ${restrictions || "none specified"}. Cover: who fits best, lifestyle compatibility, one red flag to watch for. Plain English.`;
  try {
    const result = await callGemini(prompt);
    if (ta) ta.value = result;
    wizardState.idealTenantProfile = result;
    if (statusEl) statusEl.textContent = "✨ AI-generated — edit freely";
  } catch {
    if (statusEl) statusEl.textContent = "Fill in manually";
  }
}

// --- Publish ---
async function publishPropertyFromWizard() {
  saveWizardStepData(6);
  const s = wizardState;
  const pId = `listing-${Date.now()}`;
  const coords = (s.pinLat && s.pinLng)
    ? { lat: s.pinLat, lng: s.pinLng }
    : inferListingCoordinates(s.address || s.locality);
  const newProp = {
    id: pId,
    name: s.name || `${s.locality} ${s.type}`,
    type: s.type || "PG",
    image: s.coverImage || "",
    address: `${s.address}, ${s.locality}, Lucknow`,
    units: "0 occupied",
    rent: s.rent ? `INR ${Number(s.rent).toLocaleString("en-IN")} monthly` : "Price on request",
    deposit: s.deposit ? `INR ${Number(s.deposit).toLocaleString("en-IN")}` : "Negotiable",
    maintenance: s.maintenance || "Included",
    availability: s.availability || "Available soon",
    restrictions: s.restrictions || "",
    furnishing: s.furnishing || "Not specified",
    idealTenantProfile: s.idealTenantProfile || "",
    brokerage: "INR 0",
    lat: coords.lat,
    lng: coords.lng,
    attested: false,
    attestedAt: "",
    attestationExpiresAt: "",
    listingState: "draft",
    status: "Draft — attested video required",
    statusClass: "warning",
  };
  const nextBtn = document.getElementById("wizard-next-btn");
  if (nextBtn) { nextBtn.disabled = true; nextBtn.textContent = "Publishing…"; }
  try {
    if (db) {
      await db.collection("properties").doc(pId).set(newProp);
    } else {
      properties.unshift(newProp);
      render();
    }
    closeWizard();
    switchView("properties");
  } catch (err) {
    properties.unshift(newProp);
    render();
    closeWizard();
    switchView("properties");
  }
}

const aiPrompts = {

  listing: `Write a concise rental listing for Vibhuti Khand 2BHK in Lucknow. Details: rent INR 24,000 per month, deposit INR 48,000, semi furnished, verified nearby places, attested video available, zero brokerage. Use Indian English, trustworthy tone, WhatsApp-ready, under 90 words.`,
  maintenanceTriage: `Act as TULO's Smart Maintenance Router. Triage this listing quality task: "Aliganj Main Road Shop needs a fresh attested video before ranking higher." Return strict short bullets for priority, suggestedAssignee, estimatedResolutionHours, ownerMessage, operationsNote, and confidence.`,
  leaseAutofill: `Act as TULO's Lease Autofill Engine. Pre-fill a lease summary for Indira Nagar Metro 1BHK, rent INR 15,500, deposit INR 31,000, maintenance included, start 01/06/2026. Return mandatory fields, missing fields, editable fields, and a confirmation checklist.`,
  kycReview: `Act as TULO's advisory document review assistant. For a readable identity document uploaded by an applicant, return documentType, nameReadability, imageQuality, flags, recommendation, and the disclaimer that this is not legal identity verification.`,
  leaseExplainer: `Act as TULO's Tenant Concierge. Explain the standard 'Notice Period' clause (typically 30 days notice required before vacating, otherwise deposit is forfeited) to a tenant in simple, friendly, easy-to-understand terms. Do not use legal jargon.`,
  draftMessage: `Act as TULO's Tenant Concierge. Draft a polite WhatsApp message from a renter to an owner asking to confirm a visit slot and the exact deposit terms before travelling. Keep it respectful and concise.`,
};

function getGeminiKey() {
  const envKey = window.TULO_CONFIG?.geminiApiKey || localStorage.getItem("tulo_gemini_key");
  return envKey || "";
}

function updateGeminiState() {
  const state = document.querySelector("#gemini-state");
  if (state) {
    state.textContent = getGeminiKey()
      ? t("tools.gemini.ready")
      : t("tools.gemini.missing");
  }
}

function setBusy(target, message) {
  const output = document.querySelector(target);
  if (output) output.textContent = message;
}

async function callGemini(prompt, imageBase64Data = null, mimeType = "image/jpeg", responseMimeType = "text/plain") {
  const apiKey = getGeminiKey();
  if (!apiKey) {
    modalContent.innerHTML = getSheet("geminiKey");
    modal.classList.add("active");
    throw new Error("Gemini key is not available on this device yet.");
  }

  const parts = [];
  if (imageBase64Data) {
    parts.push({
      inlineData: {
        data: imageBase64Data,
        mimeType: mimeType
      }
    });
  }
  parts.push({ text: prompt });

  const response = await fetch(geminiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: parts }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: responseMimeType
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "No Gemini output returned.";
}

function parseJsonBlock(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function generatePosterWithGemini() {
  setBusy("#poster-ai-output", "Asking Gemini for poster copy...");
  const prompt = `Create poster copy for a Lucknow rental poster. Return only JSON with keys headline, locality, rent, amenities, caption. Context: Vibhuti Khand 2BHK, INR 24,000/month, semi furnished, zero brokerage, verified nearby amenities, attested video available. Headline max 20 characters. amenities must be exactly 3 short strings.` + getLanguageInstructionShort();
  const text = await callGemini(prompt);
  const data = parseJsonBlock(text);

  if (data) {
    document.querySelector("#poster-headline-input").value = data.headline || "ROOM AVAILABLE";
    document.querySelector("#poster-headline").textContent = data.headline || "ROOM AVAILABLE";
    document.querySelector("#poster-locality").value = data.locality || "Gomti Nagar, Lucknow";
    document.querySelector("#poster-place").textContent = data.locality || "Gomti Nagar, Lucknow";
    document.querySelector("#poster-rent").value = data.rent || "INR 7,000/month";
    document.querySelector("#poster-price").textContent = data.rent || "INR 7,000/month";
    const amenities = Array.isArray(data.amenities) ? data.amenities.slice(0, 3) : ["AC", "WiFi", "Meals"];
    document.querySelector("#poster-amenities").innerHTML = amenities.map((item) => `<span>${item}</span>`).join("");
    setBusy("#poster-ai-output", data.caption || text);
    return;
  }

  setBusy("#poster-ai-output", text);
}

async function runAiAction(action) {
  if (action === "poster") {
    await generatePosterWithGemini();
    return;
  }

  const isTenantAction = ["leaseExplainer", "draftMessage"].includes(action);
  const targetOutput = isTenantAction ? "#tenant-ai-output" : "#ai-output";
  
  if (!isTenantAction) {
    let title = "AI Tool";
    if (action === "leaseAutofill") title = "Lease Autofill";
    else if (action === "listing") title = "Vacancy Listing";
    openToolUI(title);
    
    if (action === "leaseAutofill") {
      document.querySelector("#ai-output").innerHTML = `
        <div class="poster-layout" style="grid-template-columns:300px 1fr;gap:24px;text-align:left;">
          <div>
            <h3 style="margin:0 0 16px;font-size:16px;">Property Details</h3>
            <label style="display:block;margin-bottom:12px;">Property<input id="lease-prop" value="Indira Nagar Metro 1BHK" style="width:100%;padding:8px;margin-top:4px;border:1px solid var(--line);border-radius:4px;"/></label>
            <label style="display:block;margin-bottom:12px;">Rent (INR)<input id="lease-rent" value="15,500" style="width:100%;padding:8px;margin-top:4px;border:1px solid var(--line);border-radius:4px;"/></label>
            <label style="display:block;margin-bottom:12px;">Deposit (INR)<input id="lease-dep" value="31,000" style="width:100%;padding:8px;margin-top:4px;border:1px solid var(--line);border-radius:4px;"/></label>
            <button class="primary" style="width:100%;margin-top:8px;" onclick="generateLeaseDraft()">Generate Lease Draft</button>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid var(--line);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.05);min-height:300px;" id="lease-preview">
            <div style="color:var(--muted);text-align:center;margin-top:100px;">Click Generate to preview lease draft...</div>
          </div>
        </div>
      `;
      return;
    }
    
    if (action === "listing") {
      document.querySelector("#ai-output").innerHTML = `
        <div class="poster-layout" style="grid-template-columns:300px 1fr;gap:24px;text-align:left;">
          <div>
            <h3 style="margin:0 0 16px;font-size:16px;">Target Audience</h3>
            <label style="display:block;margin-bottom:12px;">Property<input id="list-prop" value="Gomti Nagar PG" style="width:100%;padding:8px;margin-top:4px;border:1px solid var(--line);border-radius:4px;"/></label>
            <label style="display:block;margin-bottom:12px;">Target<input id="list-target" value="Bachelors / Students" style="width:100%;padding:8px;margin-top:4px;border:1px solid var(--line);border-radius:4px;"/></label>
            <button class="primary" style="width:100%;margin-top:8px;" onclick="generateListingDraft()">Create WhatsApp Post</button>
          </div>
          <div style="background:#e5ddd5;padding:24px;border-radius:8px;min-height:300px;display:flex;flex-direction:column;align-items:flex-start;" id="list-preview-container">
             <div style="background:#fff;padding:12px 16px;border-radius:0 8px 8px 8px;max-width:80%;box-shadow:0 1px 2px rgba(0,0,0,0.1);" id="list-preview">
               <div style="color:var(--muted);">Preview will appear here...</div>
             </div>
          </div>
        </div>
      `;
      return;
    }
  }

  setBusy(targetOutput, "Asking Gemini...");
  const text = await callGemini(aiPrompts[action] + getLanguageInstruction());
  setBusy(targetOutput, text);
}

function exportPoster() {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  const headline = document.querySelector("#poster-headline").textContent;
  const place = document.querySelector("#poster-place").textContent;
  const price = document.querySelector("#poster-price").textContent;
  const amenities = [...document.querySelectorAll("#poster-amenities span")].map((item) => item.textContent);

  ctx.fillStyle = "#e1f5ee";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(70, 70, 940, 940);
  const gradient = ctx.createLinearGradient(100, 100, 980, 360);
  gradient.addColorStop(0, "#9fe1cb");
  gradient.addColorStop(1, "#ef9f27");
  ctx.fillStyle = gradient;
  ctx.fillRect(110, 110, 860, 300);

  ctx.fillStyle = "#1d9e75";
  ctx.font = "700 86px Arial";
  ctx.fillText(headline, 110, 540);
  ctx.fillStyle = "#2c2c2a";
  ctx.font = "500 42px Arial";
  ctx.fillText(place, 110, 615);
  ctx.font = "700 64px Arial";
  ctx.fillText(price, 110, 720);

  ctx.font = "700 34px Arial";
  amenities.forEach((item, index) => {
    const x = 110 + index * 210;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#d3d1c7";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(x, 780, 175, 70, 35);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2c2c2a";
    ctx.fillText(item, x + 28, 826);
  });

  ctx.fillStyle = "#2c2c2a";
  ctx.font = "700 38px Arial";
  ctx.fillText("98XXX XXXXX", 110, 940);
  ctx.strokeStyle = "#2c2c2a";
  ctx.lineWidth = 5;
  ctx.strokeRect(810, 860, 110, 110);
  ctx.font = "700 32px Arial";
  ctx.fillText("QR", 844, 928);

  const link = document.createElement("a");
  link.download = "tulo-poster.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
async function handleTenantChat() {
  const input = document.querySelector("#tenant-chat-input");
  const windowEl = document.querySelector("#tenant-chat-window");
  if (!input || !windowEl) return;
  const message = input.value.trim();
  if (!message) return;
  
  input.value = "";
  
  const userDiv = document.createElement("div");
  userDiv.className = "chat-message user";
  userDiv.textContent = message;
  windowEl.appendChild(userDiv);
  windowEl.scrollTop = windowEl.scrollHeight;
  
  const aiDiv = document.createElement("div");
  aiDiv.className = "chat-message ai";
  aiDiv.textContent = "Typing...";
  windowEl.appendChild(aiDiv);
  windowEl.scrollTop = windowEl.scrollHeight;
  
  try {
    const prompt = `Act as TULO AI Concierge for a renter comparing verified zero-brokerage listings in Lucknow. Context: shortlisted listing is Indira Nagar Metro 1BHK.
You have access to Google Search Local data. If the user asks for recommendations (rental furniture, plumbers, restaurants, etc.), you MUST act as if you just searched Google Maps and provide 2-3 REAL, specific business names in or near Indira Nagar, Lucknow (e.g., Furlenco, Rentomojo, or specific local restaurants) with simulated ratings or distances. Place the recommendations directly in the chat format. Keep responses under 4 sentences, very polite. Answer this: ${message}` + getLanguageInstructionShort();
    const reply = await callGemini(prompt);
    aiDiv.textContent = reply;
  } catch (err) {
    aiDiv.textContent = "Sorry, I couldn't reach the server right now. " + err.message;
  }
  windowEl.scrollTop = windowEl.scrollHeight;
}

// --- Attested Video (WebRTC + IndexedDB) ---
let mediaRecorder;
let recordedChunks = [];
let localStream;
let attestedCanvasStream;
let attestedRecorderState = null;
let attestedAnimationFrame = null;
let attestedTimer = null;
let currentAttestPropertyId = null;

function openVideoDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open("TuloVideoDB", 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore("videos");
    };
    req.onsuccess = e => resolve(e.target.result);
  });
}

async function saveVideoBlob(blob, metadata = {}) {
  const db = await openVideoDB();
  return new Promise(res => {
    const tx = db.transaction("videos", "readwrite");
    tx.objectStore("videos").put({ blob, metadata }, "room2-attest");
    tx.oncomplete = res;
  });
}

async function loadVideoBlob() {
  const db = await openVideoDB();
  return new Promise(res => {
    const req = db.transaction("videos").objectStore("videos").get("room2-attest");
    req.onsuccess = e => res(e.target.result);
  });
}

async function deleteVideoBlob() {
  const db = await openVideoDB();
  return new Promise(res => {
    const tx = db.transaction("videos", "readwrite");
    tx.objectStore("videos").delete("room2-attest");
    tx.oncomplete = res;
  });
}

async function deleteVideoBlob() {
  const db = await openVideoDB();
  return new Promise(res => {
    const tx = db.transaction("videos", "readwrite");
    tx.objectStore("videos").delete("room2-attest");
    tx.oncomplete = res;
  });
}

async function startVideoModal(mode) {
  const modal = document.getElementById("video-modal");
  const title = document.getElementById("video-modal-title");
  const player = document.getElementById("video-player");
  const preview = document.getElementById("video-preview");
  const controls = document.getElementById("video-controls");
  
  modal.classList.add("active");
  player.style.display = "none";
  preview.style.display = "none";
  player.src = "";
  preview.srcObject = null;
  controls.innerHTML = "";
  
  if (mode === "record") {
    title.textContent = "Record Attest Video";
    preview.style.display = "block";
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      preview.srcObject = localStream;
      
      const recordBtn = document.createElement("button");
      recordBtn.className = "primary";
      recordBtn.textContent = "Start Recording";
      recordBtn.onclick = () => {
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(localStream);
        mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recordedChunks.push(e.data); };
        mediaRecorder.onstop = async () => {
          const blob = new Blob(recordedChunks, { type: "video/webm" });
          await saveVideoBlob(blob);
          alert("Attested Video saved locally (IndexedDB)!");
          closeVideoModal();
        };
        mediaRecorder.start();
        recordBtn.textContent = "Recording... (Click to Stop)";
        recordBtn.className = "primary danger";
        recordBtn.onclick = () => mediaRecorder.stop();
      };
      controls.appendChild(recordBtn);
    } catch (err) {
      title.textContent = "Camera access denied.";
    }
  } else if (mode === "play") {
    title.textContent = "Attested Property Video";
    const blob = await loadVideoBlob();
    if (blob) {
      player.style.display = "block";
      player.src = URL.createObjectURL(blob);
      player.play().catch(()=>{});
    } else {
      title.textContent = "No video recorded yet.";
    }
  }
}

function closeVideoModal() {
  document.getElementById("video-modal").classList.remove("active");
  if (localStream) {
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }
  document.getElementById("video-player").pause();
}

async function sha256Blob(blob) {
  if (!window.crypto?.subtle) return "hash-unavailable";
  const buffer = await blob.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(hashBuffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function setVideoStatus(message, tone = "info") {
  const status = document.getElementById("video-status");
  if (!status) return;
  status.className = `video-status ${tone}`;
  status.innerHTML = message;
}

function updateVideoCoach({ active = false, lowLight = false, gps = false, recording = false } = {}) {
  const coach = document.getElementById("video-ai-coach");
  if (!coach) return;
  const items = [
    { label: "Entrance", ok: active },
    { label: "Kitchen", ok: recording },
    { label: "Bathroom", ok: recording },
    { label: "Bedrooms", ok: recording },
    { label: "Light check", ok: active && !lowLight, warn: lowLight },
    { label: "GPS lock", ok: gps }
  ];
  const grid = coach.querySelector(".coach-grid");
  if (grid) {
    grid.innerHTML = items.map((item) => `
      <span class="${item.warn ? "warn" : item.ok ? "ok" : ""}">${item.ok ? "OK " : item.warn ? "LOW " : ""}${item.label}</span>
    `).join("");
  }
  const copy = coach.querySelector("p");
  if (copy) {
    copy.textContent = lowLight
      ? "AI walkthrough coach: lighting is weak, increase light before this video can earn a strong trust score."
      : recording
        ? "AI walkthrough coach is checking required shots, movement speed, GPS lock and tenant-useful evidence."
        : active
          ? "All permissions are ready. Start recording and cover the required rooms slowly."
          : "AI checks if the walkthrough is useful enough for tenants before this property can rank strongly.";
  }
}

function requestPreciseLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("GPS/location access is not available in this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracyMeters: Math.round(position.coords.accuracy || 0),
        capturedAt: new Date(position.timestamp || Date.now()).toISOString()
      }),
      (error) => reject(new Error(error.message || "Location permission was not granted.")),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

async function requestAttestationAccess() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Camera and microphone access is not available in this browser.");
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment", width: { ideal: 960 }, height: { ideal: 540 } },
    audio: true
  });

  try {
    const location = await requestPreciseLocation();
    return { stream, location };
  } catch (error) {
    stream.getTracks().forEach((track) => track.stop());
    throw error;
  }
}

function stopAttestedRecording(interruptedMessage = "") {
  if (!mediaRecorder || mediaRecorder.state === "inactive") return;
  attestedRecorderState.interruptedMessage = interruptedMessage;
  mediaRecorder.stop();
}

function drawAttestedFrame(video, canvas, startedAt) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const width = canvas.width;
  const height = canvas.height;
  ctx.drawImage(video, 0, 0, width, height);

  const sample = ctx.getImageData(0, 0, 64, 36).data;
  let total = 0;
  for (let i = 0; i < sample.length; i += 4) {
    total += (sample[i] + sample[i + 1] + sample[i + 2]) / 3;
  }
  const brightness = total / (sample.length / 4);
  const elapsedMs = Date.now() - startedAt.getTime();
  const elapsed = new Date(elapsedMs).toISOString().slice(14, 19);
  const now = new Date();
  const lowLight = brightness < 70;

  if (attestedRecorderState && lowLight) attestedRecorderState.lowLightWarnings += 1;

  ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
  ctx.fillRect(0, height - 86, width, 86);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 24px Inter, Arial";
  ctx.fillText(`TULO ATTESTED VIDEO | ${now.toLocaleString("en-IN")} | ${elapsed}`, 24, height - 48);
  ctx.font = "600 18px Inter, Arial";
  const gps = attestedRecorderState?.location
    ? `${attestedRecorderState.location.lat.toFixed(5)}, ${attestedRecorderState.location.lng.toFixed(5)} ±${attestedRecorderState.location.accuracyMeters}m`
    : "missing";
  ctx.fillText(`No pause allowed | GPS locked ${gps} | Lighting: ${lowLight ? "LOW - increase light" : "OK"}`, 24, height - 20);

  if (lowLight) {
    ctx.fillStyle = "rgba(224, 36, 36, 0.9)";
    ctx.fillRect(width - 300, 24, 276, 48);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 18px Inter, Arial";
    ctx.fillText("Increase lighting", width - 278, 55);
  }

  setVideoStatus(`
    <strong>${elapsed} recording</strong>
    <span>${lowLight ? "Lighting is low. Move closer to a light source or use torch." : "Lighting looks good. GPS, camera, and audio are locked for this attestation."}</span>
  `, lowLight ? "warning" : "success");
  updateVideoCoach({ active: true, lowLight, gps: Boolean(attestedRecorderState?.location), recording: true });

  attestedAnimationFrame = requestAnimationFrame(() => drawAttestedFrame(video, canvas, startedAt));
}

async function startVideoModal(mode) {
  const modalEl = document.getElementById("video-modal");
  const title = document.getElementById("video-modal-title");
  const player = document.getElementById("video-player");
  const playerShell = document.getElementById("video-player-shell");
  const preview = document.getElementById("video-preview");
  const canvas = document.getElementById("video-canvas");
  const controls = document.getElementById("video-controls");

  modalEl.classList.add("active");
  if (playerShell) playerShell.style.display = "none";
  preview.style.display = "none";
  canvas.style.display = "none";
  player.src = "";
  preview.srcObject = null;
  controls.innerHTML = "";
  setVideoStatus("", "info");
  updateVideoCoach();

  if (mode === "record") {
    title.textContent = t("video.record");
    setVideoStatus(`
      <strong>Access required before recording</strong>
      <span>TULO needs camera for the walkthrough, microphone for ambient proof, and precise GPS for location attestation. Recording starts only after all three are granted.</span>
      <ul class="permission-list">
        <li>Camera: required to capture the property</li>
        <li>Microphone: required for continuous, unpaused evidence</li>
        <li>GPS location: required to bind the video to the property area</li>
      </ul>
    `, "info");

    const accessBtn = document.createElement("button");
    accessBtn.className = "primary";
    accessBtn.textContent = "Grant camera, audio and GPS access";
    controls.appendChild(accessBtn);

    accessBtn.onclick = async () => {
      accessBtn.disabled = true;
      accessBtn.textContent = "Requesting permissions...";
      try {
        const access = await requestAttestationAccess();
        localStream = access.stream;
        preview.srcObject = localStream;
        await preview.play();
        canvas.style.display = "block";
        setVideoStatus(`
          <strong>All access confirmed</strong>
          <span>Camera, microphone and GPS are active. GPS locked at ${access.location.lat.toFixed(5)}, ${access.location.lng.toFixed(5)} with approx ${access.location.accuracyMeters}m accuracy.</span>
          <span>AI coach will watch for: ${attestedVideoSteps.join(" -> ")}</span>
        `, "success");
        updateVideoCoach({ active: true, gps: true });

        const recordBtn = document.createElement("button");
        recordBtn.className = "primary";
        recordBtn.textContent = "Start no-pause recording";
        controls.innerHTML = "";
        controls.appendChild(recordBtn);

        recordBtn.onclick = () => {
        recordedChunks = [];
        const startedAt = new Date();
        attestedRecorderState = {
          startedAt,
          location: access.location,
          lowLightWarnings: 0,
          interruptedMessage: "",
          device: navigator.userAgent
        };
        drawAttestedFrame(preview, canvas, startedAt);
        attestedCanvasStream = canvas.captureStream(24);
        localStream.getAudioTracks().forEach((track) => attestedCanvasStream.addTrack(track));
        const recorderOptions = MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
          ? { mimeType: "video/webm;codecs=vp8,opus" }
          : {};
        mediaRecorder = new MediaRecorder(attestedCanvasStream, recorderOptions);
        mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recordedChunks.push(e.data); };
        mediaRecorder.onstop = async () => {
          cancelAnimationFrame(attestedAnimationFrame);
          clearInterval(attestedTimer);
          const interrupted = attestedRecorderState.interruptedMessage;
          const endedAt = new Date();
          const blob = new Blob(recordedChunks, { type: "video/webm" });
          if (!interrupted && blob.size) {
            const metadata = {
              startedAt: attestedRecorderState.startedAt.toISOString(),
              endedAt: endedAt.toISOString(),
              durationSeconds: Math.round((endedAt - attestedRecorderState.startedAt) / 1000),
              lowLightWarnings: attestedRecorderState.lowLightWarnings,
              location: attestedRecorderState.location,
              noPauseAllowed: true,
              appBackgroundInvalidates: true,
              device: attestedRecorderState.device,
              sha256: await sha256Blob(blob)
            };
            await saveVideoBlob(blob, metadata);
            if (currentAttestPropertyId) {
              markPropertyAttested(currentAttestPropertyId);
              currentAttestPropertyId = null;
            }
            setVideoStatus(`<strong>Saved attested video</strong><span>Hash ${metadata.sha256.slice(0, 16)}... Date and time were burned into the video.</span>`, "success");
          } else {
            setVideoStatus(`<strong>Recording discarded</strong><span>${interrupted || "No video data captured."}</span>`, "warning");
          }
          if (localStream) localStream.getTracks().forEach(t => t.stop());
          if (attestedCanvasStream) attestedCanvasStream.getTracks().forEach(t => t.stop());
          localStream = null;
          attestedCanvasStream = null;
          recordBtn.textContent = "Record again";
          recordBtn.className = "primary";
          recordBtn.onclick = () => startVideoModal("record");
        };
        mediaRecorder.start(1000);
        recordBtn.textContent = "Stop and save";
        recordBtn.className = "primary danger";
        recordBtn.onclick = () => stopAttestedRecording();
      };
      } catch (err) {
        accessBtn.disabled = false;
        accessBtn.textContent = "Grant camera, audio and GPS access";
        title.textContent = "Access required";
        setVideoStatus(`
          <strong>Cannot start attested video</strong>
          <span>${escapeHtml(err.message)}</span>
          <span>Please allow camera, microphone, and location from the browser permission prompt, then try again.</span>
        `, "warning");
      }
    };
  } else if (mode === "play") {
    title.textContent = t("video.play");
    const record = await loadVideoBlob();
    const blob = record?.blob || record;
    const metadata = record?.metadata;
    if (blob) {
      if (playerShell) playerShell.style.display = "block";
      player.src = URL.createObjectURL(blob);
      player.play().catch(()=>{});
      setVideoStatus(metadata ? `
        <strong>Verified local capture</strong>
        <span>Recorded ${new Date(metadata.startedAt).toLocaleString("en-IN")} | Duration ${metadata.durationSeconds}s | Low-light warnings ${metadata.lowLightWarnings} | Hash ${metadata.sha256.slice(0, 16)}...</span>
      ` : "<strong>Legacy local video</strong><span>No metadata found. Re-record for a stronger attested badge.</span>", metadata ? "success" : "warning");
    } else {
      title.textContent = "No video recorded yet.";
      setVideoStatus("<strong>No local attested video</strong><span>Record a fresh walkthrough to unlock the badge.</span>", "warning");
    }
  }
}

function closeVideoModal() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    stopAttestedRecording("Recording stopped because the attestation modal was closed.");
  }
  document.getElementById("video-modal").classList.remove("active");
  if (attestedAnimationFrame) cancelAnimationFrame(attestedAnimationFrame);
  if (attestedTimer) clearInterval(attestedTimer);
  if (localStream) {
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }
  if (attestedCanvasStream) {
    attestedCanvasStream.getTracks().forEach(t => t.stop());
    attestedCanvasStream = null;
  }
  const player = document.getElementById("video-player");
  const playerShell = document.getElementById("video-player-shell");
  if (player) player.pause();
  if (playerShell) playerShell.style.display = "none";
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && mediaRecorder && mediaRecorder.state === "recording") {
    stopAttestedRecording("The app went to background. TULO does not allow paused or backgrounded attested videos.");
  }
});

document.addEventListener("click", (event) => {
  const auth = event.target.closest("[data-auth-role]");
  const nav = event.target.closest("[data-view]");
  const jump = event.target.closest("[data-view-jump]");
  const open = event.target.closest("[data-open]");
  const attestAction = event.target.closest("[data-attest-property]");
  const removeAttestationAction = event.target.closest("[data-remove-attestation]");
  const aiAction = event.target.closest("[data-ai]");
  const videoAction = event.target.closest("[data-video]");
  const propertyToggle = event.target.closest("#properties-list .property-card");
  const tenantFilter = event.target.closest("[data-tenant-filter]");
  const tenantViewProperty = event.target.closest("[data-tenant-view-property]");

  if (auth) signInWithGoogle(auth.dataset.authRole);
  if (nav) switchView(nav.dataset.view);
  if (jump) switchView(jump.dataset.viewJump);
  if (event.target.closest("[data-props-tab]")) {
    const tab = event.target.closest("[data-props-tab]");
    document.querySelectorAll(".props-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".props-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    const panel = document.getElementById(tab.dataset.propsTab + "-view");
    if (panel) panel.classList.add("active");
    const isMaint = tab.dataset.propsTab === "maintenance";
    const sectionHead = tab.closest(".view").querySelector(".section-head");
    if (sectionHead) {
      sectionHead.querySelector("h2").textContent = isMaint ? t("page.maintenance") : t("page.properties");
      sectionHead.querySelector("p").textContent = isMaint ? t("props.maint.desc") : t("props.desc");
      const addBtn = sectionHead.querySelector("[data-open='addProperty']");
      if (addBtn) addBtn.style.display = isMaint ? "none" : "";
    }
  }

  if (tenantFilter) {
    tenantPropertyFilter = tenantFilter.dataset.tenantFilter || "All";
    document.querySelectorAll(".tenant-filter").forEach(button => button.classList.toggle("active", button === tenantFilter));
    renderTenantPropertyDiscovery();
  }

  if (tenantViewProperty) {
    openPropertyDetails(tenantViewProperty.dataset.tenantViewProperty);
  }

  if (propertyToggle && !event.target.closest("button, a, input, select, textarea")) {
    const willExpand = !propertyToggle.classList.contains("expanded");
    document.querySelectorAll("#properties-list .property-card.expanded").forEach(card => {
      if (card !== propertyToggle) {
        card.classList.remove("expanded");
        card.setAttribute("aria-expanded", "false");
      }
    });
    propertyToggle.classList.toggle("expanded", willExpand);
    propertyToggle.setAttribute("aria-expanded", String(willExpand));
    return;
  }
  
  if (event.target.closest(".save-tenant-profile-btn")) {
    const btn = event.target.closest(".save-tenant-profile-btn");
    const propertyId = btn.dataset.propertyId;
    const textarea = document.querySelector(`textarea[data-tenant-profile-id="${propertyId}"]`);
    if (textarea) {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        property.idealTenantProfile = textarea.value;
        btn.textContent = "Saved!";
        setTimeout(() => btn.textContent = "Save Profile", 2000);
      }
    }
    return;
  }
  
  if (event.target.closest("#btn-find-perfect-fit")) {
    handleFindPerfectFit();
    return;
  }
  
  if (attestAction) {
    currentAttestPropertyId = attestAction.dataset.attestProperty;
    startVideoModal("record");
  }
  if (removeAttestationAction) {
    removePropertyAttestation(removeAttestationAction.dataset.removeAttestation);
  }

  if (open) {
    if (open.dataset.open === "attest") {
      startVideoModal("record");
    } else if (open.dataset.open === "addProperty") {
      openAddPropertyWizard();
    } else {
      const mc = document.getElementById("modal-content");
      if (mc) mc.innerHTML = getSheet(open.dataset.open) || "";
      document.getElementById("modal").classList.add("active");
    }
  }


  if (videoAction && videoAction.dataset.video === "play") {
    startVideoModal("play");
  }
  if (aiAction) {
    runAiAction(aiAction.dataset.ai).catch((error) => {
      let target = "#ai-output";
      if (aiAction.dataset.ai === "poster") target = "#poster-ai-output";
      if (["leaseExplainer", "draftMessage"].includes(aiAction.dataset.ai)) target = "#tenant-ai-output";
      setBusy(target, error.message);
    });
  }
  if (event.target.closest("#save-gemini-key")) {
    const input = document.querySelector("#gemini-key-input");
    localStorage.setItem("tulo_gemini_key", input.value.trim());
    updateGeminiState();
    modal.classList.remove("active");
  }
  if (event.target.closest("#clear-gemini-key")) {
    localStorage.removeItem("tulo_gemini_key");
    updateGeminiState();
    modal.classList.remove("active");
  }
  if (event.target.closest("[data-tool]")) {
    const tool = event.target.closest("[data-tool]").dataset.tool;
    if (tool === "poster") showPosterTool();
    return;
  }
  if (event.target.closest("#bell-notification-btn") || event.target.closest("#owner-request-count")) { showNotificationsModal(); return; }
  if (event.target.closest("#export-poster")) exportPoster();
  if (event.target.closest("#btn-voice-listing")) startListingVoiceInput();
  if (event.target.closest("#btn-extract-listing")) {
    const source = document.getElementById("listing-source");
    listingDraft = extractListingDetailsFromText(source?.value || "");
    syncListingDraftToForm();
    updateListingPreview();
  }
  if (event.target.closest("#sign-out")) signOut();
  if (event.target.closest(".close") && event.target.closest("#modal")) {
    document.getElementById("modal").classList.remove("active");
  }
  if (event.target === document.getElementById("modal")) {
    document.getElementById("modal").classList.remove("active");
  }
  if (event.target.closest("#video-modal-close") || event.target === document.getElementById("video-modal")) {
    closeVideoModal();
  }
  if (event.target.closest("#tenant-chat-send")) handleTenantChat();

  // Firestore Form Mutations
  if (event.target.id === "btn-save-property") {
    const pName = document.getElementById("add-prop-name").value;
    const pType = document.getElementById("add-prop-type").value;
    const pAddress = document.getElementById("add-prop-address").value;
    const pRent = document.getElementById("add-prop-rent")?.value || "INR 0 monthly";
    const pDeposit = document.getElementById("add-prop-deposit")?.value || "Clear before contact";
    const pMaintenance = document.getElementById("add-prop-maintenance")?.value || "Shown upfront";
    const pAvailability = document.getElementById("add-prop-availability")?.value || "Available soon";
    const pRestrictions = document.getElementById("add-prop-restrictions")?.value || "Shared before visit";
    const pFurnishing = document.getElementById("add-prop-furnishing")?.value || "Not specified";
    const pId = `listing-${Date.now()}`;
    const pCoords = inferListingCoordinates(pAddress);
    if (pName && db) {
      db.collection("properties").doc(pId).set({
        id: pId,
        name: pName,
        type: pType || "PG",
        address: pAddress || "Lucknow",
        units: "0 occupied",
        rent: pRent,
        deposit: pDeposit,
        maintenance: pMaintenance,
        availability: pAvailability,
        restrictions: pRestrictions,
        furnishing: pFurnishing,
        lat: pCoords.lat,
        lng: pCoords.lng,
        brokerage: "INR 0",
        attested: false,
        attestedAt: "",
        attestationExpiresAt: "",
        listingState: "draft",
        status: "Draft - attested video required",
        statusClass: "warning"
      });
      document.getElementById("modal").classList.remove("active");
      return;
    }
    if (pName && !db) {
      properties.unshift({
        id: pId,
        name: pName,
        type: pType || "PG",
        address: pAddress || "Lucknow",
        units: "0 occupied",
        rent: pRent,
        deposit: pDeposit,
        maintenance: pMaintenance,
        availability: pAvailability,
        restrictions: pRestrictions,
        furnishing: pFurnishing,
        lat: pCoords.lat,
        lng: pCoords.lng,
        brokerage: "INR 0",
        attested: false,
        attestedAt: "",
        attestationExpiresAt: "",
        listingState: "draft",
        status: "Draft - attested video required",
        statusClass: "warning"
      });
      render();
      document.getElementById("modal").classList.remove("active");
      return;
    }
    if(pName && db) {
      db.collection("properties").add({
        name: pName, type: pType || "PG", address: pAddress || "Lucknow", units: "0 occupied", rent: "₹0 monthly", status: "Newly Added", statusClass: "success"
      });
      document.getElementById("modal").classList.remove("active");
    }
  }

  if (event.target.id === "btn-save-request") {
    const rCat = document.getElementById("req-cat").value;
    const rPri = document.getElementById("req-pri").value;
    const rDesc = document.getElementById("req-desc").value;
    if(rDesc && db) {
      const today = new Date().toLocaleDateString("en-GB");
      db.collection("tenantRequests").add({ title: rDesc, status: "Open", priority: rPri || "Medium", emergency: false, date: today });
      db.collection("requests").add({ title: rDesc, unit: "Selected listing", status: "Open", priority: rPri || "Medium", emergency: false });
      document.getElementById("modal").classList.remove("active");
    }
  }
  
  if (event.target.classList.contains("primary") && event.target.textContent.includes("Pay now")) {
    if(db) {
       const today = new Date().toLocaleDateString("en-GB");
       db.collection("tenantRentHistory").add({ month: "May 2026", amount: "INR 15,500", status: "Paid", date: today, action: "Receipt" });
       alert("Rent Paid! Real receipt recorded in Firestore.");
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.target.id === "tenant-chat-input" && event.key === "Enter") {
    handleTenantChat();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "listing-source") {
    listingDraft = extractListingDetailsFromText(event.target.value);
    syncListingDraftToForm();
    updateListingPreview();
    return;
  }
  if (event.target.closest(".listing-form-grid")) {
    updateListingPreview();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "poster-rent") {
    const el = document.querySelector("#poster-price");
    if (el) el.textContent = event.target.value;
  }
  if (event.target.id === "poster-locality") {
    const el = document.querySelector("#poster-place");
    if (el) el.textContent = event.target.value;
  }
  if (event.target.id === "poster-headline-input") {
    const el = document.querySelector("#poster-headline");
    if (el) el.textContent = event.target.value;
  }
});

setLanguage(currentLang);
render();
updateGeminiState();
initHomeSlideshow();
const savedRole = localStorage.getItem("tulo_auth_role");
if (savedRole) applyAuthRole(savedRole);


async function handleFindPerfectFit() {
  const location = document.querySelector("#explore-location").value.trim();
  const requirements = document.querySelector("#explore-requirements").value.trim();
  const statusDiv = document.querySelector("#explore-results-status");
  const grid = document.querySelector("#explore-results-grid");
  
  if (!requirements) {
    statusDiv.textContent = "Please enter your requirements first.";
    return;
  }
  
  const searchContainer = document.querySelector(".explore-search-container");
  const resultsContainer = document.querySelector("#explore-results-container");

  searchContainer.style.display = "none";
  resultsContainer.style.display = "block";
  statusDiv.innerHTML = "✨ <strong>AI Agent is analyzing properties...</strong> Mapping your requirements against strict landlord profiles...";
  grid.innerHTML = "";
  
  const liveListings = getLiveListings();
  const propertyData = liveListings.map(p => ({
    id: p.id,
    name: p.name,
    address: p.address,
    type: p.type,
    rent: p.rent,
    idealTenantProfile: p.idealTenantProfile || p.restrictions
  }));
  
  const prompt = `You are an expert AI Real Estate Semantic Matcher.
A tenant is looking for a property with these details:
Location Preference: ${location || "Anywhere"}
Specific Requirements: ${requirements}

Here are the available properties and their STRICT landlord requirements:
${JSON.stringify(propertyData, null, 2)}

Your job is to match the tenant's requirements against the properties, paying special attention to the landlord's 'idealTenantProfile' and 'address'.
Score each property from 0 to 100 based on how well it fits. Be realistic! If a tenant has a pet but the landlord says "No pets", score it low. If it's a perfect match, score it high.

Return a RAW JSON array ONLY (no markdown formatting, no backticks) with the following structure:
[
  {
    "id": "property-id",
    "matchScore": 95,
    "reason": "1-sentence specific reason why it matches or why it lost points."
  }
]
Return at most the top 4 matches, sorted by matchScore descending. ONLY output JSON array.`;

  try {
    let result = await callGemini(prompt, null, null, "application/json");
    let matches = [];
    try {
      matches = JSON.parse(result);
    } catch (e) {
      console.error("RAW GEMINI OUTPUT:", result);
      throw new Error("AI returned invalid JSON format (possibly truncated). Raw output starts with: " + result.substring(0, 100));
    }
    
    if (!matches || matches.length === 0) {
      statusDiv.innerHTML = "No suitable properties found for these strict requirements.";
      return;
    }
    
    statusDiv.innerHTML = `Found ${matches.length} personalized matches.`;
    
    let html = "";
    for (const match of matches) {
      const prop = liveListings.find(p => p.id === match.id);
      if (!prop) continue;
      
      const health = getPropertyHealth(prop);
      
      html += `
        <article class="property-card is-live health-${health.tone}" data-tenant-view-property="${escapeHtml(prop.id)}">
          <div class="property-photo" style="${prop.image ? `background-image: url('${escapeHtml(prop.image)}'); background-size: cover; background-position: center;` : ''}">
            <div class="photo-badge" style="background: var(--primary); color: white;">${match.matchScore}% Match</div>
          </div>
          <div class="property-body">
            <h3>${escapeHtml(prop.name)}</h3>
            <p class="property-meta">${escapeHtml(prop.type)} - ${escapeHtml(prop.address)}</p>
            <p><strong>${escapeHtml(prop.rent)}</strong></p>
            <div class="ai-video-review" style="margin-top: 12px; background: #fdf5ff; border: 1px solid #e1bce9;">
              <span style="color: #6a1b9a;"><strong>✨ AI Reasoning:</strong> ${escapeHtml(match.reason)}</span>
            </div>
            <button class="secondary small" style="margin-top: 12px; width: 100%;">View Details</button>
          </div>
        </article>
      `;
    }
    
    grid.innerHTML = html;
    
  } catch (err) {
    console.error("AI Match Error:", err);
    if (err.message.includes("Gemini key is not available")) {
      statusDiv.innerHTML = "<span style='color:var(--danger);'>Please enter your Gemini API key in the popup to use this feature.</span>";
    } else {
      statusDiv.innerHTML = `<span style='color:var(--danger);'>Error running AI match: ${escapeHtml(err.message)}</span>`;
    }
  }
}

document.addEventListener("change", async (event) => {
  if (event.target.id === "kyc-upload-input") {
    const file = event.target.files[0];
    if (!file) return;
    
    const targetOutput = "#ai-output";
    openToolUI("KYC Review");
    setBusy(targetOutput, "Analyzing ID document with Vision AI...");
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result.split(',')[1];
        const mimeType = file.type;
        
        const prompt = "Act as TULO's automated KYC review agent. I am uploading an identity document (Aadhaar or PAN). Please extract the following: 1) Document Type, 2) Full Name, 3) Date of Birth, 4) Document Number. Also comment on the image readability. Keep the response very concise and formatted nicely with emojis.";
        
        try {
          const text = await callGemini(prompt, base64Data, mimeType);
          setBusy(targetOutput, text);
        } catch (error) {
          setBusy(targetOutput, "Failed to analyze image: " + error.message);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setBusy(targetOutput, "Error reading file.");
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "btn-search-again") {
    document.querySelector(".explore-search-container").style.display = "block";
    document.querySelector("#explore-results-container").style.display = "none";
    document.querySelector("#explore-results-grid").innerHTML = "";
    document.querySelector("#explore-results-status").innerHTML = "";
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("landlord-rent-action-btn")) {
    const unit = e.target.getAttribute("data-unit");
    const action = e.target.getAttribute("data-action");
    const row = rentRows.find(r => r.unit === unit);
    if (!row) return;

    if (action === "Invite") {
      row.status = "Invited";
      row.action = "Resend";
    } else if (action === "Confirm") {
      row.status = "Paid";
      row.action = "Manage";
    } else if (action === "Mark paid") {
      row.status = "Paid";
      row.action = "Receipt";
    } else if (action === "Receipt") {
      alert("Receipt downloaded for " + unit);
    } else if (action === "AI Reminder") {
      handleAiReminder(unit, row);
      return; // Don't render immediately, let the async function handle it
    }
    render();
  }

  if (e.target.classList.contains("tenant-rent-action-btn")) {
    const month = e.target.getAttribute("data-month");
    const action = e.target.getAttribute("data-action");
    const row = tenantRentHistory.find(r => r.month === month);
    if (!row) return;

    if (action === "Reminder") {
      row.action = "Reminder Set";
      alert("Reminder set for " + row.month + " rent.");
    }
    render();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "btn-pay-now") {
    const btn = e.target;
    const panel = btn.closest("article");
    if (!panel) return;

    // Remove existing payment card if present
    const existing = document.getElementById("upi-pay-card");
    if (existing) { existing.remove(); return; }

    const payCard = document.createElement("div");
    payCard.id = "upi-pay-card";
    payCard.style.cssText = "margin-top:16px; padding:16px; background:linear-gradient(135deg,#f0fff8,#e8f5ff); border:1px solid #9fe1cb; border-radius:10px;";
    payCard.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
        <span style="font-size:22px;">📱</span>
        <div>
          <strong style="display:block; font-family:Inter,sans-serif; font-size:14px;">Pay via UPI</strong>
          <span style="font-size:12px; color:var(--muted);">Scan QR or use UPI ID</span>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:auto 1fr; gap:14px; align-items:center;">
        <div style="width:80px; height:80px; border:2px dashed #1d9e75; border-radius:8px; display:grid; place-items:center; font-size:10px; font-weight:900; color:#1d9e75; text-align:center; line-height:1.3;">QR<br/>CODE</div>
        <div>
          <p style="margin:0 0 4px; font-size:12px; color:var(--muted);">UPI ID</p>
          <strong style="font-family:Inter,monospace; font-size:14px; color:#1d9e75;">tulo@ybl</strong>
          <p style="margin:8px 0 4px; font-size:12px; color:var(--muted);">Amount</p>
          <strong style="font-size:20px; color:var(--error);">₹7,000</strong>
        </div>
      </div>
      <p style="margin:12px 0 0; font-size:11px; color:var(--muted); text-align:center;">✓ Zero brokerage · Transparent record on TULO</p>
    `;
    panel.appendChild(payCard);
    payCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});


function openToolUI(title) {
  const grid = document.querySelector("#tools-grid-container");
  const output = document.querySelector("#tool-output-container");
  if (grid && output) {
    grid.style.display = "none";
    output.style.display = "block";
    document.querySelector("#active-tool-title").textContent = title;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.id === "btn-back-to-tools") {
    document.querySelector("#tools-grid-container").style.display = "block";
    document.querySelector("#tool-output-container").style.display = "none";
    document.querySelector("#ai-output").innerHTML = "Generating results...";
  }
});

async function handleAiReminder(unit, row) {
  // Find the button that was clicked and show inline loading state
  const actionBtn = document.querySelector(`[data-unit="${CSS.escape(unit)}"][data-action="AI Reminder"]`);
  if (actionBtn) {
    actionBtn.disabled = true;
    actionBtn.textContent = "Drafting...";
  }

  const prompt = `Act as TULO AI Assistant. Draft a short, polite WhatsApp message in Indian English to remind tenant ${row.tenant} of ${unit} that their rent of ${row.amount} is overdue. Mention that paying via TULO keeps a transparent record. Include 1-2 relevant emojis. Under 60 words.` + getLanguageInstructionShort();

  let text = "";
  try {
    text = await callGemini(prompt);
  } catch (err) {
    text = `Hi ${row.tenant} ji, your rent of ${row.amount} for ${unit} is due. Please pay at your earliest convenience. Thank you! 🙏`;
  }

  // Re-enable button
  if (actionBtn) {
    actionBtn.disabled = false;
    actionBtn.textContent = "AI Reminder";
  }

  // Find the table row for this unit and insert the draft inline
  const allRows = document.querySelectorAll("#rent-list .table-row");
  let targetRow = null;
  allRows.forEach(r => {
    const spans = r.querySelectorAll("span");
    if (spans[0] && spans[0].textContent.trim() === unit) targetRow = r;
  });

  // Remove any existing draft card for this unit
  const existingDraft = document.getElementById(`draft-${CSS.escape(unit)}`);
  if (existingDraft) existingDraft.remove();

  // Insert inline draft card below the row
  const draftHtml = `
    <div id="draft-${unit.replace(/[^a-z0-9]/gi, '-')}" style="
      grid-column: 1 / -1;
      padding: 14px 16px;
      background: linear-gradient(135deg, #fffdf4, #fff8e9);
      border: 1px solid #f6d38f;
      border-left: 4px solid var(--primary);
      border-radius: 0 0 8px 8px;
      font-size: 13px;
      line-height: 1.6;
      color: #3a3a38;
    ">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 16px;">🤖</span>
        <strong style="font-family: Inter, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--primary-dark);">AI WhatsApp Draft</strong>
      </div>
      <p style="margin: 0 0 12px; white-space: pre-wrap;">${text}</p>
      <div style="display: flex; gap: 8px;">
        <button class="primary small" onclick="
          navigator.clipboard.writeText(${JSON.stringify(text)}).then(() => {
            this.textContent = '✓ Copied!';
            setTimeout(() => this.textContent = 'Copy Message', 1800);
          });
        ">Copy Message</button>
        <button class="secondary small" onclick="this.closest('[id^=draft-]').remove()">Dismiss</button>
      </div>
    </div>
  `;

  if (targetRow) {
    targetRow.insertAdjacentHTML("afterend", draftHtml);
    // Scroll into view smoothly
    document.getElementById(`draft-${unit.replace(/[^a-z0-9]/gi, '-')}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Log to Agent Activity Feed
  const agentActivityList = document.querySelector("#agent-activity-list");
  if (agentActivityList) {
    const newActivity = `
      <article class="owner-row green" style="padding: 10px 14px;">
        <div>
          <strong>🤖 AI drafted WhatsApp reminder</strong>
          <span>${unit} · ${row.tenant} · Just now</span>
        </div>
        <small>Sent</small>
      </article>
    `;
    agentActivityList.insertAdjacentHTML('afterbegin', newActivity);
  }
}

async function generateLeaseDraft() {
  const prop = document.getElementById("lease-prop").value;
  const rent = document.getElementById("lease-rent").value;
  const dep = document.getElementById("lease-dep").value;
  
  const preview = document.getElementById("lease-preview");
  preview.innerHTML = "<div style='color:var(--muted);text-align:center;margin-top:100px;'>Generating lease...</div>";
  
  const prompt = `Act as a legal assistant. Draft a short, professional lease agreement summary in HTML format (using <h4>, <p>, <ul>) for property: ${prop}, Rent: INR ${rent}, Deposit: INR ${dep}. Include a placeholder for Tenant Name. DO NOT wrap in markdown code blocks, return raw HTML.`;
  
  try {
    let html = await callGemini(prompt);
    html = html.replace(/```html/g, '').replace(/```/g, '');
    preview.innerHTML = html;
  } catch (e) {
    preview.innerHTML = `<div style="color:var(--danger);">${e.message}</div>`;
  }
}

async function generateListingDraft() {
  const prop = document.getElementById("list-prop").value;
  const target = document.getElementById("list-target").value;
  
  const preview = document.getElementById("list-preview");
  preview.innerHTML = "Typing...";
  
  const prompt = `Act as a Lucknow landlord. Draft a catchy, emoji-filled WhatsApp message advertising property: ${prop} aimed at ${target}. It must be short and compelling.`;
  
  try {
    let text = await callGemini(prompt);
    preview.innerHTML = text.replace(/\n/g, "<br/>");
  } catch (e) {
    preview.innerHTML = `<span style="color:var(--danger);">${e.message}</span>`;
  }
}
