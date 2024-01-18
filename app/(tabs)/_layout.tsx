import { Tabs } from 'expo-router';
import {
  Camera,
  Languages,
  LayoutPanelLeft,
  MenuSquare,
  Star,
} from 'lucide-react-native';
import { DrawerToggle } from '~/components/DrawerToggle';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Translate',
          tabBarIcon({ color, size }) {
            return <Languages color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name='camera'
        options={{
          title: 'Camera',
          tabBarIcon({ color, size }) {
            return <Camera color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          tabBarIcon({ color, size }) {
            return <Star color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}

type RootTabs = React.ComponentProps<typeof Tabs>;
type ScreenOptions = RootTabs['screenOptions'];

const screenOptions: ScreenOptions = {
  headerRight: () => <ThemeToggle />,
};
