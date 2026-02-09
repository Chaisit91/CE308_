import "./global.css";
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
import Checkbox from "../components/Checkbox";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  acceptedTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  acceptedTerms?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "กรุณากรอกชื่อ-นามสกุล";
        if (value.trim().length < 3)
          return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร";
        return;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "กรุณากรอกอีเมล";
        if (!emailRegex.test(value.trim()))
          return "รูปแบบอีเมลไม่ถูกต้อง";
        return;

      case "phone":
        const phoneRegex = /^0[0-9]{9}$/;
        if (!value.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
        if (!phoneRegex.test(value.trim()))
          return "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง";
        return;

      case "address":
        if (!value.trim()) return "กรุณากรอกที่อยู่";
        if (value.trim().length < 10)
          return "ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร";
        return;

      case "password":
        if (!value.trim()) return "กรุณากรอกรหัสผ่าน";
        if (value.length < 6)
          return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        return;

      case "confirmPassword":
        if (!value.trim()) return "กรุณายืนยันรหัสผ่าน";
        if (value !== formData.password) return "รหัสผ่านไม่ตรงกัน";
        return;

      case "acceptedTerms":
        if (!formData.acceptedTerms)
          return "กรุณายอมรับข้อกำหนดและเงื่อนไข";
        return;
    }
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    const allTouched: any = {};
    Object.keys(formData).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูล");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("สำเร็จ", "ลงทะเบียนเรียบร้อยแล้ว");
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      acceptedTerms: false,
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
            {/* ---------- CustomInput ---------- */}

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
              label="ที่อยู่"
              placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด"
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              multiline={true}
              maxLength={200}
              style={{
                height: 100,
                textAlignVertical: "top",
              }}
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
              onChangeText={(value) =>
                handleChange("confirmPassword", value)
              }
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* ---------- Checkbox ---------- */}

            <Checkbox
              label="ฉันยอมรับข้อกำหนดและเงื่อนไข"
              checked={formData.acceptedTerms}
              onPress={() => {
                handleChange(
                  "acceptedTerms",
                  !formData.acceptedTerms
                );
                handleBlur("acceptedTerms");
              }}
              error={errors.acceptedTerms}
              touched={touched.acceptedTerms}
            />

            {/* ---------- Buttons ---------- */}

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
              <Text className="text-blue-700 text-sm leading-5">
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
