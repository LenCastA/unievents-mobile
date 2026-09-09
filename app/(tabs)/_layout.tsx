import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#3B5BDB', tabBarInactiveTintColor: '#94A3B8', tabBarLabelStyle: styles.label, tabBarStyle: styles.bar }}>
    <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color }) => <Text style={[styles.icon, { color }]}>⌂</Text> }} />
    <Tabs.Screen name="favorites" options={{ title: 'Favoritos', tabBarIcon: ({ color }) => <Text style={[styles.icon, { color }]}>♥</Text> }} />
  </Tabs>;
}
const styles = StyleSheet.create({ bar: { borderTopColor: '#E2E8F0', height: 68, paddingBottom: 8, paddingTop: 7 }, label: { fontSize: 12, fontWeight: '700' }, icon: { fontSize: 24, fontWeight: '700' } });
