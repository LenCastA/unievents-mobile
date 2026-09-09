import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '@/components/EmptyState';
import { EventCard } from '@/components/EventCard';
import { useFavorites } from '@/components/FavoritesProvider';
import { EVENTS } from '@/data/events';

export default function FavoritesScreen() {
  const { favoriteIds, isLoaded } = useFavorites();
  const favoriteEvents = EVENTS.filter((event) => favoriteIds.includes(event.id));
  return <SafeAreaView style={styles.safeArea}><FlatList data={favoriteEvents} keyExtractor={(item) => item.id} renderItem={({ item }) => <EventCard event={item} />} contentContainerStyle={favoriteEvents.length ? styles.list : styles.emptyList} ListHeaderComponent={<View style={styles.header}><Text style={styles.heading}>Tus favoritos</Text><Text style={styles.subtitle}>Guarda aquí los eventos que no quieres perderte.</Text></View>} ListEmptyComponent={isLoaded ? <EmptyState icon="♡" title="Aún no tienes favoritos" message="Abre un evento y toca “Guardar en favoritos”." /> : null} showsVerticalScrollIndicator={false} /></SafeAreaView>;
}
const styles = StyleSheet.create({ safeArea: { backgroundColor: '#F8FAFC', flex: 1 }, list: { paddingBottom: 24 }, emptyList: { flexGrow: 1 }, header: { paddingBottom: 16, paddingHorizontal: 20, paddingTop: 34 }, heading: { color: '#0F172A', fontSize: 30, fontWeight: '900', letterSpacing: -0.7 }, subtitle: { color: '#64748B', fontSize: 15, lineHeight: 22, marginTop: 8 } });
