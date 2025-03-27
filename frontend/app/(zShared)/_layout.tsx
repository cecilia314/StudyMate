import { Stack } from 'expo-router';
export default function SharedLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="addQuiz" options={{ title: 'Add a new Quiz' }} />
    </Stack>
  );
}
