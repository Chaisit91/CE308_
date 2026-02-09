import "../global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "กรุณากรอกชื่อ-นามสกุล";
        if (value.trim().length < 3)
          return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร";
        return undefined;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "กรุณากรอกอีเมล";
        if (!emailRegex.test(value.trim()))
          return "รูปแบบอีเมลไม่ถูกต้อง";
        return undefined;

      case "phone":
        const phoneRegex = /^0[0-9]{9}$/;
        if (!value.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
        if (!phoneRegex.test(value.trim()))
          return "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง";
        return undefined;

      case "password":
        if (!value.trim()) return "กรุณากรอกรหัสผ่าน";
        if (value.length < 6)
          return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        return undefined;

      case "confirmPassword":
        if (!value.trim()) return "กรุณายืนยันรหัสผ่าน";
        if (value !== formData.password) return "รหัสผ่านไม่ตรงกัน";
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลในฟอร์มอีกครั้ง");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "สำเร็จ",
        `ลงทะเบียนเรียบร้อยแล้ว\n\nชื่อ: ${formData.fullName}\nอีเมล: ${formData.email}\nเบอร์โทร: ${formData.phone}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("Form Data:", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancel",
          },
        ]
      );
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>

            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder=" ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            <CustomInput
              label="อีเมล"
              placeholder="example@example.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0829717612"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              maxLength={10}
            />

            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />

              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                disabled={isLoading}
              />
            </View>

            <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold text-base mb-2">
                คำแนะนำ
              </Text>
              <Text className=" text-blue-700 text-sm leading-5">
                - กรอกข้อมูลให้ครบถ้วน{"\n"}
                - อีเมลต้องมีรูปแบบที่ถูกต้อง{"\n"}
                - เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{"\n"}
                - รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร{"\n"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
