import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { EmptyState } from '@/components/EmptyState';
import { useFavorites } from '@/components/FavoritesProvider';
import { getEventById } from '@/services/eventsService';
import { UniversityEvent } from '@/types/event';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<UniversityEvent>();
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();
  useEffect(() => { getEventById(id).then((item) => { setEvent(item); setLoading(false); }); }, [id]);
  if (loading) return <View style={styles.center}><ActivityIndicator color="#3B5BDB" size="large" /></View>;
  if (!event) return <EmptyState icon="⚠️" title="Evento no encontrado" message="Este evento ya no está disponible." />;
  const favorite = isFavorite(event.id);
  const date = new Intl.DateTimeFormat('es-PE', { dateStyle: 'full', timeZone: 'UTC' }).format(new Date(event.date));
  return <><Stack.Screen options={{ title: event.title }} /><ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    {event.imageUrl ? <Image source={{ uri: event.imageUrl }} style={styles.image} /> : <View style={styles.imagePlaceholder}><Text style={styles.imageEmoji}>🎓</Text></View>}
    <View style={styles.body}><Text style={styles.category}>{event.category.toUpperCase()}</Text><Text style={styles.title}>{event.title}</Text>
      <View style={styles.infoCard}><InfoRow icon="◷" label="Fecha y hora" value={`${capitalize(date)} · ${event.time}`} /><View style={styles.divider} /><InfoRow icon="⌖" label="Lugar" value={event.location} /></View>
      <Text style={styles.sectionTitle}>Acerca del evento</Text><Text style={styles.description}>{event.description}</Text>
      <Pressable onPress={() => toggleFavorite(event.id)} style={({ pressed }) => [styles.button, favorite && styles.savedButton, pressed && styles.buttonPressed]} accessibilityRole="button" accessibilityState={{ selected: favorite }}><Text style={[styles.buttonText, favorite && styles.savedButtonText]}>{favorite ? '♥  Quitar de favoritos' : '♡  Guardar en favoritos'}</Text></Pressable>
    </View>
  </ScrollView></>;
}
function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) { return <View style={styles.infoRow}><Text style={styles.infoIcon}>{icon}</Text><View style={styles.infoText}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View></View>; }
function capitalize(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }
const styles = StyleSheet.create({ screen: { backgroundColor: '#F8FAFC', flex: 1 }, content: { paddingBottom: 40 }, center: { alignItems: 'center', backgroundColor: '#F8FAFC', flex: 1, justifyContent: 'center' }, image: { height: 250, width: '100%' }, imagePlaceholder: { alignItems: 'center', backgroundColor: '#E0E7FF', height: 210, justifyContent: 'center' }, imageEmoji: { fontSize: 60 }, body: { padding: 20 }, category: { color: '#3B5BDB', fontSize: 12, fontWeight: '900', letterSpacing: 1, marginTop: 2 }, title: { color: '#0F172A', fontSize: 30, fontWeight: '900', letterSpacing: -0.7, lineHeight: 37, marginBottom: 22, marginTop: 8 }, infoCard: { backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 18, borderWidth: 1, padding: 16 }, infoRow: { alignItems: 'center', flexDirection: 'row', gap: 13 }, infoIcon: { color: '#3B5BDB', fontSize: 24, textAlign: 'center', width: 28 }, infoText: { flex: 1 }, infoLabel: { color: '#94A3B8', fontSize: 12, fontWeight: '700', marginBottom: 3, textTransform: 'uppercase' }, infoValue: { color: '#334155', fontSize: 15, fontWeight: '600', lineHeight: 21 }, divider: { backgroundColor: '#E2E8F0', height: 1, marginVertical: 14 }, sectionTitle: { color: '#0F172A', fontSize: 19, fontWeight: '800', marginBottom: 9, marginTop: 25 }, description: { color: '#475569', fontSize: 16, lineHeight: 25 }, button: { alignItems: 'center', backgroundColor: '#3B5BDB', borderRadius: 14, marginTop: 28, padding: 16 }, savedButton: { backgroundColor: '#EEF2FF', borderColor: '#C7D2FE', borderWidth: 1 }, buttonPressed: { opacity: 0.8 }, buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' }, savedButtonText: { color: '#3B5BDB' } });
