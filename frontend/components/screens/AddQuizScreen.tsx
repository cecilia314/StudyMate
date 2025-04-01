import { useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useMutation } from '@apollo/client';
import { CREATE_QUIZ } from '@/src/graphql/queries';
import { Button } from '@/components/nativewindui/Button';

export default function AddQuizScreen() {
  const router = useRouter();
  const [pdfFile, setPdfFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  const [createQuiz, { loading, error }] = useMutation(CREATE_QUIZ, {
    onCompleted: () => {
      router.navigate('/quizzes');
    },
    onError: (err) => {
      console.error('Error creating the quiz:', err);
    },
  });

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('Canceled file selection');
        return;
      }

      setPdfFile(result);

      if (Platform.OS === 'web') {
        convertPdfToBase64Web(result.assets[0]);
      } else {
        convertPdfToBase64Mobile(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting the file:', error);
    }
  };

  const convertPdfToBase64Mobile = async (uri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setPdfBase64(`data:application/pdf;base64,${base64}`);
    } catch (error) {
      console.error('Error converting PDF to base64 (phone):', error);
    }
  };

  const convertPdfToBase64Web = async (
    file: DocumentPicker.DocumentPickerAsset
  ) => {
    try {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setPdfBase64(base64String);
      };

      const response = await fetch(file.uri);
      const blob = await response.blob();
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error converting PDF to base64 (web):', error);
    }
  };

  const handleSubmit = async () => {
    if (!pdfBase64) return;

    console.log('Sending file ...');

    await createQuiz({
      variables: { fileBase64: pdfBase64 },
    });
  };

  return (
    <View className="flex-1 p-4 mx-6 web:m-auto">
      <TouchableOpacity
        onPress={handleFilePick}
        className="border border-gray-300 p-4 rounded-md items-center mb-4"
      >
        <Text className="text-gray-800 dark:text-gray-300">
          {pdfFile?.assets?.[0]?.name ?? 'Seleccionar un archivo PDF'}
        </Text>
      </TouchableOpacity>

      <Button onPress={handleSubmit} disabled={!pdfFile}>
        <Text className="text-white w-full text-center">Submit PDF</Text>
      </Button>
      {error && <Text className="text-destructive mt-2">{error.message}</Text>}

      <View className="flex-1 justify-end self-end gap-4 mb-14">
        <Button variant="secondary" onPress={() => router.back()}>
          <Text className="text-primary-light w-full text-center">To Home</Text>
        </Button>

        <Button onPress={() => router.navigate('/quizzes')}>
          <Text className="text-white w-full text-center">All Quizzes</Text>
        </Button>
      </View>
    </View>
  );
}
