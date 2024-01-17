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

export class StorageService{
  static async getTranslations(): Promise<Array<Translation>> {
    const translations = await AsyncStorage.getItem('translations');
    if (!translations) {
      return [];
    }
    return JSON.parse(translations);
  }
  
  static async addTranslation(translation: Translation): Promise<void> {
    const translations = await this.getTranslations();
    await AsyncStorage.setItem('translations', JSON.stringify([...translations, translation]));
  }
}
