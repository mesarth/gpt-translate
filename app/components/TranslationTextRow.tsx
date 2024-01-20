import { View, Text } from 'react-native';
import ToggleIcon from './ToggleIcon';
import { PlayCircle, Volume1Icon } from 'lucide-react-native';
import usePlayAudio from '../hooks/usePlayAudio';

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
  const { isPlaying, playAudio } = usePlayAudio();

  const classes = primary ? 'text-primary' : 'text-foreground';
  const textSize = text.length > 50 ? 'text-2xl' : 'text-4xl';

  return (
    <View>
      <Text className={`text-md font-normal ${classes}`}>{language}</Text>
      <View className='flex flex-row gap-4 w-full justify-between items-center'>
        <Text
          className={`${textSize} font-extrabold flex-shrink m-0 p-0 ${classes}`}
          numberOfLines={maximized ? undefined : 3}
        >
          {text}
        </Text>
        <ToggleIcon
          toggled={isPlaying}
          onPress={() => playAudio(text)}
          First={<PlayCircle size={28} className={classes} />}
          Second={<Volume1Icon size={28} className={classes} />}
        />
      </View>
    </View>
  );
}
