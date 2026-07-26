import ProspectPage from '@/components/kraftai/ProspectPage';

export default function HajiShabratiPage() {
  return (
    <ProspectPage
      businessName="Haji Shabrati Nihari Wale"
      tagline="Old Delhi's legendary nihari since 1957 — celebrated worldwide, but without a website."
      city="Old Delhi"
      country="India"
      cuisine="Nihari & Mughlai"
      established="1957"
      locations="1 location (Jama Masjid)"
      currentProblem="You're featured on TripAdvisor, TasteAtlas, and dozens of food blogs as a must-visit Delhi institution — but you have NO website. Tourists plan their Old Delhi food walks online, and they can't find your hours, menu, or exact location without digging through third-party reviews."
      problems={[
        'No website — tourists searching "Haji Shabrati" find only TripAdvisor and Zomato',
        'Your unique operating hours (6AM-10AM, 6PM-9PM) confuse visitors who show up at the wrong time',
        'No online menu — international visitors can\'t see what you serve before arriving',
        'Food bloggers link to third-party pages instead of your own — you get zero traffic benefit',
        'Your extraordinary 67-year legacy has no online home you control',
        'No way for tourists to pre-book or get directions easily',
      ]}
      features={[
        'Elegant bilingual website (English + Urdu/Hindi) honoring your 1957 heritage',
        'Clear operating hours prominently displayed — no more confused tourists',
        'Photo-rich menu showcasing nihari, naan, and signature dishes',
        'Interactive Google Maps with walking directions from Jama Masjid metro station',
        'Tourist-friendly "Plan Your Visit" section with tips and timing advice',
        'SEO to rank #1 for "Haji Shabrati" and "best nihari Old Delhi"',
      ]}
      testimonialConcept="You're already famous — food bloggers, travel writers, and TasteAtlas all recommend you. A website makes sure that fame translates into actual visitors who know your hours and location."
      packagePrice="₹35,000/mo"
      packagePriceINR="~$415/mo"
    />
  );
}
