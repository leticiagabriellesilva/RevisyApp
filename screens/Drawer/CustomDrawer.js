import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function CustomDrawer(props) {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>

        <View style={styles.profile}>
          <Image
            source={require('../../assets/image.png')}
            style={styles.profileImage}
          />
          <Text style={styles.greeting}>Olá, Baruffi!</Text>
        </View>
      </View>

      <DrawerItemList
        {...props}
        activeBackgroundColor="#96D289"
        activeTintColor="#000"
        inactiveTintColor="#000"
        labelStyle={styles.label}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profile: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    marginLeft: -15,
    fontSize: 15,
  },
});