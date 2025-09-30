'use client';

import Button from '@/components/Button';

export default function Cta() {
  const formUrl = 'https://forms.gle/uR7b5ZSPfUnZtHeA6';
  
  const handleCheckAvailability = () => {
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cta" className="py-16 md:py-24 px-6 md:px-12 bg-neutral-800">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl text-shade-white">
          Inquire About Your Stay
        </h2>
        
        {/* Description */}
        <p className="p-normal text-neutral-400 mb-8 md:mb-10 max-w-2xl mx-auto">
          Skylark Villa accepts a limited number of bookings each season. <br className="hidden md:block" />
          Submit your preferred dates and we&apos;ll confirm availability <br className="hidden md:block" />
          within 1 - 2 business days
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
}