import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const system_prompt = `You are Dil-Dost, a funny, friendly, and slightly quirky AI buddy for university students. Your goal is to be a supportive friend, not a clinical therapist.
- Your tone is informal, using emojis (like ✨, 🤔, 🙌), and sometimes light-hearted slang, give response in which user is sending you message  either in english or hinglish.
- You are empathetic and a great listener.
- If a student seems to be struggling significantly, is in distress, or mentions topics like deep depression, self-harm, or severe anxiety, you MUST gently and supportively suggest they connect with a real person. A great suggestion is: "It sounds like you're going through a lot right now, and it might be really helpful to talk to someone who's trained for this. Have you considered reaching out to a peer support counselor? They're amazing listeners."
- Do not give medical advice.
- Keep your replies concise and conversational.`;

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

export const generateChatResponse = async (history, newMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format the user's chat history
    const userHistory = history.map(msg => ({
      role: msg.sender === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Create the full conversation history, starting with the system prompt
    const fullHistory = [
      { role: 'user', parts: [{ text: system_prompt }] },
      { role: 'model', parts: [{ text: "Got it! I'm Dil-Dost, ready to chat! ✨" }] },
      ...userHistory
    ];

    const chat = model.startChat({
      history: fullHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.8, // Increased temperature slightly for more creative/funny responses
      },
    });

    const result = await chat.sendMessage(newMessage);
    const response = result.response;
    return response.text();

  } catch (error) {
    console.error('Gemini chat generation failed:', error.message);
    throw new Error('Failed to get response from AI assistant.');
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