import { View, FlatList, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@apollo/client';
import { DELETE_QUIZ } from '@/src/graphql/queries';
import Card from '@/components/nativewindui/Card';
import { useState, useEffect } from 'react';

interface Quiz {
  _id: string;
  title: string;
  createdAt: string;
}

interface QuizzesProps {
  quizzes: Quiz[];
  onCachedQuizDeleted?: (id: string) => void;
}

export default function Quizzes({
  quizzes: initialQuizzes,
  onCachedQuizDeleted,
}: QuizzesProps) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState(initialQuizzes);

  useEffect(() => {
    setQuizzes(initialQuizzes);
  }, [initialQuizzes]);

  const [deleteQuiz] = useMutation(DELETE_QUIZ, {
    update(cache, { data: { deleteQuiz } }) {
      cache.modify({
        id: cache.identify({ __typename: 'Query' }),
        fields: {
          getQuizzes(existingData = {}, { readField }) {
            if (!existingData?.quizzes) return existingData;
            return {
              ...existingData,
              quizzes: existingData.quizzes.filter(
                (quiz: { _id: string }) =>
                  readField('_id', quiz) !== deleteQuiz._id
              ),
              totalCount: Math.max(existingData.totalCount - 1, 0),
            };
          },
        },
      });
    },
    onCompleted: (response) => {
      const deletedQuizId = response?.deleteQuiz?._id;
      if (onCachedQuizDeleted && deletedQuizId) {
        onCachedQuizDeleted(deletedQuizId);
      }
    },
  });

  const handleDelete = async (id: string) => {
    const confirmDelete =
      Platform.OS === 'web'
        ? window.confirm('Are you sure you want to delete this quiz?')
        : await new Promise((resolve) =>
            Alert.alert('Confirm Deletion', 'Are you sure?', [
              {
                text: 'Cancel',
                onPress: () => resolve(false),
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => resolve(true),
              },
            ])
          );

    if (!confirmDelete) return;

    await deleteQuiz({ variables: { _id: id } });
  };

  return (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ padding: 10, marginBottom: 56 }}
      renderItem={({ item }) => (
        <View className="cardContainer flex-1 w-1/2 m-2">
          <Card
            title={item.title}
            date={new Date(Number(item.createdAt)).toLocaleDateString('en-US')}
            onPress={() => {
              router.navigate(`/(zShared)/quiz/${item._id}`);
            }}
            onButtonClick={() => handleDelete(item._id)}
          />
        </View>
      )}
    />
  );
}
