import { StyleSheet, Text, View } from 'react-native';
export function EmptyState({ icon, title, message }: { icon: string; title: string; message: string }) {
  return <View style={styles.container}><Text style={styles.icon}>{icon}</Text><Text style={styles.title}>{title}</Text><Text style={styles.message}>{message}</Text></View>;
}
const styles = StyleSheet.create({ container: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingHorizontal: 40, paddingVertical: 72 }, icon: { fontSize: 48, marginBottom: 14 }, title: { color: '#0F172A', fontSize: 20, fontWeight: '800', marginBottom: 8, textAlign: 'center' }, message: { color: '#64748B', fontSize: 15, lineHeight: 22, textAlign: 'center' } });
