import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from '@/components/FavoritesProvider';

export default function RootLayout() {
  return <FavoritesProvider><StatusBar style="dark" /><Stack screenOptions={{ contentStyle: { backgroundColor: '#F8FAFC' }, headerShadowVisible: false }}><Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="event/[id]" options={{ title: 'Detalle del evento', headerTintColor: '#0F172A', headerBackTitle: 'Atrás' }} /></Stack></FavoritesProvider>;
}
