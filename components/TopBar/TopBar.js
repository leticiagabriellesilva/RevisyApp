import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonImage from '../ButtonImage/ButtonImage';
import { Divider } from 'react-native-paper';


export default function TopBar({ image1, onPress1, style1, image2, onPress2, style2 }) {
  return (
    <View style={styles.conteiner}>
      <View style={styles.top} >
        <ButtonImage
          image={image1}
          onPress={onPress1}
          style={style1}
        />

        <Text style={styles.logo}>Revisy</Text>

        <ButtonImage
          image={image2}
          onPress={onPress2}
          style={style2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    width:'100%',
    backgroundColor: '#F2F2F2',
  },
  top: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    objectFit: 'cover'
  },
  style1:{
    width: 40,  
    height: 40,
    objectFit: 'cover',
  },
  style2:{
    width: 30,  
    height: 30,
    objectFit: 'cover',
  }
  
});