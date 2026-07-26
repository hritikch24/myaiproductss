import ProspectPage from '@/components/kraftai/ProspectPage';

export default function TonysCatchPage() {
  return (
    <ProspectPage
      businessName="Tony's Catch"
      tagline="Ranked #1 food truck in all of America by Yelp — but no website to match that title."
      city="Kapaa, Kauai, HI"
      country="US"
      cuisine="Zicatela-Style Fish Tacos, Poke, Seafood"
      locations="1 food truck — 4-1602 Kuhio Hwy, Kapaa"
      rating="#1 Food Truck in America (Yelp 2025), 360+ reviews"
      currentProblem="Tony's Catch was just crowned the #1 food truck in the entire United States by Yelp. Out of hundreds of thousands of food trucks, yours is number one. 360+ reviews, tourists flying to Kauai specifically mentioning your fish tacos. But when they Google 'Tony's Catch Kapaa' — there's no website. No menu. No hours. Just Yelp and TripAdvisor listings. The best food truck in America doesn't have a homepage. That's a massive missed opportunity, especially when every tourist to Kauai plans their food stops in advance."
      problems={[
        'No website — the #1 food truck in America has no official online presence',
        'Tourists planning Kauai trips can\'t find your menu, hours, or exact location easily',
        'Your Zicatela-style fish tacos and the story behind them isn\'t told anywhere you control',
        'No online ordering — tourists could pre-order for beach picnics and group outings',
        'Yelp owns your #1 ranking page — you don\'t benefit from that traffic directly',
        'No catering page for resort events, beach weddings, and luaus on Kauai',
      ]}
      features={[
        'Professional website announcing your #1 ranking with a design worthy of the title',
        'Full menu with your signature Zicatela fish tacos, poke bowls, and fresh catches',
        'Tourist-friendly location page — GPS coordinates, bike path directions, parking info',
        'Online pre-ordering for beach picnics, group orders, and resort guests',
        'Google SEO to rank #1 for "best food truck Kauai" and "Tony\'s Catch Kapaa"',
        'Catering page targeting Kauai resorts, beach weddings, and corporate retreats',
      ]}
      testimonialConcept="You're literally the best food truck in America according to Yelp. Every tourist planning a Kauai trip researches food stops in advance. Right now they land on Yelp — a website turns that #1 ranking into a permanent sales engine with your menu, your story, and direct ordering."
      packagePrice="$449/mo"
    />
  );
}
