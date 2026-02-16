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
  { id: 1, name: 'Las Vegas', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2847 },
  { id: 2, name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop', activities: 1965 },
  { id: 3, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2134 },
  { id: 4, name: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop', activities: 3156 },
  { id: 5, name: 'New York City', country: 'United States', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop', activities: 3892 },
  { id: 6, name: 'Washington DC', country: 'United States', image: 'https://images.unsplash.com/photo-1617581629397-a72507c3de9e?w=800&auto=format&fit=crop', activities: 1543 },
  { id: 7, name: 'Cancun', country: 'Mexico', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&auto=format&fit=crop', activities: 987 },
  { id: 8, name: 'Florence', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop', activities: 1234 },
  { id: 9, name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop', activities: 1876 },
  { id: 10, name: 'Oahu', country: 'United States', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop', activities: 765 },
];

const TopDestinationView: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-5 sm:py-7 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — rapi, konsisten dengan section lain */}
        <header className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#193f77] mb-2 sm:mb-3">
            Where to Next?
          </h2>
          <p className="text-[#6C757D] text-sm max-w-xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
          </p>
        </header>

        {/* Destinations — grid desktop, horizontal scroll mobile/tablet */}
        <div className="relative -mx-1 px-1">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory py-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label="Top destinations carousel"
          >
            <div className="flex gap-4 sm:gap-5 md:gap-6 lg:grid lg:grid-cols-5 lg:gap-5 xl:gap-6 min-w-0">
              {destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href="/comingsoon"
                  className="shrink-0 w-[260px] sm:w-[280px] lg:w-auto snap-center snap-always group/card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3892] focus-visible:ring-offset-2 rounded-2xl"
                  aria-label={`Explore ${destination.name}, ${destination.country}`}
                >
                  <article className="relative h-56 sm:h-64 lg:h-60 xl:h-64 rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={destination.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                      sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                      <h3 className="text-white font-bold text-xl sm:text-2xl mb-1 drop-shadow-md">
                        {destination.name}
                      </h3>
                      <p className="flex items-center gap-1.5 text-white/95 text-xs sm:text-sm font-medium drop-shadow mb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 shrink-0" aria-hidden />
                        {destination.country}
                      </p>
                      <p className="text-white/90 text-xs sm:text-sm font-medium drop-shadow">
                        {destination.activities.toLocaleString()}+ things to do
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA — rapi, konsisten spacing */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#2C3892] text-white font-semibold rounded-xl hover:bg-[#1e2870] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F68712] focus-visible:ring-offset-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            View All Destinations
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TopDestinationView;