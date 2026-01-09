'use client';

import { useRef } from 'react';
import AttractionCardComp from '@/components/AttractionCardComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function BestDealsView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const attractions = [
    {
      id: 1,
      title: 'Grand Canyon West, Hoover Dam Stop and Optional Lunch and Skywalk',
      city: 'Las Vegas',
      country: 'Nevada',
      rating: 4.9,
      reviewCount: 18355,
      price: 1690827,
      originalPrice: 2500000,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop',
      ],
    },
    {
      id: 2,
      title: 'Grand Canyon West + Hoover Dam Photo Stop + Optional Skywalk Tour',
      city: 'Las Vegas',
      country: 'Nevada',
      rating: 4.6,
      reviewCount: 4262,
      price: 1878697,
      originalPrice: 2200000,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
      ],
    },
    {
      id: 3,
      title: 'Grand Canyon + Hoover Dam View + WiFi (Skywalk/lunch options)',
      city: 'Las Vegas',
      country: 'Nevada',
      rating: 4.9,
      reviewCount: 4981,
      price: 1690827,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop',
      ],
    },
    {
      id: 4,
      title: 'Award Winning 3-Hour Hoover Dam Small Group Mini Tour from Vegas',
      city: 'Las Vegas',
      country: 'Nevada',
      rating: 4.9,
      reviewCount: 4848,
      price: 1161376,
      originalPrice: 1500000,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop',
      ],
    },
    {
      id: 5,
      title: 'Helicopter Tour Over Las Vegas Strip with Optional VIP Transportation',
      city: 'Las Vegas',
      country: 'Nevada',
      rating: 4.8,
      reviewCount: 3542,
      price: 2450000,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
      ],
    },
    {
      id: 6,
      title: 'Eiffel Tower Skip-the-Line Summit or Second Floor Access',
      city: 'Paris',
      country: 'France',
      rating: 4.8,
      reviewCount: 25643,
      price: 850000,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
      ],
    },
    {
      id: 7,
      title: 'Rome Colosseum Underground and Ancient Rome Small Group Tour',
      city: 'Rome',
      country: 'Italy',
      rating: 4.9,
      reviewCount: 18234,
      price: 1200000,
      originalPrice: 1500000,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
      ],
    },
    {
      id: 8,
      title: 'London Eye Fast-Track Ticket',
      city: 'London',
      country: 'United Kingdom',
      rating: 4.7,
      reviewCount: 32156,
      price: 750000,
      currency: 'IDR',
      images: [
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
      ],
    }
  ]; // Your data

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-5 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#06336e] mb-3">
            Best Deals
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus 
          </p>
        </div>

        {/* Slider */}
        <div className="relative group">
          
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-[#06336e] hover:text-white transition-all duration-300 border border-gray-200"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-[#06336e] hover:text-white transition-all duration-300 border border-gray-200"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4 sm:gap-5 md:gap-6 pb-4">
              {attractions.map((attraction) => (
                <AttractionCardComp
                  key={attraction.id}
                  attraction={attraction}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px] snap-start"
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}