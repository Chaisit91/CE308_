import { useCallback, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Book, deleteBook, getBooks } from '../../services/bookService';

export default function BookListScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch books');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteBook(id);
            fetchBooks();
          } catch (err: any) {
            if (err.response && err.response.status === 404) {
              Alert.alert('Book not found or already deleted');
            } else {
              Alert.alert('Error', 'Failed to delete book');
            }
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">Book List</Text>

        <TouchableOpacity
          className="bg-white px-3 py-1 rounded-full"
          onPress={() =>
            router.push({
              pathname: './books/create',
            })
          }
        >
          <Text className="text-blue-600 font-semibold">+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.bookId}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            No books found.
          </Text>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 shadow">
            <Text className="text-lg font-bold text-gray-800">
              {item.title}
            </Text>

            <Text className="text-gray-500 text-sm mt-1">
              by {item.author}
            </Text>

            <Text className="text-gray-400 text-sm mt-1" numberOfLines={2}>
              {item.description}
            </Text>

            <Text className="text-blue-600 font-semibold mt-2">
              ฿{Number(item.price).toFixed(2)}
            </Text>

            {/* Actions */}
            <View className="flex-row gap-2 mt-3">
              <TouchableOpacity
                className="flex-1 bg-yellow-400 py-2 rounded-xl items-center"
                onPress={() =>
                  router.push({
                    pathname: './books/[id]',
                    params: { id: item.bookId },
                  })
                }
              >
                <Text className="font-semibold text-white">Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-red-500 py-2 rounded-xl items-center"
                onPress={() => handleDelete(item.bookId)}
              >
                <Text className="font-semibold text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}