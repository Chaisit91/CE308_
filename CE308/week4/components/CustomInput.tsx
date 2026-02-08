import { View, Text, TextInput } from "react-native";

type CustomInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const CONTAINER_CLASS = "mb-4 w-full";
const LABEL_CLASS = "mb-1 text-gray-700 font-medium";
const INPUT_CLASS = "border border-gray-300 rounded-lg px-3 py-2 bg-gray-100";

// ==================================

export const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: CustomInputProps) => {
  return (
    <View className={CONTAINER_CLASS}>
      <Text className={LABEL_CLASS}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className={INPUT_CLASS}
      />
    </View>
  );
};
