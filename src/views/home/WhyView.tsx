'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadset,
  faCalendarCheck,
  faGift
} from '@fortawesome/free-solid-svg-icons';

interface Feature {
  id: number;
  icon: any;
  title: string;
  description: string;
}

const WhyView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
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

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
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

  // Auto slide mobile
  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isMobile, features.length]);

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

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-18 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2C3892]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F68712]/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title with Subtitle */}
        <div 
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Why travel with{' '}
            <span className="text-transparent bg-clip-text bg-[#2C3892]">
              Voyago
            </span>
            ?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Experience seamless travel planning with trusted service
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 xl:gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-full text-center group cursor-default bg-white rounded-2xl p-8 lg:p-10 border-2 border-gray-100 hover:border-[#2C3892] transition-all duration-500 hover:shadow-2xl hover:shadow-[#F68712]/10 hover:scale-105 flex flex-col">
                
                {/* Icon Circle with Voyago Colors */}
                <div className="inline-flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 mb-6 mx-auto rounded-full bg-gradient-to-br from-[#2C3892] to-[#2C3892] group-hover:from-[#F68712] group-hover:to-[#F68712] transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-xl flex-shrink-0">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-4xl lg:text-5xl text-white transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-[#2C3892] mb-4 group-hover:text-[#F68712] transition-colors duration-300 min-h-[3.5rem] flex items-center justify-center">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Decorative line on hover */}
                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#F68712] to-[#F68712] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div
          className="md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature) => (
                <div key={feature.id} className="w-full flex-shrink-0 px-4 sm:px-6 flex items-stretch">
                  <div className="w-full bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 flex flex-col text-center">
                    
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto rounded-full bg-gradient-to-br from-[#2C3892] to-[#2C3892] shadow-lg flex-shrink-0">
                      <FontAwesomeIcon
                        icon={feature.icon}
                        className="text-4xl text-white"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 min-h-[4rem] flex items-center justify-center">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      {feature.description}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[#2C3892] to-[#2C3892] rounded-full mx-auto flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators with Voyago Orange */}
          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-[#2C3892] w-8 shadow-lg shadow-[#F68712]/30" 
                    : "bg-gray-300 w-2 hover:bg-[#2C3892]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <div 
          className={`mt-16 sm:mt-20 md:mt-24 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-gradient-to-r from-[#2C3892] via-[#2C3892] to-[#2C3892] rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 text-center">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">2M+</div>
                <div className="text-white/80 text-xs sm:text-sm">Happy Travelers</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">300K+</div>
                <div className="text-white/80 text-xs sm:text-sm">Experiences</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">4.9★</div>
                <div className="text-white/80 text-xs sm:text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyView;