"use client";

import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";

function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

interface BentoImage {
  id: number;
  src: string;
  alt: string;
  colSpan: 1 | 2 | 3;
  rowSpan: 1 | 2;
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

// Maps colSpan/rowSpan props to Tailwind grid classes
const getColSpanClass = (colSpan: BentoImage["colSpan"]) => {
  const map = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3" };
  return map[colSpan];
};

const getRowSpanClass = (rowSpan: BentoImage["rowSpan"]) => {
  const map = { 1: "row-span-1", 2: "row-span-2" };
  return map[rowSpan];
};

interface BentoGridProps {
  images: BentoImage[];
  onImageClick: (src: string, alt: string) => void;
}

const BentoGrid = ({ images, onImageClick }: BentoGridProps) => {
  const [loadedImages, setLoadedImages] = React.useState<Set<number>>(
    new Set(),
  );

  const handleImageLoad = (imageId: number) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  return (
    <>
      {/* Desktop: asymmetric 3-col grid */}
      <div
        className="hidden md:grid gap-3"
        style={{
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gridTemplateRows: "280px 190px",
        }}
      >
        {images.map((image, index) => {
          const isLoaded = loadedImages.has(image.id);
          const isPriority = index < 2;

          return (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group border ${getColSpanClass(image.colSpan)} ${getRowSpanClass(image.rowSpan)}`}
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderColor: "var(--color-border)",
              }}
              onClick={() => onImageClick(image.src, image.alt)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onImageClick(image.src, image.alt);
                }
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95 group-hover:saturate-100 brightness-90 saturate-90 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 1024px) 50vw, 33vw"
                priority={isPriority}
                loading={isPriority ? undefined : "lazy"}
                onLoad={() => handleImageLoad(image.id)}
                quality={85}
              />
              {!isLoaded && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{ background: "var(--color-border)" }}
                />
              )}
              {/* Gradient overlay — cinematic, heavier at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              {/* Hover tint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Mobile: 2-col grid, first cell full width */}
      <div className="grid md:hidden grid-cols-2 gap-3">
        {images.map((image, index) => {
          const isLoaded = loadedImages.has(image.id);
          const isPriority = index < 2;
          const isFirst = index === 0;
          const isLast = index === images.length - 1;

          return (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group border ${isFirst || isLast ? "col-span-2 h-[200px]" : "col-span-1 h-[150px]"}`}
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderColor: "var(--color-border)",
              }}
              onClick={() => onImageClick(image.src, image.alt)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onImageClick(image.src, image.alt);
                }
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-all duration-700 brightness-90 saturate-90 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw"
                priority={isPriority}
                loading={isPriority ? undefined : "lazy"}
                onLoad={() => handleImageLoad(image.id)}
                quality={85}
              />
              {!isLoaded && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{ background: "var(--color-border)" }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>
    </>
  );
};

const Bento = () => {
  const isDark = useIsDark();
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  const handleImageClick = (src: string, alt: string) => {
    setLightbox({ isOpen: true, imageSrc: src, imageAlt: alt });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, imageSrc: "", imageAlt: "" });
  };

  const bentoImages: BentoImage[] = [
    {
      id: 1,
      src: "/entryway.jpg",
      alt: "Aerial view of luxury villa with private pool surrounded by tropical palms",
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: 2,
      src: "/kitchen_living.jpg",
      alt: "Infinity pool with stunning ocean views and modern architecture",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 3,
      src: "/living.jpg",
      alt: "Traditional villa exterior with modern amenities and lush landscaping",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 4,
      src: "/bedroom.jpg",
      alt: "Contemporary pavilion with glass walls and infinity pool",
      colSpan: 2,
      rowSpan: 1,
    },
  ];

  return (
    <section
      id="bento"
      className="py-16 md:py-24 px-6 md:px-12 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-3" style={{ color: "var(--color-text-primary)" }}>
            The Villa
          </h2>
          <div
            className="mx-auto mb-6"
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "var(--color-accent)",
            }}
          />
          <p
            className="p-normal max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Watch dawn paint shadows across 10-foot walls. The rainforest
            breathes just beyond the glass.
          </p>
        </div>

        {/* Bento Grid — wrapped in tile in dark mode */}
        <div
          className="rounded-xl transition-colors duration-300"
          style={{
            backgroundColor: isDark
              ? "var(--color-feature-card)"
              : "transparent",
            border: isDark ? "1px solid var(--color-border)" : "none",
            padding: isDark ? "16px" : "0",
          }}
        >
          <BentoGrid images={bentoImages} onImageClick={handleImageClick} />
        </div>

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
