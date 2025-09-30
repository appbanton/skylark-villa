'use client';

import React from 'react';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterProps {
  quickLinks?: FooterLink[];
  policyLinks?: FooterLink[];
  instagramHandle?: string;
  instagramUrl?: string;
  contactLocation?: string;
}

const Footer = ({
  quickLinks = [
    { label: 'Discover Villa', href: '#bento', isExternal: false },
    { label: 'Amenities', href: '#features', isExternal: false },

  ],
  policyLinks = [
    { label: 'Privacy Policy', href: 'https://appbanton.notion.site/Privacy-Policy-27df053c965b80c09c75fc8af047ae57', isExternal: true },
    { label: 'Terms of Service', href: 'https://appbanton.notion.site/Terms-of-Service-27df053c965b80ddbd29d4df4f377b6f', isExternal: true },
  ],
  instagramHandle = '@skylarkvilla868',
  instagramUrl = 'https://instagram.com/skylarkvilla868',
  contactLocation = 'Blanchisseuse, Trinidad',
}: FooterProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    }
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-20 md:pb-16 lg:pt-24">
        <div className="flex flex-col gap-12 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left lg:gap-16">
          <div className="mx-auto max-w-[280px] sm:mx-0 sm:max-w-[200px] md:max-w-[220px]">
            <h3 className="mb-4 text-2xl font-bold font-family-playfair">
              SKYLARK VILLA
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400 font-family-inter">
              Time moves different here
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:gap-8 sm:text-left md:grid-cols-3 lg:gap-8">
            <div className="hidden md:block">
              <h4 className="mb-4 text-base font-semibold font-family-inter">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleQuickLinkClick(e, link.href)}
                      className="text-sm text-neutral-400 transition-colors hover:text-white font-family-inter"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-base font-semibold font-family-inter">
                Policies
              </h4>
              <ul className="space-y-3">
                {policyLinks.map((link, index) => (
                  <li key={index}>
                    {link.isExternal && link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-400 transition-colors hover:text-white font-family-inter"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 transition-colors hover:text-white font-family-inter"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-base font-semibold font-family-inter">
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-neutral-400 transition-colors hover:text-white font-family-inter"
                >
                  {instagramHandle}
                </a>
                <p className="text-sm text-neutral-400 font-family-inter">
                  {contactLocation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-neutral-800 md:my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-neutral-400 font-family-inter">
            © {new Date().getFullYear()} SKYLARK VILLA. All rights reserved.
          </p>
          <a
            href="https://appbanton.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 transition-colors hover:text-white font-family-inter"
          >
            Powered by Appbanton Studios
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;