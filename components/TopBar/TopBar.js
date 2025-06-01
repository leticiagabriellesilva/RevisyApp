import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonImage from './ButtonImage';
import { Divider } from 'react-native-paper';

export default function TopBar({ image1, onPress1, style1, image2, onPress2, style2, darkMode }) {
  const backgroundColor = darkMode ? '#122021' : '#fff';
  const textColor = darkMode ? '#fff' : '#000';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.top} >
        <ButtonImage
          image={image1}
          onPress={onPress1}
          style={style1}
        />

        <Text style={[styles.logo, { color: textColor }]}>Revizy</Text>

        <ButtonImage
          image={image2}
          onPress={onPress2}
          style={style2}
        />
      </View>
      {/* <Divider
              style={styles.progressionBar}
      /> */}
    
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  top: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressionBar: {
    height: 8,
    backgroundColor: '#AD94DB',
  },
});