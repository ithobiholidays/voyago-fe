'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPercent,
  faCartShopping,
  faGlobe,
  faUser,
  faChevronDown,
  faChevronRight,
  faMagnifyingGlass,
  faHeart,
  faTicket,
  faCoins,
  faRotateLeft,
  faRightFromBracket,
  faRightToBracket,
  faMapMarkerAlt,
  faGift,
  faHotel,
  faPlane,
  faLandmark,
  faMountain,
  faBars,
  faTimes,
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

const MobileNavbar: React.FC = () => {
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

  const bestDeals = [
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

  const topDestinations = [
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

  const topAttractions = [
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

  const topExperiences = [
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

  const topTours = [
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar - Visible below 1024px */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        
        {/* Top Bar */}
        <div className="border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image src="/Logo/Logo Voyago.png" alt="Voyago Logo" width={100} height={40} className="h-8 w-auto" priority />
              </Link>

              {/* Right Side Icons */}
              <div className="flex items-center gap-2">
                {/* Cart */}
                <Link href="/cart" className="relative w-9 h-9 bg-[#2C3892] hover:bg-[#170FF] rounded-full flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5 text-[white]" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F68712] text-white text-xs font-bold rounded-full flex items-center justify-center">0</span>
                </Link>

                {/* Profile */}
                <div ref={profileRef} className="relative z-[60]">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsLanguageOpen(false);
                      setIsCurrencyOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-9 h-9 bg-[#2C3892] rounded-full flex items-center justify-center shadow-md">
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-[#2C3892]/20 overflow-hidden z-[70]">
                      <div className="px-4 py-4 bg-white border-b-2 border-gray-100">
                        <Link href="/auth" onClick={() => setIsProfileOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#2C3892] hover:bg-[#5170FF] text-white rounded-lg font-bold transition-colors">
                          <FontAwesomeIcon icon={faRightToBracket} className="w-4 h-4" />
                          <span>Sign In / Sign Up</span>
                        </Link>
                      </div>

                      {/* Language & Currency in Profile */}
                      <div className="py-2 border-b border-gray-200">
                        {/* Language */}
                        <div ref={languageRef} className="relative px-2">
                          <button
                            onClick={() => {
                              setIsLanguageOpen(!isLanguageOpen);
                              setIsCurrencyOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-[#2C3892]" />
                              <span className="text-sm font-medium text-gray-700">{selectedLanguage.flag} {selectedLanguage.code}</span>
                            </div>
                            <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 text-gray-400 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isLanguageOpen && (
                            <div className="mt-1 mb-2 bg-gray-50 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                              {languages.map((lang) => (
                                <button
                                  key={lang.code}
                                  onClick={() => handleLanguageSelect(lang)}
                                  className={`w-full flex items-center space-x-2 px-3 py-2 hover:bg-white transition-colors text-left ${
                                    selectedLanguage.code === lang.code ? 'bg-white' : ''
                                  }`}
                                >
                                  <span className="text-lg">{lang.flag}</span>
                                  <span className="text-xs font-medium text-gray-700">{lang.name}</span>
                                  {selectedLanguage.code === lang.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2C3892]" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Currency */}
                        <div ref={currencyRef} className="relative px-2">
                          <button
                            onClick={() => {
                              setIsCurrencyOpen(!isCurrencyOpen);
                              setIsLanguageOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#2C3892]">{selectedCurrency.symbol}</span>
                              <span className="text-sm font-medium text-gray-700">{selectedCurrency.code}</span>
                            </div>
                            <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 text-gray-400 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isCurrencyOpen && (
                            <div className="mt-1 mb-2 bg-gray-50 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                              {currencies.map((curr) => (
                                <button
                                  key={curr.code}
                                  onClick={() => handleCurrencySelect(curr)}
                                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-white transition-colors ${
                                    selectedCurrency.code === curr.code ? 'bg-white' : ''
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-bold text-[#2C3892]">{curr.symbol}</span>
                                    <div className="text-left">
                                      <p className="text-xs font-medium text-gray-700">{curr.code}</p>
                                    </div>
                                  </div>
                                  {selectedCurrency.code === curr.code && <span className="w-1.5 h-1.5 rounded-full bg-[#2C3892]" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="py-2">
                        <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors">
                          <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">Profile</span>
                        </Link>
                        <Link href="/bookings" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors">
                          <FontAwesomeIcon icon={faTicket} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">My Booking</span>
                        </Link>
                        <Link href="/wishlist" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors">
                          <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">My Wishlist</span>
                        </Link>
                        <Link href="/points" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors">
                          <FontAwesomeIcon icon={faCoins} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">Points</span>
                        </Link>
                        <Link href="/refund" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors">
                          <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">Refund</span>
                        </Link>
                      </div>
                      <div className="border-t-2 border-gray-100">
                        <button className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left">
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

        {/* Quick Access Bar */}
        <div className="bg-[#2C3892] px-4 py-2 overflow-x-auto relative">
          <div className="flex items-center gap-2 min-w-max">
            <button 
              onClick={() => setActiveMenu(activeMenu === 'bestdeals' ? null : 'bestdeals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeMenu === 'bestdeals' ? 'bg-[#F68712] text-white' : 'text-white hover:bg-[#F68712]'
              }`}
            >
              <FontAwesomeIcon icon={faPercent} className="w-3 h-3" />
              <span>Best Deals</span>
            </button>
            <button 
              onClick={() => setActiveMenu(activeMenu === 'destinations' ? null : 'destinations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeMenu === 'destinations' ? 'bg-[#F68712] text-white' : 'text-white hover:bg-[#F68712]'
              }`}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
              <span>Destinations</span>
            </button>
            <button 
              onClick={() => setActiveMenu(activeMenu === 'attractions' ? null : 'attractions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeMenu === 'attractions' ? 'bg-[#F68712] text-white' : 'text-white hover:bg-[#F68712]'
              }`}
            >
              <FontAwesomeIcon icon={faLandmark} className="w-3 h-3" />
              <span>Attractions</span>
            </button>
            <button 
              onClick={() => {
                if (activeMenu === 'experience-tour') {
                  setActiveMenu(null);
                  setActiveExperienceSubmenu(null);
                } else {
                  setActiveMenu('experience-tour');
                  setActiveExperienceSubmenu('experience');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeMenu === 'experience-tour' ? 'bg-[#F68712] text-white' : 'text-white hover:bg-[#F68712]'
              }`}
            >
              <FontAwesomeIcon icon={faMountain} className="w-3 h-3" />
              <span>Experiences</span>
            </button>
            <Link href="/gift" className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-[#F68712] text-xs font-semibold rounded-lg whitespace-nowrap transition-colors">
              <FontAwesomeIcon icon={faGift} className="w-3 h-3" />
              <span>Gift</span>
            </Link>
            <Link href="/accommodation" className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-[#F68712] text-xs font-semibold rounded-lg whitespace-nowrap transition-colors">
              <FontAwesomeIcon icon={faHotel} className="w-3 h-3" />
              <span>Accommodation</span>
            </Link>
            <Link href="/flight" className="flex items-center gap-1.5 px-3 py-1.5 text-white hover:bg-[#F68712] text-xs font-semibold rounded-lg whitespace-nowrap transition-colors">
              <FontAwesomeIcon icon={faPlane} className="w-3 h-3" />
              <span>Flight</span>
            </Link>
          </div>
        </div>

        {/* Mobile Mega Menus */}
        {activeMenu && (
          <div className="bg-white max-h-[70vh] overflow-y-auto">
            {/* Best Deals */}
            {activeMenu === 'bestdeals' && (
              <div className="px-4 py-4">
                <div className="mb-4">
                  <div className="relative">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Discover your next dream destination..."
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#2C3892] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
                  <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">Top 10 Best Deals</h3>
                </div>
                <div className="space-y-2">
                  {bestDeals.map((item) => (
                    <Link key={item.id} href={`/destination/${item.name.toLowerCase().replace(/ /g, '-')}`} className="group">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all border border-transparent hover:border-[#F68712]/20">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-all group-hover:scale-105 transform duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2C3892] to-[#5170FF]">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover opacity-0"
                              onError={(e) => {
                                e.currentTarget.style.opacity = '0';
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors mb-0.5">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.country}</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 group-hover:text-[#F68712] transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Destinations */}
            {activeMenu === 'destinations' && (
              <div className="px-4 py-4">
                <div className="mb-4">
                  <div className="relative">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Discover your next dream destination..."
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#2C3892] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
                  <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">Top 10 Destinations</h3>
                </div>
                <div className="space-y-2">
                  {topDestinations.map((item) => (
                    <Link key={item.id} href={`/destination/${item.name.toLowerCase().replace(/ /g, '-')}`} className="group">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all border border-transparent hover:border-[#F68712]/20">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-all group-hover:scale-105 transform duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2C3892] to-[#5170FF]">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover opacity-0"
                              onError={(e) => {
                                e.currentTarget.style.opacity = '0';
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors mb-0.5">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.country}</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 group-hover:text-[#F68712] transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Attractions */}
            {activeMenu === 'attractions' && (
              <div className="px-4 py-4">
                <div className="mb-4">
                  <div className="relative">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Find amazing attractions worldwide..."
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#2C3892] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
                  <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">Top 10 Attractions</h3>
                </div>
                <div className="space-y-2">
                  {topAttractions.map((item) => (
                    <Link key={item.id} href={`/attraction/${item.name.toLowerCase().replace(/ /g, '-')}`} className="group">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all border border-transparent hover:border-[#F68712]/20">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-all group-hover:scale-105 transform duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#F68712] to-[#FFBD59]">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover opacity-0"
                              onError={(e) => {
                                e.currentTarget.style.opacity = '0';
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors mb-0.5 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{item.location}</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 group-hover:text-[#F68712] transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Experience & Tour */}
            {activeMenu === 'experience-tour' && (
              <div>
                {/* Tabs */}
                <div className="flex border-b-2 border-gray-200">
                  <button
                    onClick={() => setActiveExperienceSubmenu('experience')}
                    className={`flex-1 px-4 py-3 text-sm font-bold transition-colors relative ${
                      activeExperienceSubmenu === 'experience' ? 'text-[#2C3892] bg-white' : 'text-gray-600 hover:text-[#2C3892] hover:bg-[#5170FF]/5'
                    }`}
                  >
                    Experience
                    {activeExperienceSubmenu === 'experience' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F68712]"></span>}
                  </button>
                  <button
                    onClick={() => setActiveExperienceSubmenu('tour')}
                    className={`flex-1 px-4 py-3 text-sm font-bold transition-colors relative ${
                      activeExperienceSubmenu === 'tour' ? 'text-[#2C3892] bg-white' : 'text-gray-600 hover:text-[#2C3892] hover:bg-[#5170FF]/5'
                    }`}
                  >
                    Tour
                    {activeExperienceSubmenu === 'tour' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F68712]"></span>}
                  </button>
                </div>

                {/* Content */}
                <div className="px-4 py-4">
                  {activeExperienceSubmenu === 'experience' && (
                    <>
                      <div className="mb-4">
                        <div className="relative">
                          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search unique experiences..."
                            className="w-full pl-10 pr-4 py-3 border-2 border-[#2C3892] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
                        <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">Top 10 Experiences</h3>
                      </div>
                      <div className="space-y-2">
                        {topExperiences.map((item) => (
                          <Link key={item.id} href={`/experience/${item.id}`} className="group">
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all border border-transparent hover:border-[#F68712]/20">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-all group-hover:scale-105 transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2C3892] to-[#5170FF]">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                                    onError={(e) => {
                                      e.currentTarget.style.opacity = '0';
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors mb-0.5 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">{item.location}</p>
                              </div>
                              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 group-hover:text-[#F68712] transition-colors" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {activeExperienceSubmenu === 'tour' && (
                    <>
                      <div className="mb-4">
                        <div className="relative">
                          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Find exciting tours..."
                            className="w-full pl-10 pr-4 py-3 border-2 border-[#2C3892] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
                        <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">Top 10 Tours</h3>
                      </div>
                      <div className="space-y-2">
                        {topTours.map((item) => (
                          <Link key={item.id} href={`/tour/${item.id}`} className="group">
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all border border-transparent hover:border-[#F68712]/20">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-all group-hover:scale-105 transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2C3892] to-[#5170FF]">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                                    onError={(e) => {
                                      e.currentTarget.style.opacity = '0';
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors mb-0.5 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">{item.location}</p>
                              </div>
                              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 group-hover:text-[#F68712] transition-colors" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="lg:hidden h-[104px]"></div>
    </>
  );
};

export default MobileNavbar;