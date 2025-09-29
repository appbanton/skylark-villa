import Hero from '@/sections/Hero';
import Bento from '@/sections/Bento';
import Features  from '@/sections/Features';

export default function HomePage() {
  return (
    <main>
      <Hero 
        videoSrc="/hero-video.mp4" 
        posterImage="/hero-poster.jpg" 
      />
      <Bento/>
      <Features/>
      {/* Other sections will go here */}
    </main>
  );
}