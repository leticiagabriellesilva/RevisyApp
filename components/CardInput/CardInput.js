import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function CardInput({ value, onChangeText, placeholder, corDeFundo, style }) {
  return (
    <TextInput
      style={[styles.input, { backgroundColor: corDeFundo }, style]}
      multiline
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: '100%',
    padding: 15,
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    alignContent: 'center',
  },
});

export default CardInput;
