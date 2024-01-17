import { FlatList, Text } from 'react-native';
import Container from '../components/container';
import { StorageService, Translation, useTranslationStore } from '~/service/storage.service';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

export default function FavoritesScreen() {
  const translations = useTranslationStore(state => state.translations);
  const favorites:any = [];

  return (
    <>
      <Container title='Favorites'>
        <FlatList
          className='w-full'
          data={favorites}
          ListEmptyComponent={() => <Text className='text-foreground text-xl text-center mt-10'>No favorites yet...</Text>}
          renderItem={({item}) => 
          <Card className='p-4'>
            <CardTitle>
              <Text className='text-foreground text-2xl'>
                {item.inputLanguage} - {item.outputLanguage}
              </Text>
            </CardTitle>
            <CardContent className='py-4 flex gap-2'>
              <Text>{item.input}</Text>
              <Separator className='w-full'/>
              <Text>{item.output}</Text>
            </CardContent>
          </Card>
        }
        />
      </Container>
      <Container title='Recents'>
        <FlatList
          className='w-full'
          data={translations}
          ListEmptyComponent={() => <Text className='text-foreground text-xl'>No translations yet...</Text>}
          renderItem={({item}) => 
          <Card className='p-4'>
            <CardTitle>
              <Text className='text-foreground text-2xl'>
                {item.inputLanguage} - {item.outputLanguage}
              </Text>
            </CardTitle>
            <CardContent className='py-4 flex gap-2'>
              <Text>{item.input}</Text>
              <Separator className='w-full'/>
              <Text>{item.output}</Text>
            </CardContent>
          </Card>
        }
        />
      </Container>
    </>
  );
}
