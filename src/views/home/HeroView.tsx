'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const HeroView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample images (ganti nanti)
  const slides: Slide[] = [
    { id: 1, image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80', alt: 'Travel Experience 1' },
    { id: 2, image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80', alt: 'Travel Experience 2' },
    { id: 3, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80', alt: 'Travel Experience 3' },
    { id: 4, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80', alt: 'Travel Experience 4' }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/comingsoon');
  };

  return (
    <div className="relative w-full min-h-[400px] h-[50vh] sm:h-[55vh] md:h-[58vh] lg:h-[60vh] xl:h-[65vh] max-h-[800px] overflow-hidden">

      {/* Slider Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-[#2C3892]/70 via-[#2C3892]/50 to-[#2C3892]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">

        <div className="text-center mb-4 sm:mb-6 md:mb-7 lg:mb-8">
          <h1 className="text-white font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-1 sm:mb-2 md:mb-3 tracking-tight leading-tight">
            World Escape
          </h1>
          <p className="text-white/95 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light">
            Find Your Happiness
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-[90%] sm:max-w-xl md:max-w-2xl">
          <form onSubmit={handleSearch} className="relative group">
            <div className="relative flex items-center">
              {/* Search Icon - Voyago Navy */}
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 sm:left-5 md:left-6 text-[#2C3892]/60 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10 transition-colors group-focus-within:text-[#F68712]"
              />

              {/* Search Input - Voyago Orange Focus Ring */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full pl-11 sm:pl-14 md:pl-16 pr-28 sm:pr-32 md:pr-36 py-3.5 sm:py-4 md:py-4 text-sm sm:text-base md:text-lg rounded-full bg-white/95 backdrop-blur-sm shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#F68712]/50 focus:bg-white transition-all duration-300 placeholder:text-gray-400 border-2 border-transparent focus:border-[#F68712]"
              />

              {/* Search Button - Voyago Orange Primary CTA */}
              <button
                type="submit"
                className="absolute right-2 bg-[#F68712] hover:bg-[#FFBD59] active:bg-[#2C3892] text-white px-5 sm:px-7 md:px-9 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#F68712]/30 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#F68712]/50"
              >
                Search
              </button>
            </div>
          </form>


          {/* Trust Indicators with Brand Colors */}
          <div className="text-center mt-3 xs:mt-4 sm:mt-2">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className="flex items-center gap-1">
                <span className="text-[#FFBD59] text-sm">★★★★★</span>
                <span className="text-white/90 text-xs sm:text-sm font-semibold">4.9/5</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <span className="text-white/90 text-xs sm:text-sm font-medium">300,000+ Experiences</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicators - Voyago Orange Active State */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 px-4 py-2.5 rounded-full bg-[#2C3892]/30 backdrop-blur-md border border-white/20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F68712]/50 ${index === currentSlide
                ? 'w-10 sm:w-12 h-2 bg-[#F68712] shadow-lg shadow-[#F68712]/50'
                : 'w-2 h-2 bg-white/50 hover:bg-[#FFBD59] hover:scale-125'
              }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>


    </div>
  );
};

export default HeroView;
