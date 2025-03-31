import { gql } from '@apollo/client';

export const GET_QUIZZES = gql`
  query getQuizzes($amount: Int) {
    getQuizzes(amount: $amount) {
      _id
      title
      createdAt
    }
  }
`;
