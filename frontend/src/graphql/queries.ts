import { gql } from '@apollo/client';

export const GET_QUIZZES = gql`
  query GetQuizzes($amount: Int) {
    getQuizzes(amount: $amount) {
      quizzes {
        _id
        title
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_QUIZ_BY_ID = gql`
  query GetQuizById($_id: String!) {
    quiz(_id: $_id) {
      _id
      title
      createdAt
      questions {
        question
        answer
      }
      flashcards {
        term
        definition
      }
    }
  }
`;

export const CREATE_QUIZ = gql`
  mutation CreateQuiz($fileBase64: String!) {
    createQuiz(fileBase64: $fileBase64) {
      _id
      title
      createdAt
    }
  }
`;

export const DELETE_QUIZ = gql`
  mutation DeleteQuiz($_id: String!) {
    deleteQuiz(_id: $_id)
  }
`;
