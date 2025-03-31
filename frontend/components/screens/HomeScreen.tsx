import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../nativewindui/Button';
import { useQuery } from '@apollo/client';
import { GET_QUIZZES } from '@/src/graphql/queries';
import Quizzes from '../lists/Quizzes';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/theme/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_QUIZZES, {
    variables: { amount: 4 },
  });

  if (loading) return <Text className="text-base">Cargando quizzes...</Text>;
  if (error) return <Text className="text-base">Error: {error.message}</Text>;

  const total = data?.getQuizzes?.totalCount ?? 0;
  const quizzes = data?.getQuizzes?.quizzes ?? [];

  return (
    <View className="grid mx-auto pt-6">
      <View className="px-4">
        <Button
          onPress={() => {
            router.navigate('/(zShared)/addQuiz');
          }}
          disabled={total >= 10}
        >
          <MaterialIcons name="add" size={24} color={COLORS.white} />
          <Text className="text-white">Add a new Quiz!</Text>
        </Button>
        {total >= 2 ? (
          <Text className="text-popover-foreground web:text-slate-400 px-4 py-1">
            *You've reached the maximum number of quizzes. Delete one to create
            a new one.
          </Text>
        ) : (
          ''
        )}
      </View>
      {quizzes !== 'null' ? (
        <Quizzes quizzes={quizzes} />
      ) : (
        <Text> Start by uploading a new file</Text>
      )}
    </View>
  );
}
