'use server';

/**
 * @fileOverview A flow to generate plain language explanations of feature importance for the Exoplanet AI Explorer app.
 *
 * - explainableFeatureImportance - A function that generates an explanation for a given feature.
 * - ExplainableFeatureImportanceInput - The input type for the explainableFeatureImportance function.
 * - ExplainableFeatureImportanceOutput - The return type for the explainableFeatureImportance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainableFeatureImportanceInputSchema = z.object({
  feature: z.string().describe('The name of the feature to explain (e.g., Transit Depth, Orbital Period, Signal-to-Noise).'),
  complexity: z.enum(['simple', 'complex']).describe('How complex the explanation should be.'),
});
export type ExplainableFeatureImportanceInput = z.infer<typeof ExplainableFeatureImportanceInputSchema>;

const ExplainableFeatureImportanceOutputSchema = z.object({
  explanation: z.string().describe('A plain language explanation of the feature.'),
});
export type ExplainableFeatureImportanceOutput = z.infer<typeof ExplainableFeatureImportanceOutputSchema>;

export async function explainableFeatureImportance(input: ExplainableFeatureImportanceInput): Promise<ExplainableFeatureImportanceOutput> {
  return explainableFeatureImportanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainableFeatureImportancePrompt',
  input: {schema: ExplainableFeatureImportanceInputSchema},
  output: {schema: ExplainableFeatureImportanceOutputSchema},
  prompt: `You are an expert in explaining complex scientific concepts in plain language.

  The user has asked for an explanation of the following feature from a model that detects exoplanets, so they can better understand the AI's decision-making process:

  Feature: {{{feature}}}
  Complexity: {{{complexity}}}

  Provide a concise and easy-to-understand explanation of the feature.
  If complexity is simple, provide a very short description. Otherwise provide more details.
  `,
});

const explainableFeatureImportanceFlow = ai.defineFlow(
  {
    name: 'explainableFeatureImportanceFlow',
    inputSchema: ExplainableFeatureImportanceInputSchema,
    outputSchema: ExplainableFeatureImportanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
