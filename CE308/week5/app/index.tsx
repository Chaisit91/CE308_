import "./global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

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
  gender: string;
  birthDate: Date | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  acceptedTerms?: string;
  gender?: string;
  birthDate?: string;
}

export default function Index() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptedTerms: false,
    gender: "",
    birthDate: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  // ===== Format Date =====
  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  // ===== Validation =====
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
        if (!value.trim()) return "กรุณากรอกเบอร์โทร";
        if (!phoneRegex.test(value.trim()))
          return "รูปแบบเบอร์โทรไม่ถูกต้อง";
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
          return "กรุณายอมรับข้อกำหนด";
        return;

      case "gender":
        if (!value) return "กรุณาเลือกเพศ";
        return;

      case "birthDate":
        if (!value) return "กรุณาเลือกวันเกิด";

        const today = new Date();
        let age = today.getFullYear() - value.getFullYear();
        const m = today.getMonth() - value.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
          age--;
        }

        if (age < 13) return "อายุต้องมากกว่า 13 ปี";
        return;
    }
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

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
      Alert.alert("ข้อมูลไม่ถูกต้อง");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("ลงทะเบียนสำเร็จ");
    }, 1500);
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
      gender: "",
      birthDate: null,
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
        <ScrollView className="flex-1 bg-gray-50">
          <View className="px-6 mt-10">

            <CustomInput
              label="ชื่อ-นามสกุล"
              value={formData.fullName}
              onChangeText={(v) => handleChange("fullName", v)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              placeholder="ระบุชื่อและนามสกุล"
              touched={touched.fullName}
            />

            <CustomInput
              label="อีเมล"
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              placeholder="example@email.com"
              touched={touched.email}
            />

            <CustomInput
              label="เบอร์โทร"
              value={formData.phone}
              placeholder="0829717612"
              onChangeText={(v) => handleChange("phone", v)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
            />

            {/* ===== Gender ===== */}

            <Text className="font-medium mt-3 mb-2">เพศ</Text>

            <View className="flex-row justify-between">
              {["ชาย", "หญิง", "ไม่ระบุ"].map((g) => (
                <Checkbox
                  key={g}
                  label={g}
                  checked={formData.gender === g}
                  onPress={() => {
                    handleChange("gender", g);
                    handleBlur("gender");
                  }}
                />
              ))}
            </View>

            {touched.gender && errors.gender && (
              <Text className="text-red-500 text-sm">
                {errors.gender}
              </Text>
            )}

            {/* ===== Birth Date ===== */}

            <Text className="font-medium mt-4 mb-2">วันเกิด</Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View pointerEvents="none">
                <CustomInput
                  label=""
                  placeholder="DD/MM/YYYY"
                  value={
                    formData.birthDate
                      ? formatDate(formData.birthDate)
                      : ""
                  }
                  error={errors.birthDate}
                  touched={touched.birthDate}
                />
              </View>
            </TouchableOpacity>

            <CustomInput
              label="ที่อยู่"
              placeholder="กรอกที่อยู่ของผู้ใช้งาน"
              value={formData.address}
              onChangeText={(v) => handleChange("address", v)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              multiline
            />

            <CustomInput
              label="รหัสผ่าน"
              secureTextEntry
              value={formData.password}
              placeholder="อย่างน้อย 6 ตัวอักษร"
              onChangeText={(v) => handleChange("password", v)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              secureTextEntry
              value={formData.confirmPassword}
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              onChangeText={(v) =>
                handleChange("confirmPassword", v)
              }
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <Checkbox
              label="ยอมรับเงื่อนไข"
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

            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                loading={isLoading}
              />

              <CustomButton
                title="รีเซ็ต"
                variant="secondary"
                onPress={handleReset}
              />
            </View>
          </View>
     

          {showDatePicker && (
            <DateTimePicker
              value={formData.birthDate || new Date()}
              mode="date"
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);

                if (selectedDate) {
                  handleChange("birthDate", selectedDate);
                  handleBlur("birthDate");
                }
              }}
            />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
