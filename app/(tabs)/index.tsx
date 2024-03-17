import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Combobox, ComboboxOption } from '~/components/ui/combobox';
import { Separator } from '~/components/ui/separator';
import { Skeleton } from '~/components/ui/skeleton';
import * as Clipboard from 'expo-clipboard';
import Container from '../components/container';
import {
  TranslationResponse,
  TranslationSerivce,
} from '~/service/translation.service';
import { Translation, useTranslationStore } from '~/service/storage.service';
import { useSettingsStore } from '~/service/settings.service';
import TranslationOutput from '../components/index/TranslationOutput';
import usePlayAudio from '../hooks/usePlayAudio';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import TranslationInput from '../components/index/TranslationInput';

export default function MainScreen() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

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

  const { playAudio } = usePlayAudio();

  const handleTranslate = () => {
    Keyboard.dismiss();
    if (!selectedLanguage?.value) return;
    setLoading(true);
    setError(null);
    TranslationSerivce.translate(input, selectedLanguage?.value)
      .then(
        (res: TranslationResponse) => {
          if (res.error) {
            setError(res.error);
            return;
          }
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

  useEffect(() => {
    if (
      translation?.input !== input ||
      translation?.outputLanguage !== selectedLanguage?.value
    ) {
      setTranslation(null);
    }
  }, [input, selectedLanguage]);

  return (
    <Container title='Translate'>
      <Card className='w-full'>
        <TranslationInput onChangeText={setInput} />
        <Separator className='w-full' />
        <CardContent className='p-5 pb-0 flex gap-3'>
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
        </CardContent>
        {translation && (
          <TranslationOutput loading={loading} translation={translation} />
        )}
        {error && (
          <CardContent className='p-5 flex gap-3'>
            <Alert
              icon='AlertTriangle'
              variant='destructive'
              className='max-w-xl'
            >
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        )}
      </Card>
    </Container>
  );
}
