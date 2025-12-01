import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function CardInput({ value, onChangeText, placeholder, corDeFundo, style, editable = true }) {
  return (
    <TextInput
      style={[styles.input, { backgroundColor: corDeFundo }, style]}
      multiline
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable}
      textAlign="center"
      textAlignVertical="center"
      pointerEvents={editable ? "auto" : "none"}
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
    textAlign: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default CardInput;
