import { View, Text } from 'react-native';
import ToggleIcon from './ToggleIcon';
import { PlayCircle, Volume1Icon } from 'lucide-react-native';
import { TranslationSerivce } from '~/service/translation.service';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export default function TranslationTextRow({
  language,
  text,
  primary = false,
  maximized = false,
}: {
  language: string;
  text: string;
  primary?: boolean;
  maximized?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();

  const playAudio = () => {
    setIsPlaying(true);
    TranslationSerivce.textToSpeech(text).then((audio) => {
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

  const classes = primary ? 'text-primary' : 'text-foreground';

  return (
    <View>
      <Text className={`text-md font-normal ${classes}`}>{language}</Text>
      <View className='flex flex-row gap-4 w-full justify-between items-center'>
        <Text
          className={`text-4xl font-extrabold flex-shrink m-0 p-0 ${classes}`}
          numberOfLines={maximized ? undefined : 3}
        >
          {text}
        </Text>
        <ToggleIcon
          toggled={isPlaying}
          onPress={playAudio}
          First={<PlayCircle size={28} className={classes} />}
          Second={<Volume1Icon size={28} className={classes} />}
        />
      </View>
    </View>
  );
}
