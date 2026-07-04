'use client';

import { createContext, useEffect, useState, ReactNode, } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteService } from './favorite.service';
import { useAuth } from '../auth/useAuth';
import { Product } from '../product/types';

type FavoriteContextData = {
  favorites: Product[];
  favoritesCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  reloadFavorites: () => Promise<void>
};

export const FavoriteContext = createContext<FavoriteContextData | null>(null);

interface FavoriteProviderProps {
  children: ReactNode;
}

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { isAuthenticated } = useAuth()

  const favoriteIds = new Set<string>(favorites.filter((favorite): favorite is Product => !!favorite).map((favorite) => favorite.id))

  function isFavorite(id: string) {
    return favoriteIds.has(id);
  }

  async function reloadFavorites() {
    const response = await getFavorites()

    setFavorites(response.data.map((favorite) => favorite.product))
  }

  useEffect(() => {
    async function load() {
      try {
        const response = await getFavorites();

        setFavorites(
          response.data.map((favorite: { product: Product }) => favorite.product)
        );
      } catch (error) {
        console.error(error);
      }
    }

    if (!isAuthenticated) {
      setFavorites([])
      return
    }

    load();
  }, [isAuthenticated]);

  async function toggleFavorite(productId: string) {
    await toggleFavoriteService(productId);
    
    await reloadFavorites()
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        favoritesCount: favoriteIds.size,
        isFavorite,
        toggleFavorite,
        reloadFavorites: async () => {},
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}