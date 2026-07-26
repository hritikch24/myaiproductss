import ProspectPage from '@/components/kraftai/ProspectPage';

export default function RatnaCafePage() {
  return (
    <ProspectPage
      businessName="Ratna Cafe"
      tagline="Chennai's oldest vegetarian restaurant chain — serving sambar-idly since 1948 — but no website in 2026."
      city="Chennai, Tamil Nadu"
      country="India"
      cuisine="South Indian Vegetarian — Tiffins, Meals"
      established="1948"
      locations="Multiple branches — Triplicane, Mylapore, Kilpauk, Adyar"
      rating="Chennai's most iconic veg restaurant, 75+ year legacy"
      currentProblem="Ratna Cafe has been Chennai's go-to vegetarian restaurant since 1948 — over 75 years of serving the city's best sambar-idly, dosas, and South Indian meals. You've expanded to multiple locations across Chennai. You have an Instagram following and loyal customers spanning three generations. But you have NO website. When someone searches 'Ratna Cafe Chennai' they find Zomato listings and random food blogs — not your story, not your menu, not a way to order directly. For a 75-year-old institution with multiple branches, that's a massive gap."
      problems={[
        'No website — 75+ years of heritage with zero official web presence',
        'Multiple locations (Triplicane, Mylapore, Kilpauk, Adyar) but no central hub showing all branches',
        'Zomato takes commission on every order — no direct online ordering system',
        'Tourists searching for "best South Indian food Chennai" find competitors with websites first',
        'Your 1948 origin story and three-generation legacy isn\'t showcased anywhere you control',
        'No catering page — Chennai\'s biggest events and weddings can\'t easily discover your catering services',
      ]}
      features={[
        'Heritage website showcasing 75+ years of culinary tradition since 1948',
        'All locations with hours, maps, and real-time info — Triplicane, Mylapore, Kilpauk, Adyar',
        'Full menu with prices — Sambar Idly, Dosas, Meals, Tiffins, and seasonal specials',
        'Direct online ordering — stop paying Zomato/Swiggy commissions on every order',
        'Catering page targeting Chennai weddings, corporate events, and festivals',
        'Google SEO to dominate "best vegetarian restaurant Chennai" and "Ratna Cafe" searches',
      ]}
      testimonialConcept="Three generations of Chennai families have grown up eating at Ratna Cafe. When your sambar-idly has been legendary since 1948, a website isn't optional — it's how the next generation discovers you. Direct ordering alone could save lakhs in Zomato commissions annually."
      packagePrice="₹40,000/mo"
    />
  );
}
