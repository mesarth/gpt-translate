import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Container from '../components/container';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import {
  RenderSelectItem,
  Select,
  SelectItem,
  SelectList,
  SelectTrigger,
} from '~/components/ui/select';
import {
  SettingsService,
  Voice,
  useSettingsStore,
} from '~/service/settings.service';
import { useCallback } from 'react';

export default function SettingsScreen() {
  const voiceItems = SettingsService.voices.map((v) => ({
    label: v,
    value: v,
  }));

  const selectedVoice = useSettingsStore((state) => state.voice);
  const setSelectedVoice = useSettingsStore((state) => state.setVoice);

  const autoPlay = useSettingsStore((state) => state.autoPlay);
  const setAutoPlay = useSettingsStore((state) => state.setAutoPlay);

  const autoCopy = useSettingsStore((state) => state.autoCopy);
  const setAutoCopy = useSettingsStore((state) => state.setAutoCopy);

  const renderItem: RenderSelectItem = useCallback(
    ({ item, index }) => (
      <SelectItem className='w-full' item={item} index={index} />
    ),
    []
  );

  return (
    <Container title='Settings' className='gap-4'>
      <View className='flex'>
        <Label>Text to Speech Voice</Label>
        <Select
          items={voiceItems}
          value={{ label: selectedVoice, value: selectedVoice }}
          onValueChange={(v) => v && setSelectedVoice(v?.value as Voice)}
        >
          <SelectTrigger
            className='w-full'
            placeholder='Select a verified email'
          />
          <SelectList renderItem={renderItem} />
        </Select>
      </View>
      <View className='flex-row justify-between items-center gap-5 w-full'>
        <Label nativeID='switchLabel' className='text-xl pb-2'>
          Automatically copy translation
        </Label>
        <Switch
          aria-labelledbyledBy='switchLabel'
          value={autoCopy}
          onValueChange={setAutoCopy}
        />
      </View>
      <View className='flex-row justify-between items-center gap-5 w-full'>
        <Label nativeID='switchLabel' className='text-xl pb-2'>
          Automatically play audio
        </Label>
        <Switch
          aria-labelledbyledBy='switchLabel'
          value={autoPlay}
          onValueChange={setAutoPlay}
        />
      </View>
    </Container>
  );
}
