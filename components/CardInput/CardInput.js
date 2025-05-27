import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Style from "./Style"
function CardInput({valor, onChangeText, placeholder }) {
    return (
      <View style={Style.cardInputContainer}>
        <TextInput style={Style.input}
          multiline
          value={valor}
          onValueChange={onChangeText}
          placeholder={placeholder}
        />
        </View>
    )
}
export default CardInput;
