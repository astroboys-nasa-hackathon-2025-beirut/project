'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { funFacts, faqs, references } from '@/lib/learn-data';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { PlaceHolderVideos } from '@/lib/placeholder-videos';
import { useState } from 'react';

export default function LearnPage() {
  const backgroundVideo = PlaceHolderVideos.find(video => video.id === 'solar_system');
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Show first 3 facts/faqs initially, then all when expanded
  const displayedFacts = showAllFacts ? funFacts : funFacts.slice(0, 3);
  const displayedFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

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
            transform: 'scale(1.1)',
            filter: 'brightness(0.8)',
          }}
          ref={(video) => {
            if (video) video.playbackRate = 0.6;
          }}
        >
          <source src={backgroundVideo.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Page content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-24">

          {/* NASA Exoplanet Visualization Section - NEW */}
          <section className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline text-center mb-4">
              Explore Exoplanet TOI-969_b
            </h1>
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-2xl"> {/* 16:9 aspect ratio */}
                  <iframe
                    src="https://eyes.nasa.gov/apps/exo/#/planet/TOI-969_b"
                    title="TOI-969_b Exoplanet Visualization"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
                <div className="text-center pt-4">
                  <a 
                    href="https://eyes.nasa.gov/apps/exo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:scale-105 shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Explore Full NASA Visualization Tool
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Dive deeper into NASA's exoplanet discoveries and visualizations
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Fun Facts Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline text-center mb-12">
              Cosmic Curiosities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedFacts.map((item, index) => (
                <Card key={index} className="flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/20 bg-background/80 backdrop-blur-sm">
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="p-3 bg-accent/10 rounded-full">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="font-semibold leading-tight text-base font-body">{item.fact}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground flex-grow">
                    <p>{item.explanation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Read More Button for Facts */}
            {funFacts.length > 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllFacts(!showAllFacts)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-background/80 text-foreground border border-border rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 font-semibold hover:scale-105 backdrop-blur-sm"
                >
                  {showAllFacts ? (
                    <>
                      Show Less
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show More Cosmic Facts
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-sm text-muted-foreground mt-2">
                  {showAllFacts ? `Showing all ${funFacts.length} facts` : `Showing 3 of ${funFacts.length} facts`}
                </p>
              </div>
            )}
          </section>
          
          {/* FAQs Section */}
          <section>
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {displayedFaqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:text-accent transition-colors duration-300 py-6 text-base group bg-background/80 backdrop-blur-sm rounded-lg px-4">
                    <div className="flex items-center gap-4">
                      <item.icon className="w-6 h-6 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-16 bg-background/60 backdrop-blur-sm rounded-b-lg px-4 py-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Read More Button for FAQs */}
            {faqs.length > 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-background/80 text-foreground border border-border rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 font-semibold hover:scale-105 backdrop-blur-sm"
                >
                  {showAllFaqs ? (
                    <>
                      Show Less Questions
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show More Questions
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-sm text-muted-foreground mt-2">
                  {showAllFaqs ? `Showing all ${faqs.length} questions` : `Showing 3 of ${faqs.length} questions`}
                </p>
              </div>
            )}
          </section>

          {/* References Section */}
          <section>
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl text-center mb-12">
              References & Further Reading
            </h2>
            <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-6">
              <ul className="space-y-4">
                {references.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-accent hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}