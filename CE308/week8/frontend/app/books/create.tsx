import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { createBook } from '../../services/bookService';

export default function CreateBookScreen() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async () => {
    if (!title || !author || !price) {
      Alert.alert('Validation', 'Title, Author and Price are required.');
      return;
    }

    try {
      await createBook({
        title,
        author,
        description,
        price: parseFloat(price),
      });

      Alert.alert('Success', 'Book created!');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to create book');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4">
        <Text className="text-white text-xl font-bold">Create Book</Text>
      </View>

      <View className="p-4 gap-4">
        {/* Title */}
        <View>
          <Text className="text-gray-600 mb-1 font-medium">Title *</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 border border-gray-200"
            placeholder="Book title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Author */}
        <View>
          <Text className="text-gray-600 mb-1 font-medium">Author *</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 border border-gray-200"
            placeholder="Author name"
            value={author}
            onChangeText={setAuthor}
          />
        </View>

        {/* Description */}
        <View>
          <Text className="text-gray-600 mb-1 font-medium">Description</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 border border-gray-200"
            placeholder="Short description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={{ textAlignVertical: 'top' }}
          />
        </View>

        {/* Price */}
        <View>
          <Text className="text-gray-600 mb-1 font-medium">Price *</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 border border-gray-200"
            placeholder="0.00"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-xl items-center mt-2"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-base">Create Book</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity
          className="bg-gray-200 py-4 rounded-xl items-center"
          onPress={() => router.back()}
        >
          <Text className="text-gray-600 font-semibold text-base">Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}