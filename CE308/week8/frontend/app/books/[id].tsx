import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getBookById, updateBook } from '../../services/bookService';

export default function EditBookScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // ดึง id จาก URL

  // state สำหรับเก็บค่าหนังสือ
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // โหลดข้อมูลหนังสือเมื่อหน้าเปิด
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) return;

        const book = await getBookById(id);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description ?? ''); // กัน undefined
        setPrice(String(book.price));
      } catch (error) {
        Alert.alert('Error', 'Failed to load book');
        router.back();
      }
    };

    fetchBook();
  }, [id]);

  // ฟังก์ชันอัปเดตข้อมูล
  const handleUpdate = async () => {
    if (!title || !author || !price) {
      Alert.alert('Validation', 'Title, Author and Price are required.');
      return;
    }

    try {
      if (!id) return;

      await updateBook(id, {
        title,
        author,
        description,
        price: parseFloat(price),
      });

      Alert.alert('Success', 'Book updated!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to update book');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-yellow-400 px-4 py-4">
        <Text className="text-white text-xl font-bold">Edit Book</Text>
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

        {/* Update Button */}
        <TouchableOpacity
          className="bg-yellow-400 py-4 rounded-xl items-center mt-2"
          onPress={handleUpdate}
        >
          <Text className="text-white font-bold text-base">
            Update Book
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="bg-gray-200 py-4 rounded-xl items-center"
          onPress={() => router.back()}
        >
          <Text className="text-gray-600 font-semibold text-base">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}