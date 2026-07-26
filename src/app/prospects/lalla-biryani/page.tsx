import ProspectPage from '@/components/kraftai/ProspectPage';

export default function LallaBiryaniPage() {
  return (
    <ProspectPage
      businessName="Lalla Biryani"
      tagline="Serving Lucknow since 1985 — legendary taste, but invisible on the internet."
      city="Lucknow, Uttar Pradesh"
      country="India"
      cuisine="Biryani"
      established="1985"
      locations="1 location"
      currentProblem="You've been a Lucknow institution for nearly 40 years, but someone searching 'Lalla Biryani' on Google finds only Zomato and Swiggy listings. There's no official website — no menu, no story, no way to order directly. Your legacy deserves better."
      problems={[
        'No website — 40 years of history and not a single page on the internet you own',
        'Fully dependent on Zomato/Swiggy for online visibility, paying 25-30% commission',
        'Tourists looking up "famous biryani Lucknow" miss you entirely',
        'No online menu — customers have to call to ask about dishes and prices',
        'Your founding story (since 1985) isn\'t told anywhere you control',
        'No catering inquiry form — you\'re missing bulk/event orders',
      ]}
      features={[
        'Heritage-themed website telling the Lalla Biryani story since 1985',
        'Full menu with signature dishes, prices, and mouthwatering photos',
        'Direct online ordering — no commission, no middleman',
        'Catering & bulk order form for events and celebrations',
        'Google SEO to own page 1 for "Lalla Biryani Lucknow"',
        'WhatsApp integration for quick orders from regular customers',
      ]}
      testimonialConcept="A restaurant with 40 years of word-of-mouth reputation is a goldmine online. One website turns decades of local fame into searchable, clickable, orderable reality."
      packagePrice="₹35,000/mo"
      packagePriceINR="~$415/mo"
    />
  );
}
