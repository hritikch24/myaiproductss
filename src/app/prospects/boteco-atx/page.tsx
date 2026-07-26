import ProspectPage from '@/components/kraftai/ProspectPage';

export default function BotecoPage() {
  return (
    <ProspectPage
      businessName="Boteco Food Truck"
      tagline="Austin's favorite Brazilian food truck — featured on Diners, Drive-Ins & Dives, but no website."
      city="Austin, TX"
      country="US"
      cuisine="Brazilian Street Food"
      locations="1 food truck"
      rating="463+ Yelp reviews, 570+ photos"
      currentProblem="You've been featured on Diners, Drive-Ins & Dives with Guy Fieri. You have 463+ Yelp reviews and 570+ photos. Matthew McConaughey recommends you. But when someone Googles 'Boteco Food Truck Austin,' there's no website — just scattered Yelp pages, DoorDash listings, and an Instagram handle. All that fame, and no digital home."
      problems={[
        'No website — despite being featured on national TV (Diners, Drive-Ins & Dives)',
        'DoorDash takes 20-30% commission on every delivery order you fulfill',
        'No central place for your menu, daily location, or operating hours',
        'Catering inquiries for Austin events have no landing page or form',
        'Your incredible story — Fernando\'s journey from Minas Gerais, Brazil — isn\'t told anywhere you control',
        '463+ Yelp reviews driving traffic to Yelp, not to you',
      ]}
      features={[
        'Professional website showcasing your Diners, Drive-Ins & Dives feature and press coverage',
        'Full Brazilian menu with photos — Feijoada, Picanha, Coxinha, Pão de Queijo, and more',
        'Direct online ordering for pickup — keep 100% of every sale',
        'Catering page for Austin events, weddings, and corporate functions',
        'Google SEO to rank #1 for "Boteco Austin" and "Brazilian food truck Austin"',
        'Instagram feed integration + daily location updates to keep fans coming back',
      ]}
      testimonialConcept="You've already been validated on national TV. A website turns that one-time Diners, Drive-Ins & Dives boost into permanent, searchable traffic — and moves delivery orders from DoorDash (30% commission) to direct orders (0% commission)."
      packagePrice="$449/mo"
    />
  );
}
