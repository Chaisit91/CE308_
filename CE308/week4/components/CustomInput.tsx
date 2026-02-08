import { View, Text, TextInput } from "react-native";

type CustomInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: CustomInputProps) => {
  return (
    <View className="mb-4 w-full">
      <Text className="mb-1 text-gray-700 font-medium">
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="
          border
          border-gray-300
          rounded-lg
          px-3
          py-2
          bg-gray-100
        "
      />
    </View>
  );
};
