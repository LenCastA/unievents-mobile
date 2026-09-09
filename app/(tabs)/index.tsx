import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CategoryFilter } from '@/components/CategoryFilter';
import { EmptyState } from '@/components/EmptyState';
import { EventCard } from '@/components/EventCard';
import { getEvents } from '@/services/eventsService';
import { EVENT_CATEGORIES, UniversityEvent } from '@/types/event';
type Filter = (typeof EVENT_CATEGORIES)[number];

export default function HomeScreen() {
  const [events, setEvents] = useState<UniversityEvent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Filter>('Todos');
  const [loading, setLoading] = useState(true);
  useEffect(() => { getEvents().then((items) => { setEvents(items); setLoading(false); }); }, []);
  const filteredEvents = useMemo(() => selectedCategory === 'Todos' ? events : events.filter((event) => event.category === selectedCategory), [events, selectedCategory]);
  return <SafeAreaView style={styles.safeArea}><FlatList data={filteredEvents} keyExtractor={(item) => item.id} renderItem={({ item }) => <EventCard event={item} />} contentContainerStyle={filteredEvents.length ? styles.list : styles.emptyList} ListHeaderComponent={<View><View style={styles.header}><Text style={styles.eyebrow}>TU CAMPUS, EN UN LUGAR</Text><Text style={styles.heading}>Descubre qué está pasando</Text><Text style={styles.subtitle}>Charlas, cultura, deporte y más eventos para ti.</Text></View><CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} /><Text style={styles.count}>{filteredEvents.length} {filteredEvents.length === 1 ? 'evento' : 'eventos'}</Text></View>} ListEmptyComponent={loading ? <ActivityIndicator color="#3B5BDB" size="large" /> : <EmptyState icon="🔎" title="No hay eventos" message="Prueba seleccionando otra categoría." />} showsVerticalScrollIndicator={false} /></SafeAreaView>;
}
const styles = StyleSheet.create({ safeArea: { backgroundColor: '#F8FAFC', flex: 1 }, list: { paddingBottom: 24 }, emptyList: { flexGrow: 1 }, header: { paddingHorizontal: 20, paddingBottom: 8, paddingTop: 34 }, eyebrow: { color: '#3B5BDB', fontSize: 12, fontWeight: '800', letterSpacing: 1 }, heading: { color: '#0F172A', fontSize: 30, fontWeight: '900', letterSpacing: -0.7, lineHeight: 36, marginTop: 7 }, subtitle: { color: '#64748B', fontSize: 15, lineHeight: 22, marginTop: 8 }, count: { color: '#475569', fontSize: 13, fontWeight: '700', marginBottom: 2, marginHorizontal: 20, marginTop: 4 } });
