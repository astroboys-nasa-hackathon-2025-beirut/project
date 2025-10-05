import { FeatureImportanceChart } from '@/components/feature-importance-chart';
import { LightCurveChart } from '@/components/light-curve-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExplanationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline text-center mb-12">
        Why did the AI make this decision?
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Feature Importance</CardTitle>
                <CardDescription>How much each factor influences the AI's prediction. Hover for an explanation.</CardDescription>
            </CardHeader>
            <CardContent>
                <FeatureImportanceChart />
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="font-headline">Stellar Light Curve</CardTitle>
                <CardDescription>A mock visualization of a star's brightness. The dip suggests a planet passed in front of it.</CardDescription>
            </CardHeader>
            <CardContent>
                <LightCurveChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
