import React, { useRef, useState } from 'react';
import { Animated, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet, Platform } from 'react-native';

interface CardProps {
  question: string;
  answer: string;
}

export const AnimatedCard = ({ question, answer }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const flipToFrontStyle = {
    transform: [{ rotateY: frontInterpolate }],
    backfaceVisibility: 'hidden' as 'hidden',
  };

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const flipToBackStyle = {
    transform: [{ rotateY: backInterpolate }],
    backfaceVisibility: 'hidden' as 'hidden',
  };

  // Animation
  const flipCard = () => {
    if (isFlipped) {
      // animated back to front
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      // animated to the back side
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <View className="flex-1 w-full web:w-96 justify-center items-center mt-5">
      <TouchableWithoutFeedback onPress={flipCard}>
        <View className="w-3/4 h-1/2">
          <Animated.View
            className="w-full h-full p-5 rounded-xl bg-white border-2 border-primary absolute bottom-0 top-0 left-0 right-0 justify-center"
            style={[styles.card, flipToFrontStyle]}
          >
            <Text className="text-black font-medium web:text-[#228CDB] text-center">
              {question}
            </Text>
          </Animated.View>
          <Animated.View
            className="w-full h-full p-5 rounded-xl  bg-muted absolute bottom-0 top-0 left-0 right-0 justify-center "
            style={[styles.card, flipToBackStyle]}
          >
            <Text className="text-black text-center">{answer}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...(Platform.OS === 'web' && {
      backgroundColor: '#FFFF',
      width: 300,
      height: 200,
      padding: 20,
      borderRadius: 10,
      position: 'absolute',
      justifyContent: 'center',
    }),
  },
});

export default styles;
