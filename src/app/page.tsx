import Hero from '@/sections/Hero';

export default function HomePage() {
  return (
    <main>
      <Hero 
        videoSrc="/hero-video.mp4" 
        posterImage="/hero-poster.jpg" 
      />
      {/* Other sections will go here */}
    </main>
  );
}