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
import { addTodo, toggleTodo, removeTodo } from '../store/todoSlice';

export default function TodoScreen() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (!text.trim()) return;

    dispatch(
      addTodo({
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      })
    );

    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="เพิ่มงาน..."
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonText}>เพิ่มงาน</Text>
      </TouchableOpacity>

      <Text style={styles.countText}>จำนวนงานทั้งหมด: {todos.length}</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity
              style={styles.todoTextWrap}
              onPress={() => dispatch(toggleTodo(item.id))}
              activeOpacity={0.7}
            >
              <Text style={item.completed ? styles.completed : styles.pending}>
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => dispatch(removeTodo(item.id))}
            >
              <Text style={styles.deleteButtonText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    fontSize: 14,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2196f3',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  countText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 10,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  todoTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  pending: {
    fontSize: 15,
    color: '#333',
  },
  completed: {
    fontSize: 15,
    color: '#333',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    width: 30,
    height: 34,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});