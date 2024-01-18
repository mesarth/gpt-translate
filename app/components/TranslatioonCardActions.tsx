import { StarIcon, CopyIcon } from 'lucide-react-native';
import { View, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Translation } from '~/service/storage.service';

export default function TranslationCardActions({ translation }: { translation: Translation }) {
  return (
    <View className="flex flex-row gap-4 self-end">
      <Pressable onPress={() => Clipboard.setStringAsync(translation.output)}>
        <StarIcon size={24} className="text-muted-foreground"/>
      </Pressable>
      <Pressable onPress={() => Clipboard.setStringAsync(translation.output)}>
        <CopyIcon size={24} className="text-muted-foreground" />
      </Pressable>
    </View>
  );
}
