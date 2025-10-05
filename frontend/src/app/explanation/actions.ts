'use server';

import { explainableFeatureImportance } from '@/ai/flows/explainable-feature-importance';
import type { ExplainableFeatureImportanceInput } from '@/ai/flows/explainable-feature-importance';

export async function getExplanation(
  feature: string,
  complexity: 'simple' | 'complex' = 'simple'
): Promise<string> {
  try {
    const input: ExplainableFeatureImportanceInput = { feature, complexity };
    const result = await explainableFeatureImportance(input);
    return result.explanation;
  } catch (error) {
    console.error('Error fetching explanation:', error);
    return 'Could not load explanation at this time.';
  }
}
