import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '../screens/Drawer/DrawerNavigator';
import CreateCard from '../screens/CreateCard/CreateCard';
import App from '../screens/ReadCard/ReadCard.js';
import AppEspacada from '../screens/ReadCard/ReadCardEspacada.js';
import BaralhoCardsScreen from '../screens/BaralhoCards/BaralhoCardsScreen';
import CreateBaralhoScreen from '../screens/CreateBaralho/CreateBaralhoScreen';

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="CreateCard" component={CreateCard} />
      <Stack.Screen name="CreateBaralho" component={CreateBaralhoScreen} />
      <Stack.Screen name="BaralhoCards" component={BaralhoCardsScreen} />
      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="AppEspacada" component={AppEspacada} />
    </Stack.Navigator>
  );
}