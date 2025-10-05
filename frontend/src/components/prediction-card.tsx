import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type PredictionCardProps = {
  prediction: string;
  confidence: number;
};

export function PredictionCard({ prediction, confidence }: PredictionCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-headline text-center">AI Prediction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Prediction</p>
          <p className="text-2xl font-bold text-accent">{prediction}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
          <div className="flex items-center gap-4 mt-1">
            <Progress value={confidence} className="w-full" />
            <span className="text-xl font-bold text-accent">{confidence}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
