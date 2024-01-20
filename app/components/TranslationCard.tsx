import { Card, CardTitle, CardContent } from '~/components/ui/card';
import TranslationCardActions from './TranslatioonCardActions';
import { Text, View } from 'react-native';
import { Translation } from '~/service/storage.service';
import { Separator } from '~/components/ui/separator';
import ToggleIcon from './ToggleIcon';
import { PlayCircle, PlayIcon, Volume1Icon } from 'lucide-react-native';
import { TranslationSerivce } from '~/service/translation.service';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import TranslationTextRow from './TranslationTextRow';

export default function TranslationCard({ item }: { item: Translation }) {
  return (
    <Card className='p-4 mb-4'>
      <CardTitle>
        <Text className='text-foreground text-2xl'>
          {item.inputLanguage} - {item.outputLanguage}
        </Text>
      </CardTitle>
      <CardContent className='py-4 flex gap-2'>
        <TranslationTextRow text={item.input} />
        <Separator className='w-full' />
        <TranslationTextRow text={item.output} />
        <TranslationCardActions translation={item} />
      </CardContent>
    </Card>
  );
}
