# **App Name**: Exoplanet AI Explorer

## Core Features:

- Data Upload: Scientists can upload CSV or image files containing telescope readings or light curve data for analysis.
- AI-Powered Classification: The application uses AI to classify uploaded light curve data and identify potential exoplanet candidates.
- Interactive Parameter Simulation: Non-scientists can manipulate parameters such as Transit Depth and Orbital Period using interactive sliders to observe how AI predictions change, with mock data.
- Prediction Display: Display a mock classification result card with a prediction (e.g., 'Exoplanet Candidate') and a confidence score.
- Feature Importance Explanation: The system provides a dynamic bar chart showing mock feature importance values such as Transit Depth, Orbital Period, and Signal-to-Noise ratio.
- Interactive Explanations Tool: Use tooltips on each feature in the feature importance chart to provide explanations of each term in plain language. The LLM powering this feature will have to intelligently select whether to provide additional information or clarification based on how complex a concept might be.
- Light Curve Visualization: A placeholder Plotly light curve chart shows a simulated dip representing a planetary transit, providing a visual representation of the data.

## Style Guidelines:

- Primary color: Deep purple (#483D8B), evoking a sense of cosmic mystery.
- Background color: Dark navy (#191970) creating a space-like ambiance at the interface's foundation.
- Accent color: Cyan (#00FFFF) provides star-like highlights, drawing focus and complementing the primary and background hues.
- Headline font: 'Space Grotesk' sans-serif, with a computerized, techy, scientific feel.
- Body font: 'Inter' sans-serif for clear, readable text.
- Use space-themed icons such as planets, stars, and telescopes to enhance visual appeal.
- Ensure a responsive layout for both mobile and desktop devices. Utilize rounded corners and soft shadows for a modern look.