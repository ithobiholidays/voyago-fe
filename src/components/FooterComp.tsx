'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';

const FooterComp: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Footer Sections - 4 Columns
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

  const paymentInformation = [
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
    { name: 'Lorem Ipsum', logo: '/payments/visa.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/mastercard.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/amex.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/jcb.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/unionpay.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/discover.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/diners.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/applepay.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/googlepay.svg' },
    { name: 'Lorem Ipsum', logo: '/payments/paypal.svg' },
  ];

  return (
    <footer className="bg-[#06336e]">
      {/* Banner Section - "Information available on apps is coming soon" */}
      <div className="bg-[#04274d] border-y border-white/10">
        <div className="container text-center mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                Coming Soon 
              </h3>
              <p className="text-white/70 text-sm">
                Information available on apps is coming soon
              </p>
        </div>
      </div>

      {/* Main Footer Content - 4 Columns */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* About Voyago */}
            <div>
              <h3 className="font-bold text-white text-base mb-4">
                About Voyago
              </h3>
              <ul className="space-y-2.5">
                {aboutVoyago.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#f68712] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partnerships */}
            <div>
              <h3 className="font-bold text-white text-base mb-4">
                Partnerships
              </h3>
              <ul className="space-y-2.5">
                {partnerships.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#f68712] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Services */}
            <div>
              <h3 className="font-bold text-white text-base mb-4">
                Other Services
              </h3>
              <ul className="space-y-2.5">
                {otherServices.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#f68712] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="font-bold text-white text-base mb-4">
                Payment Information
              </h3>
              <ul className="space-y-2.5">
                {paymentInformation.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#f68712] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Channels Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="font-bold text-white text-base mb-6">
              Payment Channels
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {paymentLogos.map((payment, index) => (
                <div
                  key={index}
                  className="w-full aspect-[3/2] bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#f68712] hover:bg-white/10 transition-all duration-300 p-2"
                  title={payment.name}
                >
                  <span className="text-[9px] text-white/60 font-medium text-center">
                    {payment.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Copyright & Social Media */}
      <div className="border-t border-white/10 bg-[#04274d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Logo & Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-white/60 text-sm text-center md:text-left">
                © {currentYear} Voyago. All rights reserved.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#f68712] text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;