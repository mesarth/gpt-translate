import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { useSettingsStore } from '~/service/settings.service';
import { TranslationSerivce } from '~/service/translation.service';

export default function usePlayAudio() {
  const [sound, setSound] = useState<Audio.Sound>();
  const voice = useSettingsStore((state) => state.voice);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (text: string) => {
    setIsPlaying(true);
    TranslationSerivce.textToSpeech(text, voice).then((audio) => {
      setSound(audio);
      audio.playAsync();
      audio.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    });
  };

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return { isPlaying, playAudio };
}