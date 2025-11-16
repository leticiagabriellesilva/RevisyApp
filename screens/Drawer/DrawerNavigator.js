import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../home/HomeScreen";
import ProfileScreen from "../profile/ProfileScreen";
import CustomDrawer from "./CustomDrawer";
import { Image } from "react-native";
import IconPerfil from "../../assets/icons-menu/user-profile.png";
import IconBaralhos from "../../assets/icons-menu/cards-menu.png";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Baralhos"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fff",
        },
        drawerActiveBackgroundColor: "#96D289",
        drawerActiveTintColor: "#FFFFFF",
        drawerInactiveTintColor: "#222",
        drawerLabelStyle: {
          marginLeft: -6,
          fontSize: 15,
          fontWeight: "600",
        },
      }}
    >
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Image
              source={IconPerfil}
              style={{
                width: 22,
                height: 22,
                marginRight: 12,
                tintColor: color,
              }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Baralhos"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Image
              source={IconBaralhos}
              style={{
                width: 26,
                height: 26,
                marginRight: 8,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
