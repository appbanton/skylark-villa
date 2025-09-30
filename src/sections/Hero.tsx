'use client';

import React, { useRef, useEffect } from 'react';
import Button from '@/components/Button';

interface HeroProps {
  videoSrc?: string;
  posterImage?: string;
}

function Hero({ 
  videoSrc = '/hero-video.mp4', 
  posterImage = '/hero-poster.png' 
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure seamless looping
      const handleEnded = () => {
        video.currentTime = 0;
        video.play();
      };

      video.addEventListener('ended', handleEnded);
      
      // Ensure video plays on component mount
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };

      playVideo();

      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="text-2xl font-bold text-white md:text-3xl font-family-playfair">
          SKYLARK
        </div>
        <Button 
          variant="ghost" 
          size="md" 
          className="border border-white/30"
          onClick={() => scrollToSection('cta')}
        >
          Stay With Us
        </Button>
      </header>

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
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${posterImage})` }}
          />
        </video>
        
        {/* Video Overlay - also blocks interaction */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl font-family-playfair">
            Your private coastal retreat
          </h1>
          
          <p className="mb-12 text-lg text-neutral-400 md:text-xl lg:text-2xl font-family-inter leading-[1.7]">
            Sleep to knocking bamboo. Wake to crashing waves. Exist exactly <br className="hidden md:block" />
            as you are on Trinidad's untouched northern coast
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              variant="primary" 
              size="lg"
              className="min-w-[160px]"
              onClick={() => scrollToSection('bento')}
            >
              Discover Villa
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="min-w-[160px]"
              onClick={() => window.open('https://forms.gle/uR7b5ZSPfUnZtHeA6', '_blank')}
            >
              Check Availability
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-white/50">
            <div className="mx-auto mt-2 h-2 w-1 animate-pulse rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;