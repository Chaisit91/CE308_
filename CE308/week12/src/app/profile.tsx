import { useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '../schemas/profileSchema';

// useWatch component แยก
// subscribe firstName + lastName เฉพาะ component นี้
// field อื่นพิมพ์ -> component นี้ไม่ re-render
function NamePreview({ control }: { control: any }) {
  const [firstName, lastName] = useWatch({
    control,
    name: ['firstName', 'lastName'],
  });

  return (
    <Text style={s.preview}>
      ชื่อเต็ม: {firstName} {lastName}
    </Text>
  );
}

export default function ProfileScreen() {
  // useForm: จัดการ state / validation / submit ทั้งหมด
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema), // ให้ Zod validate แทน
    defaultValues: { firstName: '', lastName: '', email: '', bio: '' },
  });

  // setValue: จำลองโหลดข้อมูลจาก API แล้ว set ลง form
  useEffect(() => {
    setTimeout(() => {
      setValue('firstName', 'สมชาย');
      setValue('lastName', 'ใจดี');
      setValue('email', 'somchai@example.com');
      setValue('bio', 'ชอบเขียนโค้ด');
    }, 500);
  }, [setValue]);

  // onSubmit: เรียกเฉพาะเมื่อ Zod validation ผ่านแล้ว
  const onSubmit = (data: ProfileFormData) => {
    Alert.alert('บันทึกสำเร็จ', JSON.stringify(data, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>แก้ไขโปรไฟล์</Text>

      {/* NamePreview ใช้ useWatch - re-render เฉพาะเมื่อ firstName/lastName เปลี่ยน */}
      <NamePreview control={control} />

      {/* ชื่อ */}
      <Text style={s.label}>ชื่อ</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[s.input, errors.firstName && s.err]}
            value={value}
            onChangeText={onChange} // แจ้ง form เมื่อค่าเปลี่ยน
            onBlur={onBlur} // แจ้ง form เมื่อออกจาก field
            placeholder="ชื่อ"
          />
        )}
      />
      {errors.firstName && <Text style={s.errText}>{errors.firstName.message}</Text>}

      {/* นามสกุล */}
      <Text style={s.label}>นามสกุล</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[s.input, errors.lastName && s.err]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="นามสกุล"
          />
        )}
      />
      {errors.lastName && <Text style={s.errText}>{errors.lastName.message}</Text>}

      {/* อีเมล */}
      <Text style={s.label}>อีเมล</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[s.input, errors.email && s.err]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={s.errText}>{errors.email.message}</Text>}

      {/* Bio */}
      <Text style={s.label}>Bio (ไม่บังคับ)</Text>
      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={s.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="บอกเล่าเกี่ยวกับตัวคุณ..."
          />
        )}
      />
      {errors.bio && <Text style={s.errText}>{errors.bio.message}</Text>}

      {/* handleSubmit: validate ผ่าน Zod ก่อนเรียก onSubmit */}
      <TouchableOpacity style={s.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={s.btnText}>บันทึก</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  preview: {
    backgroundColor: '#dbeafe',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    color: '#1d4ed8',
  },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  err: { borderColor: '#ef4444' },
  errText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  btn: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});