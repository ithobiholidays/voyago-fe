'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  activities: number;
}

const destinations: Destination[] = [
  { 
    id: 1, 
    name: 'Las Vegas', 
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
    activities: 2847
  },
  { 
    id: 2, 
    name: 'Rome', 
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
    activities: 1965
  },
  { 
    id: 3, 
    name: 'Paris', 
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
    activities: 2134
  },
  { 
    id: 4, 
    name: 'London', 
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
    activities: 3156
  },
  { 
    id: 5, 
    name: 'New York City', 
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
    activities: 3892
  },
  { 
    id: 6, 
    name: 'Washington DC', 
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1617581629397-a72507c3de9e?w=800&auto=format&fit=crop',
    activities: 1543
  },
  { 
    id: 7, 
    name: 'Cancun', 
    country: 'Mexico',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&auto=format&fit=crop',
    activities: 987
  },
  { 
    id: 8, 
    name: 'Florence', 
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
    activities: 1234
  },
  { 
    id: 9, 
    name: 'Barcelona', 
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
    activities: 1876
  },
  { 
    id: 10, 
    name: 'Oahu', 
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop',
    activities: 765
  },
];

const TopDestinationView: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-5 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#06336e] mb-4">
            Where next to?
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Discover the most popular destinations around the world
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex lg:grid lg:grid-cols-5 gap-5 md:gap-6 pb-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href="/comingsoon"
                  className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-auto snap-start group/card"
                >
                  <div className="relative h-64 sm:h-72 lg:h-64 xl:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">

                    {/* Image */}
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 20vw"
                    />

                    {/* Clean Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                      
                      {/* City Name */}
                      <h3 className="text-white font-bold text-2xl sm:text-3xl mb-2 drop-shadow-lg">
                        {destination.name}
                      </h3>

                      {/* Country */}
                      <div className="flex items-center gap-2 mb-3">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3.5 h-3.5 text-white/90" />
                        <span className="text-white/95 text-sm font-medium drop-shadow">
                          {destination.country}
                        </span>
                      </div>

                      {/* Activities Count */}
                      <div className="text-white/90 text-sm font-medium drop-shadow">
                        {destination.activities.toLocaleString()}+ things to do
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#06336e] text-white font-semibold rounded-xl hover:bg-[#04274d] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>View All Destinations</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopDestinationView;