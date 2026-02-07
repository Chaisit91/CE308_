import { Text, TouchableOpacity } from "react-native";

export default function CustomButton({
  title,
  variant = "primary",
  size = "medium",
  onPress,
}) {
  const variants = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
    danger: "bg-red-500",
  };

  const sizes = {
    small: "px-3 py-1",
    medium: "px-4 py-2",
    large: "px-6 py-3",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${variants[variant]} ${sizes[size]} rounded-lg active:bg-opacity-70 self-start`}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
