import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Home/HomeScreen';
import { View, Text } from 'react-native';

const Drawer = createDrawerNavigator();

function PlaceholderScreen({ name }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{`${name} ainda não implementado.`}</Text>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Baralhos" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Baralhos" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={() => <PlaceholderScreen name="Perfil" />} />
      <Drawer.Screen name="Configurações" component={() => <PlaceholderScreen name="Configurações" />} />
      <Drawer.Screen name="Ajuda" component={() => <PlaceholderScreen name="Ajuda" />} />
    </Drawer.Navigator>
  );
}