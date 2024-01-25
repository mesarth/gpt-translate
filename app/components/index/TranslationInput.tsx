import { XCircleIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CardContent } from '~/components/ui/card';

export default function TranslationInput({
  onChangeText,
}: {
  onChangeText: (t: string) => void;
}) {
  const [value, setValue] = useState<string>('');
  const iconOpacity = useSharedValue(0);

  const onClear = () => {
    setValue('');
  };

  // Update icon's opacity based on input value
  useEffect(() => {
    iconOpacity.value = value ? withTiming(1) : withTiming(0);
  }, [value, iconOpacity]);

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
    };
  });

  const textSize = value.length > 30 ? 'text-2xl' : 'text-4xl';

  return (
    <CardContent className='p-5 flex flex-row items-center gap-3 w-full justify-between'>
      <TextInput
        className={`flex-1 border-0 p-3 native:${textSize} font-bold h-28 leading-[1.25] text-foreground items-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
        value={value}
        multiline={true}
        placeholder='Enter Text'
        onChangeText={(text) => {
          setValue(text);
          onChangeText(text);
        }}
      />
      <Animated.View style={iconStyle} className='flex-grow-0'>
        <Pressable onPress={onClear}>
          <XCircleIcon size={24} className='text-muted-foreground' />
        </Pressable>
      </Animated.View>
    </CardContent>
  );
}
