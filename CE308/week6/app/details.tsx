import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const products = [
  {
    id: '1',
    name: 'Premium Coffee Bean',
    price: '฿450',
    description:
      'เมล็ดกาแฟเกรดพรีเมียม คั่วกลาง หอมเข้ม รสชาตินุ่มลึก เหมาะสำหรับคอกาแฟตัวจริง',
  },
  {
    id: '2',
    name: 'Green Tea Powder',
    price: '฿290',
    description:
      'ผงชาเขียวแท้ 100% นำเข้าจากญี่ปุ่น เหมาะสำหรับทำลาเต้และเบเกอรี่',
  },
  {
    id: '3',
    name: 'Oat Milk 1L',
    price: '฿115',
    description:
      'นมโอ๊ตไขมันต่ำ ไม่มีแลคโตส เหมาะสำหรับผู้รักสุขภาพและผู้แพ้นมวัว',
  },
];

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();   // ✅ รับ id

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>ไม่พบสินค้า</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Product Image</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>

        <View style={styles.divider} />

        <Text style={styles.description}>
          {product.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  imagePlaceholder: {
    height: 220,
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#9CA3AF',
  },
  content: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F97316',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});