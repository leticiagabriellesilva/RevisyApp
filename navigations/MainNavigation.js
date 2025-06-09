import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '../screens/Drawer/DrawerNavigator';
import CreateCard from '../screens/CreateCard/CreateCard';

const Stack = createStackNavigator();

export default function MainNavigaton() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="CreateCard" component={CreateCard} />
    </Stack.Navigator>
  );
}