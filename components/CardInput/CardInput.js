import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Style from "./Style"
function CardInput({value, onChangeText, placeholder, corDeFundo }) {
    return (
      <View style={Style.cardInputContainer}>
        <TextInput style={[styles.input, { backgroundColor: corDeFundo }]}
          multiline
          value={value}
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
