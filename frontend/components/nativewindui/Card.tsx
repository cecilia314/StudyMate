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
      className="bg-slate-50 dark:bg-gray-800 rounded-xl shadow-md p-4 w-full h-52"
      accessibilityRole="button"
      accessible={true}
    >
      <View className="flex flex-col gap-2 justify-evenly h-full">
        {/* Title */}
        <Text className="text-black dark:text-white text-lg web:text-2xl line-clamp-2">
          {title}
        </Text>

        {/* Date */}
        <Text className="text-black dark:text-slate-300">
          Created on: {date}
        </Text>

        <View className="self-end w-full web:w-1/2">
          <Button variant="secondary" onPress={onButtonClick}>
            <MaterialIcons name="delete" size={24} color={COLORS.white} />
            {Platform.OS === 'web' && (
              <Text className="text-base text-white">Delete</Text>
            )}
          </Button>
        </View>
      </View>
    </Pressable>
  );
}
