'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faChevronLeft, 
  faChevronRight,
  faStar,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

export interface Attraction {
  id: number;
  title: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  badge?: string;
}

interface AttractionCardProps {
  attraction: Attraction;
  className?: string;
}

const AttractionCardComp: React.FC<AttractionCardProps> = ({ 
  attraction,
  className = ''
}) => {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(attraction.id)) {
        newSet.delete(attraction.id);
      } else {
        newSet.add(attraction.id);
      }
      return newSet;
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % attraction.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + attraction.images.length) % attraction.images.length);
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString('id-ID')}`;
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const isWishlisted = wishlist.has(attraction.id);
  const hasDiscount = attraction.originalPrice && attraction.originalPrice > attraction.price;
  const discountPercent = hasDiscount 
    ? calculateDiscount(attraction.originalPrice!, attraction.price) 
    : 0;

  return (
    <Link
      href="/comingsoon"
      className={`group/card cursor-pointer ${className}`}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        
        {/* Image Section */}
        <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden flex-shrink-0">
          
          {/* Images */}
          {attraction.images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`${attraction.title} - Image ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            />
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Top Section - Discount Badge & Wishlist */}
          <div className="absolute top-0 left-0 right-0 p-3 sm:p-3.5 flex items-start justify-between z-10">
            
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="bg-red-500 text-white px-2.5 py-1.5 rounded-lg shadow-lg">
                <span className="text-xs font-bold">-{discountPercent}%</span>
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className={`ml-auto w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 ${
                isWishlisted 
                  ? 'bg-red-500 scale-110' 
                  : 'bg-white hover:scale-110'
              }`}
              aria-label="Add to wishlist"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-all duration-300 ${
                  isWishlisted ? 'text-white' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Image Navigation */}
          {attraction.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/95 hover:bg-white rounded-full shadow-md opacity-0 group-hover/card:opacity-100 hover:scale-110 transition-all duration-300"
                aria-label="Previous image"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/95 hover:bg-white rounded-full shadow-md opacity-0 group-hover/card:opacity-100 hover:scale-110 transition-all duration-300"
                aria-label="Next image"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {attraction.images.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
              {attraction.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 shadow-sm ${
                    idx === currentImageIndex
                      ? 'w-7 sm:w-8 bg-white'
                      : 'w-1.5 sm:w-2 bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          
          {/* Location */}
          <div className="flex items-center gap-1.5 mb-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium truncate">
              {attraction.city}, {attraction.country}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-gray-900 font-semibold text-sm sm:text-base mb-3 leading-snug line-clamp-2">
            {attraction.title}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-auto">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-[#f68712]" />
              <span className="font-bold text-gray-900 text-sm">
                {attraction.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({formatReviewCount(attraction.reviewCount)} reviews)
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 font-medium">from</span>
              
              {hasDiscount ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-bold text-[#06336e]">
                    {formatPrice(attraction.price, attraction.currency)}
                  </span>
                  <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
                    {formatPrice(attraction.originalPrice!, attraction.currency)}
                  </span>
                </div>
              ) : (
                <span className="text-xl sm:text-2xl font-bold text-[#06336e]">
                  {formatPrice(attraction.price, attraction.currency)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AttractionCardComp;