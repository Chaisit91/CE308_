import { View, Text, Alert } from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function FormScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "ข้อมูลสินค้า",
      `ชื่อ: ${name}\nราคา: ${price}\nจำนวน: ${qty}`
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold mb-4">
        กรอกข้อมูลสินค้า
      </Text>

      <CustomInput
        label="ชื่อสินค้า"
        value={name}
        placeholder="กรอกชื่อสินค้า"
        onChangeText={setName}
      />

      <CustomInput
        label="ราคา"
        value={price}
        placeholder="กรอกราคา"
        onChangeText={setPrice}
      />

      <CustomInput
        label="จำนวน"
        value={qty}
        placeholder="กรอกจำนวน"
        onChangeText={setQty}
      />

      <CustomButton
        title="ยืนยัน"
        size="medium"
        variant="primary"
        onPress={handleSubmit}
      />
    </View>
  );
}
