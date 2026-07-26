import ProspectPage from '@/components/kraftai/ProspectPage';

export default function HajiAliJuicePage() {
  return (
    <ProspectPage
      businessName="Haji Ali Juice Centre"
      tagline="Mumbai's legendary juice destination since the 1960s — loved by millions, but invisible online."
      city="Mumbai, India"
      country="India"
      cuisine="Fresh Juices & Shakes"
      established="1960s"
      locations="Multiple branches (Haji Ali, Bandra, Tardeo, Kochi)"
      rating="28,000+ reviews across platforms"
      currentProblem="You're one of Mumbai's most iconic names — 28,000+ reviews, multiple branches, and a heritage spanning 60+ years. But when someone Googles 'Haji Ali Juice Centre,' they find only Zomato, TripAdvisor, and random blog posts. No official website. No menu. No branch locations page. Just third-party noise."
      problems={[
        'No website — one of Mumbai\'s most famous food landmarks has zero official web presence',
        'Multiple branches (Haji Ali, Bandra, Tardeo, Kochi) but no centralized location page with hours and addresses',
        '28,000+ reviews across platforms — all driving traffic to Zomato and TripAdvisor instead of to you',
        'Tourists searching "famous juice in Mumbai" land on blog posts, not your own page',
        'No online menu showing your 25+ juice varieties with prices',
        'Franchise/expansion inquiries have no professional landing page to arrive at',
      ]}
      features={[
        'Stunning website showcasing 60+ years of heritage and your full juice menu with photos',
        'All branch locations on an interactive map — Haji Ali, Bandra, Tardeo, Kochi with hours & directions',
        'Full menu with 25+ juice varieties, shakes, and faloodas with prices and photos',
        'Tourist-friendly "Plan Your Visit" section with nearest landmarks and transport',
        'Google SEO to rank #1 for "Haji Ali Juice Centre Mumbai" — own your name',
        'Franchise inquiry page for potential partners and expansion opportunities',
      ]}
      testimonialConcept="With 28,000+ reviews and multiple branches, even a small percentage of customers ordering direct or visiting via your website (instead of searching Zomato) adds up to massive revenue. Tourists planning Mumbai trips specifically search for you — give them a place to land."
      packagePrice="₹50,000/mo"
      packagePriceINR="~$595/mo"
    />
  );
}
