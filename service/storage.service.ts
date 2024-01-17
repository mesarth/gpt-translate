import AsyncStorage from '@react-native-async-storage/async-storage';

export type Translation = {
  input: string,
  inputLanguage: string,
  output: string,
  outputLanguage: string
}

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
