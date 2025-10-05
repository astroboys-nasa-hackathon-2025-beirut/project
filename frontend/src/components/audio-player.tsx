'use client';

import { PlaceHolderAudios } from '@/lib/placeholder-audios';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolume, setShowVolume] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout>();

  const backgroundAudio = PlaceHolderAudios.find(audio => audio.id === 'background1');

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Playback failed:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('audio-volume', newVolume.toString());
    }
  };

  const toggleMute = () => {
    const newVolume = volume === 0 ? 0.3 : 0;
    handleVolumeChange(newVolume);
  };

  const handleVolumeMouseEnter = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolume(true);
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolume(false);
    }, 500);
  };

  // Set client flag and load saved state
  useEffect(() => {
    setIsClient(true);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'audio-playing') {
        setIsPlaying(e.newValue === 'true');
      }
      if (e.key === 'audio-volume') {
        const newVolume = parseFloat(e.newValue || '0.3');
        setVolume(newVolume);
        if (audioRef.current) {
          audioRef.current.volume = newVolume;
        }
      }
    };

    // Load saved state
    const savedVolume = localStorage.getItem('audio-volume');
    const savedPlaying = localStorage.getItem('audio-playing');
    
    if (savedVolume) {
      const volumeValue = parseFloat(savedVolume);
      setVolume(volumeValue);
    }
    
    // Set playing state but don't auto-play (browser restriction)
    if (savedPlaying === 'true') {
      setIsPlaying(true);
    }

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  // Start audio playback when isPlaying becomes true AND we're on client
  useEffect(() => {
    if (!isClient || !audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.log('Auto-play blocked, user interaction required:', error);
        // If auto-play fails, set isPlaying back to false
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isClient]);

  // Save playing state to localStorage
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('audio-playing', isPlaying.toString());
  }, [isPlaying, isClient]);

  // Initialize audio properties
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = volume;
    }
    
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, [volume]);

  // Don't render anything until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-accent/30 shadow-lg opacity-0">
        <div className="flex items-center gap-2">
          <div className="w-20 opacity-0">
            <button>🔈</button>
            <input type="range" />
          </div>
          <button className="bg-accent p-2 rounded-full">
            <span className="w-4 h-4">▶️</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-accent/30 shadow-lg">
      <audio 
        ref={audioRef}
        loop
        preload="metadata"
      >
        <source src={backgroundAudio?.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center gap-2">
        <div 
          className={`flex items-center gap-2 transition-all duration-300 ${
            showVolume ? 'w-20 opacity-100' : 'w-0 opacity-0 overflow-hidden'
          }`}
          onMouseEnter={handleVolumeMouseEnter}
          onMouseLeave={handleVolumeMouseLeave}
        >
          <button
            onClick={toggleMute}
            className="text-foreground/70 hover:text-accent transition-colors text-sm shrink-0"
            aria-label={volume === 0 ? "Unmute" : "Mute"}
          >
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔈' : '🔊'}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            onMouseDown={handleVolumeMouseEnter}
            className="w-full accent-accent cursor-pointer"
            aria-label="Volume control"
          />
        </div>

        <div
          onMouseEnter={handleVolumeMouseEnter}
          onMouseLeave={handleVolumeMouseLeave}
        >
          <button
            onClick={togglePlayback}
            className="bg-accent hover:bg-accent/90 text-primary-foreground p-2 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
            aria-label={isPlaying ? "Pause space atmosphere" : "Play space atmosphere"}
          >
            {isPlaying ? (
              <span className="flex items-center justify-center w-4 h-4">⏸️</span>
            ) : (
              <span className="flex items-center justify-center w-4 h-4">▶️</span>
            )}
          </button>
        </div>
      </div>

      {isPlaying && (
        <div className="absolute -top-2 -right-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
      )}
    </div>
  );
}