import { Text } from 'react-native';
import Container from '../components/container';
import { StorageService, Translation, useTranslationStore } from '~/service/storage.service';
import { useState, useEffect } from 'react';

export default function FavoritesScreen() {
  const translations = useTranslationStore(state => state.translations);

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
