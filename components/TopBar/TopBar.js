import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonImage from './ButtonImage';
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

        <Text style={styles.logo}>Revizy</Text>

        <ButtonImage
          image={image2}
          onPress={onPress2}
          style={style2}
        />
      </View>
      <Divider
              style={styles.progressionBar}
      />
    
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  conteiner: {
    width:'100%',
    backgroundColor: '#fff',
  },
  top: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    objectFit: 'cover'
  },
  progressionBar: {
    height: 12,
    backgroundColor: '#4C1C74'
  },
  style1:{
    objectFit: 'cover',
  }

  
});
