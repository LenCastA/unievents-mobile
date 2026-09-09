import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { UniversityEvent } from '@/types/event';

const COLORS = { Académico: '#7C3AED', Tecnología: '#2563EB', Cultural: '#DB2777', Deportes: '#059669', Otros: '#EA580C' } as const;
const EMOJI = { Académico: '📚', Tecnología: '💻', Cultural: '🎭', Deportes: '🏅', Otros: '✨' } as const;

export function EventCard({ event }: { event: UniversityEvent }) {
  const router = useRouter();
  const date = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(event.date));
  return <Pressable onPress={() => router.push({ pathname: '/event/[id]', params: { id: event.id } })} style={({ pressed }) => [styles.card, pressed && styles.pressed]} accessibilityRole="button" accessibilityLabel={`Ver detalles de ${event.title}`}>
    {event.imageUrl ? <Image source={{ uri: event.imageUrl }} style={styles.image} accessibilityIgnoresInvertColors /> : <View style={[styles.placeholder, { backgroundColor: `${COLORS[event.category]}18` }]}><Text style={styles.emoji}>{EMOJI[event.category]}</Text></View>}
    <View style={styles.body}>
      <View style={[styles.badge, { backgroundColor: `${COLORS[event.category]}16` }]}><Text style={[styles.badgeText, { color: COLORS[event.category] }]}>{event.category}</Text></View>
      <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
      <View style={styles.metaRow}><Text style={styles.metaIcon}>◷</Text><Text style={styles.meta}>{date} · {event.time}</Text></View>
      <View style={styles.metaRow}><Text style={styles.metaIcon}>⌖</Text><Text style={styles.meta} numberOfLines={1}>{event.location}</Text></View>
    </View>
  </Pressable>;
}
const styles = StyleSheet.create({ card: { backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 3, marginHorizontal: 20, marginVertical: 8, overflow: 'hidden', shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 }, pressed: { opacity: 0.88 }, image: { height: 158, width: '100%' }, placeholder: { alignItems: 'center', height: 120, justifyContent: 'center' }, emoji: { fontSize: 42 }, body: { padding: 16 }, badge: { alignSelf: 'flex-start', borderRadius: 999, marginBottom: 10, paddingHorizontal: 10, paddingVertical: 5 }, badgeText: { fontSize: 12, fontWeight: '700' }, title: { color: '#0F172A', fontSize: 19, fontWeight: '800', lineHeight: 25, marginBottom: 12 }, metaRow: { alignItems: 'center', flexDirection: 'row', gap: 7, marginTop: 5 }, metaIcon: { color: '#64748B', fontSize: 16, width: 18 }, meta: { color: '#64748B', flex: 1, fontSize: 14, lineHeight: 20 } });
