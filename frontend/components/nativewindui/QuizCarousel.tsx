import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AnimatedCard } from './AnimatedCard';

interface Quiz {
  question: string;
  answer: string;
}

interface CarouselProps {
  quiz: Quiz[];
}

export const QuizCarousel = ({ quiz }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quiz.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + quiz.length) % quiz.length);
  };

  return (
    <View className="flex-1">
      <Text className="w-full text-center text-sm text-black dark:text-white my-4">
        {quiz.length > 0
          ? `Question ${currentIndex + 1} of ${quiz.length}`
          : 'No questions available'}
      </Text>

      {quiz.length > 0 && (
        <AnimatedCard
          key={currentIndex}
          question={quiz[currentIndex].question}
          answer={quiz[currentIndex].answer}
        />
      )}

      {/* Buttons */}
      {quiz.length > 1 && (
        <View className="flex-row justify-between mb-16 mx-10">
          <TouchableOpacity
            onPress={handlePrevious}
            className="w-24 px-4 py-2 rounded-md bg-primary web:bg-[#228CDB]"
          >
            <Text className="text-white font-semibold text-center">
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            className="w-24 px-4 py-2 rounded-md bg-primary web:bg-[#228CDB]"
          >
            <Text className="text-white font-semibold text-center">Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
