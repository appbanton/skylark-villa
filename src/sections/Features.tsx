"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Feature {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesProps {
  heading?: string;
  description?: string;
  features?: Feature[];
}

// ── Custom SVG Icons ─────────────────────────────────────────

const ScaleIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="16"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      opacity="0.25"
    />
    <circle
      cx="20"
      cy="20"
      r="10"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      opacity="0.55"
    />
    <circle
      cx="20"
      cy="20"
      r="4"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      opacity="0.9"
    />
  </svg>
);

const ProximityIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="2.5" fill="var(--color-accent)" opacity="0.9" />
    <ellipse
      cx="20"
      cy="20"
      rx="13"
      ry="5.5"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.3"
    />
    <ellipse
      cx="20"
      cy="20"
      rx="13"
      ry="5.5"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.3"
      transform="rotate(60 20 20)"
    />
    <ellipse
      cx="20"
      cy="20"
      rx="13"
      ry="5.5"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.3"
      transform="rotate(120 20 20)"
    />
  </svg>
);

const IsolationIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 36 C18 36 17 28 19 22 C20.5 17 23 13 23 13"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M23 13 C19 10 13 11 10 14"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M23 13 C27 10 32 12 33 16"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M23 13 C21 8 16 6 13 8"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M23 13 C25 7 30 6 32 9"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M12 36 L28 36"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.4"
    />
  </svg>
);

const MaterialIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="8"
      y1="14"
      x2="32"
      y2="14"
      stroke="var(--color-accent)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="21"
      x2="26"
      y2="21"
      stroke="var(--color-accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.65"
    />
    <line
      x1="8"
      y1="28"
      x2="20"
      y2="28"
      stroke="var(--color-accent)"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.35"
    />
  </svg>
);

// ── Feature data ─────────────────────────────────────────────

const defaultFeatures: Feature[] = [
  {
    id: 1,
    number: "01",
    title: "Scale",
    description:
      "Ten-foot walls rise to meet eight-foot doors. The villa is designed to make the space feel infinite",
    icon: <ScaleIcon />,
  },
  {
    id: 2,
    number: "02",
    title: "Proximity",
    description:
      "The ocean is close enough to hear from your balcony. Far enough that you never see the crowds",
    icon: <ProximityIcon />,
  },
  {
    id: 3,
    number: "03",
    title: "Isolation",
    description:
      "Nestled along Trinidads north coast two hours from the city lies a world tourists and locals rarely frequent",
    icon: <IsolationIcon />,
  },
  {
    id: 4,
    number: "04",
    title: "Material",
    description:
      "Floor-to-ceiling glass blurs the line between the inside space and nature. Experience the best of both worlds",
    icon: <MaterialIcon />,
  },
];

// ── Feature Card ─────────────────────────────────────────────

interface FeatureCardProps {
  feature: Feature;
  isLightMode: boolean;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border",
        "transition-colors duration-300",
        "hover:border-primary-400",
      )}
      style={{
        backgroundColor: "var(--color-feature-card)",
        borderColor: "var(--color-border)",
        minHeight: "220px",
        boxShadow:
          "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
      }}
    >
      {/* Watermark — faded pillar name */}
      <div
        className="absolute bottom-0 left-0 leading-none select-none pointer-events-none font-family-playfair"
        style={{
          fontSize: "clamp(60px, 10vw, 100px)",
          fontWeight: 700,
          color: "var(--color-feature-watermark)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          transform: "translate(-2%, 20%)",
          opacity: 0.5,
        }}
      >
        {feature.title}
      </div>

      {/* Content — drives card height */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4">
        <div>{feature.icon}</div>
        <p
          className="font-family-inter"
          style={{
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: "var(--color-text-secondary)",
          }}
        >
          {feature.number}
        </p>
        <h3
          className="font-family-inter"
          style={{
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "120%",
            letterSpacing: "-0.1px",
            color: "var(--color-text-primary)",
          }}
        >
          {feature.title}
        </h3>
        <p
          className="font-family-inter pb-8"
          style={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "160%",
            letterSpacing: "-0.1px",
            color: "var(--color-text-secondary)",
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
};

// ── Section ──────────────────────────────────────────────────

const Features = ({
  heading = "Built For Skylarking",
  description = "Between jungle and ocean. Far from everything else. The only thing you have to do is nothing",
  features = defaultFeatures,
}: FeaturesProps) => {
  return (
    <section
      id="features"
      className="py-16 md:py-24 px-6 md:px-12 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-bg-white)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-3" style={{ color: "var(--color-text-primary)" }}>
            {heading}
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
            {description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
