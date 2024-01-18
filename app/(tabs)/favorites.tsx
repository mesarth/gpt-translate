import { FlatList, Pressable, Text, View } from 'react-native';
import Container from '../components/container';
import { Card, CardContent, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import {
  useFavoriteStore,
  useTranslationStore,
} from '~/service/storage.service';
import { StarIcon, CopyIcon } from 'lucide-react-native';
import TranslationCardActions from '../components/TranslatioonCardActions';

const EmptyList = ({ text }: { text: string }) => (
  <Text className='text-foreground text-xl text-center mt-10'>{text}</Text>
);

export default function FavoritesScreen() {
  const translations = useTranslationStore((state) => state.translations);
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <>
      <Container title='Favorites'>
        <FlatList
          className='w-full'
          data={favorites}
          ListEmptyComponent={() => <EmptyList text='No favorites yet...' />}
          renderItem={({ item }) => (
            <Card className='p-4'>
              <CardTitle>
                <Text className='text-foreground text-2xl'>
                  {item.inputLanguage} - {item.outputLanguage}
                </Text>
              </CardTitle>
              <CardContent className='py-4 flex gap-2'>
                <Text>{item.input}</Text>
                <Separator className='w-full' />
                <Text>{item.output}</Text>
                <TranslationCardActions translation={item} />
              </CardContent>
            </Card>
          )}
        />
      </Container>
      <Container title='Recents'>
        <FlatList
          className='w-full'
          data={translations}
          ListEmptyComponent={() => <EmptyList text='No translations yet...' />}
          renderItem={({ item }) => (
            <Card className='p-4 mb-4'>
              <CardTitle>
                <Text className='text-foreground text-2xl'>
                  {item.inputLanguage} - {item.outputLanguage}
                </Text>
              </CardTitle>
              <CardContent className='py-4 flex gap-2'>
                <Text>{item.input}</Text>
                <Separator className='w-full' />
                <Text>{item.output}</Text>
                <TranslationCardActions translation={item} />
              </CardContent>
            </Card>
          )}
        />
      </Container>
    </>
  );
}
