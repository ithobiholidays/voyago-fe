"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faUsers,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

// ─────────────────────────────────────────────
// AttractionCardComponent.tsx
// Pure presentational · Reusable
// Responsive: grid columns diatur di parent
// Theme: #2C3892 (navy) · #F68712 (orange)
// ─────────────────────────────────────────────

interface AttractionCardProps {
  image: string;
  location: string;
  title: string;
  rating: number;
  reviewCount: string;
  bookedCount?: string;
  price: number;
  originalPrice?: number;
}

// ── Helpers ──
const formatPrice = (v: number): string => `IDR ${v.toLocaleString("id-ID")}`;
const calcDiscount = (original: number, final: number): number =>
  Math.round(((original - final) / original) * 100);

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const AttractionCardComponent = ({
  image,
  location,
  title,
  rating,
  reviewCount,
  bookedCount,
  price,
  originalPrice,
}: AttractionCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);
  const showDiscount = originalPrice != null && originalPrice > price;

  return (
    <div className="group w-full bg-white rounded-[10px] overflow-hidden border border-[#E4E8ED] shadow-[0_2px_8px_rgba(44,56,146,0.07)] hover:shadow-[0_6px_20px_rgba(44,56,146,0.18)] hover:-translate-y-[3px] transition-[box-shadow,transform] duration-250 cursor-pointer flex flex-col">

      {/* ── IMAGE — fixed 40% ── */}
      <div className="relative w-full h-[160px] overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-350"
        />

        {/* gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[rgba(44,56,146,0.4)] to-transparent pointer-events-none" />

        {/* Location pin — bottom left */}
        <span className="absolute bottom-[9px] left-[10px] z-[2] text-white text-[10.5px] font-semibold flex items-center gap-[5px] drop-shadow-md">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-[9px] h-[11px] shrink-0" />
          {location}
        </span>

        {/* Discount badge — top left */}
        {showDiscount && (
          <span className="absolute top-2 left-2 z-[2] bg-[#E8333A] text-white text-[10.5px] font-bold px-[6px] py-[2px] rounded">
            -{calcDiscount(originalPrice!, price)}%
          </span>
        )}

        {/* Wishlist button — top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((prev) => !prev);
          }}
          className={`absolute top-2 right-2 z-[2] w-[30px] h-[30px] rounded-full bg-white/90 border-0 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.14)] transition-transform duration-200 ${
            wishlisted ? "scale-110" : "hover:scale-105"
          }`}
        >
          <FontAwesomeIcon
            icon={wishlisted ? faHeartSolid : faHeartRegular}
            className="w-[15px] h-[15px]"
            color={wishlisted ? "#E8333A" : "#6B7A8D"}
          />
        </button>
      </div>

      {/* ── CONTENT — fixed 60%, min-h buat uniform height ── */}
      <div className="flex flex-col flex-1 p-[12px_13px_14px] min-h-[150px]">

        {/* Title — 2 line clamp */}
        <h3 className="m-0 text-[13px] font-semibold text-[#1E2A4A] leading-[1.4] line-clamp-2">
          {title}
        </h3>

        {/* Rating + booked */}
        <div className="flex items-center gap-[5px] mt-[7px] flex-wrap">
          <FontAwesomeIcon icon={faStar} className="w-[13px] h-[13px] shrink-0" color="#F68712" />
          <span className="text-[12px] font-bold text-[#1E2A4A]">{rating}</span>
          <span className="text-[11.5px] text-[#6B7A8D]">({reviewCount})</span>

          {bookedCount && (
            <>
              <span className="text-[#E4E8ED] text-[13px] leading-none">•</span>
              <FontAwesomeIcon icon={faUsers} className="w-[11px] h-[11px] shrink-0" color="#F68712" />
              <span className="text-[11.5px] text-[#6B7A8D]">{bookedCount} booked</span>
            </>
          )}
        </div>

        {/* spacer — dorong price ke bawah */}
        <div className="flex-1" />

        {/* Price */}
        <div className="flex items-baseline gap-[7px]">
          <span className="text-[15px] font-bold text-[#2C3892]">
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-[11px] text-[#9AA5B4] line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttractionCardComponent;