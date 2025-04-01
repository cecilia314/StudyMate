import { View, FlatList, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@apollo/client';
import { DELETE_QUIZ } from '@/src/graphql/queries';
import Card from '@/components/nativewindui/Card';

interface Quiz {
  _id: string;
  title: string;
  createdAt: string;
}

interface QuizzesProps {
  quizzes: Quiz[];
  onQuizDeleted: () => void;
}

export default function Quizzes({ quizzes, onQuizDeleted }: QuizzesProps) {
  const router = useRouter();

  const [deleteQuiz] = useMutation(DELETE_QUIZ, {
    onCompleted: () => onQuizDeleted(),
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
      contentContainerStyle={{ padding: 16, marginBottom: 56 }}
      renderItem={({ item }) => (
        <View className=" flex-1 w-1/2 m-2">
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
