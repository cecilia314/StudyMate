import { Stack, useRouter, useNavigation } from 'expo-router';
import { useColorScheme, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SharedLayout() {
  const navigation = useNavigation();
  const router = useRouter();

  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="addQuiz"
        options={{
          title: 'Add a new Quiz',
          headerTitleAlign: 'center',

          headerLeft: () => (
            <View>
              <Pressable
                onPress={() => {
                  router.back();
                }}
                hitSlop={40}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="quiz/[id]"
        options={{
          title: 'Quiz',
          headerTitle: 'Quiz',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
