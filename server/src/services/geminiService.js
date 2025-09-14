import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeAssessment = async (responses) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const prompt = `
      As a mental health professional, analyze these assessment responses:

      PHQ-9 (Depression):
      ${formatResponses(responses.phq9, 'PHQ-9')}

      GAD-7 (Anxiety):
      ${formatResponses(responses.gad7, 'GAD-7')}

      GHQ-12 (General Health):
      ${formatResponses(responses.ghq12, 'GHQ-12')}

      Based on these responses, provide:
      1. A comprehensive analysis of the mental health state
      2. Risk level (low/moderate/high/severe)
      3. Three specific, actionable recommendations
      4. Whether immediate professional help is needed

      Format your response as JSON:
      {
        "summary": "detailed analysis",
        "riskLevel": "risk level",
        "recommendations": ["rec1", "rec2", "rec3"],
        "requiresImmediate": boolean
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const resultText = result.response.text();

    // Log the raw response for debugging.
    console.log('Raw AI response:', resultText);

    // Attempt to parse the response directly
    try {
      return JSON.parse(resultText);
    } catch (parseError) {
      console.error('Initial parse failed:', parseError);

      // Try extracting a JSON substring using a regex
      const jsonSubstringMatch = resultText.match(/{[\s\S]*}/);
      if (jsonSubstringMatch) {
        try {
          return JSON.parse(jsonSubstringMatch[0]);
        } catch (extractionError) {
          console.error('Failed to parse extracted JSON substring:', extractionError);
        }
      }
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    console.error('AI Analysis failed:', error);
    throw new Error(`Failed to analyze assessment: ${error.message}`);
  }
};

const formatResponses = (responses, type) => {
  if (!Array.isArray(responses)) {
    return 'No responses available';
  }
  
  return responses.map((r, i) => {
    const question = r?.question || 'Unknown question';
    const answer = r?.answer?.label || 'No answer';
    return `Q${i + 1}: "${question}" - ${answer}`;
  }).join('\n');
};