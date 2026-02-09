import React from "react";
import { View, Text, Pressable } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}

export default function Checkbox({
  label,
  checked,
  onPress,
  error,
  touched,
}: CheckboxProps) {
  return (
    <View className="mt-4">
      <Pressable onPress={onPress} className="flex-row items-center">
        <View
          className={`w-5 h-5 mr-3 border-2 rounded justify-center items-center ${
            checked ? "bg-blue-600 border-blue-600" : "border-gray-400"
          }`}
        >
          {checked && <View className="w-2 h-2 bg-white rounded-sm" />}
        </View>

        <Text className="text-gray-700">{label}</Text>
      </Pressable>

      {touched && error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
