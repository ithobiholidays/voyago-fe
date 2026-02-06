"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
// Pure presentational + Logic included
// Handles: Navigation, Wishlist management
// Theme: #2C3892 (navy) · #F68712 (orange)
// ─────────────────────────────────────────────

interface AttractionCardProps {
  id: string | number;
  image: string;
  location: string;
  title: string;
  rating: number;
  reviewCount: string;
  bookedCount?: string;
  price?: number;
  originalPrice?: number;
  slug?: string;
}

// ── Helpers ──
const formatPrice = (v: number | undefined | null): string =>
  v != null ? `IDR ${v.toLocaleString("id-ID")}` : "—";

const calcDiscount = (original: number, final: number): number =>
  original > 0 ? Math.round(((original - final) / original) * 100) : 0;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const AttractionCardComponent = ({
  id,
  image,
  location,
  title,
  rating,
  reviewCount,
  bookedCount,
  price,
  originalPrice,
  slug,
}: AttractionCardProps) => {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const showDiscount = price != null && originalPrice != null && originalPrice > price;

  // ── Navigation Logic ──
  const handleCardClick = () => {
    const productUrl = slug ? `/products/${slug}` : `/products/${id}`;
    router.push(productUrl);
  };

  // ── Wishlist Logic ──
  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    setIsWishlistLoading(true);

    try {
      const newWishlistState = !wishlisted;
      
      const response = await fetch("/api/wishlist", {
        method: newWishlistState ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      if (response.ok) {
        setWishlisted(newWishlistState);
      } else {
        console.error("Failed to update wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group w-full max-w-[260px] bg-white rounded-[10px] overflow-hidden border border-[#E4E8ED] shadow-[0_2px_8px_rgba(44,56,146,0.07)] hover:shadow-[0_6px_20px_rgba(44,56,146,0.18)] hover:-translate-y-[3px] transition-[box-shadow,transform] duration-250 cursor-pointer flex flex-col"
    >
      {/* ── IMAGE ── */}
      <div className="relative w-full h-[140px] overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-350"
        />

        {/* gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[rgba(44,56,146,0.4)] to-transparent pointer-events-none" />

        {/* Location pin */}
        <span className="absolute bottom-[9px] left-[10px] z-[2] text-white text-[10.5px] font-semibold flex items-center gap-[5px] drop-shadow-md">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-[9px] h-[11px] shrink-0" />
          {location}
        </span>

        {/* Discount badge */}
        {showDiscount && (
          <span className="absolute top-2 left-2 z-[2] bg-[#E8333A] text-white text-[10.5px] font-bold px-[6px] py-[2px] rounded">
            -{calcDiscount(originalPrice!, price!)}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className={`absolute top-2 right-2 z-[2] w-[30px] h-[30px] rounded-full bg-white/90 border-0 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.14)] transition-transform duration-200 ${
            wishlisted ? "scale-110" : "hover:scale-105"
          } ${isWishlistLoading ? "opacity-50 cursor-wait" : ""}`}
        >
          <FontAwesomeIcon
            icon={wishlisted ? faHeartSolid : faHeartRegular}
            className="w-[15px] h-[15px]"
            color={wishlisted ? "#E8333A" : "#6B7A8D"}
          />
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 p-[12px_13px_14px]">
        {/* 1. Title */}
        <h3
          className="m-0 text-[13px] font-semibold text-[#1E2A4A] line-clamp-2 shrink-0"
          style={{ lineHeight: "1.4", height: `${13 * 1.4 * 2}px` }}
        >
          {title}
        </h3>

        {/* 2. Rating */}
        <div className="flex items-center gap-[5px] shrink-0 mt-[8px]">
          <FontAwesomeIcon icon={faStar} className="w-[13px] h-[13px] shrink-0" color="#F68712" />
          <span className="text-[12px] font-bold text-[#1E2A4A]">{rating}</span>
          <span className="text-[11.5px] text-[#6B7A8D]">({reviewCount})</span>
        </div>

        {/* 3. Booked */}
        <div className="flex items-center gap-[5px] shrink-0 mt-[4px] h-[16px]">
          {bookedCount ? (
            <>
              <FontAwesomeIcon icon={faUsers} className="w-[11px] h-[11px] shrink-0" color="#F68712" />
              <span className="text-[11.5px] text-[#6B7A8D]">{bookedCount} booked</span>
            </>
          ) : null}
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* 4. Price */}
        {price != null && (
          <div className="flex items-baseline gap-[7px] shrink-0 mt-2">
            <span className="text-[15px] font-bold text-[#2C3892]">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-[11px] text-[#9AA5B4] line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionCardComponent;