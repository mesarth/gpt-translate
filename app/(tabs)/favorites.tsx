import { FlatList, Text } from 'react-native';
import Container from '../components/container';
import {
  useFavoriteStore,
  useTranslationStore,
} from '~/service/storage.service';
import TranslationCard from '../components/TranslationCard';

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
          renderItem={({ item }) => <TranslationCard item={item} />}
        />
      </Container>
      <Container title='Recents'>
        <FlatList
          className='w-full'
          data={translations}
          ListEmptyComponent={() => <EmptyList text='No translations yet...' />}
          renderItem={({ item }) => <TranslationCard item={item} />}
        />
      </Container>
    </>
  );
}
