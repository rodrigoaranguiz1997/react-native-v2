
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
        router.replace('/login');
      }
    }, 100);

    return () => clearTimeout(redirectToLogin);
  }, [isAuthenticated]);

  

  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
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
