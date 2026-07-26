import ProspectPage from '@/components/kraftai/ProspectPage';

export default function CapitolBurgerPage() {
  return (
    <ProspectPage
      businessName="Capitol Burger"
      tagline="Ranked #1 restaurant in Torrey, 4.9★ on TripAdvisor, near Capitol Reef National Park — but no website for the tourists searching for you."
      city="Torrey, UT"
      country="US"
      cuisine="Gourmet Burgers — Fresh Ground, House-Pickled"
      locations="1 food truck — 12 W Main St, Torrey"
      rating="4.9★ TripAdvisor, #1 of 21 in Torrey, 282+ Yelp reviews"
      currentProblem="Capitol Burger is literally the #1 rated restaurant in Torrey, Utah — 4.9 stars on TripAdvisor, 282+ Yelp reviews, 246 photos. You're the first thing tourists want to eat after visiting Capitol Reef National Park. You grind your beef fresh daily and house-pickle everything. But you have NO website. Every tourist planning a Capitol Reef trip Googles 'where to eat near Capitol Reef' — and they find TripAdvisor and Yelp listings instead of your own page. No menu, no hours (which change seasonally), no story about your fine-dining background. For the best restaurant in town, that's a lot of tourist traffic you're not capturing."
      problems={[
        'No website — the #1 restaurant in Torrey has no official online presence',
        'Tourists planning Capitol Reef trips can\'t find your seasonal hours or current menu',
        'Your fine-dining background and fresh-ground-daily process isn\'t showcased anywhere',
        'TripAdvisor and Yelp own your narrative — you don\'t control your own story',
        'Seasonal hours (closed Nov-Mar) confuse tourists who show up not knowing you\'re open',
        'No catering page for park events, weddings at nearby lodges, or group tours',
      ]}
      features={[
        'Professional website optimized for "where to eat near Capitol Reef National Park"',
        'Full menu with your fresh-ground burgers, house-pickled specialties, and seasonal items',
        'Seasonal hours display — automatically shows open/closed status so tourists know before they drive',
        'Your story — from fine dining to food truck, why fresh-ground matters, the house-pickle process',
        'Google SEO to rank #1 for "best restaurant Torrey Utah" and "food near Capitol Reef"',
        'Photo gallery showcasing your beautiful red-rock setting and handcrafted burgers',
      ]}
      testimonialConcept="Capitol Reef National Park gets over a million visitors a year. Every one of them searches for food nearby. Right now, the #1 restaurant in Torrey — that's you — only shows up as a TripAdvisor listing. A website makes you the first thing they see, with your menu, hours, and story ready to convert a hungry tourist into a customer."
      packagePrice="$399/mo"
    />
  );
}
