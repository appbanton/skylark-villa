import Hero from '@/sections/Hero';
import Bento from '@/sections/Bento';
import Features  from '@/sections/Features';
import Cta from '@/sections/Cta';

export default function HomePage() {
  return (
    <main>
      <Hero 
        videoSrc="/hero-video.mp4" 
        posterImage="/hero-poster.jpg" 
      />
      <Bento/>
      <Features/>
      <Cta formUrl="https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/viewform" />
    </main>
  );
}