'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// ========================================
// INTERFACE
// ========================================

export interface Destination {
  id: string | number;
  name: string;
  country: string;
  image: string;
  activities: number;
  href?: string;
}

export interface DestinationCardProps {
  destination: Destination;
  
  // Card Styling (Full Tailwind Support)
  className?: string;              // Wrapper classes
  height?: string;                 // e.g., "h-64", "h-72", "h-80"
  rounded?: string;                // e.g., "rounded-2xl", "rounded-3xl"
  shadow?: string;                 // e.g., "shadow-lg hover:shadow-2xl"
  
  // Image Styling
  imageClassName?: string;         // e.g., "brightness-90"
  imageObjectFit?: 'cover' | 'contain' | 'fill';
  
  // Overlay Styling
  overlayClassName?: string;       // e.g., "bg-gradient-to-t from-black/70"
  
  // Content Wrapper
  contentClassName?: string;       // e.g., "p-5", "p-6"
  
  // Text Styling
  titleClassName?: string;         // City name
  countryClassName?: string;       // Country text
  activitiesClassName?: string;    // Activities count
  iconClassName?: string;          // Location icon
  
  // Behavior
  hoverEffect?: boolean;           // Enable hover scale effect
  onClick?: (destination: Destination) => void;
}

// ========================================
// COMPONENT
// ========================================

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  
  // Card styling
  className = '',
  height = 'h-72',
  rounded = 'rounded-2xl',
  shadow = 'shadow-lg hover:shadow-2xl',
  
  // Image
  imageClassName = '',
  imageObjectFit = 'cover',
  
  // Overlay
  overlayClassName = 'bg-gradient-to-t from-black/70 via-black/20 to-transparent',
  
  // Content wrapper
  contentClassName = 'p-5 sm:p-6',
  
  // Text
  titleClassName = 'text-white font-bold text-2xl sm:text-3xl mb-2 drop-shadow-lg',
  countryClassName = 'text-white/95 text-sm font-medium drop-shadow',
  activitiesClassName = 'text-white/90 text-sm font-medium drop-shadow',
  iconClassName = 'w-3.5 h-3.5 text-white/90',
  
  // Behavior
  hoverEffect = true,
  onClick,
}) => {
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(destination);
    }
  };

  return (
    <Link
      href={destination.href || '/comingsoon'}
      className={`block ${hoverEffect ? 'group' : ''} ${className}`}
      onClick={handleClick}
    >
      <div className={`relative ${height} ${rounded} overflow-hidden ${shadow} transition-all duration-500`}>
        
        {/* Background Image */}
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className={`object-${imageObjectFit} ${hoverEffect ? 'transition-transform duration-700 group-hover:scale-110' : ''} ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 ${overlayClassName}`} />

        {/* Content */}
        <div className={`absolute inset-0 flex flex-col justify-end ${contentClassName}`}>
          
          {/* City Name */}
          <h3 className={titleClassName}>
            {destination.name}
          </h3>

          {/* Country with Icon */}
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className={iconClassName} />
            <span className={countryClassName}>
              {destination.country}
            </span>
          </div>

          {/* Activities Count */}
          <div className={activitiesClassName}>
            {destination.activities.toLocaleString()}+ things to do
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;