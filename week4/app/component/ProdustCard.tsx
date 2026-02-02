import { Text, View } from "react-native";

type ProductCardProps = {
    name: string;
    price: number;
    description?: string;
};
export const ProductCard = ({ name, price, description }: ProductCardProps) => {
    return (
        <View className="p-4 border border-gray-300 rounded-lg bg-gray-600 shadow-md w-64">
            <Text className="text-xl font-bold text-gray-900">{name}</Text>
            <Text className="text-lg text-green-600 mt-2">${price.toFixed(2)}</Text>
            {description && <Text className="text-gray-700 mt-2">{description}</Text>}
        </View>
    );
}