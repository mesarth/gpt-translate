import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { Textarea } from '~/components/ui/textarea';

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className='flex-1 justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle>Translate</CardTitle>
          <CardDescription>Translate text from one language to another.</CardDescription>
        </CardHeader>
        <CardContent className='flex gap-3'>
          <Textarea placeholder='Enter Text'/>
          <Separator className='w-full'/>
          <Textarea className='opacity-50' placeholder='The translation will appear here' editable={false}/>
        </CardContent>
      </Card>
    </View>
  );
}
