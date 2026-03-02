import './global.css';
import { Stack } from 'expo-router';


export default function RootLayout(){
  return(
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="book/index"/>
      <Stack.Screen name="book/create"/>
      <Stack.Screen name="book/[id]"/>
    </Stack>
  );
}