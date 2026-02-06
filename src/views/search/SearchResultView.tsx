// src/views/search/SearchResultsView.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faMapMarkerAlt,
  faUsers,
  faStar,
  faSliders,
  faTimes,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faMap,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import NavigationComponent from '@/components/NavigationComponent';
import FooterComponent from '@/components/FooterComponent';

// ============================================================================
// TYPES
// ============================================================================
type ProductType = 'attraction' | 'experience' | 'tour';
type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'popular';

interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  destination: string;
  country: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration?: string;
  features?: string[];
}

interface FilterState {
  types: ProductType[];
  priceRange: [number, number];
  rating: number;
  destinations: string[];
}

// ============================================================================
// DUMMY DATA
// ============================================================================
const ALL_PRODUCTS: Product[] = [
  // Kuala Lumpur
  {
    id: 'kl-1',
    name: 'Petronas Twin Towers Skybridge & Observation Deck',
    slug: 'petronas-towers',
    type: 'attraction',
    destination: 'Kuala Lumpur',
    country: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&h=350&fit=crop',
    price: 185000,
    originalPrice: 230000,
    rating: 4.8,
    reviewCount: 12453,
    duration: '2 hours',
  },
  {
    id: 'kl-2',
    name: 'Batu Caves Cultural Temple Tour',
    slug: 'batu-caves',
    type: 'attraction',
    destination: 'Kuala Lumpur',
    country: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=500&h=350&fit=crop',
    price: 95000,
    rating: 4.6,
    reviewCount: 8923,
  },
  {
    id: 'kl-3',
    name: 'KL Night Food Tour',
    slug: 'kl-food-tour',
    type: 'experience',
    destination: 'Kuala Lumpur',
    country: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=350&fit=crop',
    price: 275000,
    rating: 4.9,
    reviewCount: 4521,
    duration: '3 hours',
  },
  {
    id: 'kl-4',
    name: 'City Highlights Full Day Tour',
    slug: 'kl-city-tour',
    type: 'tour',
    destination: 'Kuala Lumpur',
    country: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1508062878650-88b52897f298?w=500&h=350&fit=crop',
    price: 385000,
    rating: 4.7,
    reviewCount: 7654,
    duration: '8 hours',
  },
  // Singapore
  {
    id: 'sg-1',
    name: 'Gardens by the Bay Entry Ticket',
    slug: 'gardens-by-bay',
    type: 'attraction',
    destination: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&h=350&fit=crop',
    price: 195000,
    originalPrice: 245000,
    rating: 4.7,
    reviewCount: 15678,
  },
  {
    id: 'sg-2',
    name: 'Singapore River Cruise',
    slug: 'river-cruise',
    type: 'tour',
    destination: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=500&h=350&fit=crop',
    price: 165000,
    rating: 4.5,
    reviewCount: 9234,
  },
  // Bali
  {
    id: 'bali-1',
    name: 'Uluwatu Temple Sunset & Kecak Dance',
    slug: 'uluwatu-temple',
    type: 'attraction',
    destination: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=350&fit=crop',
    price: 165000,
    rating: 4.8,
    reviewCount: 15632,
    duration: '4 hours',
  },
  {
    id: 'bali-2',
    name: 'Bali Rice Terrace & Waterfall Tour',
    slug: 'rice-terrace-tour',
    type: 'tour',
    destination: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1555400082-2d558ad142bf?w=500&h=350&fit=crop',
    price: 425000,
    originalPrice: 510000,
    rating: 4.9,
    reviewCount: 8765,
    duration: '10 hours',
  },
  {
    id: 'bali-3',
    name: 'Balinese Cooking Class',
    slug: 'cooking-class',
    type: 'experience',
    destination: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=350&fit=crop',
    price: 325000,
    rating: 4.8,
    reviewCount: 2943,
    duration: '4 hours',
  },
  // Bangkok
  {
    id: 'bkk-1',
    name: 'Grand Palace & Wat Phra Kaew Entry',
    slug: 'grand-palace',
    type: 'attraction',
    destination: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&h=350&fit=crop',
    price: 145000,
    rating: 4.6,
    reviewCount: 18234,
  },
  {
    id: 'bkk-2',
    name: 'Bangkok Street Food Night Tour',
    slug: 'bangkok-food-tour',
    type: 'experience',
    destination: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1559329007-40e78c46910d?w=500&h=350&fit=crop',
    price: 235000,
    rating: 4.9,
    reviewCount: 7234,
    duration: '3 hours',
  },
  {
    id: 'bkk-3',
    name: 'Floating Market & River Tour',
    slug: 'floating-market',
    type: 'tour',
    destination: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1552550049-db097c9480d1?w=500&h=350&fit=crop',
    price: 295000,
    rating: 4.7,
    reviewCount: 5432,
    duration: '6 hours',
  },
];

const AVAILABLE_DESTINATIONS = Array.from(new Set(ALL_PRODUCTS.map(p => p.destination)));

// ============================================================================
// PRODUCT CARD
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

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlistLoading(true);
    setTimeout(() => {
      setWishlisted(!wishlisted);
      setIsWishlistLoading(false);
    }, 500);
  };

  const formatPrice = (price: number) => `IDR ${price.toLocaleString('id-ID')}`;
  const location = `${product.destination}, ${product.country}`;

  return (
    <div className="group w-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col">
      {/* Image */}
      <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[rgba(44,56,146,0.5)] to-transparent" />
        
        <span className="absolute bottom-2 left-2 text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1 drop-shadow-md">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {location}
        </span>

        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#E8333A] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            -{discount}%
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <FontAwesomeIcon
            icon={wishlisted ? faHeartSolid : faHeartRegular}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            style={{ color: wishlisted ? '#E8333A' : '#6B7A8D' }}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <span className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded self-start mb-2 ${
          product.type === 'attraction' ? 'bg-blue-100 text-blue-700' :
          product.type === 'experience' ? 'bg-purple-100 text-purple-700' :
          'bg-green-100 text-green-700'
        }`}>
          {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
        </span>

        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 mb-2 sm:mb-3 min-h-[36px] sm:min-h-[40px]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
          <FontAwesomeIcon icon={faStar} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F68712]" />
          <span className="text-xs sm:text-sm font-bold text-gray-900">{product.rating}</span>
          <span className="text-[10px] sm:text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <FontAwesomeIcon icon={faUsers} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F68712]" />
          <span className="text-[10px] sm:text-xs text-gray-600">
            {Math.floor(product.reviewCount * 2.5).toLocaleString()} booked
          </span>
        </div>

        <div className="flex-1" />

        <div className="flex items-baseline gap-2 pt-2 sm:pt-3 border-t border-gray-100">
          <span className="text-sm sm:text-base font-bold text-[#2C3892]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MOBILE FILTER MODAL
// ============================================================================
interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  activeFiltersCount: number;
  clearAllFilters: () => void;
  toggleTypeFilter: (type: ProductType) => void;
  toggleDestinationFilter: (dest: string) => void;
}

const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  activeFiltersCount,
  clearAllFilters,
  toggleTypeFilter,
  toggleDestinationFilter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <FontAwesomeIcon icon={faSliders} className="w-4 h-4 text-[#2C3892]" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-[#2C3892] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          {/* Activity Type */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Activity Type</h4>
            {(['attraction', 'experience', 'tour'] as ProductType[]).map(type => (
              <label key={type} className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => toggleTypeFilter(type)}
                  className="w-5 h-5 text-[#2C3892] rounded focus:ring-[#2C3892]"
                />
                <span className="text-sm text-gray-700 capitalize">{type}s</span>
              </label>
            ))}
          </div>

          {/* Destinations */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Destinations</h4>
            {AVAILABLE_DESTINATIONS.map(dest => (
              <label key={dest} className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.destinations.includes(dest)}
                  onChange={() => toggleDestinationFilter(dest)}
                  className="w-5 h-5 text-[#2C3892] rounded focus:ring-[#2C3892]"
                />
                <span className="text-sm text-gray-700">{dest}</span>
              </label>
            ))}
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Minimum Rating</h4>
            {[4.5, 4.0, 3.5, 3.0].map(rating => (
              <label key={rating} className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => setFilters(prev => ({ ...prev, rating }))}
                  className="w-5 h-5 text-[#2C3892]"
                />
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#F68712]" />
                  <span className="text-sm text-gray-700">{rating}+</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4 flex gap-3">
          <button
            onClick={() => {
              clearAllFilters();
              onClose();
            }}
            className="flex-1 px-4 py-3 border-2 border-[#2C3892] text-[#2C3892] font-semibold rounded-lg hover:bg-[#2C3892]/5 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-[#2C3892] text-white font-semibold rounded-lg hover:bg-[#1E2A4A] transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SearchResultsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    priceRange: [0, 1000000],
    rating: 0,
    destinations: [],
  });

  const ITEMS_PER_PAGE = 12;

  // Filter and sort products
  const { filteredProducts, totalResults } = useMemo(() => {
    let products = ALL_PRODUCTS;

    // Search filter
    if (searchQuery.trim()) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filters.types.length > 0) {
      products = products.filter(p => filters.types.includes(p.type));
    }

    // Price filter
    products = products.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      products = products.filter(p => p.rating >= filters.rating);
    }

    // Destination filter
    if (filters.destinations.length > 0) {
      products = products.filter(p => filters.destinations.includes(p.destination));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return { filteredProducts: products, totalResults: products.length };
  }, [searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Toggle type filter
  const toggleTypeFilter = (type: ProductType) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
    setCurrentPage(1);
  };

  // Toggle destination filter
  const toggleDestinationFilter = (dest: string) => {
    setFilters(prev => ({
      ...prev,
      destinations: prev.destinations.includes(dest)
        ? prev.destinations.filter(d => d !== dest)
        : [...prev.destinations, dest]
    }));
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      types: [],
      priceRange: [0, 1000000],
      rating: 0,
      destinations: [],
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFiltersCount = 
    filters.types.length + 
    filters.destinations.length + 
    (filters.rating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Search Header */}
      <div className="bg-[#2C3892] py-6 sm:py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Search Results
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
            />
            <input
              type="text"
              placeholder="Search destinations, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 focus:border-white outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          {showFilters && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 sticky top-4">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <FontAwesomeIcon icon={faSliders} className="w-4 h-4 text-[#2C3892]" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-[#2C3892] hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Activity Type */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Activity Type</h4>
                  {(['attraction', 'experience', 'tour'] as ProductType[]).map(type => (
                    <label key={type} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type)}
                        onChange={() => toggleTypeFilter(type)}
                        className="w-4 h-4 text-[#2C3892] rounded focus:ring-[#2C3892]"
                      />
                      <span className="text-sm text-gray-700 capitalize">{type}s</span>
                    </label>
                  ))}
                </div>

                {/* Destinations */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Destinations</h4>
                  {AVAILABLE_DESTINATIONS.map(dest => (
                    <label key={dest} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.destinations.includes(dest)}
                        onChange={() => toggleDestinationFilter(dest)}
                        className="w-4 h-4 text-[#2C3892] rounded focus:ring-[#2C3892]"
                      />
                      <span className="text-sm text-gray-700">{dest}</span>
                    </label>
                  ))}
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Minimum Rating</h4>
                  {[4.5, 4.0, 3.5, 3.0].map(rating => (
                    <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => setFilters(prev => ({ ...prev, rating }))}
                        className="w-4 h-4 text-[#2C3892]"
                      />
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#F68712]" />
                        <span className="text-sm text-gray-700">{rating}+</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm border border-gray-200">
              {/* Mobile: Stacked Layout */}
              <div className="lg:hidden space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-[#2C3892] text-[#2C3892] rounded-lg font-medium transition-colors"
                  >
                    <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
                    <span className="text-sm">Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="bg-[#2C3892] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  <div className="relative flex-1">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full pl-3 pr-8 py-2.5 border-2 border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#2C3892] focus:border-[#2C3892] outline-none appearance-none bg-white cursor-pointer"
                    >
                      <option value="relevance">Most Relevant</option>
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low-High</option>
                      <option value="price-high">Price: High-Low</option>
                    </select>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  <strong className="text-[#2C3892]">{totalResults}</strong> activities found
                </p>
              </div>

              {/* Desktop: Original Layout */}
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {showFilters ? 'Hide' : 'Show'} Filters
                    </span>
                    {activeFiltersCount > 0 && (
                      <span className="bg-[#2C3892] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  <p className="text-sm text-gray-600">
                    <strong className="text-[#2C3892]">{totalResults}</strong> activities found
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2C3892] focus:border-[#2C3892] outline-none appearance-none bg-white cursor-pointer"
                    >
                      <option value="relevance">Most Relevant</option>
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-2 text-sm ${
                        viewMode === 'grid'
                          ? 'bg-[#2C3892] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={faList} className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`px-3 py-2 text-sm border-l border-gray-300 ${
                        viewMode === 'map'
                          ? 'bg-[#2C3892] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={faMap} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {filters.types.map(type => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2C3892]/10 text-[#2C3892] rounded-full text-xs sm:text-sm font-medium"
                  >
                    {type}
                    <button onClick={() => toggleTypeFilter(type)}>
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.destinations.map(dest => (
                  <span
                    key={dest}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2C3892]/10 text-[#2C3892] rounded-full text-xs sm:text-sm font-medium"
                  >
                    {dest}
                    <button onClick={() => toggleDestinationFilter(dest)}>
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.rating > 0 && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2C3892]/10 text-[#2C3892] rounded-full text-xs sm:text-sm font-medium">
                    Rating {filters.rating}+
                    <button onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}>
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm rounded-lg font-medium transition-all ${
                            currentPage === page
                              ? 'bg-[#2C3892] text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-sm border border-gray-200">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#2C3892]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faSearch} className="w-6 h-6 sm:w-8 sm:h-8 text-[#2C3892]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#2C3892] mb-2">No results found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#2C3892] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#1E2A4A] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        setFilters={setFilters}
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
        toggleTypeFilter={toggleTypeFilter}
        toggleDestinationFilter={toggleDestinationFilter}
      />


    </div>
  );
}