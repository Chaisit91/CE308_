import { Text, View } from "react-native";
import "./global.css";

export default function Index() {
  return (
    <View className ="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-lg font-bold">Hello, NativeWind with TypeScript</Text>
    </View>
  );
}