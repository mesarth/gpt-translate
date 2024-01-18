import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export type Translation = {
  input: string,
  inputLanguage: string,
  output: string,
  outputLanguage: string
}

type TranslationStorage = {
  translations: Array<Translation>,
  addTranslation: (translation: Translation) => void
}

export const useTranslationStore = create<TranslationStorage>()(
  (set) => ({
    translations: [],
    addTranslation: (translation: Translation) => set((state) => ({ translations: [...state.translations, translation] })),
  }),
);


type FavoriteStorage = {
  favorites: Array<Translation>,
  addFavorite: (favorite: Translation) => void,
  removeFavorite: (favorite: Translation) => void
  toggleFavorite: (favorite: Translation) => void
  isFavorite: (favorite: Translation) => boolean
}

export const useFavoriteStore = create<FavoriteStorage>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (favorite: Translation) => set((state) => ({ favorites: [...state.favorites, favorite] })),
      removeFavorite: (favorite: Translation) => set((state) => ({ favorites: state.favorites.filter((f) => f.input !== favorite.input) })),
      toggleFavorite: (favorite: Translation) => set((state) => {
        if (state.favorites.find((f) => f === favorite)) {
          return { favorites: state.favorites.filter((f) => f !== favorite) }
        } else {
          return { favorites: [...state.favorites, favorite] }
        }
      }),
      isFavorite: (favorite: Translation) => get().favorites.find((f) => f === favorite) !== undefined
    }),
    { name: 'favorites', storage: createJSONStorage(() => AsyncStorage) },
  ),
);