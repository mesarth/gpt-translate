import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Combobox, ComboboxOption } from '~/components/ui/combobox';
import { Separator } from '~/components/ui/separator';
import { Textarea } from '~/components/ui/textarea';
import { TranslationResponse, languages, translate } from '~/service/translation.service';


export default function MainScreen() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = React.useState<ComboboxOption | null>(null);

  const languagesOptions = languages.map(l => ({label: l, value: l}));

  const handleTranslate = () => {
    if (!selectedLanguage?.value) return;
    translate(input, selectedLanguage?.value).then((res: TranslationResponse) => {
      setOutput(res?.message ?? '');
    },
    err => console.log("error ", err)
    );
  };

  const translationActivated = () => {
    return input.length > 3 && selectedLanguage?.value;
  }

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
    <View className='flex-1 justify-center items-center p-10'>
      <Text className='text-2xl native:text-4xl font-semibold text-foreground text-left w-full mb-2'>Translate</Text>
      <Card className='p-3 w-full'>
        <CardContent className='flex gap-3'>
          <Textarea placeholder='Enter Text' onChangeText={(t) => setInput(t)}/>
          <Separator className='w-full'/>
          <Combobox selectedItem={selectedLanguage} items={languagesOptions} onSelectedItemChange={setSelectedLanguage} placeholder='Select Language'/>
          <Button className='w-full mt-3' onPress={handleTranslate} disabled={!translationActivated()} onTouchStart={() => showDisabledButtonToast()}>Translate</Button>
          <Text className='text-lg'>{output}</Text>
        </CardContent>
      </Card>
    </View>
  );
}
