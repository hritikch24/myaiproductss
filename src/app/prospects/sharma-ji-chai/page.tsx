import ProspectPage from '@/components/kraftai/ProspectPage';

export default function SharmaJiChaiPage() {
  return (
    <ProspectPage
      businessName="Sharma Ji Ki Chai"
      tagline="50+ years of Lucknow's most legendary chai — visited by Prime Ministers and Bollywood stars — but invisible online."
      city="Lucknow, Uttar Pradesh"
      country="India"
      cuisine="Kulhad Chai, Bun Makkhan, Samosa"
      established="1970s"
      locations="1 iconic location — 14 Maqbara Road, Hazratganj"
      rating="Endorsed by UP Tourism, visited by Atal Bihari Vajpayee, Rajnath Singh, Kartik Aaryan"
      currentProblem="Sharma Ji Ki Chai has been Lucknow's most iconic chai destination for over 50 years. Politicians like Atal Bihari Vajpayee and Rajnath Singh have visited. Bollywood stars like Kartik Aaryan and celebrity chef Sanjeev Kapoor have praised your chai. The UP Tourism department endorses you. But when someone Googles 'Sharma Ji Ki Chai Lucknow' — they find JustDial, Zomato, and random blog posts. No website. No menu. No story. A 50-year legacy deserves more than a JustDial listing."
      problems={[
        'No website — 50+ years of legacy with zero official online presence',
        'Tourists searching for famous Lucknow street food can\'t find your hours, menu, or location easily',
        'Celebrity endorsements (Kartik Aaryan, Sanjeev Kapoor, UP Tourism) have nowhere to be showcased',
        'No online ordering for your famous kulhad chai, bun makkhan, and round samosa',
        'Competitors with websites are capturing the search traffic that should be yours',
        'Your incredible 50-year story — from a small stall to a Lucknow institution — isn\'t being told anywhere you control',
      ]}
      features={[
        'Heritage website showcasing 50+ years of chai history and celebrity visits',
        'Full menu with prices — Kulhad Chai, Bun Makkhan, Round Samosa, Imarti, and more',
        'Photo gallery featuring visits from politicians, Bollywood stars, and food celebrities',
        'Google Maps integration so tourists find you instantly in Hazratganj',
        'Google SEO to rank #1 for "best chai in Lucknow" and "Sharma Ji Ki Chai"',
        'Online pre-ordering for bulk/event orders — weddings, corporate events, festivals',
      ]}
      testimonialConcept="When Atal Bihari Vajpayee, Kartik Aaryan, and Sanjeev Kapoor all praise your chai — that's not just a tea stall, it's a cultural institution. A website turns 50 years of word-of-mouth into permanent, searchable digital presence that brings tourists straight to your door."
      packagePrice="₹25,000/mo"
    />
  );
}
