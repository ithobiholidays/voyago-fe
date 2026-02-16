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
    { label: 'Careers', href: '/comingsoon' },
  ];

  const partnerships = [
    { label: 'Merchant Sign Up', href: '/comingsoon' },
    { label: 'Merchant Log In', href: '/comingsoon' },
    { label: 'Affiliate Partnership', href: '/comingsoon' },
    { label: 'Influencer Program', href: '/comingsoon' },
    { label: 'Agent Marketplace', href: '/comingsoon' },
    { label: 'Partner Hub', href: '/comingsoon' },
    { label: 'Collaborate with Voyago', href: '/comingsoon' },
  ];

  const support = [
    { label: 'Help Center', href: '/comingsoon' },
    { label: 'Privacy Policy', href: '/comingsoon' },
    { label: 'Terms of Service', href: '/comingsoon' },
    { label: 'FAQs', href: '/comingsoon' },
  ];

  const socialLinks = [
    { icon: faFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: faInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: faYoutube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: faTiktok, href: 'https://tiktok.com', label: 'TikTok' },
  ];

  const paymentMethods = [
    'Visa', 'Master', 'Amex', 'JCB', 'PayPal',
    'Apple Pay', 'Google Pay',
  ];

  return (
    <footer className="bg-[#2C3892] text-white">
      {/* Coming Soon — pill style, tidak full bleed */}
      <div className="border-b border-[#F68712]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="bg-[#F68712] rounded-2xl py-4 px-6 text-center shadow-lg">
            <h3 className="text-white font-bold text-base sm:text-lg mb-0.5">
              Coming Soon
            </h3>
            <p className="text-white/95 text-sm">
              Information available on apps is coming soon
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        {/* Satu baris: Brand (kiri) + 3 kolom link (kanan) */}
        <div className="flex flex-col lg:flex-row lg:gap-14 xl:gap-16">
          {/* Brand block — logo warna asli di kotak putih */}
          <div className="lg:w-[280px] xl:w-[320px] shrink-0 mb-10 lg:mb-0">
            <Link
              href="/"
              className="inline-flex items-center justify-center p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F68712] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2C3892]"
              aria-label="Voyago home"
            >
              <Image
                src="/Logo/Logo Voyago.png"
                alt="Voyago"
                width={150}
                height={48}
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Your trusted travel companion for experiences worldwide.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F68712] flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label={s.label}
                >
                  <FontAwesomeIcon icon={s.icon} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns — judul oranye, tanpa strip */}
          <nav
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 flex-1 min-w-0"
            aria-label="Footer links"
          >
            <div>
              <h4 className="text-[#F68712] font-bold text-sm mb-4">
                About Voyago
              </h4>
              <ul className="space-y-2.5">
                {aboutVoyago.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/75 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#F68712] font-bold text-sm mb-4">
                Partnerships
              </h4>
              <ul className="space-y-2.5">
                {partnerships.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/75 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#F68712] font-bold text-sm mb-4">
                Support
              </h4>
              <ul className="space-y-2.5">
                {support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/75 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Payment + Copyright — satu baris di desktop */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-white/50 text-xs mb-2.5">We accept</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((name) => (
                  <span
                    key={name}
                    className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-[11px] sm:text-xs font-medium"
                    title={name}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-white/50 text-xs sm:text-sm sm:text-right">
              © {currentYear} Voyago. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
