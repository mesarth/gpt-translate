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
}

export const useFavoriteStore = create<FavoriteStorage>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (favorite: Translation) => set((state) => ({ favorites: [...state.favorites, favorite] })),
      removeFavorite: (favorite: Translation) => set((state) => ({ favorites: state.favorites.filter((f) => f.input !== favorite.input) })),
    }),
    { name: 'favorites', storage: createJSONStorage(() => AsyncStorage) },
  ),
);