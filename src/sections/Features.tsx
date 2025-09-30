'use client';

import React from 'react';
import Image from 'next/image';

interface Feature {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface FeaturesProps {
  heading?: string;
  description?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    id: 1,
    title: 'Scale',
    description: 'Ten-foot walls rise to meet eight-foot doors. The villa is designed to make the space feel infinite',
    imageSrc: '/placeholder-villa-1.jpg',
    imageAlt: 'Modern A-frame villa with geometric design surrounded by forest',
  },
  {
    id: 2,
    title: 'Proximity',
    description: 'The ocean is close enough to hear from your balcony. Far enough that you never see the crowds',
    imageSrc: '/placeholder-villa-2.jpg',
    imageAlt: 'Infinity pool with palm trees and tropical landscape',
  },
  {
    id: 3,
    title: 'Isolation',
    description: 'Nestled along Trinidad\'s north coast two hours from the city lies a world tourists and locals rarely frequent',
    imageSrc: '/placeholder-villa-3.jpg',
    imageAlt: 'Interior living space with floor-to-ceiling windows overlooking nature',
  },
  {
    id: 4,
    title: 'Material',
    description: 'Floor-to-ceiling glass blurs the line between the inside space and nature. Experience the best of both worlds',
    imageSrc: '/placeholder-villa-4.jpg',
    imageAlt: 'Sustainable modern architecture with natural materials at dusk',
  },
];

const Features = ({
  heading = 'Built For Skylarking',
  description = 'Between jungle and ocean. Far from everything else. The only thing you have to do is nothing',
  features = defaultFeatures,
}: FeaturesProps) => {
  return (
    <section id="features" className="py-16 md:py-24 px-6 md:px-12 bg-shade-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="p-normal text-neutral-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative overflow-hidden rounded-xl h-[235px] sm:h-[335px] border border-neutral-300"
              style={{
                boxShadow: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)'
              }}
            >
              {/* Background Image */}
              <Image
                src={feature.imageSrc}
                alt={feature.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Gradient overlay - matching Hero section */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />

              {/* Text Content - positioned at bottom left */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 
                  className="text-shade-white mb-3 font-family-inter"
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '120%',
                    letterSpacing: '-0.1px'
                  }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-shade-white font-family-inter"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '160%',
                    letterSpacing: '-0.1px'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;