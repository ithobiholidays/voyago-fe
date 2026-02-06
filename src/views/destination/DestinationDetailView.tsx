// src/views/destination/DestinationDetailView.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faMapMarkerAlt,
  faUsers,
  faStar,
  faChartLine,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import BannerComponent from '@/components/BannerComponent';
import NavigationComponent from '@/components/NavigationComponent';
import FooterComponent from '@/components/FooterComponent';
import DestinationCard from '@/components/DestinationCardComp';

// ============================================================================
// TYPES
// ============================================================================
type ProductType = 'attraction' | 'experience' | 'tour';

interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration?: string;
  features?: string[];
}

// ============================================================================
// DUMMY DATA
// ============================================================================
const DESTINATION_INFO = {
  name: 'Kuala Lumpur',
  country: 'Malaysia',
  description: 'Discover the vibrant capital of Malaysia, where modern skyscrapers meet historic temples and bustling street markets. Experience the iconic Petronas Towers, explore cultural neighborhoods, and indulge in world-class cuisine.',
  totalProducts: 156,
  attractionCount: 48,
  experienceCount: 52,
  tourCount: 56,
};

const DUMMY_PRODUCTS: Product[] = [
  // ATTRACTIONS (8 items - 2 pages)
  {
    id: 'att-1',
    name: 'Petronas Twin Towers Skybridge & Observation Deck Ticket',
    slug: 'petronas-twin-towers-ticket',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&h=350&fit=crop',
    price: 185000,
    originalPrice: 230000,
    rating: 4.8,
    reviewCount: 12453,
    duration: '1-2 hours',
    features: ['Skip the line', 'Instant confirmation'],
  },
  {
    id: 'att-2',
    name: 'Batu Caves & Cultural Temple Tour',
    slug: 'batu-caves-temple-tour',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=500&h=350&fit=crop',
    price: 95000,
    rating: 4.6,
    reviewCount: 8923,
    duration: '3-4 hours',
    features: ['Hotel pickup', 'Guide included'],
  },
  {
    id: 'att-3',
    name: 'KL Tower Observation Deck Admission',
    slug: 'kl-tower-observation-deck',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1508062878650-88b52897f298?w=500&h=350&fit=crop',
    price: 125000,
    originalPrice: 150000,
    rating: 4.5,
    reviewCount: 6784,
    duration: '1-2 hours',
    features: ['Instant confirmation', '360° views'],
  },
  {
    id: 'att-4',
    name: 'Aquaria KLCC Underwater World Ticket',
    slug: 'aquaria-klcc-ticket',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=350&fit=crop',
    price: 145000,
    rating: 4.7,
    reviewCount: 5632,
    duration: '2-3 hours',
    features: ['Family friendly', 'Skip the line'],
  },
  {
    id: 'att-5',
    name: 'Sunway Lagoon Theme Park Admission',
    slug: 'sunway-lagoon-ticket',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=500&h=350&fit=crop',
    price: 215000,
    originalPrice: 280000,
    rating: 4.7,
    reviewCount: 9845,
    duration: 'Full day',
    features: ['All rides', 'Water park access'],
  },
  {
    id: 'att-6',
    name: 'Islamic Arts Museum Malaysia Entry',
    slug: 'islamic-arts-museum',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=500&h=350&fit=crop',
    price: 65000,
    rating: 4.4,
    reviewCount: 3421,
    duration: '2-3 hours',
    features: ['Audio guide', 'Skip the line'],
  },
  {
    id: 'att-7',
    name: 'KL Bird Park Admission Ticket',
    slug: 'kl-bird-park',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=350&fit=crop',
    price: 85000,
    rating: 4.5,
    reviewCount: 7234,
    duration: '2-3 hours',
    features: ['Free flying', 'Photo opportunities'],
  },
  {
    id: 'att-8',
    name: 'National Museum of Malaysia Entry',
    slug: 'national-museum',
    type: 'attraction',
    image: 'https://images.unsplash.com/photo-1566127444323-d97e7d6ddcb3?w=500&h=350&fit=crop',
    price: 45000,
    rating: 4.3,
    reviewCount: 2987,
    duration: '1-2 hours',
    features: ['Historical exhibits', 'Guided tour available'],
  },

  // EXPERIENCES (8 items - 2 pages)
  {
    id: 'exp-1',
    name: 'KL Night Market Food Tour with Local Guide',
    slug: 'kl-night-market-food-tour',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=350&fit=crop',
    price: 275000,
    rating: 4.9,
    reviewCount: 4521,
    duration: '3 hours',
    features: ['10+ tastings', 'Local guide', 'Small group'],
  },
  {
    id: 'exp-2',
    name: 'Traditional Batik Painting Workshop',
    slug: 'batik-painting-workshop',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=350&fit=crop',
    price: 195000,
    rating: 4.7,
    reviewCount: 1853,
    duration: '2 hours',
    features: ['All materials', 'Take home artwork'],
  },
  {
    id: 'exp-3',
    name: 'Malaysian Cooking Class Experience',
    slug: 'malaysian-cooking-class',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=350&fit=crop',
    price: 325000,
    rating: 4.8,
    reviewCount: 2943,
    duration: '4 hours',
    features: ['Market visit', 'Recipe book', 'Lunch included'],
  },
  {
    id: 'exp-4',
    name: 'Firefly Watching Night Tour at Kuala Selangor',
    slug: 'firefly-watching-tour',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=350&fit=crop',
    price: 245000,
    rating: 4.6,
    reviewCount: 3127,
    duration: '5 hours',
    features: ['Boat ride', 'Dinner', 'Hotel pickup'],
  },
  {
    id: 'exp-5',
    name: 'Skytrex Adventure Park Tree Top Challenge',
    slug: 'skytrex-adventure',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=350&fit=crop',
    price: 285000,
    originalPrice: 340000,
    rating: 4.8,
    reviewCount: 6234,
    duration: '3-4 hours',
    features: ['Safety equipment', 'Multiple courses', 'Adventure guide'],
  },
  {
    id: 'exp-6',
    name: 'Traditional Malaysian Spa & Massage',
    slug: 'traditional-spa-massage',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=350&fit=crop',
    price: 425000,
    rating: 4.9,
    reviewCount: 8765,
    duration: '2 hours',
    features: ['Aromatherapy', 'Traditional techniques', 'Relaxation'],
  },
  {
    id: 'exp-7',
    name: 'KL Street Art Walking Tour',
    slug: 'street-art-tour',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=500&h=350&fit=crop',
    price: 165000,
    rating: 4.6,
    reviewCount: 2143,
    duration: '3 hours',
    features: ['Local artist guide', 'Photo spots', 'Cultural insights'],
  },
  {
    id: 'exp-8',
    name: 'Pewter Workshop at Royal Selangor',
    slug: 'pewter-workshop',
    type: 'experience',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=350&fit=crop',
    price: 235000,
    rating: 4.7,
    reviewCount: 3456,
    duration: '2 hours',
    features: ['Hands-on crafting', 'Take home creation', 'Factory tour'],
  },

  // TOURS (8 items - 2 pages)
  {
    id: 'tour-1',
    name: 'Kuala Lumpur City Highlights Full Day Tour',
    slug: 'kl-city-highlights-tour',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1508062878650-88b52897f298?w=500&h=350&fit=crop',
    price: 385000,
    rating: 4.7,
    reviewCount: 7654,
    duration: '8 hours',
    features: ['Hotel pickup', 'Lunch included', 'Guide'],
  },
  {
    id: 'tour-2',
    name: 'Melaka Historic City Day Trip from KL',
    slug: 'melaka-day-trip',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=500&h=350&fit=crop',
    price: 425000,
    originalPrice: 510000,
    rating: 4.8,
    reviewCount: 5834,
    duration: '10 hours',
    features: ['UNESCO site', 'Lunch', 'Air-conditioned van'],
  },
  {
    id: 'tour-3',
    name: 'Genting Highlands & Batu Caves Day Tour',
    slug: 'genting-highlands-tour',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop',
    price: 365000,
    rating: 4.5,
    reviewCount: 4231,
    duration: '9 hours',
    features: ['Cable car', 'Hotel pickup', 'Theme park time'],
  },
  {
    id: 'tour-4',
    name: 'Cameron Highlands Tea Plantation Private Tour',
    slug: 'cameron-highlands-tour',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=500&h=350&fit=crop',
    price: 895000,
    originalPrice: 1050000,
    rating: 4.9,
    reviewCount: 2156,
    duration: '12 hours',
    features: ['Private tour', 'Tea tasting', 'Strawberry farm'],
  },
  {
    id: 'tour-5',
    name: 'Putrajaya & Agricultural Park Half Day Tour',
    slug: 'putrajaya-tour',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=500&h=350&fit=crop',
    price: 285000,
    rating: 4.6,
    reviewCount: 3876,
    duration: '5 hours',
    features: ['Pink Mosque', 'Boat cruise', 'Photo stops'],
  },
  {
    id: 'tour-6',
    name: 'Ipoh Heritage & Cave Temple Day Trip',
    slug: 'ipoh-heritage-tour',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&h=350&fit=crop',
    price: 475000,
    originalPrice: 560000,
    rating: 4.7,
    reviewCount: 2987,
    duration: '11 hours',
    features: ['Old town walk', 'Cave temples', 'Local food tasting'],
  },
  {
    id: 'tour-7',
    name: 'Taman Negara National Park Adventure Tour',
    slug: 'taman-negara-tour',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop',
    price: 685000,
    rating: 4.8,
    reviewCount: 4512,
    duration: '2 days',
    features: ['Jungle trekking', 'Canopy walk', 'Accommodation'],
  },
  {
    id: 'tour-8',
    name: 'KL by Night Food & Culture Tour',
    slug: 'kl-night-tour',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=350&fit=crop',
    price: 325000,
    rating: 4.9,
    reviewCount: 6789,
    duration: '4 hours',
    features: ['Night markets', 'Street food', 'Cultural sites'],
  },
];

// ============================================================================
// DUMMY DESTINATIONS DATA
// ============================================================================
const RELATED_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
    activities: 2456,
    href: '/destination',
  },
  {
    id: 'dest-2',
    name: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop',
    activities: 3128,
    href: '/destination',
  },
  {
    id: 'dest-3',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    activities: 4567,
    href: '/destination',
  },
  {
    id: 'dest-4',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    activities: 5234,
    href: '/destination',
  },
];

// ============================================================================
// PAGINATION COMPONENT
// ============================================================================
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[36px] h-9 px-3 text-sm rounded-lg font-medium transition-all ${
              currentPage === page
                ? 'bg-[#2C3892] text-white'
                : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
      </button>
    </div>
  );
};

// ============================================================================
// PRODUCT CARD COMPONENT
// ============================================================================
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    // Navigate to product detail
    console.log('Navigate to product:', product.slug);
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlistLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setWishlisted(!wishlisted);
      setIsWishlistLoading(false);
    }, 500);
  };

  const formatPrice = (price: number) => {
    return `IDR ${price.toLocaleString('id-ID')}`;
  };

  // Mock location - in real scenario this would come from product data
  const location = `${DESTINATION_INFO.name}, ${DESTINATION_INFO.country}`;

  return (
    <div
      onClick={handleCardClick}
      className="group w-full max-w-[280px] bg-white rounded-[10px] overflow-hidden border border-[#E4E8ED] shadow-[0_2px_8px_rgba(44,56,146,0.07)] hover:shadow-[0_6px_20px_rgba(44,56,146,0.18)] hover:-translate-y-[3px] transition-[box-shadow,transform] duration-250 cursor-pointer flex flex-col"
    >
      {/* ── IMAGE ── */}
      <div className="relative w-full h-[160px] overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-350"
        />

        {/* gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[rgba(44,56,146,0.5)] to-transparent pointer-events-none" />

        {/* Location pin */}
        <span className="absolute bottom-[9px] left-[10px] z-[2] text-white text-[11px] font-semibold flex items-center gap-[5px] drop-shadow-md">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-[10px] h-[12px] shrink-0" />
          {location}
        </span>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 z-[2] bg-[#E8333A] text-white text-[11px] font-bold px-[7px] py-[3px] rounded">
            -{discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className={`absolute top-2 right-2 z-[2] w-[32px] h-[32px] rounded-full bg-white/90 border-0 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.14)] transition-transform duration-200 ${
            wishlisted ? 'scale-110' : 'hover:scale-105'
          } ${isWishlistLoading ? 'opacity-50 cursor-wait' : ''}`}
        >
          <FontAwesomeIcon
            icon={wishlisted ? faHeartSolid : faHeartRegular}
            className="w-[16px] h-[16px]"
            style={{ color: wishlisted ? '#E8333A' : '#6B7A8D' }}
          />
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 p-[12px_13px_14px]">
        {/* 1. Title */}
        <h3
          className="m-0 text-[13.5px] font-semibold text-[#1E2A4A] line-clamp-2 shrink-0"
          style={{ lineHeight: '1.4', height: `${13.5 * 1.4 * 2}px` }}
        >
          {product.name}
        </h3>

        {/* 2. Rating */}
        <div className="flex items-center gap-[5px] shrink-0 mt-[8px]">
          <FontAwesomeIcon icon={faStar} className="w-[14px] h-[14px] shrink-0" style={{ color: '#F68712' }} />
          <span className="text-[12.5px] font-bold text-[#1E2A4A]">{product.rating}</span>
          <span className="text-[12px] text-[#6B7A8D]">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* 3. Booked */}
        <div className="flex items-center gap-[5px] shrink-0 mt-[4px] h-[18px]">
          <FontAwesomeIcon icon={faUsers} className="w-[12px] h-[12px] shrink-0" style={{ color: '#F68712' }} />
          <span className="text-[12px] text-[#6B7A8D]">
            {Math.floor(product.reviewCount * 2.5).toLocaleString()} booked
          </span>
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* 4. Price */}
        <div className="flex items-baseline gap-[7px] shrink-0 mt-3">
          <span className="text-[16px] font-bold text-[#2C3892]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11.5px] text-[#9AA5B4] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================
export default function DestinationDetailView() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | ProductType>('all');
  const [attractionPage, setAttractionPage] = useState(1);
  const [experiencePage, setExperiencePage] = useState(1);
  const [tourPage, setTourPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  // Filter products by search and type
  const filteredProducts = useMemo(() => {
    let products = DUMMY_PRODUCTS;

    // Filter by search query
    if (searchQuery.trim()) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by active tab
    if (activeTab !== 'all') {
      products = products.filter((p) => p.type === activeTab);
    }

    return products;
  }, [searchQuery, activeTab]);

  // Separate products by type
  const attractions = filteredProducts.filter((p) => p.type === 'attraction');
  const experiences = filteredProducts.filter((p) => p.type === 'experience');
  const tours = filteredProducts.filter((p) => p.type === 'tour');

  // Pagination calculations
  const attractionTotalPages = Math.ceil(attractions.length / ITEMS_PER_PAGE);
  const experienceTotalPages = Math.ceil(experiences.length / ITEMS_PER_PAGE);
  const tourTotalPages = Math.ceil(tours.length / ITEMS_PER_PAGE);

  const paginatedAttractions = attractions.slice(
    (attractionPage - 1) * ITEMS_PER_PAGE,
    attractionPage * ITEMS_PER_PAGE
  );
  const paginatedExperiences = experiences.slice(
    (experiencePage - 1) * ITEMS_PER_PAGE,
    experiencePage * ITEMS_PER_PAGE
  );
  const paginatedTours = tours.slice(
    (tourPage - 1) * ITEMS_PER_PAGE,
    tourPage * ITEMS_PER_PAGE
  );

  // Tab options
  const tabs = [
    { id: 'all', label: 'All', count: filteredProducts.length },
    { id: 'attraction', label: 'Attractions', count: attractions.length },
    { id: 'experience', label: 'Experiences', count: experiences.length },
    { id: 'tour', label: 'Tours', count: tours.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Banner */}
      <BannerComponent
        backgroundImage="/logo/background.jpg"
        title={DESTINATION_INFO.name}
        description={`${DESTINATION_INFO.country} • ${DESTINATION_INFO.totalProducts} Activities`}
        height="small"
        backgroundSize="cover"
        overlayClassName="bg-gradient-to-b from-black/50 via-black/40 to-black/60"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <a href="/" className="hover:text-[#2C3892] transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/destinations" className="hover:text-[#2C3892] transition-colors">
            Destinations
          </a>
          <span>/</span>
          <span className="text-[#2C3892] font-medium">{DESTINATION_INFO.name}</span>
        </nav>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200/50">
          {/* Search Bar with icon and better styling */}
          <div className="relative mb-5">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C3892]">
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search activities, tours, experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C3892]/20 focus:border-[#2C3892] outline-none transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="text-lg">×</span>
              </button>
            )}
          </div>

          {/* Tabs with better design */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-gray-500 mr-2">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setAttractionPage(1);
                    setExperiencePage(1);
                    setTourPage(1);
                  }}
                  className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#2C3892] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>



        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="w-16 h-16 bg-[#2C3892]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faSearch} className="w-8 h-8 text-[#2C3892]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3892] mb-2">No activities found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-6 py-2 bg-[#2C3892] text-white rounded-lg hover:bg-[#1E2A4A] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Attractions Section */}
        {(activeTab === 'all' || activeTab === 'attraction') && attractions.length > 0 && (
          <section className="relative">
            {/* Decorative background */}
            <div className="absolute -top-4 right-0 w-96 h-96 bg-gradient-to-br from-[#2C3892]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-1.5 bg-[#2C3892] rounded-full" />
                  <div>
                    <h2 className="text-2xl font-bold text-[#2C3892] flex items-center gap-2">
                      Attractions
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Explore iconic landmarks and must-see sights</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {paginatedAttractions.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {attractionTotalPages > 1 && (
                <Pagination
                  currentPage={attractionPage}
                  totalPages={attractionTotalPages}
                  onPageChange={setAttractionPage}
                />
              )}
            </div>
          </section>
        )}

        {/* Experiences Section */}
        {(activeTab === 'all' || activeTab === 'experience') && experiences.length > 0 && (
          <section className="relative">
            {/* Decorative background */}
            <div className="absolute -top-4 left-0 w-96 h-96 bg-gradient-to-br from-[#F68712]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-1.5 bg-[#2C3892] rounded-full" />
                  <div>
                    <h2 className="text-2xl font-bold text-[#2C3892] flex items-center gap-2">
                      Experiences
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Immersive activities and local adventures</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {paginatedExperiences.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {experienceTotalPages > 1 && (
                <Pagination
                  currentPage={experiencePage}
                  totalPages={experienceTotalPages}
                  onPageChange={setExperiencePage}
                />
              )}
            </div>
          </section>
        )}

        {/* Tours Section */}
        {(activeTab === 'all' || activeTab === 'tour') && tours.length > 0 && (
          <section className="relative">
            {/* Decorative background */}
            <div className="absolute -top-4 right-0 w-96 h-96 bg-gradient-to-br from-[#2C3892]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-1.5 bg-[#2C3892] rounded-full" />
                  <div>
                    <h2 className="text-2xl font-bold text-[#2C3892] flex items-center gap-2">
                      Tours
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Guided tours and multi-day adventures</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {paginatedTours.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {tourTotalPages > 1 && (
                <Pagination
                  currentPage={tourPage}
                  totalPages={tourTotalPages}
                  onPageChange={setTourPage}
                />
              )}
            </div>
          </section>
        )}
      </div>

      {/* Explore More Destinations Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Decorative elements */}

        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C3892] rounded-full shadow-md mb-4">
              <span className="text-lg">✈️</span>
              <span className="text-xs font-semibold text-white">DISCOVER MORE</span>
            </div>
            <h2 className="text-3xl font-bold text-[#2C3892] mb-3">
              Explore More Destinations
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Discover amazing places around the world with thousands of unique activities and unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_DESTINATIONS.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                height="h-64"
                rounded="rounded-2xl"
                shadow="shadow-xl hover:shadow-2xl"
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <a
              href="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C3892] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Destinations
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}