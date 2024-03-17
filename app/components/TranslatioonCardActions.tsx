import {
  StarIcon,
  CopyIcon,
  CheckIcon,
  StarOffIcon,
  Minimize2Icon,
  Maximize2Icon,
} from 'lucide-react-native';
import { View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Translation, useFavoriteStore } from '~/service/storage.service';
import ToggleIcon from './ToggleIcon';

export default function TranslationCardActions({
  translation,
  maximized,
  onMaximize,
  showMaximize = true,
}: {
  translation: Translation;
  maximized?: boolean;
  onMaximize?: () => void;
  showMaximize?: boolean;
}) {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite(translation));

  return (
    <View className='flex flex-row gap-4 self-start mt-2'>
      {showMaximize && (
        <ToggleIcon
          toggled={maximized}
          onPress={() => {
            onMaximize?.();
          }}
          First={<Maximize2Icon size={24} className='text-muted-foreground' />}
          Second={<Minimize2Icon size={24} className='text-muted-foreground' />}
        />
      )}
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
