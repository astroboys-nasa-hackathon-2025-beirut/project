import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import AudioPlayer from '@/components/audio-player';
import { PredictionProvider } from '@/contexts/PredictionContext'; // Add this import

export const metadata: Metadata = {
  title: 'AI Exoplanet Explorer',
  description: 'Discover new worlds with AI-powered exoplanet detection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <PredictionProvider> {/* Wrap everything with PredictionProvider */}
          <div className="relative flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
          <AudioPlayer />
        </PredictionProvider>
      </body>
    </html>
  );
}