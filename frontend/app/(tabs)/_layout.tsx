import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShadowVisible: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Study Mate',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 100,
          },

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quizzes"
        options={{
          headerTitle: 'Quizzes',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 100,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'book-sharp' : 'book-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
