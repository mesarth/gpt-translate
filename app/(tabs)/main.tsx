import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Textarea } from '~/components/ui/textarea';
import { TranslationResponse, translate } from '~/service/translation.service';


export default function MainScreen() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleTranslate = () => {
    console.log("translate");
    translate(input, "german").then((res: TranslationResponse) => {
      console.log("success ", res);
      setOutput(res?.message ?? '');
    },
    err => console.log("error ", err)
    );
  };

  return (
    <View className='flex-1 justify-center items-center p-10'>
      <Text className='text-2xl native:text-4xl font-semibold text-foreground text-left w-full mb-2'>Translate</Text>
      <Card className='p-3 w-full'>
        <CardContent className='flex gap-3'>
          <Textarea placeholder='Enter Text' onChangeText={(t) => setInput(t)}/>
          <Button className='w-full mt-3' onPress={handleTranslate} disabled={input.length < 3}>Translate</Button>
          <Separator className='w-full'/>
          <Text className='text-lg'>{output}</Text>
        </CardContent>
      </Card>
    </View>
  );
}
