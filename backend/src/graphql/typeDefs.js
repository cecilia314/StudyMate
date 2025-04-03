const typeDefs = `
  type Quiz {
    _id: String
    title: String!
    questions: [Question!]
    flashcards: [Flashcard!]
    createdAt: String
  }
  type Question {
    question: String!
    answer: String!
  }
  type Flashcard {
    term: String!
    definition: String!
  }

  type QuizzesResult {
    quizzes: [Quiz]
    totalCount: Int
  }

  type Query {
    quiz(_id: String!): Quiz!
    getQuizzes(amount: Int): QuizzesResult
  }

  type Mutation {
    createQuiz(fileBase64: String!): Quiz!
    deleteQuiz(_id: String!): Boolean
    editQuizTitle(_id: String!, title: String!): Quiz!
  }
`;

export { typeDefs };
