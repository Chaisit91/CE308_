import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '##FF6600' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      
      <Stack.Screen
        name="details"
        options={{ title: 'Product Details' }}
      />
    </Stack>
  );
}