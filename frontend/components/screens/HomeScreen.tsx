import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../nativewindui/Button';
import { Text } from '../nativewindui/Text';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        gap: 16,
        paddingTop: 24,
        alignItems: 'center',
      }}
    >
      <Button
        onPress={() => {
          router.navigate('/(zShared)/addQuiz');
        }}
      >
        <Text>Add a new Quiz!</Text>
      </Button>

      <Button
        variant="secondary"
        onPress={() => {
          router.navigate('/quizzes');
        }}
      >
        <Text>All Quizzes</Text>
      </Button>
    </View>
  );
}
