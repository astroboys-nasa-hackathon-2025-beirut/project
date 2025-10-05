'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Sigma, Telescope, Orbit, Wind, Sun, Star, Scaling, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialFeatures = [
  { 
    name: 'Log Planet Insolation', 
    value: 0, 
    min: -1.73, 
    max: 7.04, 
    step: 0.01,
    icon: Sun, 
    color: 'hsl(var(--chart-1))',
    description: "A measure of how much energy the planet gets from its star, adjusted to make large and small values easier to compare. Think of it as 'sunlight level'.",
    key: 'log_planet_insol'
  },
  { 
    name: 'Planet Radius', 
    value: 1, 
    min: 0.08, 
    max: 200346.0,
    step: 1, 
    icon: Star, 
    color: 'hsl(var(--chart-2))',
    description: "How big the planet is compared to Earth. Larger planets block more starlight during a transit.",
    key: 'planet_radius'
  },
  { 
    name: 'Signal-to-Noise', 
    value: 10, 
    min: 0.0, 
    max: 9054.7, 
    step: 1,
    icon: Sigma, 
    color: 'hsl(var(--chart-3))',
    description: "How clear the planet's signal is compared to random noise. A high value means we're more confident it's a real signal.",
    key: 'signal_to_noise'
  },
  { 
    name: 'Planet/Star Ratio', 
    value: 1, 
    min: 0.15, 
    max: 10905.88, 
    step: 0.01,
    icon: Scaling, 
    color: 'hsl(var(--chart-4))',
    description: "How big the planet is compared to its star. A larger planet orbiting a smaller star is easier to spot.",
    key: 'planet_to_star_ratio'
  },
  { 
    name: 'Planet Temp (K)', 
    value: 300, 
    min: 92.0, 
    max: 14667.0, 
    step: 1,
    icon: Wind, 
    color: 'hsl(var(--chart-5))',
    description: "The estimated surface temperature of the planet. This helps us guess if it's rocky, icy, or gassy.",
    key: 'planet_teq'
  },
  { 
    name: 'Planet Insolation', 
    value: 1, 
    min: 0.02, 
    max: 10947554.55, 
    step: 0.01,
    icon: Sun, 
    color: 'hsl(var(--accent))',
    description: "The total amount of energy the planet receives from its star. This directly relates to how hot it might be.",
    key: 'planet_insol'
  },
  { 
    name: 'Transit Duration (hrs)', 
    value: 2, 
    min: 0.1, 
    max: 138.54, 
    step: 0.1,
    icon: Telescope, 
    color: 'hsl(var(--chart-1))',
    description: "How long the planet takes to pass in front of its star. This depends on the planet's speed and the star's size.",
    key: 'transit_duration'
  },
  { 
    name: 'Orbital Period (days)', 
    value: 30, 
    min: 0.16, 
    max: 1825.05, 
    step: 0.01,
    icon: Orbit, 
    color: 'hsl(var(--chart-2))',
    description: "How long it takes for the planet to complete one 'year' around its star. Shorter periods are easier to detect.",
    key: 'orbital_period'
  },
  { 
    name: 'Impact Parameter', 
    value: 0.5, 
    min: 0.0, 
    max: 100.81, 
    step: 0.01,
    icon: Search, 
    color: 'hsl(var(--chart-3))',
    description: "Describes how centered the transit is. A value of 0 is a direct hit across the middle, while a high value means it just skims the edge.",
    key: 'impact_parameter'
  },
  { 
    name: 'Orbital Velocity Proxy', 
    value: 0.5, 
    min: 0.08, 
    max: 1.83, 
    step: 0.01,
    icon: Orbit, 
    color: 'hsl(var(--chart-4))',
    description: "A value related to how fast the planet is moving in its orbit. Planets closer to their stars move faster.",
    key: 'orbital_velocity_proxy'
  },
  { 
    name: 'Log Orbital Period', 
    value: 1.0, 
    min: -0.79, 
    max: 3.26, 
    step: 0.01,
    icon: Telescope, 
    color: 'hsl(var(--chart-5))',
    description: "The orbital period again, but adjusted using a logarithm to handle planets with very short and very long orbits more easily.",
    key: 'log_orbital_period'
  },
  { 
    name: 'Temperature Ratio', 
    value: 2.0, 
    min: 0.02, 
    max: 4.29, 
    step: 0.01,
    icon: Sun, 
    color: 'hsl(var(--accent))',
    description: "The ratio of the planet's temperature to the star's temperature. This helps understand the planet's thermal environment relative to its star.",
    key: 'temp_ratio'
  },
];

export default function SimulatorPage() {
  const [features, setFeatures] = useState(initialFeatures);
  const [confidence, setConfidence] = useState(0);
  const [prediction, setPrediction] = useState('Awaiting Prediction');
  const [isPredicting, setIsPredicting] = useState(false);
  const { toast } = useToast();
  const URL = "https://6f757f214505.ngrok-free.app";

  const handlePredict = async () => {
  setIsPredicting(true);
  
  try {
    // Prepare the data for the backend
    const requestData = {
      log_planet_insol: features.find(f => f.key === 'log_planet_insol')?.value || 0,
      planet_radius: features.find(f => f.key === 'planet_radius')?.value || 0,
      signal_to_noise: features.find(f => f.key === 'signal_to_noise')?.value || 0,
      planet_to_star_ratio: features.find(f => f.key === 'planet_to_star_ratio')?.value || 0,
      planet_teq: features.find(f => f.key === 'planet_teq')?.value || 0,
      planet_insol: features.find(f => f.key === 'planet_insol')?.value || 0,
      transit_duration: features.find(f => f.key === 'transit_duration')?.value || 0,
      orbital_period: features.find(f => f.key === 'orbital_period')?.value || 0,
        impact_parameter: features.find(f => f.key === 'impact_parameter')?.value || 0,

  orbital_velocity_proxy: features.find(f => f.key === 'orbital_velocity_proxy')?.value || 0,
  log_orbital_period: features.find(f => f.key === 'log_orbital_period')?.value || 0,
  temp_ratio: features.find(f => f.key === 'temp_ratio')?.value || 0
    };

  //   {
  // "log_planet_insol": 0,
  // "planet_radius": 0,
  // "signal_to_noise": 0,
  // "planet_to_star_ratio": 0,
  // "planet_teq": 0,
  // "planet_insol": 0,
  // "transit_duration": 0,
  // "orbital_period": 0,
  // "impact_parameter": 0,
  // "orbital_velocity_proxy": 0,
  // "log_orbital_period": 0,
  // "temp_ratio": 0

    console.log('Sending data to backend:', requestData);

    const response = await fetch(`${URL}/predictions/simplified_exoplanet_or_not`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '*'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Backend response:', result);

    // Process the actual response structure from backend
    if (result.results && result.results.length > 0) {
      const firstResult = result.results[0];
      const predictionData = firstResult[0]; // Access the nested object
      
      if (predictionData) {
        const label = predictionData.label; // "False Positive"
        const confidenceString = predictionData.confidence; // "95.59%"
        
        // Convert confidence string to number
        const confidenceValue = parseFloat(confidenceString.replace('%', ''));
        
        // Map the label to your prediction system
        let newPrediction = label;
        
        setConfidence(confidenceValue);
        setPrediction(newPrediction);

        toast({
          title: 'Prediction Complete!',
          description: `AI prediction: ${label} with ${confidenceValue}% confidence`,
        });
      } else {
        throw new Error('Invalid response format');
      }
    } else {
      throw new Error('No results in response');
    }

  } catch (error) {
    console.error('Error predicting:', error);
    
    // Fallback to mock prediction if backend fails
    const totalScore = features.reduce((acc, feature) => {
      const normalizedValue = (feature.value - feature.min) / (feature.max - feature.min);
      return acc + normalizedValue;
    }, 0);
    const averageScore = totalScore / features.length;
    const mockConfidence = Math.min(100, Math.max(0, Math.round(averageScore * 150)));
    
    setConfidence(mockConfidence);

    if (mockConfidence > 85) {
      setPrediction('High Candidate');
    } else if (mockConfidence > 65) {
      setPrediction('Exoplanet Candidate');
    } else if (mockConfidence > 40) {
      setPrediction('Potential Candidate');
    } else {
      setPrediction('Low Likelihood');
    }

    toast({
      title: 'Using Mock Prediction',
      description: 'Backend response format issue, using simulated results.',
      variant: 'destructive'
    });
  } finally {
    setIsPredicting(false);
  }
};

  const handleSliderChange = (index: number, value: number) => {
    const newFeatures = [...features];
    newFeatures[index].value = value;
    setFeatures(newFeatures);
  };

  const handleInputChange = (index: number, value: string) => {
    const numValue = Number(value);
    const feature = features[index];
    if (!isNaN(numValue) && numValue >= feature.min && numValue <= feature.max) {
      handleSliderChange(index, numValue);
    }
  };

  const getRingColor = () => {
    if (prediction === 'Awaiting Prediction') return 'hsl(var(--muted-foreground))';
    if (confidence > 85) return 'hsl(var(--accent))';
    if (confidence > 65) return 'hsl(var(--primary))';
    if (confidence > 40) return 'hsl(var(--chart-4))';
    return 'hsl(var(--muted-foreground))';
  };

  return (
    <div className="container mx-auto px-4 py-12 overflow-hidden">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Exoplanet AI Simulator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Play with the cosmic sliders, then hit Predict to see how different parameters influence the AI's prediction!
        </p>
      </div>

      <div className="relative p-px rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30">
        <div className="rounded-[11px] bg-background/95 p-8 backdrop-blur-sm">
          <div className="flex flex-col xl:flex-row gap-8 items-start justify-between">
            
            {/* Sliders Control Panel */}
            <div className="w-full xl:w-2/3">
                <TooltipProvider>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                        {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div 
                            key={feature.name}
                            className="space-y-3 group"
                            >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center justify-between text-sm cursor-help">
                                        <label className="font-medium flex items-center gap-2">
                                        <IconComponent 
                                          className="w-4 h-4 transition-all duration-300 group-hover:scale-125" 
                                          style={{ 
                                            color: feature.color,
                                            filter: 'drop-shadow(0 0 3px ' + feature.color + ')'
                                          }}
                                        />
                                        <span>{feature.name}</span>
                                        </label>
                                        <span className="font-mono text-xs" style={{ color: feature.color }}>
                                            {Number(feature.value).toPrecision(3)}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">{feature.description}</p>
                                </TooltipContent>
                            </Tooltip>
                            <div className="flex items-center gap-2">
                                <Slider
                                min={feature.min}
                                max={feature.max}
                                step={feature.step}
                                value={[feature.value]}
                                onValueChange={(value) => handleSliderChange(index, value[0])}
                                className="w-full"
                                style={{ '--slider-thumb-color': feature.color, '--slider-range-color': feature.color } as React.CSSProperties}
                                />
                                <Input
                                type="number"
                                min={feature.min}
                                max={feature.max}
                                step={feature.step}
                                value={feature.value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="w-20 h-8 text-xs p-1"
                                />
                            </div>
                            </div>
                        );
                        })}
                    </div>
                </TooltipProvider>
              <div className="mt-8 text-center">
                <Button 
                  onClick={handlePredict} 
                  size="lg" 
                  disabled={isPredicting}
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-purple-500 to-cyan-500 px-8 font-medium text-primary-foreground transition-all duration-500 hover:bg-accent hover:bg-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center">
                    {isPredicting ? 'Predicting...' : 'Predict'}
                    <ChevronRight className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${isPredicting ? '' : 'group-hover:translate-x-1'}`} />
                  </span>
                  <div className="absolute inset-0 -z-0 bg-[radial-gradient(40%_120%_at_50%_0%,#fff_20%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                </Button>
              </div>
            </div>

            {/* Analysis Core */}
            <div className="w-full xl:w-1/3 flex items-center justify-center py-8 xl:py-0 xl:pt-16">
              <div className="relative flex flex-col items-center justify-center space-y-4">
                {/* Central Prediction */}
                <div className="relative z-10 text-center bg-background/80 backdrop-blur-sm rounded-full w-48 h-48 flex flex-col items-center justify-center border-2" style={{ borderColor: getRingColor() }}>
                  <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                  <p className="text-5xl font-bold font-headline" style={{ color: getRingColor() }}>
                    {confidence}%
                  </p>
                  <p className="text-base font-semibold text-foreground mt-2">{prediction}</p>
                </div>
                {isPredicting && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <style jsx>{`
        .slider-thumb {
          background-color: var(--slider-thumb-color);
          border-color: var(--slider-thumb-color);
        }
        .slider-range {
          background-color: var(--slider-range-color);
        }
      `}</style>
    </div>
  );
}