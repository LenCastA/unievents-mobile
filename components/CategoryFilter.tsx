import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { EVENT_CATEGORIES } from '@/types/event';
type Filter = (typeof EVENT_CATEGORIES)[number];

export function CategoryFilter({ selected, onSelect }: { selected: Filter; onSelect: (category: Filter) => void }) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
    {EVENT_CATEGORIES.map((category) => {
      const active = category === selected;
      return <Pressable key={category} onPress={() => onSelect(category)} style={({ pressed }) => [styles.chip, active && styles.activeChip, pressed && styles.pressed]} accessibilityRole="button" accessibilityState={{ selected: active }}>
        <Text style={[styles.label, active && styles.activeLabel]}>{category}</Text>
      </Pressable>;
    })}
  </ScrollView>;
}
const styles = StyleSheet.create({ content: { gap: 8, paddingHorizontal: 20, paddingVertical: 12 }, chip: { backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 999, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 9 }, activeChip: { backgroundColor: '#3B5BDB', borderColor: '#3B5BDB' }, label: { color: '#475569', fontSize: 14, fontWeight: '600' }, activeLabel: { color: '#FFFFFF' }, pressed: { opacity: 0.78 } });
