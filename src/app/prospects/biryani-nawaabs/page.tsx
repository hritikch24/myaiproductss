import ProspectPage from '@/components/kraftai/ProspectPage';

export default function BiryaniNawaabsPage() {
  return (
    <ProspectPage
      businessName="Biryani Nawaabs"
      tagline="4.7 stars, 820+ Google reviews — but zero web presence. Lucknow deserves better."
      city="Lucknow, Uttar Pradesh"
      country="India"
      cuisine="Biryani & Mughlai"
      locations="1 location"
      rating="4.7★ (820+ Google reviews)"
      currentProblem="You have one of the highest-rated biryani spots in Lucknow, but if someone Googles 'Biryani Nawaabs,' they only find Zomato and Swiggy — both taking 25-30% of every order. You have no website, no online menu, and no way for customers to order directly."
      problems={[
        'No website at all — 100% dependent on Zomato/Swiggy which charge 25-30% commission',
        'Customers searching "best biryani Lucknow" can\'t find you on Google organically',
        'No online menu with prices — customers have to call or visit to see what you offer',
        'No Google Business Profile website link — missed click-through from 820+ reviewer traffic',
        'No way for tourists or out-of-city visitors to discover you before they arrive',
        'Competitors with websites are capturing search traffic that should be yours',
      ]}
      features={[
        'Stunning website showcasing your signature biryanis with high-quality photos',
        'Direct online ordering — keep 100% of every order, zero commission',
        'Full interactive menu with prices, descriptions, and spice levels',
        'Google Maps integration with directions and delivery radius',
        'AI-powered WhatsApp bot for orders and delivery tracking',
        'SEO-optimized to rank #1 for "Biryani Nawaabs Lucknow"',
      ]}
      testimonialConcept="With 820+ Google reviews and a 4.7-star rating, you already have the reputation. A website converts that reputation into direct revenue."
      packagePrice="₹35,000/mo"
      packagePriceINR="~$415/mo"
    />
  );
}
