import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function ShowQuizScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text className=" dark:text-white">Details of quiz {id} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
