"use client";

import Button from "@/components/Button";
import { SparklesCore } from "@/components/ui/Sparkles";

export default function Cta() {
  const formUrl = "https://forms.gle/uR7b5ZSPfUnZtHeA6";

  const handleCheckAvailability = () => {
    // Fire GA4 event
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof window !== "undefined" && typeof w.gtag === "function") {
      w.gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: "check_availability",
      });
    }
    window.open(formUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="cta"
      className="py-16 md:py-24 px-6 md:px-12 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-bg-white)" }}
    >
      <div className="w-full">
        {/* Card */}
        <div
          className="relative rounded-2xl border px-8 py-10 md:px-14 md:py-14 text-center overflow-hidden transition-colors duration-300"
          style={{
            backgroundColor: "var(--color-cta-card)",
            borderColor: "var(--color-cta-border)",
          }}
        >
          {/* Sparkles layer */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={50}
              className="w-full h-full"
              particleColor="var(--color-cta-particle)"
              speed={1.5}
            />
          </div>

          {/* Content above sparkles */}
          <div className="relative z-10">
            {/* Heading */}
            <h2
              className="mb-6"
              style={{ color: "var(--color-cta-heading)", fontWeight: 300 }}
            >
              Inquire About Your Stay
            </h2>

            {/* Description */}
            <p
              className="mb-8 md:mb-10 max-w-2xl mx-auto"
              style={{
                color: "var(--color-cta-body)",
                opacity: 0.7,
                fontSize: "16px",
                lineHeight: "170%",
                fontFamily: "var(--font-inter)",
              }}
            >
              Skylark Villa accepts a limited number of bookings each season.
              Submit your preferred dates and we&apos;ll confirm availability
              within one to two business days
            </p>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleCheckAvailability}
              className="min-w-[200px]"
            >
              Check Availability
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
