import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_QUIZZES } from '@/src/graphql/queries';
import Quizzes from '../lists/Quizzes';

export default function AllQuizScreen() {
  const { loading, error, data } = useQuery(GET_QUIZZES, {
    variables: { amount: 10 },
  });

  const client = useApolloClient();
  const handleQuizDeleted = (id: string) => {
    client.cache.modify({
      id: client.cache.identify({ __typename: 'Query' }),
      fields: {
        getQuizzes(existingData = {}, { readField }) {
          if (!existingData?.quizzes) return existingData;
          return {
            ...existingData,
            quizzes: existingData.quizzes.filter(
              (quiz: { _id: string }) => readField('_id', quiz) !== id
            ),
            totalCount: Math.max(existingData.totalCount - 1, 0),
          };
        },
      },
    });
    client.refetchQueries({ include: [GET_QUIZZES] });
  };

  if (loading) return <Text className="text-base">Loading quizzes...</Text>;
  if (error) return <Text className="text-base">Error: {error.message}</Text>;

  const quizzes = data?.getQuizzes?.quizzes ?? [];

  return (
    <View className="main flex-1 mx-2 web:mx-auto pt-6">
      {quizzes.length > 0 ? (
        <Quizzes quizzes={quizzes} onCachedQuizDeleted={handleQuizDeleted} />
      ) : (
        <Text>No quizzes available.</Text>
      )}
    </View>
  );
}
