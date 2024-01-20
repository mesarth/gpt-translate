import { View, Text } from 'react-native';

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
};

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <View className={`flex-1 justify-center items-center p-8 ${className}`}>
      {props.title && (
        <Text className='text-2xl native:text-4xl font-semibold text-foreground text-left w-full mb-2'>
          {props.title}
        </Text>
      )}
      {children}
    </View>
  );
}
