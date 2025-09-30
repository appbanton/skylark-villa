'use client';

import { useState } from 'react';
import React from 'react';
import Image from 'next/image';

interface BentoImage {
  id: number;
  src: string;
  alt: string;
  className: string;
}

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

const Lightbox = ({ isOpen, imageSrc, imageAlt, onClose }: LightboxProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-image"
    >
      <div className="relative max-h-[90vh] max-w-[90vw] p-4">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          aria-label="Close lightbox"
          type="button"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Image
          id="lightbox-image"
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-auto rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

interface BentoGridProps {
  images: BentoImage[];
  onImageClick: (src: string, alt: string) => void;
}

const BentoGrid = ({ images, onImageClick }: BentoGridProps) => {
  const [loadedImages, setLoadedImages] = React.useState<Set<number>>(new Set());

  const handleImageLoad = (imageId: number) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 md:grid-rows-[300px_300px_200px]">
      {images.map((image, index) => {
        const isLoaded = loadedImages.has(image.id);
        const isPriority = index < 2; // First row images load with priority
        
        return (
          <div
            key={image.id}
            className={`relative overflow-hidden rounded-xl cursor-pointer group border border-neutral-300 ${image.className}`}
            style={{
              boxShadow: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)',
              backgroundColor: '#f3f4f6'
            }}
            onClick={() => onImageClick(image.src, image.alt)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onImageClick(image.src, image.alt);
              }
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={isPriority}
              loading={isPriority ? undefined : 'lazy'}
              onLoad={() => handleImageLoad(image.id)}
              quality={85}
            />
            {/* Loading shimmer effect */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        );
      })}
    </div>
  );
};

const Bento = () => {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
  });

  const handleImageClick = (src: string, alt: string) => {
    setLightbox({
      isOpen: true,
      imageSrc: src,
      imageAlt: alt,
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      imageSrc: '',
      imageAlt: '',
    });
  };

  const bentoImages: BentoImage[] = [
    {
      id: 1,
      src: '/placeholder-villa-1.jpg',
      alt: 'Aerial view of luxury villa with private pool surrounded by tropical palms',
      className: 'col-span-1 aspect-square md:col-span-1 md:aspect-auto',
    },
    {
      id: 2,
      src: '/placeholder-villa-2.jpg',
      alt: 'Infinity pool with stunning ocean views and modern architecture',
      className: 'col-span-1 aspect-square md:col-span-2 md:aspect-auto',
    },
    {
      id: 3,
      src: '/placeholder-villa-3.jpg',
      alt: 'Traditional villa exterior with modern amenities and lush landscaping',
      className: 'col-span-2 aspect-[2/1] md:col-span-2 md:aspect-auto',
    },
    {
      id: 4,
      src: '/placeholder-villa-4.jpg',
      alt: 'Contemporary pavilion with glass walls and infinity pool',
      className: 'col-span-1 aspect-square md:col-span-1 md:aspect-auto',
    },
    {
      id: 5,
      src: '/placeholder-villa-5.jpg',
      alt: 'Beachfront villa with private pool and direct beach access',
      className: 'col-span-1 aspect-square md:col-span-3 md:aspect-auto',
    },
  ];

  return (
    <section 
    id="bento"
      className="py-16 md:py-24 px-6 md:px-12 bg-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-6">
            The Villa
          </h2>
          <p className="p-normal text-neutral-600 max-w-2xl mx-auto">
            Watch dawn paint shadows across 10-foot walls. 
            The rainforest breathes just beyond the glass.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid images={bentoImages} onImageClick={handleImageClick} />

        {/* Lightbox */}
        <Lightbox
          isOpen={lightbox.isOpen}
          imageSrc={lightbox.imageSrc}
          imageAlt={lightbox.imageAlt}
          onClose={closeLightbox}
        />
      </div>
    </section>
  );
};

export default Bento;