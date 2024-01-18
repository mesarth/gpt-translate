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
  persist(
    (set) => ({
      translations: [],
      addTranslation: (translation: Translation) => set((state) => ({ translations: [...state.translations, translation] })),
    }),
    { name: 'translations', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
