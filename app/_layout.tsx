import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import store from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from '@/redux/slices/AuthSlice';


export default function RootLayout() {
  const colorScheme = useColorScheme();


  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) store.dispatch(loadUser(JSON.parse(storedUser)));
    };
    loadStoredUser();
  }, []);
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Provider store={store}>

      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      </Provider>

    </ThemeProvider>
  );
}
