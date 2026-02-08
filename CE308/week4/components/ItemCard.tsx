import { View, Text } from "react-native";
import { CustomButton } from "./CustomButton";

type ItemCardProps = {
  name: string;
  price: number;
  pcs: number;
  btnSize: "sm" | "md" | "lg";
  btnColor: "primary" | "secondary" | "danger";
  onBuy: () => void;
};

export const ItemCard = ({
  name,
  price,
  pcs,
  btnSize,
  btnColor,
  onBuy,
}: ItemCardProps) => {
  return (
    <View className="bg-gray-200 rounded-xl p-4 mb-4 w-full">
      <Text className="text-lg font-bold mb-2">
        ชื่อสินค้า: {name}
      </Text>

      <Text className="text-base">ราคา: {price}</Text>
      <Text className="text-base mb-3">จำนวน: {pcs}</Text>

      <CustomButton
        title="สั่งซื้อ"
        size={btnSize}
        variant={btnColor}
        onPress={onBuy}
      />
    </View>
  );
};
