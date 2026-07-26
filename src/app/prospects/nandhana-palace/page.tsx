import ProspectPage from '@/components/kraftai/ProspectPage';

export default function NandhanaPalacePage() {
  return (
    <ProspectPage
      businessName="Nandhana Palace"
      tagline="Bangalore's beloved Andhra restaurant chain — 10+ locations, but your website is down."
      city="Bangalore, Karnataka"
      country="India"
      cuisine="Andhra"
      locations="10+ locations"
      currentProblem="Your domain nandhanarestaurants.com exists but is completely dead — it times out. Customers searching for Nandhana Palace online only find Zomato and Swiggy listings, which charge you 25-30% commission on every order."
      problems={[
        'Your website nandhanarestaurants.com is dead — customers get a blank page or timeout error',
        'All 10+ locations are invisible in Google Search without a working website',
        "You're paying 25-30% commission to Zomato/Swiggy for orders that could come direct",
        'No centralized menu, location finder, or online ordering for your loyal customers',
        'Competitors with working websites rank above you for "Andhra restaurant Bangalore"',
        'Tourists and new customers searching online can\'t find your hours, menu, or nearest location',
      ]}
      features={[
        'Professional website with all 10+ locations on an interactive map',
        'Full menu with photos, prices, and dietary info for every dish',
        'Direct online ordering system — 0% commission, straight to your kitchen',
        'Google SEO to rank #1 for "Nandhana Palace" and "Andhra restaurant Bangalore"',
        'WhatsApp ordering integration for regular customers',
        'AI chatbot answering "which location is nearest?" 24/7',
      ]}
      rating="4.2★ (thousands of reviews)"
      testimonialConcept="With 10+ locations, even a 15% shift from Zomato to direct orders could save you ₹5-10 lakhs per month in commissions alone."
      packagePrice="₹75,000/mo"
      packagePriceINR="~$890/mo for all locations"
    />
  );
}
