import { Copy, CopyIcon, StarIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Combobox, ComboboxOption } from '~/components/ui/combobox';
import { Separator } from '~/components/ui/separator';
import { Skeleton } from '~/components/ui/skeleton';
import { Textarea } from '~/components/ui/textarea';
import * as Clipboard from 'expo-clipboard';
import Container from '../components/container';
import {
  TranslationResponse,
  TranslationSerivce,
} from '~/service/translation.service';
import { Translation, useTranslationStore } from '~/service/storage.service';
import TranslationCardActions from '../components/TranslatioonCardActions';
import { useSettingsStore } from '~/service/settings.service';
import { Audio } from 'expo-av';

export default function MainScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  // const [output, setOutput] = useState<string>('Labore velit mollit excepteur commodo et proident ullamco qui deserunt amet laboris consequat commodo enim pariatur. Occaecat do ut sit non sit esse reprehenderit laboris do qui in proident.');
  const [output, setOutput] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] =
    useState<ComboboxOption | null>(null);
  const [translation, setTranslation] = useState<Translation | null>(null);
  const addTranslation = useTranslationStore((state) => state.addTranslation);

  const languagesOptions = TranslationSerivce.languages.map((l) => ({
    label: `${l.name} - ${l.native} ${l.flag}`,
    value: l.name,
  }));

  const autoCopy = useSettingsStore((state) => state.autoCopy);
  const autoPlay = useSettingsStore((state) => state.autoPlay);

  const [sound, setSound] = useState<Audio.Sound>();
  const voice = useSettingsStore((state) => state.voice);

  const playAudio = (text: string) => {
    TranslationSerivce.textToSpeech(text, voice).then((audio) => {
      setSound(audio);
      audio.playAsync();
    });
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleTranslate = () => {
    if (!selectedLanguage?.value) return;
    setLoading(true);
    TranslationSerivce.translate(input, selectedLanguage?.value)
      .then(
        (res: TranslationResponse) => {
          setOutput(res?.message ?? '');
          const translation: Translation = {
            input,
            inputLanguage: res?.inputLanguage ?? '',
            output: res?.message ?? '',
            outputLanguage: selectedLanguage?.value ?? '',
          };
          setTranslation(translation);
          addTranslation(translation);
          if (autoCopy) Clipboard.setStringAsync(translation.output);
          if (autoPlay) playAudio(translation.output);
        },
        (err) => console.log('error ', err)
      )
      .finally(() => setLoading(false));
  };

  const translationActivated = () => {
    return input.length > 3 && selectedLanguage?.value;
  };

  const showDisabledButtonToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Please enter text and select a language',
      visibilityTime: 3000,
      autoHide: true,
      swipeable: true,
      bottomOffset: 100,
      position: 'bottom',
    });
  };

  return (
    <Container title='Translate'>
      <Card className='w-full'>
        <CardContent className='p-5 flex gap-3'>
          <Textarea
            placeholder='Enter Text'
            onChangeText={(t) => setInput(t)}
          />
        </CardContent>
        <Separator className='w-full' />
        <CardContent className='p-5 flex gap-3'>
          <Combobox
            selectedItem={selectedLanguage}
            items={languagesOptions}
            onSelectedItemChange={setSelectedLanguage}
            placeholder='Select Language'
          />
          <Skeleton
            key={`skeleton-button-${loading}`}
            show={loading}
            radius={4}
          >
            <Button
              className='w-full mb-3'
              onPress={handleTranslate}
              disabled={!translationActivated()}
              onTouchStart={() =>
                !translationActivated() && showDisabledButtonToast()
              }
            >
              Translate
            </Button>
          </Skeleton>
          {translation && (
            <>
              <Skeleton
                key={`skeleton-text-${loading}`}
                show={loading}
                radius={4}
              >
                <Text className='text-lg'>{output}</Text>
              </Skeleton>
              <TranslationCardActions translation={translation} />
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
