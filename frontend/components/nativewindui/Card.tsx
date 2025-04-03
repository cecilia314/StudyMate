import { View, Pressable, Platform, Text } from 'react-native';
import { Button } from './Button';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/theme/colors';

interface CardProps {
  title: string;
  date: string;
  onPress?: () => void;
  onButtonClick?: () => void;
}

export default function Card({
  title,
  date,
  onPress,
  onButtonClick,
}: CardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card web:bg-white rounded-xl shadow-md p-4 w-full h-52"
      accessibilityRole="button"
      accessible={true}
    >
      <View className="flex flex-col gap-2 justify-evenly h-full">
        <Text className="text-black capitalize dark:text-white text-lg web:text-2xl web:dark:text-black line-clamp-2">
          {title}
        </Text>

        <Text className="text-black dark:text-slate-300 web:dark:text-black">
          Created on: {date}
        </Text>

        <View className="self-end w-full web:w-1/2">
          <Button variant="secondary" onPress={onButtonClick}>
            <MaterialIcons
              name="delete"
              size={24}
              color={COLORS.light.primary}
            />
            {Platform.OS === 'web' && (
              <Text className="text-base text-white web:text-[#1D7BC2]">
                Delete
              </Text>
            )}
          </Button>
        </View>
      </View>
    </Pressable>
  );
}
