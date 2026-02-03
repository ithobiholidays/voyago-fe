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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h3 className="text-white font-bold text-base">
              Coming Soon
            </h3>
            <p className="text-white/90 text-xs">
              Information available on apps is coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Logo & Social Media */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-3">
            <Image 
              src="/Logo/Logo Voyago.png" 
              alt="Voyago Logo" 
              width={140} 
              height={42} 
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
          
          {/* Social Media Below Logo */}
          <div className="flex items-center justify-center gap-2.5">
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

        {/* 3 Columns - Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mb-6">
          
          {/* About Voyago */}
          <div className="text-center">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center justify-center gap-2">
              <span className="w-1 h-4 bg-[#F68712] rounded-full"></span>
              About Voyago
            </h3>
            <ul className="space-y-1.5">
              {aboutVoyago.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#F68712] text-xs transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnerships */}
          <div className="text-center">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center justify-center gap-2">
              <span className="w-1 h-4 bg-[#F68712] rounded-full"></span>
              Partnerships
            </h3>
            <ul className="space-y-1.5">
              {partnerships.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#F68712] text-xs transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Services */}
          <div className="text-center">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center justify-center gap-2">
              <span className="w-1 h-4 bg-[#F68712] rounded-full"></span>
              Other Services
            </h3>
            <ul className="space-y-1.5">
              {otherServices.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#F68712] text-xs transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Channels */}
        <div className="border-t border-white/10 pt-5 mb-5">
          <p className="text-white/60 text-xs text-center mb-3">We Accept</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentLogos.map((payment, index) => (
              <div
                key={index}
                className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-105 transition-transform"
                title={payment}
              >
                <span className="text-[7px] text-gray-700 font-bold">
                  {payment}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-white/60 text-xs">
            © {currentYear} Voyago. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;