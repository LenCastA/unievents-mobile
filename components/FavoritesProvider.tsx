import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadFavoriteIds, saveFavoriteIds } from '@/storage/favoritesStorage';

type FavoritesContextValue = { favoriteIds: string[]; isLoaded: boolean; isFavorite: (id: string) => boolean; toggleFavorite: (id: string) => void };
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { loadFavoriteIds().then((ids) => { setFavoriteIds(ids); setIsLoaded(true); }); }, []);
  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      void saveFavoriteIds(next);
      return next;
    });
  }, []);
  const value = useMemo(() => ({ favoriteIds, isLoaded, isFavorite: (id: string) => favoriteIds.includes(id), toggleFavorite }), [favoriteIds, isLoaded, toggleFavorite]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return value;
}
