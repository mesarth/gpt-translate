import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export class SettingsService {
  static voices = [
    "alloy", "echo", "fable", "onyx", "nova", "shimmer"
  ] as const;
}

export type Voice = typeof SettingsService.voices[number];


type SettingsStore = {
  voice: Voice,
  setVoice: (voice: Voice) => void
  getVoice: () => Voice
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      voice: "alloy",
      setVoice: (voice: Voice) => set({ voice }),
      getVoice: () => get().voice
    }),
    { name: 'settings', storage: createJSONStorage(() => AsyncStorage) },
  ),
);