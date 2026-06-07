'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

/* ─── Icon Component ─── */
const icons: Record<string, React.ReactNode> = {
  home: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  orders: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>,
  profile: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  pin: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  chevron: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  chevronDown: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevronLeft: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  cart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  info: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  navigation: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  settings: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  address: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  help: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  payment: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
};

function Icon({ name, size, color }: { name: string; size?: number; color?: string }) {
  const icon = icons[name];
  if (!icon) return null;
  return <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: color || 'inherit', width: size || 22, height: size || 22 }}>{icon}</span>;
}

/* ─── Types ─── */
interface MenuItem {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  description: string;
  emoji: string;
  prepTime: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  prepTime: string;
  area: string;
  emoji: string;
  bg: string;
  categories: MenuCategory[];
  cuisineTag: string;
}

/* ─── Data ─── */
const restaurants: Restaurant[] = [
  {
    id: 'vidyarthi', name: 'Vidyarthi Bhavan', cuisine: 'South Indian', rating: 4.6,
    distance: '3.2 km', prepTime: '20-25 min', area: 'Basavanagudi', emoji: '🥘',
    bg: '#FFF3E0', cuisineTag: 'South Indian',
    categories: [
      { name: 'Breakfast', items: [
        { id: 'v1', name: 'Masala Dosa', price: 75, veg: true, description: 'Crispy dosa with spiced potato filling', emoji: '🥘', prepTime: '12 min' },
        { id: 'v2', name: 'Idli Sambar', price: 60, veg: true, description: 'Steamed rice cakes with lentil stew', emoji: '🍚', prepTime: '10 min' },
        { id: 'v3', name: 'Vada', price: 50, veg: true, description: 'Crispy fried lentil donuts', emoji: '🍩', prepTime: '10 min' },
      ]},
      { name: 'Mains', items: [
        { id: 'v4', name: 'Thali Meals', price: 130, veg: true, description: 'Full South Indian meal with rice and sides', emoji: '🍛', prepTime: '15 min' },
        { id: 'v5', name: 'Bisi Bele Bath', price: 95, veg: true, description: 'Spiced rice and lentil dish with vegetables', emoji: '🍲', prepTime: '15 min' },
      ]},
      { name: 'Drinks', items: [
        { id: 'v6', name: 'Filter Coffee', price: 30, veg: true, description: 'Traditional South Indian filter coffee', emoji: '☕', prepTime: '5 min' },
        { id: 'v7', name: 'Buttermilk', price: 25, veg: true, description: 'Spiced churned yogurt drink', emoji: '🥛', prepTime: '3 min' },
      ]},
    ],
  },
  {
    id: 'meghana', name: 'Meghana Foods', cuisine: 'Biryani / Andhra', rating: 4.4,
    distance: '5.1 km', prepTime: '30-35 min', area: 'Koramangala', emoji: '🍗',
    bg: '#FCE4EC', cuisineTag: 'North Indian',
    categories: [
      { name: 'Biryani', items: [
        { id: 'm1', name: 'Chicken Biryani', price: 280, veg: false, description: 'Fragrant rice layered with spiced chicken', emoji: '🍗', prepTime: '20 min' },
        { id: 'm2', name: 'Mutton Biryani', price: 360, veg: false, description: 'Slow-cooked mutton with aromatic rice', emoji: '🥩', prepTime: '25 min' },
        { id: 'm3', name: 'Veg Biryani', price: 200, veg: true, description: 'Mixed vegetables with flavored basmati', emoji: '🥗', prepTime: '18 min' },
      ]},
      { name: 'Starters', items: [
        { id: 'm4', name: 'Chicken 65', price: 220, veg: false, description: 'Deep-fried spicy chicken bites', emoji: '🍖', prepTime: '15 min' },
        { id: 'm5', name: 'Gongura Chicken', price: 240, veg: false, description: 'Chicken cooked with tangy sorrel leaves', emoji: '🌿', prepTime: '18 min' },
      ]},
      { name: 'Sides', items: [
        { id: 'm6', name: 'Raita', price: 40, veg: true, description: 'Cool yogurt with cucumber and spices', emoji: '🥣', prepTime: '3 min' },
        { id: 'm7', name: 'Brinjal Curry', price: 80, veg: true, description: 'Smoky roasted eggplant gravy', emoji: '🍆', prepTime: '10 min' },
      ]},
    ],
  },
  {
    id: 'truffles', name: 'Truffles', cuisine: 'Burgers / Steaks', rating: 4.3,
    distance: '2.8 km', prepTime: '20-30 min', area: 'St. Marks Road', emoji: '🍔',
    bg: '#E3F2FD', cuisineTag: 'Cafe',
    categories: [
      { name: 'Burgers', items: [
        { id: 't1', name: 'Truffle Burger', price: 380, veg: false, description: 'Signature juicy burger with truffle sauce', emoji: '🍔', prepTime: '15 min' },
        { id: 't2', name: 'Mushroom Swiss', price: 320, veg: true, description: 'Grilled mushroom patty with Swiss cheese', emoji: '🍄', prepTime: '15 min' },
        { id: 't3', name: 'Chicken Bacon', price: 360, veg: false, description: 'Chicken patty with crispy bacon strips', emoji: '🥓', prepTime: '15 min' },
      ]},
      { name: 'Steaks', items: [
        { id: 't4', name: 'Ribeye Steak', price: 680, veg: false, description: 'Premium ribeye grilled to perfection', emoji: '🥩', prepTime: '25 min' },
        { id: 't5', name: 'Pan Seared Chicken', price: 420, veg: false, description: 'Pan-seared chicken breast with herbs', emoji: '🍖', prepTime: '20 min' },
      ]},
      { name: 'Sides', items: [
        { id: 't6', name: 'Loaded Fries', price: 180, veg: true, description: 'Crispy fries with cheese and jalapenos', emoji: '🍟', prepTime: '10 min' },
        { id: 't7', name: 'Milkshake', price: 160, veg: true, description: 'Thick creamy milkshake, choice of flavor', emoji: '🥤', prepTime: '5 min' },
      ]},
    ],
  },
  {
    id: 'brahmins', name: "Brahmin's Coffee Bar", cuisine: 'Tiffin / Coffee', rating: 4.5,
    distance: '1.9 km', prepTime: '15-20 min', area: 'Shankarapuram', emoji: '☕',
    bg: '#F3E5F5', cuisineTag: 'South Indian',
    categories: [
      { name: 'Tiffin', items: [
        { id: 'b1', name: 'Idli', price: 45, veg: true, description: 'Soft steamed rice cakes, served with chutney', emoji: '🍚', prepTime: '8 min' },
        { id: 'b2', name: 'Khara Bath', price: 50, veg: true, description: 'Spiced semolina dish with cashews', emoji: '🍲', prepTime: '10 min' },
        { id: 'b3', name: 'Kesari Bath', price: 45, veg: true, description: 'Sweet semolina pudding with saffron', emoji: '🍮', prepTime: '10 min' },
      ]},
      { name: 'Coffee', items: [
        { id: 'b4', name: 'Filter Coffee', price: 20, veg: true, description: 'Strong decoction-based South Indian coffee', emoji: '☕', prepTime: '3 min' },
        { id: 'b5', name: 'Cold Coffee', price: 35, veg: true, description: 'Chilled coffee with milk and sugar', emoji: '🧊', prepTime: '5 min' },
      ]},
    ],
  },
  {
    id: 'permit', name: 'The Permit Room', cuisine: 'Modern Indian / Bar', rating: 4.2,
    distance: '4.6 km', prepTime: '25-35 min', area: 'Lavelle Road', emoji: '🍸',
    bg: '#E8F5E9', cuisineTag: 'North Indian',
    categories: [
      { name: 'Small Plates', items: [
        { id: 'p1', name: 'Pani Puri Shots', price: 220, veg: true, description: 'Deconstructed pani puri with vodka infusion', emoji: '🥂', prepTime: '10 min' },
        { id: 'p2', name: 'Keema Pav', price: 280, veg: false, description: 'Spiced minced meat with buttered bread', emoji: '🍞', prepTime: '15 min' },
        { id: 'p3', name: 'Smoked Mushroom Tikka', price: 240, veg: true, description: 'Charcoal-smoked mushroom skewers', emoji: '🍢', prepTime: '18 min' },
      ]},
      { name: 'Mains', items: [
        { id: 'p4', name: 'Butter Chicken', price: 380, veg: false, description: 'Creamy tomato curry with tender chicken', emoji: '🍛', prepTime: '20 min' },
        { id: 'p5', name: 'Dal Makhani', price: 280, veg: true, description: 'Slow-cooked black lentils in cream', emoji: '🥘', prepTime: '15 min' },
        { id: 'p6', name: 'Lachha Paratha', price: 120, veg: true, description: 'Flaky layered Indian flatbread', emoji: '🫓', prepTime: '10 min' },
      ]},
      { name: 'Cocktails', items: [
        { id: 'p7', name: 'Masala G&T', price: 420, veg: true, description: 'Indian spice-infused gin and tonic', emoji: '🍸', prepTime: '5 min' },
        { id: 'p8', name: 'Nimbu Pani Cocktail', price: 180, veg: true, description: 'Lemon mint refresher with a twist', emoji: '🍋', prepTime: '5 min' },
      ]},
    ],
  },
];

const cuisineFilters = ['All', 'South Indian', 'North Indian', 'Chinese', 'Cafe'];

/* ─── MapView Component ─── */
function MapView({ eta }: { eta: number }) {
  return (
    <svg width="100%" viewBox="0 0 390 260" style={{ borderRadius: 16, background: '#F5F5F0' }}>
      {/* Grid roads */}
      <rect x="0" y="60" width="390" height="8" rx="2" fill="#FFFFFF" />
      <rect x="0" y="130" width="390" height="8" rx="2" fill="#FFFFFF" />
      <rect x="0" y="200" width="390" height="8" rx="2" fill="#FFFFFF" />
      <rect x="80" y="0" width="8" height="260" rx="2" fill="#FFFFFF" />
      <rect x="190" y="0" width="8" height="260" rx="2" fill="#FFFFFF" />
      <rect x="300" y="0" width="8" height="260" rx="2" fill="#FFFFFF" />
      {/* Parks */}
      <rect x="20" y="15" width="50" height="35" rx="8" fill="#C8E6C9" />
      <rect x="220" y="75" width="65" height="45" rx="8" fill="#C8E6C9" />
      <rect x="110" y="210" width="55" height="35" rx="8" fill="#C8E6C9" />
      {/* Buildings */}
      <rect x="110" y="20" width="60" height="30" rx="4" fill="#E0E0E0" />
      <rect x="320" y="15" width="50" height="35" rx="4" fill="#E0E0E0" />
      <rect x="20" y="140" width="50" height="50" rx="4" fill="#E0E0E0" />
      <rect x="320" y="140" width="50" height="50" rx="4" fill="#E0E0E0" />
      <rect x="220" y="210" width="60" height="35" rx="4" fill="#E0E0E0" />
      {/* Route line */}
      <polyline
        points="320,230 300,200 195,200 195,130 88,130 88,65 150,65 195,65 195,40"
        fill="none" stroke="#FF6B35" strokeWidth="3" strokeDasharray="8,5"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* User dot */}
      <circle cx="320" cy="230" r="8" fill="#FF6B35" opacity="0.3">
        <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="230" r="5" fill="#FF6B35" />
      <text x="320" y="250" textAnchor="middle" fontSize="9" fill="#666" fontWeight="600">You</text>
      {/* Restaurant pin */}
      <g transform="translate(195,20)">
        <circle cx="0" cy="0" r="10" fill="#FF6B35" />
        <polygon points="-5,7 0,18 5,7" fill="#FF6B35" />
        <text x="0" y="4" textAnchor="middle" fontSize="10">🍽️</text>
      </g>
      <text x="195" y="48" textAnchor="middle" fontSize="9" fill="#666" fontWeight="600">Restaurant</text>
      {/* ETA bubble */}
      <rect x="130" y="100" width="60" height="24" rx="12" fill="#FF6B35" />
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#FFF" fontWeight="700">{eta} min</text>
    </svg>
  );
}

/* ─── Main Component ─── */
export default function DineReadyCustomer() {
  const [nav, setNav] = useState<'home' | 'orders' | 'profile'>('home');
  const [screen, setScreen] = useState<'home' | 'restaurant' | 'checkout' | 'tracking'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [activeCategory, setActiveCategory] = useState(0);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [arrivalMode, setArrivalMode] = useState<'track' | 'arrive'>('track');
  const [arrivalTime, setArrivalTime] = useState('13:30');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [trackingEta, setTrackingEta] = useState(18);
  const [trackingStep, setTrackingStep] = useState(0);
  const [liveOrderRestaurant, setLiveOrderRestaurant] = useState<Restaurant | null>(null);
  const [liveOrderTotal, setLiveOrderTotal] = useState(0);

  // Tracking timers
  useEffect(() => {
    if (screen !== 'tracking') return;
    const etaInterval = setInterval(() => {
      setTrackingEta(prev => (prev > 0 ? prev - 1 : 0));
    }, 8000);
    const stepInterval = setInterval(() => {
      setTrackingStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 12000);
    return () => { clearInterval(etaInterval); clearInterval(stepInterval); };
  }, [screen]);

  const addToCart = useCallback((itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => {
      const n = { ...prev };
      if (n[itemId] > 1) n[itemId]--;
      else delete n[itemId];
      return n;
    });
  }, []);

  const cartItemCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const cartTotal = useMemo(() => {
    if (!selectedRestaurant) return 0;
    let total = 0;
    for (const cat of selectedRestaurant.categories) {
      for (const item of cat.items) {
        if (cart[item.id]) total += item.price * cart[item.id];
      }
    }
    return total;
  }, [cart, selectedRestaurant]);

  const filteredRestaurants = useMemo(() => {
    let list = restaurants;
    if (activeCuisine !== 'All') list = list.filter(r => r.cuisineTag === activeCuisine);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.area.toLowerCase().includes(q));
    }
    return list;
  }, [activeCuisine, searchQuery]);

  const openRestaurant = (r: Restaurant) => {
    setSelectedRestaurant(r);
    setActiveCategory(0);
    setCart({});
    setScreen('restaurant');
  };

  const goCheckout = () => setScreen('checkout');

  const placeOrder = () => {
    setLiveOrderRestaurant(selectedRestaurant);
    setLiveOrderTotal(cartTotal);
    setTrackingEta(18);
    setTrackingStep(0);
    setScreen('tracking');
  };

  const goHome = () => {
    setScreen('home');
    setNav('home');
    setSelectedRestaurant(null);
    setCart({});
    setLiveOrderRestaurant(null);
  };

  const subtotal = cartTotal;
  const gst = Math.round(subtotal * 0.05);
  const platformFee = 10;
  const grandTotal = subtotal + gst + platformFee;

  const showBottomNav = screen === 'home';

  const trackingSteps = ['Order Confirmed', 'Kitchen starts', 'Cooking', 'Ready for pickup', 'Served'];

  /* ─── Render ─── */
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div
        style={{
          '--orange': '#FF6B35',
          '--orange-light': '#FFF0EB',
          '--orange-dark': '#E85A24',
          '--text': '#1A1A1A',
          '--text-2': '#666',
          '--text-3': '#999',
          '--border': '#F0F0F0',
          '--bg': '#FAFAFA',
          '--white': '#FFFFFF',
          '--veg': '#2E7D32',
          '--nonveg': '#C62828',
        } as React.CSSProperties}
      >
        <div style={{
          maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: '#FAFAFA',
          fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', position: 'relative',
          boxShadow: '0 0 40px rgba(0,0,0,0.08)',
        }}>

          {/* ─── HOME SCREEN ─── */}
          {screen === 'home' && nav === 'home' && (
            <div style={{ paddingBottom: 80 }}>
              {/* Location Header */}
              <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="pin" color="#FF6B35" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>Bengaluru <span style={{ color: '#999' }}>/</span> Koramangala</div>
                    <div style={{ fontSize: 11, color: '#999' }}>Delivering to current location</div>
                  </div>
                  <Icon name="chevronDown" color="#999" />
                </div>
                <Link href="/dineready/" style={{ fontSize: 13, fontWeight: 700, color: '#FF6B35', textDecoration: 'none', background: '#FFF0EB', padding: '5px 10px', borderRadius: 8 }}>DineReady</Link>
              </div>

              {/* Search */}
              <div style={{ padding: '8px 20px 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FFFFFF', border: '1.5px solid #F0F0F0', borderRadius: 14, padding: '11px 14px' }}>
                  <Icon name="search" color="#999" />
                  <input
                    placeholder="Search restaurants, cuisines..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, color: '#1A1A1A', background: 'transparent', fontFamily: 'inherit' }}
                  />
                </div>
              </div>

              {/* Greeting */}
              <div style={{ padding: '16px 20px 8px' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>What are you craving?</div>
              </div>

              {/* Cuisine Chips */}
              <div style={{ padding: '4px 20px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
                {cuisineFilters.map(c => (
                  <button key={c} onClick={() => setActiveCuisine(c)} style={{
                    padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, fontFamily: 'inherit', whiteSpace: 'nowrap',
                    background: activeCuisine === c ? '#FF6B35' : '#FFFFFF',
                    color: activeCuisine === c ? '#FFFFFF' : '#666',
                    boxShadow: activeCuisine === c ? '0 2px 8px rgba(255,107,53,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
                  }}>{c}</button>
                ))}
              </div>

              {/* Restaurant Cards */}
              <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredRestaurants.map(r => (
                  <div key={r.id} onClick={() => openRestaurant(r)} style={{
                    background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #F0F0F0',
                  }}>
                    {/* Image placeholder */}
                    <div style={{ background: r.bg, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, position: 'relative' }}>
                      {r.emoji}
                      <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.9)', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#666' }}>{r.area}</span>
                    </div>
                    <div style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{r.name}</div>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#2E7D32', color: '#FFF', padding: '2px 8px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                          <Icon name="star" size={12} /> {r.rating}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>{r.cuisine}</div>
                      <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#999' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={12} color="#999" /> {r.prepTime}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="pin" size={12} color="#999" /> {r.distance}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredRestaurants.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 40, color: '#999', fontSize: 14 }}>No restaurants found</div>
                )}
              </div>
            </div>
          )}

          {/* ─── ORDERS TAB ─── */}
          {screen === 'home' && nav === 'orders' && (
            <div style={{ paddingBottom: 80 }}>
              <div style={{ padding: '20px 20px 12px' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>Your Orders</div>
              </div>

              {liveOrderRestaurant && (
                <div style={{ margin: '0 20px 16px', background: '#FFF0EB', borderRadius: 16, padding: 16, border: '1.5px solid #FF6B35' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#FF6B35', textTransform: 'uppercase', letterSpacing: 0.5 }}>Live Order</span>
                    <span style={{ width: 8, height: 8, borderRadius: 4, background: '#FF6B35', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{liveOrderRestaurant.name}</div>
                  <div style={{ fontSize: 13, color: '#666' }}>Order total: ₹{liveOrderTotal}</div>
                  <button onClick={() => setScreen('tracking')} style={{ marginTop: 10, padding: '8px 16px', background: '#FF6B35', color: '#FFF', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Track Order</button>
                </div>
              )}

              {/* Past orders */}
              {[
                { name: 'Meghana Foods', items: 'Chicken Biryani x1, Raita x1', total: 320, date: 'Yesterday', emoji: '🍗' },
                { name: "Brahmin's Coffee Bar", items: 'Idli x2, Filter Coffee x1', total: 110, date: 'Apr 22', emoji: '☕' },
              ].map((order, i) => (
                <div key={i} style={{ margin: '0 20px 12px', background: '#FFFFFF', borderRadius: 14, padding: 16, border: '1px solid #F0F0F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 28 }}>{order.emoji}</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{order.name}</div>
                        <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{order.date}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>₹{order.total}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#666' }}>{order.items}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button style={{ flex: 1, padding: '8px 0', background: '#FFF0EB', color: '#FF6B35', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Reorder</button>
                    <button style={{ flex: 1, padding: '8px 0', background: '#F0F0F0', color: '#666', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Receipt</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── PROFILE TAB ─── */}
          {screen === 'home' && nav === 'profile' && (
            <div style={{ paddingBottom: 80 }}>
              <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 28, background: '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#FF6B35' }}>AK</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>Arjun Kumar</div>
                  <div style={{ fontSize: 13, color: '#666' }}>+91 98456 23100</div>
                  <div style={{ fontSize: 11, color: '#FF6B35', fontWeight: 600, marginTop: 2 }}>DineReady Gold Member</div>
                </div>
              </div>

              <div style={{ padding: '0 20px' }}>
                {[
                  { icon: 'address', label: 'Saved Addresses' },
                  { icon: 'payment', label: 'Payment Methods' },
                  { icon: 'settings', label: 'Preferences' },
                  { icon: 'help', label: 'Help & Support' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 0', borderBottom: '1px solid #F0F0F0', cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Icon name={item.icon} color="#666" />
                      <span style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</span>
                    </div>
                    <Icon name="chevron" color="#CCC" />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', padding: '32px 20px', color: '#999', fontSize: 12 }}>
                DineReady v1.0.0 · Made in Bengaluru 🇮🇳
              </div>
            </div>
          )}

          {/* ─── RESTAURANT SCREEN ─── */}
          {screen === 'restaurant' && selectedRestaurant && (
            <div style={{ paddingBottom: cartItemCount > 0 ? 80 : 0 }}>
              {/* Hero */}
              <div style={{ background: selectedRestaurant.bg, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative' }}>
                <button onClick={() => { setScreen('home'); setNav('home'); setSelectedRestaurant(null); setCart({}); }} style={{
                  position: 'absolute', top: 14, left: 14, width: 38, height: 38, borderRadius: 19,
                  background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="chevronLeft" color="#1A1A1A" />
                </button>
                {selectedRestaurant.emoji}
              </div>

              {/* Info */}
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selectedRestaurant.name}</div>
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{selectedRestaurant.cuisine} · {selectedRestaurant.area}</div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#2E7D32', color: '#FFF', padding: '3px 10px', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                    <Icon name="star" size={13} /> {selectedRestaurant.rating}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#666' }}><Icon name="clock" size={14} color="#666" /> {selectedRestaurant.prepTime}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#666' }}><Icon name="pin" size={14} color="#666" /> {selectedRestaurant.distance}</span>
                </div>
              </div>

              {/* Category Tabs */}
              <div style={{ display: 'flex', gap: 0, borderBottom: '1.5px solid #F0F0F0', padding: '0 20px', overflowX: 'auto' }}>
                {selectedRestaurant.categories.map((cat, i) => (
                  <button key={cat.name} onClick={() => setActiveCategory(i)} style={{
                    padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                    background: 'transparent', whiteSpace: 'nowrap',
                    color: activeCategory === i ? '#FF6B35' : '#999',
                    borderBottom: activeCategory === i ? '2.5px solid #FF6B35' : '2.5px solid transparent',
                  }}>{cat.name}</button>
                ))}
              </div>

              {/* Menu Items */}
              <div style={{ padding: '12px 20px' }}>
                {selectedRestaurant.categories[activeCategory]?.items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0', borderBottom: '1px solid #F0F0F0',
                  }}>
                    <div style={{ flex: 1, marginRight: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{
                          width: 14, height: 14, borderRadius: 3, border: `2px solid ${item.veg ? '#2E7D32' : '#C62828'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: 3, background: item.veg ? '#2E7D32' : '#C62828' }} />
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 600 }}>{item.name}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#999', marginBottom: 4, lineHeight: 1.4 }}>{item.description}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 15, fontWeight: 700 }}>₹{item.price}</span>
                        <span style={{ fontSize: 11, color: '#999', display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="clock" size={11} color="#999" /> {item.prepTime}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 60, height: 60, borderRadius: 12, background: selectedRestaurant.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                        {item.emoji}
                      </div>
                      {!cart[item.id] ? (
                        <button onClick={() => addToCart(item.id)} style={{
                          padding: '5px 18px', background: '#FFFFFF', border: '1.5px solid #FF6B35',
                          borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#FF6B35', cursor: 'pointer', fontFamily: 'inherit',
                        }}>ADD</button>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: '#FF6B35', borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => removeFromCart(item.id)} style={{ width: 28, height: 28, border: 'none', background: 'transparent', color: '#FFF', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>-</button>
                          <span style={{ width: 22, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#FFF' }}>{cart[item.id]}</span>
                          <button onClick={() => addToCart(item.id)} style={{ width: 28, height: 28, border: 'none', background: 'transparent', color: '#FFF', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Bar */}
              {cartItemCount > 0 && (
                <div style={{
                  position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '100%', maxWidth: 430, padding: '12px 20px', background: '#FF6B35',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  zIndex: 50, boxSizing: 'border-box',
                }}>
                  <div style={{ color: '#FFF' }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{cartItemCount} item{cartItemCount > 1 ? 's' : ''}</span>
                    <span style={{ fontSize: 13, opacity: 0.85, marginLeft: 6 }}>· ₹{cartTotal}</span>
                  </div>
                  <button onClick={goCheckout} style={{
                    padding: '8px 20px', background: '#FFFFFF', color: '#FF6B35', border: 'none',
                    borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <Icon name="cart" color="#FF6B35" size={16} /> Checkout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ─── CHECKOUT SCREEN ─── */}
          {screen === 'checkout' && selectedRestaurant && (
            <div style={{ paddingBottom: 20 }}>
              {/* Header */}
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #F0F0F0' }}>
                <button onClick={() => setScreen('restaurant')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <Icon name="chevronLeft" color="#1A1A1A" />
                </button>
                <span style={{ fontSize: 18, fontWeight: 700 }}>Checkout</span>
              </div>

              {/* Order Summary */}
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Order Summary</div>
                <div style={{ background: '#FFFFFF', borderRadius: 14, padding: 16, border: '1px solid #F0F0F0' }}>
                  {selectedRestaurant.categories.map(cat =>
                    cat.items.filter(item => cart[item.id]).map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F0F0F0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            width: 10, height: 10, borderRadius: 2, border: `1.5px solid ${item.veg ? '#2E7D32' : '#C62828'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <span style={{ width: 5, height: 5, borderRadius: 2.5, background: item.veg ? '#2E7D32' : '#C62828' }} />
                          </span>
                          <span style={{ fontSize: 14 }}>{item.name}</span>
                          <span style={{ fontSize: 12, color: '#999' }}>x{cart[item.id]}</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>₹{item.price * cart[item.id]}</span>
                      </div>
                    ))
                  )}

                  <div style={{ marginTop: 12, paddingTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', marginBottom: 6 }}>
                      <span>Subtotal</span><span>₹{subtotal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', marginBottom: 6 }}>
                      <span>GST (5%)</span><span>₹{gst}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', marginBottom: 10 }}>
                      <span>Platform Fee</span><span>₹{platformFee}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, borderTop: '1.5px solid #F0F0F0', paddingTop: 10 }}>
                      <span>Grand Total</span><span>₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrival Mode */}
              <div style={{ padding: '0 20px 16px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Arrival Mode</div>
                <div style={{ display: 'flex', background: '#F0F0F0', borderRadius: 12, padding: 3 }}>
                  <button onClick={() => setArrivalMode('track')} style={{
                    flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                    background: arrivalMode === 'track' ? '#FFFFFF' : 'transparent',
                    color: arrivalMode === 'track' ? '#FF6B35' : '#666',
                    boxShadow: arrivalMode === 'track' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  }}>Track my ETA</button>
                  <button onClick={() => setArrivalMode('arrive')} style={{
                    flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                    background: arrivalMode === 'arrive' ? '#FFFFFF' : 'transparent',
                    color: arrivalMode === 'arrive' ? '#FF6B35' : '#666',
                    boxShadow: arrivalMode === 'arrive' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  }}>Arrive at...</button>
                </div>
                {arrivalMode === 'arrive' && (
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, color: '#666' }}>Arrival time:</span>
                    <input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} style={{
                      padding: '8px 12px', borderRadius: 10, border: '1.5px solid #F0F0F0',
                      fontSize: 14, fontWeight: 600, fontFamily: 'inherit', color: '#1A1A1A',
                    }} />
                  </div>
                )}
                <div style={{ marginTop: 10, background: '#FFF0EB', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="info" color="#FF6B35" size={15} />
                  <span style={{ fontSize: 12, color: '#666' }}>
                    {arrivalMode === 'track' ? 'The kitchen will start cooking based on your live ETA.' : `Food will be ready at ${arrivalTime}. Arrive on time for the best experience!`}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Payment Method</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['UPI', 'Card', 'Cash', 'Wallet'].map(m => (
                    <button key={m} onClick={() => setPaymentMethod(m)} style={{
                      padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
                      fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                      background: paymentMethod === m ? '#FF6B35' : '#FFFFFF',
                      color: paymentMethod === m ? '#FFFFFF' : '#666',
                      boxShadow: paymentMethod === m ? '0 2px 8px rgba(255,107,53,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
                    }}>{m}</button>
                  ))}
                </div>
              </div>

              {/* Pay Button */}
              <div style={{ padding: '0 20px' }}>
                <button onClick={placeOrder} style={{
                  width: '100%', padding: '16px 0', background: '#FF6B35', color: '#FFFFFF',
                  border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 16px rgba(255,107,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  Pay ₹{grandTotal}
                  <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>rzp</span>
                </button>
              </div>
            </div>
          )}

          {/* ─── TRACKING SCREEN ─── */}
          {screen === 'tracking' && (
            <div style={{ paddingBottom: 20 }}>
              {/* Header */}
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: 5, background: '#FF6B35',
                    boxShadow: '0 0 0 3px rgba(255,107,53,0.2)',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }} />
                  <span style={{ fontSize: 16, fontWeight: 700 }}>Live Tracking</span>
                </div>
              </div>

              {/* Map */}
              <div style={{ padding: '12px 20px' }}>
                <MapView eta={trackingEta} />
              </div>

              {/* ETA Card */}
              <div style={{ padding: '0 20px 16px' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Circular countdown */}
                  <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                    <svg width="64" height="64" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#F0F0F0" strokeWidth="4" />
                      <circle
                        cx="32" cy="32" r="28"
                        fill="none" stroke="#FF6B35" strokeWidth="4"
                        strokeDasharray={`${(trackingEta / 18) * 176} 176`}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: '#FF6B35', lineHeight: 1 }}>{trackingEta}</span>
                      <span style={{ fontSize: 9, color: '#999', fontWeight: 600 }}>min</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Estimated Time of Arrival</div>
                    <div style={{ fontSize: 13, color: '#666' }}>{trackingStep < 4 ? 'Your food is being prepared' : 'Your food is served!'}</div>
                  </div>
                </div>
              </div>

              {/* Status Stepper */}
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: '1px solid #F0F0F0' }}>
                  {trackingSteps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < trackingSteps.length - 1 ? 0 : 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 12,
                          background: i <= trackingStep ? '#FF6B35' : '#F0F0F0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'background 0.3s',
                        }}>
                          {i <= trackingStep && <Icon name="check" size={14} color="#FFF" />}
                        </div>
                        {i < trackingSteps.length - 1 && (
                          <div style={{ width: 2, height: 28, background: i < trackingStep ? '#FF6B35' : '#F0F0F0', transition: 'background 0.3s' }} />
                        )}
                      </div>
                      <div style={{ paddingTop: 2, paddingBottom: i < trackingSteps.length - 1 ? 12 : 0 }}>
                        <div style={{
                          fontSize: 14, fontWeight: i <= trackingStep ? 600 : 400,
                          color: i <= trackingStep ? '#1A1A1A' : '#999',
                        }}>{step}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Done button */}
              {trackingStep >= 4 && (
                <div style={{ padding: '0 20px' }}>
                  <button onClick={goHome} style={{
                    width: '100%', padding: '16px 0', background: '#2E7D32', color: '#FFFFFF',
                    border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 4px 16px rgba(46,125,50,0.3)',
                  }}>Done — Back to Home</button>
                </div>
              )}
            </div>
          )}

          {/* ─── BOTTOM NAV ─── */}
          {showBottomNav && (
            <div style={{
              position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '100%', maxWidth: 430, background: '#FFFFFF',
              borderTop: '1px solid #F0F0F0', display: 'flex', zIndex: 100,
              boxSizing: 'border-box',
            }}>
              {([
                { key: 'home' as const, icon: 'home', label: 'Home' },
                { key: 'orders' as const, icon: 'orders', label: 'Orders' },
                { key: 'profile' as const, icon: 'profile', label: 'Profile' },
              ]).map(tab => (
                <button key={tab.key} onClick={() => { setNav(tab.key); setScreen('home'); }} style={{
                  flex: 1, padding: '10px 0 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: nav === tab.key ? '#FF6B35' : '#999',
                }}>
                  <Icon name={tab.icon} color={nav === tab.key ? '#FF6B35' : '#999'} />
                  <span style={{ fontSize: 11, fontWeight: nav === tab.key ? 700 : 500, fontFamily: 'inherit' }}>{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
