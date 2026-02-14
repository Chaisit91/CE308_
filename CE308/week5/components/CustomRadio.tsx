import React from "react";
import {TouchableOpacity, View, Text} from "react-native";

interface Option {
  label: string;
  value: string;
}

interface CustomRadioProps {
  label: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
}

export default function CustomRadio({
  label,
  options,
  value,
  onChange,
  error,
  touched,
}: CustomRadioProps) {
  const hasError = touched && error;

  return (
    <View className="w-full mb-4">
      {/* Label */}
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      {/* Options */}
      {options.map((option) => {
        const checked = value === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            className="flex-row items-center mb-3"
          >
            {/* Radio Circle */}
            <View
              className={`
                w-5 h-5 rounded-full border-2 items-center justify-center mr-3
                ${checked ? "border-blue-500" : "border-gray-300"}
              `}
            >
              {checked && (
                <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </View>

            <Text className="text-gray-800 text-base">
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Error Message */}
      {hasError && (
        <Text className="text-red-500 mt-1 text-sm">
          {error}
        </Text>
      )}
    </View>
  );
}