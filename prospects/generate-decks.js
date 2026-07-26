const pptxgen = require('pptxgenjs');
const path = require('path');

const COLORS = {
  navy: '0F172A',
  darkSlate: '1E293B',
  slate: '334155',
  slateLight: '94A3B8',
  white: 'FFFFFF',
  indigo: '6366F1',
  indigoDark: '4338CA',
  emerald: '10B981',
  red: 'EF4444',
  redLight: 'FCA5A5',
  yellow: 'F59E0B',
  offWhite: 'F8FAFC',
};

const prospects = [
  {
    id: 'nandhana-palace',
    name: 'Nandhana Palace',
    city: 'Bangalore, India',
    tagline: '10+ Location Andhra Chain',
    problem: 'Website is DEAD — nandhanarestaurants.com times out',
    problems: [
      'Website domain exists but returns timeout/blank page',
      'All online traffic goes through Zomato/Swiggy (25-30% commission)',
      '10+ locations with no centralized online presence',
      'Competitors with working websites rank above you',
    ],
    solutions: [
      'Revive website with all 10+ locations on interactive map',
      'Direct online ordering system — 0% commission',
      'Google SEO for "Andhra restaurant Bangalore"',
      'AI chatbot for location finding & reservations',
    ],
    stats: { locations: '10+', rating: '4.2★', established: '2000s' },
    price: '₹75,000/mo (~$890)',
    country: 'India',
  },
  {
    id: 'biryani-nawaabs',
    name: 'Biryani Nawaabs',
    city: 'Lucknow, India',
    tagline: '4.7★ — 820+ Google Reviews',
    problem: 'ZERO web presence despite being top-rated',
    problems: [
      'No website at all — 100% dependent on aggregators',
      '820+ Google reviews driving traffic to Zomato, not you',
      'No online menu with prices or photos',
      'Tourists can\'t discover you before visiting Lucknow',
    ],
    solutions: [
      'Stunning website showcasing signature biryanis',
      'Direct ordering — keep 100% of revenue',
      'Full interactive menu with prices & photos',
      'SEO to rank #1 for "Biryani Nawaabs Lucknow"',
    ],
    stats: { locations: '1', rating: '4.7★', reviews: '820+' },
    price: '₹35,000/mo (~$415)',
    country: 'India',
  },
  {
    id: 'lalla-biryani',
    name: 'Lalla Biryani',
    city: 'Lucknow, India',
    tagline: 'Legendary Since 1985',
    problem: '40 years of legacy — invisible on the internet',
    problems: [
      'No website — 40 years of history with zero online home',
      'Entirely dependent on Zomato/Swiggy for visibility',
      'Tourists searching "famous biryani Lucknow" miss you',
      'No catering page — missing bulk/event orders',
    ],
    solutions: [
      'Heritage-themed website honoring the 1985 founding story',
      'Full menu with signature dishes & mouthwatering photos',
      'Catering & bulk order form for events',
      'WhatsApp integration for regular customers',
    ],
    stats: { locations: '1', established: '1985', years: '40+' },
    price: '₹35,000/mo (~$415)',
    country: 'India',
  },
  {
    id: 'haji-shabrati',
    name: 'Haji Shabrati Nihari Wale',
    city: 'Old Delhi, India',
    tagline: 'Legendary Nihari Since 1957',
    problem: 'Featured worldwide — but no website',
    problems: [
      'No website — tourists find only third-party reviews',
      'Unusual hours (6AM-10AM, 6PM-9PM) confuse visitors',
      'Food bloggers link to TripAdvisor, not your own page',
      '67-year legacy has no online home you control',
    ],
    solutions: [
      'Bilingual website (English + Hindi/Urdu) honoring heritage',
      'Clear operating hours prominently displayed',
      'Tourist-friendly "Plan Your Visit" section',
      'Google Maps with walking directions from Jama Masjid metro',
    ],
    stats: { locations: '1', established: '1957', years: '67+' },
    price: '₹35,000/mo (~$415)',
    country: 'India',
  },
  {
    id: 'cheap-charlies',
    name: "Cheap Charlie's Taco Shop",
    city: 'Nashville, TN',
    tagline: '4 Locations Across Nashville',
    problem: '4 locations, 0 websites — customers can\'t find you',
    problems: [
      'No website — Google shows only Facebook & delivery apps',
      '4 locations but no centralized info page',
      'DoorDash & Grubhub take 20-30% commission',
      'No catering page for Nashville event planners',
    ],
    solutions: [
      'Professional website with all 4 locations on map',
      'Direct online ordering for pickup — 0% commission',
      'Catering inquiry form for corporate events',
      'Instagram feed integration to keep site fresh',
    ],
    stats: { locations: '4', city: 'Nashville' },
    price: '$499/mo',
    country: 'US',
  },
  {
    id: 'ooowee-bbq',
    name: 'OooWee BBQ',
    city: 'Charlotte, NC',
    tagline: 'BBQ Food Trucks — 10+ Years Strong',
    problem: '10+ years of BBQ excellence — but no website',
    problems: [
      'No website — only Yelp and food truck finder pages',
      'No central place for daily truck locations/schedule',
      'Catering inquiries have no landing page',
      '10+ year track record not showcased anywhere',
    ],
    solutions: [
      'Professional website with live truck location tracker',
      'Full BBQ menu with photos & portion sizes',
      'Catering page with inquiry form & pricing tiers',
      'Email signup for weekly schedule notifications',
    ],
    stats: { trucks: '2', years: '10+', city: 'Charlotte' },
    price: '$349/mo',
    country: 'US',
  },
];

function createDeck(prospect) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'KraftAI';
  pres.subject = `Proposal for ${prospect.name}`;
  pres.title = `${prospect.name} — KraftAI Proposal`;

  // ── Slide 1: Title ──
  const s1 = pres.addSlide();
  s1.background = { color: COLORS.navy };
  // Logo area
  s1.addText('K', {
    x: 0.5, y: 0.4, w: 0.6, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.white,
    align: 'center', valign: 'middle',
    shape: pres.shapes.ROUNDED_RECTANGLE,
    fill: { color: COLORS.indigo },
    rectRadius: 0.1,
  });
  s1.addText('KraftAI', {
    x: 1.2, y: 0.4, w: 2, h: 0.6,
    fontSize: 16, bold: true, color: COLORS.white,
    valign: 'middle', margin: 0,
  });
  // Title
  s1.addText('Custom Proposal', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 16, color: COLORS.indigo,
    fontFace: 'Calibri', margin: 0,
  });
  s1.addText(prospect.name, {
    x: 0.5, y: 2.0, w: 9, h: 1.2,
    fontSize: 40, bold: true, color: COLORS.white,
    fontFace: 'Calibri', margin: 0,
  });
  s1.addText(prospect.tagline, {
    x: 0.5, y: 3.2, w: 9, h: 0.5,
    fontSize: 18, color: COLORS.slateLight,
    fontFace: 'Calibri', margin: 0,
  });
  s1.addText(prospect.city, {
    x: 0.5, y: 3.9, w: 9, h: 0.4,
    fontSize: 14, color: COLORS.slateLight,
    fontFace: 'Calibri', margin: 0,
  });
  s1.addText('Website + AI Automation + Growth', {
    x: 0.5, y: 4.8, w: 9, h: 0.4,
    fontSize: 12, color: COLORS.slate,
    fontFace: 'Calibri', margin: 0,
  });
  s1.addNotes(`Title slide for ${prospect.name} proposal. Present: KraftAI builds websites + AI automation for businesses without online presence.`);

  // ── Slide 2: The Problem ──
  const s2 = pres.addSlide();
  s2.background = { color: COLORS.offWhite };
  s2.addText('The Problem', {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 36, bold: true, color: COLORS.navy,
    fontFace: 'Calibri', margin: 0,
  });
  s2.addText(prospect.problem, {
    x: 0.5, y: 1.2, w: 9, h: 0.6,
    fontSize: 16, color: COLORS.red,
    fontFace: 'Calibri', bold: true, margin: 0,
  });

  prospect.problems.forEach((prob, i) => {
    const yPos = 2.1 + i * 0.8;
    // Red indicator dot
    s2.addShape(pres.shapes.OVAL, {
      x: 0.5, y: yPos + 0.12, w: 0.2, h: 0.2,
      fill: { color: COLORS.red },
    });
    s2.addText(prob, {
      x: 0.9, y: yPos, w: 8.5, h: 0.6,
      fontSize: 14, color: COLORS.darkSlate,
      fontFace: 'Calibri', valign: 'middle', margin: 0,
    });
  });
  s2.addNotes('Walk through each pain point. Emphasize commission losses and missed customers.');

  // ── Slide 3: What Happens When Someone Googles You ──
  const s3 = pres.addSlide();
  s3.background = { color: COLORS.navy };
  s3.addText('What Happens When Someone Googles You', {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 28, bold: true, color: COLORS.white,
    fontFace: 'Calibri', margin: 0,
  });

  // Without website column
  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.3, w: 4.2, h: 3.8,
    fill: { color: '1E1E2E' },
    rectRadius: 0.15,
  });
  s3.addText('Today (No Website)', {
    x: 0.7, y: 1.5, w: 3.8, h: 0.5,
    fontSize: 16, bold: true, color: COLORS.red,
    fontFace: 'Calibri', margin: 0,
  });
  const todayItems = [
    `${prospect.name} — Zomato/Yelp (25-30% commission)`,
    `${prospect.name} — Facebook (outdated info)`,
    'No official website found',
    'Customer leaves → tries competitor',
  ];
  todayItems.forEach((item, i) => {
    s3.addText(item, {
      x: 0.7, y: 2.2 + i * 0.7, w: 3.8, h: 0.55,
      fontSize: 11, color: COLORS.slateLight,
      fontFace: 'Calibri', margin: 0,
    });
  });

  // With website column
  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.3, y: 1.3, w: 4.2, h: 3.8,
    fill: { color: '0D2818' },
    rectRadius: 0.15,
  });
  s3.addText('With KraftAI Website', {
    x: 5.5, y: 1.5, w: 3.8, h: 0.5,
    fontSize: 16, bold: true, color: COLORS.emerald,
    fontFace: 'Calibri', margin: 0,
  });
  const withItems = [
    `${prospect.name} — Official Website (full menu, ordering)`,
    `Order from ${prospect.name} | Free Delivery`,
    `${prospect.name} ★★★★★ (Google Maps)`,
    'Customer orders directly → 0% commission',
  ];
  withItems.forEach((item, i) => {
    s3.addText(item, {
      x: 5.5, y: 2.2 + i * 0.7, w: 3.8, h: 0.55,
      fontSize: 11, color: COLORS.slateLight,
      fontFace: 'Calibri', margin: 0,
    });
  });
  s3.addNotes('Side-by-side comparison. Emphasize the before/after of Google search results.');

  // ── Slide 4: What We Build ──
  const s4 = pres.addSlide();
  s4.background = { color: COLORS.offWhite };
  s4.addText('What We Build For You', {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 36, bold: true, color: COLORS.navy,
    fontFace: 'Calibri', margin: 0,
  });

  prospect.solutions.forEach((sol, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.5 + col * 4.7;
    const yPos = 1.4 + row * 1.8;
    // Card bg
    s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: yPos, w: 4.3, h: 1.5,
      fill: { color: COLORS.white },
      shadow: { type: 'outer', blur: 6, offset: 2, angle: 90, color: '000000', opacity: 0.1 },
      rectRadius: 0.1,
    });
    // Number
    s4.addText(`${i + 1}`, {
      x: xPos + 0.2, y: yPos + 0.2, w: 0.5, h: 0.5,
      fontSize: 18, bold: true, color: COLORS.white,
      align: 'center', valign: 'middle',
      shape: pres.shapes.OVAL,
      fill: { color: COLORS.indigo },
    });
    s4.addText(sol, {
      x: xPos + 0.9, y: yPos + 0.2, w: 3.2, h: 1.1,
      fontSize: 13, color: COLORS.darkSlate,
      fontFace: 'Calibri', valign: 'middle', margin: 0,
    });
  });
  s4.addNotes('Walk through each deliverable. These are concrete things they get.');

  // ── Slide 5: The Numbers ──
  const s5 = pres.addSlide();
  s5.background = { color: COLORS.navy };
  s5.addText('The Numbers Speak', {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 36, bold: true, color: COLORS.white,
    fontFace: 'Calibri', margin: 0,
  });

  const stats = [
    { num: '30%', label: 'more orders from direct website vs aggregator-only' },
    { num: prospect.country === 'India' ? '₹0' : '$0', label: 'commission on direct orders (vs 25-30% on Zomato/DoorDash)' },
    { num: '24/7', label: 'your menu, hours & location available to customers' },
  ];
  stats.forEach((stat, i) => {
    const xPos = 0.5 + i * 3.2;
    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.5, w: 2.8, h: 3.0,
      fill: { color: COLORS.darkSlate },
      rectRadius: 0.15,
    });
    s5.addText(stat.num, {
      x: xPos, y: 1.8, w: 2.8, h: 1.0,
      fontSize: 44, bold: true, color: COLORS.indigo,
      fontFace: 'Calibri', align: 'center', margin: 0,
    });
    s5.addText(stat.label, {
      x: xPos + 0.3, y: 2.9, w: 2.2, h: 1.2,
      fontSize: 12, color: COLORS.slateLight,
      fontFace: 'Calibri', align: 'center', margin: 0,
    });
  });
  s5.addNotes('Data-driven slide. Let the numbers do the talking.');

  // ── Slide 6: Full Package ──
  const s6 = pres.addSlide();
  s6.background = { color: COLORS.offWhite };
  s6.addText('Your Full Package', {
    x: 0.5, y: 0.3, w: 5, h: 0.7,
    fontSize: 36, bold: true, color: COLORS.navy,
    fontFace: 'Calibri', margin: 0,
  });

  // Price card
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 4.2, h: 4.0,
    fill: { color: COLORS.navy },
    rectRadius: 0.15,
  });
  s6.addText(prospect.price, {
    x: 0.5, y: 1.5, w: 4.2, h: 0.9,
    fontSize: 36, bold: true, color: COLORS.white,
    fontFace: 'Calibri', align: 'center', margin: 0,
  });
  s6.addText('per month, cancel anytime', {
    x: 0.5, y: 2.3, w: 4.2, h: 0.4,
    fontSize: 11, color: COLORS.slateLight,
    fontFace: 'Calibri', align: 'center', margin: 0,
  });
  s6.addText('60-day money-back guarantee', {
    x: 0.5, y: 4.4, w: 4.2, h: 0.4,
    fontSize: 12, bold: true, color: COLORS.emerald,
    fontFace: 'Calibri', align: 'center', margin: 0,
  });

  // Package items
  const items = [
    'Custom website with your branding',
    'Online ordering (0% commission)',
    'Google Business Profile optimization',
    'AI chatbot for queries & reservations',
    'WhatsApp integration for orders',
    'Monthly analytics reports',
    'SEO to rank #1 for your name',
  ];
  items.forEach((item, i) => {
    s6.addText(`✓  ${item}`, {
      x: 5.2, y: 1.3 + i * 0.5, w: 4.3, h: 0.4,
      fontSize: 13, color: COLORS.darkSlate,
      fontFace: 'Calibri', margin: 0,
    });
  });
  s6.addNotes('Pricing slide. Emphasize the money-back guarantee — removes risk.');

  // ── Slide 7: Next Steps ──
  const s7 = pres.addSlide();
  s7.background = { color: COLORS.navy };
  s7.addText("Let's Get Started", {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40, bold: true, color: COLORS.white,
    fontFace: 'Calibri', align: 'center', margin: 0,
  });
  s7.addText(`We're ready to build ${prospect.name}'s digital presence.`, {
    x: 1, y: 1.5, w: 8, h: 0.5,
    fontSize: 16, color: COLORS.slateLight,
    fontFace: 'Calibri', align: 'center', margin: 0,
  });

  // Contact cards
  const contacts = [
    { label: 'Call Us', value: '+1 (331) 431-8078', color: COLORS.indigo },
    { label: 'WhatsApp', value: '+91 8859820935', color: COLORS.emerald },
    { label: 'Email', value: 'hey@kraftai.in', color: COLORS.slateLight },
  ];
  contacts.forEach((c, i) => {
    const xPos = 1.0 + i * 2.9;
    s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.5, w: 2.5, h: 1.6,
      fill: { color: COLORS.darkSlate },
      rectRadius: 0.12,
    });
    s7.addText(c.label, {
      x: xPos, y: 2.7, w: 2.5, h: 0.5,
      fontSize: 14, bold: true, color: c.color,
      fontFace: 'Calibri', align: 'center', margin: 0,
    });
    s7.addText(c.value, {
      x: xPos, y: 3.2, w: 2.5, h: 0.5,
      fontSize: 12, color: COLORS.white,
      fontFace: 'Calibri', align: 'center', margin: 0,
    });
  });

  s7.addText('kraftai.in', {
    x: 0.5, y: 4.6, w: 9, h: 0.4,
    fontSize: 14, color: COLORS.indigo,
    fontFace: 'Calibri', align: 'center', margin: 0,
  });
  s7.addNotes('Closing slide. Ask for next steps — schedule a 15-minute call.');

  return pres;
}

async function main() {
  const outDir = path.resolve(__dirname);
  for (const prospect of prospects) {
    const pres = createDeck(prospect);
    const filename = `${prospect.id}-pitch.pptx`;
    const filepath = path.join(outDir, filename);
    await pres.writeFile({ fileName: filepath });
    console.log(`Created: ${filename}`);
  }
  console.log(`\nAll ${prospects.length} pitch decks generated.`);
}

main().catch(console.error);
