import ProspectPage from '@/components/kraftai/ProspectPage';

export default function LaPinataPage() {
  return (
    <ProspectPage
      businessName="La Piñata Taqueria"
      tagline="Ranked #6 food truck in the entire US by Yelp — but no website to show the world."
      city="Vallejo, CA"
      country="US"
      cuisine="Mexican — Tacos, Burritos, Tortas"
      locations="1 food truck — 809 Broadway St"
      rating="#6 Best Food Truck in US (Yelp 2025), 424+ reviews"
      currentProblem="Yelp ranked you the #6 best food truck in the entire United States. The SF Chronicle listed your burritos among the best in the Bay Area. You have 424+ reviews and a massive local following. But when customers search for you, they find only a Facebook page and Yelp listing — no website, no online menu, no ordering. That's a lot of fame with no digital foundation."
      problems={[
        'No website — the #6 food truck in America has no official online presence',
        'Customers can\'t find your full menu, prices, or daily location without scrolling Facebook',
        'SF Chronicle and Yelp features drive traffic to third-party sites, not to you',
        'No online ordering for pickup — losing sales to competitors with easy ordering',
        'Catering opportunities in the Bay Area have no landing page or inquiry form',
        'Your story and awards (#6 in US!) aren\'t showcased on a page you own and control',
      ]}
      features={[
        'Professional website highlighting your #6 ranking and SF Chronicle feature',
        'Full menu with prices — Carnitas, Al Pastor, Super Burritos, Quesadillas, and famous Horchata',
        'Direct online ordering for pickup — stop losing sales',
        'Catering page targeting Bay Area events, offices, and parties',
        'Google SEO to rank #1 for "La Piñata Taqueria Vallejo" and "best tacos Vallejo"',
        'Daily schedule/location updates so fans always know where to find you',
      ]}
      testimonialConcept="Being ranked #6 in the entire US is the kind of validation most food trucks dream of. A website turns that recognition into a permanent sales engine — customers searching 'best food truck near me' should land on YOUR page, not a Yelp listing."
      packagePrice="$399/mo"
    />
  );
}
