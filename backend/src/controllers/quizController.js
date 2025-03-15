const { generateQuizAndFlashcards } = require('../services/openaiService.js');
const { extractTextFromPDF } = require('../helpers/extractTextFromPDF.js');

const { readFileSync, unlink } = require('fs');

const quizController = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file was received');
    }
    const fileBuffer = readFileSync(req.file.path);
    const text = await extractTextFromPDF(fileBuffer);

    const questions = await generateQuizAndFlashcards(text);

    unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json(questions);
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { quizController };
