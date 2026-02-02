import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
};

export const CustomButton = ({
    title,
    onPress,
    variant = "primary",
    size = "md",
}: CustomButtonProps) => {
    const variantClasses = {
        primary: "bg-blue-500 active:bg-blue-700",
        secondary: "bg-gray-500 active:bg-gray-700",
        danger: "bg-red-500 active:bg-red-700",
    };
    const sizeClasses = {
        sm: "px-2 py-1 test-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <TouchableOpacity
            className={[
                variantClasses[variant],
                sizeClasses[size],
                "rounded-lg active:bg-opacity-70"
            ].join(" ")}
            onPress={onPress}
        >
            <Text className="text-white font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};