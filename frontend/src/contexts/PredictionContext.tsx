'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PredictionResult {
  [key: number]: {
    label: string;
    confidence: number;
  };
}

export interface PredictionResponse {
  id: string;
  results: PredictionResult[];
}

interface PredictionContextType {
  prediction: PredictionResponse | null;
  setPrediction: (prediction: PredictionResponse | null) => void;
  clearPrediction: () => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const clearPrediction = () => {
    setPrediction(null);
  };

  return (
    <PredictionContext.Provider value={{ 
      prediction, 
      setPrediction, 
      clearPrediction 
    }}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePrediction() {
  const context = useContext(PredictionContext);
  if (context === undefined) {
    throw new Error('usePrediction must be used within a PredictionProvider');
  }
  return context;
}