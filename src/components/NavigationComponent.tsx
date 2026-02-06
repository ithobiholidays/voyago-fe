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

const NavigationComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
  const navRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'id-ID', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  ];

  const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  ];

  const bestDeals: Destination[] = [
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
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setActiveExperienceSubmenu(null);
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

  const renderMegaMenuContent = (type: string, items: Destination[] | Attraction[], placeholder: string, title: string) => (
    <div className="container mx-auto px-6 lg:px-8 py-6 max-w-6xl">
      <div className="mb-5">
        <div className="relative max-w-xl mx-auto">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
          <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-12 pr-5 py-2.5 border-2 border-[#2C3892] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
          <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">{title}</h3>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {items.map((item) => (
            <Link key={item.id} href={`/${type}/${item.name.toLowerCase().replace(/ /g, '-')}`} className="group">
              <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-xl transition-all mb-3 group-hover:scale-105 transform duration-300">
                  <div className={`absolute inset-0 ${
                    type === 'attraction' ? 'bg-gradient-to-br from-[#F68712] to-[#FFBD59]' : 'bg-gradient-to-br from-[#2C3892] to-[#5170FF]'
                  }`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors line-clamp-2 mb-1">{item.name}</p>
                  <p className="text-xs text-gray-500">{'country' in item ? item.country : item.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav ref={navRef} className={`hidden lg:block fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'shadow-lg' : ''}`}>
        
        {/* Top Bar */}
        <div className="bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              <Link href="/" className="flex items-center">
                <Image src="/Logo/Logo Voyago.png" alt="Voyago Logo" width={100} height={100} className="w-auto" priority />
              </Link>

              <div className="flex items-center gap-3">
                
                {/* Language */}
                <div ref={languageRef} className="relative z-[60]">
                  <button
                    onClick={() => {
                      setIsLanguageOpen(!isLanguageOpen);
                      setIsCurrencyOpen(false);
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-[#5170FF]/10 transition-colors"
                  >
                    <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-[#2C3892]" />
                    <span className="text-sm font-medium text-[#2C3892]">{selectedLanguage.flag} {selectedLanguage.code}</span>
                    <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 text-[#2C3892] transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isLanguageOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-[#2C3892]/20 py-2 max-h-96 overflow-y-auto z-[70]">
                      <div className="px-4 py-3 border-b border-gray-100 bg-[#2C3892]/5">
                        <p className="text-xs font-bold text-[#2C3892] uppercase tracking-wide">Select Language</p>
                      </div>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#5170FF]/10 transition-colors ${
                            selectedLanguage.code === lang.code ? 'bg-[#2C3892]/5' : ''
                          }`}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                          {selectedLanguage.code === lang.code && <span className="ml-auto w-2.5 h-2.5 rounded-full bg-[#2C3892]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Currency */}
                <div ref={currencyRef} className="relative z-[60]">
                  <button
                    onClick={() => {
                      setIsCurrencyOpen(!isCurrencyOpen);
                      setIsLanguageOpen(false);
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-[#5170FF]/10 transition-colors"
                  >
                    <span className="text-sm font-bold text-[#2C3892]">{selectedCurrency.symbol}</span>
                    <span className="text-sm font-medium text-[#2C3892]">{selectedCurrency.code}</span>
                    <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 text-[#2C3892] transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCurrencyOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-[#2C3892]/20 py-2 max-h-80 overflow-y-auto z-[70]">
                      <div className="px-4 py-3 border-b border-gray-100 bg-[#2C3892]/5">
                        <p className="text-xs font-bold text-[#2C3892] uppercase tracking-wide">Select Currency</p>
                      </div>
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => handleCurrencySelect(curr)}
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[#5170FF]/10 transition-colors ${
                            selectedCurrency.code === curr.code ? 'bg-[#2C3892]/5' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-bold text-[#2C3892] w-6">{curr.symbol}</span>
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-700">{curr.code}</p>
                              <p className="text-xs text-gray-500">{curr.name}</p>
                            </div>
                          </div>
                          {selectedCurrency.code === curr.code && <span className="w-2.5 h-2.5 rounded-full bg-[#2C3892]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart */}
                <Link href="/cart" className="relative w-9 h-9 bg-[#2C3892] hover:bg-[#5170FF] transition-colors duration-100 rounded-full flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5 text-white" />
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
                    // className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors border-2 border-[#2C3892]/20 hover:border-[#2C3892]"
                  >
                    <div className="w-9 h-9 bg-[#2C3892] hover:bg-[#5170FF] transition-colors duration-100 rounded-full flex items-center justify-center shadow-md">
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                    </div>
                    {/* <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 text-[#2C3892] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} /> */}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-[#2C3892]/20 overflow-hidden z-[70]">
                      <div className="px-4 py-4 bg-[white] border-b-2 border-gray-100">
                        <Link href="/auth" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#2C3892] hover:bg-[#5170FF] text-[white] rounded-lg font-bold transition-colors">
                          <FontAwesomeIcon icon={faRightToBracket} className="w-4 h-4" />
                          <span>Sign In / Sign Up</span>
                        </Link>
                      </div>
                      <div className="py-2">
                        <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors border-l-4 border-transparent hover:border-[#2C3892]">
                          <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">Profile</span>
                        </Link>
                        <Link href="/bookings" className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors border-l-4 border-transparent hover:border-[#2C3892]">
                          <FontAwesomeIcon icon={faTicket} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">My Booking</span>
                        </Link>
                        <Link href="/wishlist" className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors border-l-4 border-transparent hover:border-[#2C3892]">
                          <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">My Wishlist</span>
                        </Link>
                        <Link href="/points" className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors border-l-4 border-transparent hover:border-[#2C3892]">
                          <FontAwesomeIcon icon={faCoins} className="w-4 h-4 text-[#2C3892]" />
                          <span className="text-sm font-medium text-gray-700">Points</span> 
                        </Link>
                        <Link href="/refund" className="flex items-center space-x-3 px-4 py-3 hover:bg-[#2C3892]/10 transition-colors border-l-4 border-transparent hover:border-[#2C3892]">
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

        {/* Main Nav */}
        <div className="bg-[#2C3892] relative">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center h-14">
              
              <div className="relative">
                <button onClick={() => setActiveMenu(activeMenu === 'bestdeals' ? null : 'bestdeals')} className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-lg transition-colors ${
                  activeMenu === 'bestdeals' ? 'bg-[#F68712] text-[white]' : 'text-white hover:bg-[#F68712] hover:text-[white]'
                }`}>
                  <FontAwesomeIcon icon={faPercent} className="w-4 h-4" />
                  <span>Best Deals</span>
                 {/* <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform ${activeMenu === 'bestdeals' ? 'rotate-180' : ''}`} /> */}
                </button>
              </div>

              <div className="relative">
                <button onClick={() => setActiveMenu(activeMenu === 'destinations' ? null : 'destinations')} className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-lg transition-colors ${
                  activeMenu === 'destinations' ? 'bg-[#F68712] text-[white]' : 'text-white hover:bg-[#F68712] hover:text-[white]'
                }`}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                  <span>Popular Destination</span>
                  {/* <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform ${activeMenu === 'destinations' ? 'rotate-180' : ''}`} /> */}
                </button>
              </div>

              <div className="relative">
                <button onClick={() => setActiveMenu(activeMenu === 'attractions' ? null : 'attractions')} className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-lg transition-colors ${
                  activeMenu === 'attractions' ? 'bg-[#F68712] text-[white]' : 'text-white hover:bg-[#F68712] hover:text-[white]'
                }`}>
                  <FontAwesomeIcon icon={faLandmark} className="w-4 h-4" />
                  <span>Attraction</span>
                  {/* <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform ${activeMenu === 'attractions' ? 'rotate-180' : ''}`} /> */}
                </button>
              </div>

              <div className="relative" >
                <button onClick={() => {
                  if (activeMenu === 'experience-tour') {
                    setActiveMenu(null);
                    setActiveExperienceSubmenu(null);
                  } else {
                    setActiveMenu('experience-tour');
                    setActiveExperienceSubmenu('experience');
                  }
                }} className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-lg transition-colors ${
                  activeMenu === 'experience-tour' ? 'bg-[#F68712] text-[white]' : 'text-white hover:bg-[#F68712] hover:text-[white]'
                }`}>
                  <FontAwesomeIcon icon={faMountain} className="w-4 h-4" />
                  <span>Experience & Tour</span>
                  {/* <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform ${activeMenu === 'experience-tour' ? 'rotate-180' : ''}`} /> */}
                </button>
              </div>

             <Link 
                href="/comingsoon" 
                className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white/40 cursor-not-allowed pointer-events-none rounded-lg"
              >
                <FontAwesomeIcon icon={faHotel} className="w-4 h-4" />
                <span>Accommodation</span>
              </Link>

              <Link 
                href="/comingsoon" 
                className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white/40 cursor-not-allowed pointer-events-none rounded-lg"
              >
                <FontAwesomeIcon icon={faPlane} className="w-4 h-4" />
                <span>Flight</span>
              </Link>

              <Link 
                href="/comingsoon" 
                className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white/40 cursor-not-allowed pointer-events-none rounded-lg"
              >
                <FontAwesomeIcon icon={faGift} className="w-4 h-4" />
                <span>Gift</span>
              </Link>
            </div>
          </div>

          {/* Mega Menus */}
          {activeMenu === 'bestdeals' && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-2xl">
              {renderMegaMenuContent('destination', bestDeals, 'Discover your next dream destination...', 'Top 10 Best Deals')}
            </div>
          )}

          {activeMenu === 'destinations' && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-2xl">
              {renderMegaMenuContent('destination', topDestinations, 'Discover your next dream destination...', 'Top 10 Destinations')}
            </div>
          )}

          {activeMenu === 'attractions' && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-2xl">
              {renderMegaMenuContent('attraction', topAttractions, 'Find amazing attractions worldwide...', 'Top 10 Attractions')}
            </div>
          )}

          {activeMenu === 'experience-tour' && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-2xl">
              <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                <div className="flex">
                  <button
                    onClick={() => setActiveExperienceSubmenu('experience')}
                    className={`flex-1 px-8 py-5 text-base font-bold transition-colors relative ${
                      activeExperienceSubmenu === 'experience' ? 'text-[#2C3892] bg-white' : 'text-gray-600 hover:text-[#2C3892] hover:bg-[#5170FF]/5'
                    }`}
                  >
                    Experience
                    {activeExperienceSubmenu === 'experience' && <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#F68712]"></span>}
                  </button>
                  
                  <button
                    onClick={() => setActiveExperienceSubmenu('tour')}
                    className={`flex-1 px-8 py-5 text-base font-bold transition-colors relative ${
                      activeExperienceSubmenu === 'tour' ? 'text-[#2C3892] bg-white' : 'text-gray-600 hover:text-[#2C3892] hover:bg-[#5170FF]/5'
                    }`}
                  >
                    Tour
                    {activeExperienceSubmenu === 'tour' && <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#F68712]"></span>}
                  </button>
                </div>

                <div className="py-6">
                  {activeExperienceSubmenu === 'experience' && (
                    <div>
                      <div className="mb-5">
                        <div className="relative max-w-xl mx-auto">
                          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
                          <input type="text" placeholder="Search unique experiences..." className="w-full pl-12 pr-5 py-2.5 border-2 border-[#2C3892] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
                        <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">Top 10 Experiences</h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                        {topExperiences.map((exp) => (
                          <Link key={exp.id} href={`/experience/${exp.id}`} className="group">
                            <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all">
                              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-xl transition-all mb-3 group-hover:scale-105 transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2C3892] to-[#5170FF]">
                                  <img 
                                    src={exp.image} 
                                    alt={exp.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                                    onError={(e) => {
                                      e.currentTarget.style.opacity = '0';
                                    }}
                                  />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors line-clamp-2 mb-1">{exp.name}</p>
                                <p className="text-xs text-gray-500">{exp.location}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeExperienceSubmenu === 'tour' && (
                    <div>
                      <div className="mb-5">
                        <div className="relative max-w-xl mx-auto">
                          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C3892] w-4 h-4" />
                          <input type="text" placeholder="Find exciting tours..." className="w-full pl-12 pr-5 py-2.5 border-2 border-[#2C3892] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F68712] focus:border-[#F68712] text-sm" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-[#F68712] rounded-full"></div>
                        <h3 className="text-xs font-bold text-[#2C3892] uppercase tracking-wider">Top 10 Tours</h3>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                        {topTours.map((tour) => (
                          <Link key={tour.id} href={`/tour/${tour.id}`} className="group">
                            <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-[#5170FF]/5 hover:to-[#FFBD59]/5 transition-all">
                              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-xl transition-all mb-3 group-hover:scale-105 transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2C3892] to-[#5170FF]">
                                  <img 
                                    src={tour.image} 
                                    alt={tour.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                                    onError={(e) => {
                                      e.currentTarget.style.opacity = '0';
                                    }}
                                  />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-800 group-hover:text-[#F68712] transition-colors line-clamp-2 mb-1">{tour.name}</p>
                                <p className="text-xs text-gray-500">{tour.location}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="hidden lg:block h-[136px]"></div>
    </>
  );
};

export default NavigationComponent;