import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Hello World App', // ชื่อที่แสดงใน header
          headerStyle: {
            backgroundColor: '#4F46E5', // สีพื้นหลังของ header
          },
          headerTintColor: '#FFFFFF', // สีของข้อความใน header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </Stack>
  );
}