import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '../screens/Drawer/DrawerNavigator';
import CreateCard from '../screens/CreateCard/CreateCard';
import App from '../screens/ReadCard/ReadCard';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditCard from '../screens/EditCard/EditCard';

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="CreateCard" component={CreateCard} />
      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditCard" component={EditCard} />
    </Stack.Navigator>
  );
}