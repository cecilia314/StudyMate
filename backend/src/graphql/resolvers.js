import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import generateQuiz from '../services/openaiService.js';
import Quiz from '../models/QuizModel.js';
import fs from 'fs';

// pdf-parse package causes an error when using import/from with ESM.
// To avoid compatibility issues, I use dynamic import() to load the CommonJS module.
let extractTextFromPDF;
async function loadExtractTextFromPDF() {
  const module = await import('../helpers/extractTextFromPDF.cjs');
  extractTextFromPDF = module.extractTextFromPDF;
}
await loadExtractTextFromPDF();

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    async quiz(_, { _id }) {
      return await Quiz.findById(_id);
    },
    async getQuizzes(_, { amount }) {
      return await Quiz.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createQuiz(_, { file, _id }) {
      try {
        const { createReadStream, filename } = await file;

        if (!filename.endsWith('.pdf')) {
          throw new Error('The file must have a .pdf extension.');
        }

        const filePath = `./uploads/${filename}`;

        // Save the file on the server
        const stream = createReadStream();
        const out = fs.createWriteStream(filePath);
        stream.pipe(out);

        await new Promise((resolve, reject) => {
          out.on('finish', resolve);
          out.on('error', reject);
        });

        const stats = fs.statSync(filePath);
        if (stats.size > 5 * 1024 * 1024) {
          fs.unlinkSync(filePath);
          throw new Error('The file cannot be larger than 5MB');
        }

        try {
          const pdfBuffer = fs.readFileSync(filePath);
          const text = await extractTextFromPDF(pdfBuffer);

          let quizData = await generateQuiz(text);

          quizData = { ...quizData, _id: _id };

          const savedQuiz = new Quiz(quizData);
          await savedQuiz.save();

          fs.unlinkSync(filePath);

          return savedQuiz;
        } catch (error) {
          fs.unlinkSync(filePath);
          throw new Error('Error processing PDF', error.message);
        }
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
