require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateQuizAndFlashcards(text, numQuestions = 5) {
  const prompt = `
    Based on the following text, generate:

    - An array of ${numQuestions} questions and answers
    - An array of flashcards with key concepts and definitions.

    The response must be in JSON format with two parent elements: 
    {
      "title":"<PDF title>",
      "questions": [
        { "question": "...", "answer": "..." },
        { "question": "...", "answer": "..." }
      ],
      "flashcards": [
        { "term": "...", "definition": "..." },
        { "term": "...", "definition": "..." }
      ]
    }

    Text: ${text}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert educational assistant who analyzes text and generates questions and flashcards.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 800,
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = {
  generateQuizAndFlashcards,
};
