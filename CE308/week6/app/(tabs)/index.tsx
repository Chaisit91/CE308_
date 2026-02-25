import { Text, StyleSheet, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: '1', name: 'Premium Coffee Bean', price: '฿450' },
  { id: '2', name: 'Green Tea Powder', price: '฿290' },
  { id: '3', name: 'Oat Milk 1L', price: '฿115' },
];

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {products.map((item) => (
        <Pressable
          key={item.id}
          onPress={() =>
            router.push({
              pathname: '../details',
              params: {
                id: item.id,
                name: item.name,
                price: item.price,
              },
            })
          }
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    backgroundColor: '#F3F4F6',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111827',
  },

  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F97316', 
  },
});