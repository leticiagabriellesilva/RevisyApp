import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function CardInput({ valor, onChangeText, placeholder, corDeFundo }) {
  return (
    <View style={styles.cardInputContainer}>
      <TextInput
        style={[styles.input, { backgroundColor: corDeFundo }]}
        multiline
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardInputContainer: {
    marginVertical: 0,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 200,
    padding: 15,
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    alignContent: 'center',
  },
});

export default CardInput;
