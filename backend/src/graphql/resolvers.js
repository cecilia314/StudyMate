import generateQuiz from '../services/openaiService.js';
import Quiz from '../models/QuizModel.js';
import { v4 as uuidv4 } from 'uuid';

// pdf-parse package causes an error when using import/from with ESM.
// To avoid this compatibility issue, I use dynamic import() to load the CommonJS module.
let extractText;
async function loadExtractText() {
  const module = await import('../helpers/extractText.cjs');
  extractText = module.extractText;
}
await loadExtractText();

const resolvers = {
  Query: {
    async quiz(_, { _id }) {
      return await Quiz.findById(_id);
    },
    async getQuizzes(_, { amount }) {
      const quizzes = await Quiz.find().sort({ createdAt: -1 }).limit(amount);
      const totalCount = await Quiz.countDocuments();

      return { quizzes, totalCount };
    },
  },

  Mutation: {
    async createQuiz(_, { fileBase64 }) {
      try {
        if (!fileBase64.startsWith('data:application/pdf;base64,')) {
          throw new Error('Invalid format, only PDFs in Base64.');
        }

        // To Buffer
        const base64Data = fileBase64.replace(
          'data:application/pdf;base64,',
          ''
        );
        const pdfBuffer = Buffer.from(base64Data, 'base64');

        const text = await extractText(pdfBuffer);

        const quizData = await generateQuiz(text);
        const newQuiz = { ...quizData, _id: uuidv4() };

        const savedQuiz = new Quiz(newQuiz);
        await savedQuiz.save();

        return savedQuiz;
      } catch (error) {
        console.error('Error in createQuiz:', error);
        throw new Error(error.message);
      }
    },

    async editQuizTitle(_, { _id, title }) {
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        _id,
        { title },
        { new: true }
      );
      if (!updatedQuiz) throw new Error('Quiz not found');
      return updatedQuiz;
    },

    async deleteQuiz(_, { _id }) {
      const deleted = await Quiz.findByIdAndDelete(_id);
      return !!deleted;
    },
  },
};

export { resolvers };
