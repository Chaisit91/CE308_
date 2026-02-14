import React from "react";
import {TouchableOpacity, View, Text} from "react-native";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onPress: (checked: boolean) => void;
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
    const hasError = touched && error;

    return (
        <View style={{ marginVertical: 8 }}>
            <TouchableOpacity
                onPress={() => onPress(!checked)}
                style={{ flexDirection: "row", alignItems: "center" }}
            >
                <View
                    style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: "#374151",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 8,
                    }}
                >
                    {checked && <Text style={{ color: "#374151" }}>✓</Text>}
                </View>
                <Text style={{ color: "#374151" }}>{label}</Text>
            </TouchableOpacity>
            {hasError && (
                <Text style={{ color: "#DC2626", marginTop: 4 }}>{error}</Text>
            )}
        </View>
    );
}