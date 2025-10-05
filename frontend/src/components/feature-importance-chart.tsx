'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import { getExplanation } from '@/app/explanation/actions';
import { useEffect, useState } from 'react';

const chartData = [
  { feature: 'Transit Depth', importance: 0.85 },
  { feature: 'Orbital Period', importance: 0.6 },
  { feature: 'Signal-to-Noise', importance: 0.72 },
];

const chartConfig = {
  importance: {
    label: 'Importance',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

const CustomTooltipContent = ({ active, payload, label }: any) => {
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (active && payload && payload.length) {
            setIsLoading(true);
            setExplanation('');
            getExplanation(label, 'simple').then((exp) => {
                if(isMounted) {
                    setExplanation(exp);
                    setIsLoading(false);
                }
            });
        }
        return () => { isMounted = false; };
    }, [active, payload, label]);

    if (active && payload && payload.length) {
        return (
            <div className="grid gap-1.5 rounded-lg border bg-popover p-4 text-popover-foreground shadow-sm w-64">
                <p className="font-headline font-semibold">{label}</p>
                <p className="text-sm text-muted-foreground">Importance: {payload[0].value}</p>
                <div className="mt-2 h-px w-full bg-border" />
                <div className="pt-2 min-h-[4rem]">
                    {isLoading ? (
                        <p className="text-sm text-muted-foreground animate-pulse">Generating explanation...</p>
                    ) : (
                        <p className="text-sm">{explanation}</p>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

export function FeatureImportanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 20,
          }}
        >
          <YAxis
            dataKey="feature"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            className="text-foreground fill-foreground"
          />
          <XAxis dataKey="importance" type="number" hide />
          <ChartTooltip
            cursor={{ fill: 'hsl(var(--accent) / 0.1)'}}
            content={<CustomTooltipContent />} 
          />
          <Bar dataKey="importance" layout="vertical" radius={5} fill="var(--color-importance)" />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
