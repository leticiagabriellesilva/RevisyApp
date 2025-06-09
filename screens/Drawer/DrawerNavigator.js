import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Home/HomeScreen';
import { View, Text } from 'react-native';
import CustomDrawer from './CustomDrawer';
import ProfileScreen from '../profile/ProfileScreen';
import CreateCard from '../CreateCard/CreateCard';
import App from '../ReadCard/ReadCard';

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
    <Drawer.Navigator 
      initialRouteName="Baralhos" 
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Baralhos" component={HomeScreen} />
      <Drawer.Screen name="Criar Baralho" component={CreateCard} />
      <Drawer.Screen name="Revisar" component={App} />
    </Drawer.Navigator>
  );
}