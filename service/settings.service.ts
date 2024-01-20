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
  setVoice: (voice: Voice) => void,
  getVoice: () => Voice,
  autoPlay: boolean,
  setAutoPlay: (autoPlay: boolean) => void,
  getAutoPlay: () => boolean,
  autoCopy: boolean,
  setAutoCopy: (autoCopy: boolean) => void,
  getAutoCopy: () => boolean,
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      voice: "alloy",
      setVoice: (voice: Voice) => set({ voice }),
      getVoice: () => get().voice,
      autoPlay: false,
      setAutoPlay: (autoPlay: boolean) => set({ autoPlay }),
      getAutoPlay: () => get().autoPlay,
      autoCopy: false,
      setAutoCopy: (autoCopy: boolean) => set({ autoCopy }),
      getAutoCopy: () => get().autoCopy,
    }),
    { name: 'settings', storage: createJSONStorage(() => AsyncStorage) },
  ),
);