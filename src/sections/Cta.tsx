'use client';

import React from 'react';
import Button from '@/components/Button';

interface CtaProps {
  formUrl: string;
}

const Cta: React.FC<CtaProps> = ({ formUrl }) => {
  const handleCheckAvailability = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-neutral-800">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl text-shade-white">
          Reserve Your Exclusive Retreat
        </h2>
        
        {/* Description */}
        <p className="p-normal text-neutral-400 mb-8 md:mb-10 max-w-2xl mx-auto">
          To start the process please click the button below and fill out the 
          form for pricing information and booking dates
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
    </section>
  );
};

export default Cta;