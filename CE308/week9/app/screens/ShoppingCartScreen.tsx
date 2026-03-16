import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addItem, removeItem, clearCart } from '../store/cartSlice';

export default function ShoppingCartScreen() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (!name.trim() || !quantity.trim() || !price.trim()) return;

    dispatch(
      addItem({
        id: Date.now().toString(),
        name: name.trim(),
        quantity: Number(quantity),
        price: Number(price),
      })
    );

    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="จำนวน"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="ราคา"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.mainButton} onPress={handleAddItem}>
        <Text style={styles.mainButtonText}>เพิ่มลงตะกร้า</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>
              {item.name} x{item.quantity} ราคาต่อชิ้นละ {item.price} บาท
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => dispatch(removeItem(item.id))}
            >
              <Text style={styles.deleteButtonText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.totalText}>ยอดรวม: {totalAmount} บาท</Text>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => dispatch(clearCart())}
      >
        <Text style={styles.mainButtonText}>ล้างตะกร้า</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 8,
    justifyContent: 'flex-start',
    marginTop:50,
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 8,
    fontSize: 15,
    marginTop:5,
  },
  mainButton: {
    backgroundColor: '#2196f3',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginRight: 6,
  },
  deleteButton: {
    backgroundColor: '#2196f3',
    width: 36,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  totalText: {
    fontSize: 15,
    color: '#333',
    marginTop: 2,
    marginBottom: 6,
  },
});