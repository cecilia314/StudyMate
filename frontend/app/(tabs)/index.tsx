import { useRouter } from 'expo-router';
import { useQuery } from '@apollo/client';
import { GET_QUIZZES } from '@/src/graphql/queries';
import { useEffect } from 'react';
import HomeScreen from '@/components/screens/HomeScreen';

export default function Index() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_QUIZZES, {
    variables: { amount: 4 },
  });

  useEffect(() => {
    if (loading) console.log('loading quizzes ....');
    if (error) console.log('Error: ', error.message);
    if (data) console.log('AMAZING!: ', data);
  }, [loading, error, data]);

  return <HomeScreen />;
}
