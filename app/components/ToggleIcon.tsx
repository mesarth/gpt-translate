import { useCallback, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import Transition,{ useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  toggled?: boolean;
  onPress?: () => void;
  First: React.ReactNode;
  Second: React.ReactNode;
  time?: number;
}

export default function ToggleIcon({ toggled = false, onPress, First, Second, time }: Props) {
  const [firstActive, setFirstActive] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!firstActive) {
      timer = setTimeout(() => {
        setFirstActive(true);
      }, time);
    }
    return () => clearTimeout(timer);
  }, [firstActive, time]);

  const action = () => {
    if(toggled){
      onPress && onPress();
    } 
    else if(firstActive || !time) {
      setFirstActive(prev => !prev);
      onPress && onPress();
    }
  };

  return (
    <Pressable onPress={action}>
      {toggled || !firstActive ? Second : First}
    </Pressable>
  );
}