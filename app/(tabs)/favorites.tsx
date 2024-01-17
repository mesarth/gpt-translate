import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Container from '../components/container';
import { useEffect, useState } from 'react';
import { StorageService, Translation } from '~/service/storage.service';

export default function FavoritesScreen() {
  
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    StorageService.getTranslations().then((res: Translation[]) => {
      setTranslations(res);
    });
  }, []);

  return (
    <>
      <Container title='Favorites'>
      </Container>
      <Container title='Recents'>
        <Text>{translations.length}</Text>
      </Container>
    </>
  );
}
