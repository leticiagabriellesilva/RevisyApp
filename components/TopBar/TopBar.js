import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonImage from './ButtonImage';

export default function TopBar({ image1, onPress1, style1, image2, onPress2, style2 }) {
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
