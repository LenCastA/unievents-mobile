import AsyncStorage from '@react-native-async-storage/async-storage';
const FAVORITES_KEY = '@unievents/favorites';

export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const value = await AsyncStorage.getItem(FAVORITES_KEY);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch { return []; }
}
export async function saveFavoriteIds(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}
