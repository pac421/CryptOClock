import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Device from './src/screens/Device';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3A0CA3',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Appairage Bluetooth' }}
      />
      <Stack.Screen
        name="Device"
        component={Device}
        options={{ title: 'Configuration' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
          backgroundColor="#3A0CA3"
          barStyle="light-content"
      />
      <NavStack />
    </NavigationContainer>
  );
}
