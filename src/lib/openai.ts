import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMindmap(prompt: string) {
  const systemPrompt = `You are a mindmap generator. Create a hierarchical markdown structure for the given topic.
Use only markdown headers (# for main topic, ## for subtopics, ### for details) to create the structure.
Keep it concise but informative. Don't use any other markdown features.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0].message.content || '';
} 