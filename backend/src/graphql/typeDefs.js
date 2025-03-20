const typeDefs = `
  scalar Upload
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

  type Query {
    quiz(_id: String!): Quiz!
    getQuizzes(amount: Int): [Quiz]
  }

  type Mutation {
    createQuiz(file: Upload!, _id: String!): Quiz!
    deleteQuiz(_id: String!): Boolean
    editQuizTitle(_id: String!, title: String!): Quiz!
  }
`;
export { typeDefs };
