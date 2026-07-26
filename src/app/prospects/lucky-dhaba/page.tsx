import ProspectPage from '@/components/kraftai/ProspectPage';

export default function LuckyDhabaPage() {
  return (
    <ProspectPage
      businessName="Lucky Dhaba"
      tagline="The legendary NH1 highway dhaba since 1967 — 57 years of pure veg Punjabi classics, zero web presence."
      city="Jalandhar, Punjab"
      country="India"
      cuisine="Pure Veg Punjabi / North Indian"
      established="1967"
      locations="1 location — GT Road (NH1)"
      rating="Ranked #24 of 129 in Jalandhar (TripAdvisor)"
      currentProblem="Lucky Dhaba has been a legendary stop on NH1 since 1967 — nearly six decades of serving travelers and locals. But when someone Googles you before a road trip, they find only TripAdvisor, Zomato, and JustDial listings. No official website, no menu, no story. Your 57-year legacy deserves its own digital home."
      problems={[
        'No website — a 57-year-old legendary dhaba has zero official online presence',
        'Travelers planning NH1 road trips can\'t find your menu, hours, or photos before arriving',
        'Only TripAdvisor, Zomato, and JustDial — all third-party sites you don\'t control',
        'Younger generation of highway travelers searches online before stopping — you\'re missing them',
        'No catering or event page — missing bulk orders and celebrations',
        'Your founding story from 1967 and decades of legacy aren\'t told anywhere you own',
      ]}
      features={[
        'Heritage-themed website honoring 57 years on the GT Road — your founding story front and center',
        'Full menu with photos — dal makhani, paneer dishes, paranthas, and all your Punjabi classics',
        'Google Maps integration with "Plan Your Stop" — distance calculator from major cities on NH1',
        'WhatsApp ordering for travelers who want food ready when they arrive',
        'Google SEO to rank #1 for "Lucky Dhaba Jalandhar" and "best dhaba on NH1"',
        'Event & catering inquiry form for weddings, parties, and large group bookings',
      ]}
      testimonialConcept="Highway travelers increasingly search online before choosing where to stop. A website puts you on the map for the next generation of road trippers — and gives you a channel for catering and event orders that competitors with websites are already capturing."
      packagePrice="₹30,000/mo"
      packagePriceINR="~$355/mo"
    />
  );
}
