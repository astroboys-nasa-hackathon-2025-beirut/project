'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Orbit } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useRef, useEffect } from 'react';
import { PlaceHolderAudios } from '@/lib/placeholder-audios';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/upload', label: 'Upload' },
  { href: '/simulator', label: 'Simulator' },
  { href: '/explanation', label: 'Explanation' },
  { href: '/learn', label: 'Learn' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Get the slash sound effect from your JSON
  const clickSound = PlaceHolderAudios.find(audio => audio.id === 'slash');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const playClickSound = () => {
    if (audioRef.current && isClient) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Sound effect play failed:', error);
      });
    }
  };

  const handleNavClick = (href: string) => {
    playClickSound();
    setMobileMenuOpen(false);
  };

  // Don't render audio element until client-side
  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Orbit className="h-6 w-6 text-accent ml-4" />
            <span className="hidden font-bold sm:inline-block font-headline">
              AI Exoplanet Explorer
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-accent',
                  pathname === link.href ? 'text-accent' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mb-8 flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <Orbit className="mr-2 h-6 w-6 text-accent" />
                  <span className="font-bold font-headline">AI Exoplanet Explorer</span>
                </Link>
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-lg',
                        pathname === link.href ? 'text-accent' : 'text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Hidden audio element for click sound */}
      <audio ref={audioRef} preload="auto">
        <source src={clickSound?.audioUrl} type="audio/mpeg" />
      </audio>
      
      <div className="container flex h-14 items-center">
        <Link 
          href="/" 
          className="mr-6 flex items-center space-x-2"
          onClick={() => playClickSound()}
        >
          <Orbit className="h-6 w-6 text-accent ml-4" />
          <span className="hidden font-bold sm:inline-block font-headline">
            AI Exoplanet Explorer
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => playClickSound()}
              className={cn(
                'transition-colors hover:text-accent cursor-pointer',
                pathname === link.href ? 'text-accent' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => playClickSound()}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link 
                href="/" 
                className="mb-8 flex items-center" 
                onClick={() => handleNavClick('/')}
              >
                <Orbit className="mr-2 h-6 w-6 text-accent" />
                <span className="font-bold font-headline">AI Exoplanet Explorer</span>
              </Link>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      'text-lg cursor-pointer',
                      pathname === link.href ? 'text-accent' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}