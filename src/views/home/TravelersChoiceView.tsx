'use client';

import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faStar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
// ── Hardcoded data (no AttractionCardComponent import) ──
const BEST_DEALS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=280&fit=crop',
    location: 'Bali, Indonesia',
    title: 'Ubud Rice Terrace & Monkey Forest Tour',
    rating: 4.9,
    reviewCount: '2.4k',
    bookedCount: '18k booked',
    price: 450000,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=280&fit=crop',
    location: 'Yogyakarta, Indonesia',
    title: 'Borobudur Sunrise & Temple Tour',
    rating: 4.8,
    reviewCount: '1.8k',
    bookedCount: '12k booked',
    price: 380000,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=280&fit=crop',
    location: 'Lombok, Indonesia',
    title: 'Gili Islands Snorkeling Day Trip',
    rating: 4.7,
    reviewCount: '1.2k',
    bookedCount: '8k booked',
    price: 520000,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=280&fit=crop',
    location: 'Raja Ampat, Indonesia',
    title: 'Island Hopping & Diving Experience',
    rating: 5.0,
    reviewCount: '890',
    bookedCount: '5.2k booked',
    price: 1250000,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=280&fit=crop',
    location: 'Labuan Bajo, Indonesia',
    title: 'Komodo National Park Day Cruise',
    rating: 4.9,
    reviewCount: '1.1k',
    bookedCount: '7k booked',
    price: 890000,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=280&fit=crop',
    location: 'Bromo, Indonesia',
    title: 'Mount Bromo Sunrise Jeep Tour',
    rating: 4.8,
    reviewCount: '2.1k',
    bookedCount: '22k booked',
    price: 350000,
  },
];

const formatPrice = (v: number): string =>
  `IDR ${v.toLocaleString('id-ID')}`;

const GAP_PX = 16;

export default function BestDealsView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scrollByOneCard = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    const cardEl = firstCardRef.current;
    if (!el || !cardEl) return;
    const cardWidth = cardEl.offsetWidth;
    const step = cardWidth + GAP_PX;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  return (
    <section className="py-5 sm:py-7 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Judul + subjudul — rapi, spacing konsisten */}
        <header className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#193f77] mb-2 sm:mb-3">
            Traveler's Best Choices
          </h2>
          <p className="text-[#6C757D] text-sm max-w-xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
          </p>
        </header>

        {/* Carousel: arrow di luar card (tidak numpuk), viewport fix 1/2/4 */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Arrow kiri — di luar area card */}
          {canScrollLeft ? (
            <button
              type="button"
              onClick={() => scrollByOneCard('left')}
              aria-label="Scroll left"
              className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#E4E8ED] shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#2C3892] hover:bg-[#2C3892] hover:text-white hover:border-[#2C3892] transition-colors"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" aria-hidden />
          )}

          {/* Scroll area — fix 1 card (mobile) / 2 (tablet) / 4 (desktop), gap 16px */}
          <div
            ref={scrollRef}
            className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide flex gap-4 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {BEST_DEALS.map((item, index) => (
              <div
                key={item.id}
                ref={index === 0 ? firstCardRef : undefined}
                className="group shrink-0 w-full md:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)] bg-white rounded-xl overflow-hidden border border-[#E4E8ED] shadow-[0_2px_8px_rgba(44,56,146,0.07)] hover:shadow-[0_6px_20px_rgba(44,56,146,0.15)] hover:-translate-y-1 transition-[box-shadow,transform] duration-200 cursor-pointer flex flex-col"
              >
                {/* Image — ukuran lebih besar */}
                <div className="relative w-full aspect-[4/3] max-h-[180px] overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2.5 z-2 text-white text-[11px] font-semibold flex items-center gap-1.5 drop-shadow-md">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 shrink-0" />
                    {item.location}
                  </span>
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-2 w-8 h-8 rounded-full bg-white/90 border-0 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.14)] hover:scale-105 transition-transform"
                    aria-label="Wishlist"
                  >
                    <FontAwesomeIcon icon={faHeartRegular} className="w-4 h-4" color="#6B7A8D" />
                  </button>
                </div>

                {/* Content — ukuran & padding lebih nyaman */}
                <div className="flex flex-col flex-1 p-3 sm:p-4">
                  <h3 className="m-0 text-[13px] sm:text-[14px] font-semibold text-[#1E2A4A] line-clamp-2 leading-snug min-h-[2.5em]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0 mt-2">
                    <FontAwesomeIcon icon={faStar} className="w-3.5 h-3.5 shrink-0" color="#F68712" />
                    <span className="text-[12px] font-bold text-[#1E2A4A]">{item.rating}</span>
                    <span className="text-[11px] text-[#6B7A8D]">({item.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 mt-1 min-h-[18px]">
                    <FontAwesomeIcon icon={faUsers} className="w-3 h-3 shrink-0" color="#F68712" />
                    <span className="text-[11px] text-[#6B7A8D]">{item.bookedCount}</span>
                  </div>
                  <div className="flex-1 min-h-2" />
                  <div className="flex items-baseline shrink-0 mt-2 pt-2 border-t border-[#E4E8ED]">
                    <span className="text-[14px] sm:text-[15px] font-bold text-[#2C3892]">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow kanan — di luar area card */}
          {canScrollRight ? (
            <button
              type="button"
              onClick={() => scrollByOneCard('right')}
              aria-label="Scroll right"
              className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#E4E8ED] shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#2C3892] hover:bg-[#2C3892] hover:text-white hover:border-[#2C3892] transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" aria-hidden />
          )}
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
