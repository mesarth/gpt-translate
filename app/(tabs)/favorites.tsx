import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Container from '../components/container';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Container title='Favorites'>
      </Container>
      <Container title='Recents'>
      </Container>
    </>
  );
}
