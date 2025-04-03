import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../nativewindui/Button';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_QUIZZES } from '@/src/graphql/queries';
import Quizzes from '../lists/Quizzes';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/theme/colors';

export default function HomeScreen() {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_QUIZZES, {
    variables: { amount: 4 },
  });

  const client = useApolloClient();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );
  }

  const handleQuizDeleted = (id: string) => {
    client.cache.modify({
      id: client.cache.identify({ __typename: 'Query' }),
      fields: {
        getQuizzes(existingData = {}, { readField }) {
          if (!existingData?.quizzes) return existingData;

          const filteredQuizzes = existingData.quizzes.filter(
            (quiz: { _id: string }) => readField('_id', quiz) !== id
          );
          return {
            ...existingData,
            quizzes: filteredQuizzes.slice(0, 4),
            totalCount: Math.max(existingData.totalCount - 1, 0),
          };
        },
      },
    });
    client.refetchQueries({ include: [GET_QUIZZES] });
  };

  const total = data?.getQuizzes?.totalCount ?? 0;
  const quizzes = data?.getQuizzes?.quizzes ?? [];

  return (
    <View className="main flex-1 mx-2 web:mx-auto pt-6">
      <View className="px-4">
        <Button
          onPress={() => {
            router.navigate('/(zShared)/addQuiz');
          }}
          disabled={total >= 10}
        >
          <MaterialIcons name="add" size={24} color={COLORS.white} />

          <Text className="text-white ">Add a new Quiz!</Text>
        </Button>
        {total >= 10 && (
          <Text className="text-popover-foreground web:text-slate-400 px-4 py-1">
            *You've reached the maximum number of quizzes. Delete one to create
            a new one.
          </Text>
        )}
      </View>
      {quizzes.length > 0 ? (
        <Quizzes quizzes={quizzes} onCachedQuizDeleted={handleQuizDeleted} />
      ) : (
        <Text>Start by uploading a new file.</Text>
      )}
    </View>
  );
}
