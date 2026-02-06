'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BannerComp from "@/components/BannerComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import BannerComponent from '@/components/BannerComponent';

// Sample destinations data
const allDestinations = [
  { id: 1, name: 'Las Vegas', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2847 },
  { id: 2, name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1965 },
  { id: 3, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2134 },
  { id: 4, name: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 3156 },
  { id: 5, name: 'New York City', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 3892 },
  { id: 6, name: 'Washington DC', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1543 },
  { id: 7, name: 'Cancun', country: 'Mexico', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 987 },
  { id: 8, name: 'Florence', country: 'Italy', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1234 },
  { id: 9, name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1876 },
  { id: 10, name: 'Oahu', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 765 },
  { id: 11, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 3421 },
  { id: 12, name: 'Dubai', country: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2567 },
  { id: 13, name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2890 },
  { id: 14, name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1987 },
  { id: 15, name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2341 },
  { id: 16, name: 'Amsterdam', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },
  { id: 17, name: 'Berlin', country: 'Germany', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2123 },
  { id: 18, name: 'Prague', country: 'Czech Republic', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },
  { id: 19, name: 'Vienna', country: 'Austria', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1765 },
  { id: 20, name: 'Istanbul', country: 'Turkey', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2456 },
    { id: 21, name: 'Seoul', country: 'South Korea', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2789 },
  { id: 22, name: 'Busan', country: 'South Korea', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1345 },
  { id: 23, name: 'Osaka', country: 'Japan', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2198 },
  { id: 24, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1678 },
  { id: 25, name: 'Hiroshima', country: 'Japan', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 945 },

  { id: 26, name: 'Beijing', country: 'China', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 3123 },
  { id: 27, name: 'Shanghai', country: 'China', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2987 },
  { id: 28, name: 'Hong Kong', country: 'China', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2564 },
  { id: 29, name: 'Macau', country: 'China', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1189 },

  { id: 30, name: 'Kuala Lumpur', country: 'Malaysia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1897 },
  { id: 31, name: 'Penang', country: 'Malaysia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 987 },

  { id: 32, name: 'Jakarta', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2765 },
  { id: 33, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 3542 },
  { id: 34, name: 'Yogyakarta', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },

  { id: 35, name: 'Hanoi', country: 'Vietnam', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1567 },
  { id: 36, name: 'Ho Chi Minh City', country: 'Vietnam', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2345 },

  { id: 37, name: 'Manila', country: 'Philippines', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1764 },
  { id: 38, name: 'Cebu', country: 'Philippines', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 998 },

  { id: 39, name: 'Delhi', country: 'India', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2654 },
  { id: 40, name: 'Mumbai', country: 'India', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2898 },
  { id: 41, name: 'Bangalore', country: 'India', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1987 },

  { id: 42, name: 'Doha', country: 'Qatar', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1324 },
  { id: 43, name: 'Riyadh', country: 'Saudi Arabia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1546 },

  { id: 44, name: 'Cairo', country: 'Egypt', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2432 },
  { id: 45, name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },

  { id: 46, name: 'Cape Town', country: 'South Africa', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1986 },
  { id: 47, name: 'Johannesburg', country: 'South Africa', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1234 },

  { id: 48, name: 'Toronto', country: 'Canada', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2876 },
  { id: 49, name: 'Vancouver', country: 'Canada', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1987 },
  { id: 50, name: 'Montreal', country: 'Canada', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },

  { id: 51, name: 'Los Angeles', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 3765 },
  { id: 52, name: 'San Francisco', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2543 },
  { id: 53, name: 'Chicago', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2234 },

  { id: 54, name: 'Mexico City', country: 'Mexico', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2876 },
  { id: 55, name: 'Guadalajara', country: 'Mexico', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },

  { id: 56, name: 'Rio de Janeiro', country: 'Brazil', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2987 },
  { id: 57, name: 'São Paulo', country: 'Brazil', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 3124 },

  { id: 58, name: 'Buenos Aires', country: 'Argentina', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2345 },
  { id: 59, name: 'Santiago', country: 'Chile', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1876 },

  { id: 60, name: 'Lima', country: 'Peru', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },

  { id: 61, name: 'Lisbon', country: 'Portugal', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1987 },
  { id: 62, name: 'Porto', country: 'Portugal', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1234 },

  { id: 63, name: 'Zurich', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1543 },
  { id: 64, name: 'Geneva', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1321 },

  { id: 65, name: 'Stockholm', country: 'Sweden', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1765 },
  { id: 66, name: 'Oslo', country: 'Norway', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },
  { id: 67, name: 'Copenhagen', country: 'Denmark', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },

  { id: 68, name: 'Helsinki', country: 'Finland', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1234 },

  { id: 69, name: 'Reykjavik', country: 'Iceland', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 987 },

  { id: 70, name: 'Athens', country: 'Greece', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2345 },
  { id: 71, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 876 },

  { id: 72, name: 'Budapest', country: 'Hungary', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1765 },
  { id: 73, name: 'Warsaw', country: 'Poland', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1543 },

  { id: 74, name: 'Brussels', country: 'Belgium', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },

  { id: 75, name: 'Edinburgh', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },
  { id: 76, name: 'Manchester', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1876 },

  { id: 77, name: 'Dublin', country: 'Ireland', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1987 },

  { id: 78, name: 'Auckland', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },
  { id: 79, name: 'Queenstown', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 876 },

  { id: 80, name: 'Melbourne', country: 'Australia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 2654 },
  { id: 81, name: 'Perth', country: 'Australia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },

  { id: 82, name: 'Honolulu', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 987 },

  { id: 83, name: 'Anchorage', country: 'United States', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 654 },

  { id: 84, name: 'Havana', country: 'Cuba', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },

  { id: 85, name: 'Kingston', country: 'Jamaica', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 876 },

  { id: 86, name: 'Panama City', country: 'Panama', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1324 },

  { id: 87, name: 'Bogotá', country: 'Colombia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1654 },

  { id: 88, name: 'Quito', country: 'Ecuador', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 987 },

  { id: 89, name: 'La Paz', country: 'Bolivia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 765 },

  { id: 90, name: 'Montevideo', country: 'Uruguay', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1234 },

  { id: 91, name: 'Tallinn', country: 'Estonia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 876 },

  { id: 92, name: 'Riga', country: 'Latvia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 987 },

  { id: 93, name: 'Vilnius', country: 'Lithuania', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 765 },

  { id: 94, name: 'Sofia', country: 'Bulgaria', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1324 },

  { id: 95, name: 'Bucharest', country: 'Romania', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1543 },

  { id: 96, name: 'Belgrade', country: 'Serbia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1432 },

  { id: 97, name: 'Zagreb', country: 'Croatia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 1234 },

  { id: 98, name: 'Ljubljana', country: 'Slovenia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 876 },

  { id: 99, name: 'Sarajevo', country: 'Bosnia and Herzegovina', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 765 },

  { id: 100, name: 'Skopje', country: 'North Macedonia', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop', activities: 654 },

];

const DestinationView: React.FC = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination: 4 cols x 5 rows = 20 items per page
  const itemsPerPage = 20;
  
  // Get unique countries
  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(allDestinations.map(d => d.country))];
    return uniqueCountries.sort();
  }, []);
  
  // Filter destinations
  const filteredDestinations = useMemo(() => {
    let filtered = allDestinations;
    
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCountry) {
      filtered = filtered.filter(d => d.country === selectedCountry);
    }
    
    return filtered;
  }, [searchTerm, selectedCountry]);
  
  // Pagination - ONLY load current page data
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex);
  
  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setCurrentPage(1);
  };
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setCurrentPage(1);
  };

  return (
    <>
      {/* Banner */}
      <BannerComponent
        backgroundImage="/logo/background.jpg"
        title="All Destination Page"
        description="Custom description text"
        height="small"
        backgroundSize="cover"
        overlayClassName="bg-gradient-to-b from-black/50 via-black/40 to-black/60"
      />
      
      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-7xl">
          
          {/* Search & Filter Section - More Compact */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
            
            {/* Search Bar - Compact */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Search Destinations
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by city name or country..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#F68712] focus:ring-1 focus:ring-[#F68712]/20 transition-all text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Country Filter - Compact */}
            <div className="mb-4">
              <label htmlFor="country" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Filter by Country
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-gray-400" />
                </div>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#F68712] focus:ring-1 focus:ring-[#F68712]/20 transition-all text-sm appearance-none bg-white cursor-pointer"
                >
                  <option value="">All Countries ({allDestinations.length} destinations)</option>
                  {countries.map((country) => {
                    const count = allDestinations.filter(d => d.country === country).length;
                    return (
                      <option key={country} value={country}>
                        {country} ({count})
                      </option>
                    );
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Filter Summary - Compact */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3.5 h-3.5 text-[#F68712]" />
                <span className="font-semibold">
                  {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
                </span>
              </div>
              
              {(searchTerm || selectedCountry) && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-1.5 text-xs font-semibold text-[#2C3892] hover:text-white hover:bg-[#2C3892] border border-[#2C3892] rounded-md transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          {/* Destinations Grid */}
          {currentDestinations.length > 0 ? (
            <>
              {/* Grid: Compact & Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mb-6">
                {currentDestinations.map((destination) => (
                  <Link
                    key={destination.id}
                    href="/comingsoon"
                    className="block group"
                  >
                    <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                      
                      {/* Image */}
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Content - Compact */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        
                        {/* City Name */}
                        <h3 className="text-white font-bold text-xl sm:text-2xl mb-1.5 drop-shadow-lg line-clamp-1">
                          {destination.name}
                        </h3>

                        {/* Country */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 text-white/90" />
                          <span className="text-white/95 text-xs font-medium drop-shadow">
                            {destination.country}
                          </span>
                        </div>

                        {/* Activities Count */}
                        <div className="text-white/90 text-xs font-medium drop-shadow">
                          {destination.activities.toLocaleString()}+ things to do
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination - Compact & Smart */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Page Info - Compact */}
                    <div className="text-xs text-gray-600 hidden sm:block">
                      <span className="font-medium text-gray-900">{startIndex + 1}-{Math.min(endIndex, filteredDestinations.length)}</span> of{' '}
                      <span className="font-medium text-gray-900">{filteredDestinations.length}</span>
                    </div>
                    
                    {/* Pagination Controls */}
                    <div className="flex items-center gap-1.5">
                      {/* Previous */}
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 bg-[#2C3892] hover:bg-[#5170FF] text-white text-sm rounded-md font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Prev
                      </button>
                      
                      {/* Page Numbers - Desktop */}
                      <div className="hidden md:flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNumber;
                          
                          if (totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                          } else {
                            pageNumber = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              className={`min-w-[32px] h-8 px-2 text-sm rounded-md font-medium transition-all ${
                                currentPage === pageNumber
                                  ? 'bg-[#F68712] text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Mobile: Page indicator */}
                      <div className="md:hidden px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                        {currentPage} / {totalPages}
                      </div>
                      
                      {/* Next */}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 bg-[#2C3892] hover:bg-[#5170FF] text-white text-sm rounded-md font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    
                    {/* Mobile Page Info */}
                    <div className="text-xs text-gray-600 sm:hidden">
                      {startIndex + 1}-{Math.min(endIndex, filteredDestinations.length)} of {filteredDestinations.length}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* No Results - Compact */
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No destinations found
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2 bg-[#F68712] hover:bg-[#FFBD59] text-white text-sm rounded-lg font-semibold transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DestinationView;