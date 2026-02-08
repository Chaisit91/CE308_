
// -------------------------- week 4.1 --------------------------//
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

// ---------------------------week 4.2--------------------------//
// import { View, Text, Alert } from "react-native";
// import { useState } from "react";
// import CustomInput from "../components/CustomInput";
// import CustomButton from "../components/CustomButton";

// export default function Index() {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [qty, setQty] = useState("");

//   const handleSubmit = () => {
//     Alert.alert(
//       "ข้อมูลสินค้า",
//       `ชื่อสินค้า: ${name}\nราคา: ${price}\nจำนวน: ${qty}`
//     );
//   };

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
      
//       <Text className="text-xl font-bold mb-4">
//         กรอกข้อมูลสินค้า
//       </Text>

//       <CustomInput
//         label="ชื่อสินค้า"
//         value={name}
//         placeholder="กรอกชื่อสินค้า"
//         onChangeText={setName}
//       />

//       <CustomInput
//         label="ราคา"
//         value={price}
//         placeholder="กรอกราคา"
//         onChangeText={setPrice}
//       />

//       <CustomInput
//         label="จำนวน"
//         value={qty}
//         placeholder="กรอกจำนวน"
//         onChangeText={setQty}
//       />

//       <CustomButton
//         title="ยืนยัน"
//         size="medium"
//         variant="primary"
//         onPress={handleSubmit}
//       />

//     </View>
//   );
// }
