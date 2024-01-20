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
  const [maximized, setMaximized] = useState<boolean>(false);

  return (
    <Card className='p-4 mb-4'>
      <CardContent className='py-4 flex gap-2'>
        <TranslationTextRow
          language={item.inputLanguage}
          text={item.input}
          maximized={maximized}
        />
        <Separator className='w-full' />
        <TranslationTextRow
          language={item.outputLanguage}
          text={item.output}
          primary
          maximized={maximized}
        />
        <TranslationCardActions
          maximized={maximized}
          onMaximize={() => setMaximized((prev) => !prev)}
          translation={item}
        />
      </CardContent>
    </Card>
  );
}
