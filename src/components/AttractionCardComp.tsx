'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faStar,
  faUsers,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


// ─────────────────────────────
// Types
// ─────────────────────────────
export interface Attraction {
  id: number | string;
  title: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  images: string[];
}

interface Props {
  attraction: Attraction;
  className?: string;
}


// ─────────────────────────────
// Helpers
// ─────────────────────────────
const formatPrice = (v: number) =>
  `IDR ${v.toLocaleString('id-ID')}`;

const discount = (o: number, p: number) =>
  Math.round(((o - p) / o) * 100);


// ─────────────────────────────
// Component
// ─────────────────────────────
export default function AttractionCard({
  attraction,
  className = '',
}: Props) {
  const [wishlisted, setWishlisted] = useState(false);

  const {
    images,
    title,
    city,
    country,
    rating,
    reviewCount,
    price,
    originalPrice,
  } = attraction;

  const image = images?.[0];
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div
      className={`
        group bg-white rounded-xl border border-gray-200
        shadow-sm hover:shadow-lg hover:-translate-y-1
        transition-all duration-300 cursor-pointer
        flex flex-col overflow-hidden
        ${className}
      `}
    >

      {/* IMAGE */}
      <div className="relative aspect-[4/3]">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition"
        />

        {/* discount */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{discount(originalPrice!, price)}%
          </span>
        )}

        {/* wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
        >
          <FontAwesomeIcon
            icon={wishlisted ? faHeartSolid : faHeartRegular}
            className="text-sm"
            color={wishlisted ? '#ef4444' : '#94a3b8'}
          />
        </button>

        {/* location */}
        <span className="absolute bottom-2 left-2 text-white text-xs font-medium flex items-center gap-1 drop-shadow">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {city}, {country}
        </span>
      </div>


      {/* CONTENT */}
      <div className="p-3 flex flex-col flex-1">

        <h3 className="text-sm font-semibold line-clamp-2 text-slate-800">
          {title}
        </h3>

        {/* rating */}
        <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
          <FontAwesomeIcon icon={faStar} className="text-amber-400" />
          <span className="font-bold">{rating}</span>
          <span>({reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex-1" />

        {/* price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-indigo-700">
            {formatPrice(price)}
          </span>

          {hasDiscount && (
            <span className="text-xs line-through text-gray-400">
              {formatPrice(originalPrice!)}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
