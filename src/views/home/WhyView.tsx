'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadset,
  faCalendarCheck,
  faGift,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Feature {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
}

const WhyView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      id: 1,
      icon: faHeadset,
      title: '24/7 Customer Support',
      description: "We're here to help you anytime, anywhere"
    },
    {
      id: 2,
      icon: faCalendarCheck,
      title: 'Easy to Plan',
      description: 'Flexible booking with free cancellation'
    },
    {
      id: 3,
      icon: faGift,
      title: 'Earn Rewards',
      description: 'Explore and redeem with our loyalty program'
    }
  ];

  // Intersection Observer — observe when section enters viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  // Respect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto slide on mobile only, and only if user hasn't disabled motion
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile, prefersReducedMotion, features.length]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const transitionDuration = prefersReducedMotion ? '0ms' : '500ms';
  const scaleHover = prefersReducedMotion ? '' : 'hover:scale-[1.02]';

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50/80 to-white relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-[#2C3892]/[0.06] rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-[#F68712]/[0.06] rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Title + subtitle */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Why travel with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2C3892] to-[#2C3892]">
              Voyago
            </span>
            ?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Experience seamless travel planning with trusted service
          </p>
        </div>

        {/* Desktop: 3 cards with staggered entrance */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`transition-all ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                transitionDuration,
                transitionDelay: prefersReducedMotion ? '0ms' : `${index * 80}ms`,
              }}
            >
              <div className={`h-full text-center group cursor-default bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-[#2C3892]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#2C3892]/8 flex flex-col ${scaleHover}`}>
                <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 mb-5 mx-auto rounded-2xl bg-[#2C3892] group-hover:bg-[#F68712] transition-colors duration-300 shadow-lg group-hover:shadow-[#F68712]/30 flex-shrink-0">
                  <FontAwesomeIcon icon={feature.icon} className="text-3xl lg:text-4xl text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#2C3892] mb-3 group-hover:text-[#F68712] transition-colors duration-300 min-h-[2.75rem] flex items-center justify-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed flex-grow">
                  {feature.description}
                </p>
                <div className="mt-4 w-12 h-0.5 bg-[#F68712] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" aria-hidden />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: swipeable cards + indicators */}
        <div
          className="md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Why choose Voyago"
        >
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transitionDuration,
              }}
            >
              {features.map((feature) => (
                <div key={feature.id} className="w-full flex-shrink-0 px-3 sm:px-4">
                  <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col text-center min-h-[280px]">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 mx-auto rounded-xl bg-[#2C3892] shadow-md flex-shrink-0">
                      <FontAwesomeIcon icon={feature.icon} className="text-2xl sm:text-3xl text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#2C3892] mb-2 min-h-[2.5rem] flex items-center justify-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                    <div className="mt-4 w-10 h-0.5 bg-[#F68712] rounded-full mx-auto" aria-hidden />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots: larger tap target, clear active state */}
          <div className="flex justify-center gap-2 sm:gap-2.5 mt-6" role="tablist" aria-label="Slide navigation">
            {features.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to slide ${index + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:ring-offset-2 ${
                  index === currentSlide
                    ? 'bg-[#2C3892] w-8 h-2.5 shadow-md'
                    : 'bg-gray-300 w-2.5 h-2.5 hover:bg-[#2C3892]/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust bar — responsive, dividers hidden on small screens */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="bg-[#2C3892] rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 text-center">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5">2M+</div>
                <div className="text-white/85 text-xs sm:text-sm">Happy Travelers</div>
              </div>
              <div className="hidden sm:block w-px h-10 md:h-12 bg-white/25 shrink-0" aria-hidden />
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5">300K+</div>
                <div className="text-white/85 text-xs sm:text-sm">Experiences</div>
              </div>
              <div className="hidden sm:block w-px h-10 md:h-12 bg-white/25 shrink-0" aria-hidden />
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5">4.9★</div>
                <div className="text-white/85 text-xs sm:text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyView;