"use client";

import React, { useRef, useEffect, useState } from "react";
import Button from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";

function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const update = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };
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

interface HeroProps {
  videoSrc?: string;
  posterImage?: string;
}

function Hero({
  videoSrc = "/hero-video.mp4",
  posterImage = "/hero-poster.png",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDark = useIsDark();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => {
        video.currentTime = 0;
        video.play();
      };
      video.addEventListener("ended", handleEnded);
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log("Video autoplay failed:", error);
        }
      };
      playVideo();
      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  // Close on resize past md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Invisible overlay — closes menu on tap anywhere outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={closeMenu}
          onTouchStart={closeMenu}
        />
      )}

      {/* Nav container */}
      <div
        className="relative z-20 transition-all duration-300"
        style={{
          backgroundColor: menuOpen ? "rgba(225,225,225,0.15)" : "transparent",
          backdropFilter: menuOpen ? "blur(10px)" : "none",
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <div
            className="text-2xl font-bold md:text-3xl font-family-playfair"
            style={{ color: "#ffffff" }}
          >
            SKYLARK
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="md"
              className="border border-white/30"
              onClick={() => scrollToSection("cta")}
            >
              Stay With Us
            </Button>
          </div>

          {/* Mobile hamburger — stops propagation so overlay doesn't immediately close */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer z-30 relative"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transform: menuOpen
                  ? "translateY(6.5px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transform: menuOpen
                  ? "translateY(-6.5px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </header>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? "200px" : "0" }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70 font-family-inter tracking-wide">
                Toggle Dark Mode
              </span>
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="md"
              className="w-full border border-white/30 justify-center"
              onClick={() => scrollToSection("cta")}
            >
              Stay With Us
            </Button>
          </div>
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
          className="h-full w-full object-cover pointer-events-none"
          preload="auto"
          tabIndex={-1}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${posterImage})` }}
          />
        </video>

        {/* Theme-aware scrim */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 55%, rgba(12,10,8,0.97) 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.92) 100%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <h1
            className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl font-family-playfair"
            style={{ color: "#ffffff" }}
          >
            Your private coastal retreat
          </h1>

          <p
            className="mb-12 text-lg md:text-xl lg:text-2xl font-family-inter leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Sleep to knocking bamboo. Wake to crashing waves. Exist exactly{" "}
            <br className="hidden md:block" />
            as you are on Trinidad&apos;s untouched northern coast
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="primary"
              size="lg"
              className="min-w-[160px]"
              onClick={() => scrollToSection("bento")}
            >
              Discover Villa
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[160px]"
              onClick={() =>
                window.open("https://forms.gle/uR7b5ZSPfUnZtHeA6", "_blank")
              }
            >
              Check Availability
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="animate-bounce">
          <div
            className="h-8 w-5 rounded-full border-2 transition-colors duration-300"
            style={{ borderColor: "rgba(255,255,255,0.5)" }}
          >
            <div
              className="mx-auto mt-2 h-2 w-1 animate-pulse rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
