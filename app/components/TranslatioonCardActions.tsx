import { StarIcon, CopyIcon, CheckIcon, StarOffIcon } from 'lucide-react-native';
import { View, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Translation } from '~/service/storage.service';
import ToggleIcon from './ToggleIcon';

export default function TranslationCardActions({ translation }: { translation: Translation }) {
  return (
    <View className="flex flex-row gap-4 self-end">
      <ToggleIcon
        toggled={true}
        First={<StarIcon size={24} className="text-muted-foreground"/>}
        Second={<StarOffIcon size={24} className="text-yellow-400"/>}
      />
      <ToggleIcon 
        onPress={() => Clipboard.setStringAsync(translation.output)}
        time={5000}
        First={<CopyIcon size={24} className="text-muted-foreground" />} 
        Second={<CheckIcon size={24} className="text-muted-foreground" />}
      />
    </View>
  );
}
