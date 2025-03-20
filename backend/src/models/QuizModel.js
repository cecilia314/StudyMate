import { model, Schema } from 'mongoose';

const questionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const flashcardSchema = new Schema({
  term: { type: String, required: true },
  definition: { type: String, required: true },
});

const quizSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  flashcards: { type: [flashcardSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Quiz', quizSchema);
