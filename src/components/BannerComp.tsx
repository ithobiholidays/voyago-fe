'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BannerProps {
  // Background
  backgroundImage?: string;
  backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  backgroundSize?: 'cover' | 'contain' | 'auto';
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  
  // Layout
  height?: 'small' | 'medium' | 'large' | 'full' | string;
  alignment?: 'left' | 'center' | 'right';
  
  // Content
  title?: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  
  // Button/CTA
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  buttonClassName?: string; // Custom Tailwind classes for button
  onButtonClick?: () => void;
  
  // Styling - Accept ANY Tailwind classes
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
}

const BannerComp: React.FC<BannerProps> = ({
  // Background defaults
  backgroundImage = '/images/default-banner.jpg',
  backgroundPosition = 'center',
  backgroundSize = 'cover',
  overlay = true,
  overlayColor = 'from-black/60 to-black/40',
  overlayOpacity = 60,
  
  // Layout defaults
  height = 'medium',
  alignment = 'center',
  
  // Content
  title,
  subtitle,
  description,
  children,
  
  // Button defaults
  buttonText,
  buttonLink,
  buttonVariant = 'primary',
  buttonClassName = '',
  onButtonClick,
  
  // Styling - All accept custom Tailwind classes
  titleClassName = 'text-white',
  subtitleClassName = 'text-white/90',
  descriptionClassName = 'text-white/80',
  className = '',
  containerClassName = '',
  contentClassName = '',
  imageClassName = '',
  overlayClassName = '',
}) => {
  // Height mapping
  const heightClasses = {
    small: 'h-[300px]',
    medium: 'h-[400px] md:h-[500px]',
    large: 'h-[500px] md:h-[600px]',
    full: 'h-screen',
  };

  // Alignment mapping
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // Button variant mapping
  const buttonVariants = {
    primary: 'bg-[#F68712] hover:bg-[#FFBD59] text-white',
    secondary: 'bg-[#2C3892] hover:bg-[#5170FF] text-white',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2C3892]',
  };

  const heightClass = typeof height === 'string' && height in heightClasses 
    ? heightClasses[height as keyof typeof heightClasses] 
    : height;

  return (
    <div className={`relative ${heightClass} overflow-hidden ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Banner Background"
            fill
            className={`object-${backgroundSize} ${imageClassName}`}
            style={{ objectPosition: backgroundPosition }}
            priority
          />
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${overlayColor} ${overlayClassName}`}
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content Container */}
      <div className={`relative z-10 h-full ${containerClassName}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className={`h-full flex flex-col justify-center ${alignmentClasses[alignment]} ${contentClassName}`}>
            
            {/* Subtitle */}
            {subtitle && (
              <p className={`text-sm md:text-base font-semibold mb-2 ${subtitleClassName}`}>
                {subtitle}
              </p>
            )}

            {/* Title */}
            {title && (
              <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 max-w-4xl ${titleClassName}`}>
                {title}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className={`text-base md:text-lg lg:text-xl mb-6 max-w-2xl ${descriptionClassName}`}>
                {description}
              </p>
            )}

            {/* Custom Children */}
            {children}

            {/* Button/CTA */}
            {(buttonText && buttonLink) && (
              <Link
                href={buttonLink}
                className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${buttonVariants[buttonVariant]} ${buttonClassName}`}
                onClick={onButtonClick}
              >
                {buttonText}
              </Link>
            )}

            {/* Button without link (for onClick only) */}
            {(buttonText && !buttonLink && onButtonClick) && (
              <button
                onClick={onButtonClick}
                className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${buttonVariants[buttonVariant]} ${buttonClassName}`}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerComp;