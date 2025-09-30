import Hero from '@/sections/Hero';
import Bento from '@/sections/Bento';
import Features  from '@/sections/Features';
import Cta from '@/sections/Cta';
import Footer from '@/sections/Footer';

export default function HomePage() {
  return (
    <main>
      <Hero 
        videoSrc="/hero-video.mp4" 
        posterImage="/hero-poster.jpg" 
      />
      <Bento/>
      <Features/>
      <Cta />
      <Footer />
    </main>
  );
}