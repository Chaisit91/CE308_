import { View, FlatList } from "react-native";
import ItemCard from "../components/ItemCard";
import React from "react";


type Product = {
  id: string;
  name: string;
  price: number;
  qty: number;
  variant: "primary" | "secondary" | "danger";
};

export default function Index() {
  const products: Product[] = [
    { id: "1", name: "Banana", price: 2000, qty: 10, variant: "primary" },
    { id: "2", name: "Mango", price: 2000, qty: 10, variant: "secondary" },
    { id: "3", name: "Apple", price: 2000, qty: 10, variant: "danger" },
  ];

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
      />
    </View>
  );
}
