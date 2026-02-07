import { View, Text } from "react-native";
import CustomButton from "./CustomButton";

export default function ItemCard({ item }) {
  return (
    <View className="bg-gray-200 p-4 rounded-xl mb-4">

      <Text className="text-3xl font-bold mb-2">
        ชื่อสินค้า: {item.name}
      </Text>

      <Text className="text-base text-gray-700">
        ราคา: {item.price}
      </Text>

      <Text className="text-base text-gray-700 mb-3">
        จำนวน: {item.qty}
      </Text>

      <CustomButton
        title="สั่งซื้อ"
        variant={item.variant}
        onPress={() => alert(`สั่งซื้อ ${item.name}`)}
      />

    </View>
  );
}
