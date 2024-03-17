import { SectionList, Text } from 'react-native';
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

  const data = [
    { title: 'Favorites', data: favorites },
    { title: 'Recents', data: translations },
  ];

  return (
    <Container>
      <SectionList
        className='w-full'
        sections={data}
        renderItem={({ item }) => <TranslationCard item={item} />}
        renderSectionHeader={({ section: { title, data } }) => (
          <>
            <Text className='text-2xl native:text-4xl font-semibold text-foreground text-left w-full pb-2 bg-background'>
              {title}
            </Text>
            {data.length == 0 && <EmptyList text='No entries yet...' />}
          </>
        )}
        stickySectionHeadersEnabled
      />
    </Container>
  );
}
