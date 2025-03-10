
import { Tabs } from "expo-router";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
export default function TabsLayout() {
  //const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  //const isAuthenticated = false;

  const router = useRouter();

  useEffect(() => {
    const redirectToLogin = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace('/login'); // Asegúrate de que la ruta sea la correcta
      }
    }, 100); // Pequeño retraso para esperar a que se monte el layout

    return () => clearTimeout(redirectToLogin);
  }, [isAuthenticated]);

  

  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
