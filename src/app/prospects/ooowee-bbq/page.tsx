import ProspectPage from '@/components/kraftai/ProspectPage';

export default function OooWeeBBQPage() {
  return (
    <ProspectPage
      businessName="OooWee BBQ"
      tagline="Charlotte's favorite BBQ food trucks for 10+ years — but no website to call home."
      city="Charlotte, NC"
      country="US"
      cuisine="BBQ"
      established="2010s"
      locations="2 food trucks"
      currentProblem="You've been smoking brisket and serving Charlotte for over a decade with 2 trucks and strong reviews — but you have no website. Customers looking for your schedule, menu, or catering info have to piece it together from Yelp and food truck finder sites. Charlotte's food truck scene is booming, and you're losing catering gigs to competitors with professional websites."
      problems={[
        'No website — customers search "OooWee BBQ Charlotte" and find only Yelp and aggregator pages',
        'No central place to post your daily truck locations and schedule',
        'Catering inquiries have no landing page — you\'re missing corporate events and weddings',
        'Food truck finder sites give you a tiny listing alongside dozens of competitors',
        'No online menu with photos — potential customers can\'t preview your food',
        'Your 10+ year track record isn\'t showcased anywhere you own',
      ]}
      features={[
        'Professional website with live truck location tracker',
        'Full BBQ menu with photos, prices, and portion sizes',
        'Catering page with inquiry form, pricing tiers, and past event photos',
        'Weekly schedule page showing where each truck will be',
        'Google SEO to own "BBQ food truck Charlotte" searches',
        'Email signup for weekly schedule + special event notifications',
      ]}
      testimonialConcept="Charlotte's food truck scene is growing fast. The trucks with websites get the catering gigs, event bookings, and loyal following. After 10+ years, you've earned the reputation — now let's make it findable."
      packagePrice="$349/mo"
    />
  );
}
