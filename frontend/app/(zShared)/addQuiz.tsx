import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';

export default function AddQuiz() {
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
          router.back();
        }}
      >
        <Text>Go to Home</Text>
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
