import {
  StarIcon,
  CopyIcon,
  CheckIcon,
  StarOffIcon,
} from 'lucide-react-native';
import { View, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import {
  Translation,
  useFavoriteStore,
  useTranslationStore,
} from '~/service/storage.service';
import ToggleIcon from './ToggleIcon';

export default function TranslationCardActions({
  translation,
}: {
  translation: Translation;
}) {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite(translation));

  return (
    <View className='flex flex-row gap-4 self-start mt-2'>
      <ToggleIcon
        toggled={isFavorite}
        onPress={() => toggleFavorite(translation)}
        First={<StarIcon size={24} className='text-primary' />}
        Second={<StarOffIcon size={24} className='text-muted-foreground' />}
      />
      <ToggleIcon
        onPress={() => Clipboard.setStringAsync(translation.output)}
        time={5000}
        First={<CopyIcon size={24} className='text-muted-foreground' />}
        Second={<CheckIcon size={24} className='text-muted-foreground' />}
      />
    </View>
  );
}
