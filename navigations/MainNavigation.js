import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '../screens/Drawer/DrawerNavigator';
import CreateCard from '../screens/CreateCard/CreateCard';
import App from '../screens/ReadCard/ReadCard';
import HomeScreen from '../screens/home/HomeScreen';

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="CreateCard" component={CreateCard} />
      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}