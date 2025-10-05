'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const generateLightCurveData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        let brightness = 1.0;
        if (i > 40 && i < 60) {
            const dipProgress = (i - 40) / 20;
            const dipDepth = 0.05;
            const sineDip = Math.sin(dipProgress * Math.PI) * dipDepth;
            brightness -= sineDip;
        }
        brightness += (Math.random() - 0.5) * 0.005;
        data.push({ time: i, brightness: parseFloat(brightness.toFixed(4)) });
    }
    return data;
};

const chartData = generateLightCurveData();

const chartConfig = {
  brightness: {
    label: 'Brightness',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function LightCurveChart() {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value}h`}
            className="text-muted-foreground fill-muted-foreground"
          />
          <YAxis
            domain={['dataMin - 0.01', 'dataMax + 0.01']}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={3}
            className="text-muted-foreground fill-muted-foreground"
          />
          <ChartTooltip
            cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Line
            dataKey="brightness"
            type="monotone"
            stroke="var(--color-brightness)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
