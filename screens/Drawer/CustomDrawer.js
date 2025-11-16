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
import ArrowLeft from '../../assets/icons-menu/back-button.png';

export default function CustomDrawer(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={require('../../assets/image.png')}
            style={styles.profileImage}
          />
          <Text style={styles.greeting}>Olá, Baruffi!</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.closeArea}>
          <Image source={ArrowLeft} style={styles.closeIcon} />
        </TouchableOpacity>
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
    padding: 18,
    paddingTop: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',       
    alignItems: 'center',     
  },
  closeArea: {
    width: 35, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  closeIcon: {
    width: 15,
    height: 15,
    marginLeft: 160,
    resizeMode: "contain",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,            
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    marginLeft: -10,
    fontSize: 15,
  },
});