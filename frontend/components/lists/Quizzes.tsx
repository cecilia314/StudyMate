import { View, FlatList } from 'react-native';
import Card from '@/components/nativewindui/Card';

interface Quiz {
  _id: string;
  title: string;
  createdAt: string;
}

interface QuizzesProps {
  quizzes: Quiz[];
}

export default function Quizzes({ quizzes }: QuizzesProps) {
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
            onPress={() => console.log(`Quiz selected: ${item._id}`)}
          />
        </View>
      )}
    />
  );
}
