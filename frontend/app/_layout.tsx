import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '@/src/apolloClient';

import {
  useColorScheme,
  useInitialAndroidBarSync,
} from '../lib/useColorScheme';
import { NAV_THEME } from '../theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <ApolloProvider client={client}>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(zShared)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </NavThemeProvider>
    </ApolloProvider>
  );
}
