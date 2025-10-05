'use client';

import { UploadBox } from '@/components/upload-box';
import { PredictionCard } from '@/components/prediction-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, TestTube } from 'lucide-react';
import { usePrediction } from '@/contexts/PredictionContext';

export default function UploadPage() {
  const { prediction } = usePrediction();

  // Calculate average confidence properly
  const calculateAverageConfidence = () => {
    if (!prediction?.results || prediction.results.length === 0) return 0;
    
    let totalConfidence = 0;
    let validEntries = 0;
    
    prediction.results.forEach((result, index) => {
      const confidence = result[index]?.confidence;
      if (confidence !== undefined && confidence !== null) {
        // Convert to number if it's a string, otherwise use as-is
        const confidenceValue = typeof confidence === 'string' ? parseFloat(confidence) : confidence;
        if (!isNaN(confidenceValue)) {
          totalConfidence += confidenceValue;
          validEntries++;
        }
      }
    });
    
    return validEntries > 0 ? Math.round((totalConfidence / validEntries)) : 0;
  };

  const getPredictionText = () => {
    if (!prediction) return "Awaiting Data...";
    
    const confirmedCount = prediction.results.filter((result, index) => {
      return result[index]?.label === 'Confirmed Planet';
    }).length;
    
    const totalCount = prediction.results.length;
    
    if (confirmedCount === 0) {
      return "No Confirmed Planets";
    } else {
      return `${confirmedCount}/${totalCount} Confirmed Planets`;
    }
  };

  const averageConfidence = calculateAverageConfidence();
  const predictionText = getPredictionText();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Upload Data for Analysis
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Our AI can analyze raw tabular data from missions like Kepler. Upload a CSV file and let our system detect potential exoplanet candidates.
        </p>
      </div>
      
      <div className="relative p-px rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
        <div className="rounded-[11px] bg-background/90 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            
            {/* CSV Upload Section */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-headline font-semibold text-foreground">Raw/Tabular Data (CSV)</h2>
                  <p className="text-muted-foreground">For Kepler, K2, or TESS datasets</p>
                </div>
              </div>
              
              <div className="space-y-2 pl-4 border-l-2 border-accent/20">
                  <h3 className="font-semibold text-foreground/90">Instructions:</h3>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                      <li>Ensure your file is in CSV format.</li>
                      <li>The data should contain flux values over time.</li>
                      <li>Click below to select or drag and drop your file.</li>
                      <li>Our AI will process the data to detect planetary signals.</li>
                  </ol>
              </div>
              <UploadBox fileType="CSV" />
            </div>

            {/* Analysis & Prediction Section */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 rounded-lg bg-card/60 border border-border h-full relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-grid-cyan-500/10 bg-grid-14 [mask-image:linear-gradient(to_bottom,white_0%,white_75%,transparent_100%)]"
                    style={{ backgroundSize: '3rem 3rem' }}
                ></div>
                <div className="relative z-10 flex flex-col items-center justify-center w-full space-y-4">
                    <div className="flex items-center gap-3 text-lg font-headline text-accent">
                        <TestTube className="w-6 h-6" />
                        <span>Analysis Panel</span>
                    </div>
                    <PredictionCard 
                      prediction={predictionText} 
                      confidence={averageConfidence} 
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}