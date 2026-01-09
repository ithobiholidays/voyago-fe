'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faUser,
  faBars,
  faTimes,
  faChevronDown,
  faChevronRight,
  faMagnifyingGlass,
  faHeart,
  faTicket,
  faCoins,
  faRotateLeft,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faMapMarkerAlt,
  faGift,
  faHotel,
  faPlane,
  faLandmark,
  faMountain,
} from '@fortawesome/free-solid-svg-icons';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
}

interface Attraction {
  id: number;
  name: string;
  location: string;
  image: string;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeExperienceSubmenu, setActiveExperienceSubmenu] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en-US',
    name: 'English (US)',
    flag: '🇺🇸',
  });
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  });

  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'id-ID', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  ];

  const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  ];

  const topDestinations: Destination[] = [
    { id: 1, name: 'Tokyo', country: 'Japan', image: '/destinations/tokyo.jpg' },
    { id: 2, name: 'Paris', country: 'France', image: '/destinations/paris.jpg' },
    { id: 3, name: 'New York', country: 'USA', image: '/destinations/newyork.jpg' },
    { id: 4, name: 'London', country: 'UK', image: '/destinations/london.jpg' },
    { id: 5, name: 'Dubai', country: 'UAE', image: '/destinations/dubai.jpg' },
    { id: 6, name: 'Singapore', country: 'Singapore', image: '/destinations/singapore.jpg' },
    { id: 7, name: 'Hong Kong', country: 'China', image: '/destinations/hongkong.jpg' },
    { id: 8, name: 'Bali', country: 'Indonesia', image: '/destinations/bali.jpg' },
    { id: 9, name: 'Barcelona', country: 'Spain', image: '/destinations/barcelona.jpg' },
    { id: 10, name: 'Rome', country: 'Italy', image: '/destinations/rome.jpg' },
  ];

  const topAttractions: Attraction[] = [
    { id: 1, name: 'Eiffel Tower', location: 'Paris, France', image: '/attractions/eiffel.jpg' },
    { id: 2, name: 'Burj Khalifa', location: 'Dubai, UAE', image: '/attractions/burj.jpg' },
    { id: 3, name: 'Tokyo Skytree', location: 'Tokyo, Japan', image: '/attractions/skytree.jpg' },
    { id: 4, name: 'Big Ben', location: 'London, UK', image: '/attractions/bigben.jpg' },
    { id: 5, name: 'Statue of Liberty', location: 'New York, USA', image: '/attractions/liberty.jpg' },
    { id: 6, name: 'Colosseum', location: 'Rome, Italy', image: '/attractions/colosseum.jpg' },
    { id: 7, name: 'Sagrada Familia', location: 'Barcelona, Spain', image: '/attractions/sagrada.jpg' },
    { id: 8, name: 'Marina Bay Sands', location: 'Singapore', image: '/attractions/marina.jpg' },
    { id: 9, name: 'Sydney Opera House', location: 'Sydney, Australia', image: '/attractions/opera.jpg' },
    { id: 10, name: 'Tanah Lot', location: 'Bali, Indonesia', image: '/attractions/tanahlot.jpg' },
  ];

  const topExperiences: Attraction[] = [
    { id: 1, name: 'Hot Air Balloon Ride', location: 'Cappadocia, Turkey', image: '/experiences/balloon.jpg' },
    { id: 2, name: 'Northern Lights Tour', location: 'Iceland', image: '/experiences/aurora.jpg' },
    { id: 3, name: 'Safari Adventure', location: 'Kenya', image: '/experiences/safari.jpg' },
    { id: 4, name: 'Scuba Diving', location: 'Great Barrier Reef', image: '/experiences/diving.jpg' },
    { id: 5, name: 'Wine Tasting', location: 'Tuscany, Italy', image: '/experiences/wine.jpg' },
    { id: 6, name: 'Temple Visit', location: 'Angkor Wat, Cambodia', image: '/experiences/temple.jpg' },
    { id: 7, name: 'Street Food Tour', location: 'Bangkok, Thailand', image: '/experiences/food.jpg' },
    { id: 8, name: 'Helicopter Ride', location: 'Grand Canyon, USA', image: '/experiences/helicopter.jpg' },
    { id: 9, name: 'Cooking Class', location: 'Tokyo, Japan', image: '/experiences/cooking.jpg' },
    { id: 10, name: 'Desert Safari', location: 'Dubai, UAE', image: '/experiences/desert.jpg' },
  ];

  const topTours: Attraction[] = [
    { id: 1, name: 'City Highlights Tour', location: 'Paris, France', image: '/tours/paris.jpg' },
    { id: 2, name: 'Historical Walking Tour', location: 'Rome, Italy', image: '/tours/rome.jpg' },
    { id: 3, name: 'Hop-On Hop-Off Bus', location: 'London, UK', image: '/tours/london.jpg' },
    { id: 4, name: 'Food & Culture Tour', location: 'Tokyo, Japan', image: '/tours/tokyo.jpg' },
    { id: 5, name: 'Island Hopping Tour', location: 'Bali, Indonesia', image: '/tours/bali.jpg' },
    { id: 6, name: 'Architecture Tour', location: 'Barcelona, Spain', image: '/tours/barcelona.jpg' },
    { id: 7, name: 'Night City Tour', location: 'Singapore', image: '/tours/singapore.jpg' },
    { id: 8, name: 'Grand Canyon Tour', location: 'Las Vegas, USA', image: '/tours/canyon.jpg' },
    { id: 9, name: 'Desert Tour', location: 'Dubai, UAE', image: '/tours/dubai.jpg' },
    { id: 10, name: 'Cruise Tour', location: 'Hong Kong', image: '/tours/hongkong.jpg' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setActiveExperienceSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isMobileProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isMobileProfileOpen]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
  };

  const toggleMobileMenu = (menu: string) => {
    setMobileExpandedMenu(mobileExpandedMenu === menu ? null : menu);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      {/* Row 1 - Top Bar (Desktop Only) */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/Logo_Voyago.png"
                alt="Voyago Logo"
                width={140}
                height={40}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Right Menu */}
            <div className="flex items-center space-x-3">
              
              {/* Language Selector */}
              <div ref={languageRef} className="relative">
                <button
                  onClick={() => {
                    setIsLanguageOpen(!isLanguageOpen);
                    setIsCurrencyOpen(false);
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {selectedLanguage.flag} {selectedLanguage.code}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 text-gray-500 transition-transform ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Select Language
                      </p>
                    </div>
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedLanguage.code === language.code ? 'bg-blue-50' : ''
                        }`}
                      >
                        <span className="text-2xl">{language.flag}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {language.name}
                        </span>
                        {selectedLanguage.code === language.code && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-[#06336e]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Selector */}
              <div ref={currencyRef} className="relative">
                <button
                  onClick={() => {
                    setIsCurrencyOpen(!isCurrencyOpen);
                    setIsLanguageOpen(false);
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-bold text-gray-700">
                    {selectedCurrency.symbol}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedCurrency.code}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 text-gray-500 transition-transform ${
                      isCurrencyOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Select Currency
                      </p>
                    </div>
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleCurrencySelect(currency)}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedCurrency.code === currency.code ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-gray-700 w-6">
                            {currency.symbol}
                          </span>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-700">
                              {currency.code}
                            </p>
                            <p className="text-xs text-gray-500">{currency.name}</p>
                          </div>
                        </div>
                        {selectedCurrency.code === currency.code && (
                          <span className="w-2 h-2 rounded-full bg-[#06336e]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsLanguageOpen(false);
                    setIsCurrencyOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 bg-[#06336e] rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 text-gray-500 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                    {/* Auth Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <Link
                        href="/auth"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#06336e] hover:bg-[#04274d] text-white rounded-lg font-medium transition-colors"
                      >
                        <FontAwesomeIcon icon={faRightToBracket} className="w-4 h-4" />
                        <span>Sign In / Sign Up</span>
                      </Link>
                    </div>

                    {/* Menu Items */}
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Profile</span>
                    </Link>
                    <Link
                      href="/bookings"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTicket} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">My Booking</span>
                    </Link>
                    <Link
                      href="/points"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <FontAwesomeIcon icon={faCoins} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Points</span>
                    </Link>
                    <Link
                      href="/refund"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Refund</span>
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar (< 1024px) */}
      <div className="lg:hidden border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between h-14 px-4">
          
          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon
              icon={faBars}
              className="w-5 h-5 text-gray-700"
            />
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/Logo_Voyago.png"
              alt="Voyago Logo"
              width={100}
              height={30}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Right: Profile */}
          <button
            onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
            className="p-2 -mr-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-[#06336e] rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Row 2 - Main Navigation (Desktop Only) */}
      <div ref={megaMenuRef} className="hidden lg:block border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 h-14">
            
            {/* Popular Destination */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('destinations')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#06336e] py-4 transition-colors border-b-2 border-transparent hover:border-[#f68712]">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                <span>Popular Destination</span>
                <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
              </button>

              {activeMenu === 'destinations' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[800px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-6 z-50">
                  <div className="mb-6">
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                      />
                      <input
                        type="text"
                        placeholder="Discover your next dream destination..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e] text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Top 10 Destinations
                    </h3>
                    <div className="grid grid-cols-5 gap-4">
                      {topDestinations.map((dest) => (
                        <Link
                          key={dest.id}
                          href={`/destination/${dest.name.toLowerCase()}`}
                          className="group text-center"
                        >
                          <div className="w-full aspect-square rounded-full overflow-hidden mb-2 ring-2 ring-gray-100 group-hover:ring-[#f68712] transition-all">
                            <div className="w-full h-full bg-gradient-to-br from-[#06336e] to-[#04274d] flex items-center justify-center">
                              <span className="text-white text-xs font-medium">{dest.name}</span>
                            </div>
                          </div>
                          <p className="text-xs font-medium text-gray-700 group-hover:text-[#06336e]">
                            {dest.name}
                          </p>
                          <p className="text-xs text-gray-500">{dest.country}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Popular Attraction */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('attractions')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#06336e] py-4 transition-colors border-b-2 border-transparent hover:border-[#f68712]">
                <FontAwesomeIcon icon={faLandmark} className="w-4 h-4" />
                <span>Popular Attraction</span>
                <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
              </button>

              {activeMenu === 'attractions' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[800px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-6 z-50">
                  <div className="mb-6">
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                      />
                      <input
                        type="text"
                        placeholder="Find amazing attractions worldwide..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e] text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Top 10 Attractions
                    </h3>
                    <div className="grid grid-cols-5 gap-4">
                      {topAttractions.map((attr) => (
                        <Link
                          key={attr.id}
                          href={`/attraction/${attr.id}`}
                          className="group text-center"
                        >
                          <div className="w-full aspect-square rounded-full overflow-hidden mb-2 ring-2 ring-gray-100 group-hover:ring-[#f68712] transition-all">
                            <div className="w-full h-full bg-gradient-to-br from-[#f68712] to-[#d67010] flex items-center justify-center">
                              <span className="text-white text-xs font-medium px-2">{attr.name.split(' ')[0]}</span>
                            </div>
                          </div>
                          <p className="text-xs font-medium text-gray-700 group-hover:text-[#06336e] line-clamp-1">
                            {attr.name}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">{attr.location}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Experience & Tour */}
            <div
              className="relative"
              onMouseEnter={() => {
                setActiveMenu('experience-tour');
                setActiveExperienceSubmenu('experience');
              }}
              onMouseLeave={() => {
                setActiveMenu(null);
                setActiveExperienceSubmenu(null);
              }}
            >
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#06336e] py-4 transition-colors border-b-2 border-transparent hover:border-[#f68712]">
                <FontAwesomeIcon icon={faMountain} className="w-4 h-4" />
                <span>Experience & Tour</span>
                <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
              </button>

              {activeMenu === 'experience-tour' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[500px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 z-50">
                  
                  {/* Tab Headers */}
                  <div className="flex border-b border-gray-200">
                    <button
                      onMouseEnter={() => setActiveExperienceSubmenu('experience')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                        activeExperienceSubmenu === 'experience'
                          ? 'text-[#06336e] border-b-2 border-[#f68712] bg-gray-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Experience
                    </button>
                    <button
                      onMouseEnter={() => setActiveExperienceSubmenu('tour')}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                        activeExperienceSubmenu === 'tour'
                          ? 'text-[#06336e] border-b-2 border-[#f68712] bg-gray-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Tour
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    {activeExperienceSubmenu === 'experience' && (
                      <div>
                        <div className="mb-4">
                          <div className="relative">
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                            />
                            <input
                              type="text"
                              placeholder="Search unique experiences..."
                              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e] text-sm"
                            />
                          </div>
                        </div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                          Top 10 Experiences
                        </h3>
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {topExperiences.map((exp) => (
                            <Link
                              key={exp.id}
                              href={`/experience/${exp.id}`}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-[#06336e] line-clamp-1">
                                  {exp.name}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">{exp.location}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeExperienceSubmenu === 'tour' && (
                      <div>
                        <div className="mb-4">
                          <div className="relative">
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                            />
                            <input
                              type="text"
                              placeholder="Find exciting tours..."
                              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e] text-sm"
                            />
                          </div>
                        </div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                          Top 10 Tours
                        </h3>
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {topTours.map((tour) => (
                            <Link
                              key={tour.id}
                              href={`/tour/${tour.id}`}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-[#06336e] line-clamp-1">
                                  {tour.name}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">{tour.location}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Gift */}
            <Link
              href="/gift"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#06336e] py-4 transition-colors border-b-2 border-transparent hover:border-[#f68712]"
            >
              <FontAwesomeIcon icon={faGift} className="w-4 h-4" />
              <span>Gift</span>
            </Link>

            {/* Hotel */}
            <Link
              href="/hotels"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#06336e] py-4 transition-colors border-b-2 border-transparent hover:border-[#f68712]"
            >
              <FontAwesomeIcon icon={faHotel} className="w-4 h-4" />
              <span>Hotel</span>
            </Link>

            {/* Flight */}
            <Link
              href="/flights"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#06336e] py-4 transition-colors border-b-2 border-transparent hover:border-[#f68712]"
            >
              <FontAwesomeIcon icon={faPlane} className="w-4 h-4" />
              <span>Flight</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Left Menu - Navigation with Expandable Submenus */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="p-4">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-50"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Navigation Items with Expand/Collapse */}
              <div className="space-y-1">
                
                {/* Popular Destinations */}
                <div>
                  <button
                    onClick={() => toggleMobileMenu('destinations')}
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-[#f68712]" />
                      <span className="text-gray-700 font-medium">Popular Destinations</span>
                    </div>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        mobileExpandedMenu === 'destinations' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {mobileExpandedMenu === 'destinations' && (
                    <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-200">
                      <div className="mb-3">
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                          />
                          <input
                            type="text"
                            placeholder="Search destinations..."
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {topDestinations.slice(0, 5).map((dest) => (
                          <Link
                            key={dest.id}
                            href={`/destination/${dest.name.toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06336e] to-[#04274d] flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">{dest.name}</p>
                              <p className="text-xs text-gray-500">{dest.country}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Popular Attractions */}
                <div>
                  <button
                    onClick={() => toggleMobileMenu('attractions')}
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faLandmark} className="w-5 h-5 text-[#f68712]" />
                      <span className="text-gray-700 font-medium">Popular Attractions</span>
                    </div>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        mobileExpandedMenu === 'attractions' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {mobileExpandedMenu === 'attractions' && (
                    <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-200">
                      <div className="mb-3">
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                          />
                          <input
                            type="text"
                            placeholder="Search attractions..."
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {topAttractions.slice(0, 5).map((attr) => (
                          <Link
                            key={attr.id}
                            href={`/attraction/${attr.id}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f68712] to-[#d67010] flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 line-clamp-1">{attr.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{attr.location}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Experiences */}
                <div>
                  <button
                    onClick={() => toggleMobileMenu('experiences')}
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faMountain} className="w-5 h-5 text-[#f68712]" />
                      <span className="text-gray-700 font-medium">Experiences</span>
                    </div>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        mobileExpandedMenu === 'experiences' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {mobileExpandedMenu === 'experiences' && (
                    <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-200">
                      <div className="mb-3">
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                          />
                          <input
                            type="text"
                            placeholder="Search experiences..."
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {topExperiences.slice(0, 5).map((exp) => (
                          <Link
                            key={exp.id}
                            href={`/experience/${exp.id}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 line-clamp-1">{exp.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{exp.location}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tours */}
                <div>
                  <button
                    onClick={() => toggleMobileMenu('tours')}
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faMountain} className="w-5 h-5 text-[#f68712]" />
                      <span className="text-gray-700 font-medium">Tours</span>
                    </div>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        mobileExpandedMenu === 'tours' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {mobileExpandedMenu === 'tours' && (
                    <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-200">
                      <div className="mb-3">
                        <div className="relative">
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                          />
                          <input
                            type="text"
                            placeholder="Search tours..."
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {topTours.slice(0, 5).map((tour) => (
                          <Link
                            key={tour.id}
                            href={`/tour/${tour.id}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 line-clamp-1">{tour.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{tour.location}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Gift, Hotel, Flight - Direct Links */}
                <Link
                  href="/gift"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faGift} className="w-5 h-5 text-[#f68712]" />
                  <span className="text-gray-700 font-medium">Gift Cards</span>
                </Link>
                <Link
                  href="/hotels"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faHotel} className="w-5 h-5 text-[#f68712]" />
                  <span className="text-gray-700 font-medium">Hotels</span>
                </Link>
                <Link
                  href="/flights"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faPlane} className="w-5 h-5 text-[#f68712]" />
                  <span className="text-gray-700 font-medium">Flights</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Right Menu - Profile (Unchanged) */}
      {isMobileProfileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="p-4">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Account</h2>
                <button
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-50"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Auth Button */}
              <div className="mb-6">
                <Link
                  href="/auth"
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#06336e] hover:bg-[#04274d] text-white rounded-xl font-medium transition-colors"
                >
                  <FontAwesomeIcon icon={faRightToBracket} className="w-4 h-4" />
                  <span>Sign In / Sign Up</span>
                </Link>
              </div>

              {/* User Menu */}
              <div className="space-y-2 mb-6">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Profile</span>
                </Link>
                <Link
                  href="/bookings"
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faTicket} className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">My Booking</span>
                </Link>
                <Link
                  href="/points"
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faCoins} className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Points</span>
                </Link>
                <Link
                  href="/refund"
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Refund</span>
                </Link>
              </div>

              {/* Preferences */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4 px-4">
                  Preferences
                </h3>
                
                {/* Language */}
                <div className="px-4 mb-4">
                  <label className="text-xs font-medium text-gray-600 mb-2 block">
                    Language
                  </label>
                  <select
                    value={selectedLanguage.code}
                    onChange={(e) => {
                      const language = languages.find((l) => l.code === e.target.value);
                      if (language) handleLanguageSelect(language);
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e] text-sm text-gray-700"
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.flag} {language.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Currency */}
                <div className="px-4">
                  <label className="text-xs font-medium text-gray-600 mb-2 block">
                    Currency
                  </label>
                  <select
                    value={selectedCurrency.code}
                    onChange={(e) => {
                      const currency = currencies.find((c) => c.code === e.target.value);
                      if (currency) handleCurrencySelect(currency);
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06336e] text-sm text-gray-700"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;