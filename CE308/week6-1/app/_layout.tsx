import { Stack } from 'expo-router';

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen
          name="index"
          options={{title:'Home'}}
          />
      <Stack.Screen
          name="details"
          options={{title:'Details'}}
          />
      <Stack.Screen
          name="setting"
          options={{
            title:'Setting',
            headerStyle: {backgroundColor:'#f4511e'},
            headerTintColor:'#fff',
          }}
          />
      <Stack.Screen
          name="profile"
          options={{
            title:'My profile',
            headerShown: true,
            headerBackVisible: true,
            headerBackTitle: 'Back',
            headerStyle: {backgroundColor:'#6200ee'},
            headerTintColor:'#fff',
            headerTitleStyle:{
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
          />
          <Stack.Screen
          name="login"
          options={{
            title:'LOGIN',
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: true,
            headerStyle: {backgroundColor:'#fff'},
            gestureEnabled: true,
            gestureDirection: 'vertical',
          }}
          />
      </Stack>
  );
}