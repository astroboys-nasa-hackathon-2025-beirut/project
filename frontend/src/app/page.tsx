'use client';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlaceHolderVideos } from '@/lib/placeholder-videos';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Microscope, Telescope } from 'lucide-react';

const keyTerms = [
  { term: "Needle in a Haystack Problem", definition: "Refers to the challenge of finding a rare, significant signal (like an exoplanet) within a vast amount of noisy data." },
  { term: "Kepler, K2, and TESS", definition: "Space telescopes launched by NASA to discover exoplanets using the transit method." },
  { term: "Light Curve", definition: "A graph showing the brightness of a star over time. Dips can indicate a planet passing in front of it." },
  { term: "Transit", definition: "An event where a planet passes directly between a star and an observer, causing a temporary dip in the star's brightness." },
  { term: "Exoplanet", definition: "A planet that orbits a star outside our solar system." },
  { term: "Planetary Signal", definition: "The specific pattern in a light curve that suggests the presence of a transiting exoplanet." },
  { term: "Manual Processing", definition: "The slow, labor-intensive process of humans visually inspecting light curves to find potential exoplanets." },
  { term: "Data Imbalance", definition: "A situation in datasets where one type of data (e.g., non-planet signals) far outnumbers another (e.g., true planet signals), making AI training difficult." },
];

export default function Home() {
  const logoImage = PlaceHolderImages.find(img => img.id === 'team_logo');
  const backgroundVideo = PlaceHolderVideos.find(video => video.id === 'space3');

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* Background video */}
     {backgroundVideo && (
  <video
    autoPlay
    loop
    muted
    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    style={{
      transform: 'scale(1.1)',  // zoom out (make the video slightly larger so it fills the screen nicely)
      filter: 'brightness(0.8)', // optional: darken it a bit so content stands out
    }}
    ref={(video) => {
      if (video) video.playbackRate = 0.7; // slow down to 40% speed
    }}
  >
    <source src={backgroundVideo.videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
)}


      {/* Page content */}
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">

        {/* Hero Section */}
        <section className="text-center">
          {logoImage && (
            <div className="flex justify-center mb-8">
              <Image
                src={logoImage.imageUrl}
                alt="Astro Boys Logo"
                width={250}
                height={250}
                className="rounded-full shadow-lg shadow-cyan-500/20"
                data-ai-hint={logoImage.imageHint}
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            AI Exoplanet Explorer
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl">
            A project by <span className="font-bold text-accent">Astro Boys</span> to revolutionize exoplanet discovery using AI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg h-14 px-10">
              <Link href="/upload">
                <Microscope className="mr-3 h-6 w-6" />
                For Scientists
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto text-lg h-14 px-10">
              <Link href="/simulator">
                <Telescope className="mr-3 h-6 w-6" />
                For Non-Scientists
              </Link>
            </Button>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="mt-24 md:mt-32 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
              The Cosmic Challenge
            </h2>
          </div>
          <Card className="mt-8 bg-card/80">
            <CardContent className="p-8 text-lg text-foreground/90 space-y-4">
              <p>
                Space missions like Kepler, K2, and TESS generate an overwhelming amount of light curve data from distant stars. Identifying potential exoplanets from this data is like finding a needle in a cosmic haystack.
              </p>
              <p>
                Manual analysis is incredibly slow and prone to errors. Our solution leverages AI to automate this process, efficiently analyzing vast datasets to pinpoint potential new worlds and providing clear, explainable predictions.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Terms Section */}
        <section className="mt-24 md:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
              Key Terms
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Hover over a term to learn more.
            </p>
          </div>
          <TooltipProvider>
            <div className="flex flex-wrap justify-center gap-4">
              {keyTerms.map((item) => (
                <Tooltip key={item.term} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="text-center text-sm font-medium border-2 border-border rounded-full px-4 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent">
                      {item.term}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-center p-3">
                    <p>{item.definition}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </section>

      </div>
    </div>
  );
}
