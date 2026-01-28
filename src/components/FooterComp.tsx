'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';

const FooterComp: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const aboutVoyago = [
    { label: 'About Us', href: '/comingsoon' },
    { label: 'Contact Us', href: '/comingsoon' },
    { label: 'Inspiration', href: '/comingsoon' },
    { label: 'Careers', href: '/comingsoon' }
  ];

  const partnerships = [
    { label: 'Merchant Sign Up', href: '/comingsoon' },
    { label: 'Merchant Log In', href: '/comingsoon' },
    { label: 'Affiliate Partnership', href: '/comingsoon' },
    { label: 'Influencer Program', href: '/comingsoon' },
    { label: 'Agent Marketplace', href: '/comingsoon' },
    { label: 'Voyago Partner Hub', href: '/comingsoon' },
    { label: 'Collaborate with Voyago', href: '/comingsoon' },
  ];

  const otherServices = [
    { label: 'Lorem Ipsum', href: '/comingsoon' },
    { label: 'Lorem Ipsum', href: '/comingsoon' },
    { label: 'Lorem Ipsum', href: '/comingsoon' },
    { label: 'Lorem Ipsum', href: '/comingsoon' },
    { label: 'Lorem Ipsum', href: '/comingsoon' },
    { label: 'Lorem Ipsum', href: '/comingsoon' },
  ];

  const socialLinks = [
    { icon: faFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: faInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: faYoutube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: faTiktok, href: 'https://tiktok.com', label: 'TikTok' },
  ];

  const paymentLogos = [
    'Visa', 'Master', 'Amex', 'JCB', 'Union',
    'PayPal', 'Apple', 'Google', 'Discover', 'Diners'
  ];

  return (
    <footer className="bg-[#2C3892]">
      
      {/* Coming Soon Banner */}
      <div className="bg-[#F68712]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="text-center">
            <h3 className="text-white font-bold text-base md:text-lg">
              Coming Soon
            </h3>
            <p className="text-white/90 text-xs md:text-sm">
              Information available on apps is coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* Logo Section - Centered & Compact */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image 
              src="/Logo/Logo Voyago.png" 
              alt="Voyago Logo" 
              width={140} 
              height={42} 
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-8">
          
          {/* About Voyago */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#F68712] rounded-full"></span>
              About Voyago
            </h3>
            <ul className="space-y-2">
              {aboutVoyago.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#F68712] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnerships */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#F68712] rounded-full"></span>
              Partnerships
            </h3>
            <ul className="space-y-2">
              {partnerships.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#F68712] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Services */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#F68712] rounded-full"></span>
              Other Services
            </h3>
            <ul className="space-y-2">
              {otherServices.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#F68712] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Channels */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <p className="text-white/60 text-xs text-center mb-4">We Accept</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentLogos.map((payment, index) => (
              <div
                key={index}
                className="w-14 h-9 bg-white rounded flex items-center justify-center hover:scale-105 transition-transform shadow-sm"
                title={payment}
              >
                <span className="text-[8px] text-gray-700 font-bold">
                  {payment}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright */}
          <p className="text-white/60 text-xs text-center sm:text-left">
            © {currentYear} Voyago. All rights reserved.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F68712] text-white transition-all hover:scale-110"
                aria-label={social.label}
              >
                <FontAwesomeIcon icon={social.icon} className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;