import { GET_QUIZ_BY_ID } from '@/src/graphql/queries';
import { useQuery } from '@apollo/client';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AnimatedCard } from '../nativewindui/AnimatedCard';
import { QuizCarousel } from '../nativewindui/QuizCarousel';
import { Button } from '../nativewindui/Button';

export default function ShowQuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_QUIZ_BY_ID, {
    variables: { _id: id },
  });
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
  const quiz = data?.quiz?.questions ?? [];

  return (
    <View className="main flex-1 mx-2 mb-36 web:mx-auto pt-6">
      <Text className="w-full text-xl capitalize text-center text-black dark:text-white">
        {data?.quiz?.title}
      </Text>
      <QuizCarousel quiz={quiz} />
      <Button
        variant="secondary"
        className="w-24 self-center"
        onPress={() => {
          router.navigate('/');
        }}
      >
        <Text className="text-black dark:text-white">Leave</Text>
      </Button>
    </View>
  );
}
