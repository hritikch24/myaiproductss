import ProspectPage from '@/components/kraftai/ProspectPage';

export default function CheapCharliesPage() {
  return (
    <ProspectPage
      businessName="Cheap Charlie's Taco Shop"
      tagline="4 Nashville locations serving amazing tacos — but no website to show for it."
      city="Nashville, TN"
      country="US"
      cuisine="Tacos & Mexican"
      locations="4 locations"
      currentProblem="You have 4 locations across Nashville, strong reviews on DoorDash and Grubhub, and a loyal following — but when someone searches 'Cheap Charlie's Taco Shop,' there's no website. Just scattered social media posts and third-party delivery apps taking 20-30% of every order."
      problems={[
        'No website — customers searching you on Google find only Facebook and delivery apps',
        '4 locations but no centralized page showing addresses, hours, or menus',
        'DoorDash & Grubhub take 20-30% commission on every order you fulfill',
        'No online ordering for pickup — customers default to expensive delivery apps',
        'New Nashville residents and tourists can\'t discover you organically',
        'No catering page — Nashville event planners can\'t find you for corporate orders',
      ]}
      features={[
        'Professional website with all 4 Nashville locations on an interactive map',
        'Full menu with pricing, photos, and daily specials for each location',
        'Direct online ordering for pickup — keep 100% of every sale',
        'Catering inquiry form for corporate events, parties, and weddings',
        'Google SEO to rank #1 for "Cheap Charlie\'s Taco Shop Nashville"',
        'Instagram feed integration to keep the site fresh with your latest posts',
      ]}
      testimonialConcept="With 4 locations, even a small shift from DoorDash to direct orders saves you thousands per month. Nashville's food scene is competitive — a website makes you findable."
      packagePrice="$499/mo"
    />
  );
}
