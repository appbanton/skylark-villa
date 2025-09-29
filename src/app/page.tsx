import Hero from '@/sections/Hero';
import Bento from '@/sections/Bento';

export default function HomePage() {
  return (
    <main>
      <Hero 
        videoSrc="/hero-video.mp4" 
        posterImage="/hero-poster.jpg" 
      />
      <Bento/>
      {/* Other sections will go here */}
    </main>
  );
}